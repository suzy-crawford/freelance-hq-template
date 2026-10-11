// SheFreelances OS - Offer Builder: documents and text built in code (offerLogic.js)
// Everything here reads the one shared Offer record, so price, package, and scope always match.

import {
  CLIENT_RESPONSIBILITIES,
  getServiceName,
  getFreelancerName,
  nicheInSentence,
  formatMoney,
  priceLine,
  includesAds,
} from "./offerData";

function listToSentence(items) {
  const list = items.map((i) => i.charAt(0).toLowerCase() + i.slice(1));
  if (list.length <= 1) return list.join("");
  return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
}

// Section 4: "How to explain the package and price" (code, so the price is always exact)
export function buildPriceExplanation(offer) {
  const pkg = offer.package || {};
  const highlights = (pkg.categories || []).map((c) => c.items[0]).filter(Boolean);
  let text = `My ${String(pkg.package_name || "monthly package").toLowerCase()} is ${priceLine(offer.price)}. It includes ${listToSentence(highlights)}.`;
  if (includesAds(offer.primary_service))
    text += " Your ad budget is separate. You pay Meta directly for the ads, so you always control how much you spend.";
  return text;
}

// The one-page document. overrides = the member's edits on the document itself.
export function getPaperData(offer, profile, overrides = {}) {
  const paper = offer.record?.paper || {};
  const base = {
    offer_name: offer.selected_name || "",
    tagline: paper.tagline || "",
    who_its_for: paper.who_its_for || "",
    description: paper.description || "",
    next_step: paper.next_step || "",
    freelancer_name: getFreelancerName(profile),
    contact: "",
  };
  const data = { ...base, ...Object.fromEntries(Object.entries(overrides || {}).filter(([, v]) => v !== undefined && v !== null)) };
  // Package and price always come from the offer record, never from overrides.
  data.categories = offer.package?.categories || [];
  data.price = priceLine(offer.price);
  data.price_note = includesAds(offer.primary_service) ? "Ad spend is paid separately, directly to Meta." : "";
  return data;
}

// Scope of Work
export function buildScopeOfWork(offer, profile) {
  const pkg = offer.package || { categories: [], not_included: [] };
  const responsibilities = CLIENT_RESPONSIBILITIES[offer.primary_service] || CLIENT_RESPONSIBILITIES.other;
  return {
    title: `Scope of Work: ${offer.selected_name || pkg.package_name}`,
    prepared_line: `Prepared by ${getFreelancerName(profile)} for [Client Business Name]`,
    sections: [
      { title: "Service", items: [`${getServiceName(offer)} for ${nicheInSentence(offer)}.`] },
      ...pkg.categories.map((c) => ({ title: `Included: ${c.name}`, items: c.items })),
      { title: "Not included", items: [...(pkg.not_included || []), "Anything not listed here is quoted separately before work starts."] },
      { title: "Client responsibilities", items: responsibilities },
      { title: "Revisions", items: ["1 round of revisions per deliverable."] },
      { title: "Communication", items: ["Replies within 1 business day, Monday to Friday."] },
      {
        title: "Investment",
        items: [
          priceLine(offer.price) + (includesAds(offer.primary_service) ? " (management fee). Ad spend is paid separately, directly to Meta." : "."),
          "Payment terms: [e.g., billed monthly in advance]",
          "Start date: [Start date]",
          "Cancellation: [e.g., 30 days written notice]",
        ],
      },
    ],
    footer:
      "This is a plain-language scope of work so everyone knows what's included. It is not a legal contract. Use a proper contract for payment and legal terms.",
  };
}

// ---------------------------------------------------------------------------
// Copyable text versions
// ---------------------------------------------------------------------------

export function offerToText(offer) {
  const r = offer.record || {};
  const lines = [];
  lines.push("YOUR POSITIONING", r.positioning?.summary, `"${r.positioning?.client_thinking}"`, "What they don't want:");
  (r.positioning?.they_dont_want || []).forEach((t) => lines.push(`- ${t}`));
  lines.push(`What they need: ${r.positioning?.they_need}`, r.positioning?.your_fit, "");
  lines.push("WHAT YOU'RE SELLING", r.selling?.plain_explanation);
  (r.selling?.layers || []).forEach((l) => lines.push(`${l.name}: ${l.text}`));
  (r.selling?.i_help || []).forEach((t) => lines.push(`- ${t}`));
  lines.push("", "YOUR OFFER", offer.selected_name, r.offer?.statement, "What's included:");
  (offer.package?.categories || []).forEach((c) => {
    lines.push(c.name);
    c.items.forEach((i) => lines.push(`- ${i}`));
  });
  lines.push(`How it works: ${r.offer?.method?.name}`);
  (r.offer?.method?.steps || []).forEach((s, i) => lines.push(`${i + 1}. ${s.name}: ${s.text}`));
  lines.push(`Price: ${priceLine(offer.price)}`, "");
  lines.push("HOW TO TALK ABOUT IT", `Bio: ${r.talk?.bio_line}`, `One sentence: ${r.talk?.one_sentence}`, `30 seconds: ${r.talk?.spoken_30s}`, `Price: ${buildPriceExplanation(offer)}`);
  return lines.filter((l) => l !== undefined && l !== null).join("\n");
}

export function paperToText(data) {
  const lines = [data.offer_name, data.tagline, "", data.who_its_for, data.description, "", "What's included"];
  data.categories.forEach((c) => {
    lines.push(c.name);
    c.items.forEach((i) => lines.push(`- ${i}`));
  });
  lines.push("", `Investment: ${data.price}`);
  if (data.price_note) lines.push(data.price_note);
  lines.push("", data.next_step, `${data.freelancer_name}${data.contact ? ` | ${data.contact}` : ""}`);
  return lines.join("\n");
}

export function scopeOfWorkToText(sow) {
  const lines = [sow.title, sow.prepared_line, ""];
  sow.sections.forEach((s) => {
    lines.push(s.title.toUpperCase());
    s.items.forEach((i) => lines.push(`- ${i}`));
    lines.push("");
  });
  lines.push(sow.footer);
  return lines.join("\n");
}

export { formatMoney };
