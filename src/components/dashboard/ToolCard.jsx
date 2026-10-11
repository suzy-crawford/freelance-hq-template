import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ToolCard({ icon: Icon, name, description, to, cta = "Open" }) {
  return (
    <div className="rounded-xl border border-app-border bg-app-surface p-5 flex flex-col">
      <div className="w-10 h-10 rounded-lg bg-app-bg border border-app-border flex items-center justify-center">
        <Icon className="w-5 h-5 text-app-text" />
      </div>
      <div className="font-semibold text-app-text mt-3">{name}</div>
      <p className="text-app-muted text-sm mt-1 flex-1">{description}</p>
      <Button
        asChild
        className="mt-4 rounded-full h-11 px-5 bg-app-primary text-app-on-primary hover:bg-app-text self-start"
      >
        <Link to={to}>{cta}</Link>
      </Button>
    </div>
  );
}