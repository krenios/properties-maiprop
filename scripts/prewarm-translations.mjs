import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const ENV_PATH = path.join(ROOT, ".env");

const LANGUAGES = [
  { code: "el", label: "Ελληνικά" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "Русский" },
  { code: "fr", label: "Français" },
  { code: "hi", label: "हिन्दी" },
  { code: "he", label: "עברית" },
  { code: "tr", label: "Türkçe" },
];

function readEnvFile(filePath) {
  const env = {};
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

function listFilesRecursive(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === "node_modules" || name === "dist") continue;
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
    if (!raw) continue;
    if (raw.includes("${")) continue;
    const val = unescapeQuoted(raw).trim();
    if (!val) continue;
    found.add(val);
  }
  return found;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function main() {
  if (!fs.existsSync(ENV_PATH)) throw new Error(".env not found");
  const env = readEnvFile(ENV_PATH);
  const url = env.VITE_SUPABASE_URL;
  const anon = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !anon) throw new Error("Missing Supabase URL/key in .env");

  const supabase = createClient(url, anon, { auth: { persistSession: false } });

  const files = listFilesRecursive(SRC_DIR);
  const keys = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    for (const k of extractTranslationKeys(content)) keys.add(k);
  }
  const allKeys = Array.from(keys).sort((a, b) => a.localeCompare(b));
  console.log(`Found ${allKeys.length} translation keys from t("...").`);
  if (allKeys.length === 0) return;

  const chunks = chunk(allKeys, 50);

  for (const lang of LANGUAGES) {
    console.log(`\nPrewarming ${lang.code} (${lang.label})...`);

    for (const c of chunks) {
      const { error } = await supabase.functions.invoke("translate", {
        body: { texts: c, targetLang: lang.label, cacheOnly: false },
      });
      if (error) throw new Error(`translate invoke failed (${lang.code}): ${error.message}`);
    }

    let verified = 0;
    let missing = 0;
    for (const c of chunks) {
      const { data, error } = await supabase
        .from("translation_cache")
        .select("source_text")
        .eq("target_lang", lang.label)
        .in("source_text", c);
      if (error) throw new Error(`verification failed (${lang.code}): ${error.message}`);
      const hit = new Set((data || []).map((r) => r.source_text));
      verified += hit.size;
      missing += c.length - hit.size;
    }
    console.log(`Verified: ${verified}/${allKeys.length} saved, missing: ${missing}`);
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
