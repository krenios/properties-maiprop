import { test, expect } from "./fixtures";
import { waitForReady } from "./helpers";

/**
 * Visual regression baselines.
 *
 * `mask` is applied to image-heavy regions so that adding/removing properties
 * or refreshing photos does not produce false-positive diffs — we still catch
 * layout, spacing, color, typography and component-state regressions.
 */

const ROUTES = ["/", "/properties", "/process", "/guides", "/greek-golden-visa"];

for (const path of ROUTES) {
  test(`visual: ${path}`, async ({ page }) => {
    await page.goto(path);
    await waitForReady(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot(
      `route${path === "/" ? "-home" : path.replace(/\//g, "-")}.png`,
      {
        fullPage: false,
        mask: [page.locator("img"), page.locator("iframe"), page.locator("video")],
      }
    );
  });
}

test("visual: lead capture bot open", async ({ page }) => {
  await page.goto("/");
  await waitForReady(page);
  const launcher = page.getByRole("button", { name: /open inquiry form/i });
  await launcher.click();
  const closeBtn = page.getByRole("button", { name: /close chat/i });
  await expect(closeBtn).toBeVisible();
  await page.waitForTimeout(400);
  await expect(page).toHaveScreenshot("lead-bot-open.png", {
    fullPage: false,
    mask: [page.locator("img"), page.locator("iframe")],
  });
});

test("visual: property modal open", async ({ page }) => {
  await page.goto("/properties");
  await waitForReady(page);
  const link = page.locator("a[href^='/property/']").first();
  await link.waitFor({ state: "attached", timeout: 15_000 });
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(500);
  await expect(page).toHaveScreenshot("property-detail.png", {
    fullPage: false,
    mask: [page.locator("img"), page.locator("iframe"), page.locator("video")],
  });
});