function createGeneratedCover(title){

    let hash = 0;
    for(let i=0;i<title.length;i++){
        hash = title.charCodeAt(i) + ((hash<<5)-hash);
    }

    let hue = 220 + (Math.abs(hash) % 60);

    return {
        background:`linear-gradient(
            135deg,
            hsl(${hue},60%,60%),
            hsl(${hue+15},65%,45%)
        )`,
        title:title
    };

}

function ensureCovers(){

document.querySelectorAll(".bookcover").forEach(el=>{

    let img = el.querySelector("img");
    let generated = el.querySelector(".generated-cover");

    let title =
        el.dataset.title ||
        document.querySelector("#catalogue_detail_biblio h1")?.innerText ||
        "Book";

    /* if real cover exists remove placeholder */

    if(img && generated){
        generated.remove();
        return;
    }

    /* generate colors */

    let style = createGeneratedCover(title);

    /* create placeholder if none exists */

    if(!img && !generated){

        generated = document.createElement("div");
        generated.className = "generated-cover";
        el.appendChild(generated);

    }

    /* apply styling */

    if(generated){
        generated.style.background = style.background;
        generated.innerText = style.title;
    }

});

}


ensureCovers();

const observer = new MutationObserver(()=>{
    setTimeout(ensureCovers,50);
});

observer.observe(document.body,{
    childList:true,
    subtree:true
});