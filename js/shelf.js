export function createGeneratedCover(title, author){

    title = String(title || "");
    author = String(author || "");

    const div = document.createElement("div");
    div.className = "generated-cover";

    div.dataset.title = title;
    div.dataset.author = author;

    /* hash → color */
    let hash = 0;
    for(let i=0;i<title.length;i++){
        hash = title.charCodeAt(i) + ((hash<<5)-hash);
    }

    const hue = Math.abs(hash) % 360;

    /* richer gradient */
    div.style.background =
        `linear-gradient(
            135deg,
            hsl(${hue},50%,28%),
            hsl(${hue+10},55%,38%)
        )`;

    /* spine shading */
    div.style.boxShadow =
        "inset 8px 0 12px rgba(0,0,0,0.25), inset -3px 0 6px rgba(255,255,255,0.08)";

    /* title */
    const titleEl = document.createElement("div");
    titleEl.className = "cover-title";
    titleEl.textContent = title.substring(0,60);

    /* author */
    const authorEl = document.createElement("div");
    authorEl.className = "cover-author";
    authorEl.textContent = author;

    div.appendChild(titleEl);
    div.appendChild(authorEl);

    return div;
}