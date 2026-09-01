"use client";

import type { Phase } from "@/lib/types";
import { useLocale } from "@/lib/locale";

const COPY = {
  en: {
    p1: {
      title: "A first move spends part of the same twelve weeks",
      desc: "A twelve-week bar. Three brackets of different lengths sit over its start, showing a short, a medium and a long first move. Whatever the bracket covers, the rest of the bar is what remains for everything else.",
      week1: "week 1",
      week12: "week 12",
      twoWeekMove: "a two-week move",
      fourWeekMove: "a four-week move",
      sevenWeekMove: "a seven-week move",
    },
    p2: {
      title: "Impact, feasibility and visibility rarely agree",
      desc: "A triangle with impact at the top, feasibility at the lower left and visibility at the lower right. A strong option usually reaches two corners and not the third.",
      impact: "Impact",
      impactSub: "how much of the footprint moves",
      feasibility: "Feasibility",
      feasibilitySub: "people, budget, authority",
      visibility: "Visibility",
      visibilitySub: "who notices outside IT",
      reachTwoLoseOne: "reach two, lose one",
    },
    p3: {
      title: "The gap between what you can evidence and what you might claim",
      desc: "Two stacked bars. The lower shows what can be evidenced today. The upper shows a larger claim. The difference between them is labelled exposure, and it is the part someone else can check.",
      mightClaim: "what you might claim",
      canEvidence: "what you can evidence today",
      exposure: "exposure: the part someone else checks",
    },
    p4: {
      title: "Ownership trades speed against survival",
      desc: "A horizontal axis from one owner on the left to shared ownership on the right. Speed falls as you move right and resilience rises. Beneath it, expertise and authority are shown as two separate things an arrangement has to supply.",
      oneOwner: "one owner",
      shared: "shared",
      decidesFastest: "decides fastest",
      survivesDeparture: "survives a departure",
      expertise: "Expertise",
      expertiseSub: "knows what to do",
      authority: "Authority",
      authoritySub: "can make it happen",
    },
  },
  de: {
    p1: {
      title: "Ein erster Schritt verbraucht einen Teil derselben zwölf Wochen",
      desc: "Ein Zwölf-Wochen-Balken. Drei unterschiedlich lange Klammern liegen über seinem Anfang und zeigen einen kurzen, einen mittleren und einen langen ersten Schritt. Was die Klammer abdeckt, ist das, was vom Balken für alles andere übrig bleibt.",
      week1: "Woche 1",
      week12: "Woche 12",
      twoWeekMove: "ein Zwei-Wochen-Schritt",
      fourWeekMove: "ein Vier-Wochen-Schritt",
      sevenWeekMove: "ein Sieben-Wochen-Schritt",
    },
    p2: {
      title: "Wirkung, Machbarkeit und Sichtbarkeit stimmen selten überein",
      desc: "Ein Dreieck mit Wirkung oben, Machbarkeit unten links und Sichtbarkeit unten rechts. Eine starke Option erreicht meist zwei Ecken und nicht die dritte.",
      impact: "Wirkung",
      impactSub: "wie viel vom Fußabdruck sich bewegt",
      feasibility: "Machbarkeit",
      feasibilitySub: "Leute, Budget, Befugnis",
      visibility: "Sichtbarkeit",
      visibilitySub: "wer außerhalb der IT es bemerkt",
      reachTwoLoseOne: "zwei erreichen, eine verlieren",
    },
    p3: {
      title: "Die Lücke zwischen dem, was du belegen kannst, und dem, was du behaupten könntest",
      desc: "Zwei gestapelte Balken. Der untere zeigt, was heute belegt werden kann. Der obere zeigt eine größere Behauptung. Der Unterschied zwischen beiden ist als Risiko markiert, und das ist der Teil, den jemand anderes prüfen kann.",
      mightClaim: "was du behaupten könntest",
      canEvidence: "was du heute belegen kannst",
      exposure: "Risiko: der Teil, den jemand anderes prüft",
    },
    p4: {
      title: "Zuständigkeit tauscht Geschwindigkeit gegen Überleben",
      desc: "Eine horizontale Achse von einer einzelnen verantwortlichen Person links bis zu geteilter Zuständigkeit rechts. Die Geschwindigkeit sinkt, je weiter rechts, und die Resilienz steigt. Darunter sind Fachwissen und Befugnis als zwei getrennte Dinge dargestellt, die eine Regelung liefern muss.",
      oneOwner: "eine Person",
      shared: "geteilt",
      decidesFastest: "entscheidet am schnellsten",
      survivesDeparture: "übersteht einen Weggang",
      expertise: "Fachwissen",
      expertiseSub: "weiß, was zu tun ist",
      authority: "Befugnis",
      authoritySub: "kann es umsetzen",
    },
  },
};

const N = "#231A45";
const P = "#5624D0";
const L = "#EEE9F9";
const LINE = "#D9D3EA";
const ASH = "#6B6484";
const WARN = "#C0721D";
const GOOD = "#2F9E5A";

function Frame({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 320 120"
      role="img"
      aria-labelledby={`${id}-t ${id}-d`}
      className="block h-auto w-full"
    >
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{desc}</desc>
      {children}
    </svg>
  );
}

const label = (x: number, y: number, text: string, fill = ASH, size = 8.5) => (
  <text x={x} y={y} fontSize={size} fill={fill}>
    {text}
  </text>
);

/**
 * One picture per phase, showing the frame rather than the options. Nothing
 * here ranks a choice — that would break the rule the whole scenario runs on.
 */
export function BriefingVisual({ phase }: { phase: Phase }) {
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;

  if (phase === "p1") {
    const c = copy.p1;
    return (
      <Frame id="bv-p1" title={c.title} desc={c.desc}>
        <rect x="10" y="70" width="300" height="16" rx="4" fill={L} stroke={LINE} />
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={10 + (i + 1) * 25} y1="70" x2={10 + (i + 1) * 25} y2="86" stroke={LINE} />
        ))}
        {label(10, 100, c.week1)}
        {label(276, 100, c.week12)}

        {[
          { w: 50, y: 20, text: c.twoWeekMove, c: GOOD },
          { w: 100, y: 38, text: c.fourWeekMove, c: P },
          { w: 175, y: 56, text: c.sevenWeekMove, c: WARN },
        ].map((b) => (
          <g key={b.text}>
            <line x1="10" y1={b.y + 6} x2={10 + b.w} y2={b.y + 6} stroke={b.c} strokeWidth="2.5" />
            <line x1="10" y1={b.y + 2} x2="10" y2={b.y + 10} stroke={b.c} strokeWidth="2.5" />
            <line x1={10 + b.w} y1={b.y + 2} x2={10 + b.w} y2={b.y + 10} stroke={b.c} strokeWidth="2.5" />
            {label(14 + b.w, b.y + 9, b.text, b.c)}
          </g>
        ))}
      </Frame>
    );
  }

  if (phase === "p2") {
    const c = copy.p2;
    return (
      <svg
        viewBox="0 0 320 150"
        role="img"
        aria-labelledby="bv-p2-t bv-p2-d"
        className="block h-auto w-full"
      >
        <title id="bv-p2-t">{c.title}</title>
        <desc id="bv-p2-d">{c.desc}</desc>

        <path d="M160 30 L286 96 L34 96 Z" fill={L} stroke={LINE} strokeWidth="1.5" />

        {/* Corner names sit outside the shape; the one note that fits goes inside. */}
        <circle cx="160" cy="30" r="5" fill={P} />
        <text x="160" y="20" textAnchor="middle" fontSize="10" fontWeight="600" fill={N}>
          {c.impact}
        </text>
        <text x="160" y="56" textAnchor="middle" fontSize="8.5" fill={ASH}>
          {c.impactSub}
        </text>

        <circle cx="34" cy="96" r="5" fill={P} />
        <text x="14" y="114" fontSize="10" fontWeight="600" fill={N}>
          {c.feasibility}
        </text>
        <text x="14" y="126" fontSize="8.5" fill={ASH}>
          {c.feasibilitySub}
        </text>

        <circle cx="286" cy="96" r="5" fill={P} />
        <text x="306" y="114" textAnchor="end" fontSize="10" fontWeight="600" fill={N}>
          {c.visibility}
        </text>
        <text x="306" y="126" textAnchor="end" fontSize="8.5" fill={ASH}>
          {c.visibilitySub}
        </text>

        <line x1="92" y1="76" x2="228" y2="76" stroke={P} strokeWidth="1.5" strokeDasharray="5 4" />
        <text x="160" y="72" textAnchor="middle" fontSize="9.5" fontWeight="600" fill={N}>
          {c.reachTwoLoseOne}
        </text>
      </svg>
    );
  }

  if (phase === "p3") {
    const c = copy.p3;
    return (
      <Frame id="bv-p3" title={c.title} desc={c.desc}>
        <rect x="10" y="26" width="230" height="22" rx="4" fill={WARN} opacity="0.25" stroke={WARN} />
        <rect x="10" y="26" width="96" height="22" rx="4" fill={GOOD} opacity="0.5" />
        {label(12, 20, c.mightClaim, WARN)}

        <rect x="10" y="72" width="96" height="22" rx="4" fill={GOOD} opacity="0.5" stroke={GOOD} />
        {label(12, 66, c.canEvidence, GOOD)}

        <line x1="106" y1="48" x2="106" y2="72" stroke={N} strokeDasharray="4 3" />
        <line x1="240" y1="48" x2="240" y2="60" stroke={N} strokeDasharray="4 3" />
        <line x1="106" y1="60" x2="240" y2="60" stroke={N} strokeWidth="1.5" />
        {label(112, 56, c.exposure, N)}
      </Frame>
    );
  }

  const c = copy.p4;
  return (
    <Frame id="bv-p4" title={c.title} desc={c.desc}>
      <line x1="24" y1="42" x2="296" y2="42" stroke={LINE} strokeWidth="2" />
      <circle cx="24" cy="42" r="5" fill={P} />
      <circle cx="296" cy="42" r="5" fill={P} />
      {label(24, 30, c.oneOwner, N, 9.5)}
      <text x="296" y="30" textAnchor="end" fontSize="9.5" fill={N}>
        {c.shared}
      </text>
      {label(24, 58, c.decidesFastest, ASH)}
      <text x="296" y="58" textAnchor="end" fontSize="8.5" fill={ASH}>
        {c.survivesDeparture}
      </text>

      <rect x="24" y="76" width="126" height="26" rx="5" fill={L} stroke={LINE} />
      <rect x="170" y="76" width="126" height="26" rx="5" fill={L} stroke={LINE} />
      {label(34, 87, c.expertise, N, 9)}
      {label(34, 97, c.expertiseSub, ASH, 8)}
      {label(180, 87, c.authority, N, 9)}
      {label(180, 97, c.authoritySub, ASH, 8)}
      <text x="160" y="93" textAnchor="middle" fontSize="11" fill={P}>
        +
      </text>
    </Frame>
  );
}
