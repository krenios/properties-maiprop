import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 8080);
const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;
const isCI = !!process.env.CI;
const chromiumExecutable = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

export default defineConfig({
  testDir: "./tests/e2e",
  snapshotDir: "./tests/e2e/__screenshots__",
  snapshotPathTemplate: "{snapshotDir}/{testFilePath}/{arg}-{projectName}{ext}",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  reporter: [["list"]],
  expect: {
    // Visual diffs: small thresholds prevent noise from anti-aliasing.
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
      caret: "hide",
    },
  },
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    // Required when running as root in CI / sandbox environments.
    // Also handled per-project for the mobile descriptor.
    launchOptions: chromiumExecutable
      ? { executablePath: chromiumExecutable, args: ["--no-sandbox"] }
      : undefined,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        defaultBrowserType: "chromium",
        viewport: { width: 390, height: 844 },
        launchOptions: chromiumExecutable
          ? { executablePath: chromiumExecutable, args: ["--no-sandbox"] }
          : { args: ["--no-sandbox"] },
      },
    },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "bun run dev",
        url: `http://localhost:${PORT}`,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});