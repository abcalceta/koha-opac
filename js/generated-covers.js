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

document.querySelectorAll(".cover-slider").forEach(el=>{
    let fallback = el.previousElementSibling;
    if(fallback && fallback.classList.contains("generated-cover")){
        fallback.remove();
    }
});

document.querySelectorAll(".generated-cover").forEach(styleGeneratedCover);
