import React, { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Home, Offer, MapPin, Progress, Calendar, Lessons, Community, Settings, Menu, Close, Globe, Target, Cart } from "@/components/brand/icons";
import { PageSkeleton } from "@/components/shared/ToolKit";
import { useProfile } from "@/lib/ProfileContext";
import { useAuth } from "@/lib/AuthContext";
import { asset, LEARNING_LINKS } from "@/lib/hq";
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
        <span>{firstName ? `${firstName}'s Freelance HQ` : "Your Freelance HQ"}</span>
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
          to={`/build-lab?section=${l.id}`}
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

// Sign-in guard and the screens for a user who isn't registered and a page that doesn't exist.
const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <PageSkeleton />
  </div>
);

export function ProtectedRoute({ fallback = <DefaultFallback />, unauthenticatedElement }) {
  const { isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth } = useAuth();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) {
    return fallback;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    return unauthenticatedElement;
  }

  if (!isAuthenticated) {
    return unauthenticatedElement;
  }

  return <Outlet />;
}

export const UserNotRegisteredError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-app-bg">
      <div className="max-w-md w-full p-8 bg-app-bg rounded-lg border border-app-border">
        <div className="text-center">
                    <h1 className="text-3xl font-normal text-app-text mb-4">Access restricted</h1>
          <p className="text-app-muted mb-8">
            You are not registered to use this application. Please contact the app administrator to request access.
          </p>
          <div className="p-4 bg-app-bg rounded-md text-sm text-app-muted">
            <p>If you believe this is an error, you can:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Verify you are logged in with the correct account</li>
              <li>Contact the app administrator for access</li>
              <li>Try logging out and back in again</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export function PageNotFound({}) {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    const { data: authData, isFetched } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const user = await base44.auth.me();
                return { user, isAuthenticated: true };
            } catch (error) {
                return { user: null, isAuthenticated: false };
            }
        }
    });
    
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-app-bg">
            <div className="max-w-md w-full">
                <div className="text-center space-y-6">
                    {/* 404 Error Code */}
                    <div className="space-y-2">
                        <h1 className="text-7xl font-light text-app-muted">404</h1>
                        <div className="h-0.5 w-16 bg-app-surface mx-auto"></div>
                    </div>
                    
                    {/* Main Message */}
                    <div className="space-y-3">
                        <h2 className="text-2xl font-medium text-app-text">
                            Page Not Found
                        </h2>
                        <p className="text-app-muted leading-relaxed">
                            The page <span className="font-medium text-app-text">"{pageName}"</span> could not be found in this application.
                        </p>
                    </div>
                    
                    {/* Admin Note */}
                    {isFetched && authData.isAuthenticated && authData.user?.role === 'admin' && (
                        <div className="mt-8 p-4 bg-app-surface rounded-lg border border-app-border">
                            <div className="flex items-start space-x-3">
                                <div className="text-left space-y-1">
                                    <p className="text-sm font-medium text-app-text">Admin note</p>
                                    <p className="text-sm text-app-muted leading-relaxed">
                                        This could mean that the AI hasn't implemented this page yet. Ask it to implement it in the chat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="pt-6">
                        <button 
                            onClick={() => window.location.href = '/'} 
                            className="sf-press inline-flex items-center min-h-11 px-5 text-[0.9375rem] font-semibold text-app-on-primary bg-app-primary rounded-sm"
                        >
                            Go to My business
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
