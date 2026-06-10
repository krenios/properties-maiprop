import { test, expect } from "./fixtures";
import { waitForReady, expectNoConsoleErrors } from "./helpers";

const PUBLIC_ROUTES = [
  "/",
  "/properties",
  "/portfolio",
  "/trackrecord",
  "/process",
  "/guides",
  "/golden-visa-for-indian-investors",
  "/golden-visa-for-chinese-investors",
  "/250k-golden-visa-properties",
  "/greek-golden-visa",
];

for (const path of PUBLIC_ROUTES) {
  test(`route ${path} renders without console errors`, async ({ page }) => {
    await expectNoConsoleErrors(page, async () => {
      const res = await page.goto(path);
      expect(res?.status(), `HTTP status for ${path}`).toBeLessThan(400);
      await waitForReady(page);
      await expect(page.locator("h1").first()).toBeVisible();
      // Document title set
      await expect(page).toHaveTitle(/.+/);
    });
  });
}