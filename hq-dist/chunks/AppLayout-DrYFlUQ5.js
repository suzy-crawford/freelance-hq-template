var e=`import React, { useEffect, useState } from "react";
import { asset } from "@/lib/assets";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { Home, Offer, MapPin, Progress, Calendar, Lessons, Community, Settings, Menu, Close, Globe, Target, Cart } from "@/components/brand/icons";
import { useProfile } from "@/lib/ProfileContext";
import { LEARNING_LINKS } from "@/lib/constants";
import { base44 } from "@/api/base44Client";

// Brand kit v3 shell: midnight sidebar, off-white page, content left aligned.
// NavLink sets aria-current="page" on the active item, which app.css styles.

// The AI Build Lab's three sections, each its own link (the page reads ?section=).
const LAB_LINKS = [
  { id: "get", label: "Builds to get clients", icon: Globe },
  { id: "magnets", label: "Lead magnets", icon: Target },
  { id: "sell", label: "Builds to sell", icon: Cart },
];

function Sidebar({ leadCount, onNavigate }) {
  const { profile } = useProfile();
  const location = useLocation();
  const labSection = location.pathname === "/build-lab" ? new URLSearchParams(location.search).get("section") || "get" : null;
  const firstName = profile?.first_name;
  return (
    <>
      <div className="ws ws-2">
        <img src={asset("/brand/logo-wordmark-night-ai.svg")} className="ws-mark" alt="SheFreelances AI" />
        <span>{firstName ? \`\${firstName}'s Freelance HQ\` : "Your Freelance HQ"}</span>
      </div>
      <NavLink to="/" end className="nav-item" onClick={onNavigate}>
        <Home />
        Home
      </NavLink>
      <div className="nav-label">AI tools</div>
      <NavLink to="/offer-builder" className="nav-item" onClick={onNavigate}>
        <Offer />
        Offer Builder
      </NavLink>
      <NavLink to="/clients" className="nav-item" onClick={onNavigate}>
        <MapPin />
        Client Finder
        {leadCount > 0 && <span className="count">{leadCount}</span>}
      </NavLink>
      <NavLink to="/ads" className="nav-item" onClick={onNavigate}>
        <Progress />
        Meta Ads Builder
      </NavLink>
      <NavLink to="/content" className="nav-item" onClick={onNavigate}>
        <Calendar />
        Content Creator
      </NavLink>
      <div className="nav-label">AI Build Lab</div>
      {LAB_LINKS.map((l) => (
        <Link
          key={l.id}
          to={\`/build-lab?section=\${l.id}\`}
          className="nav-item"
          onClick={onNavigate}
          aria-current={labSection === l.id ? "page" : undefined}
        >
          <l.icon />
          {l.label}
        </Link>
      ))}
      <div className="nav-label">Skool</div>
      <a className="nav-item" href={LEARNING_LINKS.course} target="_blank" rel="noreferrer">
        <Lessons />
        Course
      </a>
      <a className="nav-item" href={LEARNING_LINKS.community} target="_blank" rel="noreferrer">
        <Community />
        Community
      </a>
      <div className="side-foot">
        <NavLink to="/profile" className="nav-item" onClick={onNavigate}>
          <Settings />
          Settings
        </NavLink>
      </div>
    </>
  );
}

export default function AppLayout() {
  const location = useLocation();
  const [leadCount, setLeadCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    base44.entities.Prospect.filter({}, { limit: 500 })
      .then(({ items }) => setLeadCount(items?.length || 0))
      .catch(() => {});
  }, [location.pathname]);

  useEffect(() => setDrawerOpen(false), [location.pathname]);

  return (
    <div className="app">
      <aside className="side" aria-label="Main">
        <Sidebar leadCount={leadCount} />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex min-[861px]:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <aside className="side relative w-[260px] max-w-[85vw] h-full overflow-y-auto" style={{ display: "flex" }} aria-label="Main">
            <button
              type="button"
              className="self-end w-10 h-10 inline-flex items-center justify-center text-[color:var(--a-side-muted)]"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              <Close className="w-5 h-5" />
            </button>
            <Sidebar leadCount={leadCount} onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <div className="min-w-0">
        <div className="mobile-bar">
          <img src={asset("/brand/logo-wordmark-night-ai.svg")} className="ws-mark-sm" alt="SheFreelances AI" />
          <button type="button" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
        </div>
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
`;export{e as default};