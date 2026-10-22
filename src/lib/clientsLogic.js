// SheFreelances OS - Get Clients helpers (clientsLogic.js)

import { NICHE_GROUPS } from "./offerData";

// What to search for, based on the active offer. Broad groups ("Local businesses")
// are too vague to search, so the member picks a type of business instead.
export function searchSuggestions(offer) {
  if (!offer?.niche) return { term: "", suggestions: [] };
  const group = NICHE_GROUPS.find((g) => g.label === offer.niche);
  if (offer.niche_is_broad && group) {
    const suggestions = group.examples
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s && !/any type/i.test(s));
    return { term: "", suggestions: suggestions.length ? suggestions : ["Salons", "Dentists", "Gyms", "Restaurants"] };
  }
  return { term: offer.niche, suggestions: [] };
}

function domainKey(url) {
  try {
    return new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function nameKey(name) {
  return String(name || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");
}

// Every way we can recognize a business the member already saved: the original search key,
// its current website, and its name (so a corrected website still counts as saved).
export function savedMatchKeys(prospects) {
  const keys = new Set();
  for (const p of prospects) {
    [p.dedupe_key, domainKey(p.website), nameKey(p.name)].filter(Boolean).forEach((k) => keys.add(k));
  }
  return keys;
}

export function isAlreadySaved(result, keys) {
  return [result.dedupe_key, domainKey(result.website), nameKey(result.name)].filter(Boolean).some((k) => keys.has(k));
}

export function displayDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url || "";
  }
}

export function displayFacebook(url) {
  const id = String(url || "").match(/profile\.php\?id=(\d+)/);
  if (id) return "Facebook Page";
  // Newer page links look like facebook.com/p/Alira-Med-Spa-100063...: show the name part.
  const sub = String(url || "").match(/facebook\.com\/(?:p|pages|pg)\/([^/?#]+)/i);
  if (sub) return `facebook.com/${sub[1].replace(/-\d{6,}$/, "")}`;
  const match = String(url || "").match(/facebook\.com\/([^/?#]+)/i);
  return match ? `facebook.com/${match[1]}` : url || "";
}

// Tutorial links shown next to the quick-look steps. Fill in when the videos exist.
export const TUTORIALS = {
  facebookAds: "",
};

// The prompt members copy into Claude along with screenshots (Ad Library, Instagram, etc.).
// Suzy writes this. While it's empty, the button says the prompt is coming soon.
export const CLAUDE_ANALYSIS_PROMPT = "";

export function displayInstagram(url) {
  const match = String(url || "").match(/instagram\.com\/([^/?#]+)/i);
  return match ? `@${match[1]}` : url || "";
}

export function prospectFromResult(result, { businessType, location, offerId }) {
  return {
    name: result.name,
    website: result.website || "",
    website_checked: !!result.website_checked,
    phone: result.phone || "",
    email: result.email || "",
    email_source: result.email_source || "",
    email_verified: !!result.email,
    address: result.address || "",
    instagram: result.instagram || "",
    facebook: result.facebook || "",
    source_url: result.source_url || "",
    business_type: businessType,
    location,
    is_chain: !!result.is_chain,
    dedupe_key: result.dedupe_key || result.name.toLowerCase(),
    status: "new",
    offer_id: offerId || "",
  };
}

export const SEARCH_MESSAGES = [
  "Searching the web for real businesses...",
  "Checking a few different neighborhoods...",
  "Making sure each website actually loads...",
  "Looking for email addresses on their websites...",
  "Almost done...",
];

// "med spas" -> "med spa", for lines like "1 med spa chain or franchise hidden".
export function singularType(term) {
  const t = String(term || "").trim().toLowerCase();
  if (/ies$/.test(t)) return t.replace(/ies$/, "y");
  if (/(ss|us)$/.test(t)) return t;
  return t.replace(/s$/, "");
}

export function chainsHiddenText(count, term) {
  const type = singularType(term) || "business";
  return count === 1
    ? `1 ${type} chain or franchise hidden. They rarely hire beginners.`
    : `${count} ${type} chains or franchises hidden. They rarely hire beginners.`;
}

// Where a lead is: Saved > Analyzed > Message ready > Contacted (Brand 2.0 stage, shown as text, never a pill).
export function leadStage(p) {
  if (p?.contacted_at) return "Contacted";
  if (p?.outreach) return "Message ready";
  if (p?.analysis) return "Analyzed";
  return "Saved";
}

// Fit in words ("Strong fit"), or "" before analysis. Older analyses used high/medium/low.
export function leadFit(p) {
  const a = p?.analysis;
  if (!a) return "";
  if (a.fit) return `${a.fit} fit`;
  const legacy = { high: "Strong fit", medium: "Good fit", low: "Weak fit" }[a.opportunity_level];
  return legacy || "";
}
