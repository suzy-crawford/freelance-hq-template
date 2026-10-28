// SheFreelances OS - the AI tools (tools.js)
// The HQ shell installs first; each tool is built into the member's app the first time they open it.
// A tool counts as built once its build's last file, src/tools/<id>.ready.js, is in the app. tools/build-manifest.mjs reads this
// list to write each tool's build file (builds/<id>.md), so keep it free of imports.

export const TOOLS = [
  {
    id: "offer",
    name: "AI Offer Builder",
    route: "/offer-builder",
    pages: ["OfferBuilder", "OfferWizard", "OfferResult"],
    functions: ["generateWithAI"],
    minutes: "4 to 6",
    gets: ["Answer three questions about you", "Get your offer, your price and what's included", "A one-page offer doc you can share"],
    check: "the Offer Builder page (with no offers yet, it shows a Build your first offer button)",
  },
  {
    id: "clients",
    name: "AI Client Finder",
    route: "/clients",
    pages: ["GetClients", "ProspectDetail"],
    functions: ["findBusinesses", "findEmail", "generateWithAI"],
    minutes: "6 to 10",
    gets: ["Find real local businesses by type and city", "Save them to your lead list with their contact details", "A first message written for each one"],
    check: "the Client Finder page with a Find businesses button",
  },
  {
    id: "ads",
    name: "Meta Ads Builder",
    route: "/ads",
    pages: ["AdsHome", "AdCampaign"],
    functions: ["generateWithAI", "readWebsite"],
    minutes: "6 to 10",
    gets: ["A campaign plan for any business", "Ads written and previewed like they'll look on Meta", "The landing page and launch steps"],
    check: "the Meta Ads Builder page",
  },
  {
    id: "content",
    name: "AI Content Creator",
    route: "/content",
    pages: ["ContentHome", "ContentPlan"],
    functions: ["generateWithAI", "readWebsite"],
    minutes: "8 to 12",
    gets: ["A content strategy for a client", "Posts written for one or two weeks", "Client-ready strategy and content docs"],
    check: "the Content Creator page",
  },
  {
    id: "buildlab",
    name: "AI Build Lab",
    route: "/build-lab",
    pages: ["BuildLab"],
    functions: [],
    minutes: "3 to 5",
    gets: ["Websites, lead magnets and tools you can build for clients", "Each one with a ready-to-paste Base44 prompt", "Filled in with the business you pick"],
    check: "the AI Build Lab page",
  },
];

export const toolForPage = (page) => TOOLS.find((t) => t.pages.includes(page)) || null;
