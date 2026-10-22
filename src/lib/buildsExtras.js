// SheFreelances OS - AI Build Lab extras (buildsExtras.js)
// 1. Industry presets: the questions that fit each kind of business, for the lead magnets and the quote tool.
//    They're question topics only, never facts about the business.
// 2. "Make it better": follow-up prompts the member pastes into the same Base44 app after it's built.

const nf = (v) => String(v || "").trim();

export const INDUSTRIES = [
  {
    id: "med_spa",
    noun: "med spa",
    label: "Med spa or aesthetics",
    match: /(med ?spa|medical spa|aesthetic|botox|injector|filler|laser hair|hydrafacial|skin ?care|derma)/i,
    price: "which treatment they want, which areas or how big an area, first time or returning, add-ons, one visit or a series, and when they'd like to come in",
    quiz: "what they'd like to change (lines, lips, dull or uneven skin, texture, unwanted hair), how natural they want it to look, how much downtime is OK, what they've had before, and timing",
    score: { headline: "What's your skin score?", categories: "daily routine, sun protection, skin concerns, treatment history" },
  },
  {
    id: "dental",
    noun: "dental practice",
    label: "Dental practice",
    match: /(dent|orthodont|invisalign|implant|teeth|veneer)/i,
    price: "which treatment (whitening, clear aligners, veneers, implants, a checkup), how many teeth, insurance or paying themselves, interest in a payment plan, and timing",
    quiz: "what they'd like to change about their smile, any sensitivity or discomfort, past orthodontic work, budget comfort, and whether there's a date they're working toward",
    score: { headline: "How healthy is your smile routine?", categories: "brushing and flossing, food and habits, checkups, smile confidence" },
  },
  {
    id: "salon",
    noun: "salon",
    label: "Hair, nails or lash salon",
    match: /(hair|salon|barber|nail|lash|brow|blowout|balayage|stylist)/i,
    price: "which service, hair length and thickness, the kind of color or style, extras, and how often they'd come in",
    quiz: "the look they're after, how much upkeep they want, their hair or nail history, budget comfort, and timing",
    score: { headline: "How healthy is your hair routine?", categories: "washing and styling, heat and color, upkeep, products" },
  },
  {
    id: "fitness",
    noun: "fitness studio",
    label: "Gym or fitness studio",
    match: /(gym|fitness|yoga|pilates|crossfit|boxing|personal train|barre|spin|bootcamp)/i,
    price: "membership, classes or personal training, sessions per week, how long they'd commit, and extras",
    quiz: "their main goal, experience level, the kind of workout they enjoy, schedule, and whether they want a group or one on one",
    score: { headline: "How strong is your fitness routine?", categories: "movement, strength, recovery and sleep, consistency" },
  },
  {
    id: "chiro",
    noun: "chiropractic clinic",
    label: "Chiropractic or physical therapy",
    match: /(chiro|spinal|posture|physio|physical therapy)/i,
    price: "the kind of visit (first assessment, follow-up, a package), how often, and insurance or paying themselves",
    quiz: "where they feel it, how long it's been going on, what makes it worse, how active they are, and what they've tried",
    score: { headline: "How's your posture, really?", categories: "desk and screen setup, daily movement, sleep, aches and stiffness" },
  },
  {
    id: "roofing",
    noun: "roofing company",
    label: "Roofing",
    match: /(roof|shingle|storm damage|gutter|siding)/i,
    price: "repair or replacement, home size or number of stories, current roof material, any storm damage, how steep the roof is, and timing",
    quiz: "what they're seeing (leaks, missing shingles, age), how long they plan to stay in the home, material preference, and budget comfort",
    score: { headline: "Is your roof ready for storm season?", categories: "age and material, visible wear, attic and gutters, past storms" },
  },
  {
    id: "cleaning",
    noun: "cleaning company",
    label: "Cleaning service",
    match: /(clean|maid|janitorial)/i,
    price: "bedrooms, bathrooms, home size, one-time or recurring, standard or deep clean, extras (inside the fridge, oven, windows), and pets",
    quiz: "how often they'd like help, what they hate cleaning most, home size, pets, and timing",
    score: { headline: "How much time is cleaning costing you?", categories: "hours each week, rooms that pile up, stress level, help you have now" },
  },
  {
    id: "lawn",
    noun: "landscaping company",
    label: "Landscaping or lawn care",
    match: /(landscap|lawn|yard|mow|tree|garden|irrigation|sprinkler)/i,
    price: "yard size, which services (mowing, cleanup, mulch, planting, design), how often, and the yard's current condition",
    quiz: "what they want the yard to look like, how much upkeep they'll do themselves, budget comfort, and timing",
    score: { headline: "How healthy is your lawn?", categories: "watering, mowing, weeds and pests, soil" },
  },
  {
    id: "hvac_plumbing",
    noun: "home service company",
    label: "HVAC, plumbing or electrical",
    match: /(hvac|heating|cooling|air condition|\bac\b|furnace|plumb|water heater|electric)/i,
    price: "the kind of system or job, its age, home size, repair or replace, what's going wrong, and how soon they need it",
    quiz: "what's happening, how old the system is, comfort problems, energy bills, and timing",
    score: { headline: "Is your home ready for the season?", categories: "system age, maintenance, comfort, energy bills" },
  },
  {
    id: "painting",
    noun: "painting company",
    label: "Painting or home improvement",
    match: /(paint|remodel|renovat|handyman|contractor|flooring|cabinet|drywall|deck|fence|pressure wash)/i,
    price: "inside or outside, how many rooms or how big the area, ceilings and trim, the condition and prep needed, and timing",
    quiz: "which part of the home, the style they want, how they'll use the space, budget comfort, and timing",
    score: { headline: "How ready is your home for a refresh?", categories: "wear and tear, style, how you use the space, upkeep" },
  },
  {
    id: "pest",
    noun: "pest control company",
    label: "Pest control",
    match: /(pest|termite|mosquito|rodent|exterminat)/i,
    price: "which pest, home size, one-time treatment or an ongoing plan, how bad it is, and timing",
    quiz: "what they're seeing, where, how long it's been happening, pets or kids at home, and timing",
    score: { headline: "How pest-proof is your home?", categories: "entry points, moisture, food and trash, yard" },
  },
  {
    id: "auto",
    noun: "auto detailer",
    label: "Auto detailing",
    match: /(detail|ceramic|paint correction|car wash|tint|ppf)/i,
    price: "vehicle size, the package (wash, interior, full detail, coating), the car's condition, pet hair, and add-ons",
    quiz: "how they use the car, what bothers them most, how long they want it to stay clean, budget comfort, and timing",
    score: { headline: "How protected is your car's finish?", categories: "washing habits, parking and weather, interior, protection" },
  },
  {
    id: "pet",
    noun: "pet care business",
    label: "Pet grooming or pet care",
    match: /(pet|dog|cat|groom|daycare|boarding|kennel)/i,
    price: "which service (grooming, daycare, boarding), pet size, coat type, how often, and add-ons",
    quiz: "their pet's size, energy and coat, what they need help with, schedule, and budget comfort",
    score: { headline: "How happy is your pet's routine?", categories: "exercise, grooming, care while you're away, health habits" },
  },
  {
    id: "photography",
    noun: "photographer",
    label: "Photography",
    match: /(photo|portrait|headshot|videograph)/i,
    price: "the kind of shoot, how many hours, how many people, how many locations, and prints or albums",
    quiz: "the occasion, the style they love, how many people, where, and their date",
    score: { headline: "Are you ready for your photo day?", categories: "planning, outfits, location, comfort on camera" },
  },
  {
    id: "solar",
    noun: "solar company",
    label: "Solar or energy upgrades",
    match: /(solar|battery storage|energy efficien|ev charger)/i,
    price: "home size, what they pay for power each month, roof type and direction, battery or not, and timing",
    quiz: "what they want most (lower bills, backup power, going green), their roof and home, how long they'll stay, budget comfort, and timing",
    score: { headline: "How energy smart is your home?", categories: "power bills, home and roof, appliances, backup power" },
  },
  {
    id: "events",
    noun: "wedding and event planner",
    label: "Weddings and events",
    match: /(wedding|event|planner|bridal|venue|catering|caterer|florist|dj\b)/i,
    price: "the kind of event, guest count, date and season, the level of help they want, and extras",
    quiz: "the kind of event, the vibe they want, guest count, how hands-on they want to be, budget comfort, and their date",
    score: { headline: "How ready is your wedding plan?", categories: "budget, vendors, timeline, guest details" },
  },
  {
    id: "real_estate",
    noun: "real estate agency",
    label: "Real estate or lending",
    match: /(real ?estate|realtor|realty|brokerage|mortgage|lender|loan officer|home buy)/i,
    price: "buying or selling, price range, area, timeline, and whether they're pre-approved",
    quiz: "buying or selling, the kind of home and area they want, must-haves, budget comfort, and timing",
    score: { headline: "How ready are you to buy a home?", categories: "savings and credit, budget, must-haves, timing" },
  },
  {
    id: "accounting",
    noun: "bookkeeping and tax business",
    label: "Accounting, bookkeeping or tax",
    match: /(account|bookkeep|\btax|cpa|payroll)/i,
    price: "business type, monthly transactions, number of accounts, payroll or not, and how far behind the books are",
    quiz: "their business type and size, what they handle themselves today, what stresses them most, and their deadlines",
    score: { headline: "How healthy are your business books?", categories: "record keeping, cash flow, taxes, payroll" },
  },
];

export const GENERAL = {
  id: "general",
  label: "Other (general questions)",
  price: "size or scope, type or material, extras and timing",
  quiz: "what they want, their preferences, budget comfort and timing",
  score: null,
};

export function getIndustry(id) {
  return INDUSTRIES.find((i) => i.id === id) || GENERAL;
}

// Best guess from what we know about the business; the member can change it.
export function guessIndustry(p) {
  // The business type and name decide first; the listing text only breaks a tie ("Clean books" isn't a cleaner).
  const first = `${nf(p.business_type)} ${nf(p.name)}`;
  const hit = INDUSTRIES.find((i) => i.match.test(first)) || INDUSTRIES.find((i) => i.match.test(nf(p.preview_source).slice(0, 400)));
  return (hit || GENERAL).id;
}

// ---------------------------------------------------------------------------
// "Make it better": paste into the same Base44 app, one at a time. Items ending in a colon
// are meant to be followed by what the member pastes (a link, an ID, their prices).
// ---------------------------------------------------------------------------

const PHOTOS = { title: "Use their real photos", text: "I've attached real photos of the business. Replace the stock images and photo placeholders with these, best photo in the biggest spot. Keep the layout. Don't add names or captions to people in the photos." };
const BRAND = { title: "Match their brand", text: "I've attached their logo. Put it in the header and footer, and update the colors across the whole design to match it. Keep the text readable and the buttons easy to see." };
const FACTS = { title: "Check the facts", text: "Go through every sentence and list anything that isn't in the details I gave you at the start: claims about how they work, what's included, numbers, credentials, results. Then remove or reword each one so it only says what I gave you." };
const PHONE = { title: "Polish it on phones", text: "Check every page at phone width. Fix anything that's cramped, cut off, too small to read or hard to tap, and tell me what you changed." };
const BOOKING = { title: "Connect their booking link", text: "Point every Book, Request and Schedule button to this link, opening in a new tab: " };
const PIXEL = { title: "Add the Meta Pixel", text: "Add the Meta Pixel with this ID to every public page, and fire a Lead event when someone submits a form. Pixel ID: " };
const ALERTS = { title: "Email me new leads", text: "Each time a new submission is saved, email me (the app owner) with their name, contact details, answers and the result they saw." };
const SHORTER = { title: "Make it shorter", text: "Cut this down so it can be read in two minutes. Keep the strongest points, merge anything repetitive, and keep the next step at the end." };
const MY_OFFER = { title: "Add my offer", text: "Add a slide just before the next step that explains what I'd do for them, in plain words, based only on this: " };
const PRICES = { title: "Update the prices", text: "Replace the prices with these, update every total and range that uses them, and test the math again: " };

export const IMPROVE = {
  website: [PHOTOS, BRAND, BOOKING, FACTS, PHONE],
  audit: [MY_OFFER, SHORTER, BRAND, FACTS],
  instagram: [
    { title: "Turn the grid into real posts", text: "Make each of the 9 grid tiles a downloadable 1080 by 1350 image, same design and words, with a download button under each one." },
    PHOTOS,
    BRAND,
    FACTS,
  ],
  landing: [PHOTOS, BRAND, BOOKING, PIXEL, ALERTS, FACTS],
  calculator: [
    { title: "Use their real numbers", text: "Replace the example numbers with these real ones, change the label to \"Your numbers\", and test the math again: " },
    BRAND,
    PHONE,
  ],
  estimator: [PRICES, PIXEL, ALERTS, PHOTOS, BRAND],
  quiz: [PIXEL, ALERTS, PHOTOS, BRAND, FACTS],
  assessment: [PIXEL, ALERTS, PHOTOS, BRAND, FACTS],
  quote: [PRICES, BOOKING, ALERTS, PHOTOS, BRAND],
  menu: [PRICES, BOOKING, ALERTS, PHOTOS, BRAND],
  booking: [PRICES, ALERTS, PIXEL, PHOTOS, BRAND],
  savings: [
    { title: "Use their real numbers", text: "Replace the example assumptions with these, remove the \"Example assumption\" labels for anything I give you, and test the math again: " },
    PIXEL,
    ALERTS,
    BRAND,
  ],
  budget: [
    { title: "Use their real splits", text: "Replace the example budget split with this, remove the example labels for anything I give you, and check the total still always adds up: " },
    PIXEL,
    ALERTS,
    BRAND,
  ],
  affordability: [
    { title: "Use their real rates", text: "Use these rates and costs instead of the examples, keep the \"not advice or a pre-approval\" line, and test the payment math again: " },
    PIXEL,
    ALERTS,
    BRAND,
  ],
  checklist: [
    { title: "Change the checklist", text: "Rewrite the checklist for this topic instead, keeping the same layout, groups and tips format: " },
    PIXEL,
    ALERTS,
    BRAND,
    FACTS,
  ],
  plan: [
    { title: "Change the plan type", text: "Change the plan to this instead, keeping the same questions-then-plan flow and building it without AI calls: " },
    PIXEL,
    ALERTS,
    BRAND,
    FACTS,
  ],
  referral: [
    { title: "Set the reward", text: "Change the reward everywhere it appears to this, and update the How it works steps to match: " },
    ALERTS,
    { title: "Add a QR code", text: "Add a printable page with a QR code for the referral sign-up page, sized for a counter card or a receipt, with the reward in one short line." },
    BRAND,
    FACTS,
  ],
  package: [PRICES, ALERTS, PHOTOS, BRAND, FACTS],
};
