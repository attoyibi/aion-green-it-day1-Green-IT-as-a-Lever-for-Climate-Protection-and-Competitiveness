// Section 2 — the six routes, in this order, in the left rail.
// Labels live in data/dictionaries (keyed by `key`), so this file only
// carries the structure: which route, which icon, which dictionary entry.

export type NavItem = {
  href: string;
  /** Looks up label/short in t.nav[key]. */
  key: "learn" | "training" | "mediprint" | "nordcom" | "auron" | "taskMap";
  icon: "learn" | "training" | "case" | "map";
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/learn", key: "learn", icon: "learn" },
  { href: "/training", key: "training", icon: "training" },
  { href: "/case/mediprint", key: "mediprint", icon: "case" },
  { href: "/case/nordcom", key: "nordcom", icon: "case" },
  { href: "/case/auron", key: "auron", icon: "case" },
  { href: "/task-map", key: "taskMap", icon: "map" },
];
