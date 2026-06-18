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
 * For each search result row, find its "Cover image" link
 * (already in the page from the MARC 856 field) and inject
 * a thumbnail image. No API calls needed — URL is in the DOM.
 */
export function applySearchCovers() {

    const coverLinks = Array.from(document.querySelectorAll("a")).filter(
        a => a.textContent.trim().toLowerCase() === "cover image"
    );

    coverLinks.forEach(link => {

        const row = link.closest("li, tr, .result");
        if (!row || row.dataset.coverDone) return;
        row.dataset.coverDone = "1";

        const fullUrl  = link.href;
        const thumbUrl = toThumbUrl(fullUrl);

        const img     = document.createElement("img");
        img.className = "search-cover-img";
        img.alt       = "Cover";
        img.src       = thumbUrl;

        img.onerror = () => {
            if (img.src !== fullUrl) {
                img.src = fullUrl;
            } else {
                img.closest(".search-cover-wrapper")?.remove();
            }
        };

        const coverWrapper     = document.createElement("div");
        coverWrapper.className = "search-cover-wrapper";
        coverWrapper.appendChild(img);

        /* Move all existing li children into a content wrapper,
           then rebuild the row as [cover] [content] side by side */
        const contentWrapper     = document.createElement("div");
        contentWrapper.className = "search-content-wrapper";
        while (row.firstChild) {
            contentWrapper.appendChild(row.firstChild);
        }

        row.appendChild(coverWrapper);
        row.appendChild(contentWrapper);
        row.classList.add("search-result-card");

    });

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
