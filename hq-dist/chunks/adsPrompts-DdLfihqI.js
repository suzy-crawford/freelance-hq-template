var e=`// SheFreelances OS - Ads Manager: AI prompts (adsPrompts.js)
// The Meta setup and budget come from code (adsData.js). The AI writes the strategy and the ads around them.

import { BUSINESS_TYPES, GOALS, ASSET_OPTIONS, getComplianceRules, formatMoney } from "./adsData";
import { cleanText } from "./offerPrompts";
import { startingAngles } from "./adsNiches";
import { getCategory, categoriesForPrompt } from "./adsAngleLibrary";
import { creativeForPrompt } from "./adsCreative";
import { headlineGuide, HEADLINE_STRUCTURES, HEADLINES_FOR_CATEGORY, HEADLINE_BANK } from "./adsHeadlines";

const str = { type: "string" };
const strArray = { type: "array", items: str };
const obj = (properties) => ({ type: "object", properties, required: Object.keys(properties) });
const arrOf = (properties) => ({ type: "array", items: obj(properties) });

const TEXT = obj({ text: str });
const HEADLINE = obj({ structure: str, text: str });

const ANGLE_PROPS = {
  category: str,
  name: str,
  why: str,
  format: str,
  hooks: { type: "array", items: TEXT },
  headlines: { type: "array", items: HEADLINE },
  bodies: { type: "array", items: TEXT },
  trust_line: str,
  next_step: str,
  description: str,
  image: obj({ creative_type: str, visual: str, shots: strArray, overlay: str, prompt: str }),
  video: obj({ title: str, script: str }),
};
const ANGLE_SCHEMA = obj(ANGLE_PROPS);

const RECORD_SCHEMA = obj({
  strategy: obj({ summary: str, advertising: str, audience: str, action: str, approach: str, why: str }),
  setup: obj({ objective_why: str, audience_detail: str, structure_why: str, formats: strArray, destination_why: str }),
  research: obj({ reasons_to_buy: strArray, objections: strArray, moments: strArray }),
  angles: { type: "array", items: ANGLE_SCHEMA },
  journey: obj({
    steps: arrOf({ label: str, text: str }),
    landing_headline: str,
    landing_subheadline: str,
    form_questions: strArray,
    cta: str,
    thank_you: str,
    follow_up: strArray,
    follow_up_texts: arrOf({ when: str, text: str }),
  }),
  launch: obj({ from_client: strArray, before_publish: strArray, monitor: strArray, first_results: str }),
  assumptions: strArray,
});

// Second middle option is labeled so members can see the difference.
export const BODY_TYPES = { what: "What they get", why: "Why choose them" };

// Prompt text blocks. Kept in one object so live content (liveContent.js) can update them.
export const PROMPT_TEXT = {};

PROMPT_TEXT.knowledge = \`STRATEGY KNOWLEDGE (use as guidance, not rigid rules)
- Local businesses: broad targeting around the business, mention the city, lead with a specific offer. Leads usually go to a Meta Instant Form with 2 or 3 qualifying questions. Speed to lead matters: follow up within 5 minutes.
- Med spas and aesthetics: offer-first creative, real provider photos, confident language. Lead forms preferred.
- Dental: routine and cosmetic offers should be separate campaigns. Routine: team and family imagery. Cosmetic: aspirational imagery, consultation offer.
- Weight loss and GLP-1: program-focused, warm and non-judgmental, no body or scale imagery, no drug names, no guarantees.
- Online stores: send people straight to the exact product page. UGC style (real people, phone-shot) usually beats polished creative. Start with bestsellers.
- Coaching and courses: pain-led, transformation-led and credibility-led angles are worth testing. Video helps for higher-priced offers.
- Professional services and B2B: outcome-led, peer-to-peer tone.
- Universal: don't spread a small budget across many ads. Match the ad to the page or form after the click.\`;


function businessFacts(campaign, site) {
  const type = BUSINESS_TYPES.find((t) => t.id === campaign.business_type)?.label || "Business";
  const assets = ASSET_OPTIONS.find((a) => a.id === campaign.assets)?.label || "Not sure";
  const siteBlock = site?.ok
    ? \`THEIR WEBSITE (read just now, use only what is here as facts)
- Title: \${site.title || "none"}
- Description: \${site.meta_description || "none"}
- Buttons on the site: \${(site.cta_links || []).join(" · ") || "none"}
- Text: \${String(site.text || "").slice(0, 4000)}\`
    : "THEIR WEBSITE: not available. Do not describe it.";
  return \`THE BUSINESS
- Name: \${campaign.business_name}
- Type: \${type}
- Description from the freelancer: \${campaign.business_description || "none"}
- Location they serve: \${campaign.location || "not given"}
- What we're promoting: \${campaign.product || "not given"}
- The offer: \${campaign.offer_help ? "Not decided. Recommend one simple, honest offer that fits this business and label it as a suggestion in assumptions." : campaign.offer_text || "none given"}
- Creative they have: \${assets}
- Anything else: \${campaign.notes || "none"}

\${siteBlock}\`;
}

function setupFacts(setup) {
  const b = setup.budget;
  return \`THE CAMPAIGN SETUP (already decided by the app. Do not change it. Explain it.)
- Goal: \${setup.goal_label}\${setup.goal_was_chosen_for_you ? " (chosen for them)" : ""}
- Meta objective: \${setup.objective}
- Conversion location: \${setup.conversion_location}
- Performance goal: \${setup.performance_goal}
- Where people go after the click: \${setup.destination_label}
- Budget: \${formatMoney(b.monthly)} a month, about \${formatMoney(b.daily)} a day\${b.assumed ? " (a starter test budget, since none was set)" : ""}
- Structure: \${b.campaigns} campaign\${b.campaigns > 1 ? "s" : ""}, \${b.ad_sets} ad set\${b.ad_sets > 1 ? "s" : ""}, up to \${b.ads_per_ad_set} ads per ad set
- Location targeting: \${setup.location_radius}
- Audience approach: \${setup.audience_approach}
- Allowed call-to-action buttons: \${setup.cta_options.join(", ")}\`;
}

PROMPT_TEXT.honesty = \`HONESTY RULES (these win over everything)
- Never invent facts, offers, prices, discounts, reviews, ratings, review counts, results, credentials, years in business, customer counts, scarcity or deadlines. Use only what is in THE BUSINESS and THEIR WEBSITE above. If you suggest an offer, say it's a suggestion in assumptions.
- When the strongest version of a line needs a fact you don't have, write a short blank in square brackets instead, like [price], [regular price], [Google rating], [number of reviews], [years in business], [provider name], [end date]. The freelancer fills these in with the client. Never put a made-up value in its place. Use at most 3 blanks per ad.
- No guarantees. No numbers for expected leads, sales, cost per lead or return.
- No em dashes or en dashes. No hashtags.
- The strategy, setup, journey, launch and "why" fields are written to the freelancer (a beginner), in plain words. Explain any ad term in a few words the first time.\`;

function emojiStyle(campaign) {
  if (campaign.no_emojis) return "EMOJIS: none. Don't use any emoji anywhere in the ads.";
  return \`EMOJIS (the freelancer wants them; they make local ads feel friendly and easy to scan)
- In the ad text: 2 to 4 emojis per ad, never more. Good uses: one emoji at the start or end of the first line that matches the business or offer (like a sparkle for a facial, a pizza for a pizza shop, a house for real estate); a checkmark at the start of each line in a short list of what they get or why choose them; a pointing-down emoji at the end of the last line, toward the button.
- Headlines: about half of them start or end with one fitting emoji. Never more than one per headline.
- Descriptions and the text on the image: no emojis.
- Only emojis that fit the business and feel natural. No flags, faces with strong emotions, money bags, fire or 100. Never replace words with emojis.\`;
}

PROMPT_TEXT.adCopyStyle = \`HOW TO WRITE THE ADS (direct, local, specific)
These ads are written by the business to its customers. Write like the best-performing local business ads on Facebook and Instagram:
- The first line does the most work. Lead with the offer, the result, or the most interesting specific thing, following the angle. A scroller should know what this is and why it's worth a look from line one.
- Short lines. One idea per line. Line breaks between lines are good.
- Be specific: the actual treatment, dish, service, price, time, place. Name the city or area when it helps.
- Say what they get and why this business, in plain words.
- One trust line using real facts (or a [blank] for the client to fill), like "[Google rating] from [number of reviews] reviews" or "Licensed and insured" only if provided.
- End with one clear next step that matches the button.
- 30 to 80 words of primary text in total.
- Headlines: under 40 characters, specific and concrete, written in the headline structures given for each angle. Title Case like the examples.

Don't:
- Open with a vague or soft question ("Not sure which facial to choose?", "Feeling overwhelmed?").
- Use filler or spa-brochure language ("we take the time to", "on your journey", "elevate", "pamper yourself", "navigate the options").
- Describe feelings in general terms when you could name the actual thing.
- Assume something about the reader's body, health, age or appearance ("Struggling with acne?").

Bad headline: "Not sure which facial to choose"
Good headline: "Your first HydraFacial, [price]"
Bad first line: "You are looking for a facial but feel overwhelmed by all the different options available."
Good first line: "Your first facial at [Business], [price] (usually [regular price])."\`;

// The ad-writing rules, reused by the Claude prompts that write new ads.
export function adWritingRules(campaign) {
  return \`\${PROMPT_TEXT.adCopyStyle}

\${emojiStyle(campaign)}

\${PROMPT_TEXT.honesty}\`;
}

// The Meta Ads Builder shows three ad concepts.
function angleCount() {
  return 3;
}

PROMPT_TEXT.angleGuide = \`EACH ANGLE BECOMES ONE FINISHED AD. Fill these parts:
- category: the angle category id (like ANG-01).
- name: the angle name.
- why: one sentence to the freelancer on why this angle fits this business.
- format: the best ad format for it (like "Single image", "Before and after carousel", "Short vertical video (Reels)", "Talking-head video"), based on the angle and the creative they have.
- hooks: exactly 3 different first lines for the ad. Each a genuinely different way in: one leading with the offer or result, one leading with something specific or local, one leading with a question that names the actual thing. Under 20 words each.
- headlines: exactly 6, two different headlines in each of the three headline structures listed for that angle, in that order. structure = the structure id (like HL-01), text = the headline, under 40 characters. If a structure needs a fact you don't have (a price, a rating, a real deadline), use a [blank]. If the offer isn't genuinely free, write the Freebie headline about the free first step only if one exists; otherwise use HL-12 Direct action instead and set structure to HL-12.
- bodies: exactly 2 short middles (1 to 3 short lines, under 45 words) that follow the hook. The first focuses on what they get. The second focuses on why choose this business. Don't repeat the hook.
- trust_line: one short line of proof from real facts, or with a [blank] (like "[Google rating] stars from [number of reviews] local reviews"). Empty string only if no kind of proof makes sense.
- next_step: one short line telling them what to do, matching the button.
- description: under 30 characters, shown under the headline.
- image: the creative for this ad, following the CREATIVE DIRECTION and CREATIVE TYPES.
  creative_type: the creative type id (like CR-03).
  visual: one or two sentences describing the finished creative, like the niche example (what it opens on, what it shows, what it ends on).
  shots: 3 to 5 specific things the business should film or photograph for it, using their real business, team and work (like "Close-up of the facial being applied, 5 seconds"). Never stock.
  overlay: text on the image or final frame, under 8 words, may include a [blank].
  prompt: a detailed prompt for ChatGPT to make a stand-in image only if they have no real photo. No text in the image, no before and after, no real people's faces implied as customers, square 1:1.
- video: a short Reels idea the business can film on a phone: title, and a script under 60 words with what to show and say. Especially for process, demonstration and talking-head angles.\`;

function anglesBlock(niche, n) {
  if (niche?.angles?.length) {
    const chosen = startingAngles(niche, n);
    const rest = niche.angles.filter((x) => !chosen.includes(x));
    return \`STEP 2. THE ANGLES (fill angles with exactly \${chosen.length}, in this order)
These are proven angles for \${niche.label}. Use exactly these, adapted to this business's real offer and details:
\${chosen
  .map((x, i) => {
    const cat = getCategory(x.category);
    return \`\${i + 1}. \${x.name} (\${x.category} \${cat?.name})
   Concept: \${x.concept}
   Creative: \${x.creative}
   Example from another business (style reference only, never copy its facts or numbers): "\${x.example}"
   Why it works: \${x.why}\${x.caution ? \`\\n   Caution: \${x.caution}\` : ""}
   Category rules: \${cat?.rules.join(" ")}
   Headline structures for this angle:
\${headlineGuide(x.category)
  .split("\\n")
  .map((l) => \`   \${l}\`)
  .join("\\n")}\`;
  })
  .join("\\n")}
Other proven angles for this niche (not used now): \${rest.map((x) => x.name).join(", ") || "none"}.

NICHE NOTES
- Example headlines for this niche (style only): \${(HEADLINE_BANK[niche.id] || []).join(" / ")}
- Best formats: \${niche.formats}
- What works: \${niche.recommends}
\${niche.compliance ? \`- Caution: \${niche.compliance}\` : ""}\`;
  }
  return \`STEP 2. THE ANGLES (fill angles with exactly \${n})
This business isn't in our niche library, so build the angles from these categories. Pick the \${n} categories that fit this business and offer best (start with ANG-01 Offer & Incentive if they have an offer), give each a clear niche-specific name, and follow that category's rules.
\${categoriesForPrompt()}

HEADLINE STRUCTURES (use the three listed for each angle's category)
\${HEADLINE_STRUCTURES.map((h) => \`- \${h.id} \${h.name}: \${h.structure}. Rule: \${h.rule} Examples: \${h.examples.slice(0, 2).join(" / ")}\`).join("\\n")}
Category to structures: \${Object.entries(HEADLINES_FOR_CATEGORY)
    .map(([c, hs]) => \`\${c}: \${hs.join(", ")}\`)
    .join("; ")}\`;
}

function voiceSamplesBlock(campaign) {
  const v = String(campaign.voice_samples || "").trim();
  return v
    ? \`HOW THIS BUSINESS ALREADY TALKS (real posts or captions from them; match their words and tone, never copy claims from them unless they are clearly facts about the business)
\${v.slice(0, 3000)}\`
    : "";
}

export function buildAdStrategyPrompt({ campaign, setup, site, niche }) {
  const rules = getComplianceRules(campaign);
  const n = angleCount(setup);
  return {
    prompt: \`You are a senior Meta ads strategist and direct-response copywriter helping a beginner freelancer plan a campaign for a local business client. Be specific and practical.

\${businessFacts(campaign, site)}

\${voiceSamplesBlock(campaign)}

\${setupFacts(setup)}

AD RULES THAT MUST BE FOLLOWED
\${rules.map((r) => \`- \${r}\`).join("\\n")}

\${PROMPT_TEXT.knowledge}

STEP 1. RESEARCH (fill research)
reasons_to_buy: 5 real reasons someone would choose this. objections: 3 hesitations before buying. moments: 3 moments that make someone look for this. Base them on the business type and what was provided. No statistics.

\${anglesBlock(niche, n)}

\${creativeForPrompt(niche?.id)}

\${PROMPT_TEXT.angleGuide}

\${PROMPT_TEXT.adCopyStyle}

\${emojiStyle(campaign)}

STEP 3. EVERYTHING ELSE (written to the freelancer)
strategy: summary (2 sentences), advertising (what we're promoting, 1 sentence), audience (who we want to reach, 1 to 2 sentences), action (what we want them to do), approach (2 to 3 sentences), why (why it fits this business, 2 sentences).
setup: objective_why, audience_detail (who to target inside the location, age range only if the offer clearly calls for it), structure_why, formats (2 or 3, based on the angles and the creative they have), destination_why.
journey: steps (4 to 5 from seeing the ad to becoming a customer, label and text), landing_headline, landing_subheadline, form_questions (2 or 3 short questions\${niche?.form_fields ? \`, covering: \${niche.form_fields}\` : ""}; an empty list if the destination is a product page), cta, thank_you, follow_up (2 or 3 steps for the business, like "Call or text within 5 minutes"), follow_up_texts (exactly 3 short text messages the business's front desk sends a new lead, written by the business to the lead, under 40 words each, with when = "Within 5 minutes", "Next day, if no reply" and "3 days later, if no reply"; use [first name] and [team member] as placeholders; friendly, no pressure, end with an easy question; no emojis).
launch: from_client (things to get from the client beyond access and payment, including the facts needed to fill any [blanks]), before_publish (2 to 4 checks specific to THIS business and offer), monitor (3 or 4 things to watch in the first two weeks), first_results (2 to 3 sentences on reading the first results calmly).
assumptions: anything you had to assume or suggest. Empty list if nothing.

\${PROMPT_TEXT.honesty}\`,
    response_json_schema: RECORD_SCHEMA,
  };
}

export function buildAdRefinePrompt({ campaign, setup, request }) {
  const rules = getComplianceRules(campaign);
  return {
    prompt: \`You are a senior Meta ads strategist and direct-response copywriter. A beginner freelancer has a campaign plan and wants a change.

\${businessFacts(campaign, null)}

\${voiceSamplesBlock(campaign)}

\${setupFacts(setup)}

CURRENT PLAN (JSON):
\${JSON.stringify(campaign.record)}

THEIR REQUEST: "\${request}"

RULES
- Return the COMPLETE plan in the same structure, with the change applied everywhere it matters.
- Change only what the request needs. Keep everything else the same, including the angles and how many there are.
- The campaign setup above is decided by the app. If the request asks to change the goal or budget, the app has already applied it above, so make the plan match it.
- Never break the ad rules below. If the request asks for something that breaks them, keep the plan compliant and mention it in assumptions.

AD RULES
\${rules.map((r) => \`- \${r}\`).join("\\n")}

\${PROMPT_TEXT.angleGuide}

\${PROMPT_TEXT.adCopyStyle}

\${emojiStyle(campaign)}

\${PROMPT_TEXT.honesty}\`,
    response_json_schema: RECORD_SCHEMA,
  };
}

// Rewrite one ad, or swap it to another angle. Used by "Rewrite this ad" and "Swap the angle".
export function buildAngleRewritePrompt({ campaign, setup, angle, newAngle, request, niche }) {
  const rules = getComplianceRules(campaign);
  const others = (campaign.record?.angles || []).filter((x) => x.name !== angle?.name).map((x) => x.name);
  let task;
  if (newAngle) {
    const cat = getCategory(newAngle.category);
    task = \`Write a NEW ad using the angle "\${newAngle.name}" (\${newAngle.category} \${cat?.name || ""}). It replaces the ad "\${angle?.name}". It must be clearly different from: \${others.join(", ") || "none"}.
\${newAngle.concept ? \`Concept: \${newAngle.concept}\` : ""}
\${newAngle.creative ? \`Creative: \${newAngle.creative}\` : ""}
\${newAngle.example ? \`Example from another business (style reference only, never copy its facts or numbers): "\${newAngle.example}"\` : ""}
\${newAngle.caution ? \`Caution: \${newAngle.caution}\` : ""}
Category rules: \${cat?.rules.join(" ") || ""}
Headline structures for this angle:
\${headlineGuide(newAngle.category)}\`;
  } else {
    task = \`Rewrite the ad "\${angle?.name}" with fresh hooks, headlines and middles. Keep the same angle and category.\${request ? \` The freelancer asked: "\${request}".\` : ""}
CURRENT VERSION (JSON): \${JSON.stringify(angle)}
Headline structures for this angle:
\${headlineGuide(angle?.category)}\`;
  }
  return {
    prompt: \`You are a senior Meta ads direct-response copywriter helping a beginner freelancer.

\${businessFacts(campaign, null)}

\${voiceSamplesBlock(campaign)}

\${setupFacts(setup)}

WHAT CUSTOMERS CARE ABOUT
\${JSON.stringify(campaign.record?.research || {})}

TASK
\${task}

\${creativeForPrompt(niche?.id)}

AD RULES
\${rules.map((r) => \`- \${r}\`).join("\\n")}

\${PROMPT_TEXT.angleGuide}

\${PROMPT_TEXT.adCopyStyle}

\${emojiStyle(campaign)}

\${PROMPT_TEXT.honesty}\`,
    response_json_schema: ANGLE_SCHEMA,
  };
}

// Requests that change app-owned settings are applied in code before the AI rewrites the plan.
export function parseRefineRequest(request) {
  const text = String(request || "");
  const updates = {};
  const money = text.match(/\\$\\s?([\\d,]+)/);
  if (money && /budget|spend|month|\\$/i.test(text)) {
    updates.monthly_budget = Number(money[1].replace(/,/g, ""));
    updates.budget_unsure = false;
  }
  if (/appointment|booking|book/i.test(text)) updates.goal = "appointments";
  else if (/\\blead|form|sign ?up/i.test(text) && /focus|instead|switch|change/i.test(text)) updates.goal = "leads";
  else if (/(sale|purchase|buy)/i.test(text) && /focus|instead|switch|change/i.test(text)) updates.goal = "purchases";
  else if (/traffic|website visit/i.test(text) && /focus|instead|switch|change/i.test(text)) updates.goal = "traffic";
  return updates;
}

function cleanDeep(value) {
  if (typeof value === "string") return cleanText(value);
  if (Array.isArray(value)) return value.map(cleanDeep);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, cleanDeep(v)]));
  return value;
}

function finalizeAngle(a) {
  const x = a || {};
  return {
    ...x,
    hooks: (x.hooks || []).slice(0, 3),
    headlines: (x.headlines || []).slice(0, 6).map((h) => (typeof h === "string" ? { structure: "", text: h } : h)),
    bodies: (x.bodies || []).slice(0, 2).map((b, i) => ({ ...b, type: i === 0 ? "what" : "why" })),
    image: { creative_type: "", visual: "", shots: [], overlay: "", prompt: "", ...(x.image || {}) },
    video: x.video || { title: "", script: "" },
  };
}

export function finalizeAngleResult(result) {
  return finalizeAngle(cleanDeep(result || {}));
}

export function finalizeAdRecord(result, setup, niche) {
  const r = cleanDeep(result || {});
  return {
    ...r,
    cta: niche?.cta && setup.goal !== "purchases" ? niche.cta : setup.cta_options[0],
    research: r.research || { reasons_to_buy: [], objections: [], moments: [] },
    angles: (r.angles || []).slice(0, 4).map(finalizeAngle),
    assumptions: r.assumptions || [],
  };
}

export { GOALS };
`;export{e as default};