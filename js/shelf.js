/* ============================================================
   shelf.js — Homepage book shelf loader
   Fetches a Koha saved report and renders the results as a
   row of book covers inside the given shelf container.
   ============================================================ */

import { createGeneratedCover } from "./covers.js";

const PLACEHOLDER_COUNT = 6; /* shimmer cards shown while loading */


/**
 * Load books from a Koha report and populate a shelf.
 *
 * @param {string} shelfId  — id of the .discover-shelf container
 * @param {number} reportId — id of the Koha saved report to fetch
 *
 * Expected report columns:
 *   [0] biblionumber
 *   [1] title
 *   [2] subtitle
 *   [3] author
 *   [4] cover_url  ← optional; full URL to the cover image
 *                     e.g. https://library.pssc.org.ph/covers/cover_1968-1993.jpg
 *                     Thumbnails are loaded automatically from covers/thumbs/
 */
export async function loadShelf(shelfId, reportId) {

    const shelf = document.querySelector(`#${shelfId}`);
    if (!shelf) return;

    showLoading(shelf);

    let data;
    try {
        const res = await fetch(`/cgi-bin/koha/svc/report?id=${reportId}`);
        data = await res.json();
    } catch {
        showEmpty(shelf);
        return;
    }

    if (!data || data.length === 0) {
        showEmpty(shelf);
        return;
    }

    shelf.innerHTML = "";

    data.forEach(row => {

        const biblio    = row[0];
        const title     = row[1] || "[NO TITLE]";
        const subtitle  = row[2] || "";
        const author    = row[3] || "";
        const coverUrl  = row[4] || "";

        const link       = document.createElement("a");
        link.className   = "random-book";
        link.href        = `/cgi-bin/koha/opac-detail.pl?biblionumber=${biblio}`;

        const coverEl = coverUrl
            ? createImageCover(toThumbUrl(coverUrl), title, author)
            : createGeneratedCover(title.substring(0, 40), author);

        const label       = document.createElement("span");
        label.className   = "booktitle";
        label.textContent = subtitle ? `${title}: ${subtitle}` : title;

        link.appendChild(coverEl);
        link.appendChild(label);
        shelf.appendChild(link);

    });

    attachScrollButtons(shelf);

}


/**
 * Derive the thumbnail URL from a full cover URL.
 * Inserts /thumbs/ before the filename.
 * e.g. /covers/cover_1968-1993.jpg → /covers/thumbs/cover_1968-1993.jpg
 */
function toThumbUrl(url) {
    const parts    = url.split("/");
    const filename = parts.pop();
    return [...parts, "thumbs", filename].join("/");
}


/**
 * Create a .bookcover element with a real thumbnail image.
 * Falls back to a generated cover if the image fails to load.
 */
function createImageCover(thumbUrl, title, author) {

    const wrapper = document.createElement("div");
    wrapper.className = "bookcover";

    const img = document.createElement("img");
    img.alt   = title;
    img.src   = thumbUrl;

    /* If thumbnail fails to load, swap in the generated fallback */
    img.onerror = () => {
        img.remove();
        wrapper.appendChild(createGeneratedCover(title.substring(0, 40), author));
    };

    wrapper.appendChild(img);
    return wrapper;

}


/* Show animated shimmer placeholder cards while the fetch is in progress. */
function showLoading(shelf) {

    shelf.innerHTML = "";

    for (let i = 0; i < PLACEHOLDER_COUNT; i++) {
        const card = document.createElement("div");
        card.className = "shelf-placeholder";
        shelf.appendChild(card);
    }

}


/* Show a friendly message when a report returns no results. */
function showEmpty(shelf) {

    shelf.innerHTML = "";

    const msg       = document.createElement("p");
    msg.className   = "shelf-empty";
    msg.textContent = "Nothing here yet — check back soon!";

    shelf.appendChild(msg);

    /* Hide the scroll buttons — nothing to scroll */
    const wrapper = shelf.closest(".discover-wrapper");
    if (wrapper) {
        wrapper.querySelector(".scroll-btn.left")?.remove();
        wrapper.querySelector(".scroll-btn.right")?.remove();
    }

}


/* Attach the ‹ › arrow buttons to a shelf (runs once per shelf). */
function attachScrollButtons(shelf) {

    if (shelf.dataset.scrollInit) return;
    shelf.dataset.scrollInit = "1";

    const wrapper  = shelf.closest(".discover-wrapper");
    if (!wrapper) return;

    const leftBtn  = wrapper.querySelector(".scroll-btn.left");
    const rightBtn = wrapper.querySelector(".scroll-btn.right");

    leftBtn?.addEventListener("click",  () => shelf.scrollBy({ left: -400, behavior: "smooth" }));
    rightBtn?.addEventListener("click", () => shelf.scrollBy({ left:  400, behavior: "smooth" }));

}
