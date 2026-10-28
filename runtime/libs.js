//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = /* @__PURE__ */ t({
	CLIENT_RESPONSIBILITIES: () => u,
	COMBINED_ADD_ON: () => ie,
	DOC_STYLES: () => oe,
	EXPERIENCE_LEVELS: () => i,
	LIBRARY_VERSION: () => r,
	NICHES: () => d,
	NICHE_GROUPS: () => f,
	NICHE_SCREEN_COPY: () => ee,
	PRICE_RANGES: () => m,
	SERVICES: () => a,
	SERVICE_QUIZ: () => o,
	STANDARD_PACKAGES: () => c,
	formatMoney: () => re,
	getFreelancerName: () => ce,
	getNicheAffordability: () => p,
	getOfferService: () => l,
	getPriceRecommendation: () => ae,
	getServiceName: () => se,
	includesAds: () => le,
	nicheInSentence: () => h,
	priceLine: () => ue,
	scoreServiceQuiz: () => s
}), r = "2.4.0", i = {
	brand_new: {
		label: "Brand new",
		description: "I'm still learning the skill."
	},
	no_clients: {
		label: "No paying clients yet",
		description: "I've practiced, but nobody has paid me yet."
	},
	has_clients: {
		label: "I have paying clients",
		description: "At least one business has paid me for marketing work."
	}
}, a = {
	meta_ads: {
		label: "Paid Ads",
		offerLabel: "Meta Ads Management",
		description: "Help businesses get leads and customers with Facebook and Instagram ads.",
		inCurriculum: !0
	},
	organic_social: {
		label: "Social Media & Content",
		offerLabel: "Social Media Management",
		description: "Help businesses plan, create, and post content on their social media.",
		inCurriculum: !0
	},
	combined: {
		label: "Paid Ads + Social Media",
		offerLabel: "Meta Ads and Social Media Management",
		description: "Ads and social media together, for one monthly fee.",
		inCurriculum: !0
	},
	other: {
		label: "Other",
		offerLabel: null,
		description: "Something else, like email marketing, copywriting, or video editing.",
		inCurriculum: !1
	}
}, o = [
	{
		id: "q1",
		question: "Which sounds more fun to you?",
		options: [{
			label: "Testing what works and watching the numbers improve",
			score: { meta_ads: 2 }
		}, {
			label: "Coming up with ideas and creating posts",
			score: { organic_social: 2 }
		}]
	},
	{
		id: "q2",
		question: "How do you feel about numbers and simple spreadsheets?",
		options: [
			{
				label: "I'm comfortable with them",
				score: { meta_ads: 2 }
			},
			{
				label: "I'm okay with them",
				score: {
					meta_ads: 1,
					organic_social: 1
				}
			},
			{
				label: "I'd rather avoid them",
				score: { organic_social: 2 }
			}
		]
	},
	{
		id: "q3",
		question: "Do you enjoy writing captions or making content?",
		options: [
			{
				label: "I love it",
				score: { organic_social: 2 }
			},
			{
				label: "It's fine",
				score: {
					meta_ads: 1,
					organic_social: 1
				}
			},
			{
				label: "Not really",
				score: { meta_ads: 2 }
			}
		]
	},
	{
		id: "q4",
		question: "What would you rather help a business with?",
		options: [{
			label: "Getting new leads and customers",
			score: { meta_ads: 2 }
		}, {
			label: "Staying consistent and visible online",
			score: { organic_social: 2 }
		}]
	}
];
function s(e) {
	let t = {
		meta_ads: 0,
		organic_social: 0
	};
	for (let n of o) {
		let r = n.options[e[n.id]];
		if (r) for (let [e, n] of Object.entries(r.score)) t[e] += n;
	}
	let n = t.meta_ads - t.organic_social;
	if (Math.abs(n) <= 1) return {
		recommendation: null,
		totals: t,
		message: "You'd do well with either one. Pick the one you're more excited to learn. You can add the other later."
	};
	let r = n > 0 ? "meta_ads" : "organic_social";
	return {
		recommendation: r,
		totals: t,
		message: r === "meta_ads" ? "Paid Ads looks like a good fit. You like seeing what works, and businesses pay well for more leads." : "Social Media & Content looks like a good fit. You enjoy creating, and businesses need help staying consistent."
	};
}
var c = {
	meta_ads: {
		package_name: "Monthly Meta Ads Management",
		billing: "monthly",
		categories: [
			{
				name: "Setup",
				items: [
					"Campaign setup in Meta Ads Manager",
					"Pixel and tracking check",
					"Audience setup"
				]
			},
			{
				name: "Your ads",
				items: ["4 ad copy variations per month", "3 ad creative ideas per month"]
			},
			{
				name: "Management",
				items: ["Results checked and adjusted every week", "Budget monitoring"]
			},
			{
				name: "Reporting",
				items: ["Monthly results report", "Monthly check-in call"]
			}
		],
		not_included: [
			"Ad spend (the client pays Meta directly for the ads)",
			"Filming or editing video",
			"Building websites or landing pages",
			"Organic social media posting",
			"Guaranteed results"
		]
	},
	organic_social: {
		package_name: "Monthly Social Media Management",
		billing: "monthly",
		categories: [
			{
				name: "Strategy",
				items: ["Monthly content plan", "Content calendar"]
			},
			{
				name: "Content",
				items: ["12 posts per month (4 Reels, 8 image or carousel posts)", "Captions for every post"]
			},
			{
				name: "Posting",
				items: ["Scheduling and posting on Instagram and Facebook"]
			},
			{
				name: "Reporting",
				items: ["Monthly results report"]
			}
		],
		not_included: [
			"Filming or photography",
			"Replying to DMs",
			"Paid ads",
			"More than 2 platforms",
			"Guaranteed follower or sales growth"
		]
	}
};
c.combined = {
	package_name: "Monthly Ads and Social Media Management",
	billing: "monthly",
	categories: [
		{
			name: "Setup and strategy",
			items: ["Ads campaign setup and tracking check", "Monthly content plan and calendar"]
		},
		{
			name: "Your ads",
			items: ["4 ad copy variations and 3 ad creative ideas per month", "Results checked and adjusted every week"]
		},
		{
			name: "Your content",
			items: ["12 posts per month (4 Reels, 8 image or carousel posts) with captions", "Scheduling and posting on Instagram and Facebook"]
		},
		{
			name: "Reporting",
			items: ["One monthly report covering ads and social", "Monthly check-in call"]
		}
	],
	not_included: [
		"Ad spend (the client pays Meta directly for the ads)",
		"Filming or photography",
		"Building websites or landing pages",
		"Replying to DMs",
		"Guaranteed results"
	]
};
function l(e) {
	let t = new Set(e || []), n = t.has("meta_ads"), r = t.has("organic_social");
	return n && r ? "combined" : n ? "meta_ads" : r ? "organic_social" : t.has("other") ? "other" : null;
}
var u = {
	meta_ads: [
		"Pays ad spend directly to Meta.",
		"Gives access to their Meta Business account, ad account, Facebook Page, and Instagram.",
		"Provides photos, videos, and brand details for the ads.",
		"Approves ads before they go live.",
		"Follows up with new leads quickly."
	],
	organic_social: [
		"Provides photos, videos, and brand details.",
		"Gives access to their social accounts or scheduling tool.",
		"Reviews and approves content within 2 business days.",
		"Shares news, offers, and events worth posting about."
	],
	combined: [
		"Pays ad spend directly to Meta.",
		"Gives access to their Meta Business account, ad account, Facebook Page, and Instagram.",
		"Provides photos, videos, and brand details.",
		"Approves ads and content before they go live.",
		"Follows up with new leads quickly."
	],
	other: ["Provides the information, files, and access needed to do the work.", "Reviews and approves work within 2 business days."]
}, d = [
	{
		id: "med_spas",
		label: "Med spas",
		affordability: "high",
		why: "They sell high-value treatments and need a steady flow of new clients."
	},
	{
		id: "dentists",
		label: "Dentists",
		affordability: "high",
		why: "Every new patient is worth a lot, and most dentists already spend on marketing."
	},
	{
		id: "chiropractors",
		label: "Chiropractors",
		affordability: "high",
		why: "They rely on new patients every month and are easy to find online."
	},
	{
		id: "home_service",
		label: "Home service businesses",
		affordability: "high",
		why: "Roofers, plumbers, and cleaners have big jobs and always need more calls."
	},
	{
		id: "law_firms",
		label: "Law firms",
		affordability: "high",
		why: "One new client can be worth thousands, so marketing pays for itself fast."
	},
	{
		id: "real_estate",
		label: "Real estate agents",
		affordability: "medium",
		why: "Agents live on leads and visibility, and most are active on social."
	},
	{
		id: "coaches",
		label: "Coaches",
		affordability: "medium",
		why: "They sell online, understand marketing, and need consistent content and leads."
	},
	{
		id: "consultants",
		label: "Consultants",
		affordability: "medium",
		why: "Their offers are high value and they rarely have time for their own marketing."
	},
	{
		id: "ecommerce",
		label: "Ecommerce brands",
		affordability: "medium",
		why: "They sell online every day and depend on ads and content to grow."
	},
	{
		id: "salons",
		label: "Salons",
		affordability: "low",
		why: "They're visual, local, and rely on repeat clients and bookings."
	},
	{
		id: "fitness",
		label: "Fitness studios",
		affordability: "low",
		why: "They need a steady stream of new members and great content to show off."
	},
	{
		id: "restaurants",
		label: "Local restaurants",
		affordability: "low",
		why: "They're visual and local, and most are already on Instagram."
	}
], f = [
	{
		id: "small_business",
		label: "Small businesses",
		examples: "Any type of small business",
		affordability: "medium"
	},
	{
		id: "local",
		label: "Local businesses",
		examples: "Salons, dentists, gyms, restaurants",
		affordability: "medium"
	},
	{
		id: "health_beauty",
		label: "Health and beauty businesses",
		examples: "Med spas, salons, wellness studios",
		affordability: "medium"
	},
	{
		id: "home_services",
		label: "Home service businesses",
		examples: "Roofers, cleaners, plumbers",
		affordability: "high"
	},
	{
		id: "coaches_consultants",
		label: "Coaches and consultants",
		examples: "Business, life, and fitness coaches",
		affordability: "medium"
	},
	{
		id: "online",
		label: "Online businesses",
		examples: "Ecommerce brands, course creators",
		affordability: "medium"
	},
	{
		id: "professional",
		label: "Professional services (B2B)",
		examples: "Law firms, agencies, accountants",
		affordability: "high"
	}
], ee = {
	title: "Who would you like to help?",
	subtitle: "You don't need a perfect niche to start. Starting broad is completely fine. You can narrow it down later.",
	specificLabel: "Something more specific",
	specificDescription: "Pick a type of business or type your own."
};
function p(e) {
	let t = String(e || "").toLowerCase(), n = [...d, ...f].find((e) => e.label.toLowerCase() === t);
	return n ? n.affordability : "medium";
}
var m = {
	organic_social: {
		brand_new: [500, 900],
		no_clients: [800, 1300],
		has_clients: [1200, 2500]
	},
	meta_ads: {
		brand_new: [750, 1200],
		no_clients: [1e3, 1500],
		has_clients: [1500, 3500]
	},
	other: {
		brand_new: [400, 900],
		no_clients: [700, 1300],
		has_clients: [1e3, 2500]
	}
}, te = {
	brand_new: 1 / 3,
	no_clients: .4,
	has_clients: .5
}, ne = (e) => Math.round(e / 50) * 50;
function re(e) {
	return "$" + Number(e || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });
}
var ie = 1e3;
function ae(e, t, n, r) {
	let i = m.meta_ads[t] ? t : "brand_new", a = e === "combined", o = a ? "meta_ads" : m[e] ? e : "other", [s, c] = m[o][i];
	a && (s += ie, c += ie);
	let l = c, u = [];
	i === "brand_new" ? u.push("You're just starting, so this leaves room to raise your price once you have results.") : i === "no_clients" ? u.push("You've practiced but don't have paying clients yet, so this is a solid starting range.") : u.push("You've had paying clients, so you can charge more confidently.");
	let d = r ? "medium" : p(n);
	return d === "high" ? (s *= 1.1, c *= 1.1, u.push(`${n} usually have bigger marketing budgets.`)) : d === "low" && (s *= .9, c *= .9, u.push(`${n} often have tighter marketing budgets.`)), a && u.push("You're doing ads and social media together, so the price includes both."), o === "meta_ads" && u.push("This is your management fee. The client pays for the ads themselves separately."), o === "other" && u.push("This service isn't covered in the course, so treat this as a rough starting point."), s = ne(Math.min(s, l * .8)), c = ne(Math.min(c, l)), {
		low: s,
		high: c,
		recommended: ne(s + (c - s) * te[i]),
		reasons: u,
		note: "This is an illustrative starting price, not an industry average. You can change it any time."
	};
}
var oe = [
	{
		id: "classic",
		name: "Classic",
		bg: "#FFFFFF",
		text: "#111111",
		muted: "#6B6B6B",
		accent: "#111111",
		rule: "#E5E5E5",
		headingFont: "Inter",
		bodyFont: "Inter"
	},
	{
		id: "editorial",
		name: "Editorial",
		bg: "#FAF6F0",
		text: "#1A1208",
		muted: "#8A7660",
		accent: "#B07D5A",
		rule: "#E8DDD0",
		headingFont: "Playfair Display",
		bodyFont: "Inter"
	},
	{
		id: "blush",
		name: "Soft Blush",
		bg: "#FFF6F7",
		text: "#2A1A1E",
		muted: "#9A7A82",
		accent: "#D9577D",
		rule: "#F3D3DC",
		headingFont: "Playfair Display",
		bodyFont: "Inter"
	},
	{
		id: "noir",
		name: "Noir",
		bg: "#0F0F0F",
		text: "#FFFFFF",
		muted: "#A3A3A3",
		accent: "#E8D5A8",
		rule: "#2A2A2A",
		headingFont: "Playfair Display",
		bodyFont: "Inter"
	}
];
function se(e) {
	return e.primary_service === "other" ? e.custom_service_name || "Freelance service" : a[e.primary_service]?.offerLabel || "Freelance service";
}
function ce(e) {
	return (e.business_name || "").trim() || e.first_name || "";
}
function h(e) {
	let t = String(e.niche || "");
	return e.niche_is_custom ? t : t.charAt(0).toLowerCase() + t.slice(1);
}
function le(e) {
	return e === "meta_ads" || e === "combined";
}
function ue(e) {
	return `${re(e)} per month`;
}
//#endregion
//#region src/lib/buildsExtras.js
var de = /* @__PURE__ */ t({
	GENERAL: () => me,
	IMPROVE: () => Se,
	INDUSTRIES: () => pe,
	getIndustry: () => he,
	guessIndustry: () => ge
}), fe = (e) => String(e || "").trim(), pe = [
	{
		id: "med_spa",
		noun: "med spa",
		label: "Med spa or aesthetics",
		match: /(med ?spa|medical spa|aesthetic|botox|injector|filler|laser hair|hydrafacial|skin ?care|derma)/i,
		price: "which treatment they want, which areas or how big an area, first time or returning, add-ons, one visit or a series, and when they'd like to come in",
		quiz: "what they'd like to change (lines, lips, dull or uneven skin, texture, unwanted hair), how natural they want it to look, how much downtime is OK, what they've had before, and timing",
		score: {
			headline: "What's your skin score?",
			categories: "daily routine, sun protection, skin concerns, treatment history"
		}
	},
	{
		id: "dental",
		noun: "dental practice",
		label: "Dental practice",
		match: /(dent|orthodont|invisalign|implant|teeth|veneer)/i,
		price: "which treatment (whitening, clear aligners, veneers, implants, a checkup), how many teeth, insurance or paying themselves, interest in a payment plan, and timing",
		quiz: "what they'd like to change about their smile, any sensitivity or discomfort, past orthodontic work, budget comfort, and whether there's a date they're working toward",
		score: {
			headline: "How healthy is your smile routine?",
			categories: "brushing and flossing, food and habits, checkups, smile confidence"
		}
	},
	{
		id: "salon",
		noun: "salon",
		label: "Hair, nails or lash salon",
		match: /(hair|salon|barber|nail|lash|brow|blowout|balayage|stylist)/i,
		price: "which service, hair length and thickness, the kind of color or style, extras, and how often they'd come in",
		quiz: "the look they're after, how much upkeep they want, their hair or nail history, budget comfort, and timing",
		score: {
			headline: "How healthy is your hair routine?",
			categories: "washing and styling, heat and color, upkeep, products"
		}
	},
	{
		id: "fitness",
		noun: "fitness studio",
		label: "Gym or fitness studio",
		match: /(gym|fitness|yoga|pilates|crossfit|boxing|personal train|barre|spin|bootcamp)/i,
		price: "membership, classes or personal training, sessions per week, how long they'd commit, and extras",
		quiz: "their main goal, experience level, the kind of workout they enjoy, schedule, and whether they want a group or one on one",
		score: {
			headline: "How strong is your fitness routine?",
			categories: "movement, strength, recovery and sleep, consistency"
		}
	},
	{
		id: "chiro",
		noun: "chiropractic clinic",
		label: "Chiropractic or physical therapy",
		match: /(chiro|spinal|posture|physio|physical therapy)/i,
		price: "the kind of visit (first assessment, follow-up, a package), how often, and insurance or paying themselves",
		quiz: "where they feel it, how long it's been going on, what makes it worse, how active they are, and what they've tried",
		score: {
			headline: "How's your posture, really?",
			categories: "desk and screen setup, daily movement, sleep, aches and stiffness"
		}
	},
	{
		id: "roofing",
		noun: "roofing company",
		label: "Roofing",
		match: /(roof|shingle|storm damage|gutter|siding)/i,
		price: "repair or replacement, home size or number of stories, current roof material, any storm damage, how steep the roof is, and timing",
		quiz: "what they're seeing (leaks, missing shingles, age), how long they plan to stay in the home, material preference, and budget comfort",
		score: {
			headline: "Is your roof ready for storm season?",
			categories: "age and material, visible wear, attic and gutters, past storms"
		}
	},
	{
		id: "cleaning",
		noun: "cleaning company",
		label: "Cleaning service",
		match: /(clean|maid|janitorial)/i,
		price: "bedrooms, bathrooms, home size, one-time or recurring, standard or deep clean, extras (inside the fridge, oven, windows), and pets",
		quiz: "how often they'd like help, what they hate cleaning most, home size, pets, and timing",
		score: {
			headline: "How much time is cleaning costing you?",
			categories: "hours each week, rooms that pile up, stress level, help you have now"
		}
	},
	{
		id: "lawn",
		noun: "landscaping company",
		label: "Landscaping or lawn care",
		match: /(landscap|lawn|yard|mow|tree|garden|irrigation|sprinkler)/i,
		price: "yard size, which services (mowing, cleanup, mulch, planting, design), how often, and the yard's current condition",
		quiz: "what they want the yard to look like, how much upkeep they'll do themselves, budget comfort, and timing",
		score: {
			headline: "How healthy is your lawn?",
			categories: "watering, mowing, weeds and pests, soil"
		}
	},
	{
		id: "hvac_plumbing",
		noun: "home service company",
		label: "HVAC, plumbing or electrical",
		match: /(hvac|heating|cooling|air condition|\bac\b|furnace|plumb|water heater|electric)/i,
		price: "the kind of system or job, its age, home size, repair or replace, what's going wrong, and how soon they need it",
		quiz: "what's happening, how old the system is, comfort problems, energy bills, and timing",
		score: {
			headline: "Is your home ready for the season?",
			categories: "system age, maintenance, comfort, energy bills"
		}
	},
	{
		id: "painting",
		noun: "painting company",
		label: "Painting or home improvement",
		match: /(paint|remodel|renovat|handyman|contractor|flooring|cabinet|drywall|deck|fence|pressure wash)/i,
		price: "inside or outside, how many rooms or how big the area, ceilings and trim, the condition and prep needed, and timing",
		quiz: "which part of the home, the style they want, how they'll use the space, budget comfort, and timing",
		score: {
			headline: "How ready is your home for a refresh?",
			categories: "wear and tear, style, how you use the space, upkeep"
		}
	},
	{
		id: "pest",
		noun: "pest control company",
		label: "Pest control",
		match: /(pest|termite|mosquito|rodent|exterminat)/i,
		price: "which pest, home size, one-time treatment or an ongoing plan, how bad it is, and timing",
		quiz: "what they're seeing, where, how long it's been happening, pets or kids at home, and timing",
		score: {
			headline: "How pest-proof is your home?",
			categories: "entry points, moisture, food and trash, yard"
		}
	},
	{
		id: "auto",
		noun: "auto detailer",
		label: "Auto detailing",
		match: /(detail|ceramic|paint correction|car wash|tint|ppf)/i,
		price: "vehicle size, the package (wash, interior, full detail, coating), the car's condition, pet hair, and add-ons",
		quiz: "how they use the car, what bothers them most, how long they want it to stay clean, budget comfort, and timing",
		score: {
			headline: "How protected is your car's finish?",
			categories: "washing habits, parking and weather, interior, protection"
		}
	},
	{
		id: "pet",
		noun: "pet care business",
		label: "Pet grooming or pet care",
		match: /(pet|dog|cat|groom|daycare|boarding|kennel)/i,
		price: "which service (grooming, daycare, boarding), pet size, coat type, how often, and add-ons",
		quiz: "their pet's size, energy and coat, what they need help with, schedule, and budget comfort",
		score: {
			headline: "How happy is your pet's routine?",
			categories: "exercise, grooming, care while you're away, health habits"
		}
	},
	{
		id: "photography",
		noun: "photographer",
		label: "Photography",
		match: /(photo|portrait|headshot|videograph)/i,
		price: "the kind of shoot, how many hours, how many people, how many locations, and prints or albums",
		quiz: "the occasion, the style they love, how many people, where, and their date",
		score: {
			headline: "Are you ready for your photo day?",
			categories: "planning, outfits, location, comfort on camera"
		}
	},
	{
		id: "solar",
		noun: "solar company",
		label: "Solar or energy upgrades",
		match: /(solar|battery storage|energy efficien|ev charger)/i,
		price: "home size, what they pay for power each month, roof type and direction, battery or not, and timing",
		quiz: "what they want most (lower bills, backup power, going green), their roof and home, how long they'll stay, budget comfort, and timing",
		score: {
			headline: "How energy smart is your home?",
			categories: "power bills, home and roof, appliances, backup power"
		}
	},
	{
		id: "events",
		noun: "wedding and event planner",
		label: "Weddings and events",
		match: /(wedding|event|planner|bridal|venue|catering|caterer|florist|dj\b)/i,
		price: "the kind of event, guest count, date and season, the level of help they want, and extras",
		quiz: "the kind of event, the vibe they want, guest count, how hands-on they want to be, budget comfort, and their date",
		score: {
			headline: "How ready is your wedding plan?",
			categories: "budget, vendors, timeline, guest details"
		}
	},
	{
		id: "real_estate",
		noun: "real estate agency",
		label: "Real estate or lending",
		match: /(real ?estate|realtor|realty|brokerage|mortgage|lender|loan officer|home buy)/i,
		price: "buying or selling, price range, area, timeline, and whether they're pre-approved",
		quiz: "buying or selling, the kind of home and area they want, must-haves, budget comfort, and timing",
		score: {
			headline: "How ready are you to buy a home?",
			categories: "savings and credit, budget, must-haves, timing"
		}
	},
	{
		id: "accounting",
		noun: "bookkeeping and tax business",
		label: "Accounting, bookkeeping or tax",
		match: /(account|bookkeep|\btax|cpa|payroll)/i,
		price: "business type, monthly transactions, number of accounts, payroll or not, and how far behind the books are",
		quiz: "their business type and size, what they handle themselves today, what stresses them most, and their deadlines",
		score: {
			headline: "How healthy are your business books?",
			categories: "record keeping, cash flow, taxes, payroll"
		}
	}
], me = {
	id: "general",
	label: "Other (general questions)",
	price: "size or scope, type or material, extras and timing",
	quiz: "what they want, their preferences, budget comfort and timing",
	score: null
};
function he(e) {
	return pe.find((t) => t.id === e) || me;
}
function ge(e) {
	let t = `${fe(e.business_type)} ${fe(e.name)}`;
	return (pe.find((e) => e.match.test(t)) || pe.find((t) => t.match.test(fe(e.preview_source).slice(0, 400))) || me).id;
}
var g = {
	title: "Use their real photos",
	text: "I've attached real photos of the business. Replace the stock images and photo placeholders with these, best photo in the biggest spot. Keep the layout. Don't add names or captions to people in the photos."
}, _ = {
	title: "Match their brand",
	text: "I've attached their logo. Put it in the header and footer, and update the colors across the whole design to match it. Keep the text readable and the buttons easy to see."
}, v = {
	title: "Check the facts",
	text: "Go through every sentence and list anything that isn't in the details I gave you at the start: claims about how they work, what's included, numbers, credentials, results. Then remove or reword each one so it only says what I gave you."
}, _e = {
	title: "Polish it on phones",
	text: "Check every page at phone width. Fix anything that's cramped, cut off, too small to read or hard to tap, and tell me what you changed."
}, ve = {
	title: "Connect their booking link",
	text: "Point every Book, Request and Schedule button to this link, opening in a new tab: "
}, y = {
	title: "Add the Meta Pixel",
	text: "Add the Meta Pixel with this ID to every public page, and fire a Lead event when someone submits a form. Pixel ID: "
}, b = {
	title: "Email me new leads",
	text: "Each time a new submission is saved, email me (the app owner) with their name, contact details, answers and the result they saw."
}, ye = {
	title: "Make it shorter",
	text: "Cut this down so it can be read in two minutes. Keep the strongest points, merge anything repetitive, and keep the next step at the end."
}, be = {
	title: "Add my offer",
	text: "Add a slide just before the next step that explains what I'd do for them, in plain words, based only on this: "
}, xe = {
	title: "Update the prices",
	text: "Replace the prices with these, update every total and range that uses them, and test the math again: "
}, Se = {
	website: [
		g,
		_,
		ve,
		v,
		_e
	],
	audit: [
		be,
		ye,
		_,
		v
	],
	instagram: [
		{
			title: "Turn the grid into real posts",
			text: "Make each of the 9 grid tiles a downloadable 1080 by 1350 image, same design and words, with a download button under each one."
		},
		g,
		_,
		v
	],
	landing: [
		g,
		_,
		ve,
		y,
		b,
		v
	],
	calculator: [
		{
			title: "Use their real numbers",
			text: "Replace the example numbers with these real ones, change the label to \"Your numbers\", and test the math again: "
		},
		_,
		_e
	],
	estimator: [
		xe,
		y,
		b,
		g,
		_
	],
	quiz: [
		y,
		b,
		g,
		_,
		v
	],
	assessment: [
		y,
		b,
		g,
		_,
		v
	],
	quote: [
		xe,
		ve,
		b,
		g,
		_
	],
	menu: [
		xe,
		ve,
		b,
		g,
		_
	],
	booking: [
		xe,
		b,
		y,
		g,
		_
	],
	savings: [
		{
			title: "Use their real numbers",
			text: "Replace the example assumptions with these, remove the \"Example assumption\" labels for anything I give you, and test the math again: "
		},
		y,
		b,
		_
	],
	budget: [
		{
			title: "Use their real splits",
			text: "Replace the example budget split with this, remove the example labels for anything I give you, and check the total still always adds up: "
		},
		y,
		b,
		_
	],
	affordability: [
		{
			title: "Use their real rates",
			text: "Use these rates and costs instead of the examples, keep the \"not advice or a pre-approval\" line, and test the payment math again: "
		},
		y,
		b,
		_
	],
	checklist: [
		{
			title: "Change the checklist",
			text: "Rewrite the checklist for this topic instead, keeping the same layout, groups and tips format: "
		},
		y,
		b,
		_,
		v
	],
	plan: [
		{
			title: "Change the plan type",
			text: "Change the plan to this instead, keeping the same questions-then-plan flow and building it without AI calls: "
		},
		y,
		b,
		_,
		v
	],
	referral: [
		{
			title: "Set the reward",
			text: "Change the reward everywhere it appears to this, and update the How it works steps to match: "
		},
		b,
		{
			title: "Add a QR code",
			text: "Add a printable page with a QR code for the referral sign-up page, sized for a counter card or a receipt, with the reward in one short line."
		},
		_,
		v
	],
	package: [
		xe,
		b,
		g,
		_,
		v
	]
}, Ce = /* @__PURE__ */ t({
	SPEAKERS: () => Te,
	VOICE: () => we,
	voiceFor: () => Ee
}), we = {};
we.text = "Conversational expert copy\"\n\nPasted by Suzy on 2026-10-11 as the voice for all copy the tools write.\nNote for the Ads tool: the original is written for a marketer talking to a business owner.\nIn client ads, the \"expert\" becomes the business (owner or provider) talking to its own customer.\n\nConversational expert copy\nWrite copy that sounds like a very smart marketer talking directly to a business owner on a call.\nThey know the market. They have seen the problem before. They are explaining what they genuinely think in clear, natural language.\nThe voice should feel human and conversational, but not overly casual.\nThink: experienced expert speaking naturally\nNOT: copywriter writing an ad\nNOT: friend chatting on FaceTime\nNOT: corporate consultant presenting a recommendation\nThe writing should feel like something the client could actually hear you say on a strategy call.\n\n## Inputs\nBefore writing, use the information provided in the prompt or conversation to understand:\n1. The business, offer, product, or service.\n2. The target customer or segment.\n3. The customer's actual problems, situations, objections, priorities, and language.\n4. The angle or idea being explored.\n5. Any facts, proof, examples, numbers, or claims that are explicitly provided.\n6. Any vocabulary, terminology, or wording preferences provided.\n\nOnly use factual claims, proof, numbers, guarantees, or offer details that have actually been provided.\nNever invent: statistics, results, customer quotes, testimonials, features, offer details, guarantees, proof, business circumstances presented as fact.\nIf something has not been provided, do not manufacture it to make the copy stronger.\n\n## The central rule\nDo not try to make the copy sound impressive.\nStart with the most useful or interesting observation you would naturally make if the business owner described this situation to you.\nLet the insight carry the copy. The sentence itself can be simple.\nToo written: \"Cheap leads are expensive.\"\nBetter: \"A low cost per lead does not mean much if those leads are not turning into appointments.\"\nBetter still when the situation supports it: \"If your cost per lead looks great but hardly any of those people are booking, I would not increase the ad budget yet.\"\nThe third version contains judgment. It sounds like an experienced person actually responding to the situation.\n\n## Voice\nShould be: conversational, intelligent, calm, direct, specific, confident without being absolute, observant, practical, human, easy to follow, naturally opinionated when appropriate.\nShould NOT be: chatty, overly casual, slang-heavy, polished for effect, slogan-like, dramatic, rehearsed, corporate, academic, copywriter-y, LinkedIn-style, AI trying to imitate a person.\n\n## Natural spoken language\nUse contractions naturally: I'd, you're, we're, that's, doesn't, wouldn't. Prefer normal spoken vocabulary.\nGood: \"The first thing I'd look at is what happens after the lead comes in.\"\nNot: \"The first thing I would evaluate is your post-acquisition conversion infrastructure.\"\nGood: \"If you're already getting enough inquiries, more traffic may not be where I'd start.\"\nNot: \"Like, honestly, I wouldn't even worry about more leads right now.\"\nThe copy should sound spoken without relying on verbal filler.\n\n## Avoid casual filler by default\nDo NOT routinely use: like, honestly, I mean, okay, okay wait, kinda, basically, literally, you know, super, crazy, totally.\nThese can occasionally appear if they genuinely fit the established voice, but they are not default devices for making copy sound human.\nHuman does not mean casual. Human means the sentence follows the way a person naturally thinks and speaks.\n\n## Use first-person judgment\nEncouraged when it makes the copy more believable: \"I'd look at...\", \"I'd want to know...\", \"I wouldn't increase spend yet.\", \"The first place I'd look is...\", \"Before changing the ads, I'd check...\", \"If this were my account, I'd...\", \"What I'd pay attention to is...\"\nThese work because they sound like advice, not advertising. Do not force first person into every hook.\n\n## Observations over declarations\nToo ad-like: \"Your marketing system is broken.\"\nBetter: \"If leads are coming in but appointments are still inconsistent, there is probably something happening after the lead comes in that needs attention.\"\nToo dramatic: \"You're throwing money away on bad leads.\"\nBetter: \"If a large percentage of your leads are never contacted or never book, increasing lead volume can make the numbers worse without fixing the underlying issue.\"\n\n## Talk about what actually happens\nGround the idea in a recognizable business moment.\n\"Your agency can show you a strong cost per lead. But if nobody can tell you how many of those leads actually became treatment revenue, you still don't know whether the campaign is profitable.\"\n\"If the front desk is following up with new inquiries when they have time, I would look at that before assuming the ads need to change.\"\n\"A promotion can fill open appointments quickly. The part I'd pay attention to is what those patients do after the initial offer.\"\nDo not invent a scene simply to make the copy vivid. Only use situations supported by the information provided or reasonably inherent to the business process.\n\n## Let the thought breathe\nToo compressed: \"More leads won't fix broken follow-up.\"\nBetter: \"If the leads you already have are not being followed up consistently, bringing in more of them is unlikely to solve the problem.\"\nToo polished: \"The gap between a lead and a patient is where revenue disappears.\"\nBetter: \"Getting the lead is only the first step. You still need someone to contact them, book them, get them to show up, and ultimately convert them into a patient.\"\nPlain is good when the thinking is good.\n\n## Never\nClever endings, punchlines, slogans, neat reversals, forced metaphors, dramatic one-liners, manufactured controversy, fake provocations, rhetorical questions written only for effect, fake specificity, fake scenes, fake numbers, fake quotes, made-up offer details, em dashes, language designed primarily to sound quotable.\nAvoid these structures as default devices: \"X isn't the problem. Y is.\" / \"It's not X. It's Y.\" / \"You don't need X. You need Y.\" / \"Here's the truth.\" / \"The reality is...\" / \"What nobody tells you...\" / \"The secret is...\" / \"This changes everything.\" / \"Most agencies...\" / \"Stop doing X.\" / \"Imagine...\" / \"Picture this...\"\nA natural contrast is fine when that is genuinely the idea. Do not force every insight into a contrast formula.\n\n## Do not manufacture direct response\nAvoid constantly trying to create curiosity, shock the reader, challenge conventional wisdom, call out mistakes, manufacture pain.\nSometimes the strongest opening is simply a useful observation.\n\"If you're already spending consistently on marketing, I'd want to understand what happens between the lead coming in and the patient actually showing up before increasing the budget.\"\n\n## Use the customer's world\nUse the nouns, situations, decisions, and problems this customer actually encounters, in the terminology natural to the industry (consultation, treatment, provider capacity, front desk, lead follow-up, appointment, no-show, treatment revenue, ad spend, agency reporting).\nPrefer concrete language over vague abstractions (growth, scale, optimization, success, results, transformation). Use abstract terms only when they are genuinely the clearest words.\n\n## Different levels of directness\n1. Observation: \"A low cost per lead can look great in a report and still produce very little treatment revenue.\"\n2. Expert judgment: \"If your providers are already close to capacity, I would not automatically increase the ad budget.\"\n3. Diagnosis: \"When leads are coming in but appointments are inconsistent, I usually want to look at follow-up before changing the campaign.\"\n4. Situation: \"If you're getting plenty of inquiries but your team is still struggling to keep the calendar full, something is getting lost between the lead and the appointment.\"\n5. Before-you-do-that: \"Before putting more money into ads, I'd want to know how many of the leads you're already paying for are actually being contacted.\"\n6. Clarification: \"When someone says they have a lead quality problem, I'd want to know what that actually means. Are people not responding, not booking, not showing, or not buying?\"\n7. Outcome-led observation: \"The goal is not simply to generate more inquiries. It's to generate patients who actually book, show up, and buy the treatments you want to grow.\"\nUse these as ways of thinking, not rigid templates.\n\n## Headlines\nSlightly tighter than spoken hooks, but still something a human would say. Avoid slogan writing.\nToo polished: \"Turn Leads Into Loyal Patients\" / Better: \"What happens after the lead comes in matters just as much as the ad\"\nToo generic: \"Get More High-Quality Patients\" / Better: \"How to tell whether your marketing is actually driving treatment revenue\"\nClarity matters more than cleverness.\n\n## Process\n1. Identify the exact segment. 2. Identify the real situation. 3. Identify what the customer likely already understands. 4. Identify the useful observation or judgment. 5. Identify the relevant angle. 6. Identify any proof or factual claims that have actually been provided. 7. Write the idea in plain English first. 8. Turn it into natural spoken copy. 9. Remove unnecessary polish. 10. Remove casual filler. 11. Remove obvious copywriting devices. 12. Verify that every factual claim comes from information actually provided.\nThen read the line aloud mentally. Ask: Would an experienced marketer actually say this to a client on a strategy call? Does it sound natural without relying on slang? Is the IDEA interesting, or is the wording trying to make it interesting? Could this have been written for almost any industry? Am I saying something useful? Am I inventing anything that was not provided? If the answer is wrong, rewrite it.\n\n## Output per angle\n5 conversational hooks, each a genuinely different entry point:\n1. real situation / circumstance 2. diagnosis 3. expert judgment / what I'd examine 4. belief or instinct worth validating or reframing 5. before-you-do-that / decision point\nDo not merely rewrite the same premise five ways.\n3 headlines: clear, specific, concise, and human.\n3 opening/body directions: each one short natural paragraph showing how the argument could continue. They should differ strategically (explain the mechanism / use available proof or a provided example / address the most relevant objection). Do not write three paraphrases.";
var Te = {
	client_ads: "WHO IS SPEAKING IN THIS COPY\nThe voice guide below was written for a marketer talking to a business owner. For these ads, switch the roles and keep every rule:\n- The speaker is the business itself (the owner, provider or team), talking to a potential customer.\n- The reader is that customer, not a business owner. Use the customer's world: their situation, their questions, their hesitations, the decision they're making.\n- Never talk about marketing, leads, ad spend, agencies or the business's own numbers in the ads.\n- \"I'd\" and \"we'd\" judgment lines become the business's honest view, like \"Before recommending a treatment, we'd want to see what your skin is doing right now.\"",
	outreach: "WHO IS SPEAKING IN THIS COPY\nThe speaker is a freelance marketer. The reader is a local business owner. This is exactly the situation the voice guide below describes. Keep it short enough for a first message.",
	client_update: "WHO IS SPEAKING IN THIS COPY\nThe speaker is a freelance marketer who runs this business's ads. The reader is the business owner, her client. This is exactly the situation the voice guide below describes. Use the real numbers only.",
	member: "WHO IS SPEAKING IN THIS COPY\nThe speaker is an experienced marketer and mentor talking to a beginner freelancer about her own offer. Any line the freelancer will say to a business owner (her one-sentence description, her pitch) is written as her talking to that owner, following the guide exactly as written.\nKeep it easy for a beginner to follow. If you use a marketing term, explain it in plain words."
};
function Ee(e) {
	return `${Te[e]}

VOICE GUIDE (follow it closely)
${we.text}`;
}
//#endregion
//#region src/lib/offerPrompts.js
var De = /* @__PURE__ */ t({
	AI_VOICE_RULES: () => Oe,
	BANNED_WORDS: () => Re,
	buildOfferPrompt: () => Ie,
	buildRefinePrompt: () => Le,
	cleanText: () => S,
	finalizeBuildResult: () => He,
	finalizeRefineResult: () => Ue
}), Oe = `FRAMING
- Frame the freelancer's future clients as real, successful businesses that want to grow. Never as struggling or broken businesses that need rescuing.
- Never condescending. Always in their corner.
- Do not use em dashes or en dashes. Use commas or periods.

${Ee("member")}

HONESTY
- Never invent credentials, years of experience, past clients, testimonials, or results.
- Never promise results. Describe what the service is designed to help with.
- Do not write any prices, dollar amounts, or percentages. Prices are added by the app.
- This is a recommended starting offer the freelancer will review and customize.`;
function ke(e) {
	return e === "has_clients" ? "They have had at least one paying client. Do not invent specific results, numbers, or client names. If they describe their own experience in About them, you may use exactly what they wrote. Never add to it." : e === "no_clients" ? "They have practiced the skill but have no paying clients yet. Do not invent past clients or results. If they describe their own experience in About them, you may use exactly what they wrote. Never add to it." : "They are brand new and still learning the skill. Do not invent past clients, results, or experience. Keep everything extra simple. If they describe their own experience in About them, you may use exactly what they wrote. Never add to it.";
}
function Ae(e) {
	let t = se(e), n = (e.interested_services || []).filter((t) => t !== e.primary_service && (e.primary_service !== "combined" || t !== "meta_ads" && t !== "organic_social")).map((t) => t === "other" ? e.custom_service_name || "another service" : a[t]?.label).filter(Boolean), r = `Main service: ${t}.`;
	return e.primary_service === "other" && e.custom_service_details && (r += ` Their description: "${e.custom_service_details}".`), n.length && (r += ` They are also interested in: ${n.join(", ")}. Do NOT add those to the package. You may mention once, in your_fit, that they could add one later.`), r;
}
function je(e) {
	return e.categories.map((e) => `${e.name}: ${e.items.join("; ")}`).join(" | ");
}
var x = { type: "string" }, Me = {
	type: "array",
	items: x
}, Ne = {
	type: "object",
	properties: {
		package_name: x,
		categories: {
			type: "array",
			items: {
				type: "object",
				properties: {
					name: x,
					items: Me
				},
				required: ["name", "items"]
			}
		},
		not_included: Me
	},
	required: [
		"package_name",
		"categories",
		"not_included"
	]
};
function Pe({ includePackage: e, includeRefineFields: t }) {
	let n = {
		positioning: {
			type: "object",
			properties: {
				summary: x,
				client_thinking: x,
				they_dont_want: Me,
				they_need: x,
				your_fit: x
			},
			required: [
				"summary",
				"client_thinking",
				"they_dont_want",
				"they_need",
				"your_fit"
			]
		},
		selling: {
			type: "object",
			properties: {
				plain_explanation: x,
				layers: {
					type: "array",
					items: {
						type: "object",
						properties: {
							name: x,
							text: x
						},
						required: ["name", "text"]
					}
				},
				i_help: Me
			},
			required: [
				"plain_explanation",
				"layers",
				"i_help"
			]
		},
		offer: {
			type: "object",
			properties: {
				name_options: {
					type: "array",
					items: {
						type: "object",
						properties: {
							name: x,
							why: x
						},
						required: ["name", "why"]
					}
				},
				recommended_name: x,
				statement: x,
				method: {
					type: "object",
					properties: {
						name: x,
						steps: {
							type: "array",
							items: {
								type: "object",
								properties: {
									name: x,
									text: x
								},
								required: ["name", "text"]
							}
						}
					},
					required: ["name", "steps"]
				}
			},
			required: [
				"name_options",
				"recommended_name",
				"statement",
				"method"
			]
		},
		talk: {
			type: "object",
			properties: {
				bio_line: x,
				one_sentence: x,
				spoken_30s: x
			},
			required: [
				"bio_line",
				"one_sentence",
				"spoken_30s"
			]
		},
		paper: {
			type: "object",
			properties: {
				tagline: x,
				who_its_for: x,
				description: x,
				next_step: x
			},
			required: [
				"tagline",
				"who_its_for",
				"description",
				"next_step"
			]
		},
		skills_note: x,
		terms: {
			type: "array",
			items: {
				type: "object",
				properties: {
					term: x,
					meaning: x
				},
				required: ["term", "meaning"]
			}
		}
	};
	return e && (n.package = Ne), t && (n.price = { type: "number" }, n.change_summary = x), {
		type: "object",
		properties: n,
		required: Object.keys(n)
	};
}
var Fe = "WHAT TO WRITE (fill every field)\n\nWHO IS SPEAKING (follow exactly)\n- positioning: you (the strategist) talking TO the freelancer ABOUT her future clients. Refer to clients in third person (\"Med spa owners want...\"). Never write \"I help\" here, and never address the business owner as \"you\".\n- selling: the freelancer describing her own service in first person (\"I set up...\", \"I help med spas...\"). Refer to clients in third person. Never address the business owner as \"you\".\n- offer.statement and offer.method: describe the service in third person or first person (\"I set up...\"), never addressing the business owner as \"you\".\n- talk: the freelancer speaking out loud in first person. In spoken_30s she is talking to a business owner, so \"you\" is fine there.\n- paper: client-facing. Speak to the business owner as \"you\" and \"your business\".\n\npositioning\n- summary: 2 sentences on who they help and what those businesses usually want.\n- client_thinking: what this business owner is quietly thinking, in their own words, as a short quote (1 to 2 sentences).\n- they_dont_want: 3 short things this business owner does NOT want from a freelancer.\n- they_need: 1 to 2 sentences on what they actually need.\n- your_fit: 2 sentences speaking to the freelancer as \"you\": why this service fits these clients, and what makes her a good choice (use what she wrote about herself if given; otherwise focus on care, focus, and consistency, never on invented experience).\n\nselling\n- plain_explanation: 2 sentences, the freelancer explaining her service to a friend in first person.\n- layers: exactly 3, in this order and with these names: \"What you do\", \"What the client gets\", \"What it helps improve\". One sentence each.\n- i_help: 3 statements that each start with \"I help\" and name the type of business. Under 20 words each.\n\noffer\n- name_options: exactly 3 simple, clear offer names (2 to 5 words, no puns). Each with one short \"why\".\n- recommended_name: one of the 3 names, exactly as written.\n- statement: 2 sentences. For [type of business] who wants [what they want]. Plain and confident.\n- method: a simple name for how they work (for example \"The Steady Growth Method\") and exactly 3 steps, each with a short name and one sentence. Steps must match the package (for example: set up, create, review and improve).\n\ntalk\n- bio_line: one line for an Instagram or LinkedIn bio. Under 15 words.\n- one_sentence: \"I help [type of business] [do what] so they can [result].\" Under 30 words.\n- spoken_30s: how they would explain it out loud on a call, about 70 words, natural and relaxed.\n\npaper (this goes on a client-facing one-page document)\n- tagline: under 10 words.\n- who_its_for: one sentence starting \"For\".\n- description: 2 sentences, under 45 words, about what the service does for the business.\n- next_step: one friendly sentence inviting the business to reach out. No contact details.\n\nskills_note: if the service is not Paid Ads, Social Media & Content, or both together, 1 to 2 sentences naming the skills or training they will need before delivering it, because the SheFreelances course does not cover it. Otherwise an empty string.\n\nterms: up to 4 marketing terms used anywhere above that a beginner may not know, each with a plain meaning under 12 words. Empty list if none.";
function Ie(e, t) {
	let n = e.primary_service === "other", r = c[e.primary_service], a = (e.about_me || "").trim(), o = n ? "PACKAGE: Also create a small, beginner-level monthly package for this service in \"package\": a package_name, 3 or 4 categories with 1 to 3 items each (be specific, include quantities where it helps), and 4 to 5 things not included (always include \"Guaranteed results\"). Do not make it bigger than one beginner can deliver alone." : `PACKAGE (already decided, do not change it): ${r.package_name}. ${je(r)}. Write everything so it matches this package exactly. Do not add services.`;
	return {
		prompt: `You are the offer strategist inside SheFreelances AI. You help a beginner freelancer turn simple choices into a clear, professional, beginner-level offer.

THE FREELANCER
- Name: ${ce(t) || "the freelancer"}
- Experience: ${i[e.experience_level]?.label || "Brand new"}. ${ke(e.experience_level)}
- ${Ae(e)}
- Who they want to help: ${h(e)}${e.niche_is_broad ? " (a broad group by choice. Keep the offer broad: use 2 or 3 concrete example business types to make it feel real, but do not narrow it to one niche)" : ""}
- About them, in their own words (may be empty): "${a}"

${o}

${Fe}

${Oe}`,
		response_json_schema: Pe({
			includePackage: n,
			includeRefineFields: !1
		})
	};
}
function Le(e, t, n) {
	let r = {
		positioning: e.record.positioning,
		selling: e.record.selling,
		offer: e.record.offer,
		talk: e.record.talk,
		paper: e.record.paper,
		skills_note: e.record.skills_note,
		terms: e.record.terms,
		package: e.package,
		price: e.price
	};
	return {
		prompt: `You are the offer strategist inside SheFreelances AI. A beginner freelancer has an offer and wants a change.

THE FREELANCER
- Experience: ${i[e.experience_level]?.label || "Brand new"}. ${ke(e.experience_level)}
- ${Ae(e)}
- Who they help: ${h(e)}

CURRENT OFFER (JSON):
${JSON.stringify(r)}

THEIR REQUEST: "${n}"

RULES
- Return the COMPLETE offer in the same structure, with the change applied everywhere it matters.
- Change only what the request needs. Keep everything else exactly as it is.
- package: return the package. Only change it if the request is about what's included. Keep it beginner-level. If you remove or add items, update the method, talk, and paper text to match.
- price: return the current price (${re(e.price)} = ${e.price}) unless the request clearly asks for a different price. Never change the price on your own.
- change_summary: one or two sentences telling them what you changed.
- If the request asks for something dishonest (fake results, testimonials, guarantees), keep the offer honest and say so in change_summary.

${Fe}

${Oe}`,
		response_json_schema: Pe({
			includePackage: !0,
			includeRefineFields: !0
		})
	};
}
var Re = [
	[/\belevat(e|es|ed|ing)\b/gi, "grow"],
	[/\bleverag(e|es|ed|ing)\b/gi, "use"],
	[/\bunlock(s|ed|ing)?\b/gi, "get"],
	[/\btransform(s|ed|ing)?\b/gi, "change"],
	[/\bempower(s|ed|ing)?\b/gi, "help"],
	[/\bsynergy\b/gi, "teamwork"],
	[/\bgame[- ]changer\b/gi, "big help"],
	[/\baligned\b/gi, "matched"]
];
function ze(e, t) {
	return e[0] === e[0].toUpperCase() ? t[0].toUpperCase() + t.slice(1) : t;
}
function S(e) {
	let t = String(e || "").replace(/\s*[\u2014\u2013]\s*/g, ", ").replace(/\s+,/g, ",");
	for (let [e, n] of Re) t = t.replace(e, (e) => ze(e, n));
	return t.trim();
}
function Be(e) {
	return typeof e == "string" ? S(e) : Array.isArray(e) ? e.map(Be) : e && typeof e == "object" ? Object.fromEntries(Object.entries(e).map(([e, t]) => [e, Be(t)])) : e;
}
function Ve(e) {
	if (!e || !Array.isArray(e.categories)) return null;
	let t = e.categories.filter((e) => e && e.name && Array.isArray(e.items) && e.items.length).slice(0, 4).map((e) => ({
		name: e.name,
		items: e.items.slice(0, 4)
	}));
	if (!t.length) return null;
	let n = Array.isArray(e.not_included) ? e.not_included.slice(0, 6) : [];
	return n.some((e) => /guarantee/i.test(e)) || n.push("Guaranteed results"), {
		package_name: e.package_name || "Monthly Package",
		billing: "monthly",
		categories: t,
		not_included: n
	};
}
function He(e, t) {
	let n = Be(e), r = (n.offer?.name_options || []).map((e) => e.name), i = r.includes(n.offer?.recommended_name) ? n.offer.recommended_name : r[0] || "My Offer", a = t.primary_service === "other" ? Ve(n.package) || {
		package_name: "Monthly Package",
		billing: "monthly",
		categories: [],
		not_included: ["Guaranteed results"]
	} : JSON.parse(JSON.stringify(c[t.primary_service])), { package: o, ...s } = n;
	return {
		record: s,
		package: a,
		selected_name: i
	};
}
function Ue(e, t, n) {
	let { package: r, price: i, change_summary: a, ...o } = Be(e), s = /\$|\d{3,}|price|charge|cost|rate/i.test(n || "") && Number(i) > 0 ? Math.round(Number(i)) : t.price, c = (o.offer?.name_options || []).map((e) => e.name), l = c.includes(t.selected_name) ? t.selected_name : c.includes(o.offer?.recommended_name) ? o.offer.recommended_name : c[0] || t.selected_name;
	return {
		record: o,
		package: Ve(r) || t.package,
		price: s,
		selected_name: l,
		change_summary: a || "Updated."
	};
}
//#endregion
//#region src/lib/offerLogic.js
var We = /* @__PURE__ */ t({
	buildPriceExplanation: () => Ke,
	buildScopeOfWork: () => Je,
	formatMoney: () => re,
	getPaperData: () => qe,
	offerToText: () => Ye,
	paperToText: () => Xe,
	scopeOfWorkToText: () => Ze
});
function Ge(e) {
	let t = e.map((e) => e.charAt(0).toLowerCase() + e.slice(1));
	return t.length <= 1 ? t.join("") : `${t.slice(0, -1).join(", ")}, and ${t[t.length - 1]}`;
}
function Ke(e) {
	let t = e.package || {}, n = (t.categories || []).map((e) => e.items[0]).filter(Boolean), r = `My ${String(t.package_name || "monthly package").toLowerCase()} is ${ue(e.price)}. It includes ${Ge(n)}.`;
	return le(e.primary_service) && (r += " Your ad budget is separate. You pay Meta directly for the ads, so you always control how much you spend."), r;
}
function qe(e, t, n = {}) {
	let r = e.record?.paper || {}, i = {
		offer_name: e.selected_name || "",
		tagline: r.tagline || "",
		who_its_for: r.who_its_for || "",
		description: r.description || "",
		next_step: r.next_step || "",
		freelancer_name: ce(t),
		contact: "",
		...Object.fromEntries(Object.entries(n || {}).filter(([, e]) => e != null))
	};
	return i.categories = e.package?.categories || [], i.price = ue(e.price), i.price_note = le(e.primary_service) ? "Ad spend is paid separately, directly to Meta." : "", i;
}
function Je(e, t) {
	let n = e.package || {
		categories: [],
		not_included: []
	}, r = u[e.primary_service] || u.other;
	return {
		title: `Scope of Work: ${e.selected_name || n.package_name}`,
		prepared_line: `Prepared by ${ce(t)} for [Client Business Name]`,
		sections: [
			{
				title: "Service",
				items: [`${se(e)} for ${h(e)}.`]
			},
			...n.categories.map((e) => ({
				title: `Included: ${e.name}`,
				items: e.items
			})),
			{
				title: "Not included",
				items: [...n.not_included || [], "Anything not listed here is quoted separately before work starts."]
			},
			{
				title: "Client responsibilities",
				items: r
			},
			{
				title: "Revisions",
				items: ["1 round of revisions per deliverable."]
			},
			{
				title: "Communication",
				items: ["Replies within 1 business day, Monday to Friday."]
			},
			{
				title: "Investment",
				items: [
					ue(e.price) + (le(e.primary_service) ? " (management fee). Ad spend is paid separately, directly to Meta." : "."),
					"Payment terms: [e.g., billed monthly in advance]",
					"Start date: [Start date]",
					"Cancellation: [e.g., 30 days written notice]"
				]
			}
		],
		footer: "This is a plain-language scope of work so everyone knows what's included. It is not a legal contract. Use a proper contract for payment and legal terms."
	};
}
function Ye(e) {
	let t = e.record || {}, n = [];
	return n.push("YOUR POSITIONING", t.positioning?.summary, `"${t.positioning?.client_thinking}"`, "What they don't want:"), (t.positioning?.they_dont_want || []).forEach((e) => n.push(`- ${e}`)), n.push(`What they need: ${t.positioning?.they_need}`, t.positioning?.your_fit, ""), n.push("WHAT YOU'RE SELLING", t.selling?.plain_explanation), (t.selling?.layers || []).forEach((e) => n.push(`${e.name}: ${e.text}`)), (t.selling?.i_help || []).forEach((e) => n.push(`- ${e}`)), n.push("", "YOUR OFFER", e.selected_name, t.offer?.statement, "What's included:"), (e.package?.categories || []).forEach((e) => {
		n.push(e.name), e.items.forEach((e) => n.push(`- ${e}`));
	}), n.push(`How it works: ${t.offer?.method?.name}`), (t.offer?.method?.steps || []).forEach((e, t) => n.push(`${t + 1}. ${e.name}: ${e.text}`)), n.push(`Price: ${ue(e.price)}`, ""), n.push("HOW TO TALK ABOUT IT", `Bio: ${t.talk?.bio_line}`, `One sentence: ${t.talk?.one_sentence}`, `30 seconds: ${t.talk?.spoken_30s}`, `Price: ${Ke(e)}`), n.filter((e) => e != null).join("\n");
}
function Xe(e) {
	let t = [
		e.offer_name,
		e.tagline,
		"",
		e.who_its_for,
		e.description,
		"",
		"What's included"
	];
	return e.categories.forEach((e) => {
		t.push(e.name), e.items.forEach((e) => t.push(`- ${e}`));
	}), t.push("", `Investment: ${e.price}`), e.price_note && t.push(e.price_note), t.push("", e.next_step, `${e.freelancer_name}${e.contact ? ` | ${e.contact}` : ""}`), t.join("\n");
}
function Ze(e) {
	let t = [
		e.title,
		e.prepared_line,
		""
	];
	return e.sections.forEach((e) => {
		t.push(e.title.toUpperCase()), e.items.forEach((e) => t.push(`- ${e}`)), t.push("");
	}), t.push(e.footer), t.join("\n");
}
//#endregion
//#region src/lib/sampleOffers.js
var Qe = /* @__PURE__ */ t({
	SAMPLE_OFFERS: () => $e,
	fallbackSamples: () => rt,
	getSample: () => C,
	sampleForIdea: () => at,
	sampleGroupsFor: () => et,
	sampleMenuText: () => nt,
	sampleOptions: () => ot,
	samplesFor: () => tt,
	withArticle: () => st
}), $e = [
	{
		id: "S05",
		group: "organic",
		name: "Sample carousel",
		receive: "One fully written 5 to 7 slide carousel, ideally designed",
		best: "A topic that benefits from a visual explanation"
	},
	{
		id: "S06",
		group: "organic",
		name: "Existing post rework",
		receive: "One alternative version of a selected public post, with stronger messaging or structure",
		best: "An identifiable opportunity to clarify an existing message"
	},
	{
		id: "S07",
		group: "organic",
		name: "Three hooks for existing content",
		receive: "Three hooks for a specific video, topic or content idea",
		best: "Strong subject matter with room to experiment with the opening"
	},
	{
		id: "S08",
		group: "organic",
		name: "Five personalized content ideas",
		receive: "Five topics with formats and one-line descriptions",
		best: "A business with multiple services, FAQs or interesting expertise to showcase"
	},
	{
		id: "S09",
		group: "organic",
		name: "One-week content preview",
		receive: "Three coordinated posts, including a Reel, carousel and B-roll concept",
		best: "A prospect interested in understanding what a content service could look like"
	},
	{
		id: "S10",
		group: "organic",
		name: "Content repurposing sample",
		receive: "One existing topic turned into three distinct formats",
		best: "A business with valuable source material that could be used in additional ways"
	},
	{
		id: "S11",
		group: "organic",
		name: "FAQ content concept",
		receive: "A real, publicly documented customer question turned into educational content",
		best: "Services that benefit from answering questions before a purchase"
	},
	{
		id: "S12",
		group: "organic",
		name: "Service spotlight concept",
		receive: "One post or Reel presenting a specific service, its benefits and appropriate next step",
		best: "A business with several services or products worth highlighting"
	},
	{
		id: "A04",
		group: "ads",
		name: "Three ad creative concepts",
		receive: "Three distinct ad ideas, each with a hook, visual and message",
		best: "Opportunity to explore additional creative approaches"
	},
	{
		id: "A05",
		group: "ads",
		name: "Existing ad rework",
		receive: "An alternative execution of one visible ad, keeping the verified offer details",
		best: "An existing ad that could inspire a different creative test"
	},
	{
		id: "A06",
		group: "ads",
		name: "Three ad hooks + creative directions",
		receive: "Three distinct opening hooks, each paired with a specific visual",
		best: "A business with an offer that could be introduced in several ways"
	},
	{
		id: "A07",
		group: "ads",
		name: "Ad carousel concept",
		receive: "One 4 to 6 card ad carousel with slide copy and visuals",
		best: "Multiple benefits, products or process steps"
	},
	{
		id: "A08",
		group: "ads",
		name: "Offer-focused ad concept",
		receive: "One complete ad presenting an existing service or confirmed promotion",
		best: "An offer that could be communicated through another creative approach"
	},
	{
		id: "A09",
		group: "ads",
		name: "UGC-style ad script",
		receive: "A short creator-style script with visuals, spoken copy and CTA",
		best: "Products or services suited to a demonstration or firsthand explanation"
	},
	{
		id: "A10",
		group: "ads",
		name: "Ad-to-landing-page concept",
		receive: "One proposed ad paired with matching landing page hero copy",
		best: "An observable opportunity to align messaging between ad and destination"
	},
	{
		id: "X01",
		group: "support",
		name: "Landing page hero concept",
		receive: "A proposed headline, subheadline, visual direction and CTA",
		best: "Only when it fits your actual offer"
	},
	{
		id: "X02",
		group: "support",
		name: "Lead form concept",
		receive: "A suggested introduction and the right qualification questions",
		best: "Only when it fits your actual offer"
	},
	{
		id: "X03",
		group: "support",
		name: "Website section concept",
		receive: "One redesigned service or offer section",
		best: "Only when it fits your actual offer"
	},
	{
		id: "X04",
		group: "support",
		name: "Offer presentation concept",
		receive: "An alternative presentation of an existing, verified offer",
		best: "Only when it fits your actual offer"
	},
	{
		id: "X05",
		group: "support",
		name: "Simple campaign creative preview",
		receive: "A small set of coordinated assets showing how a campaign could look",
		best: "Only when it fits your actual offer"
	}
];
function C(e) {
	return $e.find((t) => t.id === String(e || "").toUpperCase()) || null;
}
function et({ offer: e, customPitch: t }) {
	let n = e?.primary_service;
	if (n === "meta_ads") return ["ads", "support"];
	if (n === "organic_social") return ["organic", "support"];
	if (n === "combined") return [
		"ads",
		"organic",
		"support"
	];
	let r = String(t || e?.custom_service_name || "").toLowerCase(), i = /\bad|ads\b|advertis|meta|facebook ads|paid/.test(r), a = /social|content|reel|post|instagram|tiktok|organic/.test(r);
	return i && !a ? ["ads", "support"] : a && !i ? ["organic", "support"] : [
		"ads",
		"organic",
		"support"
	];
}
function tt(e) {
	let t = et(e);
	return $e.filter((e) => t.includes(e.group));
}
function nt(e) {
	return tt(e).map((e) => `${e.id} | ${e.name} | They'd receive: ${e.receive} | Best for: ${e.best}`).join("\n");
}
function rt(e) {
	return tt(e).filter((e) => e.group !== "support").slice(0, 2).map((e) => ({
		id: e.id,
		why: ""
	}));
}
var it = [
	[/ugc|creator[- ]style|testimonial video|talking[- ]head/i, "A09"],
	[/landing[- ]page/i, "A10"],
	[/lead form|instant form/i, "X02"],
	[/website section|homepage section|services section/i, "X03"],
	[/ad carousel|carousel ad/i, "A07"],
	[/rework|redo|refresh|new version of (an|their|one)/i, "A05"],
	[/ad hooks?|hooks? for (their |an |the )?ads?/i, "A06"],
	[/static ad|ad mockup|mock[- ]?up|single ad|one ad|ad concept for|offer[- ]focused|ad built around|an ad /i, "A08"],
	[/ad concepts|ad ideas|ads? creative/i, "A04"],
	[/carousel/i, "S05"],
	[/spotlight|reel|video|b-roll/i, "S12"],
	[/hook/i, "S07"],
	[/one[- ]week|week of content|content preview/i, "S09"],
	[/repurpos/i, "S10"],
	[/faq|question/i, "S11"],
	[/content ideas|post ideas|topics/i, "S08"],
	[/post/i, "S06"]
];
function at(...e) {
	let t = e.filter(Boolean).join(" ");
	if (!t) return null;
	let n = it.find(([e]) => e.test(t));
	return n ? n[1] : null;
}
function ot(e) {
	let t = e || {}, n = String(t.offer_to_send || t.idea_detail || t.idea || "").replace(/==/g, ""), r = at(t.idea_detail, t.idea, t.offer_to_send), i = (t.samples || []).filter((e) => C(e.id)), a = [];
	return r && a.push({
		...C(r),
		why: "",
		rec: !0,
		fromIdea: !0,
		receive: n || C(r).receive
	}), i.forEach((e) => {
		a.some((t) => t.id === e.id) || a.push({
			...C(e.id),
			why: e.why,
			rec: !0
		});
	}), a.length || rt({ customPitch: t.pitch }).forEach((e) => a.push({
		...C(e.id),
		rec: !0
	})), tt({ customPitch: t.pitch }).forEach((e) => {
		a.some((t) => t.id === e.id) || a.push({ ...e });
	}), {
		ordered: a,
		chosen: t.chosen_by_user && t.chosen_samples?.[0] || a[0]?.id
	};
}
function st(e) {
	let t = String(e || "").toLowerCase();
	return `${/^[aeiou]/.test(t) ? "an" : "a"} ${t}`;
}
//#endregion
//#region src/lib/leadStatus.js
function ct(e) {
	return e?.contacted_at ? "Contacted" : e?.outreach ? "Message ready" : e?.analysis ? "Analyzed" : "Saved";
}
function lt(e) {
	let t = e?.analysis;
	return t ? t.fit ? `${t.fit} fit` : {
		high: "Strong fit",
		medium: "Good fit",
		low: "Weak fit"
	}[t.opportunity_level] || "" : "";
}
//#endregion
//#region src/lib/clientsLogic.js
var ut = /* @__PURE__ */ t({
	CLAUDE_ANALYSIS_PROMPT: () => "",
	SEARCH_MESSAGES: () => xt,
	TUTORIALS: () => vt,
	chainsHiddenText: () => Ct,
	displayDomain: () => gt,
	displayFacebook: () => _t,
	displayInstagram: () => yt,
	isAlreadySaved: () => ht,
	leadFit: () => lt,
	leadStage: () => ct,
	prospectFromResult: () => bt,
	savedMatchKeys: () => mt,
	searchSuggestions: () => dt,
	singularType: () => St
});
function dt(e) {
	if (!e?.niche) return {
		term: "",
		suggestions: []
	};
	let t = f.find((t) => t.label === e.niche);
	if (e.niche_is_broad && t) {
		let e = t.examples.split(",").map((e) => e.trim()).filter((e) => e && !/any type/i.test(e));
		return {
			term: "",
			suggestions: e.length ? e : [
				"Salons",
				"Dentists",
				"Gyms",
				"Restaurants"
			]
		};
	}
	return {
		term: e.niche,
		suggestions: []
	};
}
function ft(e) {
	try {
		return new URL(/^https?:\/\//i.test(e) ? e : `https://${e}`).hostname.replace(/^www\./, "").toLowerCase();
	} catch {
		return "";
	}
}
function pt(e) {
	return String(e || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");
}
function mt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) [
		n.dedupe_key,
		ft(n.website),
		pt(n.name)
	].filter(Boolean).forEach((e) => t.add(e));
	return t;
}
function ht(e, t) {
	return [
		e.dedupe_key,
		ft(e.website),
		pt(e.name)
	].filter(Boolean).some((e) => t.has(e));
}
function gt(e) {
	try {
		return new URL(e).hostname.replace(/^www\./, "");
	} catch {
		return e || "";
	}
}
function _t(e) {
	if (String(e || "").match(/profile\.php\?id=(\d+)/)) return "Facebook Page";
	let t = String(e || "").match(/facebook\.com\/(?:p|pages|pg)\/([^/?#]+)/i);
	if (t) return `facebook.com/${t[1].replace(/-\d{6,}$/, "")}`;
	let n = String(e || "").match(/facebook\.com\/([^/?#]+)/i);
	return n ? `facebook.com/${n[1]}` : e || "";
}
var vt = { facebookAds: "" };
function yt(e) {
	let t = String(e || "").match(/instagram\.com\/([^/?#]+)/i);
	return t ? `@${t[1]}` : e || "";
}
function bt(e, { businessType: t, location: n, offerId: r }) {
	return {
		name: e.name,
		website: e.website || "",
		website_checked: !!e.website_checked,
		phone: e.phone || "",
		email: e.email || "",
		email_source: e.email_source || "",
		email_verified: !!e.email,
		address: e.address || "",
		instagram: e.instagram || "",
		facebook: e.facebook || "",
		source_url: e.source_url || "",
		business_type: t,
		location: n,
		is_chain: !!e.is_chain,
		dedupe_key: e.dedupe_key || e.name.toLowerCase(),
		status: "new",
		offer_id: r || ""
	};
}
var xt = [
	"Searching the web for real businesses...",
	"Checking a few different neighborhoods...",
	"Making sure each website actually loads...",
	"Looking for email addresses on their websites...",
	"Almost done..."
];
function St(e) {
	let t = String(e || "").trim().toLowerCase();
	return /ies$/.test(t) ? t.replace(/ies$/, "y") : /(ss|us)$/.test(t) ? t : t.replace(/s$/, "");
}
function Ct(e, t) {
	let n = St(t) || "business";
	return e === 1 ? `1 ${n} chain or franchise hidden. They rarely hire beginners.` : `${e} ${n} chains or franchises hidden. They rarely hire beginners.`;
}
//#endregion
//#region src/lib/clientsAnalysis.js
var wt = /* @__PURE__ */ t({
	SOURCE_LABELS: () => Mt,
	adLibraryUrl: () => kt,
	analysisToText: () => Rt,
	buildAnalysisPrompt: () => Ft,
	facebookSearchUrl: () => At,
	finalizeAnalysis: () => Lt,
	getObservationOptions: () => Dt,
	includesAds: () => le,
	instagramSearchUrl: () => jt,
	observationLabels: () => Ot
}), Tt = [
	{
		id: "posts_consistently",
		label: "Posts consistently",
		group: "doing_well"
	},
	{
		id: "uses_reels",
		label: "Uses Reels or video",
		group: "doing_well"
	},
	{
		id: "good_photos",
		label: "Good photos",
		group: "doing_well"
	},
	{
		id: "unpolished_feed",
		label: "Feed looks unpolished or off-brand",
		group: "gap"
	},
	{
		id: "inconsistent",
		label: "Posts inconsistently",
		group: "gap"
	},
	{
		id: "no_video",
		label: "Almost no video",
		group: "gap"
	},
	{
		id: "weak_hooks",
		label: "Weak hooks (first lines don't grab you)",
		group: "gap"
	},
	{
		id: "no_cta",
		label: "No clear call to action",
		group: "gap"
	},
	{
		id: "little_proof",
		label: "Little proof (reviews, results)",
		group: "gap"
	},
	{
		id: "all_promo",
		label: "Almost everything is promotional",
		group: "gap"
	},
	{
		id: "little_education",
		label: "Little education or tips",
		group: "gap"
	},
	{
		id: "no_instagram",
		label: "Couldn't find their Instagram",
		group: "gap"
	}
], Et = [
	{
		id: "running_ads",
		label: "They're running ads right now",
		group: "doing_well"
	},
	{
		id: "not_running_ads",
		label: "Not running any ads",
		group: "gap"
	},
	{
		id: "weak_creative",
		label: "Ad images or videos look weak",
		group: "gap"
	},
	{
		id: "unclear_offer",
		label: "The ad's offer is unclear",
		group: "gap"
	},
	{
		id: "outdated_ads",
		label: "Ads look old or outdated",
		group: "gap"
	}
];
function Dt(e) {
	if (!e) return Tt;
	if (e.primary_service === "meta_ads") {
		let e = [
			"posts_consistently",
			"uses_reels",
			"good_photos",
			"unpolished_feed",
			"no_cta",
			"little_proof"
		];
		return [...Et, ...Tt.filter((t) => e.includes(t.id))];
	}
	return e.primary_service === "combined" ? [...Et, ...Tt] : Tt;
}
function Ot(e, t) {
	let n = Dt(t);
	return (e || []).map((e) => n.find((t) => t.id === e)?.label).filter(Boolean);
}
function kt(e) {
	let t = `"${String(e || "").replace(/"/g, "").trim()}"`;
	return `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&media_type=all&search_type=keyword_exact_phrase&q=${encodeURIComponent(t)}`;
}
function At(e, t) {
	return `https://www.google.com/search?q=${encodeURIComponent(`${e} ${t || ""} facebook`)}`;
}
function jt(e, t) {
	return `https://www.google.com/search?q=${encodeURIComponent(`${e} ${t || ""} instagram`)}`;
}
var Mt = {
	website: "Seen on their website",
	you_noticed: "You noticed",
	guess: "Our guess"
}, w = { type: "string" }, Nt = (e) => ({
	type: "array",
	items: {
		type: "object",
		properties: {
			[e]: w,
			evidence: w,
			source: {
				type: "string",
				enum: [
					"website",
					"you_noticed",
					"guess"
				]
			}
		},
		required: [
			e,
			"evidence",
			"source"
		]
	}
}), Pt = {
	type: "object",
	properties: {
		opportunity_level: {
			type: "string",
			enum: [
				"high",
				"medium",
				"low"
			]
		},
		opportunity_reason: w,
		doing_now: Nt("point"),
		where_you_could_help: Nt("gap"),
		pitch: {
			type: "object",
			properties: {
				what: w,
				angle: w,
				why: w,
				show_them: w
			},
			required: [
				"what",
				"angle",
				"why",
				"show_them"
			]
		},
		good_fit: {
			type: "object",
			properties: {
				verdict: {
					type: "string",
					enum: [
						"yes",
						"maybe",
						"no"
					]
				},
				why: w
			},
			required: ["verdict", "why"]
		}
	},
	required: [
		"opportunity_level",
		"opportunity_reason",
		"doing_now",
		"where_you_could_help",
		"pitch",
		"good_fit"
	]
};
function Ft({ offer: e, prospect: t, site: n, observations: r, research: i, notes: a }) {
	let o = (e?.package?.categories || []).map((e) => `${e.name}: ${e.items.join("; ")}`).join(" | "), s = Ot(r, e), c = n?.ok ? `WEBSITE (${n.url})
- Page title: ${n.title || "none"}
- Meta description: ${n.meta_description || "none"}
- Buttons and links asking visitors to act: ${(n.cta_links || []).join(" · ") || "none found"}
- Social links on the site: ${(n.social_links || []).join(" · ") || "none found"}
- Meta pixel installed (means they may run or have run Facebook/Instagram ads): ${n.uses_meta_pixel ? "yes" : "no"}
- Website text:
${n.text}` : `WEBSITE: could not be read (${n?.error || "no website on file"}). Do not describe their website.`;
	return {
		prompt: `You help a beginner freelance marketer decide whether a local business is worth pitching, and how.

THE FREELANCER'S OFFER
- Service: ${e ? se(e) : "freelance marketing"}
- Who she helps: ${e ? h(e) : "small businesses"}
- What's included: ${o || "not set"}

THE BUSINESS
- Name: ${t.name}
- Type and location: ${t.business_type}, ${t.location}
- Instagram on file: ${t.instagram || "none"}
- Facebook Page on file: ${t.facebook || "none"}

WHAT THE FREELANCER NOTICED HERSELF (treat as true, source "you_noticed"): ${s.length ? s.join("; ") : "she did not check"}
HER OWN RESEARCH, in her words or pasted from her own screenshot analysis (treat as things she noticed, source "you_noticed"):
${String(i || "").slice(0, 6e3) || "none"}
HER NOTES: ${a || "none"}

${c}

WHAT TO WRITE
- opportunity_level: "high" if there are clear gaps her service fixes and the business looks established; "low" if they already do this well or it's a poor fit; otherwise "medium".
- opportunity_reason: one or two sentences explaining the level in plain words.
- doing_now: 3 to 5 things the business is currently doing (good or bad).
- where_you_could_help: 2 to 4 specific gaps that HER service can actually help with. Never list something outside her offer.
- For every point in doing_now and where_you_could_help: evidence is a short exact phrase from the website, or what she noticed, or "" for guesses. source is "website" (only if the website text shows it), "you_noticed" (only if it is in her observations), or "guess" (anything else, such as things you expect but cannot see). Be strict: if it is not in the website text or her observations, it is a guess.
- pitch.what: the result she is selling, positioned for this business, in under 15 words. Write it as an outcome, not a line item from her package. Good: "Ads that turn people who already love your work into booked consultations." Bad: "Ads campaign setup and tracking."
- pitch.angle: one sentence she could actually say to the owner as her way in, based on a real observation. Compliment something real first, then name the opportunity.
- pitch.why: one sentence on why this will matter to them.
- pitch.show_them: one sentence on a small sample she could make and send so they can SEE the difference, using what she can make with her service (for example: "Mock up 2 ads using their real treatments and before-and-after photos" or "Redesign 3 of their posts to show what a polished, on-brand feed could look like").
- good_fit.verdict: "yes", "maybe", or "no", with a one-sentence why.

RULES
- Write for a beginner. Short sentences, plain words, no marketing jargon without a quick explanation.
- Frame the business as a real, successful business that could grow. Never insult them or call their marketing bad.
- Never invent facts, numbers, reviews, or results. If you don't know, it's a guess and must be labeled "guess".
- No em dashes or en dashes.

${Ee("member")}`,
		response_json_schema: Pt
	};
}
function It(e) {
	return typeof e == "string" ? S(e) : Array.isArray(e) ? e.map(It) : e && typeof e == "object" ? Object.fromEntries(Object.entries(e).map(([e, t]) => [e, It(t)])) : e;
}
function Lt(e, { site: t, observations: n, research: r }) {
	let i = It(e || {}), a = (e) => {
		let i = e.source;
		return i === "website" && !t?.ok && (i = "guess"), i === "you_noticed" && !(n || []).length && !String(r || "").trim() && (i = "guess"), [
			"website",
			"you_noticed",
			"guess"
		].includes(i) || (i = "guess"), {
			...e,
			source: i,
			evidence: i === "guess" ? "" : e.evidence || ""
		};
	};
	return {
		opportunity_level: [
			"high",
			"medium",
			"low"
		].includes(i.opportunity_level) ? i.opportunity_level : "medium",
		opportunity_reason: i.opportunity_reason || "",
		doing_now: (i.doing_now || []).slice(0, 5).map(a),
		where_you_could_help: (i.where_you_could_help || []).slice(0, 4).map(a),
		pitch: {
			what: "",
			angle: "",
			why: "",
			show_them: "",
			...i.pitch || {}
		},
		good_fit: i.good_fit || {
			verdict: "maybe",
			why: ""
		},
		website_read: !!t?.ok
	};
}
function Rt(e, t) {
	return [
		`${e.name}: ${t.opportunity_level.toUpperCase()} opportunity`,
		t.opportunity_reason,
		"",
		"What they're doing now:",
		...t.doing_now.map((e) => `- ${e.point} (${Mt[e.source]})`),
		"",
		"Where you could help:",
		...t.where_you_could_help.map((e) => `- ${e.gap} (${Mt[e.source]})`),
		"",
		`Pitch: ${t.pitch.what}`,
		`Your way in: ${t.pitch.angle}`,
		t.pitch.show_them ? `Show them: ${t.pitch.show_them}` : ""
	].join("\n");
}
//#endregion
//#region src/lib/clientsClaudePrompt.js
var zt = /* @__PURE__ */ t({
	CLAUDE_PROMPTS: () => Bt,
	HANDOFF_FIELDS: () => Kt,
	analysisReady: () => on,
	fillFindOpportunityPrompt: () => Gt,
	getAssetSteps: () => Vt,
	handoffComplete: () => Xt,
	offerSummary: () => Ut,
	parseAnalysis: () => rn,
	parseHandoff: () => Yt,
	promptDetails: () => Wt
}), Bt = { findOpportunity: "SHEFREELANCES AI: FIND THE OPPORTUNITY\nYou are an experienced brand and marketing strategist helping a beginner freelancer identify a potential marketing opportunity with a business they have NOT contacted yet.\nThink like a senior strategist conducting a focused, preliminary brand and marketing review.\nYour job is to understand the business, recognize what it already does well, and identify ONE useful idea that could become the starting point for a conversation.\nThis is not a complete marketing audit, proposal, or sales strategy.\nThe freelancer has not spoken to the business. We don't know its internal performance, goals, budget, or whether it is looking for marketing help.\nI have attached screenshots of some combination of:\n\n* Instagram profile, feed, Reels, or individual posts\n* Meta Ad Library\n* Website, landing page, or service pages\n\nOnly analyze material actually supplied. If a website or link is accessible and you inspect it, identify that as an additional reviewed source. Otherwise, do not claim to have reviewed it.\nPROSPECT INFORMATION\nBusiness: {{business_name}}\nIndustry: {{industry}}\nLocation: {{location}}\nWebsite: {{website}}\nInstagram: {{instagram}}\nFacebook: {{facebook}}\nMY FREELANCE SERVICE\nService: {{selected_service}}\nMy Offer: {{saved_offer_summary}}\nMy Experience Level: {{experience_level}}\nIf my offer is unavailable, use my selected service as the primary constraint.\nYOUR INTERNAL REVIEW\nBefore writing the output, consider the following where visible.\n1. Business and positioning\n\n* What does the business sell?\n* Who does it appear to serve?\n* What makes its offer or presentation interesting?\n* Is its value clear to a potential customer?\n\n2. The customer perspective\n\n* What might someone want to understand before buying or booking?\n* What information does the business already communicate well?\n* Are there opportunities to make its existing strengths more visible?\n\n3. Instagram and content\nConsider:\n\n* Profile and bio\n* Content themes\n* Reels and carousels\n* Hooks\n* Messaging\n* Content variety\n* Educational content\n* Trust-building content\n* Calls to action\n\n4. Meta advertising\nConsider:\n\n* Visible offers\n* Advertising angles\n* Hooks\n* Creative approaches\n* Messaging\n* Calls to action\n* Potential alternative concepts worth testing\n\nDo not infer advertising performance from how an ad looks.\n5. Website and customer journey\nConsider:\n\n* Offer clarity\n* Headline and messaging\n* Customer benefits\n* Trust signals\n* Primary CTA\n* Ease of understanding the next step\n* Consistency between advertising, social content, and website\n\nOnly evaluate sections that are actually provided.\n6. Find an opportunity worth exploring\nConsider possible opportunities, then select ONE that:\n\n* Is based on a specific observation.\n* Is relevant to the freelancer's actual service.\n* Builds on something the business already has or does.\n* Has a reasonable potential benefit.\n* Could be demonstrated through one small sample.\n* Would make a natural opening for a first conversation.\n\nDo not choose an opportunity merely because you can find something negative to say.\nIf there isn't enough evidence, say what additional screenshot or information would help.\nREQUIRED OUTPUT\nKeep the ENTIRE response concise and suitable for a beginner.\nIn sections 2 and 3, wrap the one or two most important phrases in ==double equals signs== so they can be highlighted.\n1. BUSINESS SNAPSHOT\nIn 2–3 sentences, explain what the business offers, who it appears to serve, and how it presents itself.\n2. WHAT CAUGHT MY ATTENTION\nIdentify up to TWO genuine positive observations.\nUse specific details from the screenshots.\n3. AN OPPORTUNITY WORTH EXPLORING\nChoose ONE potential opportunity.\nWhat I noticed:\nA specific observation supported by the supplied material.\nThe opportunity:\nOne practical idea the business could potentially explore.\nWhy it might be useful:\nExplain the possible value in no more than two sentences.\nEvidence:\nIdentify which screenshot or reviewed material supports the observation.\n4. ONE IDEA I COULD OFFER TO SHARE\nRecommend ONE specific, personalized marketing asset the freelancer could offer to create for this business.\nThe idea must:\n\n* Connect directly to the opportunity identified.\n* Be relevant to the freelancer's actual service.\n* Be tangible enough for the business owner to immediately understand what they're being offered.\n* Be small enough to create using the SheFreelances AI tools if the business expresses interest.\n* Build on the business's existing offer, services, positioning, or creative assets.\n\nFor Meta Ads freelancers, prioritize:\n\n* A complete ad concept for one of the business's existing offers.\n* A sample static ad mockup, including a proposed visual, headline, hook, copy and CTA.\n* A short video ad concept or storyboard.\n* A new creative execution of an existing offer.\n\nFor Organic Social freelancers, prioritize:\n\n* A Reel concept with an actual hook and filming direction.\n* A sample educational carousel.\n* A B-roll Reel concept with on-screen text.\n* A small content series using something the business already does well.\n\nRETURN:\nThe idea: What specifically could be created?\nThe opportunity behind it: Why this could be worth exploring.\nWhat I'd offer to send: Describe the deliverable in language a business owner would immediately understand.\nCreative direction: A short description of what it could actually look like.\nRecommended samples: From the SAMPLE OFFER MENU at the end, choose the 2 or 3 sample offers that best fit this opportunity and my service, best first. The first one must be the same thing as The idea above. Put each on its own line as the ID, the name and one short reason.\nIMPORTANT:\nDo not create the asset yet.\nThe freelancer will first send a permission-based message asking whether the prospect would like to see the idea.\nOnly when the prospect expresses interest should SheFreelances generate the complete asset using the appropriate Ads or Content tool.\nDo not present the new concept as something that will definitely outperform the business's existing marketing.\nDescribe the proposed idea in everyday language. Prefer \"a quick Facebook ad mockup for your consultation offer\" over \"an alternative creative angle.\" The recipient should be able to picture what they're being offered.\nThe goal is for the owner to think, \"Oh, she has an actual ad idea for MY business? Yeah, I'd like to see that.\"\n5. OUTREACH HANDOFF\nReturn exactly these fields:\nPositive observation:\nPotential opportunity:\nIdea to offer:\nEvidence/reference:\nFit: Strong, Good or Weak, based on how clearly the opportunity matches my service.\nDo not write the outreach message. My SheFreelances AI outreach tool will do that separately.\nRULES\n\n* Do not assume the business is struggling or needs help.\n* Do not invent metrics, results, testimonials, or performance problems.\n* Separate observed information from strategic inference.\n* Do not assume the absence of an ad in a screenshot proves no ads are running.\n* Do not infer posting history or consistency from a limited screenshot.\n* Do not recommend services the freelancer doesn't offer.\n* Do not create a full audit or strategy.\n* Do not create a sample asset.\n* Do not write outreach.\n* Prefer constructive ideas that build on existing strengths.\n* If there's insufficient evidence, recommend one additional item to review rather than inventing a finding.\n\nThe purpose is to find ONE thoughtful, relevant idea worth offering to share in an initial conversation.\nWrite clearly and conversationally. No corporate filler, jargon, or em dashes.\nThe final output should take approximately one minute to read.\nSAMPLE OFFER MENU\n{{sample_menu}}" };
function Vt(e) {
	return [
		{
			id: "ig_feed",
			task: "Screenshot their Instagram profile and feed",
			link: e.instagram || jt(e.name, e.location),
			linkLabel: e.instagram ? "Open their Instagram" : "Find their Instagram"
		},
		{
			id: "ig_posts",
			task: "Screenshot 2 or 3 individual posts (a Reel, a carousel, a recent post)"
		},
		{
			id: "site_home",
			task: "Screenshot their website home page",
			link: e.website || "",
			linkLabel: "Open their website"
		},
		{
			id: "site_services",
			task: "Screenshot their services page"
		},
		{
			id: "bio_links",
			task: "Open the links in their Instagram bio and screenshot where they go"
		},
		{
			id: "ads",
			task: "Check the Meta Ad Library and screenshot any ads they're running",
			link: kt(e.name),
			linkLabel: "Open the Ad Library"
		}
	];
}
function Ht(e) {
	return e?.primary_service ? e.primary_service === "other" ? e.custom_service_name || "Other" : a[e.primary_service]?.label || "" : "";
}
function Ut(e) {
	if (!e) return "";
	let t = [];
	t.push(`${e.selected_name || "My offer"}${e.niche ? ` for ${h(e)}` : ""}.`), e.record?.talk?.one_sentence && t.push(e.record.talk.one_sentence), e.price && t.push(`${re(e.price)} per month.`);
	let n = (e.package?.categories || []).map((e) => `${e.name}: ${(e.items || []).join(", ")}`);
	return n.length && t.push(`Includes ${n.join("; ")}.`), t.join(" ");
}
function Wt({ prospect: e, offer: t, service: n, experience: r, customPitch: o }) {
	let s = "Not found";
	return {
		prospect: [
			{
				key: "business_name",
				label: "Business",
				value: e.name || s
			},
			{
				key: "industry",
				label: "Industry",
				value: e.business_type || s
			},
			{
				key: "location",
				label: "Location",
				value: e.location || s
			},
			{
				key: "website",
				label: "Website",
				value: e.website ? gt(e.website) : s,
				full: e.website || s
			},
			{
				key: "instagram",
				label: "Instagram",
				value: e.instagram ? yt(e.instagram) : s,
				full: e.instagram || s
			},
			{
				key: "facebook",
				label: "Facebook",
				value: e.facebook ? _t(e.facebook) : s,
				full: e.facebook || s
			}
		],
		you: [
			{
				key: "selected_service",
				label: "Service",
				value: o || (t ? Ht(t) : a[n]?.label) || "Not chosen yet"
			},
			{
				key: "saved_offer_summary",
				label: "My offer",
				value: o || (t ? Ut(t) : "No offer saved yet")
			},
			{
				key: "experience_level",
				label: "Experience",
				value: i[r]?.label || "Not set"
			}
		]
	};
}
function Gt(e) {
	let { prospect: t, you: n } = Wt(e), r = Bt.findOpportunity;
	return [...t, ...n].forEach((e) => {
		r = r.split(`{{${e.key}}}`).join(e.full || e.value);
	}), r.split("{{sample_menu}}").join(nt(e));
}
var Kt = [
	{
		key: "positive",
		label: "Positive observation",
		from: "handoff",
		match: /positive observation/i
	},
	{
		key: "opportunity",
		label: "Potential opportunity",
		from: "handoff",
		match: /potential opportunity/i
	},
	{
		key: "idea",
		label: "Idea to offer",
		from: "handoff",
		match: /idea to offer/i
	},
	{
		key: "offer_to_send",
		label: "What I'd offer to send",
		from: "idea",
		match: /what i['’]d offer to send/i
	},
	{
		key: "creative",
		label: "Creative direction",
		from: "idea",
		match: /creative direction/i
	},
	{
		key: "evidence",
		label: "Evidence or reference",
		from: "handoff",
		match: /evidence\s*\/\s*reference|evidence or reference/i
	}
], qt = /^(positive observation|potential opportunity|idea to offer|evidence\s*\/\s*reference|evidence or reference|evidence|the idea|the opportunity behind it|what i['’]d offer to send|creative direction|what i noticed|the opportunity|why it might be useful)\s*:/i;
function Jt(e, t) {
	let n = {}, r = null;
	for (let i of String(e || "").split(/\r?\n/)) {
		let e = i.replace(/[*_#>`]/g, "").replace(/^\s*[-•]\s*/, "").trim(), a = t.find((t) => RegExp(`^(${t.match.source})\\s*:`, "i").test(e));
		if (a) {
			r = a.key, n[r] = e.replace(/^[^:]*:\s*/, "");
			continue;
		}
		if (qt.test(e) || /^\d+\.\s+[A-Z][A-Z ]+$/.test(e)) {
			r = null;
			continue;
		}
		r && e ? n[r] = `${n[r]} ${e}`.trim() : r && !e && n[r] && (r = null);
	}
	return n;
}
function Yt(e) {
	let t = String(e || ""), n = t.search(/outreach handoff/i), r = n >= 0 ? t.slice(n) : t, i = t.search(/one idea i could offer/i), a = i >= 0 ? t.slice(i, n > i ? n : void 0) : t, o = Jt(r, Kt.filter((e) => e.from === "handoff")), s = Jt(a, Kt.filter((e) => e.from === "idea")), c = {};
	return Kt.forEach((e) => c[e.key] = (e.from === "handoff" ? o : s)[e.key] || ""), c;
}
function Xt(e) {
	return !!(e && e.positive && e.opportunity && e.idea);
}
var Zt = /^\s*(?:#+\s*)?(?:\*\*)?\s*(?:\d\s*[.)]\s*)?(business snapshot|what caught my attention|an opportunity worth exploring|one idea i could offer to share|outreach handoff)\b/i, Qt = {
	"business snapshot": "snapshot",
	"what caught my attention": "caught",
	"an opportunity worth exploring": "opportunity",
	"one idea i could offer to share": "idea",
	"outreach handoff": "handoff"
};
function $t(e) {
	let t = String(e).replace(/^\s*(?:[-•·]|\*(?!\*))\s+/, "");
	return t = t.replace(/^\s*#+\s*/, ""), t = t.replace(/^\*\*([^*]+?)\*\*\s*(:?)/, (e, t, n) => n || /:$/.test(t) ? `${t.replace(/:$/, "")}:` : t), t = t.replace(/\*\*([^*]+?)\*\*/g, "==$1=="), t = t.replace(/[*_>`]/g, ""), t.replace(/====/g, "").trim();
}
function en(e) {
	let t = {}, n = null;
	for (let r of String(e || "").split(/\r?\n/)) {
		let e = $t(r).match(Zt);
		if (e) {
			n = Qt[e[1].toLowerCase()], t[n] = [];
			continue;
		}
		n && t[n].push(r);
	}
	return t;
}
function tn(e, t) {
	let n = {}, r = null;
	for (let i of e || []) {
		let e = $t(i);
		if (!e) continue;
		let a = t.find((t) => RegExp(`^${t.re}\\s*:`, "i").test(e));
		if (a) {
			r = a.key, n[r] = e.replace(/^[^:]*:\s*/, "");
			continue;
		}
		r && (n[r] = `${n[r]} ${e}`.trim());
	}
	return n;
}
var nn = "['’]";
function rn(e) {
	let t = en(e), n = [], r = [];
	(t.snapshot || []).map($t).filter(Boolean).forEach((e) => {
		let t = e.match(/^([A-Z][\w &/'’().-]{1,26}):\s*(.{1,80})$/);
		t && n.length < 4 && !/[.!?]$/.test(t[1]) ? n.push({
			label: t[1].trim(),
			value: t[2].replace(/==/g, "").trim()
		}) : r.push(e);
	});
	let i = r.join(" "), a = (t.caught || []).map($t).filter(Boolean), o = tn(t.opportunity, [
		{
			key: "noticed",
			re: "what i noticed"
		},
		{
			key: "opportunity",
			re: "the opportunity"
		},
		{
			key: "why",
			re: "why it might be useful"
		},
		{
			key: "evidence",
			re: "evidence"
		}
	]), s = tn(t.idea, [
		{
			key: "idea",
			re: "the idea"
		},
		{
			key: "behind",
			re: "the opportunity behind it"
		},
		{
			key: "offer_to_send",
			re: `what i(?:${nn}d| would| could) offer to send`
		},
		{
			key: "relevance",
			re: `why it${nn}?s relevant`
		},
		{
			key: "creative",
			re: "creative direction"
		}
	]), c = tn(t.handoff, [
		{
			key: "positive",
			re: "positive observation"
		},
		{
			key: "opportunity",
			re: "potential opportunity"
		},
		{
			key: "idea",
			re: "idea to offer"
		},
		{
			key: "evidence",
			re: "evidence\\s*(?:\\/|or)\\s*reference"
		},
		{
			key: "fit",
			re: "fit"
		},
		{
			key: "channel",
			re: "best channel"
		}
	]), l = [], u = [...t.idea || [], ...t.handoff || []].map($t);
	for (let e of u) {
		let t = e.match(/\b[SAX]\d{2}\b/g);
		t && t.forEach((n) => {
			let r = n.toUpperCase();
			if (!C(r) || l.some((e) => e.id === r)) return;
			let i = "";
			if (t.length === 1) {
				let t = e.match(/\b[SAX]\d{2}\b[^:]*:\s*(.+)$/i) || e.match(/\b[SAX]\d{2}\b.*?\s[-\u2013\u2014]\s+(.+)$/i);
				i = t ? t[1].replace(/==/g, "").trim() : "";
			}
			l.push({
				id: r,
				why: i
			});
		});
	}
	return {
		source: "claude",
		version: 2,
		samples: l.slice(0, 3),
		facts: n,
		fit: (String(c.fit || "").match(/strong|good|weak/i) || [""])[0].replace(/^./, (e) => e.toUpperCase()),
		channel: String(c.channel || "").replace(/==/g, "").split(/[.,(]/)[0].trim(),
		snapshot: i,
		caught: a,
		noticed: an(o.noticed || ""),
		opp_detail: o.opportunity || "",
		why: o.why || "",
		opp_evidence: o.evidence || "",
		idea_detail: s.idea || "",
		behind: s.behind || "",
		offer_to_send: s.offer_to_send || "",
		relevance: s.relevance || "",
		creative: s.creative || "",
		positive: c.positive || a[0] || "",
		opportunity: c.opportunity || o.opportunity || "",
		idea: c.idea || s.idea || "",
		evidence: c.evidence || o.evidence || ""
	};
}
function an(e) {
	if (!e || e.includes("==")) return e;
	let t = (e.match(/[^.!?]+[.!?]+(\s|$)/g) || [e]).find((e) => /\b(doesn['’]?t|don['’]?t|isn['’]?t|aren['’]?t|not|no|never|missing|without)\b/i.test(e));
	return t ? e.replace(t.trim(), `==${t.trim()}==`) : e;
}
function on(e) {
	return !!(e && e.positive && e.opportunity && e.idea);
}
//#endregion
//#region src/lib/clientsPreviewSite.js
var sn = /* @__PURE__ */ t({
	PREVIEW_CHECKS: () => un,
	previewSitePrompt: () => ln
}), cn = (e) => String(e || "").trim();
function ln(e) {
	let t = [
		["Business name", e.name],
		["Type of business", e.business_type],
		["City", e.location],
		["Address", e.address],
		["Phone", e.phone],
		["Email", e.email],
		["Current website", e.website],
		["Instagram", e.instagram],
		["Facebook", e.facebook]
	].filter(([, e]) => cn(e)), n = cn(e.preview_source);
	return `Build a beautiful, high-converting one-page website for this local business. It's a preview I'm making to show the owner what their website could look like.

THE BUSINESS
${t.map(([e, t]) => `- ${e}: ${cn(t)}`).join("\n")}
${n ? `\nTHEIR GOOGLE BUSINESS LISTING (use the real details, services, hours and reviews from here)\n${n}\n` : ""}
WHAT THE PAGE NEEDS (in this order)
1. A clean top bar: the business name as the logo, a few links, the phone number and one main button (Book, Request a visit, Call, or Get a quote, whichever fits this business).
2. A hero: a short, specific headline about what they do and for whom, one sentence under it, the main button and a call button. If the listing shows a star rating and review count, show them under the buttons exactly as written.
3. Their services as a simple grid, each with a one-line plain-English description.
4. About the business: who they are and why people choose them, using only what's in the details above.
5. Reviews: 3 to 6 real reviews, word for word, with the reviewer's first name. Only use reviews from the listing. If there are none, leave this section out.
6. Visit us: address, hours, phone and a map embed for the address.
7. A short FAQ (4 to 5 questions a new customer would actually ask) with honest, general answers.
8. A final call to action and a simple footer.
9. On phones, a sticky "Call" button at the bottom.

DESIGN
- Premium and modern for this kind of business, with lots of space and an elegant serif for headings paired with a clean sans for text.
- Pick a calm color palette that suits the business. If their current website has clear brand colors, use those.
- Use real-looking photos with people in them (AI-generated models are fine): customers enjoying the service, the team at work, plus the place and the work. Never write fake names on people or put invented quotes or results next to them.
- Fully responsive. It has to look great on a phone first.

RULES
- Only use facts from the details above. Never invent prices, awards, years in business, credentials, guarantees or numbers.
- Never invent or reword reviews.
- Don't stretch the facts. Never claim who does which service, how visits work, what's included or how many people work there, unless it's written above.
- Write like a friendly local business talking to a neighbor. No hype, no clichés, no em dashes.
- Add a small, tasteful line in the footer: "Website preview made for ${cn(e.name) || "this business"}."
- Make it one page, open to anyone with the link (no login). I'll press Publish myself.`;
}
var un = [
	"The name, phone, address and hours are right",
	"Every review is real and word for word",
	"No made-up prices, awards or numbers",
	"No fake names or reviews next to the people in photos",
	"It looks good on your phone"
], dn = /* @__PURE__ */ t({
	CPL_SOURCES: () => fn,
	GENERAL: () => mn,
	NICHES: () => pn,
	cplSourceText: () => _n,
	cplText: () => gn,
	getNiche: () => hn,
	radiusText: () => vn,
	startingAngles: () => yn
}), fn = {
	playbook: "SheFreelances niche playbook",
	suzy: "SheFreelances AI agency data",
	localiq: "LocaliQ 2025"
}, T = (e, t, n, r, i, a, o) => ({
	name: e,
	category: t,
	concept: n,
	creative: r,
	example: i,
	why: a,
	caution: o,
	idea: n
}), pn = [
	{
		id: "med_spa",
		label: "Med spas and beauty",
		match: /(med ?spa|aesthetic|botox|filler|injectable|laser|facial|skin ?care|derma|lash|brow|body sculpt|hydrafacial)/i,
		budget: [25, 50],
		radius: [10, 15],
		cpl: [15, 45],
		cpl_note: "depending on the offer",
		source: "suzy",
		cta: "Book now",
		formats: "Process videos, treatment carousels",
		form_fields: "Name, phone, service interest",
		recommends: "Treatment process videos for engagement, results-focused creative for conversion, introductory offers, and showing the clinic's clean, professional space.",
		compliance: "Some cosmetic procedure ads have extra platform restrictions. Use consented imagery, avoid personal-attribute assumptions, and never imply guaranteed medical results.",
		priority: [
			"First-Time Offer",
			"Transformation",
			"The Process Video"
		],
		angles: [
			T("Transformation", "ANG-02", "Demonstrate visible treatment results.", "Before-and-after photos with client permission.", "A look at our real client results.", "Communicates the value of the service visually."),
			T("First-Time Offer", "ANG-01", "Encourage new customers to try a treatment at an introductory price.", "Treatment footage with the introductory offer.", "Your first facial, $49 (regularly $120).", "Lowers the barrier to booking and opens the door to repeat visits."),
			T("The Process Video", "ANG-05", "Show the treatment being performed.", "15 to 30 seconds of close-up treatment footage, ASMR-style audio works well.", "Come behind the scenes of a HydraFacial appointment.", "Makes the treatment easier to understand and is naturally engaging."),
			T("The Myth Buster", "ANG-04", "Address common misconceptions about a treatment.", "Practitioner talking directly to camera.", "Botox doesn't freeze your face.", "Answers the worry that stops people booking.", "Claims must be qualified, medically accurate and appropriate to the actual procedure."),
			T("Social Proof", "ANG-03", "Feature a real client describing their experience.", "About 15 seconds of client testimonial.", "I've been coming here for 2 years and my skin has never looked better.", "Builds trust through firsthand experience."),
			T("Event / Season", "ANG-08", "Connect treatments to upcoming events or seasons.", "Lifestyle and treatment footage for the moment.", "Get wedding-ready with our bridal glow package.", "Connects the service to a reason they already have to book.")
		]
	},
	{
		id: "dental",
		label: "Dental practices",
		match: /(dent|orthodont|invisalign|implant|teeth|smile|veneer)/i,
		budget: [40, 100],
		radius: [10, 20],
		cpl: [40, 77],
		cpl_note: "about $77 in the 2025 data",
		source: "localiq",
		cta: "Book now",
		formats: "Dentist videos, patient testimonials, treatment explainers",
		form_fields: "Name, phone, treatment interest",
		recommends: "Consultation offers for high-ticket treatments, real patient experiences, and the dentist answering common questions on camera.",
		compliance: "Avoid assumptions about someone's health or appearance. Testimonials, imagery, financing language and treatment claims must meet healthcare advertising and privacy rules.",
		priority: [
			"The Consultation Offer",
			"Patient Experience",
			"Treatment Myth Buster"
		],
		angles: [
			T("Smile Transformation", "ANG-02", "Show genuine treatment outcomes and the value of cosmetic dentistry.", "Consented patient imagery, smile reveals, patient interviews.", "See the smile transformations happening at [Practice Name].", "Makes the result easier to picture. Best for veneers, whitening, implants."),
			T("The Consultation Offer", "ANG-01", "Give people a low-commitment way to learn about treatment.", "Friendly dentist explaining what happens at the appointment.", "Considering dental implants? Book a consultation to explore your options.", "Reduces uncertainty before a big treatment decision."),
			T("Treatment Myth Buster", "ANG-04", "Address common concerns about dental procedures.", "Dentist talking to camera in a short educational video.", "How long does Invisalign actually take?", "Answers the questions that stop people booking."),
			T("Patient Experience", "ANG-03", "A real patient describing their experience.", "20 to 45 second patient interview filmed in the clinic.", "Here's what patients say about their experience at [Practice Name].", "Reduces anxiety and builds trust before the first visit."),
			T("Meet Your Dentist", "ANG-06", "Introduce the dentist and the practice's approach.", "Dentist explaining their approach, the team, a short clinic tour.", "Meet Dr. [Name] and the team behind [Practice Name].", "Makes an intimidating appointment feel familiar."),
			T("The Financing Explainer", "ANG-09", "Address the cost barrier for major treatments.", "Dentist or coordinator explaining payment options.", "Exploring dental implants? Learn about our payment options.", "Gets people to ask instead of assuming they can't afford it.", "Never invent financing terms.")
		]
	},
	{
		id: "chiro",
		label: "Chiropractic clinics",
		match: /(chiro|spinal|posture|physio|physical therapy)/i,
		budget: [25, 60],
		radius: [8, 15],
		cpl: [42, 48],
		cpl_note: "physicians and clinics in the 2025 data",
		source: "localiq",
		cta: "Book now",
		formats: "Practitioner videos, clinic tours, patient stories",
		form_fields: "Name, phone, what they'd like help with",
		recommends: "An easy introductory visit, showing what an appointment looks like, and the chiropractor explaining things on camera.",
		compliance: "No cure claims or unsupported medical promises, and never assume the viewer has a medical condition.",
		priority: [
			"New Patient Special",
			"The Adjustment Process",
			"The Educational Explainer"
		],
		angles: [
			T("New Patient Special", "ANG-01", "Offer an easy introductory visit.", "Chiropractor walking through what a first visit includes.", "New to [Clinic Name]? Ask about our introductory consultation.", "A low-commitment starting point for someone new to the practice."),
			T("The Educational Explainer", "ANG-04", "Answer common questions.", "Chiropractor speaking to camera with simple demonstrations.", "What actually happens during your first chiropractic appointment?", "Builds trust through education."),
			T("The Adjustment Process", "ANG-05", "Show what an appointment looks like.", "Short footage of a real appointment, with permission.", "Ever wondered what happens during a chiropractic visit?", "Takes the mystery out of it and is visually engaging."),
			T("Patient Testimonial", "ANG-03", "A real patient's experience with the clinic.", "Short interview about the visit and how they were looked after.", "A closer look at the patient experience at [Clinic Name].", "Relatable proof for new patients."),
			T("The Desk Worker Angle", "ANG-07", "Useful content for people who sit all day.", "Practitioner demonstrating posture and desk setup tips.", "Three simple ways to make your desk setup more comfortable.", "Gives value first while introducing the clinic."),
			T("Meet Your Chiropractor", "ANG-06", "Introduce the practitioner and the clinic.", "30-second talking head plus treatment-room footage.", "I'm Dr. [Name]. Here's what to expect when you visit our clinic.", "Builds familiarity before booking.")
		]
	},
	{
		id: "fitness",
		label: "Gyms and fitness studios",
		match: /(gym|fitness|yoga|pilates|crossfit|boxing|personal train|barre|spin class|cycle studio|bootcamp)/i,
		budget: [15, 35],
		radius: [5, 8],
		cpl: [8, 20],
		source: "playbook",
		cta: "Sign up",
		formats: "Video showing the class atmosphere",
		form_fields: "Name, phone, preferred class time",
		recommends: "Class footage over equipment photos, free trials, a tight local radius, real member stories, and community-focused messages.",
		compliance: "Member results must be genuine, in context, and never presented as typical or guaranteed.",
		priority: [
			"Free Trial Class",
			"Community Vibe",
			"Coach / Trainer Intro"
		],
		angles: [
			T("Free Trial Class", "ANG-01", "Let people try a session before committing.", "Real footage of a class in action.", "First class free. No commitment. Just show up.", "Lowers the barrier to getting through the door."),
			T("Transformation Story", "ANG-02", "Showcase a member's progress.", "Member testimonial with permission-based progress imagery.", "Meet the members making progress at [Gym].", "A real member, not a stock photo."),
			T("Community Vibe", "ANG-10", "Sell the atmosphere and the people.", "Classes in action, high fives, music, group energy.", "This is what a morning at [Studio] looks like.", "Sells the experience, not the equipment."),
			T("The No-Gym Person", "ANG-07", "Appeal to people who dislike regular gyms.", "Welcoming members, different workouts, supportive coaching.", "Hate the gym? Us too. That's why we built something different.", "Sets the studio apart from a regular gym."),
			T("New Year / Season", "ANG-08", "Tie a promotion to seasonal motivation.", "Class montage with the offer.", "January special: $0 enrollment and your first month 50% off.", "Pairs motivation they already have with a timely offer."),
			T("Coach / Trainer Intro", "ANG-06", "Introduce the person members will work with.", "About 30 seconds of the coach talking to camera.", "I'm [Name], and here's what we do differently at our studio.", "They know the coach before they walk in.")
		]
	},
	{
		id: "restaurant",
		label: "Restaurants, cafes and bars",
		match: /(restaurant|cafe|coffee|pizza|\bbar\b|grill|bakery|kitchen|taco|sushi|brunch|food|diner|bistro)/i,
		budget: [15, 30],
		radius: [5, 10],
		cpl: [3, 8],
		source: "playbook",
		cta: "Get directions",
		formats: "Food preparation video, close-up food photos",
		form_fields: "",
		recommends: "Food preparation videos over static photos, close-ups over wide shots, deals with real deadlines over generic menus, and a tight radius.",
		compliance: "",
		priority: [
			"The Deal",
			"The Hero Shot",
			"Behind the Kitchen"
		],
		angles: [
			T("The Hero Shot", "ANG-10", "Close-up of the best-selling dish.", "Steam, cheese pulls, sauce dripping, freshly made food.", "This is what everyone's ordering at [Restaurant Name].", "Great-looking food stops the scroll."),
			T("The Deal", "ANG-01", "A specific promotion with urgency and value.", "Close-up of the dishes with the offer shown clearly.", "2 large pizzas for $24.99 this week only.", "A clear incentive plus a reason to act now."),
			T("The Review", "ANG-03", "Customer feedback as social proof.", "A genuine 5-star Google review over a photo of the food.", "Don't take our word for it. Here's what our customers are saying.", "Trust plus appetite."),
			T("Behind the Kitchen", "ANG-05", "Show how the food is made.", "About 30 seconds of raw footage of the chef making a dish.", "Come behind the scenes while we make our best-selling pizza.", "Food being made is satisfying to watch."),
			T("The Did You Know", "ANG-04", "Introduce the restaurant to locals who don't know it.", "Exterior, location cues and signature dishes.", "Did you know there's a pizza shop 5 minutes from you that hand-makes every pie?", "Builds local awareness."),
			T("The Event / Season", "ANG-08", "Use events, occasions and seasons.", "Event-specific food and promo content.", "Game day plans? We've got your food covered.", "A timely reason to visit.")
		]
	},
	{
		id: "real_estate",
		label: "Real estate",
		match: /(real ?estate|realtor|brokerage|homes? for sale|listing|property management)/i,
		budget: [20, 50],
		radius: [15, 25],
		cpl: [10, 25],
		source: "playbook",
		cta: "Sign up",
		formats: "Lead forms, property carousels, walkthrough videos",
		form_fields: "Name, email, address, timeframe",
		recommends: "Home valuations as a lead magnet, property carousels, low-friction lead forms, video walkthroughs, and always showing the price.",
		compliance: "Housing ads must use Meta's Housing Special Ad Category, which limits location, age and targeting options. Use verified local market numbers only.",
		special_category: "HOUSING",
		priority: [
			"Home Valuation",
			"Just Listed",
			"Video Walkthrough"
		],
		angles: [
			T("Just Listed", "ANG-10", "Advertise a new listing.", "Great property photos with price, beds and baths shown.", "Just listed in [City]. See it before it's gone.", "Aspiration plus availability."),
			T("Home Valuation", "ANG-01", "Offer homeowners a free estimate of their home's value.", "Aerial neighborhood photo or an attractive home.", "What's your home worth right now? Get a free valuation.", "A strong lead magnet for future sellers."),
			T("Market Update", "ANG-04", "Position the agent as the local expert.", "Agent presenting local market numbers.", "What's actually happening with home prices in [City]?", "Gives buyers and sellers a reason to ask for advice.", "Use verified local market statistics only."),
			T("Video Walkthrough", "ANG-05", "Take people on a property tour.", "About 60 seconds of phone footage of the best features.", "Come take a quick tour of this home in [City].", "Makes the property real before a viewing."),
			T("First-Time Buyer", "ANG-07", "Address the belief that buying is out of reach.", "Entry-level homes with real prices.", "Think you can't afford a home? Homes in [City] start at $X.", "Encourages buyers who assume they can't."),
			T("Sold Testimonial", "ANG-03", "Show results with a real sale.", "Client photo, quote and the property.", "Sold in 5 days, $15K over asking.", "Concrete proof the agent delivers.")
		]
	},
	{
		id: "roofing",
		label: "Roofing",
		match: /(roof|storm damage|shingle|gutter|siding)/i,
		budget: [30, 75],
		radius: [15, 30],
		cpl: [25, 75],
		source: "playbook",
		cta: "Get quote",
		formats: "Drone footage and damage close-ups",
		form_fields: "Name, phone (required), address, age of roof",
		recommends: "Insurance-related messages, drone inspection footage, fast lead follow-up, city-specific messages, and verified trust signals.",
		compliance: "Only mention storms that really hit the area. Insurance messages must be conditional: never promise free replacements or waived deductibles. Only advertise warranty terms the contractor can back up.",
		priority: [
			"Insurance Replacement",
			"Free Drone Inspection",
			"Storm Damage"
		],
		angles: [
			T("Storm Damage", "ANG-08", "Connect recent local weather to the need for an inspection.", "Real storm footage, damaged shingles, inspection footage.", "Recent storms hit [City]. Hidden roof damage is common.", "Timely and local."),
			T("Insurance Replacement", "ANG-07", "Qualifying storm damage may be covered by insurance.", "Storm damage imagery with a specialist explaining the claim process.", "Your insurance may cover a new roof. We handle the claim paperwork.", "Removes the cost barrier."),
			T("Free Drone Inspection", "ANG-01", "A technology-assisted roof check.", "Drone footage from above, then close-ups of damage.", "We spot what you can't see from the ground.", "Professional and visually interesting."),
			T("Before / After", "ANG-02", "Show the difference a new roof makes.", "Old roof next to the finished install.", "One roof replacement. A completely different-looking home.", "Appeals to curb appeal, not just emergencies."),
			T("Lifetime Warranty", "ANG-10", "The long-term value of the roof system.", "Finished installs, product quality, written warranty.", "Roofs built to last, with a lifetime warranty included.", "Answers worries about a big investment."),
			T("Local Crew", "ANG-06", "A local contractor, not an out-of-town storm chaser.", "Crew footage, local projects, team intro.", "Licensed, bonded and insured. A local crew in [City].", "Local trust.")
		]
	},
	{
		id: "home_services",
		label: "Home services",
		match: /(plumb|hvac|heating|cooling|\bac\b|clean|landscap|lawn|paint|pressure wash|electric|remodel|contractor|handyman|garage door|pool|insulation|spray foam|solar|window)/i,
		budget: [20, 40],
		radius: [10, 20],
		cpl: [15, 35],
		source: "playbook",
		cta: "Get quote",
		formats: "Before-and-after carousel",
		form_fields: "Name, phone, service needed, address",
		recommends: "Before-and-after carousels, seasonal campaigns, a phone field on lead forms, and showing licensed and insured where true.",
		compliance: "",
		priority: [
			"Before / After",
			"Free Estimate",
			"Seasonal Urgency"
		],
		angles: [
			T("Before / After", "ANG-02", "Show the visible difference the service makes.", "Side-by-side: dirty to clean, broken to fixed.", "This driveway hadn't been pressure washed in 8 years. Two hours later, it looks brand new.", "The value is obvious in a second."),
			T("Seasonal Urgency", "ANG-08", "Tie the service to an upcoming seasonal need.", "Seasonal visuals or a tech doing the job.", "Get your AC tuned up before the summer heat arrives.", "A timely reason to book."),
			T("The Review Stack", "ANG-03", "Highlight the company's reputation.", "Screenshots of real Google reviews.", "See why homeowners across [City] choose our team.", "Trust matters when someone comes into your home."),
			T("The Problem", "ANG-07", "A common problem with the service as the fix.", "Tech checking the issue or explaining the warning signs.", "Weird noise coming from your AC? It could be a small fix or a big one.", "Turns uncertainty into a reason to call."),
			T("The Crew", "ANG-06", "The people behind the business.", "Real team in uniform on a job site.", "Meet the team taking care of homes across [City].", "Human and professional."),
			T("Free Estimate", "ANG-01", "Remove the barriers to reaching out.", "Clear offer graphic with real job-site photos.", "Free estimate in 24 hours. No hidden fees. Licensed and insured.", "Less risk, less commitment.")
		]
	},
	{
		id: "pest",
		label: "Pest control",
		match: /(pest|termite|mosquito|rodent|exterminat|bug)/i,
		budget: [25, 60],
		radius: [10, 25],
		cpl: null,
		source: null,
		cta: "Get quote",
		formats: "Technician videos, educational explainers, seasonal promotions",
		form_fields: "Name, phone, address, what they're seeing",
		recommends: "Recurring seasonal campaigns, with creative updated around real local pest activity.",
		compliance: "",
		priority: [
			"Seasonal Pest Alert",
			"Free Inspection",
			"The Hidden Problem"
		],
		angles: [
			T("Seasonal Pest Alert", "ANG-08", "Tie campaigns to real seasonal pest activity.", "Tech showing preventative treatment around a home.", "Mosquito season is coming to [City]. Explore our yard treatments.", "Timely and local."),
			T("Free Inspection", "ANG-01", "An inspection with little commitment.", "Uniformed tech doing an inspection.", "Not sure what's happening around your home? Schedule a pest inspection.", "Makes it easy to reach out."),
			T("The Hidden Problem", "ANG-04", "Pest issues that aren't obvious.", "Tech showing common inspection spots.", "Three places termites can go unnoticed around a home.", "Shows the value of a professional check."),
			T("Customer Review Stack", "ANG-03", "Reputation through real reviews.", "Real Google reviews with tech footage.", "See why homeowners across [City] choose [Business Name].", "Confidence in an unfamiliar provider."),
			T("The Prevention Plan", "ANG-10", "Routine treatment instead of only reacting.", "Tech explaining the plan and what it covers.", "Here's what's included in our preventative pest plan.", "A reason to consider ongoing service."),
			T("Meet the Technician", "ANG-06", "An established local team.", "Real techs, branded vehicles, local jobs.", "Meet the local team helping [City] homeowners with unwanted pests.", "Professional and familiar.")
		]
	},
	{
		id: "auto_detailing",
		label: "Auto detailing",
		match: /(detail|ceramic coat|paint correction|car wash|auto spa|ppf)/i,
		budget: [20, 50],
		radius: [10, 20],
		cpl: null,
		source: null,
		cta: "Book now",
		formats: "Transformation videos, close-ups, satisfying process footage",
		form_fields: "Name, phone, vehicle, service wanted",
		recommends: "Creative-led campaigns. The service naturally produces lots of satisfying footage.",
		compliance: "",
		priority: [
			"The Satisfying Transformation",
			"The Package Offer",
			"Mobile Convenience"
		],
		angles: [
			T("The Satisfying Transformation", "ANG-02", "Show a dramatic clean or restoration.", "Split-screen before and after, dirty to clean, paint correction.", "Watch us bring this car back to life.", "The value lands almost instantly."),
			T("The Protection Angle", "ANG-04", "Explain protective services like ceramic coating.", "Close-up of water beading on a treated surface.", "What does ceramic coating actually do for your paint?", "Makes a premium service easy to understand."),
			T("The Package Offer", "ANG-01", "A clear, simple detailing package.", "Service checklist with real detailing footage.", "Interior and exterior detail packages starting at $X.", "No confusion about price or what's included."),
			T("The Satisfying Process", "ANG-05", "Focus on the visual experience of detailing.", "Foam cannon, extraction, polishing, microfiber wipe-downs.", "30 seconds of the most satisfying detail you'll see today.", "Naturally engaging."),
			T("Premium Care", "ANG-10", "A specialist for enthusiasts and premium cars.", "Close-ups of premium cars and careful technique.", "A premium car deserves more than a quick rinse.", "Sets a higher-value service apart."),
			T("Mobile Convenience", "ANG-09", "They don't need to go anywhere.", "Van arriving at a home, then the service.", "Professional car detailing, right in your driveway.", "Removes the hassle of dropping the car off.")
		]
	},
	{
		id: "pet",
		label: "Pet grooming and pet care",
		match: /(pet|dog|cat|groom|daycare|boarding|kennel|vet)/i,
		budget: [15, 40],
		radius: [5, 10],
		cpl: null,
		source: null,
		cta: "Book now",
		formats: "Pet transformation videos, grooming process videos, testimonials",
		form_fields: "Name, phone, pet's breed, service wanted",
		recommends: "Organic-style video that works in ads and on social.",
		compliance: "",
		priority: [
			"The Grooming Transformation",
			"The Happy Pet Experience",
			"First-Time Grooming Offer"
		],
		angles: [
			T("The Grooming Transformation", "ANG-02", "Show the results of a grooming appointment.", "Before and after of a fresh cut and clean coat.", "Wait until you see this pup's transformation.", "Visual and emotional."),
			T("First-Time Grooming Offer", "ANG-01", "Get first-time customers to try it.", "Happy pets leaving, with the intro offer.", "New to [Business Name]? Ask about our first-visit grooming package.", "Lowers the barrier to a first visit."),
			T("The Happy Pet Experience", "ANG-05", "Show a calm, positive environment.", "Gentle handling, comfortable pets, playtime, attentive staff.", "A behind-the-scenes look at a day at [Business Name].", "Owners feel good leaving their pet."),
			T("Meet the Groomer", "ANG-06", "The people caring for the pets.", "Staff intros with handling and grooming clips.", "Meet [Name], the groomer behind some of our cutest transformations.", "Personal trust."),
			T("Mobile Grooming", "ANG-09", "Convenience for busy owners.", "Van arriving, then the grooming.", "Your dog's grooming appointment, right outside your front door.", "Saves the trip."),
			T("Seasonal Grooming", "ANG-08", "Tie grooming to weather, holidays and seasons.", "Seasonal pet content with availability.", "Holiday grooming appointments are now open.", "Timely demand and early bookings.")
		]
	},
	{
		id: "clothing",
		label: "Clothing and online stores",
		match: /(clothing|apparel|boutique|fashion|streetwear|athleisure|jewelry|accessor|online store|ecommerce|shop)/i,
		budget: [30, 100],
		radius: null,
		cpl: [25, 50],
		cpl_kind: "sale",
		source: "playbook",
		cta: "Shop now",
		formats: "UGC try-on video",
		form_fields: "",
		recommends: "UGC try-ons, native-feeling video, first-order incentives, separate retargeting for cart abandoners and product viewers, mobile-first creative, a free-shipping threshold, and purchase tracking. Local boutiques can tighten to 5 to 15 miles.",
		compliance: "Only real scarcity: never say something sold out unless it did.",
		priority: [
			"First-Order Discount",
			"UGC Try-On",
			"Hero Product"
		],
		angles: [
			T("Hero Product", "ANG-10", "Showcase the best-selling product.", "Styled on a real person in a lifestyle setting, not a flat lay.", "This is the piece we're known for.", "A recognizable hero product."),
			T("First-Order Discount", "ANG-01", "An incentive for new customers.", "Best-sellers with the discount.", "20% off your first order, taken off at checkout.", "An immediate reason to buy."),
			T("UGC Try-On", "ANG-05", "A customer or creator demonstrating the product.", "Raw footage of someone wearing it and talking to camera.", "Let's try on three pieces from the new collection.", "Feels more real than a studio shoot."),
			T("Founder Story", "ANG-06", "The story behind the brand.", "30 to 60 seconds of the owner explaining why they started.", "I started this brand because I couldn't find...", "An emotional reason to connect."),
			T("Restock / Sold Out", "ANG-08", "Real scarcity around popular items.", "Product footage and the restock announcement.", "Back in stock. Our last drop sold out in 48 hours.", "Gets interested people to act."),
			T("Drop / Collection", "ANG-08", "Anticipation for a new release.", "Collection teaser, behind the scenes, previews.", "New summer drop. Friday at 9 AM. Get notified.", "Turns a release into an event and builds the email list.")
		]
	}
], mn = {
	id: "general",
	label: "this kind of business",
	budget: null,
	radius: [10, 15],
	cpl: null,
	source: null,
	cta: null,
	formats: "",
	form_fields: "Name, phone, what they're interested in",
	recommends: "",
	compliance: "",
	priority: [],
	angles: []
};
function hn(e) {
	let t = `${e.business_name || ""} ${e.business_description || ""} ${e.product || ""}`;
	return pn.find((e) => e.match.test(t)) || (e.business_type === "ecommerce" ? pn.find((e) => e.id === "clothing") : mn);
}
function gn(e) {
	if (!e?.cpl) return "";
	let [t, n] = e.cpl;
	return `$${t} to $${n} per ${e.cpl_kind === "sale" ? "sale" : "lead"}${e.cpl_note ? `, ${e.cpl_note}` : ""}`;
}
function _n(e) {
	return e?.source ? fn[e.source] : "";
}
function vn(e) {
	return e?.radius ? `${e.radius[0]} to ${e.radius[1]} mi` : "Whole country";
}
function yn(e, t) {
	return [...e.priority.map((t) => e.angles.find((e) => e.name === t)).filter(Boolean), ...e.angles.filter((t) => !e.priority.includes(t.name))].slice(0, t);
}
//#endregion
//#region src/lib/clientsBuilds.js
var bn = /* @__PURE__ */ t({
	BUILDS: () => rr,
	SECTIONS: () => nr,
	buildLinks: () => ar,
	getBuild: () => ir
}), E = (e) => String(e || "").trim();
function D(e) {
	let t = [
		["Business name", e.name],
		["Type of business", e.business_type],
		["City", e.location],
		["Address", e.address],
		["Phone", e.phone],
		["Email", e.email],
		["Website", e.website],
		["Instagram", e.instagram],
		["Facebook", e.facebook]
	].filter(([, e]) => E(e)), n = E(e.preview_source);
	return `THE BUSINESS
${t.map(([e, t]) => `- ${e}: ${E(t)}`).join("\n")}${n ? `\n\nTHEIR GOOGLE BUSINESS LISTING (real details, services, hours and reviews)\n${n}` : ""}`;
}
function O(e) {
	let t = e.analysis?.source === "claude" ? e.analysis : null;
	return t?.full_text ? `\n\nWHAT I FOUND WHEN I REVIEWED THEIR MARKETING (my notes; these are the ONLY findings you may state as facts)\n${E(t.full_text).slice(0, 7e3)}` : "";
}
function xn(e, { service: t = !0 } = {}) {
	let n = [
		["Name", e.name],
		["What I do", t && e.service],
		["Email", e.email]
	].filter(([, e]) => E(e));
	return n.length ? `\n\nFROM (the freelancer sending this)\n${n.map(([e, t]) => `- ${e}: ${E(t)}`).join("\n")}` : "";
}
var Sn = (e) => {
	let t = E(e.business_type);
	return /^[A-Z][a-z]/.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : t;
}, Cn = (e) => E(e.email) ? `opens an email to me at ${E(e.email)} (a simple email link, no email setup needed)` : "opens an email to me (a simple email link I can fill in later)";
function wn(e = "owner") {
	let t = e === "owner";
	return `RULES (these matter more than anything else)
- Only state facts that are in the details above. Never invent prices, awards, years in business, credentials, follower counts, results or numbers.
- Never invent or reword reviews.
${t ? "- If something would be worth checking but isn't in my notes, write it as a question to ask them (\"Worth a look: are new patients able to book online?\"), never as a fact." : "- This is for their customers. If something isn't in the details above, leave it out or use a clearly labeled placeholder the owner can fill in. No notes or questions for the owner on the page."}
- Use real-looking photos with people in them (AI-generated models are fine) so it feels alive and human: customers enjoying the service, the team at work, the place. Never present them as real named customers, real reviews or real results: no fake names on people, no invented testimonials, and no before-and-after shown as a real client's result.
- Don't stretch the facts. Never claim who does which treatment or job, how visits or appointments work, what's included, or what competitors or the local market are doing, unless it's written above.
- Write like a friendly expert${t ? " talking to the owner" : ""}. Plain words, no hype. No em dashes anywhere, not even as placeholders for missing numbers.
- Make the public pages open to anyone with the link, no login needed. I'll press Publish myself.`;
}
var Tn = wn("owner"), k = wn("customers"), En = "DESIGN (make it look like it came from a top performance-marketing agency, not a generic template)\n- Bold and editorial: a dark, high-contrast cover with huge type, then slides that mix light and dark sections. Big confident headlines, one accent color pulled from their brand, generous space.\n- It should scream \"ads expert\": real-looking phone mockups of the ads in the Instagram feed, Stories and Reels; a funnel diagram (Ad, then lead form or landing page, then a text within 5 minutes, then booked); a simple campaign structure diagram (1 campaign, the audience, 3 ads); big number cards for the budget, ad area and cost per lead; a 30-day timeline; and a mockup of the weekly report they'd get, tagged \"Sample report\", with the benchmark ranges instead of made-up results.\n- Lifestyle photos with people throughout (AI-generated models are fine), plus the place and the work. No fake names, reviews or results on them.\n- Smooth slide transitions, one slide per screen, arrow keys and swipe, slide numbers, and it reads well on a phone.", Dn = "DESIGN\n- A beautiful, premium presentation that works as a shareable web page: one slide per screen, arrow keys and swipe to move, slide numbers, and it reads well on a phone.\n- Elegant serif headings with a clean sans for text, lots of space, a calm palette that suits the business (use their brand colors if their website has clear ones).";
function On(e, t) {
	return `Create a beautiful, client-ready marketing audit presentation for this business. I'm a freelance marketer and I'll send it to the owner to start a conversation.

${D(e)}${O(e)}${xn(t)}

THE SLIDES (10 to 12)
1. Cover: "${E(e.name)}: marketing review", prepared by ${t.name || "me"}, with today's date.
2. At a glance: what they do, where, and their real rating and review count if the listing shows them.
3. What's already working: 2 or 3 genuine strengths, from my notes or their listing.
4 to 6. Three opportunities, one per slide. For each: what I noticed, why it matters for getting more customers, and what better looks like. Use only my notes. If I gave you fewer than three findings, fill the rest with clearly labeled questions worth checking.
7. A simple table: area, today, recommended.
8. What the first 30 days could look like (3 or 4 plain steps), tied to ${t.service || "the service I offer"}.
9. A next step slide: "Want to talk it through?" with a button that ${Cn(t)}.
${O(e) ? "" : "\nI haven't added my own review notes, so keep every opportunity as a question to explore, not a finding.\n"}
${Dn}

${Tn}
- Add a small line on the last slide: "Prepared for ${E(e.name) || "this business"}. Based on public information."`;
}
function kn(e, t) {
	let n = hn({
		business_name: e.name,
		business_description: `${E(e.business_type)} ${E(e.preview_source).slice(0, 600)}`
	}), r = e.analysis?.source === "claude" ? e.analysis : null, i = E(r?.idea_detail) || E(r?.idea), a = yn(n, 3), o = n.budget ? `INDUSTRY BENCHMARKS FOR ${n.label.toUpperCase()} (use these numbers exactly, and label them as typical for the industry, never as a promise)
- Suggested starting budget: $${n.budget[0]} to $${n.budget[1]} a day, paid by the business straight to Meta (about $${(n.budget[0] * 30).toLocaleString("en-US")} to $${(n.budget[1] * 30).toLocaleString("en-US")} a month)
- Ad area: ${vn(n)} around the business
- Typical cost per lead: ${gn(n) || "not available, so leave cost per lead out"}${_n(n) ? ` (source: ${_n(n)})` : ""}${n.cta ? `\n- Button that usually works: ${n.cta}` : ""}${n.formats ? `\n- Formats that work: ${n.formats}` : ""}${n.form_fields ? `\n- Lead form fields: ${n.form_fields}` : ""}` : "BUDGET\nI don't have industry benchmarks for this kind of business. Suggest starting with $20 a day as a two-week test, paid by the business straight to Meta, and leave cost per lead out.", s = a.length ? `THE THREE AD ANGLES TO SHOW (in this order). The example lines show the style only: never use their prices or claims, write new lines from the details above. Where an angle needs the client's own photos or video (like before-and-afters), show a polished sample tagged \"Sample creative, use the client's real photos\".\n${a.map((e, t) => `${t + 1}. ${e.name}: ${e.concept} Creative: ${e.creative} Example line: "${e.example}" Why it works: ${e.why}${e.caution ? ` Careful: ${e.caution}` : ""}`).join("\n")}` : "THE THREE AD ANGLES\nPick three different angles that fit this business: a first-visit or first-job offer, social proof from their real reviews, and showing the work or the place.";
	return `Create a beautiful, client-ready Meta ads proposal presentation for this business. I'm a freelance marketer and I'll send it to the owner to show them the Facebook and Instagram ad plan I'd run for them.

${D(e)}${O(e)}${xn(t)}

${o}

${s}

THE SLIDES (11 to 13)
1. Cover: "${E(e.name)}: Facebook and Instagram ads plan", prepared by ${t.name || "me"}, with today's date.
2. Where they are today: what they do, where, and their real rating and review count if the listing shows them. Only say whether they run ads now if my notes say so; otherwise ask it as a question.
3. The goal: one clear goal for the ads (for example more booked consultations or more quote requests), in one sentence.
4. The offer to lead with: ${i ? `build it around this idea from my review: ${i}.` : "a simple first-visit or first-job offer built on their most popular service."} Show it as a suggestion to confirm together. Use their real price if it's in the details above; otherwise show a realistic example price for this kind of business with a small "Example price" tag.
5. Who we'd reach: their city and the ad area above, and the kind of customer, in plain words.
6 to 8. Three sample ads, one per slide, using the three angles above. Show each one as a realistic Facebook or Instagram ad mockup: page name and "Sponsored", primary text, a scroll-stopping image or video frame with people in it (AI-generated models are fine), headline and button. Show them inside real-looking phone screens (Instagram feed, Stories and Reels placements). For a results angle, show a polished sample "after" photo tagged "Sample creative, use the client's real photos". Next to it: the angle name and why it works for this business. Tag each "Sample ad".
9. Where the clicks go: a short lead form inside Facebook and Instagram (with the fields above), or a landing page built for this offer. Recommend one and say why.
10. Budget and what to expect: the starting budget and ad area above, and the typical cost per lead with its source, written as "typical for ${n.label ? n.label.toLowerCase() : "this kind of business"}, not a promise". Say clearly the ad budget is paid to Meta by the business.
11. The first 30 days: week 1 set up tracking, the lead form and the ads, all reviewed and approved before anything goes live; week 2 launch and learn; week 3 keep what works and cut what doesn't; week 4 a simple report and the plan for month 2.
12. How leads get followed up: reply to every new lead within 5 minutes, with a simple text and call routine.
13. Next step: "Want to get this running?" with a button that ${Cn(t)}.
${O(e) ? "" : "\nI haven't added my own review notes, so keep anything about their current marketing as a question to explore, not a finding.\n"}
${En}

${Tn}
- Never promise results, leads, sales or a return. Only use the benchmark numbers above, labeled as typical for the industry.${n.compliance ? `\n- Ad rules for this industry: ${n.compliance}` : ""}
- Add a small line on the last slide: "Prepared for ${E(e.name) || "this business"}. Based on public information and industry benchmarks."`;
}
function An(e, t) {
	return `Create a visual Instagram makeover presentation for this business, to show the owner what their Instagram could look like if I managed it. I'm a freelance marketer and managing their Instagram is something I'd offer.

${D(e)}${O(e)}${xn(t, { service: !1 })}

THE SLIDES (8 to 10)
1. Cover: "${E(e.name)}: Instagram makeover", prepared by ${t.name || "me"}.
2. Where it stands today: only what's in the details above. If I didn't give you their current bio or numbers, show it as "Current profile" with the handle and leave the numbers out.
3. The new bio: shown inside a realistic Instagram profile mockup. Under 150 characters, with what they do, who it's for, one proof point that's in the details (like the real Google rating) and one clear call to action. Show the character count.
4. Highlights: 5 story highlight covers with short labels (for example Book, Reviews, Services, Team, Visit).
5. Content pillars: 3 or 4 topics they should post about and why each brings in customers.
6. The first 9 posts: a 3 by 3 grid of designed post tiles. Each tile is a polished designed post with a short headline on it (carousel covers, tips, quotes from real reviews, behind the scenes, people enjoying the service), labeled with its format (Reel, Carousel or Post). People are welcome; just no fake names or fake results.
7. Three sample captions, written in full, for three of those posts. Only promise what the details above say.
8. A simple weekly rhythm (how many posts, which days, which formats).
9. Next step: "Want me to take this on?" with a button that ${Cn(t)}.

${Dn}
- Mark the grid and captions with a small "Sample content" tag.

${Tn}`;
}
function jn(e, t) {
	let n = e.analysis?.source === "claude" ? e.analysis : null, r = E(n?.idea_detail) || E(n?.offer_to_send);
	return `Build a high-converting landing page for one offer from this business, to show the owner what a page built for ads or social could do. I'm a freelance marketer.

${D(e)}${O(e)}${xn(t)}

THE OFFER
${r ? `Build it around this idea from my review: ${r}` : "Pick the single service that looks most popular or most valuable from the details above, and build the page around a simple first-visit or free-consultation offer. Don't invent a discount or a price."}

THE PAGE (one page, in this order)
1. Hero: a specific headline about the result for the customer, one supporting line, one main button and a call button. Show the real star rating and review count under the buttons if the listing has them.
2. The problem they're dealing with, in the customer's words (3 short points).
3. Why people choose this business, using only the details and reviews above. Don't describe how their visits or jobs work unless it's written above.
4. How to get started: 3 simple steps (send the form, they get in touch, come in or get it done). Promise nothing beyond that.
5. Real reviews, word for word (3 at most). Leave this out if there are none.
6. FAQ: 4 honest questions a new customer would ask.
7. A short form (name, phone, email, one question) with a working thank-you message, and the button repeated.
8. On phones, a sticky button at the bottom.

Keep my notes and my name off the page. The footer line below is the only mention of me.

DESIGN
- Premium and modern for this kind of business, mobile first, one clear action everywhere.

${k}
- Add a small footer line: "Sample landing page made for ${E(e.name) || "this business"}."`;
}
function Mn(e, t) {
	return `Build an interactive revenue calculator for this business, branded for them, so the owner can see what better marketing could be worth. I'm a freelance marketer and I'll send them the link.

${D(e)}${xn(t)}

WHAT IT DOES
- Inputs with sliders and number boxes: leads per month, booking rate (%), show rate (%), close rate (%), average customer value ($).
- Pre-fill sensible example numbers for this kind of business, clearly labeled "Example numbers. Change them to yours." Never present them as this business's real numbers.
- The math, shown step by step:
  Leads x booking rate = appointments
  Appointments x show rate = people who show up
  People who show up x close rate = new customers
  New customers x average customer value = monthly revenue
- A second column, "With better marketing", where each rate can be nudged up, and a clear comparison: extra customers and extra revenue per month and per year, with a simple bar chart.
- Everything updates live, and the math must be correct. Test it.
- Show people and customers as whole numbers (round each step), and work out each next line from the number shown, so every line checks out on a calculator. Money in whole dollars.
- A short line under the results: "This is an estimate to explore, not a promise of results."
- A button: "Want to talk about the numbers?" that ${Cn(t)}.

DESIGN
- Clean, premium and branded for ${E(e.name) || "the business"} (their colors if their website has clear ones), easy on a phone.

${Tn}`;
}
function Nn(e) {
	let t = E(e.price_notes);
	return t ? `\n\nTHEIR PRICES AND RULES (use these exactly)\n${t}` : "\n\nPRICES\nI don't have their prices yet. Use clearly marked example prices (\"Example: $150 to $250\") that are easy to change in one place, and add a note on the admin page listing every price the owner must confirm before this goes live.";
}
var A = "SAVING LEADS\n- A short form on the results step: first name, email, phone (optional) and one consent checkbox (\"It's OK to contact me about this\").\n- Save every submission with the answers, the result shown and the date.\n- A private admin page (login required) listing submissions newest first, with their answers, a status (New, Contacted, Booked) and an export to CSV.", Pn = "DESIGN\n- Premium, modern and branded for ${name}, using their colors if their website has clear ones. Elegant serif headings, clean sans text, lots of space.\n- One question per screen with a progress bar, big tap targets, and it must feel great on a phone (most people will open it from Instagram or an ad).\n- Use real-looking photos with people (AI-generated models are fine) along with the place and the work, so it feels human. Never put fake names, quotes or results next to them.", j = (e) => he(e.build_industry || ge(e)), Fn = (e) => j(e).noun || Sn(e) || "business like this", M = (e) => `${/^[aeiou]/i.test(Fn(e)) ? "an" : "a"} ${Fn(e)}`, In = (e) => j(e).noun || Sn(e) ? `${M(e)}'s customers` : "this business's customers", N = (e) => Pn.replace("${name}", E(e.name) || "the business");
function Ln(e, t) {
	return `Build an interactive cost estimator for this business that they can promote in ads and on social to capture leads. Visitors answer a few questions and get a price range, then request an exact quote.

${D(e)}${Nn(e)}

THE EXPERIENCE
1. A short landing screen: a clear headline about finding out what their project or treatment could cost, what they'll get, and a Start button. Show the real rating if the listing has it.
2. 5 to 7 simple questions that drive the price for ${M(e)}. Ask about ${j(e).price}. Use picture cards where it helps.
3. The result: an estimated price range with a short breakdown and what affects the final price. Make the math correct and test it.
4. Save the lead (below), then a clear next step: "Request your exact quote" or "Book a consultation".

${A}

${N(e)}

${k}
- Every price shown is an estimate range with the line "Final pricing confirmed after a consultation."`;
}
function Rn(e, t) {
	return `Build an interactive "find the right service for you" quiz for this business that they can promote in ads and on social to capture leads.

${D(e)}

THE EXPERIENCE
1. A short landing screen with an inviting headline ("Not sure where to start?"), what they'll get and a Start button.
2. 5 to 7 friendly questions written for ${In(e)}, about ${j(e).quiz}.
3. A personalized result: the 1 or 2 services from their real service list that fit best, why, what to expect and a photo-style card for each. Only recommend services that are in the details above.
4. Save the lead (below), then a clear next step: book a consultation or call.

${A}

${N(e)}

${k}
- For anything medical or health related, keep results general ("worth asking about at your consultation") and never say someone is or isn't a candidate.`;
}
function zn(e, t) {
	return `Build an interactive assessment (a short scorecard) for this business that they can promote in ads and on social to capture leads. Visitors answer questions, get a score with personalized recommendations, and are invited to book.

${D(e)}

THE EXPERIENCE
1. A landing screen with a curiosity headline${j(e).score ? ` (for example "${j(e).score.headline}")` : ""}: a question their customers would want answered about themselves, written for ${In(e)}.
2. 8 to 10 quick questions across 3 or 4 categories${j(e).score ? ` (for example ${j(e).score.categories})` : ""}, each answer scoring points.
3. The result: an overall score out of 100, a score per category with a simple bar, the biggest area to work on and 3 practical recommendations. Make the scoring correct and test it.
4. Show the full results on screen, save the lead (below) with the results, and add a button to book a consultation. No automatic emails, so nothing extra needs setting up.

${A}

${N(e)}

${k}
- Results are general guidance, not professional advice. Say so in one short line under the score.`;
}
function Bn(e, t) {
	return `Build an instant quote tool this business can put on its website, so customers get a price in a minute instead of waiting for a call back.

${D(e)}${Nn(e)}

THE EXPERIENCE
1. Pick the service.
2. Answer the questions that set the price for that service (for ${M(e)}: ${j(e).price}), with picture cards where it helps.
3. Choose add-ons, each with its price.
4. See the quote update live: base price, add-ons, total, and what's included. Make the math correct and test it.
5. "Lock in this quote": name, email, phone, preferred date, then a clear confirmation that the business will confirm the details.

SAVING QUOTES
- Save every quote with the choices, the total and the contact details.
- A private admin page (login required) listing quotes newest first, with status (New, Confirmed, Booked, Lost) and an export to CSV.
- Keep every price in one settings area the owner can edit.

${N(e)}

${k}`;
}
function Vn(e, t) {
	return `Build a beautiful digital service menu for this business, with a "help me choose" option, so customers can browse everything they offer and send an inquiry about the right service.

${D(e)}${Nn(e)}

THE EXPERIENCE
1. The menu: services grouped into categories, each as a card with a short description, starting price and an "Ask about this" button. Show how long it takes only if it's in the details above. Tap a card for full details and what to expect.
2. "Help me choose": 4 or 5 quick questions that point to 1 or 2 services from the real list, with why.
3. An inquiry form that already knows which service they picked: name, email, phone, a question, preferred time.

SAVING INQUIRIES
- Save every inquiry with the service and the details.
- A private admin page (login required) listing inquiries newest first, with status (New, Replied, Booked) and an export to CSV.
- Services, descriptions and prices editable in one settings area.

${N(e)}

${k}
- Only list services that are in the details above. If a price isn't known, show "Ask for pricing".`;
}
function Hn(e, t) {
	return `Build a booking request portal this business can put on its website and Instagram, so customers can pick a service and ask for a time without calling.

${D(e)}${Nn(e)}

THE EXPERIENCE
1. Pick a service from their real service list, each with its price (and how long it takes, only if it's in the details above).
2. Pick a preferred date on a calendar, then a time of day (morning, afternoon or evening). Only offer days and hours they're open, from the details above.
3. Contact details: name, email, phone and an optional note.
4. A clear confirmation screen: "Request sent. ${E(e.name) || "The business"} will confirm your time." with a summary of what they asked for. This is a request, not a confirmed appointment, so never say it's booked.

SAVING REQUESTS
- Save every request with the service, date, time of day and contact details.
- A private admin page (login required) listing requests by date, with status (New, Confirmed, Rescheduled, Cancelled), a simple calendar view and an export to CSV.
- Services, prices and opening hours editable in one settings area.

${N(e)}

${k}`;
}
function Un(e) {
	let t = E(e.reward_notes);
	return t ? `\n\nTHEIR REFERRAL REWARD (use this exactly)\n${t}` : "\n\nREFERRAL REWARD\nI don't know their reward yet. Use a clearly marked example (\"Example: $25 off your next visit for you and your friend\") that the owner can change in one place, and remind them on the admin page to set it before sharing.";
}
function Wn(e, t) {
	return `Build a referral program app for this business, so happy customers can share a personal link and get rewarded when friends come in.

${D(e)}${Un(e)}

THE EXPERIENCE
1. A friendly page for existing customers: what the reward is, how it works in 3 steps, and a short sign-up (name, email, phone).
2. After signing up, each customer gets their own referral link and code, with buttons to copy it, text it and share it.
3. When a friend opens that link they land on a welcome page from ${E(e.name) || "the business"} with the offer, and a short form (name, email, phone, what they're interested in). The referral is credited to the right customer automatically.
4. Customers can come back with their referral code to see how many friends they've referred and their reward status.

THE ADMIN SIDE (login required)
- Every referrer with their link, how many friends they sent and how many came in.
- Every referred friend, who sent them, and a status (New, Booked, Came in).
- Mark a reward as earned and then as given, so nobody is forgotten.
- The reward wording editable in one settings area, and an export to CSV.

${N(e)}

${k}
- Never promise a reward the business hasn't set. Rewards are only earned after the friend comes in, unless the details above say otherwise.`;
}
function Gn(e, t) {
	return `Build a package builder this business can put on its website, so customers can put together their own package, see the price as they go and send it in.

${D(e)}${Nn(e)}

THE EXPERIENCE
1. Start from 2 or 3 ready-made packages built only from their real services and prices (for example a starter, a most popular and a complete option), or start from scratch.
2. Add or remove services and extras with simple toggles and number pickers. The total updates live with a clear line-by-line breakdown. Make the math correct and test it.
3. A summary of the finished package they can review, with "Send my package" asking for name, email, phone, preferred date and a note.
4. A confirmation that the business will review the package and get back to them.

SAVING PACKAGES
- Save every package with its items, total and contact details.
- A private admin page (login required) listing packages newest first, with status (New, Quoted, Booked, Lost) and an export to CSV.
- Every service, extra and price editable in one settings area, including the ready-made packages.

${N(e)}

${k}
- Only use services and prices from the details above. Don't invent discounts or package savings unless they're written above.`;
}
function Kn(e, t) {
	let n = E(e.price_notes);
	return n ? `\n\nTHEIR NUMBERS (use these exactly)\n${n}` : `\n\nNUMBERS\nI don't have their numbers yet (${t}). Use sensible, clearly labeled example assumptions ("Example assumption: ...") kept in one settings area the owner can edit, show them on the page in a small "How this is worked out" note, and add a note on the admin page listing every number the owner must confirm before this goes live.`;
}
var qn = (e) => `- Under every result, one short line: "This is an estimate to help you plan, not ${e}."`;
function Jn(e, t) {
	return `Build an interactive savings calculator for this business that they can promote in ads and on social to capture leads. Visitors enter what they pay today and see what they could save with this business's service.

${D(e)}${Kn(e, "typical costs, rates and how much their service usually saves")}

THE EXPERIENCE
1. A short landing screen: a clear headline about finding out what they could save, what they'll get, and a Start button. Show the real rating if the listing has it.
2. 4 to 6 simple questions that drive the savings for ${M(e)} (for example what they pay each month, home or space size, age of what they have now, and their zip code or area). Sliders and picture cards where it helps.
3. The result: estimated savings per month, per year and over 10 years, a simple bar chart of today vs with the service, and a short "How this is worked out" note showing the assumptions. Make the math correct and test it.
4. Save the lead (below), then a clear next step: "Get your exact savings" or "Book a free assessment".

${A}

${N(e)}

${k}
${qn("a quote or a guarantee")}
- Never invent rebates, tax credits, incentives or savings percentages. Use only what's in their numbers above, or labeled example assumptions.`;
}
function Yn(e, t) {
	return `Build an interactive budget planner for this business that they can promote in ads and on social to capture leads. Visitors enter their total budget and see how to split it, then talk to the business about making it happen.

${D(e)}${Kn(e, "their typical costs and how budgets usually split")}

THE EXPERIENCE
1. A short landing screen: a clear headline about planning their budget, what they'll get, and a Start button. Show the real rating if the listing has it.
2. 3 to 5 questions that shape the plan for ${M(e)} (total budget, size or scope, priorities, timing).
3. The plan: the budget split into 5 to 8 categories with amounts and percentages, a simple chart, and sliders to move money between categories. The total always stays equal to their budget and the remaining amount updates live. Make the math correct and test it.
4. Mark which categories this business can help with (only services in the details above).
5. Save the lead (below) with their plan, then a clear next step: "Talk through your plan" or "Book a consultation".

${A}

${N(e)}

${k}
${qn("a quote")}`;
}
function Xn(e, t) {
	return `Build an interactive affordability calculator for this business that they can promote in ads and on social to capture leads. Visitors find out what they can comfortably afford, then talk to the business about next steps.

${D(e)}${Kn(e, "the interest rate, term, down payment and any costs to include")}

THE EXPERIENCE
1. A short landing screen: a clear headline about finding out what they can afford, what they'll get, and a Start button. Show the real rating if the listing has it.
2. Inputs with sliders and number boxes: yearly income, monthly debts, down payment, interest rate and loan term (rate and term pre-filled from their numbers or labeled examples, and editable).
3. The result: a comfortable price range and the estimated monthly payment, with a simple breakdown. Use the standard loan payment formula, keep total monthly debts within a sensible share of income, and show the assumptions in a "How this is worked out" note. Make the math correct and test it with easy numbers.
4. Save the lead (below), then a clear next step: "Talk through your options" with ${E(e.name) || "the business"}.

${A}

${N(e)}

${k}
${qn("financial advice or a pre-approval")}
- Never show a rate as their current rate unless it's in their numbers above. Label any example rate clearly.`;
}
function Zn(e, t) {
	return `Build an interactive checklist for this business that they can promote in ads and on social to capture leads. Visitors tick off what they've done, see what they're missing, and get help with the rest.

${D(e)}

THE CHECKLIST
- Pick the checklist that fits ${M(e)}'s customers best (for example a business expense checklist for an accountant, a move-out checklist for a cleaner, a planning checklist for a wedding planner, a pre-listing checklist for a realtor). Use the title as the headline.
- 15 to 25 practical items in 3 to 5 groups, each with a one-line tip. Only general, widely true advice.

THE EXPERIENCE
1. A short landing screen: the checklist title, who it's for, what they'll get, and a Start button. Show the real rating if the listing has it.
2. The checklist: tap to tick items, a progress bar, and each group shows how many are done.
3. The result: what they've covered, the items they missed with their tips, and which ones ${E(e.name) || "the business"} can help with (only services in the details above).
4. Save the lead (below), then show a clean printable version (a "Print or save as PDF" button) and a clear next step: "Get help with the rest".

${A}

${N(e)}

${k}
- Keep tips general. Nothing that reads as legal, tax, medical or financial advice for their situation.`;
}
function Qn(e, t) {
	return `Build a personalized plan generator for this business that they can promote in ads and on social to capture leads. Visitors answer a few questions and get their own simple plan, then book with the business to go further.

${D(e)}

THE PLAN
- Pick the plan that fits ${M(e)}'s customers best (for example a 4-week workout plan for a gym or trainer, a morning and evening routine for a skin care business, a 12-month lawn care calendar for a landscaper, a weekly cleaning schedule for a cleaner). Use it as the headline.
- Build the plan from fixed rules in the app (no AI calls), so it costs nothing each time someone uses it. Write the building blocks yourself, matched to each combination of answers.

THE EXPERIENCE
1. A short landing screen: a clear headline about getting their own plan, what they'll get, and a Start button. Show the real rating if the listing has it.
2. 5 to 7 questions (goal, starting point, time they have, preferences, anything to avoid).
3. Their plan: laid out week by week or step by step, clearly personalized to their answers, with where ${E(e.name) || "the business"} can help (only services in the details above).
4. Save the lead (below), then show a printable version ("Print or save as PDF") and a clear next step: "Book a session" or "Get help with your plan".

${A}

${N(e)}

${k}
- Keep it general and safe. For anything health related, add one short line: "Check with a professional before starting something new."`;
}
var $n = [
	{
		id: "estimator",
		usesIndustry: !0,
		label: "Cost estimator",
		title: "Cost estimator",
		what: "Visitors answer a few questions and get a price range, then request an exact quote. Every answer is saved as a lead.",
		when: "Great for dentists, roofers, landscapers, cleaners, solar, wedding planners. Anyone whose customers ask \"how much?\" first.",
		prompt: Ln,
		usesPrices: !0,
		checks: [
			"Test the price math with a few answers",
			"Every price is the owner's, or marked as an example",
			"It says final pricing is confirmed later",
			"A test lead shows up on the admin page",
			"It looks good on your phone"
		]
	},
	{
		id: "quiz",
		usesIndustry: !0,
		label: "Finder quiz",
		title: "Service finder quiz",
		what: "A friendly quiz that recommends the right service from their real menu, then invites them to book.",
		when: "Great for med spas, salons, photographers, studios, interior designers.",
		prompt: Rn,
		checks: [
			"It only recommends services they really offer",
			"Health topics stay general",
			"Every answer leads to a result",
			"A test lead shows up on the admin page",
			"It looks good on your phone"
		]
	},
	{
		id: "assessment",
		usesIndustry: !0,
		label: "Assessment",
		title: "Score assessment",
		what: "A short scorecard with a score out of 100, category scores and three recommendations, then a booking button.",
		when: "Great for coaches, fitness studios, dentists, home services, accountants.",
		prompt: zn,
		checks: [
			"Test the scoring with all-low and all-high answers",
			"Recommendations make sense for each result",
			"It says it's general guidance",
			"A test lead shows up on the admin page",
			"It looks good on your phone"
		]
	},
	{
		id: "savings",
		label: "Savings calculator",
		title: "Savings calculator",
		what: "Visitors enter what they pay today and see what they could save per month, per year and over 10 years.",
		when: "Great for solar, HVAC, insulation, windows, water heaters. Anyone who saves customers money over time.",
		prompt: Jn,
		input: {
			field: "price_notes",
			label: "Their numbers",
			hint: "Optional. Without them, the build uses example assumptions you'll swap later.",
			placeholder: "Average customer saves 70 to 90% on electric. System cost about $3 per watt. Local rate about 14 cents per kWh."
		},
		checks: [
			"Test the math with easy numbers",
			"Every assumption is theirs or labeled as an example",
			"No made-up rebates or tax credits",
			"A test lead shows up on the admin page",
			"It looks good on your phone"
		]
	},
	{
		id: "budget",
		label: "Budget planner",
		title: "Budget planner",
		what: "Visitors enter a total budget and get a split by category they can adjust, with the total always adding up.",
		when: "Great for wedding and event planners, remodelers, landscapers, interior designers.",
		prompt: Yn,
		input: {
			field: "price_notes",
			label: "Their numbers",
			hint: "Optional. Without them, the build uses example assumptions you'll swap later.",
			placeholder: "Typical wedding: venue 40%, catering 25%, photo 10%, flowers 8%, music 7%, attire 5%, other 5%."
		},
		checks: [
			"Moving a slider keeps the total equal to the budget",
			"Every split is theirs or labeled as an example",
			"Only real services are marked as theirs",
			"A test lead shows up on the admin page",
			"It looks good on your phone"
		]
	},
	{
		id: "affordability",
		label: "Affordability",
		title: "Affordability calculator",
		what: "Visitors enter income, debts and a down payment and see a comfortable price range and monthly payment.",
		when: "Great for realtors, mortgage lenders, car dealers, builders, anyone offering financing.",
		prompt: Xn,
		input: {
			field: "price_notes",
			label: "Their numbers",
			hint: "Optional. Without them, the build uses example assumptions you'll swap later.",
			placeholder: "30-year fixed, example rate 6.5%. Include taxes and insurance at about 1.5% of price per year."
		},
		checks: [
			"Test the payment with easy numbers against an online mortgage calculator",
			"Any example rate is clearly labeled",
			"It says it's not advice or a pre-approval",
			"A test lead shows up on the admin page",
			"It looks good on your phone"
		]
	},
	{
		id: "checklist",
		label: "Checklist",
		title: "Interactive checklist",
		what: "A tap-to-tick checklist with progress, the items they missed with tips, and a printable copy.",
		when: "Great for accountants, cleaners, movers, wedding planners, realtors, contractors.",
		prompt: Zn,
		checks: [
			"Every tip is general and true",
			"Missed items show with their tips",
			"Print or save as PDF works",
			"A test lead shows up on the admin page",
			"It looks good on your phone"
		]
	},
	{
		id: "plan",
		label: "Personalized plan",
		title: "Personalized plan",
		what: "Visitors answer a few questions and get their own week-by-week plan, built without AI so it costs nothing per use.",
		when: "Great for trainers, gyms, skin care, lawn care, cleaners, nutrition and wellness coaches.",
		prompt: Qn,
		checks: [
			"Different answers give different plans",
			"It's general and safe, with the check-with-a-pro line if health related",
			"Print or save as PDF works",
			"A test lead shows up on the admin page",
			"It looks good on your phone"
		]
	}
], er = [
	{
		id: "quote",
		usesIndustry: !0,
		label: "Instant quote",
		title: "Instant quote generator",
		what: "Customers pick a service, answer questions, add extras and see their price live, then lock it in.",
		when: "Great for cleaning, landscaping, painting, mobile detailing, photography.",
		prompt: Bn,
		usesPrices: !0,
		checks: [
			"The prices match what the owner approved",
			"Totals add up with add-ons",
			"A test quote shows up on the admin page",
			"The owner can edit prices in one place",
			"It looks good on your phone"
		]
	},
	{
		id: "menu",
		label: "Service menu",
		title: "Service menu and finder",
		what: "A beautiful menu of everything they offer, a \"help me choose\" quiz and an inquiry form that knows which service they picked.",
		when: "Great for salons, med spas, spas, studios, photographers.",
		prompt: Vn,
		usesPrices: !0,
		checks: [
			"Every service is real",
			"Unknown prices say \"Ask for pricing\"",
			"Each \"Ask about this\" fills in the form",
			"A test inquiry shows up on the admin page",
			"It looks good on your phone"
		]
	},
	{
		id: "booking",
		label: "Booking portal",
		title: "Booking request portal",
		what: "Customers pick a service, a date and a time of day, and send a booking request the business confirms.",
		when: "Great for salons, photographers, trainers, cleaners, studios. Anyone still booking by phone or DM.",
		prompt: Hn,
		usesPrices: !0,
		checks: [
			"Only real services and prices",
			"Only days and hours they're open",
			"It says \"request\", never \"booked\"",
			"A test request shows up on the admin page",
			"It looks good on your phone"
		]
	},
	{
		id: "referral",
		label: "Referral program",
		title: "Referral program",
		what: "Happy customers get their own share link, friends sign up through it, and the business tracks who earned a reward.",
		when: "Great for salons, cleaners, fitness studios, photographers, med spas. Any business that grows by word of mouth.",
		prompt: Wn,
		input: {
			field: "reward_notes",
			label: "Their referral reward",
			hint: "Optional. Without it, the build uses an example reward you'll swap later.",
			placeholder: "$25 off for you and your friend after their first visit."
		},
		checks: [
			"The reward is theirs, or marked as an example",
			"Two test sign-ups get different links",
			"A friend through a link is credited to the right person",
			"Rewards can be marked earned and given",
			"It looks good on your phone"
		]
	},
	{
		id: "package",
		label: "Package builder",
		title: "Package builder",
		what: "Customers build their own package from real services and extras, watch the total update and send it in.",
		when: "Great for photographers, event planners, caterers, cleaners, designers, salons.",
		prompt: Gn,
		usesPrices: !0,
		checks: [
			"Every service and price is real",
			"Totals add up as items change",
			"No made-up package discounts",
			"A test package shows up on the admin page",
			"It looks good on your phone"
		]
	}
], tr = [
	{
		id: "website",
		label: "Website",
		title: "Preview website",
		what: "A redesigned one-page website built from their real details.",
		when: "Best when their website is outdated, slow or missing.",
		prompt: (e) => ln(e),
		checks: [
			"The name, phone, address and hours are right",
			"Every review is real and word for word",
			"No made-up prices, awards or numbers",
			"No fake names or reviews next to the people in photos",
			"It looks good on your phone"
		]
	},
	{
		id: "audit",
		label: "Marketing audit",
		title: "Marketing audit deck",
		what: "A polished presentation of what's working, three opportunities and a 30-day plan.",
		when: "Best after you've run the AI Lead Analyzer, so every finding is real.",
		prompt: On,
		checks: [
			"Every finding is something you actually saw",
			"Anything unconfirmed is written as a question",
			"Their rating and review count are exact",
			"It sounds helpful, not like a list of what's wrong",
			"Your name and contact are on the last slide"
		],
		needsAnalysis: !0
	},
	{
		id: "adplan",
		label: "Ad strategy proposal",
		title: "Meta ads proposal deck",
		what: "A polished Facebook and Instagram ads plan: the offer, three sample ads, budget, industry benchmarks and the first 30 days.",
		when: "Best when you pitch ad management, especially to businesses that aren't running ads or are boosting posts.",
		prompt: kn,
		checks: [
			"Every number is an industry benchmark with its source, not a promise",
			"The offer is marked as a suggestion to confirm",
			"Before-and-afters use the client's real photos before it goes to them",
			"It says the ad budget is paid to Meta",
			"Your name and contact are on the last slide"
		]
	},
	{
		id: "instagram",
		label: "Instagram makeover",
		title: "Instagram makeover deck",
		what: "A new bio in a profile mockup, content pillars, a 9-post grid and sample captions.",
		when: "Best for salons, med spas, studios and anyone posting rarely or inconsistently.",
		prompt: An,
		checks: [
			"The bio is under 150 characters",
			"No made-up follower counts or results",
			"No fake names, reviews or results on the posts",
			"Sample content is labeled as sample",
			"The captions sound like the business"
		]
	},
	{
		id: "landing",
		label: "Landing page",
		title: "Sample landing page",
		what: "A focused page for one offer, ready for ads or social, with a working form.",
		when: "Best when they run ads or promos that send people to their homepage.",
		prompt: jn,
		checks: [
			"The offer is real or clearly a suggestion",
			"No made-up discounts or prices",
			"The form and thank-you message work",
			"The button is the same everywhere",
			"It looks good on your phone"
		]
	},
	{
		id: "calculator",
		label: "Revenue calculator",
		title: "Revenue calculator",
		what: "An interactive calculator, branded for them, showing what better marketing could be worth.",
		when: "Best for appointment-based businesses with a clear price per customer.",
		prompt: Mn,
		checks: [
			"Test the math with easy numbers (100 leads, 50%, 50%, 50%, $100 = $1,250)",
			"Example numbers are labeled as examples",
			"It says it's an estimate, not a promise",
			"The sliders work on your phone",
			"Your contact button works"
		]
	}
], nr = [
	{
		id: "get",
		label: "Builds to get clients",
		short: "Get clients",
		intro: "Make something for a business you want to work with, then send them the link.",
		builds: tr
	},
	{
		id: "magnets",
		label: "Lead magnets for clients",
		short: "Lead magnets",
		intro: "Build something a business can promote in ads and on social to bring in leads.",
		builds: $n
	},
	{
		id: "sell",
		label: "Builds to sell to clients",
		short: "Sell to clients",
		intro: "Build a tool a business's customers use, and sell it as part of your service.",
		builds: er
	}
], rr = [
	...tr,
	...$n,
	...er
], ir = (e) => rr.find((t) => t.id === e) || rr[0];
function ar(e) {
	let t = [], n = e.builds || {};
	return rr.forEach((r) => {
		let i = E(n[r.id]?.url) || (r.id === "website" ? E(e.preview_url) : "");
		i && t.push({
			id: r.id,
			title: r.title,
			url: i
		});
	}), t;
}
//#endregion
//#region src/lib/clientsOutreach.js
var or = /* @__PURE__ */ t({
	MESSAGE_FIELDS: () => hr,
	OUTREACH_TONES: () => sr,
	buildOutreachPrompt: () => dr,
	finalizeOutreach: () => fr,
	outreachChecks: () => mr
}), sr = [
	{
		id: "shorter",
		label: "Shorter"
	},
	{
		id: "casual",
		label: "More casual"
	},
	{
		id: "professional",
		label: "More professional"
	}
], cr = {
	shorter: "Make every message noticeably shorter. Cut anything that isn't needed.",
	casual: "Make every message more casual and relaxed, like a friendly local texting another local business owner.",
	professional: "Make every message a little more polished and professional, but still warm and short."
}, lr = { type: "string" }, ur = {
	type: "object",
	properties: {
		dm: lr,
		email_subject: lr,
		email_body: lr,
		follow_up_1: lr,
		follow_up_2: lr
	},
	required: [
		"dm",
		"email_subject",
		"email_body",
		"follow_up_1",
		"follow_up_2"
	]
};
function dr({ offer: e, profile: t, prospect: n, tone: r }) {
	let i = n.analysis || {}, a = [...i.where_you_could_help || [], ...i.doing_now || []].filter((e) => e.source !== "guess").map((e) => `${e.gap || e.point} (${Mt[e.source]}${e.evidence ? `: "${e.evidence}"` : ""})`), o = Ot(n.observations, e);
	return {
		prompt: `Write first-touch outreach from a freelance marketer to a local business owner.

THE FREELANCER
- Name: ${ce(t || {}) || "the freelancer"}
- Service: ${e ? se(e) : "freelance marketing"} for ${e ? h(e) : "small businesses"}
- How she describes it: ${e?.record?.talk?.one_sentence || "not set"}

THE BUSINESS
- Name: ${n.name}
- Type and location: ${n.business_type}, ${n.location}

${i.source === "claude" ? `WHAT SHE FOUND (her Claude review of their screenshots; only use these as facts)
- Something they do well: ${String(i.positive || "not set").replace(/==/g, "")}
- The opportunity: ${String(i.opportunity || "not set").replace(/==/g, "")}
- The idea she can offer to send: ${i.idea || "a few ideas"}
- The sample she has ALREADY made for them: ${(i.chosen_samples || []).map(C).filter(Boolean).length ? (i.chosen_samples || []).map(C).filter(Boolean).map((e) => `${/^[aeiou]/i.test(e.name) ? "an" : "a"} ${e.name.toLowerCase()} (${i.chosen_text || e.receive})`).join(" plus ") : i.offer_to_send || i.idea || "a few ideas"}
- What she's pitching: ${i.pitch || "her freelance marketing service"}
- Where she saw it: ${i.evidence || "not set"}
` : `WHAT SHE FOUND (only use these as facts)
- Real observations: ${a.join("; ") || "none"}
- What she noticed herself: ${o.join("; ") || "nothing extra"}
- Her own research notes: ${String(n.research_notes || "").slice(0, 2e3) || "none"}
- The result to hint at: ${i.pitch?.what || "not set"}
- Her way in: ${i.pitch?.angle || "not set"}
- A sample she can offer to make: ${i.pitch?.show_them || "a few ideas"}
`}
${ar(n).length ? `WHAT SHE ALREADY BUILT FOR THEM (free, made just for them)
${ar(n).map((e) => `- ${e.title}: ${e.url}`).join("\n")}
- Mention it naturally as something she already made for them and include the link in the DM and the email. Make clear it's a sample made for them, not something live, and that there's no catch. If there's more than one, lead with the one that fits the opportunity best.

` : ""}THE FORMULA FOR EVERY FIRST MESSAGE
1. Why she's reaching out (shows it isn't random).
2. One specific thing she noticed about THIS business. Compliment something real first.
3. One useful thought about the opportunity.
4. Say she already put the sample together for them (for example "I put together a sample carousel built around that"), then an easy next step: offer to send it over ("Want me to send it over?"). Never offer to make it; it is already made. End with a simple question.

WRITE
- dm: Instagram or Facebook DM. 60 words or fewer. Starts with "Hey" and the business name or "team". Sounds like a real person.
- email_subject: under 8 words, specific to them, no clickbait.
- email_body: 110 words or fewer. Same formula. Greeting "Hi ${n.name} team,". Sign off with just her first name.
- follow_up_1: for 3 days later if no reply. 30 words or fewer. A friendly bump, no guilt.
- follow_up_2: for 7 days later. 50 words or fewer. Adds ONE new useful observation or idea from what she found, then a soft question.

RULES
- Never mention prices, packages, a list of services, a portfolio, her resume, or "book a call".
- Never claim past clients, results, or years of experience.
- Never invent facts about the business. Only use what she found.
- Never insult their marketing. Frame it as an opportunity for a business that's already doing good work.
- Don't make it about her. Keep "I" to a minimum.
- No em dashes or en dashes. No exclamation marks. No "I hope this finds you well".
${r ? `- ${cr[r]}` : ""}

${Ee("outreach")}`,
		response_json_schema: ur
	};
}
function fr(e) {
	let t = e || {};
	return {
		dm: S(t.dm),
		email_subject: S(t.email_subject),
		email_body: S(t.email_body),
		follow_up_1: S(t.follow_up_1),
		follow_up_2: S(t.follow_up_2),
		generated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
}
var pr = (e) => String(e || "").trim().split(/\s+/).filter(Boolean).length;
function mr(e, { prospectName: t, maxWords: n, requireName: r = !0 }) {
	let i = String(e || ""), a = pr(i), o = (i.match(/\bI\b/g) || []).length, s = String(t || "").split(/\s+/)[0] || "";
	return [
		{
			label: `Short (${a} words)`,
			pass: a <= n
		},
		...r ? [{
			label: "Specific to them",
			pass: !!s && i.toLowerCase().includes(s.toLowerCase())
		}] : [],
		{
			label: "No price or package",
			pass: !/\$\d|\bprice|\bpackage|\bper month\b/i.test(i)
		},
		{
			label: "Not all about you",
			pass: o <= 3
		},
		{
			label: "Easy to reply to",
			pass: /\?\s*$/.test(i.trim()) || /\?/.test(i.split(/\n/).slice(-2).join(" "))
		}
	];
}
var hr = [
	{
		key: "dm",
		label: "Instagram or Facebook DM",
		maxWords: 60,
		when: "Send first",
		requireName: !0
	},
	{
		key: "email",
		label: "Email",
		maxWords: 110,
		when: "Or send by email",
		requireName: !0
	},
	{
		key: "follow_up_1",
		label: "Follow-up 1",
		maxWords: 30,
		when: "3 days later, if no reply",
		requireName: !1
	},
	{
		key: "follow_up_2",
		label: "Follow-up 2",
		maxWords: 50,
		when: "7 days later, if still no reply",
		requireName: !1
	}
], gr = /* @__PURE__ */ t({
	ADS_LIBRARY_VERSION: () => _r,
	ASSET_OPTIONS: () => wr,
	BUDGET_PRESETS: () => Cr,
	BUSINESS_TYPES: () => vr,
	DIAGNOSIS: () => Fr,
	GENERAL_AD_RULES: () => jr,
	GOALS: () => br,
	HEALTH_AD_RULES: () => Mr,
	PRACTICE_BUSINESS: () => yr,
	RULEBOOK: () => Pr,
	formatMoney: () => P,
	getBudgetPlan: () => kr,
	getCampaignSetup: () => Ar,
	getComplianceRules: () => Nr,
	isHealthBusiness: () => Dr,
	resolveGoal: () => Sr,
	roundTo: () => Or
}), _r = "1.0.0", vr = [
	{
		id: "local",
		label: "Local business",
		description: "Restaurants, gyms, home services, shops"
	},
	{
		id: "health_beauty",
		label: "Health and beauty",
		description: "Med spas, salons, dentists, clinics, wellness"
	},
	{
		id: "ecommerce",
		label: "Online store",
		description: "Sells products online"
	},
	{
		id: "coaching",
		label: "Coaching or courses",
		description: "Coaches, consultants, online programs"
	},
	{
		id: "professional",
		label: "Professional service",
		description: "Law, accounting, agencies, B2B"
	},
	{
		id: "other",
		label: "Other",
		description: "Something else"
	}
], yr = {
	business_name: "Glow Aesthetics (practice)",
	business_type: "health_beauty",
	website: "",
	business_description: "A small, independent med spa offering Botox, fillers, facials and laser hair removal. Two providers, open 6 days a week.",
	location: "Austin, TX"
}, br = [
	{
		id: "leads",
		label: "Submit their information",
		description: "They fill out a short form so the business can follow up."
	},
	{
		id: "appointments",
		label: "Book an appointment",
		description: "They request or book a visit, call or consultation."
	},
	{
		id: "purchases",
		label: "Buy something",
		description: "They buy a product online."
	},
	{
		id: "traffic",
		label: "Visit the website",
		description: "They go to a page to learn more."
	},
	{
		id: "help",
		label: "Help me choose",
		description: "We'll pick the best goal for this business."
	}
], xr = {
	local: "leads",
	health_beauty: "appointments",
	ecommerce: "purchases",
	coaching: "leads",
	professional: "leads",
	other: "leads"
};
function Sr(e, t) {
	return e && e !== "help" ? e : xr[t] || "leads";
}
var Cr = [
	300,
	600,
	1e3,
	1500,
	3e3
], wr = [
	{
		id: "photos",
		label: "Photos"
	},
	{
		id: "videos",
		label: "Videos"
	},
	{
		id: "both",
		label: "Both"
	},
	{
		id: "none",
		label: "None yet"
	},
	{
		id: "unsure",
		label: "Not sure"
	}
], Tr = {
	leads: {
		objective: "Leads",
		conversion_location: "Instant forms",
		performance_goal: "Maximize number of leads",
		destination: "instant_form",
		destination_label: "Meta Instant Form",
		cta_options: [
			"Sign up",
			"Learn more",
			"Get quote"
		]
	},
	appointments: {
		objective: "Leads",
		conversion_location: "Instant forms",
		performance_goal: "Maximize number of leads",
		destination: "instant_form",
		destination_label: "Meta Instant Form (then follow up to book)",
		cta_options: [
			"Book now",
			"Sign up",
			"Learn more"
		]
	},
	purchases: {
		objective: "Sales",
		conversion_location: "Website",
		performance_goal: "Maximize number of conversions (Purchase)",
		destination: "product_page",
		destination_label: "The product page on their website",
		cta_options: ["Shop now", "Learn more"]
	},
	traffic: {
		objective: "Traffic",
		conversion_location: "Website",
		performance_goal: "Maximize number of landing page views",
		destination: "landing_page",
		destination_label: "A page on their website",
		cta_options: ["Learn more"]
	}
}, Er = /(med ?spa|aesthetic|botox|filler|injectable|laser|dental|dentist|orthodont|clinic|chiropract|therap|wellness|weight ?loss|glp|semaglutide|tirzepatide|iv ?drip|hormone|derma|skin ?care|physical therapy|medical)/i;
function Dr(e) {
	return e.business_type === "health_beauty" || Er.test(`${e.business_description || ""} ${e.product || ""} ${e.business_name || ""}`);
}
var Or = (e, t) => Math.round(e / t) * t;
function kr(e, t) {
	let n = !e || t, r = n ? 600 : Number(e), i = Math.max(1, Math.round(r / 30.4)), a, o, s;
	return r < 750 ? (a = "small", o = 1, s = "This is a small test budget. Keep everything in one ad set so Meta learns faster, and expect results to build slowly.") : r < 1500 ? (a = "tight", o = 1, s = "Keep it simple: one campaign and one ad set, with a few ads competing inside it.") : r < 5e3 ? (a = "standard", o = 2, s = "There's room to test two different audiences or angles in separate ad sets.") : (a = "strong", o = 3, s = "There's room for a second campaign that shows ads again to people who already engaged (retargeting)."), {
		assumed: n,
		monthly: r,
		daily: i,
		tier: a,
		campaigns: a === "strong" ? 2 : 1,
		ad_sets: o,
		ads_per_ad_set: i < 25 ? 2 : i < 50 ? 3 : i < 100 ? 4 : 5,
		note: s,
		assumed_note: n ? "No budget was set yet, so this plan uses a starter test budget of about $600 a month ($20 a day). Change it any time." : "",
		small_warning: i < 10 ? "Under $10 a day, Meta has very little data to learn from. Results will be slow and noisy." : ""
	};
}
function Ar(e) {
	let t = Sr(e.goal, e.business_type), n = Tr[t], r = Dr(e), i = kr(e.monthly_budget, e.budget_unsure), a = [
		"local",
		"health_beauty",
		"professional"
	].includes(e.business_type), o = [];
	return t === "purchases" && o.push("Sales campaigns need the Meta pixel installed on the website and tracking purchases. Check this before launching."), t === "traffic" && o.push("Traffic campaigns bring visitors, not leads. If the business wants leads, a Leads campaign is usually the better choice."), r && o.push("Meta restricts how some health and wellness businesses can track and optimize for website actions. Instant forms keep everything inside Meta and avoid most of these limits."), {
		goal: t,
		goal_label: br.find((e) => e.id === t)?.label || "",
		goal_was_chosen_for_you: e.goal === "help",
		...n,
		budget: i,
		location_radius: a ? "Target the area around the business: about 10 to 15 miles in a big city, 20 to 25 miles in a smaller town." : "Target the countries or regions where the business sells.",
		audience_approach: "Start broad and let Meta find the right people. Set the location, keep age and gender wide unless the offer is clearly for one group, and skip detailed interests at first.",
		is_health: r,
		notes: o
	};
}
var jr = [
	"No fake reviews, results, testimonials, credentials or scarcity.",
	"No guarantees (\"guaranteed results\", \"lose 20 pounds\").",
	"Don't call out personal traits in the ad (\"Are you overweight?\", \"Struggling with acne?\"). Meta rejects these.",
	"The ad and the page or form after the click must say the same thing."
], Mr = [
	"Before and after photos: never for weight loss. For cosmetic treatments, only the business's own real results with the client's written permission, and check Meta's current health and wellness ad policy first.",
	"No promises about how someone will look (\"Look 10 years younger\", \"Fix your wrinkles\").",
	"No drug brand names, body or scale imagery for weight loss offers.",
	"Lead with the offer and the experience, with confident, warm language.",
	"Use real photos of the providers and the space where possible.",
	"Exclude existing clients if the business has a customer list."
];
function Nr(e) {
	return Dr(e) ? [...jr, ...Mr] : jr;
}
var Pr = [
	{
		label: "Watch",
		rule: "Don't judge an ad until it has run 3 days and spent about 2 times the target cost per lead. If it's between the target and 2 times the target, give it 2 to 3 more days."
	},
	{
		label: "Kill",
		rule: "Turn off an ad that has spent 2 times the target with no leads, or costs more than 2 times the target after spending 3 times the target."
	},
	{
		label: "Scale",
		rule: "At or under the target: leave it alone. After 5 or more days under the target, raise the budget 20%, then wait 3 days before raising it again. If the cost jumps after a raise, go back to the last budget."
	},
	{
		label: "Refresh",
		rule: "When people have seen it more than 3 times on average, or clicks have dropped by about a third, add 2 or 3 new ads. Leave the old ones running."
	},
	{
		label: "Never",
		rule: "Judge an ad in its first 24 hours, double the budget, or edit an ad that's working (make a new one instead)."
	},
	{
		label: "No target yet",
		rule: "If the client has no target cost per lead, the first 2 weeks set the baseline."
	}
], Fr = [
	{
		sign: "Expensive to show and few clicks",
		meaning: "The creative isn't stopping the scroll. Add new ads with different angles and visuals."
	},
	{
		sign: "Clicks but no leads",
		meaning: "The form, page or offer is the problem. Check it on a phone, shorten the form, make the offer clearer."
	},
	{
		sign: "Leads but few bookings",
		meaning: "Follow-up. Leads need a call or text within 5 minutes. This is the client's side: show them the numbers."
	},
	{
		sign: "Bookings but few sales",
		meaning: "Sales. The ads are doing their job. Show the client the booked numbers and talk about the consultation."
	}
];
function P(e) {
	return "$" + Number(e || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });
}
//#endregion
//#region src/lib/adsCards.js
var Ir = /* @__PURE__ */ t({
	BLANK_RE: () => Ur,
	adToText: () => Gr,
	countBlanks: () => Wr,
	displayName: () => F,
	fillBlanks: () => Vr,
	getAds: () => Br,
	headlineText: () => zr,
	isLegacyRecord: () => Lr,
	joinPrimary: () => Rr,
	listBlanks: () => Hr
});
function F(e) {
	return String(e || "").replace(/\s*\(practice\)\s*$/i, "");
}
function Lr(e) {
	return !!e && !e.angles?.[0]?.hooks;
}
function Rr(e) {
	return e.filter((e) => e && String(e).trim()).join("\n\n");
}
function zr(e) {
	return typeof e == "string" ? e : e?.text || "";
}
function Br(e) {
	let t = e.record;
	if (!t) return [];
	if (Lr(t)) return (t.ads?.primary_texts || []).map((e, n) => ({
		index: n,
		name: e.angle,
		why: t.angles?.[n]?.why || "",
		parts: [{
			part: "body",
			text: e.text
		}],
		primary: e.text,
		headline: t.ads.headlines?.[n] || t.ads.headlines?.[0] || "",
		description: t.ads.descriptions?.[0] || "",
		cta: t.ads.cta,
		image: {
			visual: t.ads.static_concepts?.[n]?.visual || "",
			overlay: t.ads.static_concepts?.[n]?.overlay || "",
			prompt: t.ads.image_prompts?.[n] || ""
		},
		video: t.ads.video_concepts?.[n] || null,
		angle: null,
		choice: {},
		edited: !1
	}));
	let n = e.ad_choices || {}, r = (t) => Vr(t, e.blank_values);
	return t.angles.map((e, i) => {
		let a = n[i] || {}, o = a.edits || {}, s = a.hook ?? 0, c = a.body ?? 0, l = a.headline ?? 0, u = e.hooks.map((e, t) => ({
			...e,
			text: r(o[`hook_${t}`] ?? e.text)
		})), d = e.bodies.map((e, t) => ({
			...e,
			text: r(o[`body_${t}`] ?? e.text)
		})), f = e.headlines.map((e, t) => ({
			structure: e?.structure || "",
			text: r(o[`headline_${t}`] ?? zr(e))
		})), ee = u[s] || u[0], p = d[c] || d[0], m = [
			{
				part: "hook",
				key: `hook_${s}`,
				type: ee?.type,
				text: ee?.text
			},
			{
				part: "body",
				key: `body_${c}`,
				type: p?.type,
				text: p?.text
			},
			{
				part: "offer",
				key: "offer",
				text: r(o.offer ?? e.offer_line)
			},
			{
				part: "trust",
				key: "trust",
				text: r(o.trust ?? e.trust_line)
			},
			{
				part: "next",
				key: "next",
				text: r(o.next ?? e.next_step)
			}
		].filter((e) => e.text), te = Rr(m.map((e) => e.text));
		return {
			index: i,
			name: e.name,
			why: e.why,
			parts: m,
			primary: a.text ? r(a.text) : te,
			edited: !!a.text,
			headline: (f[l] || f[0])?.text || "",
			headlineKey: `headline_${l}`,
			hooks: u,
			bodies: d,
			headlines: f,
			description: r(o.description ?? e.description),
			cta: t.cta,
			image: {
				...e.image,
				overlay: r(e.image?.overlay)
			},
			format: e.format || "",
			category: e.category || "",
			video: e.video?.script ? e.video : null,
			angle: e,
			choice: a
		};
	});
}
function Vr(e, t) {
	return !e || !t ? e : String(e).replace(Ur, (e) => {
		let n = t[e.toLowerCase()];
		return n && String(n).trim() ? n : e;
	});
}
function Hr(e) {
	let t = [
		e.primary,
		e.headline,
		e.description,
		e.image?.overlay
	].join(" ").match(Ur) || [];
	return [...new Set(t.map((e) => e.toLowerCase()))];
}
var Ur = /\[[^\]\n]{1,40}\]/g;
function Wr(e) {
	return Hr(e).length;
}
function Gr(e) {
	return [
		`AD ${e.index + 1}: ${e.name}`,
		"",
		"Primary text:",
		e.primary,
		"",
		`Headline: ${e.headline}`,
		`Description: ${e.description}`,
		`Button: ${e.cta}`
	].join("\n");
}
//#endregion
//#region src/lib/adsAngleLibrary.js
var Kr = /* @__PURE__ */ t({
	ANGLE_CATEGORIES: () => qr,
	categoriesForPrompt: () => Yr,
	getCategory: () => Jr
}), qr = [
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
			"Don't invent discounts, free services, or promotional deadlines."
		],
		formats: "Offer-led static image, short promotional video, package comparison carousel, or service demonstration with an offer overlay.",
		examples: [
			"Your first HydraFacial for just $49.",
			"Your first class is on us.",
			"Schedule your complimentary pest inspection."
		]
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
			"When a physical transformation isn't appropriate, use a customer success story."
		],
		formats: "Before-and-after carousel, transformation Reel, case-study video, comparison imagery, or customer story.",
		examples: [
			"Two hours completely transformed this driveway.",
			"You won't believe this is the same car.",
			"Wait until you see this pup after their appointment."
		]
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
			"Select proof relevant to the service being advertised."
		],
		formats: "UGC, testimonial video, review overlays, case-study carousel, customer reaction footage.",
		examples: [
			"See why homeowners across [City] choose our team.",
			"Don't take our word for it. Meet our members.",
			"Here's why these pet parents keep coming back."
		]
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
			"Don't exaggerate risks, invent facts, or make unsupported health or financial claims."
		],
		formats: "Expert talking-head video, FAQ carousel, myth-versus-fact graphic, whiteboard explanation, or demonstration.",
		examples: [
			"What actually happens during your first Botox appointment?",
			"Three signs your AC might need servicing.",
			"How often should your dog actually be groomed?"
		]
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
			"Use hooks that create curiosity."
		],
		formats: "POV footage, behind-the-scenes video, ASMR-style footage, short demonstrations, process montages, and walkthroughs.",
		examples: [
			"Come behind the scenes of a HydraFacial appointment.",
			"Here's what 45 minutes at [Studio] actually looks like.",
			"30 seconds of the most satisfying car detail you'll see today."
		]
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
			"Prioritize specific proof over generic statements."
		],
		formats: "Business owner talking-head video, team introductions, clinic or facility tour, local project montage, documentary-style footage.",
		examples: [
			"I'm Dr. [Name], and here's what you can expect at our practice.",
			"Meet the team taking care of homes across [City].",
			"I'm [Name], and here's what makes our studio different."
		]
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
			"Avoid fearmongering, personal-attribute assumptions, or guaranteed outcomes."
		],
		formats: "Problem/solution video, UGC-style talking head, simple comparison graphic, educational carousel.",
		examples: [
			"That strange noise coming from your AC might be worth checking.",
			"Not all roof damage is obvious from the ground.",
			"When a quick car wash just isn't cutting it."
		]
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
			"Connect the event or season to a specific offer or service."
		],
		formats: "Promotional Reel, deadline-led static, seasonal service video, collection teaser, event announcement.",
		examples: [
			"Get your AC serviced before the summer heat arrives.",
			"Introducing our summer glow package.",
			"Game day plans? We've got your food covered."
		]
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
			"Never invent financing terms, service speeds, or availability."
		],
		formats: "POV videos, booking walkthroughs, convenience-focused talking heads, simple graphics, day-in-the-life footage.",
		examples: [
			"Professional car detailing, right in your driveway.",
			"Morning, midday, or evening. Find a class that fits your schedule.",
			"Your dog's grooming appointment, right outside your front door."
		]
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
			"Prioritize real visuals over generic stock imagery."
		],
		formats: "Product videos, cinematic close-ups, lifestyle imagery, service showcases, carousels, walkthroughs, and collection videos.",
		examples: [
			"This is our best-selling dish, and it's easy to see why.",
			"Meet the piece we're known for.",
			"Come take a closer look at our HydraFacial treatment."
		]
	}
];
function Jr(e) {
	return qr.find((t) => t.id === e);
}
function Yr() {
	return qr.map((e) => `${e.id} ${e.name} (${e.psychology}). ${e.concept}
  Rules: ${e.rules.join(" ")}
  Formats: ${e.formats}
  Example hooks: ${e.examples.map((e) => `"${e}"`).join(" / ")}`).join("\n");
}
//#endregion
//#region src/lib/adsBuilder.js
var Xr = /* @__PURE__ */ t({
	ACCESS_STEPS: () => pi,
	DAILY_PRESETS: () => $r,
	PLAN_GOALS: () => Qr,
	RADIUS_PRESETS: () => ei,
	SITE_FILL_SCHEMA: () => oi,
	STAGES: () => Zr,
	adsCopyText: () => fi,
	angleLine: () => ui,
	areaText: () => ii,
	blankPrompt: () => di,
	buildSiteFillPrompt: () => si,
	campaignDaily: () => ni,
	dailyToMonthly: () => ti,
	finalizeSiteFill: () => ci,
	goalLabel: () => ri,
	guessBusinessType: () => ai,
	launchChecklist: () => mi,
	summaryRows: () => hi,
	usedAds: () => li
}), Zr = [
	{
		id: "plan",
		label: "Plan",
		question: "Tell us about the client."
	},
	{
		id: "ads",
		label: "Ads",
		question: "Here's what I'd advertise and how I'd say it."
	},
	{
		id: "funnel",
		label: "Funnel",
		question: "Here's what should happen after they click."
	},
	{
		id: "launch",
		label: "Launch",
		question: "Here's exactly how to put it into Meta."
	}
], Qr = [
	{
		id: "leads",
		label: "Fill out a form"
	},
	{
		id: "appointments",
		label: "Book an appointment"
	},
	{
		id: "purchases",
		label: "Buy something"
	},
	{
		id: "help",
		label: "Help me choose"
	}
], $r = [
	10,
	20,
	30,
	50
], ei = [
	5,
	10,
	15,
	25
];
function ti(e) {
	return Math.round(Number(e || 0) * 30.4);
}
function ni(e) {
	return e.daily_budget ? Number(e.daily_budget) : e.monthly_budget ? Math.max(1, Math.round(Number(e.monthly_budget) / 30.4)) : null;
}
function ri(e) {
	return Qr.find((t) => t.id === e)?.label || "";
}
function ii(e) {
	return e.location ? e.radius_miles ? `${e.location} + ${e.radius_miles} miles` : e.location : "";
}
function ai(e) {
	return e.business_type ? e.business_type : Dr(e) ? "health_beauty" : "local";
}
var I = { type: "string" }, oi = {
	type: "object",
	properties: {
		business_name: I,
		business_type: {
			type: "string",
			enum: [
				"local",
				"health_beauty",
				"ecommerce",
				"coaching",
				"professional",
				"other"
			]
		},
		location: I,
		services: {
			type: "array",
			items: I
		},
		offers: {
			type: "array",
			items: I
		},
		goal: {
			type: "string",
			enum: [
				"leads",
				"appointments",
				"purchases",
				"help"
			]
		},
		description: I,
		target_customer: I,
		differentiators: I,
		proof: I,
		credentials: I,
		brand_style: I
	},
	required: [
		"business_name",
		"services",
		"offers",
		"goal"
	]
};
function si(e) {
	return `You are helping a beginner freelance marketer plan a Meta ad campaign for a local business. Read the text from the business's website below and pull out the facts she needs. Only use what is on the website. Never invent offers, prices, reviews, credentials or services.

WEBSITE
URL: ${e.url}
Title: ${e.title || ""}
Description: ${e.meta_description || ""}
Buttons and links: ${(e.cta_links || []).join(" | ")}
Text:
${String(e.text || "").slice(0, 14e3)}

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
- brand_style: the look and tone in a few words (like "clean, warm, luxury spa").`;
}
function ci(e, t) {
	let n = (e, t) => Array.isArray(e) ? e.map((e) => String(e || "").trim()).filter(Boolean).slice(0, t) : [], r = (e) => String(e || "").trim();
	return {
		business_name: r(e?.business_name),
		business_type: e?.business_type || "",
		location: r(e?.location),
		services: n(e?.services, 6),
		offers: n(e?.offers, 3),
		goal: e?.goal || "",
		description: r(e?.description),
		target_customer: r(e?.target_customer),
		differentiators: r(e?.differentiators),
		proof: r(e?.proof),
		credentials: r(e?.credentials),
		brand_style: r(e?.brand_style),
		colors: (t?.colors || []).join(", ")
	};
}
function li(e) {
	let t = Br(e), n = new Set(e.ads_off || []);
	return t.filter((e) => !n.has(e.index));
}
function ui(e, t) {
	let n = hn(e).angles?.find((e) => e.name.toLowerCase() === String(t.name || "").toLowerCase());
	if (n?.concept) return n.concept;
	let r = Jr(t.category);
	return r ? r.psychology : "";
}
function di(e) {
	let t = String(e).slice(1, -1).trim(), n = t.split(/\s+/)[0] || "";
	return `Add ${/^[A-Z][a-z]+$/.test(n) && !/^(Number|Price|Name|Phone|Address|Rating|Their|The|Your|Offer|Date|Time|Amount)$/.test(n) ? t : t.charAt(0).toLowerCase() + t.slice(1)}`;
}
function fi(e) {
	return li(e).map((t, n) => [
		`AD ${n + 1}: ${F(e.business_name)} - ${t.name} - ${t.format || "Image"}`,
		"",
		"Primary text:",
		t.primary,
		"",
		`Headline: ${t.headline}`,
		`Description: ${t.description}`,
		`Button: ${t.cta}`
	].join("\n")).join("\n\n---\n\n");
}
var pi = [
	"Ask your client to open business.facebook.com and go to Settings.",
	"Under Users, then Partners, they click Add and enter your Business ID (yours is in your own Business settings, under Business info).",
	"They give you access to their ad account and Facebook Page, with full control of the ad account.",
	"Check the ad account has a payment method. The client pays Meta directly."
];
function mi(e) {
	return [
		"Open every ad preview on your phone. Does each image match its text?",
		"Send the previews to your client and get their yes.",
		"In Ads Manager, open the campaign and press Publish.",
		e.setup?.destination === "instant_form" ? "Send a test lead with Meta's lead testing tool and make sure it reaches your client." : "Click your own ad on your phone and make sure the page loads.",
		"Tell your client to reply to every new lead within 5 minutes.",
		"Check back in 3 days. Don't change anything before then."
	];
}
function hi(e) {
	let t = ni(e);
	return [
		F(e.business_name),
		e.offer_text || e.product || "",
		ri(e.goal),
		t ? `${P(t)}/day` : "",
		ii(e)
	].filter(Boolean);
}
//#endregion
//#region src/lib/adsMasterPrompts.js
var gi = /* @__PURE__ */ t({ MASTER_PROMPTS: () => L }), L = {};
L.ads = "AI ADS BUILDER — MASTER PROMPT\n\nROLE\nYou are an expert direct-response advertising strategist, copywriter, and creative strategist.\nYour job is to create a small set of strong, distinct Meta ad concepts for the business and campaign described below.\nEach ad should be specific to:\n* the business\n* the offer\n* the target customer\n* the selected campaign goal\n* the market\n* the available proof\n* the available creative assets\nDo not create generic ad copy.\nDo not create five versions of the same idea with slightly different wording.\nEach ad should use a genuinely different reason the customer may care.\n\nINPUTS\nBusiness\n* Business name: {{business_name}}\n* Website: {{website}}\n* Industry / niche: {{niche}}\n* Location / service area: {{location}}\n* Services found: {{services}}\n* Business description: {{business_description}}\n* Brand colors: {{brand_colors}}\n* Brand style: {{brand_style}}\n* Logo available: {{logo}}\n\nCampaign\n* Service being advertised: {{service}}\n* Offer: {{offer}}\n* Price / incentive: {{price}}\n* Goal: {{goal}}\n* Conversion action: {{conversion_action}}\n* Funnel type: {{funnel_type}}\n* Daily budget: {{budget}}\n* Target area: {{target_area}}\n\nCustomer\n* Target customer: {{target_customer}}\n* Primary motivation: {{motivation}}\n* Main problem / frustration: {{pain}}\n* Desired outcome: {{dream_outcome}}\n* Key objections: {{objections}}\n* Current alternatives: {{alternatives}}\n\nBusiness Differentiation\n* Differentiators: {{differentiators}}\n* Verified proof: {{proof}}\n* Reviews: {{reviews}}\n* Credentials: {{credentials}}\n* Existing offer details: {{offer_details}}\n\nAvailable Creative\n* Photos available: {{photos}}\n* Videos available: {{videos}}\n* Team / practitioner photos: {{team_assets}}\n* Before-and-after assets: {{before_after}}\n* Customer testimonials: {{testimonial_assets}}\n* Product / service footage: {{service_assets}}\n\nFIRST: UNDERSTAND THE CAMPAIGN\nBefore creating ads, determine:\n1. What is the strongest reason this customer would care about the offer?\n2. What are the most believable benefits?\n3. What would stop them from acting?\n4. What proof is actually available?\n5. Which creative types make sense for this niche?\n6. What should NOT be claimed?\n7. What is the clearest action the customer should take?\nUse the supplied business information first.\nYou may use general niche knowledge to choose reasonable angles and creative formats, but do not treat niche assumptions as facts about this specific business.\n\nAD ANGLE SELECTION\nCreate 3 distinct ad concepts.\nChoose the strongest 3 from these angle families:\n1. DIRECT OFFER\nUse when the offer itself is compelling.\nExamples: introductory offer, free consultation, free estimate, trial, promotional price, event registration\n2. DESIRED OUTCOME\nLead with what the customer wants.\nExamples: smoother skin, a cleaner home, more confidence in their smile, a booked consultation, a reliable contractor\n3. PROBLEM / SOLUTION\nUse when the customer has an obvious frustration the business solves.\nDo not exaggerate the problem.\n4. TRUST / CREDIBILITY\nUse when trust is a major barrier.\nUse only verified: reviews, credentials, years in business, certifications, real customer experiences\n5. PROCESS / WHAT TO EXPECT\nUseful for services customers may not fully understand.\nExamples: what happens at your first visit, how an inspection works, what the treatment includes\n6. EDUCATION\nAnswer an actual customer question or misconception.\n7. TRANSFORMATION\nUse when the result is visually demonstrable and appropriate to show.\n8. EXPERIENCE / LIFESTYLE\nShow what using the product or service feels like.\n9. CONVENIENCE\nUse when speed, ease, location, simplicity, or accessibility is an actual differentiator.\n10. LOCAL / RELEVANCE\nUse local context only when location meaningfully matters.\n\nANGLE RULES\nThe 3 concepts must:\n* use different strategic angles\n* not repeat the same hook structure\n* not rely on invented pain\n* not fabricate urgency\n* not fabricate scarcity\n* not fabricate pricing\n* not fabricate testimonials\n* not fabricate ratings\n* not fabricate results\n* not diagnose or negatively characterize the viewer in ways that could violate Meta policy\n* not imply personal attributes unnecessarily\nPrefer simple, direct language.\n\nCOPY RULES\nFor each ad, create:\nA. CONCEPT NAME\nA simple internal name.\nExample: First-Time Offer\nNot: The Irresistible Glow Acquisition Machine\nB. STRATEGIC ANGLE\nExplain in 1–2 sentences:\n* why this concept may work\n* what customer motivation it speaks to\nC. PRIMARY TEXT\nWrite 2 versions:\nVersion A: Short. Approx. 40–80 words.\nVersion B: Medium. Approx. 80–150 words.\nRules:\n* lead with something relevant\n* explain the offer clearly\n* include the business name where natural\n* make the action obvious\n* avoid filler\n* avoid overly clever copy\n* avoid generic hype\n* do not overuse emojis\n* do not use fake quotes\n* do not use unsupported claims\nD. HEADLINES\nCreate 5 headline options.\nHeadlines should vary strategically.\nUse combinations of: direct offer, desired outcome, service clarity, local relevance, trust, specific next step\nKeep them concise.\nDo not simply rewrite the same headline five times.\nE. DESCRIPTIONS\nCreate 3 Meta description options.\nShort, clear, supporting the headline.\nF. CTA\nRecommend the best Meta CTA button based on the goal.\nExamples: Learn More, Book Now, Get Quote, Sign Up, Contact Us, Shop Now\nExplain why in one sentence.\n\nCREATIVE STRATEGY\nFor each ad, select the most appropriate creative type.\nUse these seven universal types from the creative system:\n1. Product / Service in Action\n2. Visual Transformation\n3. Offer-Led Creative\n4. Customer Proof\n5. People & Trust\n6. Educational Creative\n7. Experience / Lifestyle\nUse niche-specific creative guidance where available.\n{{niche_creative}}\n\nFOR STATIC ADS\nIf the concept should be a static ad, output:\nSTATIC CREATIVE DIRECTION\nInclude: recommended size, composition, visual hierarchy, main image subject, headline placement, overlay text, CTA treatment, logo placement, brand colors, amount of text, what visual asset to use, what NOT to include\nThen generate:\nDESIGN PROMPT\nCreate a complete prompt the member can paste into ChatGPT to generate the finished ad image in one go (the photo or visual plus the overlay text, ready to upload to Meta). Write it as an image request, not as code or a layout to build.\nThe prompt should include: exact canvas size, business name, niche, offer, headline, supporting text if needed, CTA, brand colors, design direction, image direction, typography direction, layout, logo guidance, any verified proof to display\nAdd: If I uploaded a logo, website screenshot, brand kit, or reference image, use it to understand the brand style. Do not copy another company's creative exactly.\nAdd: Do not invent ratings, review counts, results, prices, urgency, guarantees, or credentials.\nAdd: Keep text readable on mobile and avoid overcrowding the creative.\n\nFOR VIDEO ADS\nIf the concept should be video, output:\nVIDEO CONCEPT\nInclude: format (UGC / talking head / B-roll / service process / montage / testimonial), recommended duration, opening visual, hook, shot sequence, overlay text, voiceover or spoken script, CTA, final frame\nVIDEO SCRIPT\nCreate:\nHook: First 1–3 seconds.\nBody: Clear, natural language.\nCTA: Specific next step.\nKeep the script appropriate for the platform and length.\nIMAGE PROMPT\nIf AI-generated imagery would help, create a photorealistic still-image prompt.\nInclude: subject, location, action, environment, lighting, framing, realistic business context, orientation\nAvoid unnecessary cinematic jargon unless it materially improves the output.\nMOTION PROMPT\nCreate an image-to-video prompt describing: what the subject does, camera movement, environmental motion, duration, pacing\nDo not introduce new people, objects, claims, or branding not present in the image.\n\nMAKE MORE VERSIONS PROMPT\nFor every ad, also generate a reusable prompt:\nMAKE MORE VERSIONS\nCreate 6 new versions of this ad while keeping the same offer and core strategic angle.\nChange only one major variable at a time:\n* 2 new headline treatments\n* 2 new visual layouts\n* 1 different CTA treatment\n* 1 alternative proof or trust treatment, but only if verified proof is available\nKeep the audience, offer, positioning, and campaign goal consistent.\nDo not invent new proof, pricing, guarantees, urgency, testimonials, ratings, or results.\nFor each version, explain exactly what changed.\n\nFINAL AD QUALITY CHECK\nBefore returning each concept, verify:\n1. Does the concept clearly relate to the advertised service?\n2. Is the offer easy to understand?\n3. Is the target customer obvious from context?\n4. Is the ad specific to this business?\n5. Is the angle distinct from the other concepts?\n6. Are all proof claims verified?\n7. Is the CTA clear?\n8. Is the creative visually simple enough to understand quickly?\n9. Does the copy avoid generic marketing language?\n10. Does the ad comply with platform-sensitive topics and avoid unnecessarily identifying personal attributes?\n11. Does the ad create the correct expectation for the funnel that follows?\nRevise internally if needed.\n\nOUTPUT FORMAT\nReturn exactly 3 concepts.\nFor each: Concept name, Angle, Why this works, Primary text A, Primary text B, Headlines x5, Descriptions x3, CTA, Creative type, Creative direction\nThen either: Static design prompt\nOR: Video script, Image prompt, Motion prompt\nFinally: Make more versions prompt", L.funnel = "AI FUNNEL BUILDER — MASTER PROMPT\n\nROLE\nYou are an expert direct-response landing page strategist, conversion copywriter, UX strategist, and frontend developer.\nYour job is to build a complete single-page conversion funnel for the campaign below.\nThis is not a general company website.\nThe page exists for one purpose:\ncontinue the exact promise made in the ad and move the visitor toward one clear action.\n\nINPUTS\nBusiness\n* Business name: {{business_name}}\n* Website: {{website}}\n* Niche: {{niche}}\n* Location: {{location}}\n* Business description: {{business_description}}\n* Services found: {{services}}\n\nCampaign\n* Advertised service: {{service}}\n* Offer: {{offer}}\n* Price / incentive: {{price}}\n* Selected ad concept: {{ad_concept}}\n* Selected angle: {{ad_angle}}\n* Selected ad headline: {{ad_headline}}\n* Primary ad copy: {{ad_copy}}\n* Campaign goal: {{goal}}\n\nCustomer\n* Target customer: {{target_customer}}\n* Primary motivation: {{motivation}}\n* Pain / frustration: {{pain}}\n* Desired outcome: {{dream_outcome}}\n* Objections: {{objections}}\n\nProof\n* Verified reviews: {{reviews}}\n* Testimonials: {{testimonials}}\n* Ratings: {{ratings}}\n* Case studies: {{case_studies}}\n* Credentials: {{credentials}}\n* Business facts: {{facts}}\n\nConversion\n* Primary CTA: {{cta}}\n* CTA type: {{cta_type}}\n* Destination: {{cta_url}}\n* Requested fields: {{fields}}\n\nDesign\n* Brand colors: {{brand_colors}}\n* Logo: {{logo}}\n* Authentic images: {{images}}\n* Design style: {{brand_style}}\n* Page type: {{page_type}}\n\nRULE 1: MESSAGE MATCH IS NON-NEGOTIABLE\nThe page must immediately continue the promise from the ad.\nIf the ad says \"Free Skin Consultation\", the hero must clearly reinforce the free skin consultation.\nIf the ad says \"First HydraFacial for $49\", the page must lead with the $49 HydraFacial.\nDo not switch to: general brand copy, another service, generic company messaging, a different promotion\n\nRULE 2: ONE PAGE, ONE ACTION\nChoose one primary CTA.\nEvery major section should support that CTA.\nSecondary contact methods may appear only where useful, but they should not compete visually.\n\nRULE 3: CHOOSE THE PAGE TYPE\nSelect the best structure.\nA. LEAD GENERATION\nUse for: local services, agencies, professional services, appointment-based businesses\nStructure: 1. Hero 2. Desired outcome / problem context 3. What they get 4. Proof 5. How it works 6. Objections / FAQ 7. Final CTA\nB. DIRECT OFFER\nUse for: promotions, introductory pricing, trials, specific treatments, special offers\nStructure: 1. Offer-led hero 2. What's included 3. Benefits 4. Proof 5. How to claim 6. FAQs / terms 7. Final CTA\nC. HIGH-TICKET CONSULTATION\nUse for: implants, remodeling, solar, high-ticket services, complex services\nStructure: 1. Outcome-led hero 2. Who it's for 3. Problem + solution 4. Relevant proof 5. Service / process 6. Qualification + FAQs 7. Consultation CTA\n\nHERO RULES\nThe hero must answer within seconds:\n1. What is this?\n2. Why should I care?\n3. What am I supposed to do?\nCreate:\nHeadline: Use the strongest relevant motivation: direct offer, outcome, trust, convenience, problem/solution, transformation, service clarity\nSubheadline: Explain what they get, who it is for if needed, how it works, why this business is relevant\nCTA: Specific and tied to the offer.\nTrust indicator: Only if verified. Examples: verified rating, credentials, years in business, real testimonial excerpt\nDo not create a fake trust strip.\n\nOFFER EXPLANATION\nExplain the actual offer clearly.\nAnswer: What is included? What happens? What should the visitor expect? What makes this useful? Is there a price or incentive? Are there meaningful terms?\nDo not hide important offer details.\n\nBENEFITS\nTranslate features into practical benefits.\nDo not use vague headings like: Unlock Your Potential, Transform Your Life, Elevate Your Experience\nUse customer-language benefits.\n\nPROOF\nUse only supplied proof.\nAllowed: actual reviews, actual ratings, real testimonials, real credentials, real project examples, real before/after results where appropriate, documented case studies\nNever invent: star ratings, number of reviews, customer quotes, client counts, performance numbers, credentials, awards, scarcity, guarantees\nIf proof is missing, substitute: What You Can Expect, Our Approach, What We Focus On, What Happens Next\nDo not disguise generic benefits as proof.\n\nPROCESS\nUse 3 simple steps unless the offer genuinely requires more.\nExample: 1. Request your appointment 2. Speak with the team 3. Get your personalized recommendation\nOr: 1. Request a quote 2. We assess the project 3. You receive next steps\nExplain what happens AFTER the form.\nThis matters because uncertainty reduces conversions.\n\nOBJECTION HANDLING\nIdentify the 3–5 most important objections.\nExamples: price, commitment, safety, time, trust, suitability, financing, what happens next\nAddress them with: FAQ, offer details, process explanations, proof, qualification information\nNever invent policies.\n\nFORMS\nRecommend the shortest form that still gives the business enough information.\nExamples:\nLocal service: name, phone, service needed, ZIP\nAppointment: name, phone/email, service interest\nHigh-ticket consultation: name, contact info, service, one qualification question\nIf the business uses an Instant Form instead, output the equivalent form structure rather than HTML.\n\nDESIGN SYSTEM\nThe page should feel like the actual business.\nIf website/brand data exists: use business colors, reflect the brand style, use the logo appropriately, match the tone and visual feel, use supplied authentic imagery\nIf no design information exists: Use a clean, modern, high-trust style suitable for the niche.\nDo not default every business to: black background, blue CTA, startup SaaS design, glassmorphism, excessive gradients\n\nMOBILE FIRST\nDesign the page for mobile first.\nRequirements: hero message visible quickly, large tap targets, short paragraphs, minimal navigation, no unnecessary menus, no horizontal overflow, readable type, primary CTA repeated naturally, sticky mobile CTA only when appropriate, images optimized for mobile, no unnecessary animations\n\nWEBSITE INTELLIGENCE\nIf website content has been supplied from the business scan:\nUse it to: identify actual services, capture correct business language, understand differentiators, identify existing proof, identify location, understand how the business currently explains its services, identify real team / practitioner details\nDo not blindly copy the website.\nRewrite it for the campaign and conversion goal.\nDo not invent things that were not found.\n\nVISUAL ASSET RULES\nIf authentic images are available: Choose which images belong in: hero, proof, service explanation, team/trust, gallery\nIf no imagery exists: Create a text-first layout and optionally output an AI image prompt separately.\nDo not insert fake stock image URLs.\n\nOUTPUT 1: LANDING PAGE COPY\nBefore HTML, internally define: page type, central promise, primary CTA, proof strategy, major objections, section order\nThen generate the page.\n\nOUTPUT 2: COMPLETE HTML\nReturn a standalone HTML file.\nRequirements: semantic HTML5, inline CSS, responsive, accessible, no external frameworks required, no fake links, no fake form submission, no broken images, no dead buttons, no unnecessary JS, no horizontal mobile overflow\nIf the CTA URL is available, wire buttons to it.\nIf a form endpoint is unavailable, mark the form as requiring integration rather than pretending it submits.\n\nFINAL FUNNEL QUALITY CHECK\nBefore output:\n1. Does the hero match the ad?\n2. Is the offer obvious?\n3. Is the conversion action obvious?\n4. Is the copy clearly written for the right customer?\n5. Is the page specific to the niche?\n6. Is all proof verified?\n7. Are important objections addressed?\n8. Does the process feel easy to understand?\n9. Does every CTA point to the same goal?\n10. Is the design appropriate to the business?\n11. Is the page mobile-first?\n12. Is anything fabricated?\n13. Does it avoid generic AI language?\n14. Would the visitor understand what happens after they submit?\nRevise internally until yes.", L.instantForm = "ROLE\nYou are an expert Meta lead ads strategist. Write the Meta Instant Form that follows the ad below, for a local business.\n\nTHE CAMPAIGN\n{{context}}\n\nTHE AD THIS FORM FOLLOWS\nConcept: {{ad_concept}}\nAngle: {{ad_angle}}\nHeadline: {{ad_headline}}\nPrimary text: {{ad_copy}}\n\nRULES\n- Message match: the form headline continues the exact offer and promise from the ad.\n- Keep it short. Ask only what the business needs to follow up. One or two qualifying questions at most, multiple choice where possible.\n- Never invent prices, ratings, guarantees, policies or urgency.\n- Plain, warm language a customer understands.\n\nWRITE\n- form_headline: under 60 characters, continues the ad's offer.\n- intro: 1 to 2 sentences on what they get and what happens next.\n- questions: 1 to 2 short qualifying questions, each with options when it's multiple choice.\n- contact_fields: the contact fields to collect (for example Full name, Phone number, Email).\n- privacy_note: what the business must link to (their privacy policy) and a one-line reminder to add it.\n- thank_you_headline and thank_you_text: what happens next and when they'll hear back.\n- cta: the button on the thank-you screen (like \"Call now\" or \"Visit website\").\n- follow_up: one sentence recommending how fast and how the business should follow up.";
//#endregion
//#region src/lib/adsCreative.js
var _i = /* @__PURE__ */ t({
	CREATIVE_FOR_CATEGORY: () => yi,
	CREATIVE_TYPES: () => vi,
	NICHE_CREATIVE: () => bi,
	creativeForPrompt: () => Ci,
	getCreativeType: () => xi,
	nicheCreative: () => Si
}), vi = [
	{
		id: "CR-01",
		name: "Product or service in action",
		communicates: "What the business actually delivers",
		format: "Short video"
	},
	{
		id: "CR-02",
		name: "Visual transformation",
		communicates: "The potential outcome",
		format: "Before/after or carousel"
	},
	{
		id: "CR-03",
		name: "Offer-led creative",
		communicates: "A compelling reason to act",
		format: "Static, video, or carousel"
	},
	{
		id: "CR-04",
		name: "Customer proof",
		communicates: "Experiences of real customers",
		format: "UGC or testimonial"
	},
	{
		id: "CR-05",
		name: "People and trust",
		communicates: "Who is behind the business",
		format: "Talking head or team video"
	},
	{
		id: "CR-06",
		name: "Educational creative",
		communicates: "Answers to customer questions",
		format: "Talking head or carousel"
	},
	{
		id: "CR-07",
		name: "Experience and lifestyle",
		communicates: "What buying or booking feels like",
		format: "POV or montage"
	}
], yi = {
	"ANG-01": "CR-03",
	"ANG-02": "CR-02",
	"ANG-03": "CR-04",
	"ANG-04": "CR-06",
	"ANG-05": "CR-01",
	"ANG-06": "CR-05",
	"ANG-07": "CR-06",
	"ANG-08": "CR-03",
	"ANG-09": "CR-07",
	"ANG-10": "CR-01"
}, bi = {
	restaurant: {
		direction: "Make the food the hero. Prioritize mouthwatering close-ups, movement, texture, and authentic kitchen footage over polished graphics.",
		prioritize: [
			"Food preparation videos: stretching dough, pouring coffee, plating dishes, sizzling food.",
			"Close-up hero shots: cheese pulls, steam, drizzling sauces, fresh ingredients.",
			"Deal-led creative: an appetizing photo with a large, easy-to-read offer.",
			"Customer review overlays on real restaurant or food footage.",
			"Location awareness: the exterior, recognizable surroundings, and food.",
			"Occasion-based creative: date nights, game days, brunch, late-night dining."
		],
		example: "A 15-second Reel opening with a pizza coming out of the oven, then a cheese pull, with the offer as the overlay.",
		avoid: "Generic stock food photos, text-heavy menus, wide food shots, and creative where you can't immediately tell what's being sold."
	},
	real_estate: {
		direction: "Sell the property, lifestyle, or local expertise. Show real listings and use video to bring properties to life.",
		prioritize: [
			"Property carousels featuring the best rooms and outdoor spaces.",
			"Walkthrough videos using natural phone footage.",
			"A strong hero image with clear property information, including price where appropriate.",
			"Home valuation creative featuring recognizable local neighborhoods.",
			"Agent talking-head videos explaining the market.",
			"Sold-property case studies with actual transaction results."
		],
		example: "A 30-second walkthrough of the kitchen, living area, backyard and exterior with a simple \"Just Listed in [City]\" opening.",
		avoid: "Luxury photos unrelated to the listing, cluttered property graphics, unsupported statistics, and hiding important property details.",
		compliance: "Real estate campaigns must follow housing advertising and targeting requirements."
	},
	home_services: {
		direction: "Make the transformation instantly obvious. Customers should understand what the business does and why it's valuable within seconds.",
		prioritize: [
			"Before-and-after carousels: a strong starting format for visible services.",
			"Satisfying service videos: pressure washing, painting, deep cleaning, landscaping.",
			"Seasonal offers tied to real demand, like AC maintenance before summer.",
			"Real team members working at real job sites.",
			"Genuine Google review overlays.",
			"Trust signals like licensed and insured, where true."
		],
		example: "A 4-card carousel: dirty driveway, cleaned driveway, close-up of the result, team photo with \"Get a Free Quote.\"",
		avoid: "Stock photos of technicians, unclear before and afters, generic graphics that don't show the work, and burying the offer under text."
	},
	med_spa: {
		direction: "Combine visual appeal with trust. Show the treatment experience, the clinic's professionalism, and the value of booking.",
		prioritize: [
			"Process videos: close-up treatment footage is naturally engaging and a strong first test.",
			"Before-and-after imagery, only where consented, substantiated and allowed by Meta.",
			"First-time offer creative with clear introductory pricing.",
			"Clinic footage: clean treatment rooms, modern equipment, professional surroundings.",
			"Real client testimonial videos.",
			"Practitioner introductions explaining what happens during a treatment."
		],
		example: "A 15-second treatment video, then a shot of the treatment room, ending on the offer as the overlay.",
		avoid: "Overly retouched results, generic beauty stock photos, too much text, invasive procedure imagery, or anything implying the viewer has an appearance insecurity."
	},
	fitness: {
		direction: "Sell the experience, not the equipment. People should be able to picture themselves in a class, enjoying it.",
		prioritize: [
			"Real class footage: energy, movement, instructors and members.",
			"Community videos with genuine interactions.",
			"Free trial offer creative.",
			"Trainer talking-head videos introducing the studio.",
			"Real member testimonials and progress stories.",
			"Facility walkthroughs for first-time visitors."
		],
		example: "A fast montage of a group class, the instructor coaching and members interacting, ending on the offer.",
		avoid: "Empty equipment photos, intimidating stock fitness models, unrealistic transformation promises, and aggressive motivational messages."
	},
	roofing: {
		direction: "Combine visible roof condition, inspection footage and strong local credibility.",
		prioritize: [
			"Drone footage of real roofs and inspection areas.",
			"Close-ups of documented storm damage.",
			"Before-and-after roof replacement carousels.",
			"Local crews completing installations.",
			"Free inspection offers.",
			"Trust signals: verified licensing, insurance, warranty, completed local projects."
		],
		example: "A drone video of a roof inspection with the overlay \"Recent Storms in [City]? Book a Roof Inspection.\"",
		avoid: "Generic disaster imagery, exaggerated damage, made-up storms, and unconditional \"$0 out of pocket\" insurance promises."
	},
	clothing: {
		direction: "Make the product desirable in a real-world context. Show real people wearing it, not only studio photos.",
		prioritize: [
			"UGC try-on videos with real customers or creators.",
			"Styling videos showing several ways to wear one piece.",
			"Best-selling product close-ups.",
			"Collection carousels worn by real people.",
			"Unboxing and first-impression videos.",
			"Real restock announcements and new collection previews."
		],
		example: "A creator's casual mirror try-on with the overlay \"3 Ways I'd Style Our Best-Selling Set.\"",
		avoid: "Only flat lays, too much studio polish, complicated collages, and visuals that hide the fit."
	},
	dental: {
		direction: "Build trust while making treatment feel understandable and approachable. Prioritize real, dentist-led content.",
		prioritize: [
			"Dentist talking-head videos explaining procedures simply.",
			"Genuine patient testimonials with authorization.",
			"Consented patient results, where Meta allows.",
			"Clinic walkthroughs: modern equipment, a welcoming space.",
			"Consultation offer creative.",
			"Educational videos answering treatment questions and payment options."
		],
		example: "The dentist to camera: \"Thinking about dental implants? Here's what actually happens at your first consultation.\"",
		avoid: "Disturbing procedure footage, unsupported medical claims, exaggerated outcomes, and unverified financing promises."
	},
	chiro: {
		direction: "Make the practitioner familiar and the treatment easy to understand. Use real clinic footage and education.",
		prioritize: [
			"The chiropractor talking directly to camera.",
			"Short appointment process videos.",
			"First-visit walkthroughs.",
			"Clinic introductions with the practitioner and the space.",
			"Educational clips: exercises or common questions.",
			"Real patient testimonials, with authorization and appropriate claims."
		],
		example: "A 20-second video, \"What Happens at Your First Chiropractic Appointment?\", showing the consultation and each step.",
		avoid: "Sensational cracking videos as the whole strategy, medical promises, fear-based messages, and diagnosing the viewer."
	},
	auto_detailing: {
		direction: "Lean into satisfying, visual footage. This service naturally produces strong creative.",
		prioritize: [
			"Dramatic vehicle before-and-after shots.",
			"ASMR-style detailing: pressure washing, foam cannons, polishing.",
			"Ceramic coating demos showing water beading.",
			"Interior deep-clean transformations.",
			"Package showcase videos.",
			"Mobile detailing footage arriving at the customer's place."
		],
		example: "A 15-second montage: dirty interior, extraction, steam cleaning, finished result, with the package as the overlay.",
		avoid: "Luxury car photos without real service footage, heavy effects that hide the results, and cars that aren't their work."
	},
	pest: {
		direction: "Make professional pest control look reliable, approachable and easy to arrange.",
		prioritize: [
			"Technicians inspecting real properties.",
			"Seasonal educational videos about common local pests.",
			"Simple service-process explainers.",
			"Free inspection offer graphics.",
			"Real customer reviews.",
			"Trust content: uniforms, vehicles, equipment, team members."
		],
		example: "A technician walking around a home explaining three places they check during a routine inspection.",
		avoid: "Graphic pest imagery, exaggerated infestations, unsupported safety claims, and spraying footage with no context."
	},
	pet: {
		direction: "Make the animals the stars, with reassurance about the quality of care.",
		prioritize: [
			"Before-and-after grooming transformations.",
			"Satisfying grooming process videos.",
			"Happy pets comfortable with the groomers.",
			"Groomer introductions.",
			"First-time customer offers.",
			"Mobile grooming demos or salon walkthroughs."
		],
		example: "A short Reel: a fluffy dog walks in, ends on the finished groom, overlay \"Fresh Cut. Happy Pup.\"",
		avoid: "Stock pet photos, distressed animals, forced reactions, and heavy graphics that distract from the animals."
	}
};
function xi(e) {
	return vi.find((t) => t.id === e);
}
function Si(e) {
	return bi[e] || null;
}
function Ci(e) {
	let t = bi[e], n = vi.map((e) => `- ${e.id} ${e.name}: ${e.communicates}. Format: ${e.format}.`).join("\n"), r = Object.entries(yi).map(([e, t]) => `${e}: ${t}`).join("; ");
	return `${t ? `CREATIVE DIRECTION FOR THIS NICHE
${t.direction}
What to prioritize:
${t.prioritize.map((e) => `- ${e}`).join("\n")}
Example (style only): ${t.example}
Avoid: ${t.avoid}${t.compliance ? `\nCompliance: ${t.compliance}` : ""}` : "CREATIVE DIRECTION: this business isn't in our niche library. Use the seven creative types and adapt them to what this business actually sells."}

THE SEVEN CREATIVE TYPES (every ad uses one)
${n}
Usual match from angle category: ${r}. Pick a different type only when it clearly fits the business and creative better.`;
}
//#endregion
//#region src/lib/adsEngine.js
var wi = /* @__PURE__ */ t({
	ADS_SCHEMA: () => ji,
	FIELD_LABELS: () => Vi,
	META_MCP_URL: () => sa,
	REWRITE_OPTIONS: () => Ui,
	TEST_PROMPT: () => ca,
	VOICES: () => Wi,
	buildAdsCall: () => Ni,
	buildCampaignInstructions: () => ua,
	buildFunnelCall: () => ra,
	buildFunnelPrompt: () => ia,
	buildRewriteCall: () => qi,
	buildVoiceCall: () => Yi,
	campaignContext: () => Oi,
	conceptCopy: () => Qi,
	concepts: () => H,
	fill: () => ki,
	finalizeConcepts: () => Li,
	finalizeFunnel: () => oa,
	finalizeRewrite: () => Ji,
	formatCaption: () => U,
	funnelType: () => Ti,
	imagePromptFor: () => Fi,
	instantFormText: () => aa,
	moreVersionsPrompt: () => Ri,
	originalConcepts: () => zi,
	picked: () => Zi,
	voiceEdits: () => Xi
}), R = "Not provided", z = (e) => (Array.isArray(e) ? e.filter(Boolean).join(", ") : String(e ?? "").trim()) || R;
function Ti(e) {
	return e.funnel_type ? e.funnel_type : e.goal === "leads" || e.goal === "help" ? "instant_form" : "landing_page";
}
var Ei = {
	instant_form: "INSTANT_FORM",
	landing_page: "LANDING_PAGE"
}, Di = {
	leads: "Fill out a short form so the business can follow up",
	appointments: "Book an appointment or consultation",
	purchases: "Buy online",
	help: "Choose the simplest next step for this business (usually a short form)"
};
function Oi(e) {
	let t = hn(e), n = ni(e);
	return {
		business_name: F(e.business_name),
		website: e.website || R,
		niche: t.label && t.id !== "general" ? t.label : vr.find((t) => t.id === e.business_type)?.label || R,
		location: e.location || R,
		services: z(e.services?.length ? e.services : e.product),
		business_description: z(e.business_description),
		brand_colors: z(e.brand_colors),
		brand_style: z(e.brand_style),
		logo: e.logo_available ? "Yes" : "Not confirmed. If they have one, upload it with the prompt.",
		service: z(e.product),
		offer: e.offer_help ? "Not decided. Suggest the simplest believable offer for this business and say it's a suggestion." : z(e.offer_text),
		price: z(e.price_text),
		goal: ri(e.goal) || R,
		conversion_action: Di[e.goal] || R,
		funnel_type: Ei[Ti(e)],
		budget: n ? `${P(n)} a day` : R,
		target_area: ii(e) || R,
		target_customer: z(e.target_customer),
		motivation: R,
		pain: R,
		dream_outcome: R,
		objections: R,
		alternatives: R,
		differentiators: z(e.differentiators),
		proof: z(e.proof_text),
		reviews: z(e.reviews_text),
		credentials: z(e.credentials_text),
		offer_details: z(e.offer_text),
		photos: z(e.assets_text),
		videos: z(e.assets_text),
		team_assets: R,
		before_after: R,
		testimonial_assets: R,
		service_assets: R,
		niche_creative: Ci(t.id) || ""
	};
}
function ki(e, t) {
	return String(e).replace(/\{\{(\w+)\}\}/g, (e, n) => t[n] === void 0 ? R : t[n]);
}
function Ai(e) {
	return [
		`Business: ${e.business_name} (${e.niche}), ${e.location}`,
		`Website: ${e.website}`,
		`Service: ${e.service}`,
		`Offer: ${e.offer}`,
		`Target customer: ${e.target_customer}`,
		`Goal: ${e.goal}`,
		`Budget: ${e.budget}, area: ${e.target_area}`,
		`Verified proof: ${e.proof}; reviews: ${e.reviews}; credentials: ${e.credentials}`
	].join("\n");
}
var B = { type: "string" }, V = {
	type: "array",
	items: B
}, ji = {
	type: "object",
	properties: { concepts: {
		type: "array",
		items: {
			type: "object",
			properties: {
				name: B,
				angle: B,
				why: B,
				primary_short: B,
				primary_medium: B,
				headlines: V,
				descriptions: V,
				cta: B,
				cta_why: B,
				creative_type: B,
				format: {
					type: "string",
					enum: ["static", "video"]
				},
				creative_direction: B,
				overlay: B,
				design_prompt: B,
				video: {
					type: "object",
					properties: {
						format: B,
						duration: B,
						opening_visual: B,
						shots: V,
						overlay: B,
						hook: B,
						body: B,
						cta: B,
						final_frame: B
					}
				},
				image_prompt: B,
				motion_prompt: B,
				more_versions_prompt: B
			},
			required: [
				"name",
				"angle",
				"why",
				"primary_short",
				"primary_medium",
				"headlines",
				"descriptions",
				"cta",
				"format"
			]
		}
	} },
	required: ["concepts"]
}, Mi = "APP OUTPUT RULES (for the app that shows these ads, not part of the ads themselves)\n- Return JSON matching the schema. Exactly 3 items in \"concepts\".\n- angle: the angle family name in plain words (like \"Direct offer\"). why: the strategic angle in 1 to 2 sentences.\n- creative_direction: the static creative direction or video concept as short plain lines.\n- overlay: the text that goes on the image, or for video the on-screen text.\n- primary_short and primary_medium: short paragraphs of 1 to 2 sentences, separated by a blank line (\n\n). The hook goes first on its own line. The call to action goes last on its own line. Never one long block.\n- format \"static\" fills design_prompt and image_prompt (a photo to use if they don't have one). Format \"video\" fills video, image_prompt and motion_prompt.\n- If one specific fact would make an ad stronger but wasn't supplied (a price, a rating), you may write it as a short [placeholder in square brackets] for the freelancer to fill in. Never invent the fact itself.\n- No em dashes.";
function Ni(e) {
	let t = Oi(e);
	return {
		prompt: `${ki(L.ads, t)}\n\n${Mi}\n\nAD RULES FOR THIS BUSINESS\n${Nr(e).map((e) => `- ${e}`).join("\n")}`,
		response_json_schema: ji
	};
}
var Pi = "Create this as one finished ad image, ready to upload to Meta, with all the text on it spelled exactly as written.", Fi = (e) => {
	let t = String(e?.design_prompt || "").trim();
	return t && !t.includes(Pi) ? `${t}\n\n${Pi}` : t;
}, Ii = [
	"If I uploaded a logo, website screenshot, brand kit, or reference image, use it to understand the brand style. Do not copy another company's creative exactly.",
	"Do not invent ratings, review counts, results, prices, urgency, guarantees, or credentials.",
	"Keep text readable on mobile and avoid overcrowding the creative."
];
function Li(e) {
	return (Array.isArray(e?.concepts) ? e.concepts.slice(0, 3) : []).map((e) => {
		let t = String(e.design_prompt || "").trim(), n = Ii.filter((e) => !t.includes(e.slice(0, 40)));
		return {
			name: e.name || "Ad concept",
			angle: e.angle || "",
			why: e.why || "",
			primary_short: U(e.primary_short),
			primary_medium: U(e.primary_medium),
			headlines: (e.headlines || []).filter(Boolean).slice(0, 5),
			descriptions: (e.descriptions || []).filter(Boolean).slice(0, 3),
			cta: e.cta || "Learn More",
			cta_why: e.cta_why || "",
			creative_type: e.creative_type || "",
			format: e.format === "video" ? "video" : "static",
			creative_direction: e.creative_direction || "",
			overlay: e.overlay || e.video?.overlay || "",
			design_prompt: t ? [t, ...n].join("\n\n") : "",
			video: e.video || null,
			image_prompt: e.image_prompt || "",
			motion_prompt: e.motion_prompt || "",
			more_versions_prompt: e.more_versions_prompt || ""
		};
	});
}
function Ri(e, t) {
	return t.more_versions_prompt ? t.more_versions_prompt : `Create 6 new versions of this ad while keeping the same offer and core strategic angle.

THE AD
Business: ${F(e.business_name)}
Angle: ${t.angle}
Primary text: ${t.primary_short}
Headline: ${t.headlines[0] || ""}
Text on image: ${t.overlay}

Change only one major variable at a time:
* 2 new headline treatments
* 2 new visual layouts
* 1 different CTA treatment
* 1 alternative proof or trust treatment, but only if verified proof is available
Keep the audience, offer, positioning, and campaign goal consistent.
Do not invent new proof, pricing, guarantees, urgency, testimonials, ratings, or results.
For each version, explain exactly what changed.`;
}
function zi(e) {
	return e.record?.concepts || [];
}
function H(e) {
	return zi(e).map((t, n) => Bi(t, e.ad_choices?.[n]?.edits));
}
function Bi(e, t) {
	if (!t || !Object.keys(t).length) return e;
	let n = (e, n) => typeof t[e] == "string" ? t[e] : n;
	return {
		...e,
		primary_short: n("primary_short", e.primary_short),
		primary_medium: n("primary_medium", e.primary_medium),
		overlay: n("overlay", e.overlay),
		headlines: (e.headlines || []).map((e, t) => n(`headline_${t}`, e)),
		descriptions: (e.descriptions || []).map((e, t) => n(`description_${t}`, e))
	};
}
var Vi = {
	primary_short: "primary text (short)",
	primary_medium: "primary text (medium)",
	overlay: "text on the image",
	headline: "headline",
	description: "description"
}, Hi = {
	headline: "Under 40 characters.",
	description: "Under 30 characters.",
	overlay: "Under 8 words. It has to read on a phone in one second.",
	primary_short: "2 to 4 short paragraphs separated by a blank line. Hook first on its own line, call to action last on its own line.",
	primary_medium: "4 to 6 short paragraphs separated by a blank line. Hook first on its own line, call to action last on its own line."
}, Ui = [
	{
		id: "shorter",
		label: "Shorter",
		ask: "Make it shorter. Keep the strongest idea."
	},
	{
		id: "punchier",
		label: "Punchier",
		ask: "Make it punchier: stronger hook, fewer words, more energy."
	},
	{
		id: "warmer",
		label: "Warmer",
		ask: "Make it warmer and more personal, like a friendly owner talking to one person."
	},
	{
		id: "urgent",
		label: "More urgent",
		ask: "Give it more urgency using only what is true about the offer. Never invent deadlines or limited spots."
	}
], Wi = [
	{
		id: "warm",
		label: "Warm and friendly",
		ask: "Warm, friendly and personal. Like the owner talking to one neighbor."
	},
	{
		id: "luxury",
		label: "Luxury",
		ask: "Calm, polished and premium. Fewer words, elegant phrasing, no hype, no exclamation marks."
	},
	{
		id: "bold",
		label: "Bold and direct",
		ask: "Bold and direct. Short sentences. Lead with the offer and the outcome."
	},
	{
		id: "playful",
		label: "Playful",
		ask: "Light, playful and fun, with a wink. Still clear about the offer."
	},
	{
		id: "expert",
		label: "Expert and clinical",
		ask: "Expert, precise and reassuring. Explain what happens and why it works. Plain words, no jargon."
	}
];
function Gi(e, t) {
	let n = Oi(e);
	return `THE BUSINESS
${n.business_name}, ${n.niche} in ${n.location}. Promoting: ${n.service}. Offer: ${n.offer}. Goal: ${n.goal}. Target customer: ${n.target_customer}.
Real proof: ${n.proof}. Credentials: ${n.credentials}.

THE AD
Name: ${t.name}. Angle: ${t.angle}. Why it works: ${t.why || ""}.
Primary text: ${t.primary_short}
Headline: ${t.headlines?.[0] || ""}
Description: ${t.descriptions?.[0] || ""}
Text on image: ${t.overlay || ""}`;
}
function Ki(e) {
	return `RULES
- Keep the same offer, prices, facts and angle. Never invent reviews, ratings, results, prices, deadlines, guarantees or credentials.
- Keep every [placeholder in square brackets] exactly as written.
- Plain words a local customer would use. No em dashes.
${e.no_emojis ? "- No emojis.\n" : "- At most 1 or 2 emojis in the primary text, none in headlines.\n"}${Nr(e).map((e) => `- ${e}`).join("\n")}`;
}
function qi(e, t, n, r, i) {
	let a = n.replace(/_\d+$/, "");
	return {
		prompt: `You are a direct-response copywriter for local business Meta ads. Rewrite one piece of this ad.

${Gi(e, t)}

REWRITE THIS ${String(Vi[a] || a).toUpperCase()}
${r}

HOW
${i}
${Hi[a] || ""}

${Ki(e)}

Return JSON: { "text": the new version only }.`,
		response_json_schema: {
			type: "object",
			properties: { text: { type: "string" } },
			required: ["text"]
		}
	};
}
function Ji(e, t) {
	let n = String(e?.text || "").replace(/\s*\u2014\s*/g, ", ").trim();
	return /^primary/.test(t) ? U(n) : n.replace(/\s*\n+\s*/g, " ");
}
function Yi(e, t, n) {
	let r = (e) => Math.max(1, (e || []).length);
	return {
		prompt: `You are a direct-response copywriter for local business Meta ads. Rewrite every piece of this ad in a new voice.

${Gi(e, t)}
Medium primary text: ${t.primary_medium}
All headlines: ${(t.headlines || []).join(" | ")}
All descriptions: ${(t.descriptions || []).join(" | ")}

NEW VOICE
${n.ask}

RETURN
- primary_short: ${Hi.primary_short}
- primary_medium: ${Hi.primary_medium}
- headlines: ${r(t.headlines)} headlines. ${Hi.headline}
- descriptions: ${r(t.descriptions)} descriptions. ${Hi.description}
- overlay: ${Hi.overlay}

${Ki(e)}`,
		response_json_schema: {
			type: "object",
			properties: {
				primary_short: B,
				primary_medium: B,
				headlines: V,
				descriptions: V,
				overlay: B
			},
			required: [
				"primary_short",
				"primary_medium",
				"headlines",
				"descriptions",
				"overlay"
			]
		}
	};
}
function Xi(e, t) {
	let n = (e) => String(e || "").replace(/\s*\u2014\s*/g, ", ").trim(), r = {};
	return e?.primary_short && (r.primary_short = U(n(e.primary_short))), e?.primary_medium && (r.primary_medium = U(n(e.primary_medium))), e?.overlay && t.overlay && (r.overlay = n(e.overlay)), (t.headlines || []).forEach((t, i) => e?.headlines?.[i] && (r[`headline_${i}`] = n(e.headlines[i]))), (t.descriptions || []).forEach((t, i) => e?.descriptions?.[i] && (r[`description_${i}`] = n(e.descriptions[i]))), r;
}
function U(e) {
	let t = String(e || "").replace(/\r/g, "").trim();
	if (!t) return "";
	if (t.includes("\n")) return t.split(/\n\s*\n|\n/).map((e) => e.trim()).filter(Boolean).join("\n\n");
	let n = t.split(/(?<!\b(?:Dr|Mr|Mrs|Ms|St|vs|No)\.)(?<=[.!?…])\s+/).map((e) => e.trim()).filter(Boolean);
	if (n.length < 3) return n.join("\n\n");
	let r = n[n.length - 1], i = r.length <= 90, a = n.slice(1, i ? -1 : void 0), o = [n[0]];
	for (let e = 0; e < a.length;) {
		let t = a[e + 1] && (a[e] + " " + a[e + 1]).length <= 170;
		o.push(t ? `${a[e]} ${a[e + 1]}` : a[e]), e += t ? 2 : 1;
	}
	return i && o.push(r), o.join("\n\n");
}
function Zi(e, t, n) {
	let r = e.ad_choices?.[n] || {};
	return {
		primary: U(r.version === "medium" ? t.primary_medium : t.primary_short),
		headline: t.headlines[r.headline ?? 0] || t.headlines[0] || "",
		description: t.descriptions[r.description ?? 0] || t.descriptions[0] || ""
	};
}
function Qi(e, t, n) {
	let r = Zi(e, t, n);
	return [
		`AD ${n + 1}: ${F(e.business_name)} - ${t.name} - ${t.format === "video" ? "Video" : "Image"}`,
		"",
		"Primary text:",
		r.primary,
		"",
		`Headline: ${r.headline}`,
		`Description: ${r.description}`,
		`Button: ${t.cta}`,
		t.overlay ? `Text on ${t.format === "video" ? "screen" : "image"}: ${t.overlay}` : ""
	].filter((e) => e !== null).join("\n");
}
var $i = {
	type: "object",
	properties: {
		form_headline: B,
		intro: B,
		questions: {
			type: "array",
			items: {
				type: "object",
				properties: {
					question: B,
					options: V
				}
			}
		},
		contact_fields: V,
		privacy_note: B,
		thank_you_headline: B,
		thank_you_text: B,
		cta: B,
		follow_up: B
	},
	required: [
		"form_headline",
		"intro",
		"contact_fields",
		"thank_you_headline",
		"thank_you_text"
	]
}, ea = {
	type: "object",
	properties: {
		page_type: B,
		headline: B,
		subheadline: B,
		cta: B,
		offer: B,
		benefits: V,
		proof: V,
		process: V,
		faqs: {
			type: "array",
			items: {
				type: "object",
				properties: {
					q: B,
					a: B
				}
			}
		},
		form_fields: V,
		mobile_notes: V
	},
	required: [
		"headline",
		"subheadline",
		"cta",
		"offer",
		"benefits",
		"faqs",
		"form_fields"
	]
};
function ta(e, t) {
	return {
		ad_concept: t ? t.name : R,
		ad_angle: t ? `${t.angle}. ${t.why}` : R,
		ad_headline: t?.headlines?.[0] || R,
		ad_copy: t?.primary_short || R
	};
}
function na(e, t) {
	let n = Oi(e), r = e.setup || Ar(e);
	return {
		...n,
		...ta(e, t),
		testimonials: n.proof,
		ratings: n.reviews,
		case_studies: R,
		facts: n.business_description,
		cta: t?.cta || r.cta || "Book Now",
		cta_type: e.goal === "purchases" ? "PURCHASE" : e.goal === "appointments" ? "BOOK" : "FORM",
		cta_url: e.cta_url || R,
		fields: R,
		images: z(e.assets_text),
		page_type: "AUTO"
	};
}
function ra(e, t, n) {
	let r = H(e)[t] || H(e)[0];
	if (n === "instant_form") {
		let t = Oi(e);
		return {
			prompt: `${ki(L.instantForm, {
				context: Ai(t),
				...ta(e, r)
			})}\n\nReturn JSON matching the schema. No em dashes.`,
			response_json_schema: $i
		};
	}
	return {
		prompt: `${ki(L.funnel, na(e, r))}

APP OUTPUT RULES
- For the app, return OUTPUT 1 only (the landing page copy), as JSON matching the schema. No HTML.
- page_type: Lead generation, Direct offer or High-ticket consultation.
- proof: only supplied proof. If none, use "What you can expect" style points instead.
- process: 3 simple steps, including what happens after the form.
- No em dashes.`,
		response_json_schema: ea
	};
}
function ia(e, t) {
	let n = H(e)[t] || H(e)[0], r = e.funnel?.landing_page, i = r ? `\n\nTHE PAGE COPY WE ALREADY WROTE (use it, improve it only where it breaks a rule above)
Headline: ${r.headline}
Subheadline: ${r.subheadline}
Offer: ${r.offer}
Benefits: ${(r.benefits || []).join(" / ")}
${(r.proof || []).length ? `Proof: ${r.proof.join(" / ")}\n` : ""}How it works: ${(r.process || []).join(" / ")}
FAQs: ${(r.faqs || []).map((e) => `${e.q} ${e.a}`).join(" / ")}
Form fields: ${(r.form_fields || []).join(", ")}
CTA: ${r.cta}` : "", a = ki(L.funnel, na(e, n)), o = a.indexOf("OUTPUT 2: COMPLETE HTML"), s = a.indexOf("FINAL FUNNEL QUALITY CHECK");
	return `Build this landing page as a one-page app here in Base44, for a Meta ad campaign I'm running for this business.

${(o > -1 && s > o ? a.slice(0, o) + a.slice(s) : a).replace(/ — /g, ": ").replace("Before HTML, internally define", "Before building, internally define")}${i}

BUILD IT IN BASE44
- One public page, open to anyone with the link, no login needed. I'll press Publish myself.
- Every button scrolls to the form${e.cta_url ? ` or goes to ${e.cta_url}` : ""}. The form asks only for what's needed to follow up (name, phone, email, plus the requested fields).
- Save every submission with the date and the ad it came from (keep any utm_ or fbclid values from the page link).
- After someone submits, show a clear thank-you screen that says exactly what happens next.
- A private admin page (login required) listing leads newest first, with a status (New, Contacted, Booked) and an export to CSV.
- Leave a clearly marked spot in the page's head where I can add the Meta Pixel later.
- Use tasteful generated images of the place, the work or textures. Never show fake customers, patients or staff, and use clearly labeled placeholders where a real photo belongs.
- Don't stretch the facts: never claim how visits work, what's included, or anything about competitors unless it's written above. No em dashes.
- If I uploaded their logo, a website screenshot or brand images, use them for the design.`;
}
function aa(e) {
	let t = e.funnel?.instant_form;
	return t ? [
		`INSTANT FORM FOR ${F(e.business_name).toUpperCase()}`,
		"",
		"Form type: More volume",
		`Headline: ${t.form_headline}`,
		`Intro: ${t.intro}`,
		"",
		"Questions:",
		...(t.questions || []).map((e, t) => `${t + 1}. ${e.question}${e.options?.length ? ` (${e.options.join(" / ")})` : ""}`),
		"",
		`Contact fields: ${(t.contact_fields || []).join(", ")}`,
		`Privacy policy: ${t.privacy_note || "Add the link to the business's privacy policy."}`,
		"",
		`Thank-you headline: ${t.thank_you_headline}`,
		`Thank-you text: ${t.thank_you_text}`,
		`Button: ${t.cta || "Call business"}`,
		"",
		`Follow-up: ${t.follow_up || "Call or text every new lead within 5 minutes."}`
	].join("\n") : "";
}
function oa(e, t) {
	return e === "instant_form" ? {
		form_headline: t?.form_headline || "",
		intro: t?.intro || "",
		questions: (t?.questions || []).filter((e) => e?.question).slice(0, 3),
		contact_fields: (t?.contact_fields || []).filter(Boolean),
		privacy_note: t?.privacy_note || "",
		thank_you_headline: t?.thank_you_headline || "",
		thank_you_text: t?.thank_you_text || "",
		cta: t?.cta || "",
		follow_up: t?.follow_up || ""
	} : {
		page_type: t?.page_type || "",
		headline: t?.headline || "",
		subheadline: t?.subheadline || "",
		cta: t?.cta || "",
		offer: t?.offer || "",
		benefits: (t?.benefits || []).filter(Boolean),
		proof: (t?.proof || []).filter(Boolean),
		process: (t?.process || []).filter(Boolean),
		faqs: (t?.faqs || []).filter((e) => e?.q),
		form_fields: (t?.form_fields || []).filter(Boolean),
		mobile_notes: (t?.mobile_notes || []).filter(Boolean)
	};
}
var sa = "https://mcp.facebook.com/ads", ca = "Show me the Meta ad accounts I currently have access to.", la = {
	leads: {
		objective: "Leads (OUTCOME_LEADS)",
		optimize: "Leads",
		form: !0
	},
	appointments: {
		objective: "Leads (OUTCOME_LEADS)",
		optimize: "Leads",
		form: !1
	},
	purchases: {
		objective: "Sales (OUTCOME_SALES)",
		optimize: "Purchases on the website pixel",
		form: !1
	},
	help: {
		objective: "Leads (OUTCOME_LEADS)",
		optimize: "Leads",
		form: !0
	}
};
function ua(e, t = "connector") {
	let n = F(e.business_name), r = e.setup || Ar(e), i = la[e.goal] || la.leads, a = Ti(e), o = ni(e) || r.budget?.daily || 20, s = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
		month: "short",
		year: "numeric"
	}), c = H(e).map((t, n) => ({
		...t,
		...Zi(e, t, n)
	})).filter((t, n) => !(e.ads_off || []).includes(n)), l = e.funnel?.instant_form, u = e.funnel?.landing_page, d = a === "instant_form", f = c.map((e, t) => `AD ${t + 1}: "${n} - ${e.name} - ${e.format === "video" ? "Video" : "Image"}"
Primary text:
${e.primary}
Headline: ${e.headline}
Description: ${e.description}
Button: ${e.cta}
${e.format === "video" ? "Video" : "Image"}: the ${e.format === "video" ? "video" : "image"} I upload for this ad${e.overlay ? ` (text on it: ${e.overlay})` : ""}`).join("\n\n"), ee = `THE CAMPAIGN
- Campaign name: "${n} - ${ri(e.goal) || "Leads"} - ${s}"
- Objective: ${i.objective}
- Budget: ${P(o)} a day, set once at the campaign level (Advantage campaign budget)
- Structure: 1 campaign, 1 ad set, ${c.length} ads
- Ad set name: "${n} - ${ii(e) || "Local"} - Broad"
- Optimize for: ${i.optimize}
- Location: ${e.radius_miles ? `${e.radius_miles} miles around the business in ${e.location || "their city"} (ask me for the exact address)` : e.location || "ask me"}
- Audience: broad. No interests, no lookalikes. Only add an age range if the offer clearly calls for it.
- Placements: Advantage+ placements
${r.is_health ? "- This is a health or beauty business: no special ad category is needed, but follow the ad rules below.\n" : ""}`, p = l ? aa(e) : "Name, phone and email, with a short thank-you screen.", m = `The landing page: ${e.cta_url || "ask me for the exact page link"}.${u ? ` The page headline is "${u.headline}", so the ads and page match.` : ""}`, te = `AD RULES FOR THIS BUSINESS
${Nr(e).map((e) => `- ${e}`).join("\n")}`, ne = "BLANKS\nIf any ad text still has something in [square brackets], ask me to fill it in first. Never fill it in yourself and never use an ad with a blank in it.";
	return t === "manual" ? `I'm a freelance marketer launching a Meta ad campaign for my client, ${n}${e.location ? ` in ${e.location}` : ""}. I'm building it myself in Meta Ads Manager (adsmanager.facebook.com). Walk me through it.

HOW TO HELP ME
- One step at a time. Tell me exactly where to click and what to type, using the button and field names I'll see on screen.
- After each step, wait for me to say "done" before giving me the next one.
- If I send a screenshot, look at it and tell me what to change.
- Everything stays paused or in draft. Tell me to leave the campaign off until my client approves the ads. Never tell me to publish before that.
- Start by checking I'm in the right ad account (the one for ${n}) and the right Facebook Page.

THE ORDER
1. Create the campaign with the settings below.
2. Set up the ad set: budget, location, audience, placements${d ? "" : ", and the website as the conversion location"}.
3. Create each ad: upload the image or video, paste the copy, pick the button${d ? ", and attach the Instant Form" : ", and add the landing page link"}.
4. Check everything with me, then show me how to get a preview link for each ad to send my client.

${ee}
WHERE THE ADS SEND PEOPLE
${d ? `An Instant Form. Walk me through creating it inside the first ad (Instant Form, then Create form), then reuse it on the other ads. The form:
${p}` : m}

THE ADS (I'll paste the copy exactly as written)
${f}

${ne}

AT THE END, GO THROUGH THIS WITH ME
- Campaign, ad set and every ad are set up and still off.
- Budget is ${P(o)} a day, set once.
- The right Page is on every ad, and every ad goes to the ${d ? "Instant Form" : "landing page"} above.
- Every ad name follows: Business - Concept - Format.
- I have a preview link for every ad to send my client before I publish.

${te}` : `I'm a freelance marketer launching a Meta ad campaign for my client, ${n}${e.location ? ` in ${e.location}` : ""}. Use the Meta Ads connector to build it in my client's ad account.

Build everything paused. Do not publish anything until I approve it.

SAFETY RULES
- Create everything PAUSED. Never activate or publish anything.
- Never change, pause or delete anything that already exists in the account unless I say yes to that exact change.
- Only use the ad account I choose. List my ad accounts and ask me which one belongs to ${n}.
- Ask me which Facebook Page belongs to ${n}, and check whether their Instagram is linked.
- If something fails, tell me in plain words what happened and what to do.

${ee}
WHERE THE ADS SEND PEOPLE
${d ? `An Instant Form (lead form). Lead ads need a form, and you may not be able to create forms, so ask me for the form ID. If I haven't made it yet, tell me: "In Meta Business Suite, go to All tools, then Instant Forms, create the form, and copy its ID." The form:
${p}` : m}

THE ADS (use the copy exactly as written)
${f}

IMAGES AND VIDEOS
Ask me to upload one image or video for each ad and name each file after its ad. Ask whether any was made with AI and set the AI disclosure the way I answer.

${ne}

BEFORE YOU HAND IT BACK, CHECK
- Campaign, ad set and every ad exist and are PAUSED.
- Budget is ${P(o)} a day, set once.
- The right Page is on every ad, and every ad goes to the ${d ? "Instant Form" : "landing page"} above.
- Every ad name follows: Business - Concept - Format.
Show me the result as a short pass / fix list, then give me a preview link for every ad and remind me to send the previews to my client before I press Publish myself.

${te}`;
}
//#endregion
//#region src/lib/contentEngine.js
var da = /* @__PURE__ */ t({
	BATCH: () => 5,
	CONTENT_STAGES: () => fa,
	CTAS: () => ga,
	FORMATS: () => ma,
	LENGTHS: () => pa,
	applyDayRedo: () => Ra,
	applyPillarRedo: () => Fa,
	auditNotesFrom: () => xa,
	buildContentRewriteCall: () => Aa,
	buildDayRedoCall: () => La,
	buildHookRedoCall: () => Ia,
	buildPillarRedoCall: () => Pa,
	buildPositioningRedoCall: () => za,
	buildPostsCall: () => Ea,
	buildStrategyCall: () => Sa,
	carouselDesignPrompt: () => Va,
	contentDocHtml: () => Wa,
	contentDocPage: () => $a,
	contentDocText: () => Ga,
	finalizeContentRewrite: () => ja,
	finalizePosts: () => Da,
	finalizeStrategy: () => Ca,
	formatLabel: () => ha,
	nextBatch: () => Oa,
	postText: () => ka,
	shotList: () => Ba,
	strategyDocHtml: () => qa,
	strategyDocPage: () => Qa,
	strategyDocText: () => Ja
}), fa = [
	{
		id: "about",
		label: "About"
	},
	{
		id: "strategy",
		label: "Strategy"
	},
	{
		id: "content",
		label: "Content"
	}
], pa = [
	{
		n: 5,
		label: "5 posts"
	},
	{
		n: 7,
		label: "1 week",
		sub: "7 posts"
	},
	{
		n: 14,
		label: "2 weeks",
		sub: "14 posts"
	}
], ma = [
	{
		id: "talking_head",
		label: "Talking head reel",
		short: "Talking head",
		text: "They talk to the camera. You get the script and what to film."
	},
	{
		id: "broll",
		label: "B-roll reel",
		short: "B-roll",
		text: "Clips with text on screen. You get the text and what each clip shows."
	},
	{
		id: "carousel",
		label: "Carousel",
		short: "Carousel",
		text: "Swipeable slides. You get the words and the look of each slide."
	}
], ha = (e) => ma.find((t) => t.id === e)?.short || "Post", ga = [
	{
		id: "keyword",
		label: "Comment a keyword",
		ask: "What's the keyword?",
		placeholder: "GLOW"
	},
	{
		id: "dm",
		label: "Send a DM",
		ask: "What should they DM?",
		placeholder: "Send me 'consult'"
	},
	{
		id: "book",
		label: "Book a call or visit",
		ask: "Where do they book?",
		placeholder: "Link in bio"
	},
	{
		id: "link",
		label: "Click the link in bio",
		ask: "What's at the link?",
		placeholder: "Free guide"
	},
	{
		id: "follow",
		label: "Just follow",
		ask: "",
		placeholder: ""
	}
], W = { type: "string" }, _a = {
	type: "array",
	items: W
}, G = (e) => String(e || "").replace(/\s*—\s*/g, ", ").trim();
function va(e) {
	let t = ga.find((t) => t.id === e.cta_type) || ga[0];
	return t.id === "follow" ? "Follow the account" : `${t.label}${e.cta_detail ? `: ${e.cta_detail}` : ""}`;
}
function ya(e) {
	let t = "Not provided";
	return `THE CLIENT
- Business: ${F(e.business_name) || t}${e.location ? ` in ${e.location}` : ""}
- What they do: ${e.business_description || t}
- Services: ${(e.services || []).join(", ") || t}
- What they sell or the offer to push: ${e.offer_text || t}
- Who it's for: ${e.audience || t}
- What followers should do: ${va(e)}
${e.voice_samples ? `- How the client writes (match this voice):\n${e.voice_samples}` : ""}
${e.audit_notes ? `\nWHAT THE FREELANCER FOUND WHEN THEY AUDITED THIS CLIENT'S SOCIAL MEDIA (real observations; build the plan on these)\n${e.audit_notes}\n` : ""}`;
}
var ba = (e) => String(e || "").replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
function xa(e) {
	if (!e) return "";
	let t = Array.isArray(e.caught) ? e.caught : [];
	return [
		e.snapshot && `What they do now: ${ba(e.snapshot)}`,
		...t.map((e) => `- ${ba(e)}`),
		(e.opp_detail || e.opportunity) && `The biggest opportunity: ${ba(e.opp_detail || e.opportunity)}`,
		e.noticed && `What I noticed: ${ba(e.noticed)}`,
		e.why && `Why it matters: ${ba(e.why)}`
	].filter(Boolean).join("\n");
}
var K = "RULES\n- Plain words their customers actually use. Specific to this business, never generic.\n- Only use facts given above. Never invent results, numbers, reviews, credentials, prices or stories. If a real detail would help, write it as a short [placeholder in square brackets] for the freelancer to fill in.\n- Don't invent details about the place either (a wall, a room, an event, a staff member, a ranking like \"best in town\"). Only mention what the facts above say is there.\n- No health or medical claims about what a treatment, product or service does to the body (like \"reduces inflammation\", \"detoxes\", \"burns fat\") unless the facts above say it. Talk about how it feels, what it's for and why people choose it.\n- No hype words, no clickbait the post can't pay off.\n- No em dashes.";
function Sa(e, t = "") {
	let n = Number(e.length) || 5, r = (e.formats?.length ? e.formats : ma.map((e) => e.id)).map((e) => `${e} (${ha(e)})`).join(", ");
	return {
		prompt: `You are a content strategist helping a beginner freelance social media manager plan organic Instagram content for a client.

${ya(e)}
${t || e.strategy ? `
THIS IS A REDO. The freelancer didn't like the last plan.${t ? ` What they want changed: ${t}` : ""}${e.strategy?.pillars?.length ? `
Last pillars (make these clearly different unless told otherwise): ${e.strategy.pillars.map((e) => e.name).join(", ")}` : ""}
` : ""}
${e.audit_notes ? "USE THE AUDIT: keep what's already working, fix the gaps it found, and make the biggest opportunity the heart of the plan. Don't repeat the audit back; turn it into posts.\n\n" : ""}RETURN
- positioning: one sentence. Who they help, the outcome, and what makes them different, using only the facts above.
- pillars: exactly 3 content pillars. name (2 to 4 words), about (one line: what the posts cover), leads_to_offer (one line: how this pillar leads people to the offer).
- hooks: 21 hooks, 7 per pillar. pillar (the pillar name) and line (the first sentence spoken or shown, under 15 words, in the customer's language). Mix types: curiosity, mistake, myth, how-to, result, relatable, question. Plain everyday words ("med spa", not "medical spa"). Don't start with "Ever wonder", "Did you know" or "Are you tired of". No slogans.
- calendar: exactly ${n} posts in posting order. For each: day (1 to ${n}), pillar (a pillar name), format (one of: ${r}), goal (reach, trust or offer), hook (its opening line), idea (one line: what the post says), cta (the call to action for this post).
  Rotate pillars and formats so no two posts in a row share both. About 1 in 5 posts has goal "offer" and uses the client's call to action (${va(e)}); the rest end with a soft call to action (save, share, follow) or the client's call to action when it fits.

${K}`,
		response_json_schema: {
			type: "object",
			properties: {
				positioning: W,
				pillars: {
					type: "array",
					items: {
						type: "object",
						properties: {
							name: W,
							about: W,
							leads_to_offer: W
						}
					}
				},
				hooks: {
					type: "array",
					items: {
						type: "object",
						properties: {
							pillar: W,
							line: W
						}
					}
				},
				calendar: {
					type: "array",
					items: {
						type: "object",
						properties: {
							day: { type: "number" },
							pillar: W,
							format: W,
							goal: W,
							hook: W,
							idea: W,
							cta: W
						}
					}
				}
			},
			required: [
				"positioning",
				"pillars",
				"hooks",
				"calendar"
			]
		}
	};
}
function Ca(e, t) {
	let n = t.formats?.length ? t.formats : ma.map((e) => e.id), r = Number(t.length) || 5, i = (e?.pillars || []).slice(0, 3).map((e) => ({
		name: G(e.name),
		about: G(e.about),
		leads_to_offer: G(e.leads_to_offer)
	})), a = (e?.calendar || []).slice(0, r).map((e, t) => ({
		day: t + 1,
		pillar: G(e.pillar),
		format: n.includes(e.format) ? e.format : n[t % n.length],
		goal: [
			"reach",
			"trust",
			"offer"
		].includes(e.goal) ? e.goal : "reach",
		hook: G(e.hook),
		idea: G(e.idea),
		cta: G(e.cta)
	}));
	return {
		positioning: G(e?.positioning),
		pillars: i,
		hooks: (e?.hooks || []).map((e) => ({
			pillar: G(e.pillar),
			line: G(e.line)
		})).filter((e) => e.line),
		calendar: a
	};
}
var wa = "HOW IT SHOULD SOUND\n- Write the way the owner talks to a customer at the front desk, not the way a brochure reads. Use contractions.\n- Use the short, everyday words customers use: \"med spa\", not \"medical spa\". \"Botox\", not \"neuromodulator treatment\". \"Facial\", not \"skincare service\".\n- Every line has to say something specific: a real detail, a moment, a step, a thing you'd see, a thing a customer actually asks. If a line could be on any business's page, cut it or make it specific.\n- Never write slogans or abstract claims. Banned: \"makes a difference\", \"personalized care\", \"long-term results\", \"focused on\", \"elevate\", \"journey\", \"transform\", \"self-care day\", \"treat yourself\", \"you deserve\", \"look and feel your best\", \"we're passionate about\", \"game changer\", \"take the guesswork out\".\n- Hooks: plain and specific, the kind of thing a person would actually say out loud. Don't start with \"Ever wonder\", \"Did you know\" or \"Are you tired of\".\n- B-roll text on screen: each line is a full, specific thought that moves a mini story or list forward, like a person texting a friend. No taglines.\n- Calls to action: specific to that post. \"Comment GLOW and I'll send you the price list\" beats \"Save this for later\". Skip \"save this for your next self-care day\" style lines.\n- Before you return, reread every line out loud. Rewrite any line that sounds like an ad, a slogan or a website.\n\nEXAMPLES (the style, not the words to use)\n- Weak hook: \"Ever wonder what a medical spa facial really looks like?\" Better: \"Here's exactly what happens in your first facial with us, start to finish.\"\n- Weak line: \"Medical supervision makes a difference.\" Better: \"A nurse checks your skin before anything touches it. That's why we'll sometimes say not today.\"\n- Weak line: \"Focused on long-term results, personalized care for your skin.\" Better: \"We'd rather see you every 6 weeks for a year than fix one bad week.\"\n- Weak CTA: \"Save this for your next self-care day.\" Better: \"Comment FACIAL and I'll send you what to do the week before.\"", Ta = {
	talking_head: "talking_head: hook (the first line they say), script (the full spoken script after the hook, 30 to 45 seconds, short lines one thought per line, ends with the call to action), visual (what to film: where they stand or sit, framing, and 2 or 3 cutaway shots to show while they talk), caption.",
	broll: "broll: hook (the first text on screen), on_screen (4 to 6 short lines of text in order, one per clip, the last one is the call to action), visual (what each clip shows, numbered to match the lines, all things the client can film on a phone), caption.",
	carousel: "carousel: hook (slide 1 text), slides (6 to 8 slides in order, slide 1 is the hook and the last slide is the call to action; each slide has text, the words on it, under 25 words, and visual, what the slide looks like: a photo to use or a simple design), caption."
};
function Ea(e, t) {
	let n = [...new Set(t.map((e) => e.format))];
	return {
		prompt: `You are a social media copywriter writing organic Instagram posts for a client. The client is speaking to their own followers and customers.

${ya(e)}

POSITIONING
${e.strategy?.positioning || ""}

WRITE THESE ${t.length} POSTS
${t.map((e) => `Post ${e.day}: ${ha(e.format)} (${e.format}). Pillar: ${e.pillar}. Goal: ${e.goal}. Hook: ${e.hook}. Idea: ${e.idea}. Call to action: ${e.cta}.`).join("\n")}

Use each post's hook as the starting point. If it breaks a rule below, improve it.

WHAT EACH FORMAT NEEDS
${n.map((e) => `- ${Ta[e]}`).join("\n")}
- caption for every post: 2 to 5 short paragraphs separated by a blank line, ending with the call to action. At most 2 emojis. 3 to 5 relevant hashtags on the last line.
Return one item per post in the same order, with day and format. Leave fields a format doesn't use empty.

VOICE
${we.text}
SPEAKER: the business owner or provider talking to their own followers, not a marketer talking to a business owner.

${wa}

${K}`,
		response_json_schema: {
			type: "object",
			properties: { posts: {
				type: "array",
				items: {
					type: "object",
					properties: {
						day: { type: "number" },
						format: W,
						hook: W,
						script: W,
						visual: W,
						on_screen: _a,
						slides: {
							type: "array",
							items: {
								type: "object",
								properties: {
									text: W,
									visual: W
								}
							}
						},
						caption: W
					}
				}
			} },
			required: ["posts"]
		}
	};
}
function Da(e, t) {
	let n = e?.posts || [];
	return t.map((e, t) => {
		let r = n.find((t) => Number(t.day) === e.day) || n[t] || {};
		return {
			day: e.day,
			format: e.format,
			hook: G(r.hook || e.hook),
			script: G(r.script),
			visual: G(r.visual),
			on_screen: (r.on_screen || []).map(G).filter(Boolean),
			slides: (r.slides || []).map((e) => ({
				text: G(e.text),
				visual: G(e.visual)
			})).filter((e) => e.text),
			caption: U(G(r.caption))
		};
	});
}
function Oa(e) {
	let t = e.strategy?.calendar || [], n = new Set((e.posts || []).filter(Boolean).map((e) => e.day));
	return t.filter((e) => !n.has(e.day)).slice(0, 5);
}
function ka(e, t, n) {
	let r = [`DAY ${t.day}: ${ha(t.format)}${n?.pillar ? ` (${n.pillar})` : ""}`, ""];
	return t.format === "talking_head" && r.push(`HOOK\n${t.hook}`, "", `SCRIPT\n${t.script}`, "", `WHAT TO FILM\n${t.visual}`), t.format === "broll" && r.push(`TEXT ON SCREEN\n${t.on_screen.map((e, t) => `${t + 1}. ${e}`).join("\n")}`, "", `WHAT THE CLIPS SHOW\n${t.visual}`), t.format === "carousel" && r.push(`SLIDES\n${t.slides.map((e, t) => `Slide ${t + 1}: ${e.text}\n(Visual: ${e.visual})`).join("\n\n")}`), r.push("", `CAPTION\n${t.caption}`), r.join("\n");
}
function Aa(e, t, n, r, i) {
	return {
		prompt: `You are a social media copywriter. Rewrite one piece of this client's Instagram post.

${ya(e)}

THE POST: ${ha(t.format)}. Hook: ${t.hook}

REWRITE THIS ${n.toUpperCase()}
${r}

HOW
${i}
Keep the same idea, facts and call to action. Keep it the right length for a ${n.toLowerCase()}.

${wa}

${K}

Return JSON: { "text": the new version only }.`,
		response_json_schema: {
			type: "object",
			properties: { text: W },
			required: ["text"]
		}
	};
}
function ja(e, t) {
	let n = G(e?.text);
	return t ? n : n.replace(/\s*\n+\s*/g, " ");
}
var Ma = (e) => e ? `What the freelancer wants changed: ${e}` : "Make it clearly different from the current one, and better.";
function Na(e) {
	let t = e.strategy || {};
	return `${ya(e)}

POSITIONING
${t.positioning || ""}

PILLARS
${(t.pillars || []).map((e, t) => `${t + 1}. ${e.name}: ${e.about}`).join("\n")}`;
}
function Pa(e, t, n) {
	let r = e.strategy, i = r.pillars[t], a = r.calendar.filter((e) => e.pillar === i.name);
	return {
		prompt: `You are a content strategist planning organic Instagram content for a client. Replace ONE content pillar.

${Na(e)}

REPLACE PILLAR ${t + 1}: ${i.name} (${i.about})
${Ma(n)}
It must not overlap with the other pillars.

RETURN
- pillar: name (2 to 4 words), about (one line), leads_to_offer (one line).
- hooks: 7 hook lines for the new pillar, each under 15 words, plain everyday words, no "Ever wonder", "Did you know" or "Are you tired of", no slogans.
- days: for each of these calendar days, a new hook and idea that fit the new pillar, keeping the day's format and goal:
${a.map((e) => `  Day ${e.day}: ${e.format}, goal ${e.goal}`).join("\n") || "  (none)"}

${K}`,
		response_json_schema: {
			type: "object",
			properties: {
				pillar: {
					type: "object",
					properties: {
						name: W,
						about: W,
						leads_to_offer: W
					}
				},
				hooks: _a,
				days: {
					type: "array",
					items: {
						type: "object",
						properties: {
							day: { type: "number" },
							hook: W,
							idea: W
						}
					}
				}
			},
			required: ["pillar", "hooks"]
		}
	};
}
function Fa(e, t, n) {
	let r = e.pillars[t], i = {
		name: G(n?.pillar?.name) || r.name,
		about: G(n?.pillar?.about),
		leads_to_offer: G(n?.pillar?.leads_to_offer)
	}, a = [...e.hooks.filter((e) => e.pillar !== r.name), ...(n?.hooks || []).map((e) => ({
		pillar: i.name,
		line: G(e)
	})).filter((e) => e.line)], o = [], s = e.calendar.map((e) => {
		if (e.pillar !== r.name) return e;
		let t = (n?.days || []).find((t) => Number(t.day) === e.day);
		return o.push(e.day), {
			...e,
			pillar: i.name,
			hook: G(t?.hook) || e.hook,
			idea: G(t?.idea) || e.idea
		};
	});
	return {
		strategy: {
			...e,
			pillars: e.pillars.map((e, n) => n === t ? i : e),
			hooks: a,
			calendar: s
		},
		changed: o
	};
}
function Ia(e, t, n) {
	return {
		prompt: `You are a content strategist. Write ONE new hook for this client's Instagram content.

${Na(e)}

PILLAR: ${t.pillar}
CURRENT HOOK: ${t.line}
${Ma(n)}
Under 15 words, the kind of thing a person would say out loud. Plain everyday words. No "Ever wonder", "Did you know" or "Are you tired of". No slogans.

${K}

Return JSON: { "text": the new hook only }.`,
		response_json_schema: {
			type: "object",
			properties: { text: W },
			required: ["text"]
		}
	};
}
function La(e, t, n) {
	let r = e.formats?.length ? e.formats : ma.map((e) => e.id);
	return {
		prompt: `You are a content strategist. Replace ONE post in this client's Instagram content calendar.

${Na(e)}

THE POST: Day ${t.day}. Pillar: ${t.pillar}. Format: ${t.format}. Goal: ${t.goal}. Hook: ${t.hook}. Idea: ${t.idea}.
${Ma(n)}
Keep the pillar and goal. Keep the format unless they asked for a different one (allowed: ${r.join(", ")}).

RETURN: format, hook (under 15 words, plain words, no "Ever wonder" or "Did you know", no slogans), idea (one line), cta.

${K}`,
		response_json_schema: {
			type: "object",
			properties: {
				format: W,
				hook: W,
				idea: W,
				cta: W
			},
			required: ["hook", "idea"]
		}
	};
}
function Ra(e, t, n) {
	let r = e.formats?.length ? e.formats : ma.map((e) => e.id);
	return {
		...t,
		format: r.includes(n?.format) ? n.format : t.format,
		hook: G(n?.hook) || t.hook,
		idea: G(n?.idea) || t.idea,
		cta: G(n?.cta) || t.cta
	};
}
function za(e, t) {
	return {
		prompt: `You are a content strategist. Rewrite this client's one-line positioning statement.

${Na(e)}

${Ma(t)}
One sentence: who they help, the outcome, and what makes them different, using only the facts above. Plain words, no slogans.

${K}

Return JSON: { "text": the new positioning only }.`,
		response_json_schema: {
			type: "object",
			properties: { text: W },
			required: ["text"]
		}
	};
}
function Ba(e, t) {
	let n = F(e.business_name) || "the business", r = (t.on_screen || []).map((e, t) => `${t + 1}. Text on screen: "${e}"`);
	return `Shot list for ${n}: "${t.hook}"

What to film: ${t.visual}

Film on a phone, vertical (9:16), in good light. 3 to 5 seconds per clip, steady hands, real moments at the business (no stock footage, no AI video). Film a few extra clips so there's choice.

${r.join("\n")}`;
}
function Va(e, t, n) {
	return `Design an Instagram carousel for ${F(e.business_name) || "the business"}${e.location ? ` in ${e.location}` : ""}.

Build it as one HTML page with ${t.slides.length} slides, each exactly 1080 x 1350 px (4:5), side by side or stacked, so I can screenshot or download each one. Add a button that downloads every slide as its own PNG if you can.

BRAND
- Colors: ${e.brand_colors || "pick 2 or 3 calm colors that suit this business"}
- Style: ${e.brand_style || "clean and simple, lots of space, easy to read on a phone"}
- If I upload their logo or a screenshot of their website, match it.

THE SLIDES (use this text exactly, word for word)
${t.slides.map((e, n) => `Slide ${n + 1}${n === 0 ? " (cover)" : n === t.slides.length - 1 ? " (call to action)" : ""}
Text: ${e.text}
Look: ${e.visual || "simple text slide"}`).join("\n\n")}

DESIGN RULES
- Slide 1 has to stop the scroll: big, bold text, very few words, high contrast.
- One idea per slide. Text large enough to read on a phone without zooming.
- The same fonts, colors and layout on every slide so it looks like one set. Small slide numbers (1/${t.slides.length}) and the handle or business name in a corner.
- Where a slide calls for a photo, leave a clearly marked photo area with a note saying what photo goes there. People are welcome in the design; just no fake names, reviews or results.
- Keep the text exactly as written. Don't add claims, prices, reviews or numbers.
- No em dashes.${n?.pillar ? `\n\nThis post is part of the "${n.pillar}" content pillar.` : ""}`;
}
var q = (e) => String(e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), Ha = (e) => q(e).split(/\n\s*\n/).map((e) => `<p>${e.replace(/\n/g, "<br>")}</p>`).join(""), Ua = {
	talking_head: "Talking head reel",
	broll: "B-roll reel",
	carousel: "Carousel"
};
function Wa(e) {
	let t = e.strategy?.calendar || [], n = F(e.business_name) || "Content plan", r = (e.posts || []).slice().sort((e, t) => e.day - t.day).map((e) => {
		let n = t.find((t) => t.day === e.day) || {}, r = [`<h2>Day ${e.day} · ${Ua[e.format] || "Post"}: "${q(e.hook || n.hook)}"</h2>`];
		return n.pillar && r.push(`<p><b>Pillar:</b> ${q(n.pillar)}</p>`), e.format === "talking_head" && (r.push(`<p><b>What to film:</b> ${q(e.visual)}</p>`), r.push(`<p><b>Spoken hook:</b> "${q(e.hook)}"</p>`), r.push(`<p><b>Script:</b></p>${Ha(e.script)}`)), e.format === "broll" && (r.push(`<p><b>What the clips show:</b> ${q(e.visual)}</p>`), r.push(`<p><b>Text on screen:</b></p><ol>${e.on_screen.map((e) => `<li>${q(e)}</li>`).join("")}</ol>`)), e.format === "carousel" && r.push(`<p><b>Slides:</b></p><ol>${e.slides.map((e) => `<li>${q(e.text)}${e.visual ? `<br><i>Look: ${q(e.visual)}</i>` : ""}</li>`).join("")}</ol>`), r.push(`<p><b>Caption:</b></p>${Ha(e.caption)}`), n.cta && r.push(`<p><b>CTA:</b> ${q(n.cta)}</p>`), `<section>${r.join("\n")}</section>`;
	}).join("\n<hr>\n"), i = e.strategy || {}, a = [i.positioning ? `<p><b>Positioning:</b> ${q(i.positioning)}</p>` : "", i.pillars?.length ? `<p><b>Content pillars:</b> ${i.pillars.map((e) => q(e.name)).join(" · ")}</p>` : ""].join("");
	return `<h1>${q(n)}: content plan</h1>${a}<hr>${r}`;
}
function Ga(e) {
	let t = e.strategy?.calendar || [];
	return [
		`${F(e.business_name) || "Content plan"}: content plan`,
		e.strategy?.positioning ? `Positioning: ${e.strategy.positioning}` : "",
		""
	].concat((e.posts || []).slice().sort((e, t) => e.day - t.day).map((n) => ka(e, n, t.find((e) => e.day === n.day)))).join("\n\n---\n\n");
}
var Ka = {
	reach: "Reach",
	trust: "Trust",
	offer: "Offer"
};
function qa(e) {
	let t = e.strategy || {}, n = F(e.business_name) || "Content strategy", r = (t.pillars || []).map((e, t) => `<h3>${t + 1}. ${q(e.name)}</h3><p>${q(e.about)}</p><p><b>Leads to the offer:</b> ${q(e.leads_to_offer)}</p>`).join(""), i = (t.pillars || []).map((e) => `<h3>${q(e.name)}</h3><ol>${(t.hooks || []).filter((t) => t.pillar === e.name).map((e) => `<li>${q(e.line)}</li>`).join("")}</ol>`).join(""), a = (t.calendar || []).map((e) => `<tr><td>Day ${e.day}</td><td>${q(Ua[e.format] || e.format)}</td><td>${q(e.pillar)}</td><td>${q(Ka[e.goal] || e.goal)}</td><td>${q(e.hook)}</td><td>${q(e.idea)}</td><td>${q(e.cta)}</td></tr>`).join("");
	return `<h1>${q(n)}: content strategy</h1>
${e.offer_text || e.audience ? `<p>${e.offer_text ? `<b>Offer:</b> ${q(e.offer_text)}` : ""}${e.offer_text && e.audience ? "<br>" : ""}${e.audience ? `<b>For:</b> ${q(e.audience)}` : ""}</p>` : ""}
<h2>Positioning</h2><p>${q(t.positioning)}</p>
<h2>Content pillars</h2>${r}
<h2>Hook bank</h2>${i}
<h2>Calendar</h2>
<table><thead><tr><th>Day</th><th>Format</th><th>Pillar</th><th>Goal</th><th>Hook</th><th>Idea</th><th>CTA</th></tr></thead><tbody>${a}</tbody></table>`;
}
function Ja(e) {
	let t = e.strategy || {};
	return [
		`${F(e.business_name) || "Content strategy"}: content strategy`,
		"",
		`POSITIONING\n${t.positioning || ""}`,
		"",
		`CONTENT PILLARS\n${(t.pillars || []).map((e, t) => `${t + 1}. ${e.name}: ${e.about}\n   Leads to the offer: ${e.leads_to_offer}`).join("\n")}`,
		"",
		`HOOK BANK\n${(t.pillars || []).map((e) => `${e.name}\n${(t.hooks || []).filter((t) => t.pillar === e.name).map((e) => `- ${e.line}`).join("\n")}`).join("\n\n")}`,
		"",
		`CALENDAR\n${(t.calendar || []).map((e) => `Day ${e.day} · ${Ua[e.format] || e.format} · ${e.pillar} · ${Ka[e.goal] || e.goal}\n  Hook: ${e.hook}\n  Idea: ${e.idea}\n  CTA: ${e.cta}`).join("\n")}`
	].join("\n");
}
function Ya(e) {
	let t = String(e.brand_colors || "").match(/#([0-9a-f]{6})\b/gi) || [];
	for (let e of t) {
		let t = parseInt(e.slice(1), 16), [n, r, i] = [
			t >> 16 & 255,
			t >> 8 & 255,
			t & 255
		];
		if ((.299 * n + .587 * r + .114 * i) / 255 < .6) return e;
	}
	return "#9a4590";
}
function Xa({ title: e, accent: t, body: n }) {
	return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${q(e)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gloock&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--accent:${t};--ink:#1a2236;--muted:#5d6475;--line:#ebe6de;--paper:#fdfbf8;--soft:color-mix(in srgb,var(--accent) 9%,#fff)}
*{box-sizing:border-box}
body{margin:0;background:#efece7;color:var(--ink);font:15px/1.65 Inter,system-ui,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.bar{position:sticky;top:0;z-index:5;display:flex;justify-content:flex-end;gap:10px;padding:12px 20px;background:rgba(239,236,231,.92);backdrop-filter:blur(6px)}
.bar button{height:40px;padding:0 18px;border:0;border-radius:999px;background:var(--ink);color:#fff;font:600 14px Inter,sans-serif;cursor:pointer}
.page{max-width:820px;margin:8px auto 48px;background:var(--paper);border-radius:6px;box-shadow:0 30px 60px -40px rgba(26,34,54,.45);overflow:hidden}
.cover{padding:64px 64px 48px;background:linear-gradient(135deg,var(--soft),#fff 70%);border-bottom:1px solid var(--line)}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
h1{margin:14px 0 0;font:400 52px/1.02 Gloock,Georgia,serif;letter-spacing:-.015em}
.meta{margin-top:18px;color:var(--muted);font-size:14px}
.meta b{color:var(--ink);font-weight:600}
section{padding:44px 64px;border-bottom:1px solid var(--line);break-inside:avoid-page}
section:last-child{border-bottom:0}
.label{display:flex;align-items:center;gap:12px;margin-bottom:20px;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
.label:after{content:"";flex:1;height:1px;background:var(--line)}
.quote{margin:0;font:400 30px/1.3 Gloock,Georgia,serif;color:var(--ink)}
.quote:before{content:"";display:block;width:40px;height:3px;margin-bottom:18px;background:var(--accent);border-radius:2px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.pillar{padding:22px;border:1px solid var(--line);border-radius:12px;background:#fff}
.num{display:inline-flex;width:28px;height:28px;border-radius:50%;align-items:center;justify-content:center;background:var(--accent);color:#fff;font:700 13px Inter,sans-serif}
.pillar h3{margin:14px 0 6px;font:400 21px/1.2 Gloock,Georgia,serif}
.pillar p{margin:0;color:var(--muted);font-size:14px}
.pillar .to{margin-top:12px;padding-top:12px;border-top:1px dashed var(--line);color:var(--ink);font-size:13.5px}
.pillar .to b{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
.hooks h3{margin:0 0 10px;font:400 19px Gloock,Georgia,serif}
.hooks ol{margin:0;padding:0;list-style:none;counter-reset:h}
.hooks li{counter-increment:h;position:relative;padding:9px 0 9px 34px;border-top:1px solid var(--line);font-size:14.5px}
.hooks li:first-child{border-top:0}
.hooks li:before{content:counter(h);position:absolute;left:0;top:10px;width:22px;height:22px;border-radius:50%;background:var(--soft);color:var(--accent);font:700 11px/22px Inter,sans-serif;text-align:center}
.hooks + .hooks{margin-top:28px}
.day{display:grid;grid-template-columns:76px 1fr auto;gap:18px;padding:16px 0;border-top:1px solid var(--line);align-items:start}
.day:first-of-type{border-top:0}
.dnum{font:400 26px/1 Gloock,Georgia,serif;color:var(--accent)}
.dnum small{display:block;margin-top:4px;font:700 10.5px Inter,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.dhook{font-weight:600;font-size:15.5px;line-height:1.4}
.didea{margin-top:4px;color:var(--muted);font-size:14px}
.dmeta{margin-top:8px;font-size:12.5px;color:var(--muted)}
.tag{display:inline-block;padding:3px 10px;border-radius:999px;background:var(--soft);color:var(--accent);font-size:11.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
.tag.offer{background:var(--accent);color:#fff}
.post h2{margin:0;font:400 26px/1.25 Gloock,Georgia,serif}
.post .sub{margin-top:8px;color:var(--muted);font-size:13.5px}
.block{margin-top:22px}
.block .k{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:6px}
.block p{margin:0 0 8px}
.film{padding:14px 16px;border-radius:10px;background:var(--soft);font-size:14px}
.lines{margin:0;padding-left:20px}
.lines li{margin:6px 0}
.slide{display:grid;grid-template-columns:34px 1fr;gap:12px;padding:12px 0;border-top:1px solid var(--line)}
.slide:first-child{border-top:0}
.slide .n{font:400 20px Gloock,Georgia,serif;color:var(--accent)}
.slide .look{margin-top:3px;color:var(--muted);font-size:13px}
.caption{padding:16px 18px;border:1px solid var(--line);border-radius:10px;background:#fff;font-size:14.5px}
.foot{padding:26px 64px;color:var(--muted);font-size:12.5px;display:flex;justify-content:space-between}
@media (max-width:700px){.cover,section,.foot{padding-left:24px;padding-right:24px}h1{font-size:38px}.quote{font-size:24px}.grid3{grid-template-columns:1fr}.day{grid-template-columns:56px 1fr}.day .tag{grid-column:2}}
@media print{body{background:#fff}.bar{display:none}.page{margin:0;max-width:none;box-shadow:none;border-radius:0}@page{margin:14mm}}
</style></head><body><div class="bar"><button onclick="window.print()">Save as PDF</button></div><div class="page">${n}</div></body></html>`;
}
function Za(e, t, n) {
	let r = F(e.business_name) || "Your business", i = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
	return `<header class="cover"><div class="eyebrow">${t}</div><h1>${q(r)}</h1>
<div class="meta">${e.offer_text ? `<b>Offer:</b> ${q(e.offer_text)}<br>` : ""}${e.audience ? `<b>For:</b> ${q(e.audience)}<br>` : ""}${n ? `Prepared by ${q(n)} · ` : ""}${i}</div></header>`;
}
function Qa(e, t = "") {
	let n = e.strategy || {}, r = (n.pillars || []).map((e, t) => `<div class="pillar"><span class="num">${t + 1}</span><h3>${q(e.name)}</h3><p>${q(e.about)}</p><div class="to"><b>Leads to the offer</b>${q(e.leads_to_offer)}</div></div>`).join(""), i = (n.pillars || []).map((e) => `<div class="hooks"><h3>${q(e.name)}</h3><ol>${(n.hooks || []).filter((t) => t.pillar === e.name).map((e) => `<li>${q(e.line)}</li>`).join("")}</ol></div>`).join(""), a = (n.calendar || []).map((e) => `<div class="day"><div class="dnum">${e.day}<small>Day</small></div><div><div class="dhook">${q(e.hook)}</div><div class="didea">${q(e.idea)}</div><div class="dmeta">${q(Ua[e.format] || e.format)} · ${q(e.pillar)}${e.cta ? ` · CTA: ${q(e.cta)}` : ""}</div></div><span class="tag${e.goal === "offer" ? " offer" : ""}">${q(Ka[e.goal] || e.goal)}</span></div>`).join(""), o = `${Za(e, "Content strategy", t)}
<section><div class="label">Positioning</div><p class="quote">${q(n.positioning)}</p></section>
<section><div class="label">Content pillars</div><div class="grid3">${r}</div></section>
<section><div class="label">Hook bank</div>${i}</section>
<section><div class="label">The plan · ${(n.calendar || []).length} posts</div>${a}</section>
<div class="foot"><span>${q(F(e.business_name) || "")} content strategy</span><span>${t ? q(t) : ""}</span></div>`;
	return Xa({
		title: `${F(e.business_name) || "Content"} content strategy`,
		accent: Ya(e),
		body: o
	});
}
function $a(e, t = "") {
	let n = e.strategy?.calendar || [], r = (e.posts || []).slice().sort((e, t) => e.day - t.day), i = (e) => q(e).split(/\n\s*\n/).map((e) => `<p>${e.replace(/\n/g, "<br>")}</p>`).join(""), a = r.map((e) => {
		let t = n.find((t) => t.day === e.day) || {}, r = [];
		return e.format === "talking_head" && (r.push(`<div class="block"><div class="k">What to film</div><div class="film">${q(e.visual)}</div></div>`), r.push(`<div class="block"><div class="k">Hook</div><p><b>${q(e.hook)}</b></p></div>`), r.push(`<div class="block"><div class="k">Script</div>${i(e.script)}</div>`)), e.format === "broll" && (r.push(`<div class="block"><div class="k">What the clips show</div><div class="film">${q(e.visual)}</div></div>`), r.push(`<div class="block"><div class="k">Text on screen</div><ol class="lines">${e.on_screen.map((e) => `<li>${q(e)}</li>`).join("")}</ol></div>`)), e.format === "carousel" && r.push(`<div class="block"><div class="k">Slides</div>${e.slides.map((e, t) => `<div class="slide"><span class="n">${t + 1}</span><div><div>${q(e.text)}</div>${e.visual ? `<div class="look">${q(e.visual)}</div>` : ""}</div></div>`).join("")}</div>`), r.push(`<div class="block"><div class="k">Caption</div><div class="caption">${i(e.caption)}</div></div>`), `<section class="post"><div class="eyebrow">Day ${e.day} · ${q(Ua[e.format] || "Post")}</div><h2>${q(e.hook || t.hook)}</h2><div class="sub">${q(t.pillar || "")}${t.cta ? ` · CTA: ${q(t.cta)}` : ""}</div>${r.join("")}</section>`;
	}).join(""), o = `${Za(e, "Content plan", t)}
${e.strategy?.positioning ? `<section><div class="label">Positioning</div><p class="quote">${q(e.strategy.positioning)}</p></section>` : ""}
${a}
<div class="foot"><span>${q(F(e.business_name) || "")} content plan</span><span>${t ? q(t) : ""}</span></div>`;
	return Xa({
		title: `${F(e.business_name) || "Content"} content plan`,
		accent: Ya(e),
		body: o
	});
}
//#endregion
//#region src/lib/adsHeadlines.js
var eo = [
	{
		id: "HL-01",
		name: "Direct offer",
		structure: "[Product/Service] + [Price/Incentive]",
		use: "Straight to the point. Excellent for lead generation when the business has a strong offer.",
		rule: "Lead with the offer. Don't bury the price or incentive behind clever wording.",
		examples: [
			"Your First Facial for $49",
			"2 Large Pizzas for $24.99",
			"Get 20% Off Your First Order",
			"First Fitness Class FREE",
			"Complete Car Detailing From $149",
			"$79 AC Tune-Up Special"
		]
	},
	{
		id: "HL-02",
		name: "Freebie",
		structure: "Free + [Specific Valuable Thing]",
		use: "When the business offers something complimentary that lowers the barrier to becoming a lead.",
		rule: "Be specific about what is free. Only use this structure when the offer is genuinely complimentary.",
		examples: [
			"Get Your Free Roof Inspection",
			"Book a Free Trial Class",
			"Get a Free Home Valuation",
			"Claim Your Free Estimate",
			"Free Pest Inspection",
			"Get Your Complimentary Consultation"
		]
	},
	{
		id: "HL-03",
		name: "Desired outcome",
		structure: "[Desirable Result] + [Service or Mechanism]",
		use: "Focuses on what the customer wants rather than the technical details of the service.",
		rule: "Focus on a tangible outcome. Don't promise results that the business cannot guarantee.",
		examples: [
			"A Fresh Look for Your Driveway",
			"A Cleaner Car, Inside & Out",
			"Find Your Next Home",
			"Discover Your New Favorite Outfit",
			"A Fresh Look for Your Home",
			"Get Your Car Showroom-Ready"
		]
	},
	{
		id: "HL-04",
		name: "Curiosity",
		structure: "[Question or intriguing statement related to the service]",
		use: "Gives someone a reason to click and learn more.",
		rule: "Create curiosity without withholding essential information or resorting to clickbait.",
		examples: [
			"What's Your Home Worth Today?",
			"Is Your Roof Storm-Ready?",
			"What Does Ceramic Coating Do?",
			"Looking for Your Next Favorite Gym?",
			"Ever Tried a HydraFacial?",
			"What's Inside Our Best-Seller?"
		]
	},
	{
		id: "HL-05",
		name: "Problem / solution",
		structure: "[Recognizable Problem]? + [Clear Solution]",
		use: "Connects a common frustration directly to the service.",
		rule: "Focus on everyday problems. Don't use aggressive fear-based messaging or imply knowledge of someone's sensitive personal circumstances.",
		examples: [
			"Dirty Driveway? We Can Help.",
			"AC Not Working? Book a Visit.",
			"No Time to Cook? Order Online.",
			"Need a New Roof? Get a Quote.",
			"Car Needs Some TLC?",
			"Need a Reliable Local Plumber?"
		]
	},
	{
		id: "HL-06",
		name: "Social proof",
		structure: "[Verified Proof] + [Product/Service or Business]",
		use: "Uses genuine credibility to reinforce the decision.",
		rule: "Numerical claims must come from verified business information. Never invent ratings, reviews, testimonials, or results.",
		examples: [
			"See Our 300+ 5-Star Reviews",
			"Trusted by 500+ Local Homeowners",
			"Rated 4.9 Stars by Our Customers",
			"See Why Our Members Love Us",
			"Our Customers Say It Best",
			"See Our Latest Client Results"
		]
	},
	{
		id: "HL-07",
		name: "Location",
		structure: "[City/Area] + [Service/Offer]",
		use: "Makes an ad feel immediately relevant to someone in the service area.",
		rule: "Use the business's actual service area. Location-specific headlines should sound natural rather than like keyword-stuffed search ads.",
		examples: [
			"Irvine's Newest Fitness Studio",
			"Dental Implants in Orange County",
			"Austin Roof Inspections",
			"San Diego Mobile Car Detailing",
			"Your New Favorite Miami Brunch Spot",
			"Professional Cleaning in Dallas"
		]
	},
	{
		id: "HL-08",
		name: "Urgency",
		structure: "[Offer/Product] + [Real Deadline or Availability]",
		use: "Gives prospective customers a timely reason to act.",
		rule: "Urgency must be genuine. Never invent a deadline, claim limited availability without confirmation, or manufacture scarcity.",
		examples: [
			"Summer Special Ends Sunday",
			"Book Your Holiday Grooming Today",
			"New Collection Drops Friday",
			"Last Week of Our Spring Special",
			"New Appointments Available This Week",
			"Early Bird Pricing Ends Tomorrow"
		]
	},
	{
		id: "HL-09",
		name: "Convenience",
		structure: "[Product/Service] + [Convenience Benefit]",
		use: "Sells the ease of working with the business.",
		rule: "Highlight genuine conveniences, such as mobile service, flexible appointments, easy booking, or delivery.",
		examples: [
			"Car Detailing at Your Doorstep",
			"Book Your Facial Online",
			"Dinner Delivered to Your Door",
			"Get a Roof Quote Online",
			"Grooming Without Leaving Home",
			"Shop Online. Delivered to You."
		]
	},
	{
		id: "HL-10",
		name: "Showcase",
		structure: "Discover/Explore/Meet + [Product, Service or Collection]",
		use: "Works when the product or creative itself is the main selling point.",
		rule: "Highlight the most interesting or desirable aspect of the offering. Avoid generic headlines such as \"Discover Our Services\" when a more specific alternative exists.",
		examples: [
			"Meet Our Best-Selling Collection",
			"Explore Our Latest Listings",
			"Discover Our Signature Facial",
			"Take a Look Inside Our Studio",
			"Meet Your New Favorite Outfit",
			"Explore Our Detailing Packages"
		]
	},
	{
		id: "HL-11",
		name: "Benefit stack",
		structure: "[Benefit 1] + [Benefit 2] + [Benefit 3]",
		use: "Communicates multiple selling points in a compact, scannable format.",
		rule: "Use two or three complementary benefits. Prioritize clarity over cleverness.",
		examples: [
			"Clean Car. Zero Hassle.",
			"Fresh Pizza. Made Daily.",
			"Expert Care. Easy Booking.",
			"Local Team. Free Estimates.",
			"Great Fit. Everyday Comfort.",
			"Real Coaches. Great Community."
		]
	},
	{
		id: "HL-12",
		name: "Direct action",
		structure: "[Action Verb] + [Specific Next Step]",
		use: "A straightforward conversion-focused headline that tells the customer exactly what to do.",
		rule: "Align the action with the actual conversion destination. Don't instruct someone to book if the next step is only a consultation request or information form.",
		examples: [
			"Book Your First Class Today",
			"Schedule Your Roof Inspection",
			"Get Your Free Home Valuation",
			"Shop the New Collection",
			"Request Your Free Quote",
			"Reserve Your Table Today"
		]
	}
], to = {
	"ANG-01": [
		"HL-01",
		"HL-02",
		"HL-08"
	],
	"ANG-02": [
		"HL-03",
		"HL-06",
		"HL-10"
	],
	"ANG-03": ["HL-06", "HL-03"],
	"ANG-04": ["HL-04", "HL-05"],
	"ANG-05": [
		"HL-10",
		"HL-04",
		"HL-03"
	],
	"ANG-06": [
		"HL-06",
		"HL-07",
		"HL-11"
	],
	"ANG-07": [
		"HL-05",
		"HL-03",
		"HL-12"
	],
	"ANG-08": [
		"HL-08",
		"HL-01",
		"HL-12"
	],
	"ANG-09": [
		"HL-09",
		"HL-11",
		"HL-12"
	],
	"ANG-10": [
		"HL-10",
		"HL-03",
		"HL-01"
	]
}, no = {
	restaurant: [
		"2 Large Pizzas for $24.99",
		"Your New Favorite Brunch Spot",
		"Order Fresh Pizza Tonight"
	],
	real_estate: [
		"What's Your Home Worth?",
		"Explore Homes in [City]",
		"Get Your Free Home Valuation"
	],
	home_services: [
		"Get Your Free Estimate",
		"Transform Your Driveway",
		"Book Your $79 AC Tune-Up"
	],
	med_spa: [
		"Your First Facial for $49",
		"Discover Our HydraFacial",
		"Book Your First Appointment"
	],
	fitness: [
		"Your First Class Is Free",
		"Find Your Fitness Community",
		"Book Your Free Trial Class"
	],
	roofing: [
		"Get a Free Roof Inspection",
		"Is Your Roof Storm-Ready?",
		"Meet Your Local Roofing Team"
	],
	clothing: [
		"Get 20% Off Your First Order",
		"Meet Your New Favorite Outfit",
		"Shop Our Latest Collection"
	],
	dental: [
		"Explore Your Smile Options",
		"Book a Dental Consultation",
		"Meet Your New Dentist"
	],
	chiro: [
		"Book Your First Visit",
		"Meet Your Local Chiropractor",
		"Explore Our New Patient Offer"
	],
	auto_detailing: [
		"Bring Back That Showroom Shine",
		"Mobile Detailing at Your Door",
		"Book Your Complete Detail"
	],
	pest: [
		"Get Your Free Inspection",
		"Explore Our Prevention Plans",
		"Schedule a Pest Inspection"
	],
	pet: [
		"Book Your Pup's Next Groom",
		"Mobile Grooming at Your Door",
		"Fresh Cuts for Happy Pups"
	]
}, J = { type: "string" }, Y = {
	type: "array",
	items: J
}, X = (e) => ({
	type: "object",
	properties: e,
	required: Object.keys(e)
}), ro = (e) => ({
	type: "array",
	items: X(e)
}), io = X({ text: J }), ao = X({
	structure: J,
	text: J
}), oo = X({
	category: J,
	name: J,
	why: J,
	format: J,
	hooks: {
		type: "array",
		items: io
	},
	headlines: {
		type: "array",
		items: ao
	},
	bodies: {
		type: "array",
		items: io
	},
	trust_line: J,
	next_step: J,
	description: J,
	image: X({
		creative_type: J,
		visual: J,
		shots: Y,
		overlay: J,
		prompt: J
	}),
	video: X({
		title: J,
		script: J
	})
});
X({
	strategy: X({
		summary: J,
		advertising: J,
		audience: J,
		action: J,
		approach: J,
		why: J
	}),
	setup: X({
		objective_why: J,
		audience_detail: J,
		structure_why: J,
		formats: Y,
		destination_why: J
	}),
	research: X({
		reasons_to_buy: Y,
		objections: Y,
		moments: Y
	}),
	angles: {
		type: "array",
		items: oo
	},
	journey: X({
		steps: ro({
			label: J,
			text: J
		}),
		landing_headline: J,
		landing_subheadline: J,
		form_questions: Y,
		cta: J,
		thank_you: J,
		follow_up: Y,
		follow_up_texts: ro({
			when: J,
			text: J
		})
	}),
	launch: X({
		from_client: Y,
		before_publish: Y,
		monitor: Y,
		first_results: J
	}),
	assumptions: Y
});
var so = {};
so.knowledge = "STRATEGY KNOWLEDGE (use as guidance, not rigid rules)\n- Local businesses: broad targeting around the business, mention the city, lead with a specific offer. Leads usually go to a Meta Instant Form with 2 or 3 qualifying questions. Speed to lead matters: follow up within 5 minutes.\n- Med spas and aesthetics: offer-first creative, real provider photos, confident language. Lead forms preferred.\n- Dental: routine and cosmetic offers should be separate campaigns. Routine: team and family imagery. Cosmetic: aspirational imagery, consultation offer.\n- Weight loss and GLP-1: program-focused, warm and non-judgmental, no body or scale imagery, no drug names, no guarantees.\n- Online stores: send people straight to the exact product page. UGC style (real people, phone-shot) usually beats polished creative. Start with bestsellers.\n- Coaching and courses: pain-led, transformation-led and credibility-led angles are worth testing. Video helps for higher-priced offers.\n- Professional services and B2B: outcome-led, peer-to-peer tone.\n- Universal: don't spread a small budget across many ads. Match the ad to the page or form after the click.", so.honesty = "HONESTY RULES (these win over everything)\n- Never invent facts, offers, prices, discounts, reviews, ratings, review counts, results, credentials, years in business, customer counts, scarcity or deadlines. Use only what is in THE BUSINESS and THEIR WEBSITE above. If you suggest an offer, say it's a suggestion in assumptions.\n- When the strongest version of a line needs a fact you don't have, write a short blank in square brackets instead, like [price], [regular price], [Google rating], [number of reviews], [years in business], [provider name], [end date]. The freelancer fills these in with the client. Never put a made-up value in its place. Use at most 3 blanks per ad.\n- No guarantees. No numbers for expected leads, sales, cost per lead or return.\n- No em dashes or en dashes. No hashtags.\n- The strategy, setup, journey, launch and \"why\" fields are written to the freelancer (a beginner), in plain words. Explain any ad term in a few words the first time.", so.adCopyStyle = "HOW TO WRITE THE ADS (direct, local, specific)\nThese ads are written by the business to its customers. Write like the best-performing local business ads on Facebook and Instagram:\n- The first line does the most work. Lead with the offer, the result, or the most interesting specific thing, following the angle. A scroller should know what this is and why it's worth a look from line one.\n- Short lines. One idea per line. Line breaks between lines are good.\n- Be specific: the actual treatment, dish, service, price, time, place. Name the city or area when it helps.\n- Say what they get and why this business, in plain words.\n- One trust line using real facts (or a [blank] for the client to fill), like \"[Google rating] from [number of reviews] reviews\" or \"Licensed and insured\" only if provided.\n- End with one clear next step that matches the button.\n- 30 to 80 words of primary text in total.\n- Headlines: under 40 characters, specific and concrete, written in the headline structures given for each angle. Title Case like the examples.\n\nDon't:\n- Open with a vague or soft question (\"Not sure which facial to choose?\", \"Feeling overwhelmed?\").\n- Use filler or spa-brochure language (\"we take the time to\", \"on your journey\", \"elevate\", \"pamper yourself\", \"navigate the options\").\n- Describe feelings in general terms when you could name the actual thing.\n- Assume something about the reader's body, health, age or appearance (\"Struggling with acne?\").\n\nBad headline: \"Not sure which facial to choose\"\nGood headline: \"Your first HydraFacial, [price]\"\nBad first line: \"You are looking for a facial but feel overwhelmed by all the different options available.\"\nGood first line: \"Your first facial at [Business], [price] (usually [regular price]).\"", so.angleGuide = "EACH ANGLE BECOMES ONE FINISHED AD. Fill these parts:\n- category: the angle category id (like ANG-01).\n- name: the angle name.\n- why: one sentence to the freelancer on why this angle fits this business.\n- format: the best ad format for it (like \"Single image\", \"Before and after carousel\", \"Short vertical video (Reels)\", \"Talking-head video\"), based on the angle and the creative they have.\n- hooks: exactly 3 different first lines for the ad. Each a genuinely different way in: one leading with the offer or result, one leading with something specific or local, one leading with a question that names the actual thing. Under 20 words each.\n- headlines: exactly 6, two different headlines in each of the three headline structures listed for that angle, in that order. structure = the structure id (like HL-01), text = the headline, under 40 characters. If a structure needs a fact you don't have (a price, a rating, a real deadline), use a [blank]. If the offer isn't genuinely free, write the Freebie headline about the free first step only if one exists; otherwise use HL-12 Direct action instead and set structure to HL-12.\n- bodies: exactly 2 short middles (1 to 3 short lines, under 45 words) that follow the hook. The first focuses on what they get. The second focuses on why choose this business. Don't repeat the hook.\n- trust_line: one short line of proof from real facts, or with a [blank] (like \"[Google rating] stars from [number of reviews] local reviews\"). Empty string only if no kind of proof makes sense.\n- next_step: one short line telling them what to do, matching the button.\n- description: under 30 characters, shown under the headline.\n- image: the creative for this ad, following the CREATIVE DIRECTION and CREATIVE TYPES.\n  creative_type: the creative type id (like CR-03).\n  visual: one or two sentences describing the finished creative, like the niche example (what it opens on, what it shows, what it ends on).\n  shots: 3 to 5 specific things the business should film or photograph for it, using their real business, team and work (like \"Close-up of the facial being applied, 5 seconds\"). Never stock.\n  overlay: text on the image or final frame, under 8 words, may include a [blank].\n  prompt: a detailed prompt for ChatGPT to make a stand-in image only if they have no real photo. No text in the image, no before and after, no real people's faces implied as customers, square 1:1.\n- video: a short Reels idea the business can film on a phone: title, and a script under 60 words with what to show and say. Especially for process, demonstration and talking-head angles.";
var co = "https://raw.githubusercontent.com/suzy-crawford/freelance-hq-template/main/content.json", lo = "sf-live-content";
function uo(e) {
	return {
		...e,
		match: e.match ? e.match.source : ""
	};
}
function fo(e) {
	return {
		...e,
		match: new RegExp(e.match || "^$", "i")
	};
}
var Z = (e) => Array.isArray(e) && e.length > 0, Q = (e) => e && typeof e == "object" && !Array.isArray(e) && Object.keys(e).length > 0, po = (e) => typeof e == "string" && e.length > 20;
function $(e, t) {
	e.splice(0, e.length, ...t);
}
function mo(e, t) {
	Object.keys(e).forEach((t) => delete e[t]), Object.assign(e, t);
}
var ho = {
	angleCategories: {
		get: () => qr,
		ok: Z,
		set: (e) => $(qr, e)
	},
	niches: {
		get: () => pn.map(uo),
		ok: Z,
		set: (e) => $(pn, e.map(fo))
	},
	generalNiche: {
		get: () => mn,
		ok: Q,
		set: (e) => mo(mn, e)
	},
	headlineStructures: {
		get: () => eo,
		ok: Z,
		set: (e) => $(eo, e)
	},
	headlinesForCategory: {
		get: () => to,
		ok: Q,
		set: (e) => mo(to, e)
	},
	headlineBank: {
		get: () => no,
		ok: Q,
		set: (e) => mo(no, e)
	},
	creativeTypes: {
		get: () => vi,
		ok: Z,
		set: (e) => $(vi, e)
	},
	creativeForCategory: {
		get: () => yi,
		ok: Q,
		set: (e) => mo(yi, e)
	},
	nicheCreative: {
		get: () => bi,
		ok: Q,
		set: (e) => mo(bi, e)
	},
	rulebook: {
		get: () => Pr,
		ok: Z,
		set: (e) => $(Pr, e)
	},
	diagnosis: {
		get: () => Fr,
		ok: Z,
		set: (e) => $(Fr, e)
	},
	generalAdRules: {
		get: () => jr,
		ok: Z,
		set: (e) => $(jr, e)
	},
	healthAdRules: {
		get: () => Mr,
		ok: Z,
		set: (e) => $(Mr, e)
	},
	promptText: {
		get: () => so,
		ok: (e) => Q(e) && Object.values(e).every(po),
		set: (e) => Object.assign(so, e)
	},
	copyVoice: {
		get: () => we.text,
		ok: po,
		set: (e) => we.text = e
	},
	adsMasterPrompts: {
		get: () => L,
		ok: (e) => Q(e) && Object.values(e).every(po),
		set: (e) => Object.assign(L, e)
	},
	sampleOffers: {
		get: () => $e,
		ok: Z,
		set: (e) => $($e, e)
	},
	claudePrompts: {
		get: () => Bt,
		ok: (e) => Q(e) && Object.values(e).every(po),
		set: (e) => Object.assign(Bt, e)
	},
	speakers: {
		get: () => Te,
		ok: (e) => Q(e) && Object.values(e).every(po),
		set: (e) => Object.assign(Te, e)
	}
};
function go(e) {
	if (!e || e.schema !== 1 || !(Number(e.rev) > 28)) return !1;
	let t = 0;
	for (let [n, r] of Object.entries(ho)) {
		let i = e[n];
		if (!(i === void 0 || !r.ok(i))) try {
			r.set(i), t++;
		} catch (e) {
			console.warn("[liveContent] skipped", n, e);
		}
	}
	return t && e.version, t > 0;
}
function _o() {
	try {
		let e = JSON.parse(localStorage.getItem(lo) || "null");
		e && go(e);
	} catch {}
	let e = new AbortController(), t = setTimeout(() => e.abort(), 8e3);
	fetch(`${co}?t=${Date.now()}`, {
		cache: "no-store",
		signal: e.signal
	}).then((e) => e.ok ? e.json() : null).then((e) => {
		if (e && go(e)) try {
			localStorage.setItem(lo, JSON.stringify(e));
		} catch {}
	}).catch(() => {}).finally(() => clearTimeout(t));
}
//#endregion
export { Kr as adsAngleLibrary, Xr as adsBuilder, Ir as adsCards, _i as adsCreative, gr as adsData, wi as adsEngine, gi as adsMasterPrompts, dn as adsNiches, de as buildsExtras, wt as clientsAnalysis, bn as clientsBuilds, zt as clientsClaudePrompt, ut as clientsLogic, or as clientsOutreach, sn as clientsPreviewSite, da as contentEngine, Ce as copyVoice, n as offerData, We as offerLogic, De as offerPrompts, Qe as sampleOffers, _o as startLiveContent };
