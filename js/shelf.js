/* ============================================================
   shelf.js — Homepage book shelf loader
   Fetches a Koha saved report and renders the results as a
   row of book covers inside the given shelf container.
   ============================================================ */

import { createBookCover } from "./covers.js";

const PLACEHOLDER_COUNT = 6; /* shimmer cards shown while loading */


/**
 * Load books from a Koha report and populate a shelf.
 *
 * @param {string} shelfId  — id of the .discover-shelf container
 * @param {number} reportId — id of the Koha saved report to fetch
 * @param {object} [options]
 * @param {(books: object[]) => void} [options.onLoaded] — called
 *   once with the parsed book list (possibly empty) after the
 *   shelf renders, whether from a successful fetch or a fetch
 *   error/empty report. Used by hero.js to feed the floating
 *   covers from whichever shelf's data comes back first.
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
export async function loadShelf(shelfId, reportId, { onLoaded } = {}) {

    const shelf = document.querySelector(`#${shelfId}`);
    if (!shelf) return;

    showLoading(shelf);

    let data;
    try {
        const res = await fetch(`/cgi-bin/koha/svc/report?id=${reportId}`);
        data = await res.json();
    } catch {
        showEmpty(shelf);
        onLoaded?.([]);
        return;
    }

    if (!data || data.length === 0) {
        showEmpty(shelf);
        onLoaded?.([]);
        return;
    }

    shelf.innerHTML = "";

    const books = data.map(row => ({
        biblio:   row[0],
        title:    row[1] || "[NO TITLE]",
        subtitle: row[2] || "",
        author:   row[3] || "",
        coverUrl: row[4] || "",
    }));

    books.forEach(book => {

        const link       = document.createElement("a");
        link.className   = "random-book";
        link.href        = `/cgi-bin/koha/opac-detail.pl?biblionumber=${book.biblio}`;

        link.appendChild(createBookCover(book.title.substring(0, 40), book.author, book.coverUrl));

        /* A generated cover already shows the title inside the
           pastel box — only real cover images need the caption
           repeated below. */
        if (book.coverUrl) {
            const label       = document.createElement("span");
            label.className   = "booktitle";
            label.textContent = book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;
            link.appendChild(label);
        }

        shelf.appendChild(link);

    });

    attachScrollButtons(shelf);
    onLoaded?.(books);

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
