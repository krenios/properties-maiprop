/**
 * Google Ads conversion tracking helpers.
 * Centralises the conversion ID and label constants so inline gtag calls
 * don't scatter magic strings across components.
 */

export const CONVERSION_ID = "AW-17031338731";

/** Conversion labels */
export const CONVERSION_LABELS = {
  CONTACT: "OAyuCMKFiP0bEOu1lrk_",
} as const;

/**
 * Fire a Google Ads conversion event.
 * @param label  - A CONVERSION_LABELS value (or any string label)
 * @param value  - Optional monetary value to attach to the conversion
 */
export function trackConversion(label: string, value?: number): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: `${CONVERSION_ID}/${label}`,
    ...(value !== undefined ? { value, currency: "EUR" } : {}),
  });
}
