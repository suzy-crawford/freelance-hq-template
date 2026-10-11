import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/shared/CopyButton";
import { SkeletonLine } from "@/components/shared/Skeleton";
import { ArrowUp, Copy, Check } from "@/components/brand/icons";
import { getNiche, radiusText } from "@/lib/adsNiches";
import { formatMoney, BUSINESS_TYPES } from "@/lib/adsData";
import { getAds, adToText } from "@/lib/adsCards";
import AdCards from "./AdCards";
import ImagesTab from "./ImagesTab";
import LaunchTab from "./LaunchTab";
import { getLaunchDays } from "@/lib/adsLaunch";

const TABS = [
  { id: "strategy", label: "Strategy" },
  { id: "setup", label: "Campaign setup" },
  { id: "ads", label: "Ad copy" },
  { id: "creative", label: "Ad creative" },
  { id: "launch", label: "Launch plan" },
];

const REFINE_CHIPS = [
  "Make the ads shorter",
  "Use their own words more",
  "Simplify the campaign",
  "Change the budget to $1,500",
  "Focus on appointment bookings instead",
];

function CopyAll({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-quiet"
      style={{ height: 34, fontSize: 13 }}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* clipboard unavailable */
        }
      }}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copied" : "Copy all"}
    </button>
  );
}

function Block({ title, intro, children }) {
  return (
    <section className="doc-section">
      <h3>{title}</h3>
      {intro && <p className="intro">{intro}</p>}
      {children}
    </section>
  );
}

function Row({ label, children }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

// The four key decisions, so a beginner gets the plan in seconds.
function Summary({ campaign }) {
  const s = campaign.setup;
  const niche = getNiche(campaign);
  const area = niche.radius ? `${radiusText(niche).replace(" mi", " miles")} around ${(campaign.location || "the business").split(",")[0]}` : "The whole country";
  const objective = s.destination === "instant_form" ? `${s.objective}, with an instant form` : `${s.objective}, on their website`;
  const items = [
    ["Offer", campaign.offer_text || (campaign.offer_help ? "Suggested in the plan" : campaign.product)],
    ["Objective", objective],
    ["Budget", `${formatMoney(s.budget.daily)} a day`],
    ["Area", area],
  ];
  return (
    <div className="summary" aria-label="Plan at a glance">
      {items.map(([k, v]) => (
        <div key={k}>
          <div className="k">{k}</div>
          <div className="v">{v}</div>
        </div>
      ))}
    </div>
  );
}

function StrategyTab({ campaign }) {
  const r = campaign.record;
  return (
    <>
      <Summary campaign={campaign} />
      <Block title="Your recommended strategy" intro={r.strategy.summary}>
        <dl className="defs">
          <Row label="What we're advertising">{r.strategy.advertising}</Row>
          <Row label="Who we're reaching">{r.strategy.audience}</Row>
          <Row label="What we want them to do">{r.strategy.action}</Row>
          <Row label="The approach">{r.strategy.approach}</Row>
          <Row label="Why it fits">{r.strategy.why}</Row>
        </dl>
      </Block>
      {r.research && (
        <Block title="What their customers care about" intro="Every ad angle starts from one of these.">

          <dl className="defs">
            <Row label="Reasons to buy">
              <ul className="list-disc pl-5 space-y-1">
                {r.research.reasons_to_buy.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </Row>
            <Row label="What holds them back">
              <ul className="list-disc pl-5 space-y-1">
                {r.research.objections.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </Row>
            <Row label="When they start looking">
              <ul className="list-disc pl-5 space-y-1">
                {r.research.moments.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </Row>
          </dl>
        </Block>
      )}
      <Block title="Your customer journey">
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {r.journey.steps.map((st, i) => (
            <li key={i} className="rounded-md border border-app-border bg-app-bg p-3">
              <div className="hint">Step {i + 1}</div>
              <div className="font-semibold text-app-text">{st.label}</div>
              <p className="text-sm text-app-muted mt-1">{st.text}</p>
            </li>
          ))}
        </ol>
        <dl className="mt-4">
          <Row label="Headline">{r.journey.landing_headline}</Row>
          <Row label="Subheadline">{r.journey.landing_subheadline}</Row>
          {r.journey.form_questions.length > 0 && (
            <Row label="Form questions">
              <ol className="list-decimal pl-5 space-y-1">
                {r.journey.form_questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ol>
            </Row>
          )}
          <Row label="Button">{r.journey.cta}</Row>
          <Row label="After they submit">{r.journey.thank_you}</Row>
          <Row label="Follow-up">
            <ul className="list-disc pl-5 space-y-1">
              {r.journey.follow_up.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </Row>
        </dl>
      </Block>
      {r.assumptions.length > 0 && (
        <Block title="What we assumed">
          <ul className="list-disc pl-5 space-y-1 text-app-text">
            {r.assumptions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </Block>
      )}
    </>
  );
}

function SetupTab({ campaign }) {
  const r = campaign.record;
  const s = campaign.setup;
  const b = s.budget;
  return (
    <>
      <Block title="Your campaign setup" intro="Use these settings when you build the campaign in Meta Ads Manager.">
        <dl className="defs">
          <Row label="Objective">
            <strong>{s.objective}</strong>
            <span className="why">{r.setup.objective_why}</span>
          </Row>
          <Row label="Conversion location">{s.conversion_location}</Row>
          <Row label="Performance goal">{s.performance_goal}</Row>
          <Row label="Budget">
            <strong>
              {formatMoney(b.daily)} a day
            </strong>{" "}
            (about {formatMoney(b.monthly)} a month, paid by the business to Meta)
            {b.assumed_note && <span className="why">{b.assumed_note}</span>}
            {b.small_warning && <span className="why">{b.small_warning}</span>}
          </Row>
          <Row label="Structure">
            {b.campaigns} campaign{b.campaigns > 1 ? "s" : ""}, {b.ad_sets} ad set{b.ad_sets > 1 ? "s" : ""}, up to {b.ads_per_ad_set} ads each
            <span className="why">{b.note}</span>
            <span className="why">{r.setup.structure_why}</span>
          </Row>
          <Row label="Location">{s.location_radius}</Row>
          <Row label="Audience">
            {s.audience_approach}
            <span className="why">{r.setup.audience_detail}</span>
          </Row>
          <Row label="Ad formats">{(r.setup.formats || []).join(" · ")}</Row>
          <Row label="After the click">
            {s.destination_label}
            <span className="why">{r.setup.destination_why}</span>
          </Row>
          <Row label="Button on the ad">{r.cta || r.ads?.cta}</Row>
        </dl>
        {s.notes.length > 0 && (
          <div className="mt-4 rounded-md bg-app-lavender-soft p-4 space-y-2">
            {s.notes.map((n, i) => (
              <p key={i} className="text-sm text-app-text">
                {n}
              </p>
            ))}
          </div>
        )}
      </Block>
    </>
  );
}

function LaunchPlan({ campaign, onToggleCheck, onChange, onGoTab }) {
  return (
    <>
      <LaunchTab campaign={campaign} onToggleCheck={onToggleCheck} onChange={onChange} onGoTab={onGoTab} />
      <Block title="Your campaign plan" intro="A printable one-page plan to share with your client.">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => window.print()}>Save as PDF</Button>
          <CopyButton text={campaignToText(campaign)} label="Copy text" />
          <span className="hint">Choose "Save as PDF" as the printer.</span>
        </div>
      </Block>
      <div className="print-only" aria-hidden="true">
        <PaperTab campaign={campaign} />
      </div>
    </>
  );
}

export function campaignToText(campaign) {
  const r = campaign.record;
  const s = campaign.setup;
  const type = BUSINESS_TYPES.find((t) => t.id === campaign.business_type)?.label || "";
  return [
    `CAMPAIGN PLAN: ${campaign.business_name}`,
    `${type}${campaign.location ? `, ${campaign.location}` : ""}`,
    "",
    `Promoting: ${campaign.product}`,
    `Offer: ${campaign.offer_text || "See assumptions"}`,
    `Goal: ${s.goal_label}`,
    "",
    "SETUP",
    `Objective: ${s.objective}`,
    `Conversion location: ${s.conversion_location}`,
    `Performance goal: ${s.performance_goal}`,
    `Budget: ${formatMoney(s.budget.daily)} a day (about ${formatMoney(s.budget.monthly)} a month)`,
    `Structure: ${s.budget.campaigns} campaign, ${s.budget.ad_sets} ad set(s), up to ${s.budget.ads_per_ad_set} ads each`,
    `Location: ${s.location_radius}`,
    `Audience: ${s.audience_approach}`,
    `After the click: ${s.destination_label}`,
    "",
    "STRATEGY",
    r.strategy.summary,
    r.strategy.approach,
    "",
    "ANGLES",
    ...r.angles.map((a) => `- ${a.name}: ${a.why || a.message}`),
    "",
    "ADS",
    ...getAds(campaign).map((ad) => `${adToText(ad)}\n`),
    "CUSTOMER JOURNEY",
    ...r.journey.steps.map((st, i) => `${i + 1}. ${st.label}: ${st.text}`),
    ...(r.journey.form_questions.length ? ["Form questions:", ...r.journey.form_questions.map((q) => `- ${q}`)] : []),
  ].join("\n");
}

function PaperTab({ campaign }) {
  const r = campaign.record;
  const s = campaign.setup;
  const type = BUSINESS_TYPES.find((t) => t.id === campaign.business_type)?.label || "";
  const H = ({ children }) => <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#5d6475] mb-2">{children}</div>;
  return (
    <div className="py-6">
      <div className="overflow-x-auto">
        <article
          className="print-area mx-auto w-full max-w-[720px] bg-[#fdfbf8] text-[#1a2236] border border-app-border rounded-md p-8 md:p-10"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }}
        >
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#5d6475]">Meta ad campaign plan</div>
          <h2 style={{ fontFamily: '"Gloock", Georgia, serif' }} className="text-[2rem] leading-tight mt-2">
            {campaign.business_name}
          </h2>
          <p className="text-[#5d6475] mt-1">
            {type}
            {campaign.location ? ` · ${campaign.location}` : ""}
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8 text-sm">
            <div>
              <H>Promoting</H>
              <p>{campaign.product}</p>
              {campaign.offer_text && <p className="mt-1 text-[#5d6475]">Offer: {campaign.offer_text}</p>}
            </div>
            <div>
              <H>Goal</H>
              <p>{s.goal_label}</p>
            </div>
          </div>

          <div className="mt-8 text-sm">
            <H>Campaign setup</H>
            <table className="w-full border-collapse">
              <tbody>
                {[
                  ["Objective", s.objective],
                  ["Conversion location", s.conversion_location],
                  ["Performance goal", s.performance_goal],
                  ["Budget", `${formatMoney(s.budget.daily)} a day (about ${formatMoney(s.budget.monthly)} a month)`],
                  ["Structure", `${s.budget.campaigns} campaign, ${s.budget.ad_sets} ad set(s), up to ${s.budget.ads_per_ad_set} ads each`],
                  ["Location", s.location_radius],
                  ["After the click", s.destination_label],
                  ["Button", r.cta || r.ads?.cta],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-[#ebe6de]">
                    <td className="py-2 pr-4 font-semibold align-top w-[160px]">{k}</td>
                    <td className="py-2 align-top">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-sm">
            <H>Strategy</H>
            <p>{r.strategy.summary}</p>
            <p className="mt-2">{r.strategy.approach}</p>
          </div>

          <div className="mt-8 text-sm">
            <H>Angles</H>
            <ol className="list-decimal pl-5 space-y-2">
              {r.angles.map((a, i) => (
                <li key={i}>
                  <strong>{a.name}.</strong> {a.why || a.message}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 text-sm">
            <H>The ads</H>
            {getAds(campaign).map((ad) => (
              <div key={ad.index} className="mb-5">
                <div className="font-semibold">
                  Ad {ad.index + 1}: {ad.name}
                </div>
                <p className="whitespace-pre-line">{ad.primary}</p>
                <p className="mt-1">
                  <strong>Headline:</strong> {ad.headline} · <strong>Button:</strong> {ad.cta}
                </p>
                {ad.image?.visual && <p className="text-[#5d6475]">Image: {ad.image.visual}</p>}
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm">
            <H>Customer journey</H>
            <ol className="list-decimal pl-5 space-y-1">
              {r.journey.steps.map((st, i) => (
                <li key={i}>
                  <strong>{st.label}:</strong> {st.text}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 text-sm">
            <H>Launch checklist</H>
            <ul className="space-y-1">
              {getLaunchDays(campaign).map((d) => (
                <li key={d.day} className="mb-2">
                  <strong>{d.span || `Day ${d.day}`}: {d.title}</strong>
                  {d.tasks.map((t) => (
                    <div key={t.id}>[ ] {t.task}</div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

export default function OutputPanel({ campaign, building, error, onToggleCheck, onRefine, refining, refineMessage, busyIndex, onChoice, onRewrite, onSwap, onBlanks, onChange }) {
  const [tab, setTab] = useState("strategy");
  const [request, setRequest] = useState("");
  const hasPlan = !!campaign.record;

  const submit = () => {
    if (!request.trim()) return;
    onRefine(request.trim()).then((ok) => ok && setRequest(""));
  };

  return (
    <section className="doc">
      <div className="doc-bar flex-wrap">
        <nav className="tabs-inline" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              className="tab bg-transparent cursor-pointer"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              disabled={!hasPlan}
            >
              {t.label}
            </button>
          ))}
        </nav>
        {(building || refining) && (
          <span className="writing">
            <i />
            Writing
          </span>
        )}
        {hasPlan && !building && (
          <span className="tools-right">
            <CopyAll text={campaignToText(campaign)} />
          </span>
        )}
      </div>

      <div className={hasPlan && !building && !error ? "doc-wide" : "px-6 md:px-10"}>
        {building ? (
          <div className="py-8 space-y-3" aria-busy="true">
            <p className="text-app-text font-semibold">Building your ad strategy. This usually takes 30 to 60 seconds.</p>
            <SkeletonLine className="h-5 w-1/2" />
            <SkeletonLine className="w-full" />
            <SkeletonLine className="w-11/12" />
            <SkeletonLine className="w-4/5" />
            <SkeletonLine className="h-5 w-1/3 mt-6" />
            <SkeletonLine className="w-full" />
            <SkeletonLine className="w-3/4" />
          </div>
        ) : error ? (
          <div className="py-8">
            <p className="text-app-text">That didn't work. Your answers are saved. Try again.</p>
            <p className="hint mt-2">Details: {error}</p>
          </div>
        ) : !hasPlan ? (
          <div className="empty">
            <div className="empty-title">Your ad strategy will appear here</div>
            <p className="empty-text">
              Fill in the three short steps on the left and click Build my ad strategy. You'll get the strategy, the Meta
              settings to use, finished ads you can see and edit, image prompts, step-by-step prompts for Claude to build it
              in Meta, a launch checklist and a printable campaign plan.
            </p>
          </div>
        ) : tab === "strategy" ? (
          <StrategyTab campaign={campaign} />
        ) : tab === "setup" ? (
          <SetupTab campaign={campaign} />
        ) : tab === "ads" ? (
          <AdCards campaign={campaign} busyIndex={busyIndex} onChoice={onChoice} onRewrite={onRewrite} onSwap={onSwap} onBlanks={onBlanks} />
        ) : tab === "creative" ? (
          <ImagesTab campaign={campaign} />
        ) : (
          <LaunchPlan campaign={campaign} onToggleCheck={onToggleCheck} onChange={onChange} onGoTab={setTab} />
        )}
      </div>

      {hasPlan && !building && (
        <div className="doc-foot">
          {refineMessage && <p className="text-sm text-app-success">{refineMessage}</p>}
          <div className="quick">
            {REFINE_CHIPS.map((c) => (
              <button key={c} type="button" className="chip" onClick={() => setRequest(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="ask">
            <input
              className="input"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder='Ask for a change, like "make the hooks shorter"'
              aria-label="Ask for a change"
              disabled={refining}
            />
            <button type="button" className="btn btn-primary" onClick={submit} disabled={refining || !request.trim()} aria-label="Send change">
              <ArrowUp />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
