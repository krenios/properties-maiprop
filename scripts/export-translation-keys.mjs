import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const OUT_FILE = path.join(ROOT, "src", "i18n", "translation-keys.json");

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

function main() {
  const files = listFilesRecursive(SRC_DIR);
  const set = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    for (const key of extractTranslationKeys(content)) set.add(key);
  }
  const keys = Array.from(set).sort((a, b) => a.localeCompare(b));
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(keys, null, 2), "utf8");
  console.log(`Wrote ${keys.length} keys to ${OUT_FILE}`);
}

main();
