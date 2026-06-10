import { test, expect } from "./fixtures";
import { waitForReady } from "./helpers";

test.describe("Modals & overlays", () => {
  test("lead capture bot opens and closes", async ({ page }) => {
    await page.goto("/");
    await waitForReady(page);

    // The bot launcher is a floating button bottom-right.
    const launcher = page.getByRole("button", { name: /open inquiry form/i });
    await expect(launcher).toBeVisible();
    await launcher.click();

    // The bot panel isn't a semantic dialog; assert on its dedicated close button.
    const closeBtn = page.getByRole("button", { name: /close chat/i });
    await expect(closeBtn).toBeVisible({ timeout: 5_000 });
    await closeBtn.click();
    await expect(closeBtn).toBeHidden({ timeout: 3_000 });
  });

  test("property card opens detail modal or page", async ({ page }) => {
    await page.goto("/properties");
    await waitForReady(page);

    const detailLink = page.locator("a[href^='/property/']").first();
    await detailLink.waitFor({ state: "attached", timeout: 15_000 });
    await detailLink.scrollIntoViewIfNeeded();
    await detailLink.click();
    await page.waitForURL(/\/property\//, { timeout: 10_000 });
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});