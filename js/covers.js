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

    /* Use the thumbnail, not the full-size image */
    const thumbUrl = toThumbUrl(coverLink.href);

    const target =
        document.querySelector("#bookcover")  ||
        document.querySelector(".bookcover")  ||
        document.querySelector("#catalogue_detail_biblio .cover");

    if (!target) return;

    const img     = document.createElement("img");
    img.src       = thumbUrl;
    img.alt       = "Book cover";
    img.className = "detail-cover-img";
    img.onerror   = () => img.remove();

    target.innerHTML = "";
    target.appendChild(img);

}


/* ============================================================
   Search results covers
   ============================================================ */

/**
 * For each result on the search page, fetch its MARC record,
 * extract the 856 $u cover URL, and swap in the thumbnail.
 * Falls back silently to the generated cover if not found.
 * All fetches run in parallel so it's as fast as possible.
 */
export async function applySearchCovers() {

    const covers = document.querySelectorAll(".bookcover");
    if (!covers.length) return;

    await Promise.all([...covers].map(async coverEl => {

        const biblionumber = getBiblionumber(coverEl);
        if (!biblionumber) return;

        const coverUrl = await fetchMarcCoverUrl(biblionumber);
        if (!coverUrl) return;

        const img     = document.createElement("img");
        img.src       = toThumbUrl(coverUrl);
        img.alt       = "";
        img.className = "search-cover-img";

        /* On error just leave the generated cover in place */
        img.onerror = () => img.remove();

        /* Clear placeholder/generated cover and show the real image */
        coverEl.innerHTML = "";
        coverEl.appendChild(img);

    }));

}


/* Extract biblionumber from a .bookcover element. */
function getBiblionumber(coverEl) {

    /* Koha sometimes puts it as a data attribute */
    if (coverEl.dataset.biblionumber) return coverEl.dataset.biblionumber;

    /* Otherwise pull it from the title link href in the same row */
    const row       = coverEl.closest("tr, li, .searchresults");
    const titleLink = row?.querySelector("a.title, a[href*='biblionumber']");
    const match     = titleLink?.href.match(/biblionumber=(\d+)/);

    return match?.[1] || null;

}


/**
 * Fetch MARCXML for a biblio and return the first 856 $u value.
 * Uses Koha's public SVC endpoint — no auth required.
 */
async function fetchMarcCoverUrl(biblionumber) {

    try {
        const res  = await fetch(`/cgi-bin/koha/svc/bib/${biblionumber}`);
        const text = await res.text();
        const xml  = new DOMParser().parseFromString(text, "text/xml");

        for (const field of xml.querySelectorAll('datafield[tag="856"]')) {
            const u = field.querySelector('subfield[code="u"]');
            if (u?.textContent) return u.textContent;
        }
    } catch {
        return null;
    }

    return null;

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
