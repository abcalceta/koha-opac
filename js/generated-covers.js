function createGeneratedCover(title){

    const div = document.createElement("div");
    div.className = "generated-cover";

    let hash = 0;

    for(let i=0;i<title.length;i++){
        hash = title.charCodeAt(i) + ((hash<<5)-hash);
    }

    const hue = 220 + (Math.abs(hash) % 60);

    div.style.background = `linear-gradient(
        135deg,
        hsl(${hue},60%,60%),
        hsl(${hue+15},65%,45%)
    )`;

    div.textContent = title;

    return div;

}  

function ensureCovers(){

document.querySelectorAll(".bookcover").forEach(el=>{

    /* keep real covers */
    if(el.querySelector("img")) return;

    /* avoid duplicates */
    if(el.querySelector(".generated-cover")) return;

    const title =
        el.dataset.title ||
        el.closest(".biblio-entry, tr")?.querySelector("a.title")?.innerText ||
        document.querySelector("#catalogue_detail_biblio h1")?.innerText ||
        "Book";

    const cover = createGeneratedCover(title);

    el.appendChild(cover);

});

}


if(document.body.id === "opac-search"){
    ensureCovers();
}

if(document.body.id === "opac-detail"){
    ensureCovers();
}