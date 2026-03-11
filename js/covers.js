import { createGeneratedCover } from "./covers.js";


export function ensureCovers(){

    document.querySelectorAll(".bookcover").forEach(el => {

        /* already processed */
        if(el.dataset.coverDone) return;

        /* avoid duplicates */
        if(el.querySelector(".generated-cover")) return;

        /* skip real covers */
        const img = el.querySelector("img");
        if(img && img.src && !img.src.includes("no-cover")) return;

        el.dataset.coverDone = "1";

        const row = el.closest("tr");

        const title =
            el.dataset.title ||
            row?.querySelector("a.title")?.innerText ||
            document.querySelector("#catalogue_detail_biblio h1")?.innerText ||
            "[NO TITLE]";

        const author =
            el.dataset.author ||
            row?.querySelector(".author")?.innerText ||
            "";

        const cover = createGeneratedCover(title, author);

        el.appendChild(cover);

    });

}



export async function loadShelf(shelfId, reportId){

    const shelf = document.querySelector(`#${shelfId}`);
    if(!shelf) return;

    const data = await fetch(`/cgi-bin/koha/svc/report?id=${reportId}`)
        .then(r => r.json());

    shelf.innerHTML = "";

    data.forEach(row => {

        const biblio = row[0];
        const title = row[1] || "[NO TITLE]";
        const subtitle = row[2] || "";
        const author = row[3] || "";

        const title_short = title.substring(0,30);

        const link = document.createElement("a");
        link.className = "random-book";
        link.href = `/cgi-bin/koha/opac-detail.pl?biblionumber=${biblio}`;

        const cover = createGeneratedCover(title_short, author);

        const label = document.createElement("span");
        label.className = "booktitle";
        label.textContent = subtitle ? `${title}: ${subtitle}` : title;

        link.appendChild(cover);
        link.appendChild(label);

        shelf.appendChild(link);

    });

}



export function refreshGeneratedCovers(){

    document.querySelectorAll(".generated-cover").forEach(el => {

        const bookcover = el.closest(".bookcover");

        const title = bookcover?.dataset.title || "";
        const author = bookcover?.dataset.author || "";

        let titleEl = el.querySelector(".cover-title");
        let authorEl = el.querySelector(".cover-author");

        // colors
        let hash = 0;
        for(let i = 0; i < title.length; i++){
            hash = title.charCodeAt(i) + ((hash << 5) - hash);
        }

        const hue = 220 + (Math.abs(hash) % 60);

        el.style.background =
            `linear-gradient(135deg,
            hsl(${hue},60%,30%),
            hsl(${hue+5},65%,35%))`;


        /* remove Koha fallback text */
        el.childNodes.forEach(n=>{
          if(n.nodeType === Node.TEXT_NODE) n.remove();
        });

        if(!titleEl){
            titleEl = document.createElement("div");
            titleEl.className = "cover-title";
            el.appendChild(titleEl);
        }

        if(!authorEl){
            authorEl = document.createElement("div");
            authorEl.className = "cover-author";
            el.appendChild(authorEl);
        }

        titleEl.textContent = title.substring(0,60);
        authorEl.textContent = author;

        if(titleEl) titleEl.textContent = title.substring(0,30);
        if(authorEl) authorEl.textContent = author;
    });

}



export function watchResults(){

    const results = document.querySelector("#results");
    if(!results) return;

    const observer = new MutationObserver(() => {
        ensureCovers();
    });

    observer.observe(results,{
        childList: true,
        subtree: true
    });

}