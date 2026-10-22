// SheFreelances OS - the mini work samples she can offer in her first message (sampleOffers.js)
// Suzy's library (Oct 12, 2026). Claude recommends 2 or 3 by ID in its answer; she picks one or two to offer,
// and the message is written around them. Live-updatable through content.json.

export const SAMPLE_OFFERS = [
  // Organic social
  { id: "S05", group: "organic", name: "Sample carousel", receive: "One fully written 5 to 7 slide carousel, ideally designed", best: "A topic that benefits from a visual explanation" },
  { id: "S06", group: "organic", name: "Existing post rework", receive: "One alternative version of a selected public post, with stronger messaging or structure", best: "An identifiable opportunity to clarify an existing message" },
  { id: "S07", group: "organic", name: "Three hooks for existing content", receive: "Three hooks for a specific video, topic or content idea", best: "Strong subject matter with room to experiment with the opening" },
  { id: "S08", group: "organic", name: "Five personalized content ideas", receive: "Five topics with formats and one-line descriptions", best: "A business with multiple services, FAQs or interesting expertise to showcase" },
  { id: "S09", group: "organic", name: "One-week content preview", receive: "Three coordinated posts, including a Reel, carousel and B-roll concept", best: "A prospect interested in understanding what a content service could look like" },
  { id: "S10", group: "organic", name: "Content repurposing sample", receive: "One existing topic turned into three distinct formats", best: "A business with valuable source material that could be used in additional ways" },
  { id: "S11", group: "organic", name: "FAQ content concept", receive: "A real, publicly documented customer question turned into educational content", best: "Services that benefit from answering questions before a purchase" },
  { id: "S12", group: "organic", name: "Service spotlight concept", receive: "One post or Reel presenting a specific service, its benefits and appropriate next step", best: "A business with several services or products worth highlighting" },
  // Meta ads
  { id: "A04", group: "ads", name: "Three ad creative concepts", receive: "Three distinct ad ideas, each with a hook, visual and message", best: "Opportunity to explore additional creative approaches" },
  { id: "A05", group: "ads", name: "Existing ad rework", receive: "An alternative execution of one visible ad, keeping the verified offer details", best: "An existing ad that could inspire a different creative test" },
  { id: "A06", group: "ads", name: "Three ad hooks + creative directions", receive: "Three distinct opening hooks, each paired with a specific visual", best: "A business with an offer that could be introduced in several ways" },
  { id: "A07", group: "ads", name: "Ad carousel concept", receive: "One 4 to 6 card ad carousel with slide copy and visuals", best: "Multiple benefits, products or process steps" },
  { id: "A08", group: "ads", name: "Offer-focused ad concept", receive: "One complete ad presenting an existing service or confirmed promotion", best: "An offer that could be communicated through another creative approach" },
  { id: "A09", group: "ads", name: "UGC-style ad script", receive: "A short creator-style script with visuals, spoken copy and CTA", best: "Products or services suited to a demonstration or firsthand explanation" },
  { id: "A10", group: "ads", name: "Ad-to-landing-page concept", receive: "One proposed ad paired with matching landing page hero copy", best: "An observable opportunity to align messaging between ad and destination" },
  // Supporting (only when they fit her actual offer)
  { id: "X01", group: "support", name: "Landing page hero concept", receive: "A proposed headline, subheadline, visual direction and CTA", best: "Only when it fits your actual offer" },
  { id: "X02", group: "support", name: "Lead form concept", receive: "A suggested introduction and the right qualification questions", best: "Only when it fits your actual offer" },
  { id: "X03", group: "support", name: "Website section concept", receive: "One redesigned service or offer section", best: "Only when it fits your actual offer" },
  { id: "X04", group: "support", name: "Offer presentation concept", receive: "An alternative presentation of an existing, verified offer", best: "Only when it fits your actual offer" },
  { id: "X05", group: "support", name: "Simple campaign creative preview", receive: "A small set of coordinated assets showing how a campaign could look", best: "Only when it fits your actual offer" },
];

export function getSample(id) {
  return SAMPLE_OFFERS.find((s) => s.id === String(id || "").toUpperCase()) || null;
}

// Which groups fit what she's pitching: ads, organic social, or both.
export function sampleGroupsFor({ offer, customPitch }) {
  const service = offer?.primary_service;
  if (service === "meta_ads") return ["ads", "support"];
  if (service === "organic_social") return ["organic", "support"];
  if (service === "combined") return ["ads", "organic", "support"];
  const text = String(customPitch || offer?.custom_service_name || "").toLowerCase();
  const ads = /\bad|ads\b|advertis|meta|facebook ads|paid/.test(text);
  const organic = /social|content|reel|post|instagram|tiktok|organic/.test(text);
  if (ads && !organic) return ["ads", "support"];
  if (organic && !ads) return ["organic", "support"];
  return ["ads", "organic", "support"];
}

export function samplesFor(args) {
  const groups = sampleGroupsFor(args);
  return SAMPLE_OFFERS.filter((s) => groups.includes(s.group));
}

// The menu added to the end of the prompt, so Claude can recommend by ID.
export function sampleMenuText(args) {
  return samplesFor(args)
    .map((s) => `${s.id} | ${s.name} | They'd receive: ${s.receive} | Best for: ${s.best}`)
    .join("\n");
}

// When the answer doesn't name any samples, suggest the first two that fit the service.
export function fallbackSamples(args) {
  return samplesFor(args)
    .filter((s) => s.group !== "support")
    .slice(0, 2)
    .map((s) => ({ id: s.id, why: "" }));
}

// Which library sample the pitch idea is describing, so the sample she offers always matches the pitch idea.
// Checked in order: the most specific phrases first.
const IDEA_MATCH = [
  [/ugc|creator[- ]style|testimonial video|talking[- ]head/i, "A09"],
  [/landing[- ]page/i, "A10"],
  [/lead form|instant form/i, "X02"],
  [/website section|homepage section|services section/i, "X03"],
  [/ad carousel|carousel ad/i, "A07"],
  [/rework|redo|refresh|new version of (an|their|one)/i, "A05"],
  [/ad hooks?|hooks? for (their |an |the )?ads?/i, "A06"],
  [/static ad|ad mockup|mock[- ]?up|single ad|one ad|ad concept for|offer[- ]focused|ad built around|an ad /i, "A08"],
  [/ad concepts|ad ideas|ads? creative/i, "A04"],
  [/carousel/i, "S05"],
  [/spotlight|reel|video|b-roll/i, "S12"],
  [/hook/i, "S07"],
  [/one[- ]week|week of content|content preview/i, "S09"],
  [/repurpos/i, "S10"],
  [/faq|question/i, "S11"],
  [/content ideas|post ideas|topics/i, "S08"],

  [/post/i, "S06"],
];

export function sampleForIdea(...texts) {
  const text = texts.filter(Boolean).join(" ");
  if (!text) return null;
  const hit = IDEA_MATCH.find(([re]) => re.test(text));
  return hit ? hit[1] : null;
}

// The options to show, best first. The pitch idea's own sample leads (described with the idea itself),
// then Claude's other picks, then the rest of the library for her service.
export function sampleOptions(analysis) {
  const a = analysis || {};
  const ideaText = String(a.offer_to_send || a.idea_detail || a.idea || "").replace(/==/g, "");
  const ideaId = sampleForIdea(a.idea_detail, a.idea, a.offer_to_send);
  const recs = (a.samples || []).filter((r) => getSample(r.id));
  const ordered = [];
  if (ideaId) ordered.push({ ...getSample(ideaId), why: "", rec: true, fromIdea: true, receive: ideaText || getSample(ideaId).receive });
  recs.forEach((r) => {
    if (!ordered.some((o) => o.id === r.id)) ordered.push({ ...getSample(r.id), why: r.why, rec: true });
  });
  if (!ordered.length) fallbackSamples({ customPitch: a.pitch }).forEach((r) => ordered.push({ ...getSample(r.id), rec: true }));
  samplesFor({ customPitch: a.pitch }).forEach((x) => {
    if (!ordered.some((o) => o.id === x.id)) ordered.push({ ...x });
  });
  // Unless she picked one herself, the pitch idea's sample is the one offered.
  const chosen = (a.chosen_by_user && a.chosen_samples?.[0]) || ordered[0]?.id;
  return { ordered, chosen };
}

export function withArticle(name) {
  const n = String(name || "").toLowerCase();
  return `${/^[aeiou]/.test(n) ? "an" : "a"} ${n}`;
}
