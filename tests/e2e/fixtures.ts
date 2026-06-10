import { test as base, expect } from "@playwright/test";

/**
 * Seeds localStorage on every page so the cookie banner is auto-dismissed
 * regardless of which origin the app ends up on (preview / custom domain
 * redirects can cross origins).
 */
export const test = base.extend({
  context: async ({ context }, use) => {
    await context.addInitScript(() => {
      try {
        window.localStorage.setItem("cookie-consent", "accepted");
      } catch {
        /* localStorage may be unavailable before navigation */
      }
    });
    await use(context);
  },
});

export { expect };