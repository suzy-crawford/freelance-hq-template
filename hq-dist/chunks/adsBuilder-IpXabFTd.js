var e=`// SheFreelances OS - Meta Ads Builder (adsBuilder.js)
// One wizard: Plan > Ads > Funnel > Launch. Every screen answers one question.
// The AI ad writing, angle/headline/creative libraries and Meta setup logic stay in adsPrompts,
// adsData, adsNiches and adsCreative; this file holds the wizard's own pieces.

import { getAds, displayName } from "./adsCards";
import { formatMoney, isHealthBusiness } from "./adsData";
import { getNiche } from "./adsNiches";
import { getCategory } from "./adsAngleLibrary";

export const STAGES = [
  { id: "plan", label: "Plan", question: "Tell us about the client." },
  { id: "ads", label: "Ads", question: "Here's what I'd advertise and how I'd say it." },
  { id: "funnel", label: "Funnel", question: "Here's what should happen after they click." },
  { id: "launch", label: "Launch", question: "Here's exactly how to put it into Meta." },
];

// What someone does after seeing the ad (ids match adsData GOALS).
export const PLAN_GOALS = [
  { id: "leads", label: "Fill out a form" },
  { id: "appointments", label: "Book an appointment" },
  { id: "purchases", label: "Buy something" },
  { id: "help", label: "Help me choose" },
];

export const DAILY_PRESETS = [10, 20, 30, 50];
export const RADIUS_PRESETS = [5, 10, 15, 25];

// The app's budget logic is monthly; the builder asks per day.
export function dailyToMonthly(daily) {
  return Math.round(Number(daily || 0) * 30.4);
}
export function campaignDaily(c) {
  if (c.daily_budget) return Number(c.daily_budget);
  if (c.monthly_budget) return Math.max(1, Math.round(Number(c.monthly_budget) / 30.4));
  return null;
}

export function goalLabel(id) {
  return PLAN_GOALS.find((g) => g.id === id)?.label || "";
}

export function areaText(c) {
  if (!c.location) return "";
  return c.radius_miles ? \`\${c.location} + \${c.radius_miles} miles\` : c.location;
}

// Business type, guessed when she hasn't picked one (the libraries need it).
export function guessBusinessType(c) {
  if (c.business_type) return c.business_type;
  if (isHealthBusiness(c)) return "health_beauty";
  return "local";
}

// ---------------------------------------------------------------------------
// "Fill it in for me": read their website and suggest the Plan answers
// ---------------------------------------------------------------------------

const str = { type: "string" };
export const SITE_FILL_SCHEMA = {
  type: "object",
  properties: {
    business_name: str,
    business_type: { type: "string", enum: ["local", "health_beauty", "ecommerce", "coaching", "professional", "other"] },
    location: str,
    services: { type: "array", items: str },
    offers: { type: "array", items: str },
    goal: { type: "string", enum: ["leads", "appointments", "purchases", "help"] },
    description: str,
    target_customer: str,
    differentiators: str,
    proof: str,
    credentials: str,
    brand_style: str,
  },
  required: ["business_name", "services", "offers", "goal"],
};

export function buildSiteFillPrompt(site) {
  return \`You are helping a beginner freelance marketer plan a Meta ad campaign for a local business. Read the text from the business's website below and pull out the facts she needs. Only use what is on the website. Never invent offers, prices, reviews, credentials or services.

WEBSITE
URL: \${site.url}
Title: \${site.title || ""}
Description: \${site.meta_description || ""}
Buttons and links: \${(site.cta_links || []).join(" | ")}
Text:
\${String(site.text || "").slice(0, 14000)}

RETURN
- business_name: the business name as they write it.
- business_type: local (restaurants, gyms, home services, shops), health_beauty (med spas, salons, dentists, clinics, wellness), ecommerce (sells products online), coaching, professional (law, accounting, agencies) or other.
- location: city and state (or city and country), from the address or contact details. Empty if not shown.
- services: up to 6 of their main services or products, each 1 to 4 words, in plain words a customer would use.
- offers: up to 3 real promotions or first-visit offers written on the site, each under 12 words. Empty if there are none.
- goal: what their website mainly asks people to do. appointments if they push booking, purchases if they sell online, leads if they ask people to get in touch or request a quote, help if unclear.
- description: one plain sentence about the business.
- target_customer: who the site is speaking to, in one short phrase (like "women 30 to 55 in Austin who want natural-looking results"). Empty if unclear.
- differentiators: what the site says makes them different, in one short line. Empty if nothing specific.
- proof: real proof written on the site (a rating, number of reviews, years in business, awards, a short real testimonial). Empty if none. Never invent it.
- credentials: licenses, certifications or qualifications named on the site. Empty if none.
- brand_style: the look and tone in a few words (like "clean, warm, luxury spa").\`;
}

export function finalizeSiteFill(r, site) {
  const clean = (a, n) => (Array.isArray(a) ? a.map((x) => String(x || "").trim()).filter(Boolean).slice(0, n) : []);
  const t = (v) => String(v || "").trim();
  return {
    business_name: t(r?.business_name),
    business_type: r?.business_type || "",
    location: t(r?.location),
    services: clean(r?.services, 6),
    offers: clean(r?.offers, 3),
    goal: r?.goal || "",
    description: t(r?.description),
    target_customer: t(r?.target_customer),
    differentiators: t(r?.differentiators),
    proof: t(r?.proof),
    credentials: t(r?.credentials),
    brand_style: t(r?.brand_style),
    colors: (site?.colors || []).join(", "),
  };
}

// ---------------------------------------------------------------------------
// Ads step
// ---------------------------------------------------------------------------

// The ads she's using. All of them, unless she switched some off.
export function usedAds(c) {
  const ads = getAds(c);
  const off = new Set(c.ads_off || []);
  return ads.filter((a) => !off.has(a.index));
}

// "Angle:" line in plain words: the niche library's concept, else the master category's.
export function angleLine(c, ad) {
  const niche = getNiche(c);
  const fromNiche = niche.angles?.find((n) => n.name.toLowerCase() === String(ad.name || "").toLowerCase());
  if (fromNiche?.concept) return fromNiche.concept;
  const cat = getCategory(ad.category);
  return cat ? cat.psychology : "";
}

// [Google rating] shows as "Add Google rating".
export function blankPrompt(blank) {
  const inner = String(blank).slice(1, -1).trim();
  // Keep proper names ("Google rating"); lower-case only a plain first word ("Number of reviews").
  const first = inner.split(/\\s+/)[0] || "";
  const keep = /^[A-Z][a-z]+$/.test(first) && !/^(Number|Price|Name|Phone|Address|Rating|Their|The|Your|Offer|Date|Time|Amount)$/.test(first);
  return \`Add \${keep ? inner : inner.charAt(0).toLowerCase() + inner.slice(1)}\`;
}

export function adsCopyText(c) {
  return usedAds(c)
    .map((ad, i) =>
      [\`AD \${i + 1}: \${displayName(c.business_name)} - \${ad.name} - \${ad.format || "Image"}\`, "", "Primary text:", ad.primary, "", \`Headline: \${ad.headline}\`, \`Description: \${ad.description}\`, \`Button: \${ad.cta}\`].join("\\n")
    )
    .join("\\n\\n---\\n\\n");
}

// ---------------------------------------------------------------------------
// Launch step
// ---------------------------------------------------------------------------

export const ACCESS_STEPS = [
  "Ask your client to open business.facebook.com and go to Settings.",
  "Under Users, then Partners, they click Add and enter your Business ID (yours is in your own Business settings, under Business info).",
  "They give you access to their ad account and Facebook Page, with full control of the ad account.",
  "Check the ad account has a payment method. The client pays Meta directly.",
];

export function launchChecklist(c) {
  const isForm = c.setup?.destination === "instant_form";
  return [
    "Open every ad preview on your phone. Does each image match its text?",
    "Send the previews to your client and get their yes.",
    "In Ads Manager, open the campaign and press Publish.",
    isForm ? "Send a test lead with Meta's lead testing tool and make sure it reaches your client." : "Click your own ad on your phone and make sure the page loads.",
    "Tell your client to reply to every new lead within 5 minutes.",
    "Check back in 3 days. Don't change anything before then.",
  ];
}

export function summaryRows(c) {
  const daily = campaignDaily(c);
  return [
    displayName(c.business_name),
    c.offer_text || c.product || "",
    goalLabel(c.goal),
    daily ? \`\${formatMoney(daily)}/day\` : "",
    areaText(c),
  ].filter(Boolean);
}
`;export{e as default};