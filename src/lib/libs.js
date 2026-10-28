// SheFreelances OS - the AI tools' libraries (libs.js)
// Written by tools/build-libs.mjs from src/lib/runtime.js. Don't edit it by hand.
// The libraries load when a tool page opens (loadLibs in hq.js), before any screen that imports this file.
// A name two libraries share keeps its plain name for the first library in runtime.js; the other is <library>_<name>.
const L = globalThis.__sfLibs;
if (!L) throw new Error("The tool libraries haven't loaded yet. Refresh the page.");

export const { CLIENT_RESPONSIBILITIES, COMBINED_ADD_ON, DOC_STYLES, EXPERIENCE_LEVELS, LIBRARY_VERSION, NICHES, NICHE_GROUPS, NICHE_SCREEN_COPY, PRICE_RANGES, SERVICES, SERVICE_QUIZ, STANDARD_PACKAGES, formatMoney, getFreelancerName, getNicheAffordability, getOfferService, getPriceRecommendation, getServiceName, includesAds, nicheInSentence, priceLine, scoreServiceQuiz } = L.offerData;
export const { GENERAL, IMPROVE, INDUSTRIES, getIndustry, guessIndustry } = L.buildsExtras;
export const { SPEAKERS, VOICE, voiceFor } = L.copyVoice;
export const { AI_VOICE_RULES, BANNED_WORDS, buildOfferPrompt, buildRefinePrompt, cleanText, finalizeBuildResult, finalizeRefineResult } = L.offerPrompts;
export const { buildPriceExplanation, buildScopeOfWork, formatMoney: offerLogic_formatMoney, getPaperData, offerToText, paperToText, scopeOfWorkToText } = L.offerLogic;
export const { SAMPLE_OFFERS, fallbackSamples, getSample, sampleForIdea, sampleGroupsFor, sampleMenuText, sampleOptions, samplesFor, withArticle } = L.sampleOffers;
export const { CLAUDE_ANALYSIS_PROMPT, SEARCH_MESSAGES, TUTORIALS, chainsHiddenText, displayDomain, displayFacebook, displayInstagram, isAlreadySaved, leadFit, leadStage, prospectFromResult, savedMatchKeys, searchSuggestions, singularType } = L.clientsLogic;
export const { SOURCE_LABELS, adLibraryUrl, analysisToText, buildAnalysisPrompt, facebookSearchUrl, finalizeAnalysis, getObservationOptions, includesAds: clientsAnalysis_includesAds, instagramSearchUrl, observationLabels } = L.clientsAnalysis;
export const { CLAUDE_PROMPTS, HANDOFF_FIELDS, analysisReady, fillFindOpportunityPrompt, getAssetSteps, handoffComplete, offerSummary, parseAnalysis, parseHandoff, promptDetails } = L.clientsClaudePrompt;
export const { PREVIEW_CHECKS, previewSitePrompt } = L.clientsPreviewSite;
export const { BUILDS, SECTIONS, buildLinks, getBuild } = L.clientsBuilds;
export const { MESSAGE_FIELDS, OUTREACH_TONES, buildOutreachPrompt, finalizeOutreach, outreachChecks } = L.clientsOutreach;
export const { CPL_SOURCES, GENERAL: adsNiches_GENERAL, NICHES: adsNiches_NICHES, cplSourceText, cplText, getNiche, radiusText, startingAngles } = L.adsNiches;
export const { ADS_LIBRARY_VERSION, ASSET_OPTIONS, BUDGET_PRESETS, BUSINESS_TYPES, DIAGNOSIS, GENERAL_AD_RULES, GOALS, HEALTH_AD_RULES, PRACTICE_BUSINESS, RULEBOOK, formatMoney: adsData_formatMoney, getBudgetPlan, getCampaignSetup, getComplianceRules, isHealthBusiness, resolveGoal, roundTo } = L.adsData;
export const { BLANK_RE, adToText, countBlanks, displayName, fillBlanks, getAds, headlineText, isLegacyRecord, joinPrimary, listBlanks } = L.adsCards;
export const { ANGLE_CATEGORIES, categoriesForPrompt, getCategory } = L.adsAngleLibrary;
export const { ACCESS_STEPS, DAILY_PRESETS, PLAN_GOALS, RADIUS_PRESETS, SITE_FILL_SCHEMA, STAGES, adsCopyText, angleLine, areaText, blankPrompt, buildSiteFillPrompt, campaignDaily, dailyToMonthly, finalizeSiteFill, goalLabel, guessBusinessType, launchChecklist, summaryRows, usedAds } = L.adsBuilder;
export const { MASTER_PROMPTS } = L.adsMasterPrompts;
export const { CREATIVE_FOR_CATEGORY, CREATIVE_TYPES, NICHE_CREATIVE, creativeForPrompt, getCreativeType, nicheCreative } = L.adsCreative;
export const { ADS_SCHEMA, FIELD_LABELS, META_MCP_URL, REWRITE_OPTIONS, TEST_PROMPT, VOICES, buildAdsCall, buildCampaignInstructions, buildFunnelCall, buildFunnelPrompt, buildRewriteCall, buildVoiceCall, campaignContext, conceptCopy, concepts, fill, finalizeConcepts, finalizeFunnel, finalizeRewrite, formatCaption, funnelType, imagePromptFor, instantFormText, moreVersionsPrompt, originalConcepts, picked, voiceEdits } = L.adsEngine;
export const { BATCH, CONTENT_STAGES, CTAS, FORMATS, LENGTHS, applyDayRedo, applyPillarRedo, auditNotesFrom, buildContentRewriteCall, buildDayRedoCall, buildHookRedoCall, buildPillarRedoCall, buildPositioningRedoCall, buildPostsCall, buildStrategyCall, carouselDesignPrompt, contentDocHtml, contentDocPage, contentDocText, finalizeContentRewrite, finalizePosts, finalizeStrategy, formatLabel, nextBatch, postText, shotList, strategyDocHtml, strategyDocPage, strategyDocText } = L.contentEngine;
