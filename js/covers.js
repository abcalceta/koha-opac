/* ============================================================
   covers.js — Cover image handling
   - Generated gradient covers (fallback when no image exists)
   - Detail page: loads cover from MARC 856 URL (thumbnail)
   - Search results: fetches MARC per result, loads thumbnails
   ============================================================ */


/* --- Exports ---
   createGeneratedCover(title, author) → DOM element
   toThumbUrl(url)       → thumbnail URL (inserts /thumbs/)
   applyCovers()         — generated fallbacks for .bookcover
   refreshCovers()       — re-style Koha-injected covers
   loadDetailCover()     — show thumbnail on detail page
   applySearchCovers()   — show thumbnails in search results
*/


/* ============================================================
   Shared utility
   ============================================================ */

/**
 * Derive the thumbnail URL from a full cover URL.
 * Inserts /thumbs/ before the filename.
 * e.g. /covers/cover_1968-1993.jpg → /covers/thumbs/cover_1968-1993.jpg
 */
export function toThumbUrl(url) {
    const parts    = url.split("/");
    const filename = parts.pop();
    return [...parts, "thumbs", filename].join("/");
}


/* ============================================================
   Generated covers (gradient fallback)
   ============================================================ */

/**
 * Build a .generated-cover <div> for the given title/author.
 * Hue is derived from the title so the same book always gets
 * the same color, locked to the purple/violet band (240–300°).
 */
export function createGeneratedCover(title, author) {

    title  = String(title  || "");
    author = String(author || "");

    const div = document.createElement("div");
    div.className = "generated-cover";

    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = 240 + (Math.abs(hash) % 60);

    div.style.background = `linear-gradient(
        135deg,
        hsl(${hue}, 55%, 28%),
        hsl(${hue + 12}, 60%, 38%)
    )`;

    const titleEl = document.createElement("div");
    titleEl.className   = "cover-title";
    titleEl.textContent = title.substring(0, 50);

    const authorEl = document.createElement("div");
    authorEl.className   = "cover-author";
    authorEl.textContent = author;

    div.appendChild(titleEl);
    div.appendChild(authorEl);

    return div;

}


/**
 * Add a generated cover to every .bookcover that doesn't
 * already have a real image or an existing fallback.
 */
export function applyCovers() {

    document.querySelectorAll(".bookcover").forEach(el => {

        if (el.querySelector(".generated-cover")) return;

        const img = el.querySelector("img");
        if (img && img.src && !img.src.includes("no-cover")) return;

        const row = el.closest("tr");

        const title =
            el.dataset.title                           ||
            row?.querySelector("a.title")?.innerText  ||
            "[NO TITLE]";

        const author =
            el.dataset.author                          ||
            row?.querySelector(".author")?.innerText  ||
            "";

        el.appendChild(createGeneratedCover(title, author));

    });

}


/**
 * Re-apply gradient + text to .generated-cover elements that
 * Koha may have injected with its own placeholder content.
 */
export function refreshCovers() {

    document.querySelectorAll(".generated-cover").forEach(el => {

        const bookcover = el.closest(".bookcover");
        const title     = bookcover?.dataset.title  || "";
        const author    = bookcover?.dataset.author || "";

        let hash = 0;
        for (let i = 0; i < title.length; i++) {
            hash = title.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = 240 + (Math.abs(hash) % 60);

        el.style.background = `linear-gradient(
            135deg,
            hsl(${hue}, 55%, 28%),
            hsl(${hue + 12}, 60%, 38%)
        )`;

        el.childNodes.forEach(n => {
            if (n.nodeType === Node.TEXT_NODE) n.remove();
        });

        let titleEl  = el.querySelector(".cover-title");
        let authorEl = el.querySelector(".cover-author");

        if (!titleEl) {
            titleEl = document.createElement("div");
            titleEl.className = "cover-title";
            el.appendChild(titleEl);
        }

        if (!authorEl) {
            authorEl = document.createElement("div");
            authorEl.className = "cover-author";
            el.appendChild(authorEl);
        }

        titleEl.textContent  = title.substring(0, 50);
        authorEl.textContent = author;

    });

}


/* ============================================================
   Detail page cover
   ============================================================ */

/**
 * Find the "Cover image" link in Online resources and display
 * its thumbnail in the .bookcover area on the detail page.
 */
export function loadDetailCover() {

    const coverLink = Array.from(document.querySelectorAll("a")).find(
        a => a.textContent.trim().toLowerCase() === "cover image"
    );

    if (!coverLink) return;

    const fullUrl  = coverLink.href;
    const thumbUrl = toThumbUrl(fullUrl);

    const target =
        document.querySelector("#bookcover")  ||
        document.querySelector(".bookcover")  ||
        document.querySelector("#catalogue_detail_biblio .cover");

    if (!target) return;

    const img     = document.createElement("img");
    img.alt       = "Book cover";
    img.className = "detail-cover-img";

    /* Try thumbnail first; fall back to full-size if thumbs
       folder hasn't been uploaded yet. */
    img.src     = thumbUrl;
    img.onerror = () => {
        if (img.src !== fullUrl) {
            img.src = fullUrl;
        } else {
            img.remove();
        }
    };

    target.innerHTML = "";
    target.appendChild(img);

}


/* ============================================================
   Search results covers
   ============================================================ */

/**
 * Walk every known result <li> directly, look for a cover inside it,
 * hide the original, and rebuild as [cover | content] flex layout.
 *
 * Called once at page load, then polled every 500 ms for 4 seconds to
 * catch covers Koha injects asynchronously after the DOM is ready.
 */
export function applySearchCovers() {

    /* Results are in a TABLE — rows are <tr>, content is in td.bibliocol */

    /* Case A: "Cover image" text links (MARC 856) */
    Array.from(document.querySelectorAll("a"))
        .filter(a => a.textContent.trim().toLowerCase() === "cover image")
        .forEach(link => {

            const row = link.closest("tr");
            if (!row || row.dataset.coverDone) return;

            if (link.previousElementSibling?.tagName === "IMG") {
                link.previousElementSibling.style.display = "none";
            }
            const inner = link.querySelector("img");
            if (inner) inner.style.display = "none";
            link.style.display = "none";

            buildCoverCard(row, link.href);

        });

    /* Case B: <img> Koha rendered from the local covers service */
    Array.from(document.querySelectorAll("img"))
        .filter(img =>
            img.src.includes("/covers/") &&
            !img.closest(".search-cover-wrapper")
        )
        .forEach(img => {

            const row = img.closest("tr");
            if (!row || row.dataset.coverDone) return;

            img.style.display = "none";
            if (img.parentElement?.tagName === "A") {
                img.parentElement.style.display = "none";
            }

            buildCoverCard(row, img.src);

        });

    startCoverPolling();

}


/* Poll applySearchCovers a few times after load to catch late-injected
   images. Stops automatically after ~4 seconds. */
let _pollStarted = false;
function startCoverPolling() {
    if (_pollStarted) return;
    _pollStarted = true;
    let ticks = 0;
    const id = setInterval(() => {
        applySearchCovers();
        if (++ticks >= 8) clearInterval(id);
    }, 500);
}


/**
 * Restructure a result row into a two-column flex card:
 *   [ cover thumbnail ]  [ all existing content ]
 * Tries the /thumbs/ path first; falls back to the full-size URL.
 */
function buildCoverCard(row, fullUrl) {

    if (row.dataset.coverDone) return;
    row.dataset.coverDone = "1";

    /* Content lives in td.bibliocol — make that cell the flex container */
    const cell = row.querySelector("td.bibliocol") || row.querySelector("td") || row;

    const thumbUrl = toThumbUrl(fullUrl);

    const img     = document.createElement("img");
    img.className = "search-cover-img";
    img.alt       = "Cover";
    img.src       = thumbUrl;

    img.addEventListener("load", () => tintCard(cell, img));

    const coverWrapper     = document.createElement("div");
    coverWrapper.className = "search-cover-wrapper";
    coverWrapper.appendChild(img);

    img.onerror = () => {
        if (img.src !== fullUrl) {
            img.src = fullUrl;
        } else {
            coverWrapper.remove();
        }
    };

    const contentWrapper     = document.createElement("div");
    contentWrapper.className = "search-content-wrapper";
    while (cell.firstChild) {
        contentWrapper.appendChild(cell.firstChild);
    }

    cell.appendChild(coverWrapper);
    cell.appendChild(contentWrapper);
    cell.classList.add("search-result-card");

}


/**
 * Sample the average RGB color from a loaded <img> using an
 * offscreen canvas, then apply a subtle gradient tint and a
 * matching left border to the result card.
 *
 * Works for same-origin images without needing CORS headers.
 * Silently skips if canvas is blocked for any reason.
 */
function tintCard(card, img) {

    try {

        const canvas  = document.createElement("canvas");
        canvas.width  = 8;
        canvas.height = 8;
        const ctx     = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 8, 8);

        const data   = ctx.getImageData(0, 0, 8, 8).data;
        const pixels = data.length / 4;
        let r = 0, g = 0, b = 0;

        for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
        }

        r = Math.round(r / pixels);
        g = Math.round(g / pixels);
        b = Math.round(b / pixels);

        card.style.background  = `linear-gradient(to right, rgba(${r},${g},${b},0.18) 0%, rgba(${r},${g},${b},0.06) 100%)`;
        card.style.borderLeft  = `3px solid rgba(${r},${g},${b},0.45)`;
        card.style.borderColor = `rgba(${r},${g},${b},0.45)`;

    } catch { /* canvas blocked (CORS) — skip tinting */ }

}


/* ============================================================
   MutationObserver for dynamic result loading
   ============================================================ */

export function watchResults() {

    const results = document.querySelector("#results");
    if (!results) return;

    const observer = new MutationObserver(() => {
        applyCovers();
        refreshCovers();
    });

    observer.observe(results, { childList: true, subtree: true });

}
