export function ensureCovers(){

document.querySelectorAll(".bookcover").forEach(el=>{

    /* prevent reprocessing */
    if(el.dataset.coverDone) return;

    /* skip if real cover image exists */
    if(el.querySelector("img")) return;

    el.dataset.coverDone = "1";

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

    const cover = createGeneratedCover(title, author);

    el.appendChild(cover);

});
}


function createGeneratedCover(title, author){

    div.className = "generated-cover";

    /* generate color from title */

    let hash = 0;

    for(let i=0;i<title.length;i++){
        hash = title.charCodeAt(i) + ((hash<<5)-hash);
    }

    const hue = 220 + (Math.abs(hash)%60);

    /* apply gradient */

    div.style.background = `linear-gradient(
    135deg,
    hsl(${hue},60%,60%),
    hsl(${hue+15},65%,45%)
    )`;

    /* shorten title */

    const short = title.substring(0,30);

    div.innerHTML = `
    <div class="cover-title">${short}</div>
    <div class="cover-author">${author}</div>
    `;

    return div;

}