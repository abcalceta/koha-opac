/* ============================================================
   homepage.js — Generates homepage HTML from shelf config
   Don't edit this to change shelves — edit config.js instead.
   ============================================================ */

/**
 * Build the full homepage HTML from a SHELVES array.
 * Each shelf gets a unique container id of "shelf-{reportId}-{index}"
 * so duplicate report IDs (e.g. two shelves from the same report)
 * don't collide.
 */
export function buildHomepageHTML(shelves) {

    const sections = shelves.map((shelf, i) => {

        const id = `shelf-${shelf.reportId}-${i}`;

        return `
        <div class="discover-section">
            <h2>${shelf.title}</h2>
            <div class="discover-wrapper">
                <button class="scroll-btn left" aria-label="Scroll left">&#8249;</button>
                <div id="${id}" class="discover-shelf"></div>
                <button class="scroll-btn right" aria-label="Scroll right">&#8250;</button>
            </div>
        </div>`;

    });

    return sections.join("\n");

}
