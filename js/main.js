/* ============================================================
   main.js — Application entry point
   Injected via Koha's OPACUserJS system preference.
   Loads the CSS, then bootstraps the correct behavior for
   each page type based on <body id="..."> from Koha.
   ============================================================ */

const VERSION = "1.2.2";

const { homepageHTML }              = await import(`./homepage.js?v=${VERSION}`);
const { applyCovers, refreshCovers } = await import(`./covers.js?v=${VERSION}`);
const { loadShelf }                 = await import(`./shelf.js?v=${VERSION}`);


/* --- Entry point --- */

function init() {

    loadCSS();

    if (document.body.id === "opac-main") {
        initHomepage();
    } else {
        /* On search/results/detail pages: style any existing covers */
        applyCovers();
        refreshCovers();
    }

}


/* --- Homepage setup --- */

function initHomepage() {

    const container =
        document.querySelector("#OpacMainUserBlock .default_body") ||
        document.querySelector("#OpacMainUserBlock");

    if (!container) return;

    container.innerHTML = homepageHTML;

    /* Report IDs correspond to saved Koha reports */
    loadShelf("random-books", 6);
    loadShelf("anthro-books", 7);

}


/* --- CSS injection ---
   The stylesheet lives on GitHub Pages so it's loaded here
   rather than being bundled. Cache-busted by VERSION.
*/

function loadCSS() {

    const link  = document.createElement("link");
    link.rel    = "stylesheet";
    link.href   = `https://abcalceta.github.io/koha-opac/css/theme.css?v=${VERSION}`;

    document.head.appendChild(link);

}


/* --- Bootstrap --- */

if (document.readyState !== "loading") {
    init();
} else {
    document.addEventListener("DOMContentLoaded", init);
}
