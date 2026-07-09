/* ============================================================
   hero.js — Front page hero: motto, search box, floating covers
   ============================================================ */

import { createBookCover } from "./covers.js";
import { initSearchForm } from "./search.js";

/* Fixed layout for the floating book covers behind the hero text.
   Position/size/animation/opacity are hand-tuned for visual
   balance across the band — WHICH book fills each slot is
   decided at runtime from real shelf data (see
   populateHeroFloaters), not a fixed image list. */
const FLOATER_LAYOUT = [
    { style: "left:4%; top:14%;",     width: 72, height: 96, opacity: 0.95, anim: "pssc-float-a", duration: "9s"  },
    { style: "left:16%; top:3%;",     width: 42, height: 56, opacity: 0.88, anim: "pssc-float-b", duration: "12s" },
    { style: "right:6%; top:8%;",     width: 58, height: 78, opacity: 0.92, anim: "pssc-float-b", duration: "11s" },
    { style: "right:20%; top:20%;",   width: 38, height: 51, opacity: 0.85, anim: "pssc-float-c", duration: "8s"  },
    { style: "right:13%; bottom:5%;", width: 64, height: 86, opacity: 0.92, anim: "pssc-float-c", duration: "10s" },
    { style: "left:10%; bottom:10%;", width: 54, height: 72, opacity: 0.88, anim: "pssc-float-b", duration: "13s" },
    { style: "left:24%; bottom:20%;", width: 40, height: 54, opacity: 0.82, anim: "pssc-float-a", duration: "14s" },
    { style: "right:2%; bottom:22%;", width: 48, height: 64, opacity: 0.85, anim: "pssc-float-a", duration: "10s" },
];

export function buildHeroHTML(site) {

    const tinted = site.heroTinted ? "pssc-hero-tinted" : "";
    const showSearch = site.searchPlacement === "hero" || site.searchPlacement === "both";

    const floaters = FLOATER_LAYOUT.map((f, i) => `
        <a href="#" class="pssc-hero-floater" id="pssc-floater-${i}"
           style="${f.style} width:${f.width}px; opacity:${f.opacity}; animation:${f.anim} ${f.duration} ease-in-out infinite;">
            <div class="pssc-hero-floater-cover" id="pssc-floater-cover-${i}" style="width:${f.width}px; height:${f.height}px;"></div>
            <div class="pssc-hero-floater-sheen"></div>
        </a>`).join("\n");

    return `
    <div class="pssc-hero ${tinted}" data-screen-label="Hero">
        <div class="pssc-hero-floaters">${floaters}</div>
        <div class="pssc-hero-content">
            <div class="pssc-hero-kicker">Philippine Social Science Council &middot; established ${site.established}</div>
            <h1 class="pssc-hero-title">PSSC Library</h1>
            <p class="pssc-hero-quote">&ldquo;${site.motto}&rdquo;</p>
            ${showSearch ? `
            <form class="pssc-hero-search" id="pssc-hero-search-form">
                <select id="pssc-hero-search-index" class="pssc-hero-search-index">
                    <option value="">Library Catalog</option>
                    <option value="ti">Title</option>
                    <option value="au">Author</option>
                    <option value="su">Subject</option>
                    <option value="isbn">ISBN</option>
                    <option value="issn">ISSN</option>
                </select>
                <input type="search" id="pssc-hero-search-input" placeholder="Search the catalog" />
                <button type="submit" class="btn-primary pssc-btn-lg">Search</button>
            </form>` : ""}
        </div>
    </div>`;

}

export function initHero() {
    initSearchForm(
        document.querySelector("#pssc-hero-search-form"),
        document.querySelector("#pssc-hero-search-input"),
        document.querySelector("#pssc-hero-search-index")
    );
}

/**
 * Fill the hero floaters with real book data once a shelf
 * finishes loading — real cover if the book has one, generated
 * pastel cover otherwise. Books are cycled across the fixed
 * floater slots. Safe to call with an empty array (floaters
 * just stay blank).
 */
export function populateHeroFloaters(books) {

    if (!books || !books.length) return;

    FLOATER_LAYOUT.forEach((f, i) => {

        const book = books[i % books.length];
        const anchor = document.querySelector(`#pssc-floater-${i}`);
        const slot = document.querySelector(`#pssc-floater-cover-${i}`);
        if (!anchor || !slot || !book) return;

        anchor.href = book.biblio ? `/cgi-bin/koha/opac-detail.pl?biblionumber=${book.biblio}` : "#";
        anchor.title = book.title;

        slot.innerHTML = "";
        const cover = createBookCover(book.title.substring(0, 40), book.author, book.coverUrl);
        cover.style.width = `${f.width}px`;
        cover.style.height = `${f.height}px`;
        slot.appendChild(cover);

    });

}
