/* ============================================================
   pioneers.js — Social Science Pioneers carousel (name/photo/
   affiliation) with a list of that pioneer's papers below it.
   Content comes from pioneers-config.js — this file only wires
   up the interaction.
   ============================================================ */

import { createAvatarCover } from "./covers.js";

let pioneers = [];
let currentIndex = 0;

function slugify(str) {
    return String(str)
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") /* strip accents */
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function withDefaults(p) {
    return {
        ...p,
        slug: p.slug || slugify(p.name),
        affiliation: p.affiliation || "Affiliation to be added",
        quote: p.quote || `A representative quote from ${p.name}'s work will appear here.`,
        bio: p.bio || `A short biography for ${p.name} will appear here.`,
        photo: p.photo || "",
        pdfHref: p.pdfHref || "",
        pdfThumb: p.pdfThumb || "",
        papers: p.papers || [],
    };
}

export function buildPioneersHTML(list) {

    pioneers = (list || []).map(withDefaults);
    if (!pioneers.length) return "";

    const dots = pioneers.map((p, i) =>
        `<button class="pssc-dot" data-index="${i}" aria-label="Go to ${p.name}"></button>`
    ).join("");

    return `
    <div class="pssc-pioneers" data-screen-label="Featured Voices">
        <h2 class="pssc-section-title">Social Science Pioneers</h2>
        <p class="pssc-section-sub">Founders and fellows of the PSSC network — browse their profiles and collected papers.</p>

        <div class="pssc-carousel-wrap">
            <button class="scroll-btn left" id="pssc-carousel-prev" aria-label="Previous pioneer">&#8249;</button>
            <div class="pssc-carousel-card">
                <div class="pssc-carousel-photo" id="pssc-carousel-photo"></div>
                <div class="pssc-carousel-info">
                    <div class="pssc-carousel-name" id="pssc-carousel-name"></div>
                    <div class="pssc-carousel-affiliation" id="pssc-carousel-affiliation"></div>
                    <p class="pssc-carousel-quote" id="pssc-carousel-quote"></p>
                    <p class="pssc-carousel-bio" id="pssc-carousel-bio"></p>
                    <a href="#" class="pssc-carousel-link" id="pssc-carousel-link">Read the full essay &rarr;</a>
                </div>
            </div>
            <button class="scroll-btn right" id="pssc-carousel-next" aria-label="Next pioneer">&#8250;</button>
        </div>

        <div class="pssc-dots" id="pssc-dots">${dots}</div>

        <div class="pssc-papers-label" id="pssc-papers-label">Papers</div>
        <div class="pssc-papers-list" id="pssc-papers-list"></div>
    </div>`;

}

export function initPioneers() {

    if (!pioneers.length) return;

    document.querySelector("#pssc-carousel-prev")?.addEventListener("click", () => goTo(currentIndex - 1));
    document.querySelector("#pssc-carousel-next")?.addEventListener("click", () => goTo(currentIndex + 1));

    document.querySelector("#pssc-dots")?.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-index]");
        if (btn) goTo(Number(btn.dataset.index));
    });

    render();

}

function goTo(i) {
    const total = pioneers.length;
    currentIndex = ((i % total) + total) % total;
    render();
}

function setText(sel, text) {
    const el = document.querySelector(sel);
    if (el) el.textContent = text;
}

function render() {

    const p = pioneers[currentIndex];

    const photoSlot = document.querySelector("#pssc-carousel-photo");
    if (photoSlot) {
        photoSlot.innerHTML = "";
        photoSlot.appendChild(createAvatarCover(p.name, p.photo));
    }

    setText("#pssc-carousel-name", p.name);
    setText("#pssc-carousel-affiliation", p.affiliation);
    setText("#pssc-carousel-quote", `“${p.quote}”`);
    setText("#pssc-carousel-bio", p.bio);

    const link = document.querySelector("#pssc-carousel-link");
    if (link) {
        if (p.pdfHref) {
            link.href = p.pdfHref;
            link.style.display = "";
        } else {
            link.removeAttribute("href");
            link.style.display = "none";
        }
    }

    document.querySelectorAll("#pssc-dots .pssc-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });

    const label = document.querySelector("#pssc-papers-label");
    if (label) label.textContent = `Papers by ${p.name}`;

    const papersList = document.querySelector("#pssc-papers-list");
    if (papersList) {
        papersList.innerHTML = p.papers.length
            ? p.papers.map(paper => `
                <a href="${paper.href}" class="pssc-paper-row" target="_blank" rel="noopener">
                    <span class="pssc-paper-icon" aria-hidden="true">&#128196;</span>
                    <span class="pssc-paper-title">${paper.title}</span>
                </a>`).join("")
            : `<p class="pssc-papers-empty">No papers on file for ${p.name} yet.</p>`;
    }

}
