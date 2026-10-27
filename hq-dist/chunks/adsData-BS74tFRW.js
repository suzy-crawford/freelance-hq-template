var e=`// SheFreelances OS - Ads Manager: reference data and deterministic campaign logic (adsData.js)
// The member answers simple questions. Code decides the Meta setup and the budget math, so the
// result is the same every time. The AI writes the strategy, explanations and ads around it.
// Source: Suzy's Ad Strategy Builder v2 knowledge base, simplified for beginners and Meta only.

export const ADS_LIBRARY_VERSION = "1.0.0";

// ---------------------------------------------------------------------------
// Screen 1: the business
// ---------------------------------------------------------------------------

export const BUSINESS_TYPES = [
  { id: "local", label: "Local business", description: "Restaurants, gyms, home services, shops" },
  { id: "health_beauty", label: "Health and beauty", description: "Med spas, salons, dentists, clinics, wellness" },
  { id: "ecommerce", label: "Online store", description: "Sells products online" },
  { id: "coaching", label: "Coaching or courses", description: "Coaches, consultants, online programs" },
  { id: "professional", label: "Professional service", description: "Law, accounting, agencies, B2B" },
  { id: "other", label: "Other", description: "Something else" },
];

export const PRACTICE_BUSINESS = {
  business_name: "Glow Aesthetics (practice)",
  business_type: "health_beauty",
  website: "",
  business_description:
    "A small, independent med spa offering Botox, fillers, facials and laser hair removal. Two providers, open 6 days a week.",
  location: "Austin, TX",
};

// ---------------------------------------------------------------------------
// Screen 2: what we're advertising
// ---------------------------------------------------------------------------

export const GOALS = [
  { id: "leads", label: "Submit their information", description: "They fill out a short form so the business can follow up." },
  { id: "appointments", label: "Book an appointment", description: "They request or book a visit, call or consultation." },
  { id: "purchases", label: "Buy something", description: "They buy a product online." },
  { id: "traffic", label: "Visit the website", description: "They go to a page to learn more." },
  { id: "help", label: "Help me choose", description: "We'll pick the best goal for this business." },
];

// "Help me choose": the usual best goal for each business type.
const DEFAULT_GOAL = {
  local: "leads",
  health_beauty: "appointments",
  ecommerce: "purchases",
  coaching: "leads",
  professional: "leads",
  other: "leads",
};

export function resolveGoal(goal, businessType) {
  if (goal && goal !== "help") return goal;
  return DEFAULT_GOAL[businessType] || "leads";
}

// ---------------------------------------------------------------------------
// Screen 3: details
// ---------------------------------------------------------------------------

export const BUDGET_PRESETS = [300, 600, 1000, 1500, 3000];

export const ASSET_OPTIONS = [
  { id: "photos", label: "Photos" },
  { id: "videos", label: "Videos" },
  { id: "both", label: "Both" },
  { id: "none", label: "None yet" },
  { id: "unsure", label: "Not sure" },
];

// ---------------------------------------------------------------------------
// Meta setup (deterministic)
// Objective and conversion location names match Meta Ads Manager.
// ---------------------------------------------------------------------------

const SETUPS = {
  leads: {
    objective: "Leads",
    conversion_location: "Instant forms",
    performance_goal: "Maximize number of leads",
    destination: "instant_form",
    destination_label: "Meta Instant Form",
    cta_options: ["Sign up", "Learn more", "Get quote"],
  },
  appointments: {
    objective: "Leads",
    conversion_location: "Instant forms",
    performance_goal: "Maximize number of leads",
    destination: "instant_form",
    destination_label: "Meta Instant Form (then follow up to book)",
    cta_options: ["Book now", "Sign up", "Learn more"],
  },
  purchases: {
    objective: "Sales",
    conversion_location: "Website",
    performance_goal: "Maximize number of conversions (Purchase)",
    destination: "product_page",
    destination_label: "The product page on their website",
    cta_options: ["Shop now", "Learn more"],
  },
  traffic: {
    objective: "Traffic",
    conversion_location: "Website",
    performance_goal: "Maximize number of landing page views",
    destination: "landing_page",
    destination_label: "A page on their website",
    cta_options: ["Learn more"],
  },
};

const HEALTH_WORDS =
  /(med ?spa|aesthetic|botox|filler|injectable|laser|dental|dentist|orthodont|clinic|chiropract|therap|wellness|weight ?loss|glp|semaglutide|tirzepatide|iv ?drip|hormone|derma|skin ?care|physical therapy|medical)/i;

export function isHealthBusiness(campaign) {
  if (campaign.business_type === "health_beauty") return true;
  return HEALTH_WORDS.test(\`\${campaign.business_description || ""} \${campaign.product || ""} \${campaign.business_name || ""}\`);
}

const roundTo = (n, step) => Math.round(n / step) * step;

// Budget plan from the knowledge base's tiers, in plain words.
export function getBudgetPlan(monthly, budgetUnsure) {
  const assumed = !monthly || budgetUnsure;
  const month = assumed ? 600 : Number(monthly);
  const daily = Math.max(1, Math.round(month / 30.4));
  let tier;
  let adSets;
  let note;
  if (month < 750) {
    tier = "small";
    adSets = 1;
    note = "This is a small test budget. Keep everything in one ad set so Meta learns faster, and expect results to build slowly.";
  } else if (month < 1500) {
    tier = "tight";
    adSets = 1;
    note = "Keep it simple: one campaign and one ad set, with a few ads competing inside it.";
  } else if (month < 5000) {
    tier = "standard";
    adSets = 2;
    note = "There's room to test two different audiences or angles in separate ad sets.";
  } else {
    tier = "strong";
    adSets = 3;
    note = "There's room for a second campaign that shows ads again to people who already engaged (retargeting).";
  }
  const maxAds = daily < 25 ? 2 : daily < 50 ? 3 : daily < 100 ? 4 : 5;
  return {
    assumed,
    monthly: month,
    daily,
    tier,
    campaigns: tier === "strong" ? 2 : 1,
    ad_sets: adSets,
    ads_per_ad_set: maxAds,
    note,
    assumed_note: assumed ? "No budget was set yet, so this plan uses a starter test budget of about $600 a month ($20 a day). Change it any time." : "",
    small_warning: daily < 10 ? "Under $10 a day, Meta has very little data to learn from. Results will be slow and noisy." : "",
  };
}

export function getCampaignSetup(campaign) {
  const goal = resolveGoal(campaign.goal, campaign.business_type);
  const base = SETUPS[goal];
  const health = isHealthBusiness(campaign);
  const budget = getBudgetPlan(campaign.monthly_budget, campaign.budget_unsure);
  const local = ["local", "health_beauty", "professional"].includes(campaign.business_type);
  const notes = [];
  if (goal === "purchases") {
    notes.push("Sales campaigns need the Meta pixel installed on the website and tracking purchases. Check this before launching.");
  }
  if (goal === "traffic") {
    notes.push("Traffic campaigns bring visitors, not leads. If the business wants leads, a Leads campaign is usually the better choice.");
  }
  if (health) {
    notes.push(
      "Meta restricts how some health and wellness businesses can track and optimize for website actions. Instant forms keep everything inside Meta and avoid most of these limits."
    );
  }
  return {
    goal,
    goal_label: GOALS.find((g) => g.id === goal)?.label || "",
    goal_was_chosen_for_you: campaign.goal === "help",
    ...base,
    budget,
    location_radius: local
      ? "Target the area around the business: about 10 to 15 miles in a big city, 20 to 25 miles in a smaller town."
      : "Target the countries or regions where the business sells.",
    audience_approach:
      "Start broad and let Meta find the right people. Set the location, keep age and gender wide unless the offer is clearly for one group, and skip detailed interests at first.",
    is_health: health,
    notes,
  };
}

// ---------------------------------------------------------------------------
// Compliance (from the knowledge base, kept cautious)
// ---------------------------------------------------------------------------

export const GENERAL_AD_RULES = [
  "No fake reviews, results, testimonials, credentials or scarcity.",
  "No guarantees (\\"guaranteed results\\", \\"lose 20 pounds\\").",
  "Don't call out personal traits in the ad (\\"Are you overweight?\\", \\"Struggling with acne?\\"). Meta rejects these.",
  "The ad and the page or form after the click must say the same thing.",
];

export const HEALTH_AD_RULES = [
  "Before and after photos: never for weight loss. For cosmetic treatments, only the business's own real results with the client's written permission, and check Meta's current health and wellness ad policy first.",
  "No promises about how someone will look (\\"Look 10 years younger\\", \\"Fix your wrinkles\\").",
  "No drug brand names, body or scale imagery for weight loss offers.",
  "Lead with the offer and the experience, with confident, warm language.",
  "Use real photos of the providers and the space where possible.",
  "Exclude existing clients if the business has a customer list.",
];

export function getComplianceRules(campaign) {
  return isHealthBusiness(campaign) ? [...GENERAL_AD_RULES, ...HEALTH_AD_RULES] : GENERAL_AD_RULES;
}

// ---------------------------------------------------------------------------
// The SheFreelances rulebook for checking live ads (approved by Suzy, Oct 2026).
// Used on the Launch tab and inside the "Check my ads" Claude prompt.
// ---------------------------------------------------------------------------

export const RULEBOOK = [
  { label: "Watch", rule: "Don't judge an ad until it has run 3 days and spent about 2 times the target cost per lead. If it's between the target and 2 times the target, give it 2 to 3 more days." },
  { label: "Kill", rule: "Turn off an ad that has spent 2 times the target with no leads, or costs more than 2 times the target after spending 3 times the target." },
  { label: "Scale", rule: "At or under the target: leave it alone. After 5 or more days under the target, raise the budget 20%, then wait 3 days before raising it again. If the cost jumps after a raise, go back to the last budget." },
  { label: "Refresh", rule: "When people have seen it more than 3 times on average, or clicks have dropped by about a third, add 2 or 3 new ads. Leave the old ones running." },
  { label: "Never", rule: "Judge an ad in its first 24 hours, double the budget, or edit an ad that's working (make a new one instead)." },
  { label: "No target yet", rule: "If the client has no target cost per lead, the first 2 weeks set the baseline." },
];

// Where the problem is, in order. The last two are the client's job, not the ads.
export const DIAGNOSIS = [
  { sign: "Expensive to show and few clicks", meaning: "The creative isn't stopping the scroll. Add new ads with different angles and visuals." },
  { sign: "Clicks but no leads", meaning: "The form, page or offer is the problem. Check it on a phone, shorten the form, make the offer clearer." },
  { sign: "Leads but few bookings", meaning: "Follow-up. Leads need a call or text within 5 minutes. This is the client's side: show them the numbers." },
  { sign: "Bookings but few sales", meaning: "Sales. The ads are doing their job. Show the client the booked numbers and talk about the consultation." },
];

export function formatMoney(n) {
  return "$" + Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export { roundTo };
`;export{e as default};