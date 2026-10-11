import UpdateBanner from "@/components/shared/UpdateBanner";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "@/lib/ProfileContext";
import { base44 } from "@/api/base44Client";
import { Offer, MapPin, Mail, Search, Progress, Calendar, ChevronRight } from "@/components/brand/icons";
import { SkeletonLine } from "@/components/shared/Skeleton";
import { formatMoney } from "@/lib/offerData";

// Home: a cockpit, not a welcome page (brand-kit APP-UI.md). Every number is real data.

function timeAgo(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return mins <= 1 ? "Just now" : `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

const FIT_ORDER = { high: 0, medium: 1, low: 2 };

// "austin, tx" -> "Austin, TX"
function titleCase(location) {
  return String(location || "")
    .split(",")
    .map((part, i, all) => {
      const t = part.trim();
      if (i === all.length - 1 && /^[a-z]{2}$/i.test(t)) return t.toUpperCase();
      return t.replace(/\b\w/g, (c) => c.toUpperCase());
    })
    .join(", ");
}

function statusFor(p) {
  if (p.outreach) return { label: "Draft ready", className: "tag tag-high" };
  if (p.analysis) return { label: "Analyzed", className: "tag tag-lav" };
  return { label: "Not analyzed", className: "tag tag-line" };
}

function NextStep({ offer, prospects }) {
  const withOutreach = prospects.filter((p) => p.outreach).length;
  const steps = [
    { name: "Build your offer", meta: offer ? offer.selected_name : "Not started", done: !!offer },
    {
      name: "Build your lead list",
      meta: prospects.length ? `${prospects.length} ${prospects.length === 1 ? "business" : "businesses"} saved` : "None saved yet",
      done: prospects.length > 0,
    },
    {
      name: "Write outreach",
      meta: prospects.length ? `${withOutreach} of ${prospects.length} have a draft` : "After you save clients",
      done: prospects.length > 0 && withOutreach === prospects.length,
    },
  ];
  const current = steps.findIndex((s) => !s.done);

  const best = [...prospects]
    .filter((p) => !p.outreach)
    .sort((a, b) => (FIT_ORDER[a.analysis?.opportunity_level] ?? 3) - (FIT_ORDER[b.analysis?.opportunity_level] ?? 3))[0];
  const action =
    current === 0
      ? { label: "Build your offer", to: "/offer-builder", icon: Offer }
      : current === 1
        ? { label: "Find businesses to pitch", to: "/clients", icon: MapPin }
        : current === 2 && best
          ? { label: `Write outreach for ${best.name}`, to: `/clients/${best.id}`, icon: Mail }
          : { label: "Find more businesses", to: "/clients", icon: MapPin };

  const step = steps[current] || steps[steps.length - 1];
  return (
    <section className="next" aria-label="Your next step">
      <span className="eyebrow-app">Next step</span>
      <span className="progress-dots" aria-hidden="true">
        {steps.map((s, i) => (
          <i key={s.name} className={s.done ? "done" : i === current ? "now" : ""} />
        ))}
      </span>
      <span className="next-title">{step.name}</span>
      <span className="muted">{step.meta}</span>
      <Link to={action.to} className="btn btn-primary">
        <action.icon />
        {action.label}
      </Link>
    </section>
  );
}

function ToolCard({ to, icon: Icon, name, desc, meta, disabled }) {
  const body = (
    <>
      <span className="tool-ico">
        <Icon />
      </span>
      <div className="tool-name">{name}</div>
      <p className="tool-desc">{desc}</p>
      <span className="tool-cta">
        <span>Open {name}</span>
        {!disabled && <ChevronRight />}
      </span>
      <span className="tool-meta">{meta}</span>
    </>
  );
  if (disabled) {
    return (
      <div className="tool" aria-disabled="true">
        {body}
      </div>
    );
  }
  return (
    <Link to={to} className="tool">
      {body}
    </Link>
  );
}

function Tools({ offers, prospects, campaigns }) {
  const lastOffer = offers[0];
  const lastCampaign = campaigns[0];
  return (
    <section aria-labelledby="tools-title" className="flex flex-col gap-5">
      <h2 id="tools-title" className="h-section">
        Your AI tools
      </h2>
      <div className="tools">
        <ToolCard
          to="/offer-builder"
          icon={Offer}
          name="Offer Builder"
          desc="Answer three questions and get your offer, your price and a one-page offer doc you can share."
          meta={lastOffer ? `Last used ${timeAgo(lastOffer.updated_date).toLowerCase()}` : "Not used yet"}
        />
        <ToolCard
          to="/clients"
          icon={MapPin}
          name="Client Finder"
          desc="Find real businesses near you, see where you could help, and get a message ready to send."
          meta={prospects.length ? `${prospects.length} on your lead list` : "Not used yet"}
        />
        <ToolCard
          to="/ads"
          icon={Progress}
          name="Ads Manager"
          desc="Plan a Meta ad campaign step by step."
          meta={lastCampaign ? `Last used ${timeAgo(lastCampaign.updated_date).toLowerCase()}` : "Not used yet"}
        />
        <ToolCard
          icon={Calendar}
          name="Content Creator"
          desc="Plan a month of posts for a client."
          meta="Coming next"
          disabled
        />
      </div>
    </section>
  );
}

function ClientsPanel({ prospects }) {
  const navigate = useNavigate();
  const rows = [...prospects]
    .sort((a, b) => new Date(b.updated_date || 0) - new Date(a.updated_date || 0))
    .slice(0, 6);
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Your lead list</h2>
        <span className="count">{prospects.length} saved</span>
        <Link to="/clients" className="btn btn-quiet btn-sm">
          <MapPin />
          Find more
        </Link>
      </div>
      {prospects.length === 0 ? (
        <div className="empty">
          <div className="empty-title">Your lead list is empty</div>
          <p className="empty-text">Find businesses near you that could use your help, then save the good ones here.</p>
          <Link to="/clients" className="btn btn-primary">
            Find businesses
          </Link>
        </div>
      ) : (
        <div className="panel-scroll">
          <table className="list">
            <thead>
              <tr>
                <th>Business</th>
                <th>Type</th>
                <th>Location</th>
                <th>Fit</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const status = statusFor(p);
                const fit = p.analysis?.opportunity_level;
                return (
                  <tr
                    key={p.id}
                    tabIndex={0}
                    className="cursor-pointer"
                    onClick={() => navigate(`/clients/${p.id}`)}
                    onKeyDown={(e) => e.key === "Enter" && navigate(`/clients/${p.id}`)}
                  >
                    <td className="strong">{p.name}</td>
                    <td className="muted">{p.business_type}</td>
                    <td className="muted">{titleCase(p.location)}</td>
                    <td>{fit ? fit.charAt(0).toUpperCase() + fit.slice(1) : <span className="muted">Not yet</span>}</td>
                    <td>
                      <span className={status.className}>{status.label}</span>
                    </td>
                    <td className="muted">{timeAgo(p.updated_date)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function OfferPanel({ offer }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Your offer</h2>
        {offer && (
          <Link to={`/offer/${offer.id}?tab=offer`} className="link text-[13px]">
            Edit
          </Link>
        )}
      </div>
      {offer ? (
        <div className="panel-body flex flex-col gap-2">
          <div className="h-sub">{offer.selected_name}</div>
          {offer.record?.talk?.one_sentence && <p className="muted">{offer.record.talk.one_sentence}</p>}
          <p className="figure">
            {formatMoney(offer.price)} <span className="muted text-sm font-sans">per month</span>
          </p>
          <div>
            <Link to={`/offer/${offer.id}?tab=doc`} className="btn btn-quiet mt-3">
              Open offer doc
            </Link>
          </div>
        </div>
      ) : (
        <div className="empty">
          <div className="empty-title">No offer yet</div>
          <p className="empty-text">Answer three quick questions and get a clear offer, a price and a one-page offer doc.</p>
          <Link to="/offer-builder" className="btn btn-primary">
            Build your offer
          </Link>
        </div>
      )}
    </section>
  );
}

function RecentWork({ offers, prospects }) {
  const items = useMemo(() => {
    const list = [];
    offers.forEach((o) => {
      if (o.status === "complete") list.push({ icon: Offer, text: ["Built your offer ", o.selected_name], at: o.updated_date, to: `/offer/${o.id}` });
    });
    prospects.forEach((p) => {
      if (p.outreach?.generated_at) list.push({ icon: Mail, text: ["Outreach draft for ", p.name], at: p.outreach.generated_at, to: `/clients/${p.id}` });
      if (p.analyzed_at) list.push({ icon: Search, text: ["Analyzed ", p.name], at: p.analyzed_at, to: `/clients/${p.id}` });
    });
    return list.sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, 5);
  }, [offers, prospects]);

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Recent AI work</h2>
      </div>
      {items.length === 0 ? (
        <p className="panel-body text-app-muted">Your offers, analyses and drafts will show up here.</p>
      ) : (
        <ul className="recent">
          {items.map((it, i) => (
            <li key={i}>
              <it.icon />
              <Link to={it.to} className="min-w-0">
                {it.text[0]}
                <strong>{it.text[1]}</strong>
              </Link>
              <span className="when">{timeAgo(it.at)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Dashboard() {
  const { profile } = useProfile();
  const [offers, setOffers] = useState(null);
  const [prospects, setProspects] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    Promise.all([
      base44.entities.Offer.filter({}, { sort: "-updated_date", limit: 50 }),
      base44.entities.Prospect.filter({}, { sort: "-updated_date", limit: 500 }),
      base44.entities.AdCampaign.filter({}, { sort: "-updated_date", limit: 50 }).catch(() => ({ items: [] })),
    ])
      .then(([o, p, c]) => {
        setOffers(o.items || []);
        setProspects(p.items || []);
        setCampaigns(c.items || []);
      })
      .catch((e) => {
        console.error("[Home] load", e);
        setOffers([]);
        setProspects([]);
      });
  }, []);

  const firstName = profile?.first_name || "there";
  const loading = offers === null || prospects === null;
  const activeOffer = (offers || []).find((o) => o.is_active && o.status === "complete") || null;
  const sub = loading
    ? ""
    : !activeOffer
      ? "Start by building your offer. It takes about ten minutes."
      : !prospects.length
        ? "Your offer is ready. Next, find businesses that could use your help."
        : prospects.some((p) => !p.outreach)
          ? "You're one step from your first pitch."
          : "Keep going. Every message is a chance at a client.";

  return (
    <>
      <header>
        <div className="date">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</div>
        <h1 className="greeting">
          {greeting()}, <span className="name">{firstName}</span>.
        </h1>
        <p className="lede">{sub || "\u00a0"}</p>
        {!loading && <NextStep offer={activeOffer} prospects={prospects} />}
      </header>

      <UpdateBanner />

      {loading ? (
        <div className="flex flex-col gap-4">
          <SkeletonLine className="h-64 w-full" />
          <SkeletonLine className="h-64 w-full" />
        </div>
      ) : (
        <>
          <Tools offers={(offers || []).filter((o) => o.status === "complete")} prospects={prospects} campaigns={campaigns || []} />
          <div className="two-col panels">
            <ClientsPanel prospects={prospects} />
            <div className="stack">
              <OfferPanel offer={activeOffer} />
              <RecentWork offers={offers} prospects={prospects} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
