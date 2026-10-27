var e=`// SheFreelances OS - live content (liveContent.js)
// The libraries, rules and prompt text that power the AI tools are bundled in the app AND published
// as content.json in the public member template. On startup the app applies the last saved copy,
// then fetches the newest one in the background. So when SheFreelances improves a library or a
// prompt, every member gets it the next time they open the app: no update prompt, no credits.
// If anything about the download looks wrong, the app keeps what it has. Code changes (new screens,
// new tools) still need the update prompt in version.js.

import { ANGLE_CATEGORIES } from "./adsAngleLibrary";
import { NICHES, GENERAL } from "./adsNiches";
import { HEADLINE_STRUCTURES, HEADLINES_FOR_CATEGORY, HEADLINE_BANK } from "./adsHeadlines";
import { CREATIVE_TYPES, CREATIVE_FOR_CATEGORY, NICHE_CREATIVE } from "./adsCreative";
import { RULEBOOK, DIAGNOSIS, GENERAL_AD_RULES, HEALTH_AD_RULES } from "./adsData";
import { PROMPT_TEXT } from "./adsPrompts";
import { VOICE, SPEAKERS } from "./copyVoice";
import { SAMPLE_OFFERS } from "./sampleOffers";
import { MASTER_PROMPTS } from "./adsMasterPrompts";
import { CLAUDE_PROMPTS } from "./clientsClaudePrompt";
import { BUNDLED_CONTENT_REV } from "./contentRev";

export const CONTENT_SCHEMA = 1;
const CONTENT_URL = "https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/content.json";
const CACHE_KEY = "sf-live-content";

// Regex fields can't travel in JSON, so niches carry their match pattern as text.
function nicheToJson(n) {
  return { ...n, match: n.match ? n.match.source : "" };
}
function nicheFromJson(n) {
  return { ...n, match: new RegExp(n.match || "^$", "i") };
}

const isArr = (v) => Array.isArray(v) && v.length > 0;
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length > 0;
const isText = (v) => typeof v === "string" && v.length > 20;

function replaceArray(target, next) {
  target.splice(0, target.length, ...next);
}
function replaceObject(target, next) {
  Object.keys(target).forEach((k) => delete target[k]);
  Object.assign(target, next);
}

// Each section: how to read it for publishing, how to check it, how to apply it.
const SECTIONS = {
  angleCategories: { get: () => ANGLE_CATEGORIES, ok: isArr, set: (v) => replaceArray(ANGLE_CATEGORIES, v) },
  niches: { get: () => NICHES.map(nicheToJson), ok: isArr, set: (v) => replaceArray(NICHES, v.map(nicheFromJson)) },
  generalNiche: { get: () => GENERAL, ok: isObj, set: (v) => replaceObject(GENERAL, v) },
  headlineStructures: { get: () => HEADLINE_STRUCTURES, ok: isArr, set: (v) => replaceArray(HEADLINE_STRUCTURES, v) },
  headlinesForCategory: { get: () => HEADLINES_FOR_CATEGORY, ok: isObj, set: (v) => replaceObject(HEADLINES_FOR_CATEGORY, v) },
  headlineBank: { get: () => HEADLINE_BANK, ok: isObj, set: (v) => replaceObject(HEADLINE_BANK, v) },
  creativeTypes: { get: () => CREATIVE_TYPES, ok: isArr, set: (v) => replaceArray(CREATIVE_TYPES, v) },
  creativeForCategory: { get: () => CREATIVE_FOR_CATEGORY, ok: isObj, set: (v) => replaceObject(CREATIVE_FOR_CATEGORY, v) },
  nicheCreative: { get: () => NICHE_CREATIVE, ok: isObj, set: (v) => replaceObject(NICHE_CREATIVE, v) },
  rulebook: { get: () => RULEBOOK, ok: isArr, set: (v) => replaceArray(RULEBOOK, v) },
  diagnosis: { get: () => DIAGNOSIS, ok: isArr, set: (v) => replaceArray(DIAGNOSIS, v) },
  generalAdRules: { get: () => GENERAL_AD_RULES, ok: isArr, set: (v) => replaceArray(GENERAL_AD_RULES, v) },
  healthAdRules: { get: () => HEALTH_AD_RULES, ok: isArr, set: (v) => replaceArray(HEALTH_AD_RULES, v) },
  promptText: {
    get: () => PROMPT_TEXT,
    ok: (v) => isObj(v) && Object.values(v).every(isText),
    set: (v) => Object.assign(PROMPT_TEXT, v),
  },
  copyVoice: { get: () => VOICE.text, ok: isText, set: (v) => (VOICE.text = v) },
  adsMasterPrompts: {
    get: () => MASTER_PROMPTS,
    ok: (v) => isObj(v) && Object.values(v).every(isText),
    set: (v) => Object.assign(MASTER_PROMPTS, v),
  },
  sampleOffers: { get: () => SAMPLE_OFFERS, ok: isArr, set: (v) => replaceArray(SAMPLE_OFFERS, v) },
  claudePrompts: {
    get: () => CLAUDE_PROMPTS,
    ok: (v) => isObj(v) && Object.values(v).every(isText),
    set: (v) => Object.assign(CLAUDE_PROMPTS, v),
  },
  speakers: {
    get: () => SPEAKERS,
    ok: (v) => isObj(v) && Object.values(v).every(isText),
    set: (v) => Object.assign(SPEAKERS, v),
  },
};

// Used by the publish script to write content.json from the bundled libraries.
export function buildContent(version, rev) {
  const content = { schema: CONTENT_SCHEMA, version, rev, published: new Date().toISOString() };
  for (const [name, s] of Object.entries(SECTIONS)) content[name] = s.get();
  return content;
}

let appliedVersion = null;

export function applyContent(content) {
  if (!content || content.schema !== CONTENT_SCHEMA) return false;
  if (!(Number(content.rev) > BUNDLED_CONTENT_REV)) return false;
  let applied = 0;
  for (const [name, s] of Object.entries(SECTIONS)) {
    const value = content[name];
    if (value === undefined || !s.ok(value)) continue;
    try {
      s.set(value);
      applied++;
    } catch (e) {
      console.warn("[liveContent] skipped", name, e);
    }
  }
  if (applied) appliedVersion = content.version || null;
  return applied > 0;
}

export function liveContentVersion() {
  return appliedVersion;
}

// Startup: apply the saved copy right away, then fetch the newest in the background.
export function startLiveContent() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (cached) applyContent(cached);
  } catch {
    /* no saved copy */
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  fetch(\`\${CONTENT_URL}?t=\${Date.now()}\`, { cache: "no-store", signal: controller.signal })
    .then((r) => (r.ok ? r.json() : null))
    .then((content) => {
      if (content && applyContent(content)) {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(content));
        } catch {
          /* storage full or blocked */
        }
      }
    })
    .catch(() => {})
    .finally(() => clearTimeout(timer));
}
`;export{e as default};