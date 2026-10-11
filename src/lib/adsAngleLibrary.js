// SheFreelances OS - Ads Manager: the 10 master angle categories (adsAngleLibrary.js)
// Suzy's reusable angle library (Oct 2026). Every niche angle belongs to one category.
// For a niche that isn't in adsNiches.js, the AI builds angles from these categories.

export const ANGLE_CATEGORIES = [
  {
    id: "ANG-01",
    name: "Offer & Incentive",
    psychology: "Give someone a compelling reason to act",
    concept: "Give the customer a tangible reason to take action: an attractive offer, introductory incentive, trial, complimentary service, or clearly defined package. Valuable, specific, easy to understand.",
    rules: [
      "Lead with the actual offer.",
      "Include the price or financial incentive when relevant.",
      "Clearly explain what is included.",
      "Highlight any legitimate limitations or eligibility requirements.",
      "Don't invent discounts, free services, or promotional deadlines.",
    ],
    formats: "Offer-led static image, short promotional video, package comparison carousel, or service demonstration with an offer overlay.",
    examples: ["Your first HydraFacial for just $49.", "Your first class is on us.", "Schedule your complimentary pest inspection."],
  },
  {
    id: "ANG-02",
    name: "Transformation & Results",
    psychology: "Demonstrate the potential outcome",
    concept: "Help the customer visualize the result of buying. Demonstrate the value rather than describing it.",
    rules: [
      "Prioritize actual client, customer, or product results.",
      "Use before-and-after creative when suitable and platform-compliant.",
      "Include specific outcomes only when documented.",
      "Avoid suggesting every customer will experience the same result.",
      "When a physical transformation isn't appropriate, use a customer success story.",
    ],
    formats: "Before-and-after carousel, transformation Reel, case-study video, comparison imagery, or customer story.",
    examples: ["Two hours completely transformed this driveway.", "You won't believe this is the same car.", "Wait until you see this pup after their appointment."],
  },
  {
    id: "ANG-03",
    name: "Social Proof",
    psychology: "Show that other people trust the business",
    concept: "Let satisfied customers communicate the value and credibility of the business.",
    rules: [
      "Use authentic testimonials, reviews, or case studies.",
      "Include verifiable ratings, review counts, and customer results.",
      "Prioritize relatable customer experiences.",
      "Don't manufacture testimonials, numbers, or endorsement claims.",
      "Select proof relevant to the service being advertised.",
    ],
    formats: "UGC, testimonial video, review overlays, case-study carousel, customer reaction footage.",
    examples: ["See why homeowners across [City] choose our team.", "Don't take our word for it. Meet our members.", "Here's why these pet parents keep coming back."],
  },
  {
    id: "ANG-04",
    name: "Education & Myth Busting",
    psychology: "Answer questions and remove uncertainty",
    concept: "Answer the questions customers have before purchasing and help them understand the product or service.",
    rules: [
      "Identify common customer questions, concerns, or misconceptions.",
      "Lead with one specific question.",
      "Provide genuinely useful information.",
      "Keep the language simple and conversational.",
      "Present the business as a knowledgeable resource.",
      "Don't exaggerate risks, invent facts, or make unsupported health or financial claims.",
    ],
    formats: "Expert talking-head video, FAQ carousel, myth-versus-fact graphic, whiteboard explanation, or demonstration.",
    examples: ["What actually happens during your first Botox appointment?", "Three signs your AC might need servicing.", "How often should your dog actually be groomed?"],
  },
  {
    id: "ANG-05",
    name: "Process & Demonstration",
    psychology: "Show the product or service in action",
    concept: "Show the customer what happens when they buy, visit, book, or use the service. Let people watch it.",
    rules: [
      "Focus on one visually interesting process.",
      "Show real products, team members, tools, or service delivery.",
      "Use close-up footage when applicable.",
      "Explain what the viewer is watching.",
      "Keep the content natural rather than overly polished.",
      "Use hooks that create curiosity.",
    ],
    formats: "POV footage, behind-the-scenes video, ASMR-style footage, short demonstrations, process montages, and walkthroughs.",
    examples: ["Come behind the scenes of a HydraFacial appointment.", "Here's what 45 minutes at [Studio] actually looks like.", "30 seconds of the most satisfying car detail you'll see today."],
  },
  {
    id: "ANG-06",
    name: "Authority & Trust",
    psychology: "Establish credibility and expertise",
    concept: "Why choose this business instead of another: credibility, expertise, transparency, professionalism, and the real people behind it.",
    rules: [
      "Identify the business's strongest genuine differentiator.",
      "Show the owner, specialist, team, or facilities.",
      "Highlight relevant qualifications, experience, certifications, and achievements.",
      "Use local credibility when applicable.",
      "Avoid vague claims such as \"the best in town\" without substantiation.",
      "Prioritize specific proof over generic statements.",
    ],
    formats: "Business owner talking-head video, team introductions, clinic or facility tour, local project montage, documentary-style footage.",
    examples: ["I'm Dr. [Name], and here's what you can expect at our practice.", "Meet the team taking care of homes across [City].", "I'm [Name], and here's what makes our studio different."],
  },
  {
    id: "ANG-07",
    name: "Problem & Solution",
    psychology: "Connect an existing problem to a solution",
    concept: "Highlight a specific problem customers already recognize, then introduce the business as a relevant solution. Specific and practical, not exaggerated fear.",
    rules: [
      "Identify a realistic customer problem.",
      "Show how it affects their life or creates inconvenience.",
      "Introduce the service as a possible solution.",
      "Explain what the business actually does.",
      "End with a logical next step.",
      "Avoid fearmongering, personal-attribute assumptions, or guaranteed outcomes.",
    ],
    formats: "Problem/solution video, UGC-style talking head, simple comparison graphic, educational carousel.",
    examples: ["That strange noise coming from your AC might be worth checking.", "Not all roof damage is obvious from the ground.", "When a quick car wash just isn't cutting it."],
  },
  {
    id: "ANG-08",
    name: "Seasonal & Urgency",
    psychology: "Create timely, legitimate reasons to act",
    concept: "Connect the offer to a relevant time, season, event, deadline, or real availability limit, so the customer has a reason to act now.",
    rules: [
      "Identify real seasonal or event-based demand.",
      "Make the context geographically relevant where needed.",
      "Only include genuine deadlines, inventory constraints, or booking limitations.",
      "Avoid fabricated scarcity.",
      "Connect the event or season to a specific offer or service.",
    ],
    formats: "Promotional Reel, deadline-led static, seasonal service video, collection teaser, event announcement.",
    examples: ["Get your AC serviced before the summer heat arrives.", "Introducing our summer glow package.", "Game day plans? We've got your food covered."],
  },
  {
    id: "ANG-09",
    name: "Convenience & Accessibility",
    psychology: "Make the decision feel easier",
    concept: "Show how the business removes time, effort, uncertainty, or friction from buying. This angle sells simplicity.",
    rules: [
      "Identify what makes purchasing or booking easier.",
      "Emphasize genuine conveniences such as location, scheduling, mobile service, delivery, payment options, or a simplified process.",
      "Focus on one primary convenience per ad.",
      "Make the next step immediately clear.",
      "Never invent financing terms, service speeds, or availability.",
    ],
    formats: "POV videos, booking walkthroughs, convenience-focused talking heads, simple graphics, day-in-the-life footage.",
    examples: ["Professional car detailing, right in your driveway.", "Morning, midday, or evening. Find a class that fits your schedule.", "Your dog's grooming appointment, right outside your front door."],
  },
  {
    id: "ANG-10",
    name: "Product & Service Showcase",
    psychology: "Make the offering itself desirable",
    concept: "Make the product, service, location, or experience the hero. Lead with what makes the offering desirable.",
    rules: [
      "Highlight one hero product or service.",
      "Show the offering in its best authentic setting.",
      "Emphasize tangible features and differentiators.",
      "Include product or service details that help the customer make a decision.",
      "Prioritize real visuals over generic stock imagery.",
    ],
    formats: "Product videos, cinematic close-ups, lifestyle imagery, service showcases, carousels, walkthroughs, and collection videos.",
    examples: ["This is our best-selling dish, and it's easy to see why.", "Meet the piece we're known for.", "Come take a closer look at our HydraFacial treatment."],
  },
];

export function getCategory(id) {
  return ANGLE_CATEGORIES.find((c) => c.id === id);
}

export function categoriesForPrompt() {
  return ANGLE_CATEGORIES.map(
    (c) => `${c.id} ${c.name} (${c.psychology}). ${c.concept}
  Rules: ${c.rules.join(" ")}
  Formats: ${c.formats}
  Example hooks: ${c.examples.map((e) => `"${e}"`).join(" / ")}`
  ).join("\n");
}
