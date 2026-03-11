function ensureCovers(){

document.querySelectorAll(".bookcover").forEach(el=>{

    let img = el.querySelector("img");
    let generated = el.querySelector(".generated-cover");

    /* remove placeholder if real cover exists */

    if(img && generated){
        generated.remove();
        return;
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