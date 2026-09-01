// Pure data-translation helpers, deliberately separate from lib/locale.ts.
// Data files (data/*.ts) need only these — never the Zustand locale store —
// so a Server Component that imports plain case/task data at build time
// never pulls in client-only code (Zustand's `persist` touches `localStorage`,
// which does not exist during static generation and crashes the build).

/**
 * Content-layer translation. English data files stay the single source of
 * truth for structure — ids, coordinates, categories, costs, order. A
 * `*_DE` export in the same file overrides only the translatable text
 * fields, keyed by id, so the two languages can never drift out of sync in
 * shape: a German array is always the same length, in the same order, with
 * the same ids as its English source.
 *
 * Usage in a data file:
 *   const DE_TEXT: Record<string, Pick<Hotspot, "label" | "fact">> = {...};
 *   export const HOTSPOTS_DE = overlayById(HOTSPOTS, DE_TEXT);
 *
 * Usage in a component:
 *   const locale = useLocale();
 *   const hotspots = locale === "de" ? HOTSPOTS_DE : HOTSPOTS;
 */
export function overlayById<T extends { id: string }>(
  base: readonly T[],
  overrides: Record<string, Partial<T>>,
): T[] {
  return base.map((item) => ({ ...item, ...(overrides[item.id] ?? {}) }));
}

/** Same idea for a single object (a brief, a task block) that has no id to key by. */
export function overlay<T extends object>(base: T, override: Partial<T>): T {
  return { ...base, ...override };
}

/** Fills `{token}` placeholders in a dictionary string, e.g. fmt(t.case.findingsOpened, { opened: 3, total: 9 }). */
export function fmt(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (s, [key, value]) => s.replaceAll(`{${key}}`, String(value)),
    template,
  );
}
