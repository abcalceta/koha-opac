/* ============================================================
   publication-timeline.js — "Browse by Publication Decade"
   A quiet, museum-placard-style bar chart of the collection by
   decade. Hover/focus a decade for a summary tooltip; click (or
   press Enter/Space) to pull a dozen books from that decade onto
   an inline shelf directly below.

   Registered as the "publicationTimeline" renderer in
   visualization-loader.js. Content (title, which Koha reports to
   read) comes entirely from the vizConfig object handed in by
   config.js — nothing here is specific to any one report ID.

   Deliberately built as plain HTML buttons + CSS bars instead of
   a charting library: each bar IS a real <button>, so hover,
   focus, keyboard activation (Enter/Space), and screen-reader
   labeling all come for free from the browser instead of having
   to be bolted onto a <canvas>. It also means zero extra
   dependencies/CDN requests for what is, visually, a set of
   rectangles. (If a future visualization wants chart types this
   approach doesn't cover — pie/line/scatter — pulling in Chart.js
   for that one renderer is reasonable; the registry in
   visualization-loader.js was built to make room for either
   approach without the two visualizations needing to agree.)
   ============================================================ */

import { createBookCover } from "./covers.js";
import { enhanceBookCover } from "./assets.js";
import { buildPublicationYearSearchUrl } from "./search.js";

const PREVIEW_LIMIT = 12;        /* book cards shown before "View all" */
const SKELETON_BAR_COUNT = 10;   /* shimmer bars shown while loading */
const PANEL_TRANSITION_MS = 200; /* keep in sync with publication-timeline.css */

/* How many TKL cover lookups run at once for a single panel. These
   books are a random sample across the whole catalog (not a
   curated shelf), so TKL often has nothing for most of them —
   firing all 12 at once was blowing through the browser's ~6
   same-host connection limit and queuing out the *next* report
   fetch behind a pile of slow 404s. Covers still fade in
   progressively (see enhanceCoversThrottled) — this only limits
   how many are in flight together. */
const COVER_LOOKUP_CONCURRENCY = 3;


/**
 * Entry point — called by visualization-loader.js with an empty
 * mount element and this visualization's config.js entry
 * ({ title, reportId, previewReportId, ... }).
 */
export async function renderPublicationTimeline(mount, vizConfig) {

    showLoadingSkeleton(mount);

    const rows = await fetchReport(vizConfig.reportId);
    const decades = parseTimelineRows(rows);

    if (!decades.length) {
        showEmptyState(mount);
        return;
    }

    buildChart(mount, decades, vizConfig);

}


/* ============================================================
   Data fetch + parsing
   ============================================================ */

/**
 * Fetch a Koha SQL report as JSON. Returns null on any failure —
 * network error, non-OK response, or a payload that isn't the
 * array-of-rows shape svc/report normally returns (e.g. an error
 * page HTML body, or a report ID that doesn't exist) — and logs
 * why, since a misconfigured reportId in config.js is the most
 * likely reason this visualization goes quiet.
 */
async function fetchReport(reportId, extraParams = "") {
    const url = `/cgi-bin/koha/svc/report?id=${reportId}${extraParams}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.warn(`publication-timeline: report ${reportId} returned HTTP ${res.status} (${url})`);
            return null;
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            console.warn(`publication-timeline: report ${reportId} didn't return a row array — check the report still exists and its ID is correct (${url})`);
            return null;
        }
        return data;
    } catch (err) {
        console.warn(`publication-timeline: failed to fetch report ${reportId} (${url})`, err);
        return null;
    }
}

/**
 * Report #1 columns (positional, same convention as shelf.js):
 *   [0] decade  [1] book_count  [2] earliest_year
 *   [3] latest_year  [4] top_subjects (optional, pipe-delimited)
 */
function parseTimelineRows(rows) {
    if (!rows) return [];
    return rows
        .map(row => ({
            label:        String(row[0] ?? "").trim(),
            count:        Number(row[1]) || 0,
            earliestYear: Number(row[2]) || null,
            latestYear:   Number(row[3]) || null,
            subjects:     String(row[4] ?? "").split("|").map(s => s.trim()).filter(Boolean),
        }))
        .filter(d => d.label && d.count > 0)
        .sort((a, b) => (a.earliestYear ?? 0) - (b.earliestYear ?? 0));
}

/** Report #2 columns: [0] biblionumber [1] title [2] author [3] publication_year */
function parseBookRows(rows) {
    if (!rows) return [];
    return rows.map(row => ({
        biblionumber: row[0],
        title:        row[1] || "[NO TITLE]",
        author:       row[2] || "",
        year:         row[3] || "",
    }));
}

async function loadDecadeBooks(previewReportId, decade) {
    if (!previewReportId || !decade.earliestYear || !decade.latestYear) return [];
    const params = `&sql_params=${decade.earliestYear}&sql_params=${decade.latestYear}`;
    return parseBookRows(await fetchReport(previewReportId, params));
}


/* ============================================================
   Loading / empty states
   ============================================================ */

function showLoadingSkeleton(mount) {
    mount.innerHTML = "";
    const chart = document.createElement("div");
    chart.className = "pt-chart pt-chart-loading";
    for (let i = 0; i < SKELETON_BAR_COUNT; i++) {
        const bar = document.createElement("div");
        bar.className = "pt-skeleton-bar";
        bar.style.setProperty("--pt-h", `${30 + Math.round(Math.random() * 60)}%`);
        chart.appendChild(bar);
    }
    mount.appendChild(chart);
}

function showEmptyState(mount) {
    mount.innerHTML = "";
    const msg = document.createElement("p");
    msg.className = "pt-empty";
    msg.textContent = "No publication decade data available.";
    mount.appendChild(msg);
}


/* ============================================================
   Chart + panel
   ============================================================ */

function buildChart(mount, decades, vizConfig) {

    mount.innerHTML = "";

    const maxCount = Math.max(...decades.map(d => d.count));

    const viz = document.createElement("div");
    viz.className = "pt-viz";

    const chart = document.createElement("div");
    chart.className = "pt-chart";
    chart.setAttribute("role", "group");
    chart.setAttribute("aria-label", "Books by publication decade");

    const tooltip = document.createElement("div");
    tooltip.className = "pt-tooltip";
    tooltip.hidden = true;
    tooltip.setAttribute("role", "status");

    const panel = document.createElement("div");
    panel.className = "pt-panel";
    panel.setAttribute("aria-live", "polite");
    panel.hidden = true;

    /* Per-instance state, scoped to this call — a second
       visualization on the same page (or a future re-render)
       gets its own independent chart/panel, nothing module-level. */
    let selectedIndex = -1;
    let requestToken = 0; /* guards against a slow fetch resolving after a newer click */

    const barButtons = decades.map((decade, i) => {

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pt-bar-btn";
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute(
            "aria-label",
            `${decade.label}, ${pluralBooks(decade.count)}. Press Enter to browse.`
        );

        const bar = document.createElement("span");
        bar.className = "pt-bar";
        const heightPct = Math.max(6, Math.round((decade.count / maxCount) * 100));
        bar.style.setProperty("--pt-bar-height", `${heightPct}%`);

        const label = document.createElement("span");
        label.className = "pt-bar-label";
        label.textContent = decade.label;

        btn.appendChild(bar);
        btn.appendChild(label);

        btn.addEventListener("mouseenter", () => showTooltip(tooltip, btn, decade));
        btn.addEventListener("focus",      () => showTooltip(tooltip, btn, decade));
        btn.addEventListener("mouseleave", () => hideTooltip(tooltip));
        btn.addEventListener("blur",       () => hideTooltip(tooltip));
        btn.addEventListener("click",      () => toggleDecade(i));

        chart.appendChild(btn);
        return btn;

    });

    async function toggleDecade(i) {

        if (selectedIndex === i) {
            collapsePanel();
            return;
        }

        const myToken = ++requestToken;
        selectedIndex = i;
        updateSelectedStyles();
        showPanelLoading();

        const books = await loadDecadeBooks(vizConfig.previewReportId, decades[i]);

        if (myToken !== requestToken) return; /* superseded by a later click */
        renderPanelContent(decades[i], books);

    }

    function updateSelectedStyles() {
        barButtons.forEach((btn, i) => {
            const isSelected = i === selectedIndex;
            btn.classList.toggle("pt-bar-selected", isSelected);
            btn.setAttribute("aria-expanded", String(isSelected));
        });
    }

    function collapsePanel() {
        selectedIndex = -1;
        requestToken++;
        updateSelectedStyles();
        panel.classList.remove("pt-panel-visible");
        window.setTimeout(() => {
            if (selectedIndex === -1) {
                panel.hidden = true;
                panel.innerHTML = "";
            }
        }, PANEL_TRANSITION_MS);
    }

    function showPanelLoading() {
        panel.hidden = false;
        panel.classList.remove("pt-panel-visible");
        panel.innerHTML = "";
        const grid = document.createElement("div");
        grid.className = "pt-books-grid";
        for (let i = 0; i < PREVIEW_LIMIT; i++) {
            grid.appendChild(el("div", "pt-book-card pt-book-card-loading"));
        }
        panel.appendChild(grid);
        revealPanel();
    }

    function renderPanelContent(decade, books) {

        panel.innerHTML = "";

        const heading = document.createElement("div");
        heading.className = "pt-panel-heading";
        heading.appendChild(el("span", "pt-panel-decade", decade.label));
        if (decade.earliestYear && decade.latestYear) {
            heading.appendChild(el(
                "span", "pt-panel-range",
                `${decade.earliestYear}–${decade.latestYear} · ${pluralBooks(decade.count)}`
            ));
        }
        panel.appendChild(heading);

        if (!books.length) {
            panel.appendChild(el(
                "p", "pt-panel-empty",
                "Couldn't load books for this decade right now — please try again shortly."
            ));
        } else {

            const grid = document.createElement("div");
            grid.className = "pt-books-grid";
            const shownBooks = books.slice(0, PREVIEW_LIMIT);
            const cards = shownBooks.map(buildBookCard);
            cards.forEach(card => grid.appendChild(card));
            panel.appendChild(grid);

            /* Placeholders are already in the DOM above — this
               fills in real covers progressively, a few at a time,
               without delaying anything the user can already see. */
            enhanceCoversThrottled(shownBooks, cards);

            if (decade.count > PREVIEW_LIMIT && decade.earliestYear && decade.latestYear) {
                const link = document.createElement("a");
                link.className = "pt-view-all";
                link.href = buildPublicationYearSearchUrl(decade.earliestYear, decade.latestYear);
                link.textContent = `View all ${decade.count} books →`;
                panel.appendChild(link);
            }

        }

        revealPanel();

    }

    /* Adding .pt-panel-visible one frame after the content lands
       (rather than immediately) is what makes the fade-in +
       slide-up actually transition instead of snapping — the
       browser needs a frame with the "before" state painted
       before the "after" state's transition can be observed. */
    function revealPanel() {
        requestAnimationFrame(() => requestAnimationFrame(() => {
            panel.classList.add("pt-panel-visible");
        }));
    }

    viz.appendChild(chart);
    viz.appendChild(tooltip);
    viz.appendChild(panel);
    mount.appendChild(viz);

}


/* ============================================================
   Tooltip
   ============================================================ */

function showTooltip(tooltip, btn, decade) {

    tooltip.innerHTML = "";
    tooltip.appendChild(el("div", "pt-tooltip-decade", decade.label));
    tooltip.appendChild(el("div", "pt-tooltip-count", pluralBooks(decade.count)));

    if (decade.earliestYear && decade.latestYear) {
        tooltip.appendChild(el("div", "pt-tooltip-range", `${decade.earliestYear}–${decade.latestYear}`));
    }

    if (decade.subjects.length) {
        tooltip.appendChild(el("div", "pt-tooltip-subjects-label", "Top Subjects"));
        const list = document.createElement("ul");
        list.className = "pt-tooltip-subjects";
        decade.subjects.slice(0, 3).forEach(subject => list.appendChild(el("li", null, subject)));
        tooltip.appendChild(list);
    }

    tooltip.appendChild(el("div", "pt-tooltip-cta", "Click to browse →"));

    tooltip.hidden = false;
    positionTooltip(tooltip, btn);

}

function hideTooltip(tooltip) {
    tooltip.hidden = true;
}

/** Position the tooltip above the hovered/focused bar, clamped so it doesn't overflow the chart edges. */
function positionTooltip(tooltip, btn) {

    const chartRect = tooltip.parentElement.getBoundingClientRect();
    const btnRect   = btn.getBoundingClientRect();

    const centerX = btnRect.left - chartRect.left + btnRect.width / 2;
    const top     = btnRect.top  - chartRect.top;

    tooltip.style.top = `${top}px`;

    /* Clamp horizontally after an initial layout pass so
       tooltip.offsetWidth is available. */
    tooltip.style.left = `${centerX}px`;
    const half = tooltip.offsetWidth / 2;
    const min  = half;
    const max  = chartRect.width - half;
    tooltip.style.left = `${Math.min(Math.max(centerX, min), max)}px`;

}


/* ============================================================
   Book cards
   ============================================================ */

function buildBookCard(book) {

    const link = document.createElement("a");
    link.className = "pt-book-card";
    link.href = `/cgi-bin/koha/opac-detail.pl?biblionumber=${book.biblionumber}`;

    /* Same cover contract as the homepage shelves: report data has
       no cover URL, so start with a generated placeholder. The
       real cover (if TKL has one) is filled in afterward by
       enhanceCoversThrottled() below, not here — see its comment
       for why that's deliberately not immediate. */
    link.appendChild(createBookCover(book.title, book.author, ""));

    const info = document.createElement("div");
    info.className = "pt-book-info";
    info.appendChild(el("div", "pt-book-title", book.title));
    if (book.author) info.appendChild(el("div", "pt-book-author", book.author));
    if (book.year)   info.appendChild(el("div", "pt-book-year", String(book.year)));
    link.appendChild(info);

    return link;

}

/**
 * Fill in real covers for already-rendered cards, a few at a time
 * instead of all PREVIEW_LIMIT at once. Fire-and-forget from the
 * caller's side — the panel is already fully visible with
 * placeholders before this ever runs, so nothing here should delay
 * anything the user is looking at. Deliberately not awaited by
 * renderPanelContent().
 */
async function enhanceCoversThrottled(books, cards) {

    let next = 0;
    async function worker() {
        while (next < books.length) {
            const i = next++;
            await enhanceBookCover(cards[i].querySelector(".bookcover"), books[i].biblionumber);
        }
    }

    const workerCount = Math.min(COVER_LOOKUP_CONCURRENCY, books.length);
    await Promise.all(Array.from({ length: workerCount }, worker));

}


/* ============================================================
   Small utilities
   ============================================================ */

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
}

function pluralBooks(count) {
    return `${count} book${count === 1 ? "" : "s"}`;
}
