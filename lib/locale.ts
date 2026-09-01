"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEFAULT_LOCALE, DICTIONARIES, type Dictionary, type Locale } from "@/data/dictionaries";
import {
  CATEGORIES,
  CATEGORIES_DE,
  CATEGORY_BY_CODE,
  CATEGORY_BY_CODE_DE,
  type Category,
  type CategoryCode,
} from "@/data/categories";
import { useHydrated } from "./useHydrated";

export type { Locale };
export { LOCALES, DEFAULT_LOCALE } from "@/data/dictionaries";
// Re-exported for convenience — components may import these from either
// module. Data files must import them from lib/i18nData directly (see that
// file for why: it keeps data/*.ts free of the client-only Zustand store).
export { fmt, overlay, overlayById } from "./i18nData";

type LocaleState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

/** Separate from the progress store: switching language should never touch XP, streak or badges. */
export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: DEFAULT_LOCALE,
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "aion-greenit-m1-locale",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/** The active locale, defaulting to English until the persisted choice hydrates. */
export function useLocale(): Locale {
  const hydrated = useHydrated();
  const locale = useLocaleStore((s) => s.locale);
  return hydrated ? locale : DEFAULT_LOCALE;
}

/** The dictionary for the active locale. Read `t.section.key` in any client component. */
export function useT(): Dictionary {
  return DICTIONARIES[useLocale()];
}

/** The five fixed Green IT categories, with `name` resolved to the active locale. */
export function useCategories(): { categories: Category[]; byCode: Record<CategoryCode, Category> } {
  const locale = useLocale();
  return locale === "de"
    ? { categories: CATEGORIES_DE, byCode: CATEGORY_BY_CODE_DE }
    : { categories: CATEGORIES, byCode: CATEGORY_BY_CODE };
}
