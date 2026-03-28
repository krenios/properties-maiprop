import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "src", "i18n", "locales.ts");
let src = fs.readFileSync(file, "utf8");

const base = {
  "+4.2% YoY": "+4.2% YoY",
  "AI Investment Score": "AI Investment Score",
  "Also in the ecosystem": "Also in the ecosystem",
  "Attica €/m² Trend": "Attica €/m² Trend",
  "Auctions/mo": "Auctions/mo",
  "Find Your Perfect Greek": "Find Your Perfect Greek",
  "Greece's #1 AI Property Portal": "Greece's #1 AI Property Portal",
  "Judicial Auctions": "Judicial Auctions",
  Listings: "Listings",
  "LIVE DATA": "LIVE DATA",
  "Live Greek Real Estate Index": "Live Greek Real Estate Index",
  "Market Intelligence": "Market Intelligence",
  "Min GV": "Min GV",
  "one ecosystem": "one ecosystem",
  "Search properties, areas…": "Search properties, areas…",
  "Two platforms,": "Two platforms,",
  "Your Ecosystem Partner": "Your Ecosystem Partner",
};

const tr = {
  "+4.2% YoY": "+%4,2 Yillik",
  "AI Investment Score": "YZ Yatirim Puani",
  "Also in the ecosystem": "Ekosistemde ayrica",
  "Attica €/m² Trend": "Attika €/m² Trendi",
  "Auctions/mo": "Acik Artirma/ay",
  "Find Your Perfect Greek": "Size uygun Yunanistan'daki en iyi",
  "Greece's #1 AI Property Portal": "Yunanistan'in 1 Numarali YZ Emlak Portali",
  "Judicial Auctions": "Yargisal Acik Artirmalar",
  Listings: "Ilanlar",
  "LIVE DATA": "CANLI VERI",
  "Live Greek Real Estate Index": "Canli Yunanistan Gayrimenkul Endeksi",
  "Market Intelligence": "Pazar Istihbarati",
  "Min GV": "Min GV",
  "one ecosystem": "tek ekosistem",
  "Search properties, areas…": "Mulk, bolge ara…",
  "Two platforms,": "Iki platform,",
  "Your Ecosystem Partner": "Ekosistem ortaginiz",
};

const byLang = [base, base, base, base, base, base, base, base, tr];

let idx = 0;
src = src.replace(/(\s+"Your questions,":\s+".*?",\r?\n)/g, (m) => {
  const set = byLang[idx] || base;
  idx += 1;
  const rows = Object.entries(set).map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n");
  return `${m}${rows}\n`;
});

fs.writeFileSync(file, src, "utf8");
console.log(`Inserted platform keys in ${idx} locale blocks.`);
