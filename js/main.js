document.addEventListener("DOMContentLoaded", () => {

    if(document.body.id !== "opac-main") return;

    fetch("https://abcalceta.github.io/koha-opac/html/homepage.html")
    .then(r => r.text())
    .then(html => {

        const block = document.querySelector("#OpacMainUserBlock");

        if(!block){
            console.log("OpacMainUserBlock not found");
            return;
        }

        /* find the real container Koha renders */
        let container = block.querySelector(".default_body");

        if(!container){
            container = block;
        }

        container.innerHTML = html;

        /* wait one frame for DOM update */
        requestAnimationFrame(() => {
            initShelf();
        });

    })
    .catch(err => console.error("Homepage load error:", err));

});

function initShelf(){

    loadRandomBooks();

    const shelf = document.querySelector(".discover-shelf");

    document.querySelector(".scroll-btn.left")?.addEventListener("click",()=>{
        shelf.scrollBy({left:-400,behavior:"smooth"});
    });

    document.querySelector(".scroll-btn.right")?.addEventListener("click",()=>{
        shelf.scrollBy({left:400,behavior:"smooth"});
    });

}


function waitForElement(selector, callback){

    const el = document.querySelector(selector);

    if(el){
        callback(el);
        return;
    }

    const observer = new MutationObserver(() => {

        const el = document.querySelector(selector);

        if(el){
            observer.disconnect();
            callback(el);
        }

    });

    observer.observe(document.body,{
        childList:true,
        subtree:true
    });

}