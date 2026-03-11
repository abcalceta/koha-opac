# HOW TO USE

## In OPACUserJS put this:

'''
(function(){

let css = document.createElement("link");
css.rel = "stylesheet";
css.href = "https://USERNAME.github.io/koha-opac/css/theme.css";
document.head.appendChild(css);

let script = document.createElement("script");
script.type = "module";
script.src = "https://USERNAME.github.io/koha-opac/js/main.js";
document.head.appendChild(script);

})();
'''