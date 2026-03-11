export function ensureCovers(){

document.querySelectorAll(".bookcover").forEach(el => {

    if(el.querySelector("img")) return;
    if(el.querySelector(".generated-cover")) return;

    const title =
        el.dataset.title ||
        "Book";

    const cover = createGeneratedCover(title);

    el.appendChild(cover);

});

}

function createGeneratedCover(title){

const div = document.createElement("div");
div.className = "generated-cover";
div.innerText = title;

return div;

}