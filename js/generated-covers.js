/* ---------------------------
   Gradient cover generator
--------------------------- */

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


/* ---------------------------
   Ensure covers exist
--------------------------- */

function ensureCovers(){

document.querySelectorAll(".bookcover").forEach(el=>{

    /* skip if real cover exists */
    if(el.querySelector("img")) return;

    /* skip if we already generated one */
    if(el.querySelector(".generated-cover")) return;

    let title =
        el.dataset.title ||
        el.closest("tr")?.querySelector(".title")?.innerText ||
        document.querySelector("#catalogue_detail_biblio h1")?.innerText ||
        "Book";

    let cover = createGeneratedCover(title);

    el.appendChild(cover);

});

}


/* ---------------------------
   Run once on page load
--------------------------- */

document.addEventListener("DOMContentLoaded", ensureCovers);


/* ---------------------------
   Watch for Koha dynamic updates
--------------------------- */

const coverObserver = new MutationObserver(()=>{

    setTimeout(ensureCovers,50);

});

coverObserver.observe(document.body,{
    childList:true,
    subtree:true
});