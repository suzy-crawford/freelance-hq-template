// SheFreelances OS - Ads Manager: the 12 ad headline structures (adsHeadlines.js)
// Suzy's headline library (Oct 2026). Each angle category has three recommended structures;
// every ad gets one headline per recommended structure and the member picks one.

export const HEADLINE_STRUCTURES = [
  {
    id: "HL-01",
    name: "Direct offer",
    structure: "[Product/Service] + [Price/Incentive]",
    use: "Straight to the point. Excellent for lead generation when the business has a strong offer.",
    rule: "Lead with the offer. Don't bury the price or incentive behind clever wording.",
    examples: ["Your First Facial for $49", "2 Large Pizzas for $24.99", "Get 20% Off Your First Order", "First Fitness Class FREE", "Complete Car Detailing From $149", "$79 AC Tune-Up Special"],
  },
  {
    id: "HL-02",
    name: "Freebie",
    structure: "Free + [Specific Valuable Thing]",
    use: "When the business offers something complimentary that lowers the barrier to becoming a lead.",
    rule: "Be specific about what is free. Only use this structure when the offer is genuinely complimentary.",
    examples: ["Get Your Free Roof Inspection", "Book a Free Trial Class", "Get a Free Home Valuation", "Claim Your Free Estimate", "Free Pest Inspection", "Get Your Complimentary Consultation"],
  },
  {
    id: "HL-03",
    name: "Desired outcome",
    structure: "[Desirable Result] + [Service or Mechanism]",
    use: "Focuses on what the customer wants rather than the technical details of the service.",
    rule: "Focus on a tangible outcome. Don't promise results that the business cannot guarantee.",
    examples: ["A Fresh Look for Your Driveway", "A Cleaner Car, Inside & Out", "Find Your Next Home", "Discover Your New Favorite Outfit", "A Fresh Look for Your Home", "Get Your Car Showroom-Ready"],
  },
  {
    id: "HL-04",
    name: "Curiosity",
    structure: "[Question or intriguing statement related to the service]",
    use: "Gives someone a reason to click and learn more.",
    rule: "Create curiosity without withholding essential information or resorting to clickbait.",
    examples: ["What's Your Home Worth Today?", "Is Your Roof Storm-Ready?", "What Does Ceramic Coating Do?", "Looking for Your Next Favorite Gym?", "Ever Tried a HydraFacial?", "What's Inside Our Best-Seller?"],
  },
  {
    id: "HL-05",
    name: "Problem / solution",
    structure: "[Recognizable Problem]? + [Clear Solution]",
    use: "Connects a common frustration directly to the service.",
    rule: "Focus on everyday problems. Don't use aggressive fear-based messaging or imply knowledge of someone's sensitive personal circumstances.",
    examples: ["Dirty Driveway? We Can Help.", "AC Not Working? Book a Visit.", "No Time to Cook? Order Online.", "Need a New Roof? Get a Quote.", "Car Needs Some TLC?", "Need a Reliable Local Plumber?"],
  },
  {
    id: "HL-06",
    name: "Social proof",
    structure: "[Verified Proof] + [Product/Service or Business]",
    use: "Uses genuine credibility to reinforce the decision.",
    rule: "Numerical claims must come from verified business information. Never invent ratings, reviews, testimonials, or results.",
    examples: ["See Our 300+ 5-Star Reviews", "Trusted by 500+ Local Homeowners", "Rated 4.9 Stars by Our Customers", "See Why Our Members Love Us", "Our Customers Say It Best", "See Our Latest Client Results"],
  },
  {
    id: "HL-07",
    name: "Location",
    structure: "[City/Area] + [Service/Offer]",
    use: "Makes an ad feel immediately relevant to someone in the service area.",
    rule: "Use the business's actual service area. Location-specific headlines should sound natural rather than like keyword-stuffed search ads.",
    examples: ["Irvine's Newest Fitness Studio", "Dental Implants in Orange County", "Austin Roof Inspections", "San Diego Mobile Car Detailing", "Your New Favorite Miami Brunch Spot", "Professional Cleaning in Dallas"],
  },
  {
    id: "HL-08",
    name: "Urgency",
    structure: "[Offer/Product] + [Real Deadline or Availability]",
    use: "Gives prospective customers a timely reason to act.",
    rule: "Urgency must be genuine. Never invent a deadline, claim limited availability without confirmation, or manufacture scarcity.",
    examples: ["Summer Special Ends Sunday", "Book Your Holiday Grooming Today", "New Collection Drops Friday", "Last Week of Our Spring Special", "New Appointments Available This Week", "Early Bird Pricing Ends Tomorrow"],
  },
  {
    id: "HL-09",
    name: "Convenience",
    structure: "[Product/Service] + [Convenience Benefit]",
    use: "Sells the ease of working with the business.",
    rule: "Highlight genuine conveniences, such as mobile service, flexible appointments, easy booking, or delivery.",
    examples: ["Car Detailing at Your Doorstep", "Book Your Facial Online", "Dinner Delivered to Your Door", "Get a Roof Quote Online", "Grooming Without Leaving Home", "Shop Online. Delivered to You."],
  },
  {
    id: "HL-10",
    name: "Showcase",
    structure: "Discover/Explore/Meet + [Product, Service or Collection]",
    use: "Works when the product or creative itself is the main selling point.",
    rule: "Highlight the most interesting or desirable aspect of the offering. Avoid generic headlines such as \"Discover Our Services\" when a more specific alternative exists.",
    examples: ["Meet Our Best-Selling Collection", "Explore Our Latest Listings", "Discover Our Signature Facial", "Take a Look Inside Our Studio", "Meet Your New Favorite Outfit", "Explore Our Detailing Packages"],
  },
  {
    id: "HL-11",
    name: "Benefit stack",
    structure: "[Benefit 1] + [Benefit 2] + [Benefit 3]",
    use: "Communicates multiple selling points in a compact, scannable format.",
    rule: "Use two or three complementary benefits. Prioritize clarity over cleverness.",
    examples: ["Clean Car. Zero Hassle.", "Fresh Pizza. Made Daily.", "Expert Care. Easy Booking.", "Local Team. Free Estimates.", "Great Fit. Everyday Comfort.", "Real Coaches. Great Community."],
  },
  {
    id: "HL-12",
    name: "Direct action",
    structure: "[Action Verb] + [Specific Next Step]",
    use: "A straightforward conversion-focused headline that tells the customer exactly what to do.",
    rule: "Align the action with the actual conversion destination. Don't instruct someone to book if the next step is only a consultation request or information form.",
    examples: ["Book Your First Class Today", "Schedule Your Roof Inspection", "Get Your Free Home Valuation", "Shop the New Collection", "Request Your Free Quote", "Reserve Your Table Today"],
  },
];

// Angle category -> the three recommended headline structures.
export const HEADLINES_FOR_CATEGORY = {
  "ANG-01": ["HL-01", "HL-02", "HL-08"],
  "ANG-02": ["HL-03", "HL-06", "HL-10"],
  "ANG-03": ["HL-06", "HL-03"],
  "ANG-04": ["HL-04", "HL-05"],
  "ANG-05": ["HL-10", "HL-04", "HL-03"],
  "ANG-06": ["HL-06", "HL-07", "HL-11"],
  "ANG-07": ["HL-05", "HL-03", "HL-12"],
  "ANG-08": ["HL-08", "HL-01", "HL-12"],
  "ANG-09": ["HL-09", "HL-11", "HL-12"],
  "ANG-10": ["HL-10", "HL-03", "HL-01"],
};

// Quick-reference bank per niche (inspiration, not performance claims).
export const HEADLINE_BANK = {
  restaurant: ["2 Large Pizzas for $24.99", "Your New Favorite Brunch Spot", "Order Fresh Pizza Tonight"],
  real_estate: ["What's Your Home Worth?", "Explore Homes in [City]", "Get Your Free Home Valuation"],
  home_services: ["Get Your Free Estimate", "Transform Your Driveway", "Book Your $79 AC Tune-Up"],
  med_spa: ["Your First Facial for $49", "Discover Our HydraFacial", "Book Your First Appointment"],
  fitness: ["Your First Class Is Free", "Find Your Fitness Community", "Book Your Free Trial Class"],
  roofing: ["Get a Free Roof Inspection", "Is Your Roof Storm-Ready?", "Meet Your Local Roofing Team"],
  clothing: ["Get 20% Off Your First Order", "Meet Your New Favorite Outfit", "Shop Our Latest Collection"],
  dental: ["Explore Your Smile Options", "Book a Dental Consultation", "Meet Your New Dentist"],
  chiro: ["Book Your First Visit", "Meet Your Local Chiropractor", "Explore Our New Patient Offer"],
  auto_detailing: ["Bring Back That Showroom Shine", "Mobile Detailing at Your Door", "Book Your Complete Detail"],
  pest: ["Get Your Free Inspection", "Explore Our Prevention Plans", "Schedule a Pest Inspection"],
  pet: ["Book Your Pup's Next Groom", "Mobile Grooming at Your Door", "Fresh Cuts for Happy Pups"],
};

export function getStructure(id) {
  return HEADLINE_STRUCTURES.find((h) => h.id === id);
}

// Three structures for an angle: the category's recommendations, topped up with sensible defaults.
export function structuresFor(categoryId) {
  const ids = [...(HEADLINES_FOR_CATEGORY[categoryId] || [])];
  for (const extra of ["HL-12", "HL-07", "HL-03"]) if (ids.length < 3 && !ids.includes(extra)) ids.push(extra);
  return ids.slice(0, 3).map(getStructure);
}

export function headlineGuide(categoryId) {
  return structuresFor(categoryId)
    .map((h) => `- ${h.id} ${h.name}: ${h.structure}. ${h.use} Rule: ${h.rule} Examples (style only, never copy their facts or numbers): ${h.examples.slice(0, 3).join(" / ")}`)
    .join("\n");
}
