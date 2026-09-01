"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { W1Comparator } from "@/components/learn/W1Comparator";
import { W2FlipCards } from "@/components/learn/W2FlipCards";
import { W3Sorter } from "@/components/learn/W3Sorter";
import { CategoryPrimer } from "@/components/learn/CategoryPrimer";
import { MeridianScenario } from "@/components/scenario/MeridianScenario";
import { W10ServiceLife } from "@/components/learn/W10ServiceLife";
import { GlossaryReference } from "@/components/ui/GlossaryReference";
import { W7OrgChart } from "@/components/learn/W7OrgChart";
import { W8Roadmap } from "@/components/learn/W8Roadmap";
import { W9Symbolic } from "@/components/learn/W9Symbolic";
import { useLocale } from "@/lib/locale";

// The three levels of the Day 1 curriculum. Objectives are the mentor's
// contract with the room: what a participant can do afterwards.
const LEVELS_BY_LOCALE = {
  en: [
    {
      id: "l1",
      pill: "L1: Knowledge",
      summary: "Understand the terms, and place Green IT's strategic relevance",
      objectives: [
        "Understand the vocabulary and the basics of Green IT.",
        "Place why Green IT is strategically relevant for a company.",
        "Distinguish and assess IT's contribution to climate protection.",
      ],
    },
    {
      id: "l2",
      pill: "L2: Application",
      summary: "Find the fields of action, and name the goal conflicts",
      objectives: [
        "Recognise Green IT fields of action inside a company.",
        "Derive a first set of priorities for measures and steering.",
        "Analyse goal conflicts between economics, sustainability and feasibility.",
      ],
    },
    {
      id: "l3",
      pill: "L3: Management decision",
      summary: "Treat Green IT as a steering topic, and decide under uncertainty",
      objectives: [
        "Position Green IT as a leadership and steering topic at company level.",
        "Take responsibility for priorities, governance and decisions under uncertainty.",
      ],
    },
  ],
  de: [
    {
      id: "l1",
      pill: "L1: Wissen",
      summary: "Begriffe verstehen und die strategische Relevanz von Green IT einordnen",
      objectives: [
        "Das Vokabular und die Grundlagen von Green IT verstehen.",
        "Einordnen, warum Green IT für ein Unternehmen strategisch relevant ist.",
        "Den Beitrag der IT zum Klimaschutz unterscheiden und bewerten.",
      ],
    },
    {
      id: "l2",
      pill: "L2: Anwendung",
      summary: "Handlungsfelder finden und Zielkonflikte benennen",
      objectives: [
        "Green-IT-Handlungsfelder innerhalb eines Unternehmens erkennen.",
        "Eine erste Priorisierung für Maßnahmen und Steuerung ableiten.",
        "Zielkonflikte zwischen Wirtschaftlichkeit, Nachhaltigkeit und Umsetzbarkeit analysieren.",
      ],
    },
    {
      id: "l3",
      pill: "L3: Managemententscheidung",
      summary: "Green IT als Steuerungsthema behandeln und unter Unsicherheit entscheiden",
      objectives: [
        "Green IT als Führungs- und Steuerungsthema auf Unternehmensebene positionieren.",
        "Verantwortung für Prioritäten, Governance und Entscheidungen unter Unsicherheit übernehmen.",
      ],
    },
  ],
};

const WIDGETS_BY_ID: Record<string, React.ReactNode> = {
  l1: (
    <>
      <W1Comparator />
      <W2FlipCards />
      <W10ServiceLife />
      <CategoryPrimer />
      <W3Sorter />
    </>
  ),
  l2: <MeridianScenario layout="inline" />,
  l3: (
    <>
      <W7OrgChart />
      <W8Roadmap />
      <W9Symbolic />
    </>
  ),
};

const COPY = {
  en: {
    eyebrow: "Tab 1",
    title: "Learn",
    intro:
      "Eleven widgets across three levels. Each one is something you do, not something you read, and each gives you a figure from real practice that you can check. This tab tells you when you are right or wrong on purpose. It is the safe place to get things wrong.",
    mentorLabel: "How to use this as a mentor: ",
    mentorBody:
      "run one level per block. Let the room attempt each widget before you explain anything. The widgets are built so that being wrong is the teaching moment. The “From the field” notes carry the numbers you will be challenged on, with the source next to them.",
    canDo: "After this level, a participant can",
  },
  de: {
    eyebrow: "Tab 1",
    title: "Lernen",
    intro:
      "Elf Module über drei Stufen. Jedes davon ist etwas, das du tust, nicht etwas, das du liest, und jedes gibt dir eine Zahl aus der Praxis, die du überprüfen kannst. Dieser Tab sagt dir, wann du bewusst richtig oder falsch liegst. Es ist der sichere Ort, um Fehler zu machen.",
    mentorLabel: "Für Mentor:innen: ",
    mentorBody:
      "Bearbeite eine Stufe pro Block. Lass die Gruppe jedes Modul zuerst selbst versuchen, bevor du etwas erklärst. Die Module sind so gebaut, dass ein Fehler der Lernmoment ist. Die Hinweise „Aus der Praxis“ enthalten die Zahlen, auf die du angesprochen wirst, mit der Quelle direkt daneben.",
    canDo: "Nach dieser Stufe kann eine teilnehmende Person",
  },
};

export default function LearnPage() {
  const locale = useLocale();
  const isDe = locale === "de";
  const copy = isDe ? COPY.de : COPY.en;
  const levels = isDe ? LEVELS_BY_LOCALE.de : LEVELS_BY_LOCALE.en;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />

      <p className="mb-6 rounded-2xl border-l-4 border-purple bg-lilac/60 p-4 text-body text-navy">
        <span className="font-semibold">{copy.mentorLabel}</span>
        {copy.mentorBody}
      </p>

      <Accordion
        defaultOpen="l1"
        items={levels.map((level) => ({
          id: level.id,
          pill: level.pill,
          summary: level.summary,
          content: (
            <>
              <div className="rounded-xl border border-line p-4">
                <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-ash">
                  {copy.canDo}
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  {level.objectives.map((objective) => (
                    <li key={objective} className="text-body text-ink">
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              {WIDGETS_BY_ID[level.id]}
            </>
          ),
        }))}
      />

      <GlossaryReference />
    </div>
  );
}
