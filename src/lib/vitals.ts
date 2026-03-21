import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

/**
 * Reports Core Web Vitals to Google Analytics (gtag).
 * Called once in main.tsx after the app mounts.
 */
export function reportWebVitals() {
  const send = ({ name, value, id }: { name: string; value: number; id: string }) => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", name, {
      event_category: "Web Vitals",
      event_label: id,
      value: Math.round(name === "CLS" ? value * 1000 : value),
      non_interaction: true,
    });
  };

  onCLS(send);
  onFCP(send);
  onINP(send);
  onLCP(send);
  onTTFB(send);
}
