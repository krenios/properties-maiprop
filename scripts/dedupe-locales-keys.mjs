import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "src", "i18n", "locales.ts");
const src = fs.readFileSync(file, "utf8");
const lines = src.split(/\r?\n/);

const langStarts = [];
for (let i = 0; i < lines.length; i++) {
  if (/^  [a-z]{2}: \{$/.test(lines[i])) langStarts.push(i);
}

for (let b = 0; b < langStarts.length; b++) {
  const start = langStarts[b] + 1;
  const end = b + 1 < langStarts.length ? langStarts[b + 1] - 1 : lines.findIndex((l, idx) => idx > start && l === "};");
  const keyToLastIndex = new Map();
  for (let i = start; i < end; i++) {
    const m = lines[i].match(/^\s+"([^"]+)":\s/);
    if (m) keyToLastIndex.set(m[1], i);
  }
  for (let i = end - 1; i >= start; i--) {
    const m = lines[i].match(/^\s+"([^"]+)":\s/);
    if (!m) continue;
    if (keyToLastIndex.get(m[1]) !== i) lines[i] = "";
  }
}

fs.writeFileSync(file, lines.filter((l) => l !== "").join("\n"), "utf8");
console.log("Deduped duplicate keys per locale block.");
