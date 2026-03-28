import fs from "node:fs";

const keys = JSON.parse(fs.readFileSync("src/i18n/translation-keys.json", "utf8"));
const src = fs.readFileSync("src/i18n/locales.ts", "utf8");
const start = src.indexOf("  en: {");
const end = src.indexOf("  el: {");
const block = src.slice(start, end);
const keySet = new Set(Array.from(block.matchAll(/^\s+"([^"]+)":/gm)).map((m) => m[1]));
const missing = keys.filter((k) => !keySet.has(k));
console.log(missing.join("\n"));
