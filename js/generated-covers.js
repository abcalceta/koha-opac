function styleGeneratedCover(el){

    let title = el.dataset.title || el.textContent || "Book";

    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }

    let hue = 220 + (Math.abs(hash) % 60);

    el.style.background = `linear-gradient(
        135deg,
        hsl(${hue},60%,60%),
        hsl(${hue+15},65%,45%)
    )`;


}

function generateCovers(){

    document.querySelectorAll(".bookcover").forEach(el => {
        /* skip if Koha already created a fallback */
        if (el.querySelector(".generated-cover")) return;
        /* skip if real cover exists */
        if (el.querySelector("img")) return;
        let title = el.dataset.title || "Book";
        let cover = createGeneratedCover(title);
        el.appendChild(cover);

    });

    document.querySelectorAll("#opac-detail .bookcover").forEach(el => {

        if(el.querySelector("img")) return;
        if(el.querySelector(".generated-cover")) return;
        let title = document.querySelector("#catalogue_detail_biblio h1")?.innerText || "Book";
        let cover = createGeneratedCover(title);
        el.appendChild(cover);

    });



}

generateCovers();

new MutationObserver(generateCovers)
.observe(document.body,{childList:true,subtree:true});


function fixKohaCovers(){

document.querySelectorAll(".bookcover").forEach(el=>{

    let realCover = el.querySelector("img");
    let generated = el.querySelector(".generated-cover");

    /* remove fallback if real cover exists */

    if(realCover && generated){
        generated.remove();
        return;
    }

    /* create fallback if none exists */

    if(!realCover && !generated){

        let title = el.dataset.title || "Book";

        let cover = createGeneratedCover(title);

        el.appendChild(cover);

    }

});

}

/* run once */

fixKohaCovers();

/* watch for Koha dynamic updates */

new MutationObserver(fixKohaCovers)
.observe(document.body,{
childList:true,
subtree:true
});


function generateMissingCovers(){

document.querySelectorAll(".bookcover").forEach(el=>{

    /* if nothing inside the container */

    if(el.children.length === 0){

        let title = el.dataset.title || "Book";

        let cover = createGeneratedCover(title);

        el.appendChild(cover);

    }

});

}

/* run once */

generateMissingCovers();

/* run when Koha dynamically loads search results */

new MutationObserver(generateMissingCovers)
.observe(document.body,{
    childList:true,
    subtree:true
});

