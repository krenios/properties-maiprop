import { Page, expect } from "@playwright/test";

/**
 * Wait for the app to be visually settled:
 *  - main content rendered
 *  - lazy images either loaded or in error state
 *  - any framer-motion entry animations complete
 */
export async function waitForReady(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForFunction(() => document.querySelector("h1") !== null, null, {
    timeout: 15_000,
  });
  // Force lazy images into view, then wait for them to finish loading.
  await page.evaluate(() =>
    document.querySelectorAll<HTMLImageElement>("img[loading='lazy']").forEach((img) => {
      img.loading = "eager";
    })
  );
  await page
    .waitForFunction(() => {
      const imgs = Array.from(document.images);
      return imgs.every((i) => i.complete);
    }, null, { timeout: 10_000 })
    .catch(() => {});
  // small settle for framer-motion / reveal animations
  await page.waitForTimeout(400);
}

export async function dismissOverlays(page: Page) {
  // Cookie banner is suppressed via storageState, but if it ever appears, kill it.
  const banner = page.getByRole("dialog", { name: /cookie consent/i });
  if (await banner.isVisible().catch(() => false)) {
    await page.getByRole("button", { name: /accept/i }).click();
  }
}

export async function expectNoConsoleErrors(page: Page, fn: () => Promise<void>) {
  const errors: string[] = [];
  const onError = (msg: { type: () => string; text: () => string }) => {
    if (msg.type() === "error") errors.push(msg.text());
  };
  page.on("console", onError);
  try {
    await fn();
  } finally {
    page.off("console", onError);
  }
  // Filter out known noisy third-party errors that aren't our bugs.
  const ours = errors.filter(
    (e) =>
      !/google|gtag|analytics|maps|recaptcha|turnstile|favicon|net::ERR_|status of 401|status of 403|user_roles|lovable\.dev|lovable\.app\/badge/i.test(
        e
      )
  );
  expect(ours, `Unexpected console errors:\n${ours.join("\n")}`).toEqual([]);
}