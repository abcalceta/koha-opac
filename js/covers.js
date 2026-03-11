export function ensureCovers(){

document.querySelectorAll(".bookcover").forEach(el=>{

if(el.querySelector("img")) return;
if(el.querySelector(".generated-cover")) return;

let title =
el.dataset.title ||
el.closest("tr")?.querySelector("a.title")?.innerText ||
document.querySelector("#catalogue_detail_biblio h1")?.innerText ||
"Book";

el.appendChild(createGeneratedCover(title));

});

}

function createGeneratedCover(title){

const div=document.createElement("div");
div.className="generated-cover";

let hash=0;

for(let i=0;i<title.length;i++){
hash=title.charCodeAt(i)+((hash<<5)-hash);
}

const hue=220+(Math.abs(hash)%60);

div.style.background=`linear-gradient(
135deg,
hsl(${hue},60%,60%),
hsl(${hue+15},65%,45%)
)`;

div.textContent=title;

return div;

}