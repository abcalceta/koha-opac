document.querySelector(".scroll-btn.left")?.addEventListener("click",()=>{
document.querySelector(".discover-shelf").scrollBy({left:-400,behavior:"smooth"});
});

document.querySelector(".scroll-btn.right")?.addEventListener("click",()=>{
document.querySelector(".discover-shelf").scrollBy({left:400,behavior:"smooth"});
});



document.addEventListener("DOMContentLoaded", () => {

    /* only run on homepage */
	fetch("https://abcalceta.github.io/koha-opac/html/homepage.html")
	.then(r=>r.text())
	.then(html=>{
	    document.querySelector("#OpacMainUserBlock").innerHTML = html;

	    /* NOW run the random books loader */
	    loadRandomBooks();
	});

});