"use client";

import { useEffect, useState } from "react";

/**
 * True only after the client has mounted. Persisted client-only state (XP,
 * streak, locale) must render its default on the server and on the client's
 * first pass, or React logs a hydration mismatch — this flag is what lets a
 * component hold that default until it is safe to swap in the real value.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
