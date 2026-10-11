// SheFreelances OS - Offer Builder: reference data (offerData.js)
// All reference content lives in code (not the database) so every member's build behaves the same.

export const LIBRARY_VERSION = "2.4.0";

// ---------------------------------------------------------------------------
// Experience levels (saved on the profile)
// ---------------------------------------------------------------------------

export const EXPERIENCE_LEVELS = {
  brand_new: { label: "Brand new", description: "I'm still learning the skill." },
  no_clients: { label: "No paying clients yet", description: "I've practiced, but nobody has paid me yet." },
  has_clients: { label: "I have paying clients", description: "At least one business has paid me for marketing work." },
};

// ---------------------------------------------------------------------------
// Screen 1: services
// ---------------------------------------------------------------------------

export const SERVICES = {
  meta_ads: {
    label: "Paid Ads",
    offerLabel: "Meta Ads Management",
    description: "Help businesses get leads and customers with Facebook and Instagram ads.",
    inCurriculum: true,
  },
  organic_social: {
    label: "Social Media & Content",
    offerLabel: "Social Media Management",
    description: "Help businesses plan, create, and post content on their social media.",
    inCurriculum: true,
  },
  combined: {
    label: "Paid Ads + Social Media",
    offerLabel: "Meta Ads and Social Media Management",
    description: "Ads and social media together, for one monthly fee.",
    inCurriculum: true,
  },
  other: {
    label: "Other",
    offerLabel: null, // uses the member's own service name
    description: "Something else, like email marketing, copywriting, or video editing.",
    inCurriculum: false,
  },
};

// "Help me decide" quiz. Plain scoring, no AI.
export const SERVICE_QUIZ = [
  {
    id: "q1",
    question: "Which sounds more fun to you?",
    options: [
      { label: "Testing what works and watching the numbers improve", score: { meta_ads: 2 } },
      { label: "Coming up with ideas and creating posts", score: { organic_social: 2 } },
    ],
  },
  {
    id: "q2",
    question: "How do you feel about numbers and simple spreadsheets?",
    options: [
      { label: "I'm comfortable with them", score: { meta_ads: 2 } },
      { label: "I'm okay with them", score: { meta_ads: 1, organic_social: 1 } },
      { label: "I'd rather avoid them", score: { organic_social: 2 } },
    ],
  },
  {
    id: "q3",
    question: "Do you enjoy writing captions or making content?",
    options: [
      { label: "I love it", score: { organic_social: 2 } },
      { label: "It's fine", score: { meta_ads: 1, organic_social: 1 } },
      { label: "Not really", score: { meta_ads: 2 } },
    ],
  },
  {
    id: "q4",
    question: "What would you rather help a business with?",
    options: [
      { label: "Getting new leads and customers", score: { meta_ads: 2 } },
      { label: "Staying consistent and visible online", score: { organic_social: 2 } },
    ],
  },
];

export function scoreServiceQuiz(answers) {
  // answers: { q1: optionIndex, q2: optionIndex, ... }
  const totals = { meta_ads: 0, organic_social: 0 };
  for (const q of SERVICE_QUIZ) {
    const option = q.options[answers[q.id]];
    if (!option) continue;
    for (const [service, points] of Object.entries(option.score)) totals[service] += points;
  }
  const diff = totals.meta_ads - totals.organic_social;
  if (Math.abs(diff) <= 1) {
    return {
      recommendation: null,
      totals,
      message: "You'd do well with either one. Pick the one you're more excited to learn. You can add the other later.",
    };
  }
  const recommendation = diff > 0 ? "meta_ads" : "organic_social";
  const message =
    recommendation === "meta_ads"
      ? "Paid Ads looks like a good fit. You like seeing what works, and businesses pay well for more leads."
      : "Social Media & Content looks like a good fit. You enjoy creating, and businesses need help staying consistent.";
  return { recommendation, totals, message };
}

// ---------------------------------------------------------------------------
// Standard beginner packages (from the SheFreelances curriculum)
// Grouped into categories. The offer, the offer doc, and the Scope of Work all use these.
// ---------------------------------------------------------------------------

export const STANDARD_PACKAGES = {
  meta_ads: {
    package_name: "Monthly Meta Ads Management",
    billing: "monthly",
    categories: [
      { name: "Setup", items: ["Campaign setup in Meta Ads Manager", "Pixel and tracking check", "Audience setup"] },
      { name: "Your ads", items: ["4 ad copy variations per month", "3 ad creative ideas per month"] },
      { name: "Management", items: ["Results checked and adjusted every week", "Budget monitoring"] },
      { name: "Reporting", items: ["Monthly results report", "Monthly check-in call"] },
    ],
    not_included: [
      "Ad spend (the client pays Meta directly for the ads)",
      "Filming or editing video",
      "Building websites or landing pages",
      "Organic social media posting",
      "Guaranteed results",
    ],
  },
  organic_social: {
    package_name: "Monthly Social Media Management",
    billing: "monthly",
    categories: [
      { name: "Strategy", items: ["Monthly content plan", "Content calendar"] },
      { name: "Content", items: ["12 posts per month (4 Reels, 8 image or carousel posts)", "Captions for every post"] },
      { name: "Posting", items: ["Scheduling and posting on Instagram and Facebook"] },
      { name: "Reporting", items: ["Monthly results report"] },
    ],
    not_included: [
      "Filming or photography",
      "Replying to DMs",
      "Paid ads",
      "More than 2 platforms",
      "Guaranteed follower or sales growth",
    ],
  },
};

STANDARD_PACKAGES.combined = {
  package_name: "Monthly Ads and Social Media Management",
  billing: "monthly",
  categories: [
    { name: "Setup and strategy", items: ["Ads campaign setup and tracking check", "Monthly content plan and calendar"] },
    { name: "Your ads", items: ["4 ad copy variations and 3 ad creative ideas per month", "Results checked and adjusted every week"] },
    { name: "Your content", items: ["12 posts per month (4 Reels, 8 image or carousel posts) with captions", "Scheduling and posting on Instagram and Facebook"] },
    { name: "Reporting", items: ["One monthly report covering ads and social", "Monthly check-in call"] },
  ],
  not_included: [
    "Ad spend (the client pays Meta directly for the ads)",
    "Filming or photography",
    "Building websites or landing pages",
    "Replying to DMs",
    "Guaranteed results",
  ],
};

// Which offer to build from the services picked on Screen 1.
// Ads + Social together = combined. "Other" is only the offer service when it's picked on its own.
export function getOfferService(selected) {
  const set = new Set(selected || []);
  const ads = set.has("meta_ads");
  const social = set.has("organic_social");
  if (ads && social) return "combined";
  if (ads) return "meta_ads";
  if (social) return "organic_social";
  if (set.has("other")) return "other";
  return null;
}

export const CLIENT_RESPONSIBILITIES = {
  meta_ads: [
    "Pays ad spend directly to Meta.",
    "Gives access to their Meta Business account, ad account, Facebook Page, and Instagram.",
    "Provides photos, videos, and brand details for the ads.",
    "Approves ads before they go live.",
    "Follows up with new leads quickly.",
  ],
  organic_social: [
    "Provides photos, videos, and brand details.",
    "Gives access to their social accounts or scheduling tool.",
    "Reviews and approves content within 2 business days.",
    "Shares news, offers, and events worth posting about.",
  ],
  combined: [
    "Pays ad spend directly to Meta.",
    "Gives access to their Meta Business account, ad account, Facebook Page, and Instagram.",
    "Provides photos, videos, and brand details.",
    "Approves ads and content before they go live.",
    "Follows up with new leads quickly.",
  ],
  other: [
    "Provides the information, files, and access needed to do the work.",
    "Reviews and approves work within 2 business days.",
  ],
};

// ---------------------------------------------------------------------------
// Screen 2: who they help (broad groups first, specific niches optional)
// ---------------------------------------------------------------------------

export const NICHES = [
  { id: "med_spas", label: "Med spas", affordability: "high", why: "They sell high-value treatments and need a steady flow of new clients." },
  { id: "dentists", label: "Dentists", affordability: "high", why: "Every new patient is worth a lot, and most dentists already spend on marketing." },
  { id: "chiropractors", label: "Chiropractors", affordability: "high", why: "They rely on new patients every month and are easy to find online." },
  { id: "home_service", label: "Home service businesses", affordability: "high", why: "Roofers, plumbers, and cleaners have big jobs and always need more calls." },
  { id: "law_firms", label: "Law firms", affordability: "high", why: "One new client can be worth thousands, so marketing pays for itself fast." },
  { id: "real_estate", label: "Real estate agents", affordability: "medium", why: "Agents live on leads and visibility, and most are active on social." },
  { id: "coaches", label: "Coaches", affordability: "medium", why: "They sell online, understand marketing, and need consistent content and leads." },
  { id: "consultants", label: "Consultants", affordability: "medium", why: "Their offers are high value and they rarely have time for their own marketing." },
  { id: "ecommerce", label: "Ecommerce brands", affordability: "medium", why: "They sell online every day and depend on ads and content to grow." },
  { id: "salons", label: "Salons", affordability: "low", why: "They're visual, local, and rely on repeat clients and bookings." },
  { id: "fitness", label: "Fitness studios", affordability: "low", why: "They need a steady stream of new members and great content to show off." },
  { id: "restaurants", label: "Local restaurants", affordability: "low", why: "They're visual and local, and most are already on Instagram." },
];

// Broad starting points. Most beginners should pick one of these. Starting broad is fine.
export const NICHE_GROUPS = [
  { id: "small_business", label: "Small businesses", examples: "Any type of small business", affordability: "medium" },
  { id: "local", label: "Local businesses", examples: "Salons, dentists, gyms, restaurants", affordability: "medium" },
  { id: "health_beauty", label: "Health and beauty businesses", examples: "Med spas, salons, wellness studios", affordability: "medium" },
  { id: "home_services", label: "Home service businesses", examples: "Roofers, cleaners, plumbers", affordability: "high" },
  { id: "coaches_consultants", label: "Coaches and consultants", examples: "Business, life, and fitness coaches", affordability: "medium" },
  { id: "online", label: "Online businesses", examples: "Ecommerce brands, course creators", affordability: "medium" },
  { id: "professional", label: "Professional services (B2B)", examples: "Law firms, agencies, accountants", affordability: "high" },
];

export const NICHE_SCREEN_COPY = {
  title: "Who would you like to help?",
  subtitle: "You don't need a perfect niche to start. Starting broad is completely fine. You can narrow it down later.",
  specificLabel: "Something more specific",
  specificDescription: "Pick a type of business or type your own.",
};

export function getNicheAffordability(nicheLabel) {
  const label = String(nicheLabel || "").toLowerCase();
  const match = [...NICHES, ...NICHE_GROUPS].find((n) => n.label.toLowerCase() === label);
  return match ? match.affordability : "medium";
}

// ---------------------------------------------------------------------------
// Pricing (illustrative starting recommendation, code only)
// Management fee only. Ad spend is always separate.
// ---------------------------------------------------------------------------

export const PRICE_RANGES = {
  organic_social: { brand_new: [500, 900], no_clients: [800, 1300], has_clients: [1200, 2500] },
  meta_ads: { brand_new: [750, 1200], no_clients: [1000, 1500], has_clients: [1500, 3500] },
  other: { brand_new: [400, 900], no_clients: [700, 1300], has_clients: [1000, 2500] },
};

const RECOMMENDED_POSITION = { brand_new: 1 / 3, no_clients: 0.4, has_clients: 0.5 };
const roundTo50 = (n) => Math.round(n / 50) * 50;

export function formatMoney(n) {
  return "$" + Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

// Ads + Social together: the Ads range plus $1,000.
export const COMBINED_ADD_ON = 1000;

export function getPriceRecommendation(service, experienceLevel, niche, nicheIsCustom) {
  const exp = PRICE_RANGES.meta_ads[experienceLevel] ? experienceLevel : "brand_new";
  const isCombined = service === "combined";
  const svc = isCombined ? "meta_ads" : PRICE_RANGES[service] ? service : "other";
  let [low, high] = PRICE_RANGES[svc][exp];
  if (isCombined) {
    low += COMBINED_ADD_ON;
    high += COMBINED_ADD_ON;
  }
  const ceiling = high;
  const reasons = [];

  if (exp === "brand_new") reasons.push("You're just starting, so this leaves room to raise your price once you have results.");
  else if (exp === "no_clients") reasons.push("You've practiced but don't have paying clients yet, so this is a solid starting range.");
  else reasons.push("You've had paying clients, so you can charge more confidently.");

  const affordability = nicheIsCustom ? "medium" : getNicheAffordability(niche);
  if (affordability === "high") {
    low *= 1.1;
    high *= 1.1;
    reasons.push(`${niche} usually have bigger marketing budgets.`);
  } else if (affordability === "low") {
    low *= 0.9;
    high *= 0.9;
    reasons.push(`${niche} often have tighter marketing budgets.`);
  }
  if (isCombined) reasons.push("You're doing ads and social media together, so the price includes both.");
  if (svc === "meta_ads") reasons.push("This is your management fee. The client pays for the ads themselves separately.");
  if (svc === "other") reasons.push("This service isn't covered in the course, so treat this as a rough starting point.");

  low = roundTo50(Math.min(low, ceiling * 0.8));
  high = roundTo50(Math.min(high, ceiling));
  return {
    low,
    high,
    recommended: roundTo50(low + (high - low) * RECOMMENDED_POSITION[exp]),
    reasons,
    note: "This is an illustrative starting price, not an industry average. You can change it any time.",
  };
}

// ---------------------------------------------------------------------------
// Offer on paper: visual styles (rendered in code)
// ---------------------------------------------------------------------------

export const DOC_STYLES = [
  { id: "classic", name: "Classic", bg: "#FFFFFF", text: "#111111", muted: "#6B6B6B", accent: "#111111", rule: "#E5E5E5", headingFont: "Inter", bodyFont: "Inter" },
  { id: "editorial", name: "Editorial", bg: "#FAF6F0", text: "#1A1208", muted: "#8A7660", accent: "#B07D5A", rule: "#E8DDD0", headingFont: "Playfair Display", bodyFont: "Inter" },
  { id: "blush", name: "Soft Blush", bg: "#FFF6F7", text: "#2A1A1E", muted: "#9A7A82", accent: "#D9577D", rule: "#F3D3DC", headingFont: "Playfair Display", bodyFont: "Inter" },
  { id: "noir", name: "Noir", bg: "#0F0F0F", text: "#FFFFFF", muted: "#A3A3A3", accent: "#E8D5A8", rule: "#2A2A2A", headingFont: "Playfair Display", bodyFont: "Inter" },
];

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

export function getServiceName(offer) {
  if (offer.primary_service === "other") return offer.custom_service_name || "Freelance service";
  return SERVICES[offer.primary_service]?.offerLabel || "Freelance service";
}

export function getFreelancerName(profile) {
  return (profile.business_name || "").trim() || profile.first_name || "";
}

// Library niches read naturally mid-sentence in lowercase ("for med spas"). Custom niches stay as typed.
export function nicheInSentence(offer) {
  const n = String(offer.niche || "");
  return offer.niche_is_custom ? n : n.charAt(0).toLowerCase() + n.slice(1);
}

export function includesAds(service) {
  return service === "meta_ads" || service === "combined";
}

export function priceLine(price) {
  return `${formatMoney(price)} per month`;
}
