import React, { useEffect, useState } from "react";
import { SkeletonLine } from "@/components/shared/Skeleton";

const MESSAGES = [
  "Looking at who you want to help...",
  "Building your package...",
  "Writing your offer...",
  "Almost there...",
];

export default function BuildLoading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-app-bg px-6" aria-busy="true">
      <div className="w-full max-w-md">
        <div className="sf-eyebrow">Building your offer</div>
        <p className="font-display text-2xl text-app-text mt-2" aria-live="polite">{MESSAGES[index]}</p>
        <p className="text-sm text-app-muted mt-2">This usually takes 20 to 40 seconds.</p>
        <div className="mt-8 space-y-3">
          <SkeletonLine className="h-5 w-2/3" />
          <SkeletonLine className="w-full" />
          <SkeletonLine className="w-11/12" />
          <SkeletonLine className="w-4/5" />
        </div>
      </div>
    </div>
  );
}