// SheFreelances OS - Offer Builder self-check (offerChecks.js)
// Runs known test cases through the library files. Every check should pass.
// If any fail, a library file was not pasted exactly.

import { LIBRARY_VERSION, NICHES, NICHE_GROUPS, STANDARD_PACKAGES, scoreServiceQuiz, getPriceRecommendation, getOfferService } from "./offerData";
import { buildPriceExplanation, buildScopeOfWork, getPaperData } from "./offerLogic";
import { cleanText, buildOfferPrompt, finalizeRefineResult } from "./offerPrompts";

function check(name, expected, actualValue) {
  return { name, expected: String(expected), actual: String(actualValue), pass: String(expected) === String(actualValue) };
}

function priceCheck(label, service, experience, low, high, recommended) {
  const rec = getPriceRecommendation(service, experience, "Med spas", false);
  return check(`Price: ${label}`, `$${low} to $${high}, recommended $${recommended}`, `$${rec.low} to $${rec.high}, recommended $${rec.recommended}`);
}

export function runLibraryChecks() {
  const results = [];
  try {
    results.push(check("Library version", "2.4.0", LIBRARY_VERSION));
    results.push(check("Number of niches", 12, NICHES.length));
    results.push(check("Ads package categories", 4, STANDARD_PACKAGES.meta_ads.categories.length));
    results.push(check("Social package categories", 4, STANDARD_PACKAGES.organic_social.categories.length));

    results.push(priceCheck("Social, brand new, med spas", "organic_social", "brand_new", 550, 900, 650));
    results.push(priceCheck("Ads, brand new, med spas", "meta_ads", "brand_new", 850, 1200, 950));
    results.push(priceCheck("Ads, no clients, med spas", "meta_ads", "no_clients", 1100, 1500, 1250));
    results.push(priceCheck("Ads, has clients, med spas", "meta_ads", "has_clients", 1650, 3500, 2600));
    results.push(priceCheck("Social, has clients, med spas", "organic_social", "has_clients", 1300, 2500, 1900));

    results.push(priceCheck("Ads + Social, brand new, med spas", "combined", "brand_new", 1750, 2200, 1900));
    results.push(check("Ads + Social picked = combined offer", "combined", getOfferService(["organic_social", "meta_ads"])));
    results.push(check("Quiz recommends Paid Ads", "meta_ads", scoreServiceQuiz({ q1: 0, q2: 0, q3: 2, q4: 0 }).recommendation));
    results.push(check("Number of broad groups", 7, NICHE_GROUPS.length));
    results.push(check("Broad group price: Small businesses, ads, brand new", 900, getPriceRecommendation("meta_ads", "brand_new", "Small businesses", false).recommended));

    const offer = {
      primary_service: "meta_ads",
      interested_services: ["meta_ads"],
      niche: "Med spas",
      niche_is_custom: false,
      experience_level: "brand_new",
      price: 950,
      selected_name: "Booked Out Ads",
      package: JSON.parse(JSON.stringify(STANDARD_PACKAGES.meta_ads)),
      record: { paper: { tagline: "t", who_its_for: "w", description: "d", next_step: "n" } },
    };
    const profile = { first_name: "Test" };
    results.push(check("Price explanation states the price", true, buildPriceExplanation(offer).includes("$950 per month")));
    results.push(check("Price explanation keeps ad spend separate", true, buildPriceExplanation(offer).includes("Your ad budget is separate")));
    results.push(check("Paper price comes from the offer", "$950 per month", getPaperData(offer, profile, { price: "$1" }).price));
    results.push(check("Scope of Work sections", 10, buildScopeOfWork(offer, profile).sections.length));
    results.push(check("Em dashes removed", "a, b", cleanText("a \u2014 b")));
    results.push(check("Banned words replaced", "Grow your brand and get results", cleanText("Elevate your brand and unlock results")));
    results.push(check("Build prompt includes the package", true, buildOfferPrompt(offer, profile).prompt.includes("Campaign setup in Meta Ads Manager")));
    results.push(check("Refine keeps price unless asked", 950, finalizeRefineResult({ price: 3000, package: offer.package }, offer, "make it sound more premium").price));
    results.push(check("Refine changes price when asked", 1200, finalizeRefineResult({ price: 1200, package: offer.package }, offer, "I want to charge $1,200 instead").price));
  } catch (error) {
    results.push({ name: "Library loaded without errors", expected: "no error", actual: String(error && error.message), pass: false });
  }
  return { passed: results.filter((r) => r.pass).length, total: results.length, results };
}
