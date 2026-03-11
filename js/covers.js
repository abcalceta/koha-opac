export function ensureCovers(){

document.querySelectorAll(".bookcover").forEach(el=>{

    if(el.querySelector("#random-books")) return;
    if(el.querySelector("img")) return;
    if(el.querySelector(".generated-cover")) return;

    const row = el.closest("tr");

    let title =
        el.dataset.title ||
        row?.querySelector("a.title")?.innerText ||
        document.querySelector("#catalogue_detail_biblio h1")?.innerText ||
        "[NO TITLE]";

    let author =
        el.dataset.author ||
        row?.querySelector(".author")?.innerText ||
        "";


    el.style.background = `linear-gradient(
    135deg,
    hsl(${hue},60%,60%),
    hsl(${hue+15},65%,45%)
    )`;

    el.appendChild(createGeneratedCover(title, author));

});

}


function createGeneratedCover(title, author){

const div = document.createElement("div");
div.className = "generated-cover";

let hash = 0;

for(let i=0;i<title.length;i++){
    hash = title.charCodeAt(i) + ((hash<<5)-hash);
}

const hue = 220 + (Math.abs(hash)%60);

const short = title.substring(0,30);

div.innerHTML = `
<div class="cover-title">${short}</div>
<div class="cover-author">${author}</div>
`;




return div;

}