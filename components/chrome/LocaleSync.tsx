"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/locale";

/**
 * Static export has no per-request server, so `<html lang>` can't be set
 * from the URL or a cookie at render time. It starts as "en" (the default
 * locale) and this syncs it once the persisted choice hydrates on the client.
 */
export function LocaleSync() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
