// SheFreelances OS - Meta Ads Builder engine (adsEngine.js)
// Plan produces one shared campaign brief (campaignContext). Ads, Funnel and Launch all inherit it,
// so the ad and the landing page are two outputs of the same strategy, never separate tools.

import { MASTER_PROMPTS } from "./adsMasterPrompts";
import { getNiche } from "./adsNiches";
import { creativeForPrompt } from "./adsCreative";
import { getCampaignSetup, formatMoney, getComplianceRules, BUSINESS_TYPES } from "./adsData";
import { displayName } from "./adsCards";
import { goalLabel, campaignDaily, areaText } from "./adsBuilder";

const NOT_GIVEN = "Not provided";
const val = (v) => (Array.isArray(v) ? v.filter(Boolean).join(", ") : String(v ?? "").trim()) || NOT_GIVEN;

export function funnelType(c) {
  if (c.funnel_type) return c.funnel_type;
  return c.goal === "leads" || c.goal === "help" ? "instant_form" : "landing_page";
}

const FUNNEL_LABEL = { instant_form: "INSTANT_FORM", landing_page: "LANDING_PAGE" };
const CONVERSION = {
  leads: "Fill out a short form so the business can follow up",
  appointments: "Book an appointment or consultation",
  purchases: "Buy online",
  help: "Choose the simplest next step for this business (usually a short form)",
};

// The one campaign brief everything downstream inherits.
export function campaignContext(c) {
  const niche = getNiche(c);
  const daily = campaignDaily(c);
  return {
    business_name: displayName(c.business_name),
    website: c.website || NOT_GIVEN,
    niche: niche.label && niche.id !== "general" ? niche.label : BUSINESS_TYPES.find((t) => t.id === c.business_type)?.label || NOT_GIVEN,
    location: c.location || NOT_GIVEN,
    services: val(c.services?.length ? c.services : c.product),
    business_description: val(c.business_description),
    brand_colors: val(c.brand_colors),
    brand_style: val(c.brand_style),
    logo: c.logo_available ? "Yes" : "Not confirmed. If they have one, upload it with the prompt.",
    service: val(c.product),
    offer: c.offer_help ? "Not decided. Suggest the simplest believable offer for this business and say it's a suggestion." : val(c.offer_text),
    price: val(c.price_text),
    goal: goalLabel(c.goal) || NOT_GIVEN,
    conversion_action: CONVERSION[c.goal] || NOT_GIVEN,
    funnel_type: FUNNEL_LABEL[funnelType(c)],
    budget: daily ? `${formatMoney(daily)} a day` : NOT_GIVEN,
    target_area: areaText(c) || NOT_GIVEN,
    target_customer: val(c.target_customer),
    motivation: NOT_GIVEN,
    pain: NOT_GIVEN,
    dream_outcome: NOT_GIVEN,
    objections: NOT_GIVEN,
    alternatives: NOT_GIVEN,
    differentiators: val(c.differentiators),
    proof: val(c.proof_text),
    reviews: val(c.reviews_text),
    credentials: val(c.credentials_text),
    offer_details: val(c.offer_text),
    photos: val(c.assets_text),
    videos: val(c.assets_text),
    team_assets: NOT_GIVEN,
    before_after: NOT_GIVEN,
    testimonial_assets: NOT_GIVEN,
    service_assets: NOT_GIVEN,
    niche_creative: creativeForPrompt(niche.id) || "",
  };
}

export function fill(template, values) {
  return String(template).replace(/\{\{(\w+)\}\}/g, (m, k) => (values[k] !== undefined ? values[k] : NOT_GIVEN));
}

function contextBlock(ctx) {
  return [
    `Business: ${ctx.business_name} (${ctx.niche}), ${ctx.location}`,
    `Website: ${ctx.website}`,
    `Service: ${ctx.service}`,
    `Offer: ${ctx.offer}`,
    `Target customer: ${ctx.target_customer}`,
    `Goal: ${ctx.goal}`,
    `Budget: ${ctx.budget}, area: ${ctx.target_area}`,
    `Verified proof: ${ctx.proof}; reviews: ${ctx.reviews}; credentials: ${ctx.credentials}`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Ads
// ---------------------------------------------------------------------------

const s = { type: "string" };
const arr = { type: "array", items: s };
export const ADS_SCHEMA = {
  type: "object",
  properties: {
    concepts: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: s,
          angle: s,
          why: s,
          primary_short: s,
          primary_medium: s,
          headlines: arr,
          descriptions: arr,
          cta: s,
          cta_why: s,
          creative_type: s,
          format: { type: "string", enum: ["static", "video"] },
          creative_direction: s,
          overlay: s,
          design_prompt: s,
          video: {
            type: "object",
            properties: { format: s, duration: s, opening_visual: s, shots: arr, overlay: s, hook: s, body: s, cta: s, final_frame: s },
          },
          image_prompt: s,
          motion_prompt: s,
          more_versions_prompt: s,
        },
        required: ["name", "angle", "why", "primary_short", "primary_medium", "headlines", "descriptions", "cta", "format"],
      },
    },
  },
  required: ["concepts"],
};

const APP_RULES = `APP OUTPUT RULES (for the app that shows these ads, not part of the ads themselves)
- Return JSON matching the schema. Exactly 3 items in "concepts".
- angle: the angle family name in plain words (like "Direct offer"). why: the strategic angle in 1 to 2 sentences.
- creative_direction: the static creative direction or video concept as short plain lines.
- overlay: the text that goes on the image, or for video the on-screen text.
- primary_short and primary_medium: short paragraphs of 1 to 2 sentences, separated by a blank line (\n\n). The hook goes first on its own line. The call to action goes last on its own line. Never one long block.
- format "static" fills design_prompt and image_prompt (a photo to use if they don't have one). Format "video" fills video, image_prompt and motion_prompt.
- If one specific fact would make an ad stronger but wasn't supplied (a price, a rating), you may write it as a short [placeholder in square brackets] for the freelancer to fill in. Never invent the fact itself.
- No em dashes.`;

export function buildAdsCall(c) {
  const ctx = campaignContext(c);
  return {
    prompt: `${fill(MASTER_PROMPTS.ads, ctx)}\n\n${APP_RULES}\n\nAD RULES FOR THIS BUSINESS\n${getComplianceRules(c).map((r) => `- ${r}`).join("\n")}`,
    response_json_schema: ADS_SCHEMA,
  };
}

const MUST_DESIGN = [
  "If I uploaded a logo, website screenshot, brand kit, or reference image, use it to understand the brand style. Do not copy another company's creative exactly.",
  "Do not invent ratings, review counts, results, prices, urgency, guarantees, or credentials.",
  "Keep text readable on mobile and avoid overcrowding the creative.",
];

export function finalizeConcepts(result) {
  const list = Array.isArray(result?.concepts) ? result.concepts.slice(0, 3) : [];
  return list.map((k) => {
    const design = String(k.design_prompt || "").trim();
    const missing = MUST_DESIGN.filter((line) => !design.includes(line.slice(0, 40)));
    return {
      name: k.name || "Ad concept",
      angle: k.angle || "",
      why: k.why || "",
      primary_short: formatCaption(k.primary_short),
      primary_medium: formatCaption(k.primary_medium),
      headlines: (k.headlines || []).filter(Boolean).slice(0, 5),
      descriptions: (k.descriptions || []).filter(Boolean).slice(0, 3),
      cta: k.cta || "Learn More",
      cta_why: k.cta_why || "",
      creative_type: k.creative_type || "",
      format: k.format === "video" ? "video" : "static",
      creative_direction: k.creative_direction || "",
      overlay: k.overlay || k.video?.overlay || "",
      design_prompt: design ? [design, ...missing].join("\n\n") : "",
      video: k.video || null,
      image_prompt: k.image_prompt || "",
      motion_prompt: k.motion_prompt || "",
      more_versions_prompt: k.more_versions_prompt || "",
    };
  });
}

// Fallback "Make more versions" prompt when the AI didn't write one (Suzy's wording).
export function moreVersionsPrompt(c, k) {
  if (k.more_versions_prompt) return k.more_versions_prompt;
  return `Create 6 new versions of this ad while keeping the same offer and core strategic angle.

THE AD
Business: ${displayName(c.business_name)}
Angle: ${k.angle}
Primary text: ${k.primary_short}
Headline: ${k.headlines[0] || ""}
Text on image: ${k.overlay}

Change only one major variable at a time:
* 2 new headline treatments
* 2 new visual layouts
* 1 different CTA treatment
* 1 alternative proof or trust treatment, but only if verified proof is available
Keep the audience, offer, positioning, and campaign goal consistent.
Do not invent new proof, pricing, guarantees, urgency, testimonials, ratings, or results.
For each version, explain exactly what changed.`;
}

// The ads as written, before any edits.
export function originalConcepts(c) {
  return c.record?.concepts || [];
}

// The ads with her edits applied (edits live in ad_choices[i].edits, keyed by field).
// Everything downstream (preview, Copy ad copy, funnel, campaign instructions) reads this.
export function concepts(c) {
  return originalConcepts(c).map((k, i) => applyEdits(k, c.ad_choices?.[i]?.edits));
}

function applyEdits(k, edits) {
  if (!edits || !Object.keys(edits).length) return k;
  const pick = (key, v) => (typeof edits[key] === "string" ? edits[key] : v);
  return {
    ...k,
    primary_short: pick("primary_short", k.primary_short),
    primary_medium: pick("primary_medium", k.primary_medium),
    overlay: pick("overlay", k.overlay),
    headlines: (k.headlines || []).map((h, j) => pick(`headline_${j}`, h)),
    descriptions: (k.descriptions || []).map((d, j) => pick(`description_${j}`, d)),
  };
}

// ---------------------------------------------------------------------------
// Editing the copy: rewrite one piece, or change the voice of a whole ad
// ---------------------------------------------------------------------------

export const FIELD_LABELS = { primary_short: "primary text (short)", primary_medium: "primary text (medium)", overlay: "text on the image", headline: "headline", description: "description" };
const FIELD_LIMITS = {
  headline: "Under 40 characters.",
  description: "Under 30 characters.",
  overlay: "Under 8 words. It has to read on a phone in one second.",
  primary_short: "2 to 4 short paragraphs separated by a blank line. Hook first on its own line, call to action last on its own line.",
  primary_medium: "4 to 6 short paragraphs separated by a blank line. Hook first on its own line, call to action last on its own line.",
};

export const REWRITE_OPTIONS = [
  { id: "shorter", label: "Shorter", ask: "Make it shorter. Keep the strongest idea." },
  { id: "punchier", label: "Punchier", ask: "Make it punchier: stronger hook, fewer words, more energy." },
  { id: "warmer", label: "Warmer", ask: "Make it warmer and more personal, like a friendly owner talking to one person." },
  { id: "urgent", label: "More urgent", ask: "Give it more urgency using only what is true about the offer. Never invent deadlines or limited spots." },
];

export const VOICES = [
  { id: "warm", label: "Warm and friendly", ask: "Warm, friendly and personal. Like the owner talking to one neighbor." },
  { id: "luxury", label: "Luxury", ask: "Calm, polished and premium. Fewer words, elegant phrasing, no hype, no exclamation marks." },
  { id: "bold", label: "Bold and direct", ask: "Bold and direct. Short sentences. Lead with the offer and the outcome." },
  { id: "playful", label: "Playful", ask: "Light, playful and fun, with a wink. Still clear about the offer." },
  { id: "expert", label: "Expert and clinical", ask: "Expert, precise and reassuring. Explain what happens and why it works. Plain words, no jargon." },
];

function copyBrief(c, k) {
  const ctx = campaignContext(c);
  return `THE BUSINESS
${ctx.business_name}, ${ctx.niche} in ${ctx.location}. Promoting: ${ctx.service}. Offer: ${ctx.offer}. Goal: ${ctx.goal}. Target customer: ${ctx.target_customer}.
Real proof: ${ctx.proof}. Credentials: ${ctx.credentials}.

THE AD
Name: ${k.name}. Angle: ${k.angle}. Why it works: ${k.why || ""}.
Primary text: ${k.primary_short}
Headline: ${k.headlines?.[0] || ""}
Description: ${k.descriptions?.[0] || ""}
Text on image: ${k.overlay || ""}`;
}

function copyRules(c) {
  return `RULES
- Keep the same offer, prices, facts and angle. Never invent reviews, ratings, results, prices, deadlines, guarantees or credentials.
- Keep every [placeholder in square brackets] exactly as written.
- Plain words a local customer would use. No em dashes.
${c.no_emojis ? "- No emojis.\n" : "- At most 1 or 2 emojis in the primary text, none in headlines.\n"}${getComplianceRules(c).map((r) => `- ${r}`).join("\n")}`;
}

// One piece, rewritten. how = one of REWRITE_OPTIONS asks, or her own words.
export function buildRewriteCall(c, k, field, text, how) {
  const kind = field.replace(/_\d+$/, "");
  return {
    prompt: `You are a direct-response copywriter for local business Meta ads. Rewrite one piece of this ad.

${copyBrief(c, k)}

REWRITE THIS ${String(FIELD_LABELS[kind] || kind).toUpperCase()}
${text}

HOW
${how}
${FIELD_LIMITS[kind] || ""}

${copyRules(c)}

Return JSON: { "text": the new version only }.`,
    response_json_schema: { type: "object", properties: { text: { type: "string" } }, required: ["text"] },
  };
}

export function finalizeRewrite(r, field) {
  const t = String(r?.text || "").replace(/\s*\u2014\s*/g, ", ").trim();
  return /^primary/.test(field) ? formatCaption(t) : t.replace(/\s*\n+\s*/g, " ");
}

// Every piece of one ad, rewritten in a new voice.
export function buildVoiceCall(c, k, voice) {
  const n = (a) => Math.max(1, (a || []).length);
  return {
    prompt: `You are a direct-response copywriter for local business Meta ads. Rewrite every piece of this ad in a new voice.

${copyBrief(c, k)}
Medium primary text: ${k.primary_medium}
All headlines: ${(k.headlines || []).join(" | ")}
All descriptions: ${(k.descriptions || []).join(" | ")}

NEW VOICE
${voice.ask}

RETURN
- primary_short: ${FIELD_LIMITS.primary_short}
- primary_medium: ${FIELD_LIMITS.primary_medium}
- headlines: ${n(k.headlines)} headlines. ${FIELD_LIMITS.headline}
- descriptions: ${n(k.descriptions)} descriptions. ${FIELD_LIMITS.description}
- overlay: ${FIELD_LIMITS.overlay}

${copyRules(c)}`,
    response_json_schema: {
      type: "object",
      properties: { primary_short: s, primary_medium: s, headlines: arr, descriptions: arr, overlay: s },
      required: ["primary_short", "primary_medium", "headlines", "descriptions", "overlay"],
    },
  };
}

// Voice result -> the edits object for ad_choices[i].edits.
export function voiceEdits(r, k) {
  const clean = (t) => String(t || "").replace(/\s*\u2014\s*/g, ", ").trim();
  const edits = {};
  if (r?.primary_short) edits.primary_short = formatCaption(clean(r.primary_short));
  if (r?.primary_medium) edits.primary_medium = formatCaption(clean(r.primary_medium));
  if (r?.overlay && k.overlay) edits.overlay = clean(r.overlay);
  (k.headlines || []).forEach((_, j) => r?.headlines?.[j] && (edits[`headline_${j}`] = clean(r.headlines[j])));
  (k.descriptions || []).forEach((_, j) => r?.descriptions?.[j] && (edits[`description_${j}`] = clean(r.descriptions[j])));
  return edits;
}

// The version, headline and description she picked for ad i (defaults: short, first, first).
// Ad captions as short paragraphs: the hook alone, then 1 to 2 sentences each, the call to action alone.
// Keeps the AI's own line breaks when it wrote them.
export function formatCaption(text) {
  const t = String(text || "").replace(/\r/g, "").trim();
  if (!t) return "";
  if (t.includes("\n")) return t.split(/\n\s*\n|\n/).map((x) => x.trim()).filter(Boolean).join("\n\n");
  const sentences = t.split(/(?<!\b(?:Dr|Mr|Mrs|Ms|St|vs|No)\.)(?<=[.!?…])\s+/).map((x) => x.trim()).filter(Boolean);
  if (sentences.length < 3) return sentences.join("\n\n");
  const last = sentences[sentences.length - 1];
  const ctaLast = last.length <= 90;
  const body = sentences.slice(1, ctaLast ? -1 : undefined);
  const paras = [sentences[0]];
  for (let i = 0; i < body.length; ) {
    const two = body[i + 1] && (body[i] + " " + body[i + 1]).length <= 170;
    paras.push(two ? `${body[i]} ${body[i + 1]}` : body[i]);
    i += two ? 2 : 1;
  }
  if (ctaLast) paras.push(last);
  return paras.join("\n\n");
}

export function picked(c, k, i) {
  const ch = c.ad_choices?.[i] || {};
  return {
    primary: formatCaption(ch.version === "medium" ? k.primary_medium : k.primary_short),
    headline: k.headlines[ch.headline ?? 0] || k.headlines[0] || "",
    description: k.descriptions[ch.description ?? 0] || k.descriptions[0] || "",
  };
}

export function conceptCopy(c, k, i) {
  const p = picked(c, k, i);
  return [
    `AD ${i + 1}: ${displayName(c.business_name)} - ${k.name} - ${k.format === "video" ? "Video" : "Image"}`,
    "",
    "Primary text:",
    p.primary,
    "",
    `Headline: ${p.headline}`,
    `Description: ${p.description}`,
    `Button: ${k.cta}`,
    k.overlay ? `Text on ${k.format === "video" ? "screen" : "image"}: ${k.overlay}` : "",
  ]
    .filter((l) => l !== null)
    .join("\n");
}

// ---------------------------------------------------------------------------
// Funnel
// ---------------------------------------------------------------------------

const FORM_SCHEMA = {
  type: "object",
  properties: {
    form_headline: s,
    intro: s,
    questions: { type: "array", items: { type: "object", properties: { question: s, options: arr } } },
    contact_fields: arr,
    privacy_note: s,
    thank_you_headline: s,
    thank_you_text: s,
    cta: s,
    follow_up: s,
  },
  required: ["form_headline", "intro", "contact_fields", "thank_you_headline", "thank_you_text"],
};

const PAGE_SCHEMA = {
  type: "object",
  properties: {
    page_type: s,
    headline: s,
    subheadline: s,
    cta: s,
    offer: s,
    benefits: arr,
    proof: arr,
    process: arr,
    faqs: { type: "array", items: { type: "object", properties: { q: s, a: s } } },
    form_fields: arr,
    mobile_notes: arr,
  },
  required: ["headline", "subheadline", "cta", "offer", "benefits", "faqs", "form_fields"],
};

function adValues(c, k) {
  return {
    ad_concept: k ? k.name : NOT_GIVEN,
    ad_angle: k ? `${k.angle}. ${k.why}` : NOT_GIVEN,
    ad_headline: k?.headlines?.[0] || NOT_GIVEN,
    ad_copy: k?.primary_short || NOT_GIVEN,
  };
}

function funnelValues(c, k) {
  const ctx = campaignContext(c);
  const setup = c.setup || getCampaignSetup(c);
  return {
    ...ctx,
    ...adValues(c, k),
    testimonials: ctx.proof,
    ratings: ctx.reviews,
    case_studies: NOT_GIVEN,
    facts: ctx.business_description,
    cta: k?.cta || setup.cta || "Book Now",
    cta_type: c.goal === "purchases" ? "PURCHASE" : c.goal === "appointments" ? "BOOK" : "FORM",
    cta_url: c.cta_url || NOT_GIVEN,
    fields: NOT_GIVEN,
    images: val(c.assets_text),
    page_type: "AUTO",
  };
}

export function buildFunnelCall(c, conceptIndex, type) {
  const k = concepts(c)[conceptIndex] || concepts(c)[0];
  if (type === "instant_form") {
    const ctx = campaignContext(c);
    return {
      prompt: `${fill(MASTER_PROMPTS.instantForm, { context: contextBlock(ctx), ...adValues(c, k) })}\n\nReturn JSON matching the schema. No em dashes.`,
      response_json_schema: FORM_SCHEMA,
    };
  }
  return {
    prompt: `${fill(MASTER_PROMPTS.funnel, funnelValues(c, k))}

APP OUTPUT RULES
- For the app, return OUTPUT 1 only (the landing page copy), as JSON matching the schema. No HTML.
- page_type: Lead generation, Direct offer or High-ticket consultation.
- proof: only supplied proof. If none, use "What you can expect" style points instead.
- process: 3 simple steps, including what happens after the form.
- No em dashes.`,
    response_json_schema: PAGE_SCHEMA,
  };
}

// "Build This Funnel": the funnel master prompt with everything filled in, to paste into Claude or ChatGPT.
export function buildFunnelPrompt(c, conceptIndex) {
  const k = concepts(c)[conceptIndex] || concepts(c)[0];
  const page = c.funnel?.landing_page;
  const outline = page
    ? `\n\nTHE PAGE COPY WE ALREADY WROTE (use it, improve it only where it breaks a rule above)
Headline: ${page.headline}
Subheadline: ${page.subheadline}
Offer: ${page.offer}
Benefits: ${(page.benefits || []).join(" / ")}
${(page.proof || []).length ? `Proof: ${page.proof.join(" / ")}\n` : ""}How it works: ${(page.process || []).join(" / ")}
FAQs: ${(page.faqs || []).map((f) => `${f.q} ${f.a}`).join(" / ")}
Form fields: ${(page.form_fields || []).join(", ")}
CTA: ${page.cta}`
    : "";
  return `${fill(MASTER_PROMPTS.funnel, funnelValues(c, k))}${outline}

If I uploaded their logo, a website screenshot or brand images, use them for the design.`;
}

export function instantFormText(c) {
  const f = c.funnel?.instant_form;
  if (!f) return "";
  return [
    `INSTANT FORM FOR ${displayName(c.business_name).toUpperCase()}`,
    "",
    `Form type: More volume`,
    `Headline: ${f.form_headline}`,
    `Intro: ${f.intro}`,
    "",
    "Questions:",
    ...(f.questions || []).map((q, i) => `${i + 1}. ${q.question}${q.options?.length ? ` (${q.options.join(" / ")})` : ""}`),
    "",
    `Contact fields: ${(f.contact_fields || []).join(", ")}`,
    `Privacy policy: ${f.privacy_note || "Add the link to the business's privacy policy."}`,
    "",
    `Thank-you headline: ${f.thank_you_headline}`,
    `Thank-you text: ${f.thank_you_text}`,
    `Button: ${f.cta || "Call business"}`,
    "",
    `Follow-up: ${f.follow_up || "Call or text every new lead within 5 minutes."}`,
  ].join("\n");
}

export function finalizeFunnel(type, r) {
  if (type === "instant_form") {
    return {
      form_headline: r?.form_headline || "",
      intro: r?.intro || "",
      questions: (r?.questions || []).filter((q) => q?.question).slice(0, 3),
      contact_fields: (r?.contact_fields || []).filter(Boolean),
      privacy_note: r?.privacy_note || "",
      thank_you_headline: r?.thank_you_headline || "",
      thank_you_text: r?.thank_you_text || "",
      cta: r?.cta || "",
      follow_up: r?.follow_up || "",
    };
  }
  return {
    page_type: r?.page_type || "",
    headline: r?.headline || "",
    subheadline: r?.subheadline || "",
    cta: r?.cta || "",
    offer: r?.offer || "",
    benefits: (r?.benefits || []).filter(Boolean),
    proof: (r?.proof || []).filter(Boolean),
    process: (r?.process || []).filter(Boolean),
    faqs: (r?.faqs || []).filter((f) => f?.q),
    form_fields: (r?.form_fields || []).filter(Boolean),
    mobile_notes: (r?.mobile_notes || []).filter(Boolean),
  };
}

// ---------------------------------------------------------------------------
// Launch
// ---------------------------------------------------------------------------

export const META_MCP_URL = "https://mcp.facebook.com/ads";
export const TEST_PROMPT = "Show me the Meta ad accounts I currently have access to.";

const META_OBJECTIVE = {
  leads: { objective: "Leads (OUTCOME_LEADS)", optimize: "Leads", form: true },
  appointments: { objective: "Leads (OUTCOME_LEADS)", optimize: "Leads", form: false },
  purchases: { objective: "Sales (OUTCOME_SALES)", optimize: "Purchases on the website pixel", form: false },
  help: { objective: "Leads (OUTCOME_LEADS)", optimize: "Leads", form: true },
};

// The message that builds the campaign. Two versions:
// "connector": Claude Code builds it in the ad account through the Meta Ads connector.
// "manual": Claude (or ChatGPT) walks her through Meta Ads Manager while she clicks.
export function buildCampaignInstructions(c, mode = "connector") {
  const name = displayName(c.business_name);
  const setup = c.setup || getCampaignSetup(c);
  const meta = META_OBJECTIVE[c.goal] || META_OBJECTIVE.leads;
  const type = funnelType(c);
  const daily = campaignDaily(c) || setup.budget?.daily || 20;
  const month = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const used = concepts(c)
    .map((k, i) => ({ ...k, ...picked(c, k, i) }))
    .filter((_, i) => !(c.ads_off || []).includes(i));
  const form = c.funnel?.instant_form;
  const page = c.funnel?.landing_page;
  const isForm = type === "instant_form";
  const adBlocks = used
    .map(
      (k, i) => `AD ${i + 1}: "${name} - ${k.name} - ${k.format === "video" ? "Video" : "Image"}"
Primary text:
${k.primary}
Headline: ${k.headline}
Description: ${k.description}
Button: ${k.cta}
${k.format === "video" ? "Video" : "Image"}: the ${k.format === "video" ? "video" : "image"} I upload for this ad${k.overlay ? ` (text on it: ${k.overlay})` : ""}`
    )
    .join("\n\n");

  const settings = `THE CAMPAIGN
- Campaign name: "${name} - ${goalLabel(c.goal) || "Leads"} - ${month}"
- Objective: ${meta.objective}
- Budget: ${formatMoney(daily)} a day, set once at the campaign level (Advantage campaign budget)
- Structure: 1 campaign, 1 ad set, ${used.length} ads
- Ad set name: "${name} - ${areaText(c) || "Local"} - Broad"
- Optimize for: ${meta.optimize}
- Location: ${c.radius_miles ? `${c.radius_miles} miles around the business in ${c.location || "their city"} (ask me for the exact address)` : c.location || "ask me"}
- Audience: broad. No interests, no lookalikes. Only add an age range if the offer clearly calls for it.
- Placements: Advantage+ placements
${setup.is_health ? "- This is a health or beauty business: no special ad category is needed, but follow the ad rules below.\n" : ""}`;

  const formText = form ? instantFormText(c) : "Name, phone and email, with a short thank-you screen.";
  const pageLine = `The landing page: ${c.cta_url || "ask me for the exact page link"}.${page ? ` The page headline is "${page.headline}", so the ads and page match.` : ""}`;
  const rules = `AD RULES FOR THIS BUSINESS
${getComplianceRules(c)
  .map((r) => `- ${r}`)
  .join("\n")}`;
  const blanks = `BLANKS
If any ad text still has something in [square brackets], ask me to fill it in first. Never fill it in yourself and never use an ad with a blank in it.`;

  if (mode === "manual") {
    return `I'm a freelance marketer launching a Meta ad campaign for my client, ${name}${c.location ? ` in ${c.location}` : ""}. I'm building it myself in Meta Ads Manager (adsmanager.facebook.com). Walk me through it.

HOW TO HELP ME
- One step at a time. Tell me exactly where to click and what to type, using the button and field names I'll see on screen.
- After each step, wait for me to say "done" before giving me the next one.
- If I send a screenshot, look at it and tell me what to change.
- Everything stays paused or in draft. Tell me to leave the campaign off until my client approves the ads. Never tell me to publish before that.
- Start by checking I'm in the right ad account (the one for ${name}) and the right Facebook Page.

THE ORDER
1. Create the campaign with the settings below.
2. Set up the ad set: budget, location, audience, placements${isForm ? "" : ", and the website as the conversion location"}.
3. Create each ad: upload the image or video, paste the copy, pick the button${isForm ? ", and attach the Instant Form" : ", and add the landing page link"}.
4. Check everything with me, then show me how to get a preview link for each ad to send my client.

${settings}
WHERE THE ADS SEND PEOPLE
${isForm ? `An Instant Form. Walk me through creating it inside the first ad (Instant Form, then Create form), then reuse it on the other ads. The form:
${formText}` : pageLine}

THE ADS (I'll paste the copy exactly as written)
${adBlocks}

${blanks}

AT THE END, GO THROUGH THIS WITH ME
- Campaign, ad set and every ad are set up and still off.
- Budget is ${formatMoney(daily)} a day, set once.
- The right Page is on every ad, and every ad goes to the ${isForm ? "Instant Form" : "landing page"} above.
- Every ad name follows: Business - Concept - Format.
- I have a preview link for every ad to send my client before I publish.

${rules}`;
  }

  return `I'm a freelance marketer launching a Meta ad campaign for my client, ${name}${c.location ? ` in ${c.location}` : ""}. Use the Meta Ads connector to build it in my client's ad account.

Build everything paused. Do not publish anything until I approve it.

SAFETY RULES
- Create everything PAUSED. Never activate or publish anything.
- Never change, pause or delete anything that already exists in the account unless I say yes to that exact change.
- Only use the ad account I choose. List my ad accounts and ask me which one belongs to ${name}.
- Ask me which Facebook Page belongs to ${name}, and check whether their Instagram is linked.
- If something fails, tell me in plain words what happened and what to do.

${settings}
WHERE THE ADS SEND PEOPLE
${isForm ? `An Instant Form (lead form). Lead ads need a form, and you may not be able to create forms, so ask me for the form ID. If I haven't made it yet, tell me: "In Meta Business Suite, go to All tools, then Instant Forms, create the form, and copy its ID." The form:
${formText}` : pageLine}

THE ADS (use the copy exactly as written)
${adBlocks}

IMAGES AND VIDEOS
Ask me to upload one image or video for each ad and name each file after its ad. Ask whether any was made with AI and set the AI disclosure the way I answer.

${blanks}

BEFORE YOU HAND IT BACK, CHECK
- Campaign, ad set and every ad exist and are PAUSED.
- Budget is ${formatMoney(daily)} a day, set once.
- The right Page is on every ad, and every ad goes to the ${isForm ? "Instant Form" : "landing page"} above.
- Every ad name follows: Business - Concept - Format.
Show me the result as a short pass / fix list, then give me a preview link for every ad and remind me to send the previews to my client before I press Publish myself.

${rules}`;
}
