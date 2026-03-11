import { ensureCovers } from "./covers.js";

export async function loadRandomBooks(){

let shelf=document.querySelector("#random-books");

if(!shelf) return;

let data=await fetch("/cgi-bin/koha/svc/report?id=6")
.then(r=>r.json());

let html="";

data.forEach(row=>{

	let biblio=row[0];
	let title=row[1]||"[NO TITLE]";
	let subtitle=row[2]||"";
	let author=row[3]||"";

	let title_short = title.substring(0,30);
	let subtitle_short = subtitle.substring(0,10)+"...";


	let hash = 0;

	for(let i=0;i<title.length;i++){
	    hash = title.charCodeAt(i) + ((hash<<5)-hash);
	}

	const hue = 220 + (Math.abs(hash)%60);

let hue = 220 + (Math.abs(hash) % 60);

	html+=`
	<a class="random-book"
	href="/cgi-bin/koha/opac-detail.pl?biblionumber=${biblio}">
		<div class="bookcover"
		style="background:linear-gradient(135deg,
		hsl(${hue},60%,60%),
		hsl(${hue+15},65%,45%))" 
		data-title="${title_short}"
    	data-subtitle="${subtitle_short}"
     	data-author="${author}">
     	<span class="cover-title">${title_short}</span>
     	<span class="cover-author">${author}</span>
     </div>
	<span class="booktitle">${title} ${subtitle}</span>
	</a>
	`;

});

shelf.innerHTML=html;

ensureCovers();

document.querySelector(".scroll-btn.left")?.addEventListener("click",()=>{
shelf.scrollBy({left:-400,behavior:"smooth"});
});

document.querySelector(".scroll-btn.right")?.addEventListener("click",()=>{
shelf.scrollBy({left:400,behavior:"smooth"});
});

}