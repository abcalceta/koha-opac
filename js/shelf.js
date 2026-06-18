/* ============================================================
   shelf.js — Homepage book shelf loader
   Fetches a Koha saved report and renders the results as a
   row of book covers inside the given shelf container.
   ============================================================ */

import { createGeneratedCover } from "./covers.js";


/**
 * Load books from a Koha report and populate a shelf.
 *
 * @param {string} shelfId  — id of the .discover-shelf container
 * @param {number} reportId — id of the Koha saved report to fetch
 *
 * Expected report columns: biblionumber, title, subtitle, author
 */
export async function loadShelf(shelfId, reportId) {

    const shelf = document.querySelector(`#${shelfId}`);
    if (!shelf) return;

    let data;
    try {
        const res = await fetch(`/cgi-bin/koha/svc/report?id=${reportId}`);
        data = await res.json();
    } catch {
        return;
    }

    shelf.innerHTML = "";

    data.forEach(row => {

        const biblio   = row[0];
        const title    = row[1] || "[NO TITLE]";
        const subtitle = row[2] || "";
        const author   = row[3] || "";

        const link   = document.createElement("a");
        link.className = "random-book";
        link.href      = `/cgi-bin/koha/opac-detail.pl?biblionumber=${biblio}`;

        const cover = createGeneratedCover(title.substring(0, 40), author);

        const label = document.createElement("span");
        label.className   = "booktitle";
        label.textContent = subtitle ? `${title}: ${subtitle}` : title;

        link.appendChild(cover);
        link.appendChild(label);
        shelf.appendChild(link);

    });

    attachScrollButtons(shelf);

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
