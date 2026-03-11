document.addEventListener("DOMContentLoaded", () => {

    if(document.body.id !== "opac-main") return;

    fetch("https://abcalceta.github.io/koha-opac/html/homepage.html")
    .then(r => r.text())
    .then(html => {

        document.querySelector("#OpacMainUserBlock").innerHTML = html;

        waitForElement("#random-books", initShelf);

    });

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