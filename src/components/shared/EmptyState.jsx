import React from "react";
import { Button } from "@/components/shared/Form";

export default function EmptyState({ title, text, buttonLabel, onClick }) {
  return (
    <div className="text-center py-12 px-6">
      <h3 className="text-lg font-semibold text-app-text">{title}</h3>
      {text && <p className="text-app-muted text-sm mt-2 max-w-md mx-auto">{text}</p>}
      {buttonLabel && onClick && (
        <Button
          onClick={onClick}
          className="mt-5 rounded-full h-11 px-6 bg-app-primary text-app-on-primary hover:bg-app-text"
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}