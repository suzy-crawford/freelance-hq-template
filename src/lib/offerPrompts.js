// SheFreelances OS - Offer Builder: AI prompts and output checks (offerPrompts.js)
// Used with base44 InvokeLLM + response_json_schema. All numbers (price) and the standard
// package come from code, so the AI never decides them on its own.

import {
  STANDARD_PACKAGES,
  EXPERIENCE_LEVELS,
  SERVICES,
  getServiceName,
  getFreelancerName,
  nicheInSentence,
  formatMoney,
} from "./offerData";
import { voiceFor } from "./copyVoice";

export const AI_VOICE_RULES = `FRAMING
- Frame the freelancer's future clients as real, successful businesses that want to grow. Never as struggling or broken businesses that need rescuing.
- Never condescending. Always in their corner.
- Do not use em dashes or en dashes. Use commas or periods.

${voiceFor("member")}

HONESTY
- Never invent credentials, years of experience, past clients, testimonials, or results.
- Never promise results. Describe what the service is designed to help with.
- Do not write any prices, dollar amounts, or percentages. Prices are added by the app.
- This is a recommended starting offer the freelancer will review and customize.`;

function experienceLine(level) {
  const own = " If they describe their own experience in About them, you may use exactly what they wrote. Never add to it.";
  if (level === "has_clients")
    return "They have had at least one paying client. Do not invent specific results, numbers, or client names." + own;
  if (level === "no_clients")
    return "They have practiced the skill but have no paying clients yet. Do not invent past clients or results." + own;
  return "They are brand new and still learning the skill. Do not invent past clients, results, or experience. Keep everything extra simple." + own;
}

function serviceContext(offer) {
  const name = getServiceName(offer);
  const interests = (offer.interested_services || [])
    .filter((s) => s !== offer.primary_service && !(offer.primary_service === "combined" && (s === "meta_ads" || s === "organic_social")))
    .map((s) => (s === "other" ? offer.custom_service_name || "another service" : SERVICES[s]?.label))
    .filter(Boolean);
  let text = `Main service: ${name}.`;
  if (offer.primary_service === "other" && offer.custom_service_details) text += ` Their description: "${offer.custom_service_details}".`;
  if (interests.length)
    text += ` They are also interested in: ${interests.join(", ")}. Do NOT add those to the package. You may mention once, in your_fit, that they could add one later.`;
  return text;
}

function packageText(pkg) {
  return pkg.categories.map((c) => `${c.name}: ${c.items.join("; ")}`).join(" | ");
}

// ---------------------------------------------------------------------------
// Shared JSON schema for the AI-written parts of the offer record
// ---------------------------------------------------------------------------

const str = { type: "string" };
const strArray = { type: "array", items: str };

const PACKAGE_SCHEMA = {
  type: "object",
  properties: {
    package_name: str,
    categories: {
      type: "array",
      items: { type: "object", properties: { name: str, items: strArray }, required: ["name", "items"] },
    },
    not_included: strArray,
  },
  required: ["package_name", "categories", "not_included"],
};

function recordSchema({ includePackage, includeRefineFields }) {
  const properties = {
    positioning: {
      type: "object",
      properties: {
        summary: str,
        client_thinking: str,
        they_dont_want: strArray,
        they_need: str,
        your_fit: str,
      },
      required: ["summary", "client_thinking", "they_dont_want", "they_need", "your_fit"],
    },
    selling: {
      type: "object",
      properties: {
        plain_explanation: str,
        layers: {
          type: "array",
          items: { type: "object", properties: { name: str, text: str }, required: ["name", "text"] },
        },
        i_help: strArray,
      },
      required: ["plain_explanation", "layers", "i_help"],
    },
    offer: {
      type: "object",
      properties: {
        name_options: {
          type: "array",
          items: { type: "object", properties: { name: str, why: str }, required: ["name", "why"] },
        },
        recommended_name: str,
        statement: str,
        method: {
          type: "object",
          properties: {
            name: str,
            steps: {
              type: "array",
              items: { type: "object", properties: { name: str, text: str }, required: ["name", "text"] },
            },
          },
          required: ["name", "steps"],
        },
      },
      required: ["name_options", "recommended_name", "statement", "method"],
    },
    talk: {
      type: "object",
      properties: { bio_line: str, one_sentence: str, spoken_30s: str },
      required: ["bio_line", "one_sentence", "spoken_30s"],
    },
    paper: {
      type: "object",
      properties: { tagline: str, who_its_for: str, description: str, next_step: str },
      required: ["tagline", "who_its_for", "description", "next_step"],
    },
    skills_note: str,
    terms: {
      type: "array",
      items: { type: "object", properties: { term: str, meaning: str }, required: ["term", "meaning"] },
    },
  };
  if (includePackage) properties.package = PACKAGE_SCHEMA;
  if (includeRefineFields) {
    properties.price = { type: "number" };
    properties.change_summary = str;
  }
  return { type: "object", properties, required: Object.keys(properties) };
}

const OUTPUT_GUIDE = `WHAT TO WRITE (fill every field)

WHO IS SPEAKING (follow exactly)
- positioning: you (the strategist) talking TO the freelancer ABOUT her future clients. Refer to clients in third person ("Med spa owners want..."). Never write "I help" here, and never address the business owner as "you".
- selling: the freelancer describing her own service in first person ("I set up...", "I help med spas..."). Refer to clients in third person. Never address the business owner as "you".
- offer.statement and offer.method: describe the service in third person or first person ("I set up..."), never addressing the business owner as "you".
- talk: the freelancer speaking out loud in first person. In spoken_30s she is talking to a business owner, so "you" is fine there.
- paper: client-facing. Speak to the business owner as "you" and "your business".

positioning
- summary: 2 sentences on who they help and what those businesses usually want.
- client_thinking: what this business owner is quietly thinking, in their own words, as a short quote (1 to 2 sentences).
- they_dont_want: 3 short things this business owner does NOT want from a freelancer.
- they_need: 1 to 2 sentences on what they actually need.
- your_fit: 2 sentences speaking to the freelancer as "you": why this service fits these clients, and what makes her a good choice (use what she wrote about herself if given; otherwise focus on care, focus, and consistency, never on invented experience).

selling
- plain_explanation: 2 sentences, the freelancer explaining her service to a friend in first person.
- layers: exactly 3, in this order and with these names: "What you do", "What the client gets", "What it helps improve". One sentence each.
- i_help: 3 statements that each start with "I help" and name the type of business. Under 20 words each.

offer
- name_options: exactly 3 simple, clear offer names (2 to 5 words, no puns). Each with one short "why".
- recommended_name: one of the 3 names, exactly as written.
- statement: 2 sentences. For [type of business] who wants [what they want]. Plain and confident.
- method: a simple name for how they work (for example "The Steady Growth Method") and exactly 3 steps, each with a short name and one sentence. Steps must match the package (for example: set up, create, review and improve).

talk
- bio_line: one line for an Instagram or LinkedIn bio. Under 15 words.
- one_sentence: "I help [type of business] [do what] so they can [result]." Under 30 words.
- spoken_30s: how they would explain it out loud on a call, about 70 words, natural and relaxed.

paper (this goes on a client-facing one-page document)
- tagline: under 10 words.
- who_its_for: one sentence starting "For".
- description: 2 sentences, under 45 words, about what the service does for the business.
- next_step: one friendly sentence inviting the business to reach out. No contact details.

skills_note: if the service is not Paid Ads, Social Media & Content, or both together, 1 to 2 sentences naming the skills or training they will need before delivering it, because the SheFreelances course does not cover it. Otherwise an empty string.

terms: up to 4 marketing terms used anywhere above that a beginner may not know, each with a plain meaning under 12 words. Empty list if none.`;

// ---------------------------------------------------------------------------
// Build My Offer: one call writes the whole offer record
// ---------------------------------------------------------------------------

export function buildOfferPrompt(offer, profile) {
  const isOther = offer.primary_service === "other";
  const pkg = STANDARD_PACKAGES[offer.primary_service];
  const about = (offer.about_me || "").trim();
  const packageInstruction = isOther
    ? `PACKAGE: Also create a small, beginner-level monthly package for this service in "package": a package_name, 3 or 4 categories with 1 to 3 items each (be specific, include quantities where it helps), and 4 to 5 things not included (always include "Guaranteed results"). Do not make it bigger than one beginner can deliver alone.`
    : `PACKAGE (already decided, do not change it): ${pkg.package_name}. ${packageText(pkg)}. Write everything so it matches this package exactly. Do not add services.`;

  return {
    prompt: `You are the offer strategist inside SheFreelances AI. You help a beginner freelancer turn simple choices into a clear, professional, beginner-level offer.

THE FREELANCER
- Name: ${getFreelancerName(profile) || "the freelancer"}
- Experience: ${EXPERIENCE_LEVELS[offer.experience_level]?.label || "Brand new"}. ${experienceLine(offer.experience_level)}
- ${serviceContext(offer)}
- Who they want to help: ${nicheInSentence(offer)}${offer.niche_is_broad ? " (a broad group by choice. Keep the offer broad: use 2 or 3 concrete example business types to make it feel real, but do not narrow it to one niche)" : ""}
- About them, in their own words (may be empty): "${about}"

${packageInstruction}

${OUTPUT_GUIDE}

${AI_VOICE_RULES}`,
    response_json_schema: recordSchema({ includePackage: isOther, includeRefineFields: false }),
  };
}

// ---------------------------------------------------------------------------
// Refine it: one call returns the full updated record
// ---------------------------------------------------------------------------

export function buildRefinePrompt(offer, profile, request) {
  const current = {
    positioning: offer.record.positioning,
    selling: offer.record.selling,
    offer: offer.record.offer,
    talk: offer.record.talk,
    paper: offer.record.paper,
    skills_note: offer.record.skills_note,
    terms: offer.record.terms,
    package: offer.package,
    price: offer.price,
  };
  return {
    prompt: `You are the offer strategist inside SheFreelances AI. A beginner freelancer has an offer and wants a change.

THE FREELANCER
- Experience: ${EXPERIENCE_LEVELS[offer.experience_level]?.label || "Brand new"}. ${experienceLine(offer.experience_level)}
- ${serviceContext(offer)}
- Who they help: ${nicheInSentence(offer)}

CURRENT OFFER (JSON):
${JSON.stringify(current)}

THEIR REQUEST: "${request}"

RULES
- Return the COMPLETE offer in the same structure, with the change applied everywhere it matters.
- Change only what the request needs. Keep everything else exactly as it is.
- package: return the package. Only change it if the request is about what's included. Keep it beginner-level. If you remove or add items, update the method, talk, and paper text to match.
- price: return the current price (${formatMoney(offer.price)} = ${offer.price}) unless the request clearly asks for a different price. Never change the price on your own.
- change_summary: one or two sentences telling them what you changed.
- If the request asks for something dishonest (fake results, testimonials, guarantees), keep the offer honest and say so in change_summary.

${OUTPUT_GUIDE}

${AI_VOICE_RULES}`,
    response_json_schema: recordSchema({ includePackage: true, includeRefineFields: true }),
  };
}

// ---------------------------------------------------------------------------
// Cleaning and checking AI output
// ---------------------------------------------------------------------------

// Words the voice rules ban. If the AI uses one anyway, swap in a plain word.
export const BANNED_WORDS = [
  [/\belevat(e|es|ed|ing)\b/gi, "grow"],
  [/\bleverag(e|es|ed|ing)\b/gi, "use"],
  [/\bunlock(s|ed|ing)?\b/gi, "get"],
  [/\btransform(s|ed|ing)?\b/gi, "change"],
  [/\bempower(s|ed|ing)?\b/gi, "help"],
  [/\bsynergy\b/gi, "teamwork"],
  [/\bgame[- ]changer\b/gi, "big help"],
  [/\baligned\b/gi, "matched"],
];

function matchCase(original, replacement) {
  return original[0] === original[0].toUpperCase() ? replacement[0].toUpperCase() + replacement.slice(1) : replacement;
}

export function cleanText(s) {
  let text = String(s || "")
    .replace(/\s*[\u2014\u2013]\s*/g, ", ")
    .replace(/\s+,/g, ",");
  for (const [pattern, replacement] of BANNED_WORDS) {
    text = text.replace(pattern, (m) => matchCase(m, replacement));
  }
  return text.trim();
}

function cleanDeep(value) {
  if (typeof value === "string") return cleanText(value);
  if (Array.isArray(value)) return value.map(cleanDeep);
  if (value && typeof value === "object")
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, cleanDeep(v)]));
  return value;
}

function normalizePackage(pkg) {
  if (!pkg || !Array.isArray(pkg.categories)) return null;
  const categories = pkg.categories
    .filter((c) => c && c.name && Array.isArray(c.items) && c.items.length)
    .slice(0, 4)
    .map((c) => ({ name: c.name, items: c.items.slice(0, 4) }));
  if (!categories.length) return null;
  const notIncluded = Array.isArray(pkg.not_included) ? pkg.not_included.slice(0, 6) : [];
  if (!notIncluded.some((t) => /guarantee/i.test(t))) notIncluded.push("Guaranteed results");
  return { package_name: pkg.package_name || "Monthly Package", billing: "monthly", categories, not_included: notIncluded };
}

// Takes the AI result from Build My Offer and returns the fields to save on the Offer.
export function finalizeBuildResult(result, offer) {
  const r = cleanDeep(result);
  const names = (r.offer?.name_options || []).map((o) => o.name);
  const selected = names.includes(r.offer?.recommended_name) ? r.offer.recommended_name : names[0] || "My Offer";
  const pkg =
    offer.primary_service === "other"
      ? normalizePackage(r.package) || { package_name: "Monthly Package", billing: "monthly", categories: [], not_included: ["Guaranteed results"] }
      : JSON.parse(JSON.stringify(STANDARD_PACKAGES[offer.primary_service]));
  const { package: _ignored, ...record } = r;
  return { record, package: pkg, selected_name: selected };
}

// Takes the AI result from Refine it and returns the fields to save on the Offer.
export function finalizeRefineResult(result, offer, request) {
  const r = cleanDeep(result);
  const { package: newPackage, price, change_summary, ...record } = r;
  const asksForPrice = /\$|\d{3,}|price|charge|cost|rate/i.test(request || "");
  const nextPrice = asksForPrice && Number(price) > 0 ? Math.round(Number(price)) : offer.price;
  const names = (record.offer?.name_options || []).map((o) => o.name);
  const selected = names.includes(offer.selected_name)
    ? offer.selected_name
    : names.includes(record.offer?.recommended_name)
    ? record.offer.recommended_name
    : names[0] || offer.selected_name;
  return {
    record,
    package: normalizePackage(newPackage) || offer.package,
    price: nextPrice,
    selected_name: selected,
    change_summary: change_summary || "Updated.",
  };
}
