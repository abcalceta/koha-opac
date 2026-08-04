/* ============================================================
   detail.js — Bibliographic detail page (opac-detail) chrome
   Groups Koha's MARC view / ISBD view links behind a single
   "Advanced View" dropdown and hides the redundant "Normal view"
   label (you're already looking at it). The links themselves are
   untouched — still real hrefs to Koha's own opac-MARCdetail.pl /
   opac-ISBDdetail.pl pages, just relocated in the DOM.
   ============================================================ */

import { toThumbUrl } from "./covers.js";

/**
 * Restructure Koha's #views bar (Normal view / MARC view / ISBD
 * view) into: nothing (Normal view label hidden) + a single
 * "Advanced View" dropdown containing the MARC/ISBD links.
 */
export function enhanceDetailViews() {

    const views = document.querySelector("#views");
    if (!views) return;

    views.querySelector(".current-view")?.classList.add("pssc-view-hidden");

    const altLinks = ["#MARCview", "#ISBDview"]
        .map(sel => views.querySelector(sel))
        .filter(Boolean);

    if (!altLinks.length) return;

    const dropdown = document.createElement("span");
    dropdown.className = "view pssc-advanced-view";
    dropdown.innerHTML = `
        <button type="button" class="pssc-advanced-view-toggle">
            Advanced View <i class="fa fa-caret-down" aria-hidden="true"></i>
        </button>
        <span class="pssc-advanced-view-menu"></span>`;

    const menu = dropdown.querySelector(".pssc-advanced-view-menu");
    altLinks.forEach(link => {
        link.closest(".view")?.remove();
        menu.appendChild(link);
    });

    views.appendChild(dropdown);

    dropdown.querySelector(".pssc-advanced-view-toggle")
        .addEventListener("click", () => dropdown.classList.toggle("open"));

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) dropdown.classList.remove("open");
    });

}

/**
 * Add a small cover thumbnail to each entry in the Browse Results
 * sidebar list. Sourced from the ONE search-results page the list
 * itself came from (its own "Back to results" link) — a single
 * fetch covers every row, rather than one request per record.
 * Silently no-ops if that page can't be fetched, or a given
 * record has no MARC cover to find there.
 */
export async function enhanceBrowseResults() {

    const items = document.querySelectorAll('#ul_pagination_lists li[id^="li_pag_"]');
    if (!items.length) return;

    const backLink = document.querySelector(".back_results a");
    if (!backLink) return;

    let doc;
    try {
        const res  = await fetch(backLink.href);
        const html = await res.text();
        doc = new DOMParser().parseFromString(html, "text/html");
    } catch {
        return;
    }

    const coverByBiblio = new Map();

    const biblioOf = (a) => a && new URL(a.href, backLink.href).searchParams.get("biblionumber");

    /* Case A: "Cover image" text links (MARC 856) */
    Array.from(doc.querySelectorAll("a"))
        .filter(a => a.textContent.trim().toLowerCase() === "cover image")
        .forEach(a => {
            const biblionumber = biblioOf(a.closest("tr")?.querySelector('a[href*="biblionumber="]'));
            if (biblionumber) coverByBiblio.set(biblionumber, a.href);
        });

    /* Case B: <img> Koha rendered from the local covers service */
    Array.from(doc.querySelectorAll('img[src*="/covers/"]'))
        .forEach(img => {
            const biblionumber = biblioOf(img.closest("tr")?.querySelector('a[href*="biblionumber="]'));
            if (biblionumber && !coverByBiblio.has(biblionumber)) coverByBiblio.set(biblionumber, img.src);
        });

    items.forEach(li => {

        const biblionumber = biblioOf(li.querySelector('a[href*="biblionumber="]'));
        const coverUrl      = biblionumber && coverByBiblio.get(biblionumber);
        if (!coverUrl) return;

        const wrapper     = document.createElement("div");
        wrapper.className = "pssc-browse-info";
        while (li.firstChild) wrapper.appendChild(li.firstChild);

        const img     = document.createElement("img");
        img.className = "pssc-browse-cover";
        img.alt       = "";
        img.src       = toThumbUrl(coverUrl);
        img.onerror   = () => img.remove();

        li.classList.add("pssc-has-cover");
        li.appendChild(img);
        li.appendChild(wrapper);

    });

}
