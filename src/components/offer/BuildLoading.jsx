import React, { useEffect, useState } from "react";

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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-app-bg px-6 text-center">
      <div className="w-10 h-10 border-4 border-app-surface border-t-app-primary rounded-full animate-spin mb-6" />
      <p className="text-lg font-medium text-app-text">{MESSAGES[index]}</p>
      <p className="text-sm text-app-muted mt-2">This usually takes 20 to 40 seconds.</p>
    </div>
  );
}