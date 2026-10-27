var e=`// SheFreelances OS - Client Finder, Step 2: Analyze the business opportunity (clientsClaudePrompt.js)
// The member gathers screenshots of the business, then runs Suzy's "Find the opportunity" prompt in Claude.
// The app fills in the prospect and offer details, and reads the OUTREACH HANDOFF back from Claude's answer
// so Step 3 can write the message. Everything here is built in code, so it costs no credits.

import { SERVICES, EXPERIENCE_LEVELS, formatMoney, nicheInSentence } from "./offerData";
import { displayDomain, displayInstagram, displayFacebook } from "./clientsLogic";
import { adLibraryUrl, instagramSearchUrl } from "./clientsAnalysis";
import { sampleMenuText, getSample } from "./sampleOffers";

// Suzy's prompt (Oct 12, 2026). Placeholders in {{double braces}} are filled by fillFindOpportunityPrompt.
// Kept as an object so live content can update it without an app update.
export const CLAUDE_PROMPTS = {
  findOpportunity: \`SHEFREELANCES AI: FIND THE OPPORTUNITY
You are an experienced brand and marketing strategist helping a beginner freelancer identify a potential marketing opportunity with a business they have NOT contacted yet.
Think like a senior strategist conducting a focused, preliminary brand and marketing review.
Your job is to understand the business, recognize what it already does well, and identify ONE useful idea that could become the starting point for a conversation.
This is not a complete marketing audit, proposal, or sales strategy.
The freelancer has not spoken to the business. We don't know its internal performance, goals, budget, or whether it is looking for marketing help.
I have attached screenshots of some combination of:

* Instagram profile, feed, Reels, or individual posts
* Meta Ad Library
* Website, landing page, or service pages

Only analyze material actually supplied. If a website or link is accessible and you inspect it, identify that as an additional reviewed source. Otherwise, do not claim to have reviewed it.
PROSPECT INFORMATION
Business: {{business_name}}
Industry: {{industry}}
Location: {{location}}
Website: {{website}}
Instagram: {{instagram}}
Facebook: {{facebook}}
MY FREELANCE SERVICE
Service: {{selected_service}}
My Offer: {{saved_offer_summary}}
My Experience Level: {{experience_level}}
If my offer is unavailable, use my selected service as the primary constraint.
YOUR INTERNAL REVIEW
Before writing the output, consider the following where visible.
1. Business and positioning

* What does the business sell?
* Who does it appear to serve?
* What makes its offer or presentation interesting?
* Is its value clear to a potential customer?

2. The customer perspective

* What might someone want to understand before buying or booking?
* What information does the business already communicate well?
* Are there opportunities to make its existing strengths more visible?

3. Instagram and content
Consider:

* Profile and bio
* Content themes
* Reels and carousels
* Hooks
* Messaging
* Content variety
* Educational content
* Trust-building content
* Calls to action

4. Meta advertising
Consider:

* Visible offers
* Advertising angles
* Hooks
* Creative approaches
* Messaging
* Calls to action
* Potential alternative concepts worth testing

Do not infer advertising performance from how an ad looks.
5. Website and customer journey
Consider:

* Offer clarity
* Headline and messaging
* Customer benefits
* Trust signals
* Primary CTA
* Ease of understanding the next step
* Consistency between advertising, social content, and website

Only evaluate sections that are actually provided.
6. Find an opportunity worth exploring
Consider possible opportunities, then select ONE that:

* Is based on a specific observation.
* Is relevant to the freelancer's actual service.
* Builds on something the business already has or does.
* Has a reasonable potential benefit.
* Could be demonstrated through one small sample.
* Would make a natural opening for a first conversation.

Do not choose an opportunity merely because you can find something negative to say.
If there isn't enough evidence, say what additional screenshot or information would help.
REQUIRED OUTPUT
Keep the ENTIRE response concise and suitable for a beginner.
In sections 2 and 3, wrap the one or two most important phrases in ==double equals signs== so they can be highlighted.
1. BUSINESS SNAPSHOT
In 2–3 sentences, explain what the business offers, who it appears to serve, and how it presents itself.
2. WHAT CAUGHT MY ATTENTION
Identify up to TWO genuine positive observations.
Use specific details from the screenshots.
3. AN OPPORTUNITY WORTH EXPLORING
Choose ONE potential opportunity.
What I noticed:
A specific observation supported by the supplied material.
The opportunity:
One practical idea the business could potentially explore.
Why it might be useful:
Explain the possible value in no more than two sentences.
Evidence:
Identify which screenshot or reviewed material supports the observation.
4. ONE IDEA I COULD OFFER TO SHARE
Recommend ONE specific, personalized marketing asset the freelancer could offer to create for this business.
The idea must:

* Connect directly to the opportunity identified.
* Be relevant to the freelancer's actual service.
* Be tangible enough for the business owner to immediately understand what they're being offered.
* Be small enough to create using the SheFreelances AI tools if the business expresses interest.
* Build on the business's existing offer, services, positioning, or creative assets.

For Meta Ads freelancers, prioritize:

* A complete ad concept for one of the business's existing offers.
* A sample static ad mockup, including a proposed visual, headline, hook, copy and CTA.
* A short video ad concept or storyboard.
* A new creative execution of an existing offer.

For Organic Social freelancers, prioritize:

* A Reel concept with an actual hook and filming direction.
* A sample educational carousel.
* A B-roll Reel concept with on-screen text.
* A small content series using something the business already does well.

RETURN:
The idea: What specifically could be created?
The opportunity behind it: Why this could be worth exploring.
What I'd offer to send: Describe the deliverable in language a business owner would immediately understand.
Creative direction: A short description of what it could actually look like.
Recommended samples: From the SAMPLE OFFER MENU at the end, choose the 2 or 3 sample offers that best fit this opportunity and my service, best first. The first one must be the same thing as The idea above. Put each on its own line as the ID, the name and one short reason.
IMPORTANT:
Do not create the asset yet.
The freelancer will first send a permission-based message asking whether the prospect would like to see the idea.
Only when the prospect expresses interest should SheFreelances generate the complete asset using the appropriate Ads or Content tool.
Do not present the new concept as something that will definitely outperform the business's existing marketing.
Describe the proposed idea in everyday language. Prefer "a quick Facebook ad mockup for your consultation offer" over "an alternative creative angle." The recipient should be able to picture what they're being offered.
The goal is for the owner to think, "Oh, she has an actual ad idea for MY business? Yeah, I'd like to see that."
5. OUTREACH HANDOFF
Return exactly these fields:
Positive observation:
Potential opportunity:
Idea to offer:
Evidence/reference:
Fit: Strong, Good or Weak, based on how clearly the opportunity matches my service.
Do not write the outreach message. My SheFreelances AI outreach tool will do that separately.
RULES

* Do not assume the business is struggling or needs help.
* Do not invent metrics, results, testimonials, or performance problems.
* Separate observed information from strategic inference.
* Do not assume the absence of an ad in a screenshot proves no ads are running.
* Do not infer posting history or consistency from a limited screenshot.
* Do not recommend services the freelancer doesn't offer.
* Do not create a full audit or strategy.
* Do not create a sample asset.
* Do not write outreach.
* Prefer constructive ideas that build on existing strengths.
* If there's insufficient evidence, recommend one additional item to review rather than inventing a finding.

The purpose is to find ONE thoughtful, relevant idea worth offering to share in an initial conversation.
Write clearly and conversationally. No corporate filler, jargon, or em dashes.
The final output should take approximately one minute to read.
SAMPLE OFFER MENU
{{sample_menu}}\`,
};

// The screenshots to grab before running the prompt. Each has a stable id so its checkbox is remembered.
export function getAssetSteps(prospect) {
  return [
    {
      id: "ig_feed",
      task: "Screenshot their Instagram profile and feed",
      link: prospect.instagram || instagramSearchUrl(prospect.name, prospect.location),
      linkLabel: prospect.instagram ? "Open their Instagram" : "Find their Instagram",
    },
    { id: "ig_posts", task: "Screenshot 2 or 3 individual posts (a Reel, a carousel, a recent post)" },
    { id: "site_home", task: "Screenshot their website home page", link: prospect.website || "", linkLabel: "Open their website" },
    { id: "site_services", task: "Screenshot their services page" },
    { id: "bio_links", task: "Open the links in their Instagram bio and screenshot where they go" },
    { id: "ads", task: "Check the Meta Ad Library and screenshot any ads they're running", link: adLibraryUrl(prospect.name), linkLabel: "Open the Ad Library" },
  ];
}

function serviceLabel(offer) {
  if (!offer?.primary_service) return "";
  if (offer.primary_service === "other") return offer.custom_service_name || "Other";
  return SERVICES[offer.primary_service]?.label || "";
}

// One paragraph describing her offer, from what Offer Builder saved.
export function offerSummary(offer) {
  if (!offer) return "";
  const parts = [];
  parts.push(\`\${offer.selected_name || "My offer"}\${offer.niche ? \` for \${nicheInSentence(offer)}\` : ""}.\`);
  if (offer.record?.talk?.one_sentence) parts.push(offer.record.talk.one_sentence);
  if (offer.price) parts.push(\`\${formatMoney(offer.price)} per month.\`);
  const included = (offer.package?.categories || []).map((c) => \`\${c.name}: \${(c.items || []).join(", ")}\`);
  if (included.length) parts.push(\`Includes \${included.join("; ")}.\`);
  return parts.join(" ");
}

// The prospect and offer details as label/value rows, for the "What Claude gets" preview.
// pitch: what she wants to pitch. A saved offer from Offer Builder, or her own words ("Other").
export function promptDetails({ prospect, offer, service, experience, customPitch }) {
  const missing = "Not found";
  return {
    prospect: [
      { key: "business_name", label: "Business", value: prospect.name || missing },
      { key: "industry", label: "Industry", value: prospect.business_type || missing },
      { key: "location", label: "Location", value: prospect.location || missing },
      { key: "website", label: "Website", value: prospect.website ? displayDomain(prospect.website) : missing, full: prospect.website || missing },
      { key: "instagram", label: "Instagram", value: prospect.instagram ? displayInstagram(prospect.instagram) : missing, full: prospect.instagram || missing },
      { key: "facebook", label: "Facebook", value: prospect.facebook ? displayFacebook(prospect.facebook) : missing, full: prospect.facebook || missing },
    ],
    you: [
      {
        key: "selected_service",
        label: "Service",
        value: (customPitch ? customPitch : offer ? serviceLabel(offer) : SERVICES[service]?.label) || "Not chosen yet",
      },
      { key: "saved_offer_summary", label: "My offer", value: customPitch ? customPitch : offer ? offerSummary(offer) : "No offer saved yet" },
      { key: "experience_level", label: "Experience", value: EXPERIENCE_LEVELS[experience]?.label || "Not set" },
    ],
  };
}

export function fillFindOpportunityPrompt(args) {
  const { prospect, you } = promptDetails(args);
  let text = CLAUDE_PROMPTS.findOpportunity;
  [...prospect, ...you].forEach((row) => {
    text = text.split(\`{{\${row.key}}}\`).join(row.full || row.value);
  });
  return text.split("{{sample_menu}}").join(sampleMenuText(args));
}

// ---------------------------------------------------------------------------
// Reading Claude's answer back
// ---------------------------------------------------------------------------

// What she saves from Claude's answer. "handoff" fields come from the OUTREACH HANDOFF block at the end;
// "idea" fields come from section 4 (ONE IDEA I COULD OFFER TO SHARE).
export const HANDOFF_FIELDS = [
  { key: "positive", label: "Positive observation", from: "handoff", match: /positive observation/i },
  { key: "opportunity", label: "Potential opportunity", from: "handoff", match: /potential opportunity/i },
  { key: "idea", label: "Idea to offer", from: "handoff", match: /idea to offer/i },
  { key: "offer_to_send", label: "What I'd offer to send", from: "idea", match: /what i['’]d offer to send/i },
  { key: "creative", label: "Creative direction", from: "idea", match: /creative direction/i },
  { key: "evidence", label: "Evidence or reference", from: "handoff", match: /evidence\\s*\\/\\s*reference|evidence or reference/i },
];

const ALL_LABELS = /^(positive observation|potential opportunity|idea to offer|evidence\\s*\\/\\s*reference|evidence or reference|evidence|the idea|the opportunity behind it|what i['’]d offer to send|creative direction|what i noticed|the opportunity|why it might be useful)\\s*:/i;

// Reads "Label: value" lines (markdown bold, bullets and all). A value runs until the next label,
// a heading or a blank line after some text.
function readFields(text, fields) {
  const out = {};
  let current = null;
  for (const line of String(text || "").split(/\\r?\\n/)) {
    const clean = line.replace(/[*_#>\`]/g, "").replace(/^\\s*[-•]\\s*/, "").trim();
    const field = fields.find((f) => new RegExp(\`^(\${f.match.source})\\\\s*:\`, "i").test(clean));
    if (field) {
      current = field.key;
      out[current] = clean.replace(/^[^:]*:\\s*/, "");
      continue;
    }
    if (ALL_LABELS.test(clean) || /^\\d+\\.\\s+[A-Z][A-Z ]+$/.test(clean)) {
      current = null;
      continue;
    }
    if (current && clean) out[current] = \`\${out[current]} \${clean}\`.trim();
    else if (current && !clean && out[current]) current = null;
  }
  return out;
}

export function parseHandoff(text) {
  const raw = String(text || "");
  const at = raw.search(/outreach handoff/i);
  const handoffText = at >= 0 ? raw.slice(at) : raw;
  const ideaStart = raw.search(/one idea i could offer/i);
  const ideaText = ideaStart >= 0 ? raw.slice(ideaStart, at > ideaStart ? at : undefined) : raw;
  const fromHandoff = readFields(handoffText, HANDOFF_FIELDS.filter((f) => f.from === "handoff"));
  const fromIdea = readFields(ideaText, HANDOFF_FIELDS.filter((f) => f.from === "idea"));
  const out = {};
  HANDOFF_FIELDS.forEach((f) => (out[f.key] = (f.from === "handoff" ? fromHandoff : fromIdea)[f.key] || ""));
  return out;
}

export function handoffComplete(h) {
  return !!(h && h.positive && h.opportunity && h.idea);
}

// ---------------------------------------------------------------------------
// Reading the whole answer (all five sections) for the AI Outreach Generator
// ---------------------------------------------------------------------------

const SECTION_RE = /^\\s*(?:#+\\s*)?(?:\\*\\*)?\\s*(?:\\d\\s*[.)]\\s*)?(business snapshot|what caught my attention|an opportunity worth exploring|one idea i could offer to share|outreach handoff)\\b/i;
const SECTION_KEYS = {
  "business snapshot": "snapshot",
  "what caught my attention": "caught",
  "an opportunity worth exploring": "opportunity",
  "one idea i could offer to share": "idea",
  "outreach handoff": "handoff",
};

// Strips markdown but keeps emphasis: a bold label ("**Evidence:**") becomes plain, and any other bold or
// ==marked== phrase becomes ==phrase== so the page can highlight it.
function cleanLine(line) {
  let t = String(line).replace(/^\\s*(?:[-•·]|\\*(?!\\*))\\s+/, "");
  t = t.replace(/^\\s*#+\\s*/, "");
  t = t.replace(/^\\*\\*([^*]+?)\\*\\*\\s*(:?)/, (m, inner, colon) => (colon || /:$/.test(inner) ? \`\${inner.replace(/:$/, "")}:\` : inner));
  t = t.replace(/\\*\\*([^*]+?)\\*\\*/g, "==$1==");
  t = t.replace(/[*_>\`]/g, "");
  return t.replace(/====/g, "").trim();
}

function splitSections(text) {
  const out = {};
  let current = null;
  for (const line of String(text || "").split(/\\r?\\n/)) {
    const m = cleanLine(line).match(SECTION_RE);
    if (m) {
      current = SECTION_KEYS[m[1].toLowerCase()];
      out[current] = [];
      continue;
    }
    if (current) out[current].push(line);
  }
  return out;
}

// "Label: value" fields inside one section. A value can run onto the next lines until the next label.
function labeled(lines, labels) {
  const out = {};
  let current = null;
  for (const raw of lines || []) {
    const line = cleanLine(raw);
    if (!line) continue;
    const hit = labels.find((l) => new RegExp(\`^\${l.re}\\\\s*:\`, "i").test(line));
    if (hit) {
      current = hit.key;
      out[current] = line.replace(/^[^:]*:\\s*/, "");
      continue;
    }
    if (current) out[current] = \`\${out[current]} \${line}\`.trim();
  }
  return out;
}

const APOS = "['’]";

// Turns the pasted answer into the parts the lead page shows. Works with or without markdown.
export function parseAnalysis(text) {
  const sec = splitSections(text);
  // Section 1: prose for the description, plus "Label: value" facts for the snapshot grid.
  const facts = [];
  const prose = [];
  (sec.snapshot || []).map(cleanLine).filter(Boolean).forEach((line) => {
    const m = line.match(/^([A-Z][\\w &/'’().-]{1,26}):\\s*(.{1,80})$/);
    if (m && facts.length < 4 && !/[.!?]$/.test(m[1])) facts.push({ label: m[1].trim(), value: m[2].replace(/==/g, "").trim() });
    else prose.push(line);
  });
  const snapshot = prose.join(" ");
  const caught = (sec.caught || []).map(cleanLine).filter(Boolean);
  const opp = labeled(sec.opportunity, [
    { key: "noticed", re: "what i noticed" },
    { key: "opportunity", re: "the opportunity" },
    { key: "why", re: "why it might be useful" },
    { key: "evidence", re: "evidence" },
  ]);
  const idea = labeled(sec.idea, [
    { key: "idea", re: "the idea" },
    { key: "behind", re: "the opportunity behind it" },
    { key: "offer_to_send", re: \`what i(?:\${APOS}d| would| could) offer to send\` },
    { key: "relevance", re: \`why it\${APOS}?s relevant\` },
    { key: "creative", re: "creative direction" },
  ]);
  const hand = labeled(sec.handoff, [
    { key: "positive", re: "positive observation" },
    { key: "opportunity", re: "potential opportunity" },
    { key: "idea", re: "idea to offer" },
    { key: "evidence", re: "evidence\\\\s*(?:\\\\/|or)\\\\s*reference" },
    { key: "fit", re: "fit" },
    { key: "channel", re: "best channel" },
  ]);
  // Recommended samples: lines in section 4 (or the handoff) that start with an ID like A06 or S07.
  const samples = [];
  const sampleLines = [...(sec.idea || []), ...(sec.handoff || [])].map(cleanLine);
  for (const line of sampleLines) {
    const ids = line.match(/\\b[SAX]\\d{2}\\b/g);
    if (!ids) continue;
    ids.forEach((raw) => {
      const id = raw.toUpperCase();
      if (!getSample(id) || samples.some((x) => x.id === id)) return;
      let why = "";
      if (ids.length === 1) {
        const m = line.match(/\\b[SAX]\\d{2}\\b[^:]*:\\s*(.+)$/i) || line.match(/\\b[SAX]\\d{2}\\b.*?\\s[-\\u2013\\u2014]\\s+(.+)$/i);
        why = m ? m[1].replace(/==/g, "").trim() : "";
      }
      samples.push({ id, why });
    });
  }

  return {
    source: "claude",
    version: 2,
    samples: samples.slice(0, 3),
    facts,
    fit: (String(hand.fit || "").match(/strong|good|weak/i) || [""])[0].replace(/^./, (c) => c.toUpperCase()),
    channel: String(hand.channel || "").replace(/==/g, "").split(/[.,(]/)[0].trim(),
    snapshot,
    caught,
    noticed: highlightFallback(opp.noticed || ""),
    opp_detail: opp.opportunity || "",
    why: opp.why || "",
    opp_evidence: opp.evidence || "",
    idea_detail: idea.idea || "",
    behind: idea.behind || "",
    offer_to_send: idea.offer_to_send || "",
    relevance: idea.relevance || "",
    creative: idea.creative || "",
    // The handoff fields feed the message writer. Fall back to the sections above if the handoff is missing.
    positive: hand.positive || caught[0] || "",
    opportunity: hand.opportunity || opp.opportunity || "",
    idea: hand.idea || idea.idea || "",
    evidence: hand.evidence || opp.evidence || "",
  };
}

// If Claude didn't mark anything, highlight the sentence that names what's missing.
function highlightFallback(text) {
  if (!text || text.includes("==")) return text;
  const sentences = text.match(/[^.!?]+[.!?]+(\\s|$)/g) || [text];
  const hit = sentences.find((x) => /\\b(doesn['’]?t|don['’]?t|isn['’]?t|aren['’]?t|not|no|never|missing|without)\\b/i.test(x));
  return hit ? text.replace(hit.trim(), \`==\${hit.trim()}==\`) : text;
}

export function analysisReady(a) {
  return !!(a && a.positive && a.opportunity && a.idea);
}
`;export{e as default};