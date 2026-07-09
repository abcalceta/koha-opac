/* ============================================================
   search.js — Wires a search box to Koha's real catalog search
   (the standard OPAC simple-search convention: GET opac-search.pl
   with a q= param). Shared by the hero search box and the
   navbar search box.
   ============================================================ */

const SEARCH_PATH = "/cgi-bin/koha/opac-search.pl";

export function goToSearch(query, index) {
    const q = String(query || "").trim();
    if (!q) return;
    const idx = String(index || "").trim();
    const indexParam = idx ? `&idx=${encodeURIComponent(idx)}` : "";
    window.location.href = `${SEARCH_PATH}?q=${encodeURIComponent(q)}${indexParam}`;
}

/**
 * Wire a <form>/<input> pair so Enter/submit runs a real search.
 * Safe to call with missing elements (e.g. a search box that's
 * configured off) — it's just a no-op.
 */
export function initSearchForm(form, input, indexSelect) {
    if (!form || !input) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const index = indexSelect?.value || "";
        goToSearch(input.value, index);
    });
}
