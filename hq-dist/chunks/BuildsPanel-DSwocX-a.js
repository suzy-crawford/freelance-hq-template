var e=`import React, { useEffect, useState } from "react";
import { asset } from "@/lib/assets";
import { Check, Copy, ExternalLink, ArrowRight } from "@/components/brand/icons";
import { base44 } from "@/api/base44Client";
import { useProfile } from "@/lib/ProfileContext";
import { getFreelancerName, getServiceName } from "@/lib/offerData";
import { getBuild } from "@/lib/clientsBuilds";
import { INDUSTRIES, GENERAL, IMPROVE, guessIndustry } from "@/lib/buildsExtras";

// "What is this?": hover on desktop, tap on phones, shows a short GIF of how to do it.
export function HelpGif({ label = "What is this?", src, alt, children }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="hg" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className="lp-link hg-link" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {label}
      </button>
      {open && (
        <span className="hg-pop" role="dialog" aria-label={alt}>
          <img src={src} alt={alt} width="360" height="220" />
          {children && <span className="hg-text">{children}</span>}
        </span>
      )}
    </span>
  );
}

// One business, a row of build tabs, and the four steps: their Google listing, copy the Base44 prompt,
// check it, save the link. The business is a Prospect record, so links and details are kept.
export default function BuildsPanel({ prospect, offer, builds, onUpdated, canSave = true }) {
  const { profile } = useProfile();
  const [tab, setTab] = useState(builds[0].id);
  const [source, setSource] = useState(prospect.preview_source || "");
  const [prices, setPrices] = useState(prospect.price_notes || "");
  const [reward, setReward] = useState(prospect.reward_notes || "");
  const [industry, setIndustry] = useState(prospect.build_industry || "");
  const [copied, setCopied] = useState(false);
  const [copiedTip, setCopiedTip] = useState("");
  const [open, setOpen] = useState(false);
  const build = builds.find((b) => b.id === tab) ? getBuild(tab) : builds[0];
  const savedUrl = (prospect.builds || {})[build.id]?.url || (build.id === "website" ? prospect.preview_url : "") || "";
  const [url, setUrl] = useState(savedUrl);
  useEffect(() => {
    if (!builds.some((b) => b.id === tab)) setTab(builds[0].id);
  }, [builds]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setUrl(savedUrl);
    setOpen(false);
    setCopied(false);
  }, [build.id, prospect.id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setSource(prospect.preview_source || "");
    setPrices(prospect.price_notes || "");
    setReward(prospect.reward_notes || "");
    setIndustry(prospect.build_industry || "");
  }, [prospect.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const me = { name: getFreelancerName(profile || {}), service: offer ? getServiceName(offer) : "", email: profile?.email || profile?.created_by || "" };
  // A Google search for the business brings up its profile panel, ready to copy. Free, no AI.
  const googleQuery = [prospect.name, prospect.address || prospect.location].filter(Boolean).join(" ");
  const googleUrl = prospect.name ? \`https://www.google.com/search?q=\${encodeURIComponent(googleQuery)}\` : "";
  // Industry: what the member picked, or our best guess from the business type and listing.
  const industryId = industry || guessIndustry({ ...prospect, preview_source: source });
  const prompt = build.prompt({ ...prospect, preview_source: source, price_notes: prices, reward_notes: reward, build_industry: industryId }, me);
  const pickIndustry = (v) => {
    setIndustry(v);
    save({ build_industry: v });
  };
  const copyTip = async (t) => {
    try {
      await navigator.clipboard.writeText(t.text);
      setCopiedTip(t.title);
      setTimeout(() => setCopiedTip(""), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };
  const tips = IMPROVE[build.id] || [];
  const analyzed = prospect.analysis?.source === "claude";
  const save = async (u) => {
    if (!canSave || !prospect.id) return;
    try {
      onUpdated?.(await base44.entities.Prospect.update(prospect.id, u));
    } catch {
      /* saved next time */
    }
  };
  const saveDetails = () => {
    const u = {};
    if (source !== (prospect.preview_source || "")) u.preview_source = source;
    if (prices !== (prospect.price_notes || "")) u.price_notes = prices;
    if (reward !== (prospect.reward_notes || "")) u.reward_notes = reward;
    if (Object.keys(u).length) save(u);
  };
  const saveUrl = () => {
    const v = url.trim();
    if (v === savedUrl) return;
    const all = { ...(prospect.builds || {}), [build.id]: { url: v, saved_at: new Date().toISOString() } };
    save(build.id === "website" ? { builds: all, preview_url: v } : { builds: all });
  };
  const copy = async () => {
    saveDetails();
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <div className="lp-tabs pv-tabs" role="tablist" aria-label="Builds">
        {builds.map((b) => {
          const done = !!((prospect.builds || {})[b.id]?.url || (b.id === "website" && prospect.preview_url));
          return (
            <button key={b.id} type="button" role="tab" aria-selected={build.id === b.id} className="lp-tab" onClick={() => setTab(b.id)}>
              {b.label}
              {done && <Check className="pv-done" />}
            </button>
          );
        })}
      </div>
      <div className="lp-body">
        <div className="pv-intro">
          <strong>{build.title}</strong>
          <span>{build.what}</span>
          <em>{build.when}</em>
        </div>
        <ol className="pv-steps">
          <li>
            <strong>Paste their Google listing</strong> <span className="lp-meta">Optional, used by every build</span>
            {googleUrl && (
              <a className="lp-link hg-open" href={googleUrl} target="_blank" rel="noreferrer">
                Open their Google listing <ExternalLink />
              </a>
            )}
            <HelpGif src={asset("/help/google-listing.gif")} alt="How to copy a Google business listing">
              Google the business, highlight everything in the profile on the right (name, rating, address, hours, reviews), copy it and paste it here.
            </HelpGif>
            <p>Their business profile on Google: rating, hours, services, reviews and description.</p>
            <textarea className="textarea" rows={3} value={source} onChange={(e) => setSource(e.target.value)} onBlur={saveDetails} placeholder="5.0 · 121 Google reviews · Dentist in Tustin… paste it all here" />
            {(build.usesPrices || build.input?.field === "price_notes") && (
              <>
                <div className="pv-sub">
                  <strong>{build.input?.label || "Their prices"}</strong> <span className="lp-meta">{build.input?.hint || "Optional. Without them, the build uses example prices you'll swap later."}</span>
                </div>
                <textarea className="textarea" rows={3} value={prices} onChange={(e) => setPrices(e.target.value)} onBlur={saveDetails} placeholder={build.input?.placeholder || "Standard clean: $140 for up to 2 bedrooms, +$30 per extra bedroom. Deep clean: +$80. Inside fridge: +$35."} />
              </>
            )}
            {build.input?.field === "reward_notes" && (
              <>
                <div className="pv-sub">
                  <strong>{build.input.label}</strong> <span className="lp-meta">{build.input.hint}</span>
                </div>
                <textarea className="textarea" rows={2} value={reward} onChange={(e) => setReward(e.target.value)} onBlur={saveDetails} placeholder={build.input.placeholder} />
              </>
            )}
            {build.usesIndustry && (
              <>
                <div className="pv-sub">
                  <strong>Their industry</strong> <span className="lp-meta">Sets which questions it asks. We guessed from the business type.</span>
                </div>
                <select className="input pv-select" value={industryId} onChange={(e) => pickIndustry(e.target.value)} aria-label="Their industry">
                  {INDUSTRIES.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.label}
                    </option>
                  ))}
                  <option value={GENERAL.id}>{GENERAL.label}</option>
                </select>
              </>
            )}
          </li>
          <li>
            <strong>Copy the prompt and build it in Base44</strong>
            <p>Create a new app in Base44, paste this and send. When it's done, click Publish at the top right to get the link.</p>
            {build.needsAnalysis && !analyzed && (
              <p className="pv-warn">Run the AI Lead Analyzer first so the audit is built on what you actually found. Without it, every opportunity becomes a question.</p>
            )}
            <div className="pv-do">
              <div className="pv-do-step">
                <span className="pv-do-n">1</span>
                <button type="button" className="lp-btn-outline" onClick={copy}>
                  {copied ? <Check /> : <Copy />} {copied ? "Copied" : \`Copy the \${build.label.toLowerCase()} prompt\`}
                </button>
              </div>
              <ArrowRight className="pv-do-arrow" aria-hidden="true" />
              <div className="pv-do-step">
                <span className="pv-do-n">2</span>
                <a className="pv-do-open" href="https://app.base44.com" target="_blank" rel="noreferrer">
                  Open Base44 and paste <ExternalLink />
                </a>
              </div>
            </div>
            <button type="button" className="pv-see" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
              {open ? "Hide the prompt" : "See the prompt"}
            </button>
            {open && <pre className="pv-pre">{prompt}</pre>}
          </li>
          <li>
            <strong>Check it before you send it</strong>
            <ul className="pv-checks">
              {build.checks.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </li>
          {tips.length > 0 && (
            <li>
              <strong>Make it better</strong> <span className="lp-meta">Optional</span>
              <p>Paste any of these into the same Base44 app, one at a time. If one ends in a colon, paste your link, ID or prices right after it.</p>
              <ul className="pv-tips">
                {tips.map((t) => (
                  <li key={t.title}>
                    <div>
                      <b>{t.title}</b>
                      <span>{t.text}</span>
                    </div>
                    <button type="button" className="lp-link pv-tip-copy" onClick={() => copyTip(t)}>
                      {copiedTip === t.title ? <Check /> : <Copy />} {copiedTip === t.title ? "Copied" : "Copy"}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {canSave && (
            <li>
              <strong>Save the link</strong>
              <p>Paste the published link so it's ready when you write your message.</p>
              <div className="pv-url">
                <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} onBlur={saveUrl} placeholder="https://" aria-label={\`\${build.title} link\`} />
                {savedUrl && (
                  <a className="lp-link" href={savedUrl} target="_blank" rel="noreferrer">
                    Open it <ExternalLink />
                  </a>
                )}
              </div>
            </li>
          )}
        </ol>
      </div>
    </>
  );
}
`;export{e as default};