import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, User } from "lucide-react";
import { useProfile } from "@/lib/ProfileContext";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/offer-builder", label: "Offer Builder", icon: FileText },
  { to: "/profile", label: "My Profile", icon: User },
];

function AppTitle() {
  const { profile } = useProfile();
  const firstName = profile?.first_name;
  const title = firstName ? `${firstName}'s Freelance HQ` : "Freelance HQ";
  return (
    <div>
      <div className="font-semibold text-app-text leading-tight">{title}</div>
      <div className="text-xs text-app-muted mt-0.5">by SheFreelances AI</div>
    </div>
  );
}

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-app-bg">
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-app-border bg-app-bg px-5 py-6">
        <div className="px-2 mb-8">
          <AppTitle />
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "bg-app-primary text-app-on-primary" : "text-app-text hover:bg-app-surface"
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="md:pl-64 pb-20 md:pb-0">
        <main className="max-w-4xl mx-auto px-5 py-6 md:py-10">
          <Outlet />
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 inset-x-0 border-t border-app-border bg-app-bg flex">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium",
                isActive ? "text-app-primary" : "text-app-muted"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}