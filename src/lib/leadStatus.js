// Shared by the home screen and the Client Finder. Where a lead is: Saved > Analyzed > Message ready > Contacted (Brand 2.0 stage, shown as text, never a pill).
export function leadStage(p) {
  if (p?.contacted_at) return "Contacted";
  if (p?.outreach) return "Message ready";
  if (p?.analysis) return "Analyzed";
  return "Saved";
}

// Fit in words ("Strong fit"), or "" before analysis. Older analyses used high/medium/low.
export function leadFit(p) {
  const a = p?.analysis;
  if (!a) return "";
  if (a.fit) return `${a.fit} fit`;
  const legacy = { high: "Strong fit", medium: "Good fit", low: "Weak fit" }[a.opportunity_level];
  return legacy || "";
}
