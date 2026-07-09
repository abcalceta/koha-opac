/* ============================================================
   navbar.js — Custom front-page navbar
   Replaces Koha's default header on the homepage only (other
   pages keep Koha's stock header/search/cart untouched). Hides
   the original header rather than removing it, so any Koha
   script that expects it to exist in the DOM still finds it.
   ============================================================ */

import { initSearchForm } from "./search.js";

const NAV_LINKS = [
    { label: "Home",            href: "/cgi-bin/koha/opac-main.pl",             active: true  },
    { label: "Advanced Search", href: "/cgi-bin/koha/opac-search-advanced.pl",  active: false },
    { label: "Lists",           href: "/cgi-bin/koha/opac-shelves.pl",          active: false },
];

const LOGO_URL = new URL("../images/logo.jpg", import.meta.url).href;

/* Koha renders a real "your account"/login link at this URL both
   logged-in and logged-out — reusing whatever it rendered (text
   + href) means our custom nav reflects the real session state
   instead of always showing "Log in". */
function findAccountLink(oldHeader) {
    return oldHeader?.querySelector('a[href*="opac-user.pl"]') || null;
}

export function initNavbar(site) {

    const oldHeader =
        document.querySelector("#header") ||
        document.querySelector(".navbar");

    if (!oldHeader) return;

    const account = findAccountLink(oldHeader);
    const accountHref  = account?.getAttribute("href") || "/cgi-bin/koha/opac-user.pl";
    const accountLabel = account?.textContent?.trim()  || "Log in";

    oldHeader.classList.add("pssc-header-hidden");

    const showSearch = site.searchPlacement === "navbar" || site.searchPlacement === "both";

    const nav = document.createElement("div");
    nav.className = "pssc-navbar";
    nav.innerHTML = `
        <div class="pssc-navbar-inner">
            <a href="/cgi-bin/koha/opac-main.pl"><img class="pssc-navbar-logo" src="${LOGO_URL}" alt="Philippine Social Science Council" /></a>
            ${showSearch ? `
            <form class="pssc-navbar-search" id="pssc-navbar-search-form">
                <select id="pssc-navbar-search-index" class="pssc-search-index">
                    <option value="">Library Catalog</option>
                    <option value="ti">Title</option>
                    <option value="au">Author</option>
                    <option value="su">Subject</option>
                    <option value="isbn">ISBN</option>
                    <option value="issn">ISSN</option>
                </select>
                <input type="search" id="pssc-navbar-search-input" placeholder="Search the catalog" />
                <button type="submit" class="btn-primary pssc-btn-sm">Search</button>
            </form>` : ""}
            <nav class="pssc-navbar-nav">
                ${NAV_LINKS.map(l => `<a href="${l.href}" class="${l.active ? "pssc-nav-active" : ""}">${l.label}</a>`).join("")}
                <a href="${accountHref}">${accountLabel}</a>
            </nav>
        </div>`;

    oldHeader.insertAdjacentElement("afterend", nav);

    if (showSearch) {
        initSearchForm(
            document.querySelector("#pssc-navbar-search-form"),
            document.querySelector("#pssc-navbar-search-input"),
            document.querySelector("#pssc-navbar-search-index")
        );
    }

}
