// The single place to register a language. To add one: write
// data/dictionaries/<code>.ts typed as Dictionary (see de.ts for the
// pattern), then add one line each to LOCALES and DICTIONARIES below.

import { en, type Dictionary } from "./en";
import { de } from "./de";

export type { Dictionary };

export const LOCALES = [
  { code: "en", nativeLabel: "English" },
  { code: "de", nativeLabel: "Deutsch" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: Locale = "en";

export const DICTIONARIES: Record<Locale, Dictionary> = { en, de };
