import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft } from "@/components/brand/icons";
import { useNavigate, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { callAI, invokeFunction } from "@/lib/ai";
import { Link } from "react-router-dom";
import { PageSkeleton, withLibs } from "@/components/shared/ToolKit";
import { StageTrack, CampaignStrip, PlanStep, AdsStep, FunnelStep, LaunchStep } from "@/components/ads/MetaAdsBuilder";
import { buildAdsCall, finalizeConcepts, buildFunnelCall, finalizeFunnel, guessBusinessType, getCampaignSetup, BUSINESS_TYPES, getNiche, displayName } from "@/lib/libs";

const INPUT_FIELDS = [
  "step",
  "business_source",
  "prospect_id",
  "business_name",
  "business_type",
  "website",
  "business_description",
  "location",
  "product",
  "offer_text",
  "offer_help",
  "goal",
  "monthly_budget",
  "budget_unsure",
  "assets",
  "notes",
  "target_cpl",
  "voice_samples",
  "no_emojis",
  "daily_budget",
  "radius_miles",
  "target_customer",
  "services",
  "brand_colors",
  "brand_style",
  "proof_text",
  "credentials_text",
  "differentiators",
  "assets_text",
  "logo_available",
];

// "Med spas and beauty · Austin, TX · Meta Ads Builder"
function headerLine(c) {
  const niche = getNiche(c);
  const type = niche && niche.id !== "general" ? niche.label : BUSINESS_TYPES.find((t) => t.id === c.business_type)?.label;
  return [type, c.location, "Meta Ads Builder", c.business_source === "practice" ? "Practice business" : ""].filter(Boolean).join(" · ");
}

function normalizeUrl(url) {
  const u = String(url || "").trim();
  if (!u) return "";
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

function AdCampaign() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [building, setBuilding] = useState(false);
  const [error, setError] = useState(null);
  const saveTimer = useRef(null);
  const pending = useRef({});

  useEffect(() => {
    base44.entities.AdCampaign.get(campaignId)
      .then(setCampaign)
      .catch(() => navigate("/ads", { replace: true }));
  }, [campaignId, navigate]);

  const flush = useCallback(async () => {
    const updates = pending.current;
    pending.current = {};
    if (!Object.keys(updates).length) return;
    try {
      await base44.entities.AdCampaign.update(campaignId, updates);
    } catch (e) {
      console.error("[Ads] autosave", e);
    }
  }, [campaignId]);

  // Inputs save automatically, a moment after the member stops typing.
  const change = (updates) => {
    setCampaign((prev) => ({ ...prev, ...updates }));
    pending.current = { ...pending.current, ...updates };
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(flush, 600);
  };

  useEffect(() => () => {
    clearTimeout(saveTimer.current);
    flush();
  }, [flush]);

  const canBuild = !!(campaign?.business_name && campaign?.product && campaign?.goal);

  const build = async () => {
    clearTimeout(saveTimer.current);
    await flush();
    setBuilding(true);
    setError(null);
    setCampaign((prev) => ({ ...prev, stage: "ads" }));
    try {
      const inputs = { ...Object.fromEntries(INPUT_FIELDS.map((k) => [k, campaign[k]])), business_type: guessBusinessType(campaign) };
      const setup = getCampaignSetup(inputs);
      let site = { ok: false };
      const website = normalizeUrl(campaign.website);
      if (website) {
        const res = await invokeFunction("readWebsite", { url: website }).catch(() => null);
        site = res?.data ?? res ?? { ok: false };
      }
      const result = await callAI(buildAdsCall({ ...campaign, ...inputs, setup }));
      const record = { version: 3, cta: "", concepts: finalizeConcepts(result) };
      if (!record.concepts.length) throw new Error("The ads came back empty. Try again.");
      const updated = await base44.entities.AdCampaign.update(campaign.id, {
        ...inputs,
        website,
        setup,
        record,
        site_read: !!site?.ok,
        status: "complete",
        stage: "ads",
        checklist_done: [],
        ad_choices: {},
        blank_values: campaign.blank_values || {},
        ads_off: [],
        launched_at: "",
        funnel: null,
        funnel_ad: 0,
      });
      setCampaign(updated);
    } catch (e) {
      console.error("[Ads] build", e);
      setError(e?.response?.data?.error || e.message || String(e));
    } finally {
      setBuilding(false);
    }
  };

  // The member's picks and edits for one ad (free, no AI).
  const choose = async (index, updates) => {
    const all = { ...(campaign.ad_choices || {}) };
    const next = { ...(all[index] || {}), ...updates };
    Object.keys(next).forEach((k) => next[k] === undefined && delete next[k]);
    all[index] = next;
    setCampaign((prev) => ({ ...prev, ad_choices: all }));
    await base44.entities.AdCampaign.update(campaign.id, { ad_choices: all });
  };

  // Blank values fill that blank in every ad (free, no AI).
  const saveBlanks = async (values) => {
    const all = { ...(campaign.blank_values || {}) };
    Object.entries(values).forEach(([k, v]) => {
      if (String(v || "").trim()) all[k] = String(v).trim();
      else delete all[k];
    });
    setCampaign((prev) => ({ ...prev, blank_values: all }));
    await base44.entities.AdCampaign.update(campaign.id, { blank_values: all });
  };

  // Funnel: write the Instant Form or the landing page copy from the chosen ad (one AI call).
  const [writingFunnel, setWritingFunnel] = useState(false);
  const [funnelError, setFunnelError] = useState(null);
  const writeFunnel = async (type, adIndex) => {
    clearTimeout(saveTimer.current);
    await flush();
    setWritingFunnel(true);
    setFunnelError(null);
    try {
      const result = await callAI(buildFunnelCall(campaign, adIndex, type));
      const key = type === "instant_form" ? "instant_form" : "landing_page";
      const funnel = { ...(campaign.funnel || {}), [key]: finalizeFunnel(type, result), ad_index: adIndex };
      const updated = await base44.entities.AdCampaign.update(campaign.id, { funnel, funnel_type: type, funnel_ad: adIndex });
      setCampaign(updated);
    } catch (e) {
      console.error("[Ads] funnel", e);
      setFunnelError(e?.response?.data?.error || e.message || String(e));
    } finally {
      setWritingFunnel(false);
    }
  };

  // Wizard navigation: one track, saved on the campaign. Older campaigns saved "creative": that's Funnel now.
  const savedStage = campaign?.stage === "creative" ? "funnel" : campaign?.stage;
  const stage = savedStage && (savedStage === "plan" || campaign.record) ? savedStage : "plan";
  const go = (next) => {
    change({ stage: next });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const canGo = (id) => id === "plan" || !!campaign?.record;

  const toggleAd = (index) => {
    const off = new Set(campaign.ads_off || []);
    off.has(index) ? off.delete(index) : off.add(index);
    change({ ads_off: [...off] });
  };
  const fillBlank = (blank, value) => saveBlanks({ [blank.toLowerCase()]: value });
  const done = () => {
    change({ launched_at: new Date().toISOString() });
  };

  if (!campaign) return <PageSkeleton />;

  return (
    <div className="lp ab">
      <Link to="/ads" className="lp-back">
        <ArrowLeft /> All campaigns
      </Link>
      <header className="lp-head">
        <span className="lp-avatar">{(displayName(campaign.business_name) || "?").charAt(0).toUpperCase()}</span>
        <div className="min-w-0 flex-1">
          <h1 className="lp-title">{displayName(campaign.business_name) || "New campaign"}</h1>
          <div className="lp-sub">{headerLine(campaign)}</div>
        </div>
        <StageTrack stage={stage} canGo={canGo} onGo={go} />
      </header>
      {stage !== "plan" && <CampaignStrip campaign={campaign} onEdit={() => go("plan")} />}

      <div className={stage === "plan" ? "ab-solo" : "mb-wide"}>
        <div className="lp-main">
          {stage === "plan" && <PlanStep campaign={campaign} onChange={change} onBuild={build} building={building} canBuild={canBuild} />}
          {stage === "ads" && (
            <AdsStep
              campaign={campaign}
              onRebuild={build}
              building={building}
              error={error}
              onToggle={toggleAd}
              onChoice={choose}
              onFill={fillBlank}
              onBack={() => go("plan")}
              onNext={() => go("funnel")}
            />
          )}
          {stage === "funnel" && (
            <FunnelStep
              campaign={campaign}
              onChange={change}
              onWrite={writeFunnel}
              writing={writingFunnel}
              error={funnelError}
              onBack={() => go("ads")}
              onNext={() => go("launch")}
            />
          )}
          {stage === "launch" && <LaunchStep campaign={campaign} onChange={change} onBack={() => go("funnel")} onDone={done} />}
          {stage === "plan" && error && <p className="lp-error">That didn't work. Try again. ({error})</p>}
        </div>
      </div>
    </div>
  );
}

export default withLibs(AdCampaign);
