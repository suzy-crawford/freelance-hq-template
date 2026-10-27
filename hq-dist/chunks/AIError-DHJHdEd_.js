var e=`import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "@/components/brand/icons";

export default function AIError({ message, onRetry }) {
  return (
    <div className="mt-6 rounded-xl border-2 border-app-danger bg-app-bg p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-app-danger flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-app-text font-medium">That didn't work. Your answers are saved. Try again.</p>
          <Button
            type="button"
            onClick={onRetry}
            className="mt-3 rounded-full h-10 px-5 bg-app-primary text-app-on-primary hover:bg-app-text"
          >
            Try again
          </Button>
          <p className="text-xs text-app-muted mt-3 break-words">Details: {message}</p>
        </div>
      </div>
    </div>
  );
}`;export{e as default};