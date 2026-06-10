import { test, expect } from "./fixtures";
import { waitForReady } from "./helpers";

test("property page renders for first listing", async ({ page }) => {
  await page.goto("/properties");
  await waitForReady(page);

  const link = page.locator("a[href^='/property/']").first();
  await link.waitFor({ state: "attached", timeout: 15_000 });
  await link.scrollIntoViewIfNeeded();
  await link.click();

  // Must reach a property detail context (page or modal)
  await page.waitForLoadState("networkidle").catch(() => {});
  const heading = page.locator("h1, h2").first();
  await expect(heading).toBeVisible({ timeout: 8_000 });
  // Price (€) should be visible somewhere
  await expect(page.locator("text=/€\\s?\\d/").first()).toBeVisible();
});