import fs from "node:fs";
import path from "node:path";

const target = path.join(process.cwd(), "src", "i18n", "locales.ts");
let src = fs.readFileSync(target, "utf8");

const perLangInsertions = [
  [
    ["All rights reserved.", "All rights reserved."],
    ["Article not found.", "Article not found."],
    ["Article regenerated", "Article regenerated"],
    ["Browse all €250K+ Golden Visa properties in Greece", "Browse all €250K+ Golden Visa properties in Greece"],
    ["Failed to generate article", "Failed to generate article"],
    ["Fresh AI content has been saved.", "Fresh AI content has been saved."],
    ["Golden Visa Eligible Properties", "Golden Visa Eligible Properties"],
    ["Please wait a moment and try again.", "Please wait a moment and try again."],
    ["Pre-verified properties ready for €250K+ Golden Visa investment in Greece.", "Pre-verified properties ready for €250K+ Golden Visa investment in Greece."],
  ],
  [
    ["All rights reserved.", "Με επιφύλαξη παντός δικαιώματος."],
    ["Article not found.", "Το άρθρο δεν βρέθηκε."],
    ["Article regenerated", "Το άρθρο αναδημιουργήθηκε"],
    ["Browse all €250K+ Golden Visa properties in Greece", "Δείτε όλα τα ακίνητα Golden Visa €250K+ στην Ελλάδα"],
    ["Failed to generate article", "Αποτυχία δημιουργίας άρθρου"],
    ["Fresh AI content has been saved.", "Το νέο περιεχόμενο AI αποθηκεύτηκε."],
    ["Golden Visa Eligible Properties", "Ακίνητα επιλέξιμα για Golden Visa"],
    ["Please wait a moment and try again.", "Παρακαλώ περιμένετε λίγο και δοκιμάστε ξανά."],
    ["Pre-verified properties ready for €250K+ Golden Visa investment in Greece.", "Προελεγμένα ακίνητα έτοιμα για επένδυση Golden Visa €250K+ στην Ελλάδα."],
  ],
  [
    ["All rights reserved.", "جميع الحقوق محفوظة."],
    ["Article not found.", "لم يتم العثور على المقال."],
    ["Article regenerated", "تمت إعادة إنشاء المقال"],
    ["Browse all €250K+ Golden Visa properties in Greece", "تصفح جميع عقارات التأشيرة الذهبية بقيمة 250 ألف يورو+ في اليونان"],
    ["Failed to generate article", "فشل إنشاء المقال"],
    ["Fresh AI content has been saved.", "تم حفظ محتوى الذكاء الاصطناعي الجديد."],
    ["Golden Visa Eligible Properties", "عقارات مؤهلة للتأشيرة الذهبية"],
    ["Please wait a moment and try again.", "يرجى الانتظار لحظة ثم المحاولة مرة أخرى."],
    ["Pre-verified properties ready for €250K+ Golden Visa investment in Greece.", "عقارات تم التحقق منها مسبقًا وجاهزة لاستثمار التأشيرة الذهبية بقيمة 250 ألف يورو+ في اليونان."],
  ],
  [
    ["All rights reserved.", "版权所有。"],
    ["Article not found.", "未找到文章。"],
    ["Article regenerated", "文章已重新生成"],
    ["Browse all €250K+ Golden Visa properties in Greece", "浏览希腊所有 €250K+ 黄金签证房产"],
    ["Failed to generate article", "文章生成失败"],
    ["Fresh AI content has been saved.", "新的 AI 内容已保存。"],
    ["Golden Visa Eligible Properties", "符合黄金签证资格的房产"],
    ["Please wait a moment and try again.", "请稍候后重试。"],
    ["Pre-verified properties ready for €250K+ Golden Visa investment in Greece.", "已预审核的房产，可用于在希腊进行 €250K+ 黄金签证投资。"],
  ],
  [
    ["All rights reserved.", "Все права защищены."],
    ["Article not found.", "Статья не найдена."],
    ["Article regenerated", "Статья сгенерирована заново"],
    ["Browse all €250K+ Golden Visa properties in Greece", "Смотреть все объекты Golden Visa от €250K в Греции"],
    ["Failed to generate article", "Не удалось сгенерировать статью"],
    ["Fresh AI content has been saved.", "Новый AI-контент сохранен."],
    ["Golden Visa Eligible Properties", "Объекты, подходящие для Golden Visa"],
    ["Please wait a moment and try again.", "Пожалуйста, подождите немного и попробуйте снова."],
    ["Pre-verified properties ready for €250K+ Golden Visa investment in Greece.", "Предварительно проверенные объекты, готовые для инвестиций в Golden Visa от €250K в Греции."],
  ],
  [
    ["All rights reserved.", "Tous droits réservés."],
    ["Article not found.", "Article introuvable."],
    ["Article regenerated", "Article régénéré"],
    ["Browse all €250K+ Golden Visa properties in Greece", "Parcourir toutes les propriétés Golden Visa à 250 K€+ en Grèce"],
    ["Failed to generate article", "Échec de la génération de l'article"],
    ["Fresh AI content has been saved.", "Le nouveau contenu IA a été enregistré."],
    ["Golden Visa Eligible Properties", "Propriétés éligibles au Golden Visa"],
    ["Please wait a moment and try again.", "Veuillez patienter un instant et réessayer."],
    ["Pre-verified properties ready for €250K+ Golden Visa investment in Greece.", "Propriétés pré-vérifiées prêtes pour un investissement Golden Visa de 250 K€+ en Grèce."],
  ],
  [
    ["All rights reserved.", "सर्वाधिकार सुरक्षित।"],
    ["Article not found.", "लेख नहीं मिला।"],
    ["Article regenerated", "लेख पुनः जनरेट किया गया"],
    ["Browse all €250K+ Golden Visa properties in Greece", "ग्रीस में सभी €250K+ गोल्डन वीज़ा प्रॉपर्टीज़ देखें"],
    ["Failed to generate article", "लेख जनरेट करने में विफल"],
    ["Fresh AI content has been saved.", "नया AI कंटेंट सेव कर दिया गया है।"],
    ["Golden Visa Eligible Properties", "गोल्डन वीज़ा के लिए पात्र प्रॉपर्टीज़"],
    ["Please wait a moment and try again.", "कृपया थोड़ी देर प्रतीक्षा करें और फिर से प्रयास करें।"],
    ["Pre-verified properties ready for €250K+ Golden Visa investment in Greece.", "ग्रीस में €250K+ गोल्डन वीज़ा निवेश के लिए तैयार प्री-वेरिफाइड प्रॉपर्टीज़।"],
  ],
  [
    ["All rights reserved.", "כל הזכויות שמורות."],
    ["Article not found.", "המאמר לא נמצא."],
    ["Article regenerated", "המאמר נוצר מחדש"],
    ["Browse all €250K+ Golden Visa properties in Greece", "עיינו בכל נכסי Golden Visa של €250K+ ביוון"],
    ["Failed to generate article", "יצירת המאמר נכשלה"],
    ["Fresh AI content has been saved.", "תוכן AI חדש נשמר."],
    ["Golden Visa Eligible Properties", "נכסים זכאים ל-Golden Visa"],
    ["Please wait a moment and try again.", "אנא המתינו רגע ונסו שוב."],
    ["Pre-verified properties ready for €250K+ Golden Visa investment in Greece.", "נכסים מאומתים מראש המוכנים להשקעת Golden Visa של €250K+ ביוון."],
  ],
  [
    ["All rights reserved.", "Tum haklari saklidir."],
    ["Article not found.", "Makale bulunamadi."],
    ["Article regenerated", "Makale yeniden olusturuldu"],
    ["Browse all €250K+ Golden Visa properties in Greece", "Yunanistan'daki tum €250K+ Golden Visa gayrimenkullerine goz at"],
    ["Failed to generate article", "Makale olusturulamadi"],
    ["Fresh AI content has been saved.", "Yeni yapay zeka icerigi kaydedildi."],
    ["Golden Visa Eligible Properties", "Golden Visa'ya uygun gayrimenkuller"],
    ["Please wait a moment and try again.", "Lutfen bir an bekleyin ve tekrar deneyin."],
    ["Pre-verified properties ready for €250K+ Golden Visa investment in Greece.", "Yunanistan'da €250K+ Golden Visa yatirimi icin hazir, onaylanmis gayrimenkuller."],
  ],
];

let replaceCount = 0;
src = src.replace(/(\s+"All Properties":\s+".*?",\r?\n)/g, (m) => {
  const rows = perLangInsertions[replaceCount] || [];
  replaceCount += 1;
  const add = rows.map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n");
  return `${m}${add}\n`;
});

fs.writeFileSync(target, src, "utf8");
console.log(`Injected entries for ${replaceCount} locale blocks.`);
