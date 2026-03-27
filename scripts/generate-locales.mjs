import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const OUT_DIR = path.join(SRC_DIR, "i18n");
const OUT_FILE = path.join(OUT_DIR, "locales.ts");
const CACHE_FILE = path.join(ROOT, "scripts", ".locale-cache.json");

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "el", label: "Ελληνικά" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "Русский" },
  { code: "fr", label: "Français" },
  { code: "hi", label: "हिन्दी" },
  { code: "he", label: "עברית" },
  { code: "tr", label: "Türkçe" },
];

function listFilesRecursive(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === "node_modules" || name === "dist" || name === "i18n") continue;
      listFilesRecursive(full, out);
    } else if (/\.(tsx|ts|jsx|js)$/.test(name)) {
      out.push(full);
    }
  }
  return out;
}

function unescapeQuoted(text) {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\");
}

function extractTranslationKeys(content) {
  const found = new Set();
  const regex = /\bt\(\s*("([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|`([^`\\]*(?:\\.[^`\\]*)*)`)\s*\)/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const raw = m[2] ?? m[3] ?? m[4] ?? "";
    if (!raw || raw.includes("${")) continue;
    const val = unescapeQuoted(raw).trim();
    if (val) found.add(val);
  }
  return found;
}

function jsString(s) {
  return JSON.stringify(s);
}

async function translateBatchMyMemory(texts, targetCode) {
  if (targetCode === "en") return [...texts];
  const sep = "__SPLIT_9f321c5b__";
  const packed = texts.join(` ${sep} `);
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", packed);
  url.searchParams.set("langpair", `en|${targetCode}`);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const translated = String(data?.responseData?.translatedText || "");
  const parts = translated.split(sep).map((s) => s.trim());
  if (parts.length !== texts.length) {
    // Fallback to one-by-one when separator handling becomes unreliable.
    const single = [];
    for (const text of texts) {
      const one = new URL("https://api.mymemory.translated.net/get");
      one.searchParams.set("q", text);
      one.searchParams.set("langpair", `en|${targetCode}`);
      const r = await fetch(one.toString());
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      single.push(String(d?.responseData?.translatedText || text));
      await new Promise((x) => setTimeout(x, 80));
    }
    return single;
  }
  return parts;
}

async function withRetry(fn, retries = 3) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const is429 = String(err?.message || "").includes("429");
      const base = is429 ? 4000 : 400;
      await new Promise((r) => setTimeout(r, base * (i + 1)));
    }
  }
  throw lastErr;
}

async function main() {
  const files = listFilesRecursive(SRC_DIR);
  const keySet = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    for (const key of extractTranslationKeys(content)) keySet.add(key);
  }
  const keys = Array.from(keySet).sort((a, b) => a.localeCompare(b));
  console.log(`Found ${keys.length} keys.`);

  const localeMap = {};
  for (const lang of LANGUAGES) {
    localeMap[lang.code] = {};
  }
  if (fs.existsSync(CACHE_FILE)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
      for (const lang of LANGUAGES) {
        localeMap[lang.code] = { ...(parsed?.[lang.code] || {}) };
      }
      console.log("Loaded existing translation cache.");
    } catch {
      // ignore malformed cache and continue with fresh map
    }
  }

  for (const key of keys) localeMap.en[key] = key;

  const BATCH_SIZE = 20;
  for (const lang of LANGUAGES) {
    if (lang.code === "en") continue;
    console.log(`Translating ${lang.code}...`);
    const missingKeys = keys.filter((key) => !localeMap[lang.code][key]);
    console.log(`  ${lang.code}: ${keys.length - missingKeys.length}/${keys.length} already cached`);
    for (let i = 0; i < missingKeys.length; i += BATCH_SIZE) {
      const chunk = missingKeys.slice(i, i + BATCH_SIZE);
      const translatedChunk = await withRetry(() => translateBatchMyMemory(chunk, lang.code), 4);
      chunk.forEach((key, idx) => {
        localeMap[lang.code][key] = translatedChunk[idx] || key;
      });
      fs.writeFileSync(CACHE_FILE, JSON.stringify(localeMap), "utf8");
      const done = keys.length - (missingKeys.length - Math.min(i + BATCH_SIZE, missingKeys.length));
      if ((i / BATCH_SIZE + 1) % 5 === 0 || i + BATCH_SIZE >= missingKeys.length) {
        console.log(`  ${lang.code}: ${done}/${keys.length}`);
      }
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const lines = [];
  lines.push("export const LOCALES: Record<string, Record<string, string>> = {");
  for (const lang of LANGUAGES) {
    lines.push(`  ${lang.code}: {`);
    for (const key of keys) {
      lines.push(`    ${jsString(key)}: ${jsString(localeMap[lang.code][key] || key)},`);
    }
    lines.push("  },");
  }
  lines.push("};");
  lines.push("");
  fs.writeFileSync(OUT_FILE, lines.join("\n"), "utf8");
  fs.writeFileSync(CACHE_FILE, JSON.stringify(localeMap), "utf8");
  console.log(`Wrote ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
