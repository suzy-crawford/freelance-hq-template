// SheFreelances OS - the AI tools' libraries (libs.js)
// Written by tools/build-libs.mjs from src/lib/runtime.js. Don't edit it by hand.
// The libraries are one bundle in the template (runtime/libs.js). loadLibs() loads it (withLibs in ToolKit.jsx
// calls it before a tool page shows), then fills in the names below. An app that has src/lib/runtime.js (the
// master app) loads the library files from there instead. A name two libraries share keeps its plain name for
// the first library in runtime.js; the other is <library>_<name>.
export const LIBS_REF = "test-3.0.1";
const SF_REPO = "suzy-crawford/freelance-hq-template";
const SF_LOCAL = import.meta.glob("./runtime.js");

export let CLIENT_RESPONSIBILITIES, COMBINED_ADD_ON, DOC_STYLES, EXPERIENCE_LEVELS, LIBRARY_VERSION, NICHES, NICHE_GROUPS, NICHE_SCREEN_COPY, PRICE_RANGES, SERVICES, SERVICE_QUIZ, STANDARD_PACKAGES, formatMoney, getFreelancerName, getNicheAffordability, getOfferService, getPriceRecommendation, getServiceName, includesAds, nicheInSentence, priceLine, scoreServiceQuiz;
export let GENERAL, IMPROVE, INDUSTRIES, getIndustry, guessIndustry;
export let SPEAKERS, VOICE, voiceFor;
export let AI_VOICE_RULES, BANNED_WORDS, buildOfferPrompt, buildRefinePrompt, cleanText, finalizeBuildResult, finalizeRefineResult;
export let buildPriceExplanation, buildScopeOfWork, offerLogic_formatMoney, getPaperData, offerToText, paperToText, scopeOfWorkToText;
export let SAMPLE_OFFERS, fallbackSamples, getSample, sampleForIdea, sampleGroupsFor, sampleMenuText, sampleOptions, samplesFor, withArticle;
export let CLAUDE_ANALYSIS_PROMPT, SEARCH_MESSAGES, TUTORIALS, chainsHiddenText, displayDomain, displayFacebook, displayInstagram, isAlreadySaved, leadFit, leadStage, prospectFromResult, savedMatchKeys, searchSuggestions, singularType;
export let SOURCE_LABELS, adLibraryUrl, analysisToText, buildAnalysisPrompt, facebookSearchUrl, finalizeAnalysis, getObservationOptions, clientsAnalysis_includesAds, instagramSearchUrl, observationLabels;
export let CLAUDE_PROMPTS, HANDOFF_FIELDS, analysisReady, fillFindOpportunityPrompt, getAssetSteps, handoffComplete, offerSummary, parseAnalysis, parseHandoff, promptDetails;
export let PREVIEW_CHECKS, previewSitePrompt;
export let BUILDS, SECTIONS, buildLinks, getBuild;
export let MESSAGE_FIELDS, OUTREACH_TONES, buildOutreachPrompt, finalizeOutreach, outreachChecks;
export let CPL_SOURCES, adsNiches_GENERAL, adsNiches_NICHES, cplSourceText, cplText, getNiche, radiusText, startingAngles;
export let ADS_LIBRARY_VERSION, ASSET_OPTIONS, BUDGET_PRESETS, BUSINESS_TYPES, DIAGNOSIS, GENERAL_AD_RULES, GOALS, HEALTH_AD_RULES, PRACTICE_BUSINESS, RULEBOOK, adsData_formatMoney, getBudgetPlan, getCampaignSetup, getComplianceRules, isHealthBusiness, resolveGoal, roundTo;
export let BLANK_RE, adToText, countBlanks, displayName, fillBlanks, getAds, headlineText, isLegacyRecord, joinPrimary, listBlanks;
export let ANGLE_CATEGORIES, categoriesForPrompt, getCategory;
export let ACCESS_STEPS, DAILY_PRESETS, PLAN_GOALS, RADIUS_PRESETS, SITE_FILL_SCHEMA, STAGES, adsCopyText, angleLine, areaText, blankPrompt, buildSiteFillPrompt, campaignDaily, dailyToMonthly, finalizeSiteFill, goalLabel, guessBusinessType, launchChecklist, summaryRows, usedAds;
export let MASTER_PROMPTS;
export let CREATIVE_FOR_CATEGORY, CREATIVE_TYPES, NICHE_CREATIVE, creativeForPrompt, getCreativeType, nicheCreative;
export let ADS_SCHEMA, FIELD_LABELS, META_MCP_URL, REWRITE_OPTIONS, TEST_PROMPT, VOICES, buildAdsCall, buildCampaignInstructions, buildFunnelCall, buildFunnelPrompt, buildRewriteCall, buildVoiceCall, campaignContext, conceptCopy, concepts, fill, finalizeConcepts, finalizeFunnel, finalizeRewrite, formatCaption, funnelType, imagePromptFor, instantFormText, moreVersionsPrompt, originalConcepts, picked, voiceEdits;
export let BATCH, CONTENT_STAGES, CTAS, FORMATS, LENGTHS, applyDayRedo, applyPillarRedo, auditNotesFrom, buildContentRewriteCall, buildDayRedoCall, buildHookRedoCall, buildPillarRedoCall, buildPositioningRedoCall, buildPostsCall, buildStrategyCall, carouselDesignPrompt, contentDocHtml, contentDocPage, contentDocText, finalizeContentRewrite, finalizePosts, finalizeStrategy, formatLabel, nextBatch, postText, shotList, strategyDocHtml, strategyDocPage, strategyDocText;

function sfFill(L) {
  ({ CLIENT_RESPONSIBILITIES, COMBINED_ADD_ON, DOC_STYLES, EXPERIENCE_LEVELS, LIBRARY_VERSION, NICHES, NICHE_GROUPS, NICHE_SCREEN_COPY, PRICE_RANGES, SERVICES, SERVICE_QUIZ, STANDARD_PACKAGES, formatMoney, getFreelancerName, getNicheAffordability, getOfferService, getPriceRecommendation, getServiceName, includesAds, nicheInSentence, priceLine, scoreServiceQuiz } = L.offerData);
  ({ GENERAL, IMPROVE, INDUSTRIES, getIndustry, guessIndustry } = L.buildsExtras);
  ({ SPEAKERS, VOICE, voiceFor } = L.copyVoice);
  ({ AI_VOICE_RULES, BANNED_WORDS, buildOfferPrompt, buildRefinePrompt, cleanText, finalizeBuildResult, finalizeRefineResult } = L.offerPrompts);
  ({ buildPriceExplanation, buildScopeOfWork, formatMoney: offerLogic_formatMoney, getPaperData, offerToText, paperToText, scopeOfWorkToText } = L.offerLogic);
  ({ SAMPLE_OFFERS, fallbackSamples, getSample, sampleForIdea, sampleGroupsFor, sampleMenuText, sampleOptions, samplesFor, withArticle } = L.sampleOffers);
  ({ CLAUDE_ANALYSIS_PROMPT, SEARCH_MESSAGES, TUTORIALS, chainsHiddenText, displayDomain, displayFacebook, displayInstagram, isAlreadySaved, leadFit, leadStage, prospectFromResult, savedMatchKeys, searchSuggestions, singularType } = L.clientsLogic);
  ({ SOURCE_LABELS, adLibraryUrl, analysisToText, buildAnalysisPrompt, facebookSearchUrl, finalizeAnalysis, getObservationOptions, includesAds: clientsAnalysis_includesAds, instagramSearchUrl, observationLabels } = L.clientsAnalysis);
  ({ CLAUDE_PROMPTS, HANDOFF_FIELDS, analysisReady, fillFindOpportunityPrompt, getAssetSteps, handoffComplete, offerSummary, parseAnalysis, parseHandoff, promptDetails } = L.clientsClaudePrompt);
  ({ PREVIEW_CHECKS, previewSitePrompt } = L.clientsPreviewSite);
  ({ BUILDS, SECTIONS, buildLinks, getBuild } = L.clientsBuilds);
  ({ MESSAGE_FIELDS, OUTREACH_TONES, buildOutreachPrompt, finalizeOutreach, outreachChecks } = L.clientsOutreach);
  ({ CPL_SOURCES, GENERAL: adsNiches_GENERAL, NICHES: adsNiches_NICHES, cplSourceText, cplText, getNiche, radiusText, startingAngles } = L.adsNiches);
  ({ ADS_LIBRARY_VERSION, ASSET_OPTIONS, BUDGET_PRESETS, BUSINESS_TYPES, DIAGNOSIS, GENERAL_AD_RULES, GOALS, HEALTH_AD_RULES, PRACTICE_BUSINESS, RULEBOOK, formatMoney: adsData_formatMoney, getBudgetPlan, getCampaignSetup, getComplianceRules, isHealthBusiness, resolveGoal, roundTo } = L.adsData);
  ({ BLANK_RE, adToText, countBlanks, displayName, fillBlanks, getAds, headlineText, isLegacyRecord, joinPrimary, listBlanks } = L.adsCards);
  ({ ANGLE_CATEGORIES, categoriesForPrompt, getCategory } = L.adsAngleLibrary);
  ({ ACCESS_STEPS, DAILY_PRESETS, PLAN_GOALS, RADIUS_PRESETS, SITE_FILL_SCHEMA, STAGES, adsCopyText, angleLine, areaText, blankPrompt, buildSiteFillPrompt, campaignDaily, dailyToMonthly, finalizeSiteFill, goalLabel, guessBusinessType, launchChecklist, summaryRows, usedAds } = L.adsBuilder);
  ({ MASTER_PROMPTS } = L.adsMasterPrompts);
  ({ CREATIVE_FOR_CATEGORY, CREATIVE_TYPES, NICHE_CREATIVE, creativeForPrompt, getCreativeType, nicheCreative } = L.adsCreative);
  ({ ADS_SCHEMA, FIELD_LABELS, META_MCP_URL, REWRITE_OPTIONS, TEST_PROMPT, VOICES, buildAdsCall, buildCampaignInstructions, buildFunnelCall, buildFunnelPrompt, buildRewriteCall, buildVoiceCall, campaignContext, conceptCopy, concepts, fill, finalizeConcepts, finalizeFunnel, finalizeRewrite, formatCaption, funnelType, imagePromptFor, instantFormText, moreVersionsPrompt, originalConcepts, picked, voiceEdits } = L.adsEngine);
  ({ BATCH, CONTENT_STAGES, CTAS, FORMATS, LENGTHS, applyDayRedo, applyPillarRedo, auditNotesFrom, buildContentRewriteCall, buildDayRedoCall, buildHookRedoCall, buildPillarRedoCall, buildPositioningRedoCall, buildPostsCall, buildStrategyCall, carouselDesignPrompt, contentDocHtml, contentDocPage, contentDocText, finalizeContentRewrite, finalizePosts, finalizeStrategy, formatLabel, nextBatch, postText, shotList, strategyDocHtml, strategyDocPage, strategyDocText } = L.contentEngine);
}

async function sfImportBundle() {
  try {
    return await import(/* @vite-ignore */ `https://cdn.jsdelivr.net/gh/${SF_REPO}@${LIBS_REF}/runtime/libs.js`);
  } catch {
    // The CDN is down or blocked: read the same file from GitHub and load it from memory.
    const res = await fetch(`https://raw.githubusercontent.com/${SF_REPO}/${LIBS_REF}/runtime/libs.js`);
    if (!res.ok) throw new Error(`Couldn't load the AI tools (${res.status}). Check your internet connection and refresh.`);
    const url = URL.createObjectURL(new Blob([await res.text()], { type: "text/javascript" }));
    try {
      return await import(/* @vite-ignore */ url);
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

let sfLoading = null;
export let libsReady = false;
export function loadLibs() {
  sfLoading ??= (SF_LOCAL["./runtime.js"] ? SF_LOCAL["./runtime.js"]() : sfImportBundle()).then(
    (m) => {
      sfFill(m);
      libsReady = true;
      m.startLiveContent?.();
    },
    (e) => {
      sfLoading = null;
      throw e;
    }
  );
  return sfLoading;
}
