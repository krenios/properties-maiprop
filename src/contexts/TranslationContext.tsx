import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "el", label: "Ελληνικά", flag: "🇬🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "he", label: "עברית", flag: "🇮🇱" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
];

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (text: string) => string;
  isTranslating: boolean;
  clearCache: () => void;
}

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  t: (text) => text,
  isTranslating: false,
});

export const useTranslation = () => useContext(TranslationContext);

const STORAGE_KEY = "mai_prop_language";
// Bump this version string whenever the site copy changes significantly to bust stale caches.
const CACHE_VERSION = "v1";
const CACHE_KEY = `mai_prop_translation_cache_${CACHE_VERSION}`;

/** Load persisted cache from localStorage (survives page reloads AND browser restarts) */
function loadCache(): Record<string, Record<string, string>> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

/** Persist cache to localStorage — only translations for this page-visit are stored */
function saveCache(cache: Record<string, Record<string, string>>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Quota exceeded: clear only old translation caches and retry
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("mai_prop_translation_cache_") && k !== CACHE_KEY)
        .forEach((k) => localStorage.removeItem(k));
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch { /* give up silently */ }
  }
}

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || "en"; } catch { return "en"; }
  });
  const [isTranslating, setIsTranslating] = useState(false);
  // Cache: { [lang]: { [originalText]: translatedText } } — pre-seeded from sessionStorage
  const cache = useRef<Record<string, Record<string, string>>>(loadCache());
  // All registered texts across the lifetime of the app
  const pendingTexts = useRef<Set<string>>(new Set());
  // Debounce timer for batching newly-encountered texts
  const batchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [, forceRender] = useState(0);

  // Apply persisted RTL/lang direction on initial mount
  React.useEffect(() => {
    document.documentElement.dir = (language === "ar" || language === "he") ? "rtl" : "ltr";
    document.documentElement.lang = language;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const translateBatch = useCallback(async (lang: string, texts: string[]) => {
    if (texts.length === 0) return;
    setIsTranslating(true);
    try {
      const BATCH_SIZE = 50;
      const targetLang = LANGUAGES.find((l) => l.code === lang)?.label || lang;
      if (!cache.current[lang]) cache.current[lang] = {};

      for (let i = 0; i < texts.length; i += BATCH_SIZE) {
        const chunk = texts.slice(i, i + BATCH_SIZE);
        const { data, error } = await supabase.functions.invoke("translate", {
          body: { texts: chunk, targetLang },
        });
        if (error) throw error;
        const translated: string[] = data?.translated || chunk;
        chunk.forEach((original, j) => {
          cache.current[lang][original] = translated[j] || original;
        });
      }
      // Persist updated cache to sessionStorage so navigating pages doesn't re-call AI
      saveCache(cache.current);
      forceRender((n) => n + 1);
    } catch (err) {
      console.error("Translation error:", err);
      toast.error("Translation failed. Showing original text.");
    } finally {
      setIsTranslating(false);
    }
  }, []);

  const scheduleBatch = useCallback((lang: string) => {
    if (batchTimeout.current) clearTimeout(batchTimeout.current);
    batchTimeout.current = setTimeout(() => {
      const uncached = Array.from(pendingTexts.current).filter(
        (text) => !cache.current[lang]?.[text]
      );
      if (uncached.length > 0) translateBatch(lang, uncached);
    }, 120);
  }, [translateBatch]);

  const setLanguage = useCallback(
    (lang: string) => {
      setLanguageState(lang);
      try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }

      document.documentElement.dir = (lang === "ar" || lang === "he") ? "rtl" : "ltr";
      document.documentElement.lang = lang;

      if (lang === "en") {
        forceRender((n) => n + 1);
        return;
      }
      scheduleBatch(lang);
    },
    [scheduleBatch]
  );

  // KEY FIX: t() schedules a batch whenever it encounters a text not yet in cache.
  // This fires on every route/page change so new texts are always translated.
  const t = useCallback(
    (text: string): string => {
      if (language === "en") return text;
      pendingTexts.current.add(text);
      if (!cache.current[language]?.[text]) {
        // Debounce — group all texts that render in the same frame into one request
        scheduleBatch(language);
      }
      return cache.current[language]?.[text] || text;
    },
    [language, scheduleBatch]
  );

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, isTranslating }}>
      {children}
      {isTranslating && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2.5 rounded-full border border-primary/30 bg-background/90 backdrop-blur-md px-5 py-2.5 shadow-lg shadow-black/20"
          aria-live="polite"
          aria-label="Translating page content"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-medium text-foreground">Translating…</span>
        </div>
      )}
    </TranslationContext.Provider>
  );
};
