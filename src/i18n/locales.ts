export type LocaleDictionary = Record<string, string>;

const localeLoaders: Record<string, () => Promise<{ default: LocaleDictionary }>> = {
  "ar": () => import("./locales/ar"),
  "el": () => import("./locales/el"),
  "en": () => import("./locales/en"),
  "fr": () => import("./locales/fr"),
  "he": () => import("./locales/he"),
  "hi": () => import("./locales/hi"),
  "ru": () => import("./locales/ru"),
  "tr": () => import("./locales/tr"),
  "zh": () => import("./locales/zh"),
};

export async function loadLocale(lang: string): Promise<LocaleDictionary> {
  const loader = localeLoaders[lang];
  if (!loader) return {};
  return (await loader()).default;
}
