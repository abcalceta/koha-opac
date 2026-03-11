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



export function createGeneratedCover(title, author){

    title = String(title || "");
    author = String(author || "");

    const div = document.createElement("div");
    div.className = "generated-cover";

    /* store for refresh */
    div.dataset.title = title;
    div.dataset.author = author;

    /* generate color */
    let hash = 0;
    for(let i = 0; i < title.length; i++){
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = 220 + (Math.abs(hash) % 60);

    div.style.background =
        `linear-gradient(135deg,
        hsl(${hue},60%,30%),
        hsl(${hue+5},65%,35%))`;

    /* title */
    const titleEl = document.createElement("div");
    titleEl.className = "cover-title";
    titleEl.textContent = title.substring(0,30);

    /* author */
    const authorEl = document.createElement("div");
    authorEl.className = "cover-author";
    authorEl.textContent = author;

    div.appendChild(titleEl);
    div.appendChild(authorEl);

    return div;

}



export function refreshGeneratedCovers(){

    document.querySelectorAll(".generated-cover").forEach(el => {

        const title = el.dataset.title || "";
        const author = el.dataset.author || "";

        let hash = 0;
        for(let i = 0; i < title.length; i++){
            hash = title.charCodeAt(i) + ((hash << 5) - hash);
        }

        const hue = 220 + (Math.abs(hash) % 60);

        el.style.background =
            `linear-gradient(135deg,
            hsl(${hue},60%,30%),
            hsl(${hue+5},65%,35%))`;

        const titleEl = el.querySelector(".cover-title");
        const authorEl = el.querySelector(".cover-author");

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