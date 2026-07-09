/* ============================================================
   main.js — Application entry point
   Injected via Koha's OPACUserJS system preference.
   To change homepage content, edit config.js and
   pioneers-config.js — not this file.
   ============================================================ */

const VERSION = "2.0.0";
const REPO_BASE = new URL("../", import.meta.url).href;

/* Loaded as separate stylesheets (not a single bundled theme.css)
   so there's one file per concern and no manual "copy the partial
   into the bundle" step that can drift out of sync. Order matters
   a little for readability, not correctness — colors.css defines
   the tokens every other file reads via var(). */
const CSS_FILES = [
    "colors.css",
    "layout.css",
    "base.css",
    "navbar.css",
    "logo.css",
    "bookcovers.css",
    "homepage.css",
    "hero.css",
    "pioneers.css",
    "visit.css",
    "search.css",
    "detail.css",
];

const { SHELVES, SITE }              = await import(`./config.js?v=${VERSION}`);
const { PIONEERS }                   = await import(`./pioneers-config.js?v=${VERSION}`);
const { buildHomepageHTML, initHero, populateHeroFloaters, initPioneers } = await import(`./homepage.js?v=${VERSION}`);
const { applyCovers, refreshCovers, loadDetailCover, applySearchCovers } = await import(`./covers.js?v=${VERSION}`);
const { loadShelf }                  = await import(`./shelf.js?v=${VERSION}`);
const { initNavbar }                 = await import(`./navbar.js?v=${VERSION}`);


/* --- Entry point --- */

function init() {

    loadCSS();
    loadFonts();

    if (document.body.id === "opac-main") {
        initHomepage();
    } else if (document.body.id === "opac-detail") {
        loadDetailCover();
    } else {
        applyCovers();
        refreshCovers();
        if (document.body.id === "results") {
            applySearchCovers();
        }
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

    initNavbar(SITE);

    container.innerHTML = buildHomepageHTML(SHELVES, SITE, PIONEERS);

    initHero();
    initPioneers();

    /* Feed the hero's floating covers from whichever configured
       shelf's Koha report data comes back first — no separate
       curated list to keep in sync with the real catalog. */
    let heroFed = false;
    SHELVES.forEach((shelf, i) => {
        loadShelf(`shelf-${shelf.reportId}-${i}`, shelf.reportId, {
            onLoaded: (books) => {
                if (heroFed || !books.length) return;
                heroFed = true;
                populateHeroFloaters(books);
            },
        });
    });

}


/* --- CSS / font injection --- */

function loadCSS() {
    CSS_FILES.forEach(file => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${REPO_BASE}css/${file}?v=${VERSION}`;
        document.head.appendChild(link);
    });
}

function loadFonts() {
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect);

    const fonts = document.createElement("link");
    fonts.rel = "stylesheet";
    fonts.href = "https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";
    document.head.appendChild(fonts);
}


/* --- Bootstrap --- */

if (document.readyState !== "loading") {
    init();
} else {
    document.addEventListener("DOMContentLoaded", init);
}
