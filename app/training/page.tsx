"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { TrainingGround } from "@/components/training/TrainingGround";
import { GlossaryReference } from "@/components/ui/GlossaryReference";
import { useLocale } from "@/lib/locale";

const COPY = {
  en: {
    eyebrow: "Tab 2",
    title: "Training Ground",
    intro:
      "Fifteen situations from practice, one at a time. Every company here is invented. None of them are the companies you are assessed on.",
    howThisWorks: "How this works",
    steps: [
      "Read the situation, then pick the category you think it belongs to.",
      "The card opens: what it is, who it affects, the fix, and the rule to take with you.",
      "Being wrong costs nothing. The explanation is the point, not the score.",
    ],
    scores: [
      {
        term: "XP",
        detail: "Five points for each category you match. It measures ground covered, nothing else.",
      },
      {
        term: "Streak",
        detail: "Matches in a row. It resets on a miss and there is no penalty for that.",
      },
      {
        term: "Badges",
        detail:
          "The deck holds three cards per category, so a badge lights when all three matched. A badge that will not light is naming the category worth re-reading.",
      },
    ],
    mentorLabel: "For the mentor: ",
    mentorBody:
      "ask the room to commit out loud before the reveal. Two participants disagreeing on a borderline card teaches more than the card does. Any underlined word opens its plain-language definition, and the full glossary is at the bottom.",
  },
  de: {
    eyebrow: "Tab 2",
    title: "Trainingsbereich",
    intro:
      "Fünfzehn Situationen aus der Praxis, eine nach der anderen. Jedes Unternehmen hier ist erfunden. Keines davon ist eines der Unternehmen, an denen du bewertet wirst.",
    howThisWorks: "So funktioniert das",
    steps: [
      "Lies die Situation, dann wähle die Kategorie, zu der sie deiner Meinung nach gehört.",
      "Die Karte öffnet sich: was es ist, wen es betrifft, die Lösung und die Regel, die du mitnimmst.",
      "Falsch liegen kostet nichts. Die Erklärung ist der Punkt, nicht die Punktzahl.",
    ],
    scores: [
      {
        term: "XP",
        detail:
          "Fünf Punkte für jede Kategorie, die du richtig zuordnest. Es misst nur, wie viel du bearbeitet hast, sonst nichts.",
      },
      {
        term: "Serie",
        detail:
          "Richtige Zuordnungen in Folge. Sie setzt sich bei einem Fehler zurück, ohne dass das eine Strafe wäre.",
      },
      {
        term: "Abzeichen",
        detail:
          "Der Stapel enthält drei Karten pro Kategorie, ein Abzeichen leuchtet also, wenn alle drei richtig zugeordnet wurden. Ein Abzeichen, das nicht leuchtet, zeigt dir, welche Kategorie es wert ist, noch einmal gelesen zu werden.",
      },
    ],
    mentorLabel: "Für Mentor:innen: ",
    mentorBody:
      "bitte die Gruppe, sich laut festzulegen, bevor du aufdeckst. Wenn zwei Teilnehmende bei einer Grenzfall-Karte uneinig sind, lehrt das mehr als die Karte selbst. Jedes unterstrichene Wort öffnet seine allgemeinverständliche Definition, das vollständige Glossar steht ganz unten.",
  },
};

export default function TrainingPage() {
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />

      <section
        aria-labelledby="how-it-works"
        className="mb-6 rounded-2xl border border-line p-5"
      >
        <h2 id="how-it-works" className="mb-3 text-h3 text-ink">
          {copy.howThisWorks}
        </h2>

        <ol className="mb-4 space-y-2">
          {copy.steps.map((step, i) => (
            <li key={step} className="flex gap-3 text-body text-ink">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-caption font-semibold text-paper">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <dl className="grid gap-3 border-t border-line pt-4 md:grid-cols-3">
          {copy.scores.map((score) => (
            <div key={score.term}>
              <dt className="text-body font-semibold text-ink">{score.term}</dt>
              <dd className="mt-1 text-caption text-ash">{score.detail}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 border-t border-line pt-4 text-caption text-navy">
          <span className="font-semibold">{copy.mentorLabel}</span>
          {copy.mentorBody}
        </p>
      </section>

      <TrainingGround />

      <GlossaryReference />
    </div>
  );
}
