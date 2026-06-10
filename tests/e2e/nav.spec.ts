import { test, expect } from "./fixtures";
import { waitForReady } from "./helpers";

test.describe("Navigation", () => {
  test("desktop nav links route correctly", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop-only nav test");
    await page.goto("/");
    await waitForReady(page);

    const cases: Array<[string | RegExp, RegExp]> = [
      [/track record/i, /\/(trackrecord|portfolio)/],
      [/^properties$/i, /\/properties/],
      [/process/i, /\/process/],
    ];

    for (const [label, urlRe] of cases) {
      await page.goto("/");
      await waitForReady(page);
      const link = page.getByRole("link", { name: label }).first();
      await expect(link).toBeVisible();
      await link.click();
      await expect(page).toHaveURL(urlRe);
      await expect(page.locator("h1").first()).toBeVisible();
    }
  });

  test("mobile hamburger opens and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-only nav test");
    await page.goto("/");
    await waitForReady(page);

    const toggle = page.getByRole("button", { name: /open menu|menu/i }).first();
    await expect(toggle).toBeVisible();
    // Tap-target ≥ 44px
    const box = await toggle.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

    await toggle.click();
    // After open: a Properties link should be reachable
    const propLink = page.getByRole("link", { name: /^properties$/i }).first();
    await expect(propLink).toBeVisible();
    await propLink.click();
    await expect(page).toHaveURL(/\/properties/);
  });
});