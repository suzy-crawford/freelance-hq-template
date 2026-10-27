var e=`// SheFreelances OS - Get Clients: Analyze this business (clientsAnalysis.js)
// The member's quick observations + what's on their website + her offer -> one AI call.

import { getServiceName, nicheInSentence, includesAds } from "./offerData";
import { cleanText } from "./offerPrompts";
import { voiceFor } from "./copyVoice";

// Quick-look checklists, from the curriculum's opportunity checklists.
const SOCIAL_OBSERVATIONS = [
  { id: "posts_consistently", label: "Posts consistently", group: "doing_well" },
  { id: "uses_reels", label: "Uses Reels or video", group: "doing_well" },
  { id: "good_photos", label: "Good photos", group: "doing_well" },
  { id: "unpolished_feed", label: "Feed looks unpolished or off-brand", group: "gap" },
  { id: "inconsistent", label: "Posts inconsistently", group: "gap" },
  { id: "no_video", label: "Almost no video", group: "gap" },
  { id: "weak_hooks", label: "Weak hooks (first lines don't grab you)", group: "gap" },
  { id: "no_cta", label: "No clear call to action", group: "gap" },
  { id: "little_proof", label: "Little proof (reviews, results)", group: "gap" },
  { id: "all_promo", label: "Almost everything is promotional", group: "gap" },
  { id: "little_education", label: "Little education or tips", group: "gap" },
  { id: "no_instagram", label: "Couldn't find their Instagram", group: "gap" },
];

const ADS_OBSERVATIONS = [
  { id: "running_ads", label: "They're running ads right now", group: "doing_well" },
  { id: "not_running_ads", label: "Not running any ads", group: "gap" },
  { id: "weak_creative", label: "Ad images or videos look weak", group: "gap" },
  { id: "unclear_offer", label: "The ad's offer is unclear", group: "gap" },
  { id: "outdated_ads", label: "Ads look old or outdated", group: "gap" },
];

export function getObservationOptions(offer) {
  if (!offer) return SOCIAL_OBSERVATIONS;
  if (offer.primary_service === "meta_ads") {
    const forAds = ["posts_consistently", "uses_reels", "good_photos", "unpolished_feed", "no_cta", "little_proof"];
    return [...ADS_OBSERVATIONS, ...SOCIAL_OBSERVATIONS.filter((o) => forAds.includes(o.id))];
  }
  if (offer.primary_service === "combined") return [...ADS_OBSERVATIONS, ...SOCIAL_OBSERVATIONS];
  return SOCIAL_OBSERVATIONS;
}

export function observationLabels(ids, offer) {
  const options = getObservationOptions(offer);
  return (ids || []).map((id) => options.find((o) => o.id === id)?.label).filter(Boolean);
}

// Meta Ad Library, already searched for this business. Exact-phrase search on the name, so other
// advertisers whose ads just share a word (like "fitness" or "spa") don't show up.
export function adLibraryUrl(name) {
  const q = \`"\${String(name || "").replace(/"/g, "").trim()}"\`;
  return \`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&media_type=all&search_type=keyword_exact_phrase&q=\${encodeURIComponent(q)}\`;
}

export function facebookSearchUrl(name, location) {
  return \`https://www.google.com/search?q=\${encodeURIComponent(\`\${name} \${location || ""} facebook\`)}\`;
}

// When we don't have their Instagram, a Google search usually finds it.
export function instagramSearchUrl(name, location) {
  return \`https://www.google.com/search?q=\${encodeURIComponent(\`\${name} \${location || ""} instagram\`)}\`;
}

export const SOURCE_LABELS = {
  website: "Seen on their website",
  you_noticed: "You noticed",
  guess: "Our guess",
};

const str = { type: "string" };
const sourced = (field) => ({
  type: "array",
  items: {
    type: "object",
    properties: { [field]: str, evidence: str, source: { type: "string", enum: ["website", "you_noticed", "guess"] } },
    required: [field, "evidence", "source"],
  },
});

const ANALYSIS_SCHEMA = {
  type: "object",
  properties: {
    opportunity_level: { type: "string", enum: ["high", "medium", "low"] },
    opportunity_reason: str,
    doing_now: sourced("point"),
    where_you_could_help: sourced("gap"),
    pitch: {
      type: "object",
      properties: { what: str, angle: str, why: str, show_them: str },
      required: ["what", "angle", "why", "show_them"],
    },
    good_fit: {
      type: "object",
      properties: { verdict: { type: "string", enum: ["yes", "maybe", "no"] }, why: str },
      required: ["verdict", "why"],
    },
  },
  required: ["opportunity_level", "opportunity_reason", "doing_now", "where_you_could_help", "pitch", "good_fit"],
};

export function buildAnalysisPrompt({ offer, prospect, site, observations, research, notes }) {
  const included = (offer?.package?.categories || []).map((c) => \`\${c.name}: \${c.items.join("; ")}\`).join(" | ");
  const noticed = observationLabels(observations, offer);
  const siteBlock = site?.ok
    ? \`WEBSITE (\${site.url})
- Page title: \${site.title || "none"}
- Meta description: \${site.meta_description || "none"}
- Buttons and links asking visitors to act: \${(site.cta_links || []).join(" · ") || "none found"}
- Social links on the site: \${(site.social_links || []).join(" · ") || "none found"}
- Meta pixel installed (means they may run or have run Facebook/Instagram ads): \${site.uses_meta_pixel ? "yes" : "no"}
- Website text:
\${site.text}\`
    : \`WEBSITE: could not be read (\${site?.error || "no website on file"}). Do not describe their website.\`;

  return {
    prompt: \`You help a beginner freelance marketer decide whether a local business is worth pitching, and how.

THE FREELANCER'S OFFER
- Service: \${offer ? getServiceName(offer) : "freelance marketing"}
- Who she helps: \${offer ? nicheInSentence(offer) : "small businesses"}
- What's included: \${included || "not set"}

THE BUSINESS
- Name: \${prospect.name}
- Type and location: \${prospect.business_type}, \${prospect.location}
- Instagram on file: \${prospect.instagram || "none"}
- Facebook Page on file: \${prospect.facebook || "none"}

WHAT THE FREELANCER NOTICED HERSELF (treat as true, source "you_noticed"): \${noticed.length ? noticed.join("; ") : "she did not check"}
HER OWN RESEARCH, in her words or pasted from her own screenshot analysis (treat as things she noticed, source "you_noticed"):
\${String(research || "").slice(0, 6000) || "none"}
HER NOTES: \${notes || "none"}

\${siteBlock}

WHAT TO WRITE
- opportunity_level: "high" if there are clear gaps her service fixes and the business looks established; "low" if they already do this well or it's a poor fit; otherwise "medium".
- opportunity_reason: one or two sentences explaining the level in plain words.
- doing_now: 3 to 5 things the business is currently doing (good or bad).
- where_you_could_help: 2 to 4 specific gaps that HER service can actually help with. Never list something outside her offer.
- For every point in doing_now and where_you_could_help: evidence is a short exact phrase from the website, or what she noticed, or "" for guesses. source is "website" (only if the website text shows it), "you_noticed" (only if it is in her observations), or "guess" (anything else, such as things you expect but cannot see). Be strict: if it is not in the website text or her observations, it is a guess.
- pitch.what: the result she is selling, positioned for this business, in under 15 words. Write it as an outcome, not a line item from her package. Good: "Ads that turn people who already love your work into booked consultations." Bad: "Ads campaign setup and tracking."
- pitch.angle: one sentence she could actually say to the owner as her way in, based on a real observation. Compliment something real first, then name the opportunity.
- pitch.why: one sentence on why this will matter to them.
- pitch.show_them: one sentence on a small sample she could make and send so they can SEE the difference, using what she can make with her service (for example: "Mock up 2 ads using their real treatments and before-and-after photos" or "Redesign 3 of their posts to show what a polished, on-brand feed could look like").
- good_fit.verdict: "yes", "maybe", or "no", with a one-sentence why.

RULES
- Write for a beginner. Short sentences, plain words, no marketing jargon without a quick explanation.
- Frame the business as a real, successful business that could grow. Never insult them or call their marketing bad.
- Never invent facts, numbers, reviews, or results. If you don't know, it's a guess and must be labeled "guess".
- No em dashes or en dashes.

\${voiceFor("member")}\`,
    response_json_schema: ANALYSIS_SCHEMA,
  };
}

function cleanDeep(value) {
  if (typeof value === "string") return cleanText(value);
  if (Array.isArray(value)) return value.map(cleanDeep);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, cleanDeep(v)]));
  return value;
}

// Cleans the AI result and enforces the source labels: "website" only stays if the site was read,
// "you_noticed" only stays if she actually ticked something.
export function finalizeAnalysis(result, { site, observations, research }) {
  const r = cleanDeep(result || {});
  const fixSource = (item) => {
    let source = item.source;
    if (source === "website" && !site?.ok) source = "guess";
    if (source === "you_noticed" && !(observations || []).length && !String(research || "").trim()) source = "guess";
    if (!["website", "you_noticed", "guess"].includes(source)) source = "guess";
    return { ...item, source, evidence: source === "guess" ? "" : item.evidence || "" };
  };
  return {
    opportunity_level: ["high", "medium", "low"].includes(r.opportunity_level) ? r.opportunity_level : "medium",
    opportunity_reason: r.opportunity_reason || "",
    doing_now: (r.doing_now || []).slice(0, 5).map(fixSource),
    where_you_could_help: (r.where_you_could_help || []).slice(0, 4).map(fixSource),
    pitch: { what: "", angle: "", why: "", show_them: "", ...(r.pitch || {}) },
    good_fit: r.good_fit || { verdict: "maybe", why: "" },
    website_read: !!site?.ok,
  };
}

export function analysisToText(prospect, a) {
  const lines = [
    \`\${prospect.name}: \${a.opportunity_level.toUpperCase()} opportunity\`,
    a.opportunity_reason,
    "",
    "What they're doing now:",
    ...a.doing_now.map((d) => \`- \${d.point} (\${SOURCE_LABELS[d.source]})\`),
    "",
    "Where you could help:",
    ...a.where_you_could_help.map((g) => \`- \${g.gap} (\${SOURCE_LABELS[g.source]})\`),
    "",
    \`Pitch: \${a.pitch.what}\`,
    \`Your way in: \${a.pitch.angle}\`,
    a.pitch.show_them ? \`Show them: \${a.pitch.show_them}\` : "",
  ];
  return lines.join("\\n");
}

export { includesAds };
`;export{e as default};