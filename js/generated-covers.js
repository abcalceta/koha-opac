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

        if(el.querySelector("img")) return;
        if(el.querySelector(".generated-cover")) return;

        let title = el.dataset.title || "Book";

        let cover = document.createElement("div");
        cover.className = "generated-cover";
        cover.dataset.title = title;
        cover.innerText = title;

        el.appendChild(cover);

    });

}

generateCovers();

new MutationObserver(generateCovers)
.observe(document.body,{childList:true,subtree:true});

document.querySelectorAll(".generated-cover").forEach(styleGeneratedCover);
