var e=`// SheFreelances OS - Ads Manager: the creative library (adsCreative.js)
// Suzy's creative library (Oct 2026): niche-specific creative guidance for the 12 niches, plus the
// seven universal creative types the AI adapts to any business. Performance statements are
// directional, not verified benchmarks.

export const CREATIVE_TYPES = [
  { id: "CR-01", name: "Product or service in action", communicates: "What the business actually delivers", format: "Short video" },
  { id: "CR-02", name: "Visual transformation", communicates: "The potential outcome", format: "Before/after or carousel" },
  { id: "CR-03", name: "Offer-led creative", communicates: "A compelling reason to act", format: "Static, video, or carousel" },
  { id: "CR-04", name: "Customer proof", communicates: "Experiences of real customers", format: "UGC or testimonial" },
  { id: "CR-05", name: "People and trust", communicates: "Who is behind the business", format: "Talking head or team video" },
  { id: "CR-06", name: "Educational creative", communicates: "Answers to customer questions", format: "Talking head or carousel" },
  { id: "CR-07", name: "Experience and lifestyle", communicates: "What buying or booking feels like", format: "POV or montage" },
];

// The creative type that usually fits each angle category.
export const CREATIVE_FOR_CATEGORY = {
  "ANG-01": "CR-03",
  "ANG-02": "CR-02",
  "ANG-03": "CR-04",
  "ANG-04": "CR-06",
  "ANG-05": "CR-01",
  "ANG-06": "CR-05",
  "ANG-07": "CR-06",
  "ANG-08": "CR-03",
  "ANG-09": "CR-07",
  "ANG-10": "CR-01",
};

export const NICHE_CREATIVE = {
  restaurant: {
    direction: "Make the food the hero. Prioritize mouthwatering close-ups, movement, texture, and authentic kitchen footage over polished graphics.",
    prioritize: [
      "Food preparation videos: stretching dough, pouring coffee, plating dishes, sizzling food.",
      "Close-up hero shots: cheese pulls, steam, drizzling sauces, fresh ingredients.",
      "Deal-led creative: an appetizing photo with a large, easy-to-read offer.",
      "Customer review overlays on real restaurant or food footage.",
      "Location awareness: the exterior, recognizable surroundings, and food.",
      "Occasion-based creative: date nights, game days, brunch, late-night dining.",
    ],
    example: "A 15-second Reel opening with a pizza coming out of the oven, then a cheese pull, with the offer as the overlay.",
    avoid: "Generic stock food photos, text-heavy menus, wide food shots, and creative where you can't immediately tell what's being sold.",
  },
  real_estate: {
    direction: "Sell the property, lifestyle, or local expertise. Show real listings and use video to bring properties to life.",
    prioritize: [
      "Property carousels featuring the best rooms and outdoor spaces.",
      "Walkthrough videos using natural phone footage.",
      "A strong hero image with clear property information, including price where appropriate.",
      "Home valuation creative featuring recognizable local neighborhoods.",
      "Agent talking-head videos explaining the market.",
      "Sold-property case studies with actual transaction results.",
    ],
    example: "A 30-second walkthrough of the kitchen, living area, backyard and exterior with a simple \\"Just Listed in [City]\\" opening.",
    avoid: "Luxury photos unrelated to the listing, cluttered property graphics, unsupported statistics, and hiding important property details.",
    compliance: "Real estate campaigns must follow housing advertising and targeting requirements.",
  },
  home_services: {
    direction: "Make the transformation instantly obvious. Customers should understand what the business does and why it's valuable within seconds.",
    prioritize: [
      "Before-and-after carousels: a strong starting format for visible services.",
      "Satisfying service videos: pressure washing, painting, deep cleaning, landscaping.",
      "Seasonal offers tied to real demand, like AC maintenance before summer.",
      "Real team members working at real job sites.",
      "Genuine Google review overlays.",
      "Trust signals like licensed and insured, where true.",
    ],
    example: "A 4-card carousel: dirty driveway, cleaned driveway, close-up of the result, team photo with \\"Get a Free Quote.\\"",
    avoid: "Stock photos of technicians, unclear before and afters, generic graphics that don't show the work, and burying the offer under text.",
  },
  med_spa: {
    direction: "Combine visual appeal with trust. Show the treatment experience, the clinic's professionalism, and the value of booking.",
    prioritize: [
      "Process videos: close-up treatment footage is naturally engaging and a strong first test.",
      "Before-and-after imagery, only where consented, substantiated and allowed by Meta.",
      "First-time offer creative with clear introductory pricing.",
      "Clinic footage: clean treatment rooms, modern equipment, professional surroundings.",
      "Real client testimonial videos.",
      "Practitioner introductions explaining what happens during a treatment.",
    ],
    example: "A 15-second treatment video, then a shot of the treatment room, ending on the offer as the overlay.",
    avoid: "Overly retouched results, generic beauty stock photos, too much text, invasive procedure imagery, or anything implying the viewer has an appearance insecurity.",
  },
  fitness: {
    direction: "Sell the experience, not the equipment. People should be able to picture themselves in a class, enjoying it.",
    prioritize: [
      "Real class footage: energy, movement, instructors and members.",
      "Community videos with genuine interactions.",
      "Free trial offer creative.",
      "Trainer talking-head videos introducing the studio.",
      "Real member testimonials and progress stories.",
      "Facility walkthroughs for first-time visitors.",
    ],
    example: "A fast montage of a group class, the instructor coaching and members interacting, ending on the offer.",
    avoid: "Empty equipment photos, intimidating stock fitness models, unrealistic transformation promises, and aggressive motivational messages.",
  },
  roofing: {
    direction: "Combine visible roof condition, inspection footage and strong local credibility.",
    prioritize: [
      "Drone footage of real roofs and inspection areas.",
      "Close-ups of documented storm damage.",
      "Before-and-after roof replacement carousels.",
      "Local crews completing installations.",
      "Free inspection offers.",
      "Trust signals: verified licensing, insurance, warranty, completed local projects.",
    ],
    example: "A drone video of a roof inspection with the overlay \\"Recent Storms in [City]? Book a Roof Inspection.\\"",
    avoid: "Generic disaster imagery, exaggerated damage, made-up storms, and unconditional \\"$0 out of pocket\\" insurance promises.",
  },
  clothing: {
    direction: "Make the product desirable in a real-world context. Show real people wearing it, not only studio photos.",
    prioritize: [
      "UGC try-on videos with real customers or creators.",
      "Styling videos showing several ways to wear one piece.",
      "Best-selling product close-ups.",
      "Collection carousels worn by real people.",
      "Unboxing and first-impression videos.",
      "Real restock announcements and new collection previews.",
    ],
    example: "A creator's casual mirror try-on with the overlay \\"3 Ways I'd Style Our Best-Selling Set.\\"",
    avoid: "Only flat lays, too much studio polish, complicated collages, and visuals that hide the fit.",
  },
  dental: {
    direction: "Build trust while making treatment feel understandable and approachable. Prioritize real, dentist-led content.",
    prioritize: [
      "Dentist talking-head videos explaining procedures simply.",
      "Genuine patient testimonials with authorization.",
      "Consented patient results, where Meta allows.",
      "Clinic walkthroughs: modern equipment, a welcoming space.",
      "Consultation offer creative.",
      "Educational videos answering treatment questions and payment options.",
    ],
    example: "The dentist to camera: \\"Thinking about dental implants? Here's what actually happens at your first consultation.\\"",
    avoid: "Disturbing procedure footage, unsupported medical claims, exaggerated outcomes, and unverified financing promises.",
  },
  chiro: {
    direction: "Make the practitioner familiar and the treatment easy to understand. Use real clinic footage and education.",
    prioritize: [
      "The chiropractor talking directly to camera.",
      "Short appointment process videos.",
      "First-visit walkthroughs.",
      "Clinic introductions with the practitioner and the space.",
      "Educational clips: exercises or common questions.",
      "Real patient testimonials, with authorization and appropriate claims.",
    ],
    example: "A 20-second video, \\"What Happens at Your First Chiropractic Appointment?\\", showing the consultation and each step.",
    avoid: "Sensational cracking videos as the whole strategy, medical promises, fear-based messages, and diagnosing the viewer.",
  },
  auto_detailing: {
    direction: "Lean into satisfying, visual footage. This service naturally produces strong creative.",
    prioritize: [
      "Dramatic vehicle before-and-after shots.",
      "ASMR-style detailing: pressure washing, foam cannons, polishing.",
      "Ceramic coating demos showing water beading.",
      "Interior deep-clean transformations.",
      "Package showcase videos.",
      "Mobile detailing footage arriving at the customer's place.",
    ],
    example: "A 15-second montage: dirty interior, extraction, steam cleaning, finished result, with the package as the overlay.",
    avoid: "Luxury car photos without real service footage, heavy effects that hide the results, and cars that aren't their work.",
  },
  pest: {
    direction: "Make professional pest control look reliable, approachable and easy to arrange.",
    prioritize: [
      "Technicians inspecting real properties.",
      "Seasonal educational videos about common local pests.",
      "Simple service-process explainers.",
      "Free inspection offer graphics.",
      "Real customer reviews.",
      "Trust content: uniforms, vehicles, equipment, team members.",
    ],
    example: "A technician walking around a home explaining three places they check during a routine inspection.",
    avoid: "Graphic pest imagery, exaggerated infestations, unsupported safety claims, and spraying footage with no context.",
  },
  pet: {
    direction: "Make the animals the stars, with reassurance about the quality of care.",
    prioritize: [
      "Before-and-after grooming transformations.",
      "Satisfying grooming process videos.",
      "Happy pets comfortable with the groomers.",
      "Groomer introductions.",
      "First-time customer offers.",
      "Mobile grooming demos or salon walkthroughs.",
    ],
    example: "A short Reel: a fluffy dog walks in, ends on the finished groom, overlay \\"Fresh Cut. Happy Pup.\\"",
    avoid: "Stock pet photos, distressed animals, forced reactions, and heavy graphics that distract from the animals.",
  },
};

export function getCreativeType(id) {
  return CREATIVE_TYPES.find((c) => c.id === id);
}

export function nicheCreative(nicheId) {
  return NICHE_CREATIVE[nicheId] || null;
}

export function creativeForPrompt(nicheId) {
  const n = NICHE_CREATIVE[nicheId];
  const types = CREATIVE_TYPES.map((c) => \`- \${c.id} \${c.name}: \${c.communicates}. Format: \${c.format}.\`).join("\\n");
  const map = Object.entries(CREATIVE_FOR_CATEGORY)
    .map(([a, c]) => \`\${a}: \${c}\`)
    .join("; ");
  const nicheBlock = n
    ? \`CREATIVE DIRECTION FOR THIS NICHE
\${n.direction}
What to prioritize:
\${n.prioritize.map((p) => \`- \${p}\`).join("\\n")}
Example (style only): \${n.example}
Avoid: \${n.avoid}\${n.compliance ? \`\\nCompliance: \${n.compliance}\` : ""}\`
    : "CREATIVE DIRECTION: this business isn't in our niche library. Use the seven creative types and adapt them to what this business actually sells.";
  return \`\${nicheBlock}

THE SEVEN CREATIVE TYPES (every ad uses one)
\${types}
Usual match from angle category: \${map}. Pick a different type only when it clearly fits the business and creative better.\`;
}
`;export{e as default};