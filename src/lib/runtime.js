// SheFreelances OS - the AI tools' libraries in one piece (runtime.js)
// tools/build-manifest.mjs bundles this file into runtime/libs.js in the template. A member's app loads that
// bundle when a tool page opens (loadLibs in hq.js), so a tool's build copies only its screens, never these
// libraries. An app that has this file (the master app) loads the libraries from here instead.
// Screens import the libraries through src/lib/libs.js, never directly. When two libraries export the same
// name, the one listed first here keeps the plain name in libs.js; the other is <library>_<name>.
export * as offerData from "./offerData";
export * as buildsExtras from "./buildsExtras";
export * as copyVoice from "./copyVoice";
export * as offerPrompts from "./offerPrompts";
export * as offerLogic from "./offerLogic";
export * as sampleOffers from "./sampleOffers";
export * as clientsLogic from "./clientsLogic";
export * as clientsAnalysis from "./clientsAnalysis";
export * as clientsClaudePrompt from "./clientsClaudePrompt";
export * as clientsPreviewSite from "./clientsPreviewSite";
export * as clientsBuilds from "./clientsBuilds";
export * as clientsOutreach from "./clientsOutreach";
export * as adsNiches from "./adsNiches";
export * as adsData from "./adsData";
export * as adsCards from "./adsCards";
export * as adsAngleLibrary from "./adsAngleLibrary";
export * as adsBuilder from "./adsBuilder";
export * as adsMasterPrompts from "./adsMasterPrompts";
export * as adsCreative from "./adsCreative";
export * as adsEngine from "./adsEngine";
export * as contentEngine from "./contentEngine";
export { startLiveContent } from "./liveContent";
