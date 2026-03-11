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

    div.dataset.title = title;
    div.dataset.author = author;

    /* hash → color */
    let hash = 0;
    for(let i=0;i<title.length;i++){
        hash = title.charCodeAt(i) + ((hash<<5)-hash);
    }

    const hue = Math.abs(hash) % 360;

    /* richer gradient */
    div.style.background =
        `linear-gradient(
            135deg,
            hsl(${hue},50%,28%),
            hsl(${hue+10},55%,38%)
        )`;

    /* spine shading */
    div.style.boxShadow =
        "inset 8px 0 12px rgba(0,0,0,0.25), inset -3px 0 6px rgba(255,255,255,0.08)";

    /* title */
    const titleEl = document.createElement("div");
    titleEl.className = "cover-title";
    titleEl.textContent = title.substring(0,60);

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