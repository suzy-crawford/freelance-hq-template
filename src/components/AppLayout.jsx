import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Home, Offer, MapPin, Progress, Calendar, Lessons, Community, Settings, Menu, Close } from "@/components/brand/icons";
import { useProfile } from "@/lib/ProfileContext";
import { LEARNING_LINKS } from "@/lib/constants";
import { base44 } from "@/api/base44Client";

// Brand kit v3 shell: midnight sidebar, off-white page, content left aligned.
// NavLink sets aria-current="page" on the active item, which app.css styles.

function Sidebar({ leadCount, onNavigate }) {
  const { profile } = useProfile();
  const firstName = profile?.first_name;
  return (
    <>
      <div className="ws">
        <img src="/brand/logo-monogram-lavender.svg" width="32" height="32" alt="" />
        <div>
          <b>{firstName ? `${firstName}'s Freelance HQ` : "Freelance HQ"}</b>
          <span>SheFreelances AI</span>
        </div>
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
        Ads Manager
      </NavLink>
      <span className="nav-item opacity-60" aria-disabled="true">
        <Calendar />
        Content Creator
      </span>
      <div className="nav-label">Learn</div>
      <a className="nav-item" href={LEARNING_LINKS.course} target="_blank" rel="noreferrer">
        <Lessons />
        The course
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
          <img src="/brand/logo-monogram-lavender.svg" width="28" height="28" alt="SheFreelances AI" />
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
