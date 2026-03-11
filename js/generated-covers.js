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

function ensureCovers(){

document.querySelectorAll(".bookcover").forEach(el=>{

    let img = el.querySelector("img");
    let generated = el.querySelector(".generated-cover");

    /* remove placeholder if real cover exists */

    if(img && generated){
        generated.remove();
        return;
    }

    if(!img && generated){
        generated.remove();
        let title =
            el.dataset.title ||
            document.querySelector("#catalogue_detail_biblio h1")?.innerText ||
            "Book";

        let cover = createGeneratedCover(title);

        el.appendChild(cover);    
    }

    /* create placeholder if empty */

    if(!img && !generated){

        let title =
            el.dataset.title ||
            document.querySelector("#catalogue_detail_biblio h1")?.innerText ||
            "Book";

        let cover = createGeneratedCover(title);

        el.appendChild(cover);

    }





});

}

/* run once */

ensureCovers();

/* rerun when Koha updates results */

new MutationObserver(ensureCovers)
.observe(document.body,{
childList:true,
subtree:true
});