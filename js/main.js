/* ============================================================
   main.js — Application entry point
   Injected via Koha's OPACUserJS system preference.
   To change homepage shelves, edit config.js — not this file.
   ============================================================ */

const VERSION = "1.4.3";

const { SHELVES }                    = await import(`./config.js?v=${VERSION}`);
const { buildHomepageHTML }          = await import(`./homepage.js?v=${VERSION}`);
const { applyCovers, refreshCovers, loadDetailCover, applySearchCovers } = await import(`./covers.js?v=${VERSION}`);
const { loadShelf }                  = await import(`./shelf.js?v=${VERSION}`);


/* --- Entry point --- */

function init() {

    loadCSS();

    if (document.body.id === "opac-main") {
        initHomepage();
    } else if (document.body.id === "opac-detail") {
        loadDetailCover();
    } else {
        applyCovers();
        refreshCovers();
        applySearchCovers();
    }

}


/* --- Homepage setup --- */

function initHomepage() {

    const container =
        document.querySelector("#OpacMainUserBlock .default_body") ||
        document.querySelector("#OpacMainUserBlock")             ||
        document.querySelector("#notloggedin .maincontent")      ||
        document.querySelector("#loggedin .maincontent")         ||
        document.querySelector("main .maincontent");

    if (!container) return;

    container.innerHTML = buildHomepageHTML(SHELVES);

    /* Load each shelf in order using the same index used to build its id */
    SHELVES.forEach((shelf, i) => {
        loadShelf(`shelf-${shelf.reportId}-${i}`, shelf.reportId);
    });

}


/* --- CSS injection --- */

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
