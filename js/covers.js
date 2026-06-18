/* ============================================================
   covers.js — Procedurally-generated book cover fallbacks
   Used when no real cover image is available from a cover
   service. Each cover gets a unique gradient derived from its
   title so it's consistent across page loads.
   ============================================================ */


/* --- Public API ---
   createGeneratedCover(title, author) → DOM element
   applyCovers()     — add fallback covers to all .bookcover
   refreshCovers()   — re-style covers Koha already injected
   watchResults()    — observe #results for dynamic content
*/


/**
 * Build a .generated-cover <div> for the given title/author.
 * The background gradient hue is derived from the title string
 * so the same book always gets the same color.
 */
export function createGeneratedCover(title, author) {

    title  = String(title  || "");
    author = String(author || "");

    const div = document.createElement("div");
    div.className = "generated-cover";

    /* Deterministic hue from title characters — keeps the
       range in the purple/violet band (240–300°) to match
       the site palette while still varying per book. */
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
 * Safe to call multiple times — skips already-processed covers.
 */
export function applyCovers() {

    document.querySelectorAll(".bookcover").forEach(el => {

        if (el.querySelector(".generated-cover")) return;

        /* Skip if a real (non-placeholder) image loaded */
        const img = el.querySelector("img");
        if (img && img.src && !img.src.includes("no-cover")) return;

        const row = el.closest("tr");

        const title =
            el.dataset.title                              ||
            row?.querySelector("a.title")?.innerText     ||
            "[NO TITLE]";

        const author =
            el.dataset.author                            ||
            row?.querySelector(".author")?.innerText    ||
            "";

        el.appendChild(createGeneratedCover(title, author));

    });

}


/**
 * Re-apply gradient + text to .generated-cover elements that
 * Koha may have injected with its own placeholder content.
 * Call this on non-homepage pages where covers already exist.
 */
export function refreshCovers() {

    document.querySelectorAll(".generated-cover").forEach(el => {

        const bookcover = el.closest(".bookcover");
        const title     = bookcover?.dataset.title  || "";
        const author    = bookcover?.dataset.author || "";

        /* Recompute hue with the same algorithm as createGeneratedCover */
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

        /* Koha sometimes injects raw text nodes — remove them */
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


/**
 * On the detail page, find the "Cover image" link in the
 * Online resources section and display it as an actual image.
 * Koha stores the URL in the MARC record (856 field) and
 * renders it as a link — we just grab it and show the image.
 */
export function loadDetailCover() {

    /* Find any link whose visible text is "Cover image" */
    const coverLink = Array.from(document.querySelectorAll("a")).find(
        a => a.textContent.trim().toLowerCase() === "cover image"
    );

    if (!coverLink) return;

    const url = coverLink.href;

    /* Target Koha's book cover placeholder on the detail page */
    const target =
        document.querySelector("#bookcover")  ||
        document.querySelector(".bookcover")  ||
        document.querySelector("#catalogue_detail_biblio .cover");

    if (!target) return;

    const img = document.createElement("img");
    img.src   = url;
    img.alt   = "Book cover";
    img.className = "detail-cover-img";

    /* If the image fails to load, leave the area empty rather than broken */
    img.onerror = () => img.remove();

    target.innerHTML = "";
    target.appendChild(img);

}


/**
 * Attach a MutationObserver to #results so generated covers
 * are applied when Koha loads result rows dynamically.
 */
export function watchResults() {

    const results = document.querySelector("#results");
    if (!results) return;

    const observer = new MutationObserver(() => {
        applyCovers();
        refreshCovers();
    });

    observer.observe(results, { childList: true, subtree: true });

}
