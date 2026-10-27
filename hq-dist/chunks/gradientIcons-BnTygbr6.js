var e=`import React from "react";

// Brand 2.0 gradient feature icons (brand kit 2.0, icons/gradient). Each one is drawn in its own
// slice of the spectrum and always sits on a navy tile (.tool-ico). Inlined so the gradient renders.

function makeGradIcon(name, id, stops, paths) {
  const Icon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={\`url(#\${id})\`} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22">
          {stops.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
  Icon.displayName = name;
  return Icon;
}

export const GradOffer = makeGradIcon("GradOffer", "sf-grad-offer-builder", [["0", "#f761af"], ["0.5", "#e465cd"], ["1", "#cb6af5"]], ["M3.5 4.5A1 1 0 0 1 4.5 3.5h7.3l8.4 8.4a1.6 1.6 0 0 1 0 2.3l-6 6a1.6 1.6 0 0 1-2.3 0L3.5 11.8z", "M6.6 8a1.4 1.4 0 1 0 2.8 0a1.4 1.4 0 1 0 -2.8 0z"]);
export const GradClientFinder = makeGradIcon("GradClientFinder", "sf-grad-client-finder", [["0", "#d868e1"], ["0.5", "#c46dfa"], ["1", "#a17cfd"]], ["M4.0 10.5a6.5 6.5 0 1 0 13.0 0a6.5 6.5 0 1 0 -13.0 0z", "M15.5 15.5l5 5"]);
export const GradAds = makeGradIcon("GradAds", "sf-grad-ads-manager", [["0", "#b274fb"], ["0.5", "#9880fd"], ["1", "#7991ff"]], ["M3.5 9.5h3l7-4.5v14l-7-4.5h-3z", "M17 9.5a3.5 3.5 0 0 1 0 5", "M19.5 7a7 7 0 0 1 0 10"]);
export const GradContent = makeGradIcon("GradContent", "sf-grad-content-creator", [["0", "#8787fe"], ["0.5", "#7698ff"], ["1", "#68b3ff"]], ["M5.5 5h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z", "M3.5 10h17", "M8.5 3v4M15.5 3v4", "M13.5 13.5h3v3h-3z"]);
export const GradLessons = makeGradIcon("GradLessons", "sf-grad-lessons", [["0", "#ff7a59"], ["0.5", "#ff7172"], ["1", "#ff6493"]], ["M3.5 5.5c2.8 0 5 .5 8.5 2.5v11.5c-3.5-2-5.7-2.5-8.5-2.5z", "M20.5 5.5c-2.8 0-5 .5-8.5 2.5v11.5c3.5-2 5.7-2.5 8.5-2.5z"]);
export const GradCommunity = makeGradIcon("GradCommunity", "sf-grad-community", [["0", "#ff6b83"], ["0.5", "#ff619c"], ["1", "#eb63c3"]], ["M5.8 8a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0z", "M3.5 19.5c.6-3.2 2.8-5.2 5.5-5.2s4.9 2 5.5 5.2", "M15.5 5.2a3 3 0 1 1 0 5.8", "M17 14.5c2 .4 3.3 2.1 3.6 5"]);
export const GradDashboard = makeGradIcon("GradDashboard", "sf-grad-dashboard", [["0", "#6fa6ff"], ["0.5", "#65baff"], ["1", "#5ec8ff"]], ["M5.5 4h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5v-4a1.5 1.5 0 0 1 1.5-1.5z", "M14.5 4h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5v-4a1.5 1.5 0 0 1 1.5-1.5z", "M5.5 13h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5v-4a1.5 1.5 0 0 1 1.5-1.5z", "M14.5 13h4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5v-4a1.5 1.5 0 0 1 1.5-1.5z"]);
`;export{e as default};