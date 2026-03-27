import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const keysPath = path.join(ROOT, "src", "i18n", "translation-keys.json");
const localesPath = path.join(ROOT, "src", "i18n", "locales.ts");

const keys = JSON.parse(fs.readFileSync(keysPath, "utf8"));
const source = fs.readFileSync(localesPath, "utf8");

const languageCodes = ["en", "el", "ar", "zh", "ru", "fr", "hi", "he", "tr"];

function extractBlock(code) {
  const start = source.indexOf(`  ${code}: {`);
  if (start === -1) return null;
  const nextStarts = languageCodes
    .map((c) => source.indexOf(`  ${c}: {`, start + 1))
    .filter((idx) => idx !== -1);
  const end = nextStarts.length > 0 ? Math.min(...nextStarts) : source.indexOf("};", start);
  return source.slice(start, end);
}

let hasError = false;
for (const code of languageCodes) {
  const block = extractBlock(code);
  if (!block) {
    hasError = true;
    console.log(`${code}: missing entire locale block`);
    continue;
  }

  const keyMatches = Array.from(block.matchAll(/^\s+"([^"\\]*(?:\\.[^"\\]*)*)":/gm)).map((m) => JSON.parse(`"${m[1]}"`));
  const keySet = new Set(keyMatches);
  const missing = keys.filter((k) => !keySet.has(k));
  const extras = keyMatches.filter((k) => !keys.includes(k));

  console.log(`${code}: ${keySet.size}/${keys.length} keys | missing=${missing.length} extra=${extras.length}`);
  if (missing.length > 0 || extras.length > 0) {
    hasError = true;
    if (missing.length > 0) console.log(`  sample missing: ${missing.slice(0, 5).join(" | ")}`);
    if (extras.length > 0) console.log(`  sample extra: ${extras.slice(0, 5).join(" | ")}`);
  }
}

if (hasError) process.exit(1);
