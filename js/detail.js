/* ============================================================
   detail.js — Bibliographic detail page (opac-detail) chrome
   Groups Koha's MARC view / ISBD view links behind a single
   "Advanced View" dropdown and hides the redundant "Normal view"
   label (you're already looking at it). The links themselves are
   untouched — still real hrefs to Koha's own opac-MARCdetail.pl /
   opac-ISBDdetail.pl pages, just relocated in the DOM.
   ============================================================ */

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
