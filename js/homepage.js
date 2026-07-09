/* ============================================================
   homepage.js — Builds the front page from config.js and
   pioneers-config.js. Don't edit this to change content — edit
   those files instead.
   ============================================================ */

import { buildHeroHTML, initHero, populateHeroFloaters } from "./hero.js";
import { buildPioneersHTML, initPioneers } from "./pioneers.js";

/* Re-exported so main.js gets these from the SAME module instance
   that buildHomepageHTML() populated (pioneers.js keeps carousel
   state at module scope) — importing hero.js/pioneers.js a second
   time from main.js with a different cache-busting query string
   would resolve to a distinct module instance with its own empty
   state, and the carousel would silently render blank. */
export { initHero, populateHeroFloaters, initPioneers };

function buildShelfSectionHTML(shelf, id) {
    return `
        <div class="discover-section" data-screen-label="${shelf.title}">
            <h2 class="pssc-section-title">${shelf.title}</h2>
            <div class="discover-wrapper">
                <button class="scroll-btn left" aria-label="Scroll left">&#8249;</button>
                <div id="${id}" class="discover-shelf"></div>
                <button class="scroll-btn right" aria-label="Scroll right">&#8250;</button>
            </div>
        </div>`;
}

function buildVisitHTML(site) {

    const hoursRows = site.hours.map(h => `
                <div class="pssc-hours-row"><span>${h.days}</span><span>${h.time}</span></div>`
    ).join("");

    return `
    <div class="pssc-visit" data-screen-label="Visit the Library">
        <h2 class="pssc-section-title">Visit the Library</h2>
        <p class="pssc-section-sub">${site.address.lines[0]} &middot; ${site.address.lines[site.address.lines.length - 1]}</p>

        <div class="pssc-visit-grid">
            <div class="pssc-visit-map">
                <iframe title="PSSC Library location"
                    src="https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed"
                    loading="lazy"></iframe>
            </div>

            <div class="pssc-visit-cards">
                <div class="pssc-visit-card">
                    <div class="pssc-visit-card-title">Address</div>
                    <div class="pssc-visit-card-body">${site.address.lines.join("<br />")}</div>
                </div>

                <div class="pssc-visit-card">
                    <div class="pssc-visit-card-title">Hours</div>${hoursRows}
                    <div class="pssc-hours-note">${site.hoursNote}</div>
                </div>

                <div class="pssc-visit-access">
                    <div class="pssc-visit-card-title">Access</div>
                    <div class="pssc-visit-card-body pssc-italic">${site.access}</div>
                </div>
            </div>
        </div>
    </div>`;

}

function buildFooterHTML(site) {
    const logoUrl = new URL("../images/logo.jpg", import.meta.url).href;
    return `
    <div class="pssc-footer" data-screen-label="Footer">
        <div class="pssc-footer-inner">
            <img src="${logoUrl}" alt="Philippine Social Science Council" class="pssc-footer-logo" />
            <div class="pssc-footer-motto">${site.motto}</div>
        </div>
    </div>`;
}

/**
 * Build the full homepage HTML from config.js's SHELVES/SITE and
 * pioneers-config.js's PIONEERS. Each shelf gets a unique
 * container id of "shelf-{reportId}-{index}" so duplicate report
 * IDs (e.g. two shelves from the same report) don't collide.
 */
export function buildHomepageHTML(shelves, site, pioneers) {

    const sections = shelves.map((shelf, i) => buildShelfSectionHTML(shelf, `shelf-${shelf.reportId}-${i}`));

    return [
        buildHeroHTML(site),
        buildPioneersHTML(pioneers),
        ...sections,
        buildVisitHTML(site),
        buildFooterHTML(site),
    ].join("\n");

}
