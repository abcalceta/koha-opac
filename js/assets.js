/* ============================================================
   assets.js — Taga-Koha ng Libro (TKL) integration layer
   Fetches and caches metadata.json for a biblionumber, and
   progressively enhances covers wherever the theme already falls
   back to a generated placeholder (detail page, homepage shelves,
   search results, generic listings).

   Renders only what metadata.json describes — never guesses
   filenames, never probes for assets, never touches an element
   that already shows a real cover image.
   ============================================================ */

export const ASSETS = {
    server: "https://library.pssc.org.ph/book-assets",
};

const _cache = new Map();

/**
 * Fetch and cache metadata.json for a biblionumber.
 * Returns null (and caches the null) on any failure — network
 * error, non-OK response, missing file, or malformed JSON — so
 * callers can fall back to existing Koha behavior without caring
 * why. One request per biblionumber for the page's lifetime.
 */
export async function loadMetadata(biblionumber) {

    if (_cache.has(biblionumber)) return _cache.get(biblionumber);

    let metadata = null;
    try {
        const res = await fetch(`${ASSETS.server}/${biblionumber}/metadata.json`);
        if (res.ok) metadata = await res.json();
    } catch {
        metadata = null;
    }

    _cache.set(biblionumber, metadata);
    return metadata;

}

/**
 * Resolve the front cover URL for a biblionumber, or null if TKL
 * has no cover for it (NO_COVER, unprocessed book, fetch failure).
 */
export async function getFrontCoverUrl(biblionumber) {

    const metadata    = await loadMetadata(biblionumber);
    const frontAsset  = metadata?.cover?.assets?.find(a => a.role === "front");
    if (!frontAsset) return null;

    return `${ASSETS.server}/${metadata.book.biblionumber}/${frontAsset.path}`;

}

/**
 * Swap a .bookcover element's placeholder for the TKL front
 * cover, if one exists. Gap-filler only: no-ops if the element
 * already shows a real image, both before and after the async
 * lookup (a real cover may win the race while metadata loads).
 * Fire-and-forget — safe to call without awaiting.
 */
export async function enhanceBookCover(el, biblionumber) {

    if (!el || !biblionumber || el.querySelector("img")) return;

    const url = await getFrontCoverUrl(biblionumber);
    if (!url || el.querySelector("img")) return;

    const img     = document.createElement("img");
    img.alt       = "";
    img.src       = url;
    img.onerror   = () => img.remove();

    el.innerHTML = "";
    el.appendChild(img);

}

/**
 * Detail-page cover enhancement: shows the TKL front cover in the
 * same slot loadDetailCover() targets, but only as a gap-filler —
 * skipped if a real cover image is already showing there (MARC or
 * Koha's own cover service).
 */
export function renderCover(metadata) {

    const frontAsset = metadata?.cover?.assets?.find(a => a.role === "front");
    if (!frontAsset) return;

    const target =
        document.querySelector("#bookcover")  ||
        document.querySelector(".bookcover")  ||
        document.querySelector("#catalogue_detail_biblio .cover");

    if (!target || target.querySelector("img")) return;

    const img     = document.createElement("img");
    img.alt       = "Book cover";
    img.className = "detail-cover-img";
    img.src       = `${ASSETS.server}/${metadata.book.biblionumber}/${frontAsset.path}`;

    target.innerHTML = "";
    target.appendChild(img);

}

/**
 * Detail-page entry point. Reads biblionumber from the URL, loads
 * metadata, and enhances the cover if TKL has one. Called from
 * main.js after the existing MARC-based cover logic has run.
 */
export async function enhanceWithAssets() {

    const biblionumber = new URLSearchParams(location.search).get("biblionumber");
    if (!biblionumber) return;

    const metadata = await loadMetadata(biblionumber);
    if (metadata) renderCover(metadata);

}
