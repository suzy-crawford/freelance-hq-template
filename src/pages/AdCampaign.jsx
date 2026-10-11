import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { callAI } from "@/lib/callAI";
import ToolHero from "@/components/shared/ToolHero";
import { PageSkeleton } from "@/components/shared/Skeleton";
import InputsPanel from "@/components/ads/InputsPanel";
import OutputPanel from "@/components/ads/OutputPanel";
import { getCampaignSetup } from "@/lib/adsData";
import {
  buildAdStrategyPrompt,
  buildAdRefinePrompt,
  buildAngleRewritePrompt,
  finalizeAdRecord,
  finalizeAngleResult,
  parseRefineRequest,
} from "@/lib/adsPrompts";
import { getNiche } from "@/lib/adsNiches";
import { displayName } from "@/lib/adsCards";

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
];

function normalizeUrl(url) {
  const u = String(url || "").trim();
  if (!u) return "";
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

export default function AdCampaign() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [building, setBuilding] = useState(false);
  const [refining, setRefining] = useState(false);
  const [error, setError] = useState(null);
  const [refineMessage, setRefineMessage] = useState("");
  const [busyIndex, setBusyIndex] = useState(null);
  const [inputsOpen, setInputsOpen] = useState(() => {
    try {
      return localStorage.getItem("sf-ads-inputs") !== "hidden";
    } catch {
      return true;
    }
  });
  const toggleInputs = () => {
    setInputsOpen((open) => {
      try {
        localStorage.setItem("sf-ads-inputs", open ? "hidden" : "open");
      } catch {
        /* storage unavailable */
      }
      return !open;
    });
  };
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

  const canBuild = !!(campaign?.business_name && campaign?.business_type && campaign?.product && campaign?.goal);

  const build = async () => {
    clearTimeout(saveTimer.current);
    await flush();
    setBuilding(true);
    setError(null);
    setRefineMessage("");
    try {
      const inputs = Object.fromEntries(INPUT_FIELDS.map((k) => [k, campaign[k]]));
      const setup = getCampaignSetup(inputs);
      let site = { ok: false };
      const website = normalizeUrl(campaign.website);
      if (website) {
        const res = await base44.functions.invoke("readWebsite", { url: website }).catch(() => null);
        site = res?.data ?? res ?? { ok: false };
      }
      const result = await callAI(buildAdStrategyPrompt({ campaign: inputs, setup, site, niche: getNiche(inputs) }));
      const record = finalizeAdRecord(result, setup, getNiche(inputs));
      const updated = await base44.entities.AdCampaign.update(campaign.id, {
        ...inputs,
        website,
        setup,
        record,
        site_read: !!site?.ok,
        status: "complete",
        checklist_done: [],
        ad_choices: {},
      });
      setCampaign(updated);
    } catch (e) {
      console.error("[Ads] build", e);
      setError(e?.response?.data?.error || e.message || String(e));
    } finally {
      setBuilding(false);
    }
  };

  const refine = async (request) => {
    setRefining(true);
    setError(null);
    setRefineMessage("");
    try {
      const changes = parseRefineRequest(request);
      const inputs = { ...Object.fromEntries(INPUT_FIELDS.map((k) => [k, campaign[k]])), ...changes };
      const setup = getCampaignSetup(inputs);
      const result = await callAI(buildAdRefinePrompt({ campaign: { ...campaign, ...inputs }, setup, request }));
      const record = finalizeAdRecord(result, setup, getNiche(inputs));
      const history = [...(campaign.refine_history || []), { request, date: new Date().toISOString() }];
      const updated = await base44.entities.AdCampaign.update(campaign.id, { ...changes, setup, record, refine_history: history, ad_choices: {} });
      setCampaign(updated);
      setRefineMessage("Updated. Every tab now reflects your change.");
      return true;
    } catch (e) {
      console.error("[Ads] refine", e);
      setError(e?.response?.data?.error || e.message || String(e));
      return false;
    } finally {
      setRefining(false);
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

  // Rewrite one ad, or swap its angle for another from the niche library (one small AI call).
  const rewriteAngle = async (index, swapTo) => {
    setBusyIndex(index);
    setError(null);
    try {
      const angle = campaign.record.angles[index];
      const result = await callAI(
        buildAngleRewritePrompt({
          campaign,
          setup: campaign.setup,
          angle,
          newAngle: swapTo,
          niche: getNiche(campaign),
        })
      );
      const angles = [...campaign.record.angles];
      angles[index] = finalizeAngleResult(result);
      const record = { ...campaign.record, angles };
      const all = { ...(campaign.ad_choices || {}) };
      delete all[index];
      const updated = await base44.entities.AdCampaign.update(campaign.id, { record, ad_choices: all });
      setCampaign(updated);
    } catch (e) {
      console.error("[Ads] rewrite", e);
      setError(e?.response?.data?.error || e.message || String(e));
    } finally {
      setBusyIndex(null);
    }
  };

  const toggleCheck = async (id) => {
    const done = new Set(campaign.checklist_done || []);
    done.has(id) ? done.delete(id) : done.add(id);
    const list = [...done];
    setCampaign((prev) => ({ ...prev, checklist_done: list }));
    await base44.entities.AdCampaign.update(campaign.id, { checklist_done: list });
  };

  if (!campaign) return <PageSkeleton />;

  return (
    <div className="flex flex-col gap-10">
      <ToolHero
        label="Ads Manager"
        title={displayName(campaign.business_name) || "New campaign"}
        tag={campaign.business_source === "practice" ? <span className="tag tag-practice">Practice</span> : null}
        subtitle="Plan a Meta ad campaign step by step. You review everything before anything goes live."
        right={
          !inputsOpen && (
            <button type="button" className="btn btn-quiet" onClick={toggleInputs} aria-expanded={false}>
              Show questions
            </button>
          )
        }
      />
      <div className={inputsOpen ? "guided" : "guided inputs-hidden"}>
        <InputsPanel campaign={campaign} onChange={change} onBuild={build} building={building} canBuild={canBuild} onHide={toggleInputs} />
        <OutputPanel
          campaign={campaign}
          building={building}
          error={error}
          onToggleCheck={toggleCheck}
          onRefine={refine}
          refining={refining}
          refineMessage={refineMessage}
          busyIndex={busyIndex}
          onChoice={choose}
          onRewrite={(i) => rewriteAngle(i)}
          onSwap={(i, a) => rewriteAngle(i, a)}
          onBlanks={saveBlanks}
          onChange={change}
        />
      </div>
    </div>
  );
}
