/* ============================================================
   visualization-loader.js — Generic homepage visualization engine
   Turns config.js's VISUALIZATIONS list into homepage sections.
   This file knows nothing about decades, subjects, or Chart.js —
   it only knows how to wrap a titled section around whatever a
   registered renderer draws into it.

   HOW TO ADD A NEW VISUALIZATION TYPE (e.g. a Subject Cloud):
     1. Write js/subject-cloud.js exporting a render function with
        the signature (mountEl, vizConfig) => void, same contract
        as renderPublicationTimeline below. It's responsible for
        its own loading state, data fetch, and empty state.
     2. Import it here and add one line to RENDERERS:
          subjectCloud: renderSubjectCloud
     3. Add its stylesheet filename to CSS_FILES in main.js.
     4. Add an entry to VISUALIZATIONS in config.js with
        { type: "subjectCloud", title: "...", reportId: N, ... }.
   Nothing in this file, homepage.js, or main.js needs to change
   beyond that one RENDERERS line — the section chrome (heading,
   container, screen-reader label) is generated generically here.
   ============================================================ */

import { renderPublicationTimeline } from "./publication-timeline.js";

/* Registry of renderers, keyed by the "type" field in a
   VISUALIZATIONS entry. Each renderer owns everything inside its
   mount element — this file only owns the section shell around it. */
const RENDERERS = {
    publicationTimeline: renderPublicationTimeline,
};

/**
 * A visualization is active if it's enabled (default true when the
 * field is omitted) and its "type" matches a registered renderer.
 * Shared by the HTML builder and the initializer so they never
 * disagree about which entries actually appear on the page.
 */
function activeVisualizations(visualizations) {
    return (visualizations || []).filter(viz => {
        if (viz.enabled === false) return false;
        if (!RENDERERS[viz.type]) {
            console.warn(`visualization-loader: unknown visualization type "${viz.type}" (title: "${viz.title}") — is it registered in RENDERERS?`);
            return false;
        }
        return true;
    });
}

function mountId(viz, i) {
    return `viz-${viz.type}-${i}`;
}

/**
 * Build the empty section shells for every configured, enabled,
 * recognized visualization. Called from homepage.js as part of the
 * full-page HTML string, before any data has loaded.
 */
export function buildVisualizationSectionsHTML(visualizations) {

    return activeVisualizations(visualizations).map((viz, i) => `
        <div class="pssc-viz-section" data-screen-label="${viz.title}">
            <h2 class="pssc-section-title">${viz.title}</h2>
            <div id="${mountId(viz, i)}" class="pssc-viz-mount"></div>
        </div>`
    ).join("\n");

}

/**
 * Hand each mount element to its renderer. Called from main.js
 * once buildVisualizationSectionsHTML()'s output is actually in
 * the DOM (mirrors how loadShelf() is called after buildHomepageHTML
 * for the shelves).
 */
export function initVisualizations(visualizations) {

    activeVisualizations(visualizations).forEach((viz, i) => {

        const mount = document.querySelector(`#${mountId(viz, i)}`);
        if (!mount) return;

        RENDERERS[viz.type](mount, viz);

    });

}
