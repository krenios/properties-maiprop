import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("Bundling v4 (property-focused promo)...");
const bundled = await bundle({
  entryPoint: path.resolve(__dirname, "../src/index.ts"),
  webpackOverride: (config) => config,
});

console.log("Opening browser...");
const browser = await openBrowser("chrome", {
  browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/bin/chromium",
  chromiumOptions: {
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  },
  chromeMode: "chrome-for-testing",
});

console.log("Selecting composition main-v4...");
const composition = await selectComposition({
  serveUrl: bundled,
  id: "main-v4",
  puppeteerInstance: browser,
});

console.log(`Rendering ${composition.durationInFrames} frames at ${composition.fps}fps (portrait)...`);
await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: "/mnt/documents/property-promo-v4.mp4",
  puppeteerInstance: browser,
  muted: true,
  concurrency: 1,
});

console.log("Done! Closing browser...");
await browser.close({ silent: false });
console.log("Video saved to /mnt/documents/property-promo-v4.mp4");
