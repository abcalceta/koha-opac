/* -----------------------------
   Gradient cover generator
----------------------------- */

function createGeneratedCover(title){

    let div = document.createElement("div");
    div.className = "generated-cover";

    let hash = 0;
    for(let i=0;i<title.length;i++){
        hash = title.charCodeAt(i) + ((hash<<5)-hash);
    }

    let hue = 220 + (Math.abs(hash) % 60);

    div.style.background = `linear-gradient(
        135deg,
        hsl(${hue},60%,60%),
        hsl(${hue+15},65%,45%)
    )`;

    div.innerText = title;

    return div;

}


/* -----------------------------
   Ensure covers exist
----------------------------- */

function ensureCovers(){

document.querySelectorAll("td.covercol").forEach(cell=>{

    let bookcover = cell.querySelector(".bookcover");

    /* create container if missing */

    if(!bookcover){

        bookcover = document.createElement("div");
        bookcover.className = "bookcover";

        cell.prepend(bookcover);

    }

    /* skip if real cover exists */

    if(bookcover.querySelector("img")) return;

    /* skip if generated already */

    if(bookcover.querySelector(".generated-cover")) return;

    let title =
        cell.closest("tr")?.querySelector(".title")?.innerText ||
        document.querySelector("#catalogue_detail_biblio h1")?.innerText ||
        "Book";

    let cover = createGeneratedCover(title);

    bookcover.appendChild(cover);

});

}


/* -----------------------------
   Run on page load
----------------------------- */

document.addEventListener("DOMContentLoaded", ensureCovers);


/* -----------------------------
   Watch dynamic updates
----------------------------- */

const observer = new MutationObserver(()=>{
    setTimeout(ensureCovers,50);
});

observer.observe(document.body,{
    childList:true,
    subtree:true
});