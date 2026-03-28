import fs from "node:fs";
import path from "node:path";

const target = path.join(process.cwd(), "src", "i18n", "locales.ts");
let src = fs.readFileSync(target, "utf8");

const values = [
  "Rate limit reached",
  "Επιτεύχθηκε όριο αιτημάτων",
  "تم الوصول إلى حد المعدل",
  "已达到速率限制",
  "Достигнут лимит запросов",
  "Limite de débit atteinte",
  "रेट लिमिट पहुंच गई",
  "הגעת למגבלת קצב",
  "Hiz limiti asildi",
];

let i = 0;
src = src.replace(/(\s+"Please wait a moment and try again\.":\s+".*?",\r?\n)/g, (m) => {
  const v = values[i] || values[0];
  i += 1;
  return `${m}    "Rate limit reached": ${JSON.stringify(v)},\n`;
});

fs.writeFileSync(target, src, "utf8");
console.log(`Inserted rate-limit key in ${i} locales.`);
