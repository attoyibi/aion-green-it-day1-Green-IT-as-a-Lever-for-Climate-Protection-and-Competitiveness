"use client";

import clsx from "clsx";
import { ARTIFACTS, ARTIFACTS_DE, type Artifact } from "@/data/meridian";
import { fmt, useLocale } from "@/lib/locale";
import { Collapsible } from "./Collapsible";
import { StakeholderAvatar } from "./StakeholderAvatar";
import { FigureArtwork, OrgChart, SlideMockup, StackedBar } from "./ScenarioArt";

const COPY = {
  en: {
    emailFrom: "Email from {fromName} ({role}), {time}. Subject: {subject}.",
    messageIn: "Message in {channel} from {fromName} ({role}), {time}: {message}",
    memoFrom: "Memo from {fromName} to {to}, {date}. Subject: {subject}.",
    calendarEntry: "Calendar entry: {title}. {day} {time}. With {attendees}.",
    draftSlide: "Draft presentation slide with an empty headline and four empty bullets.",
    orgChartEmpty: "Organisation chart with Green IT ownership left empty.",
    to: "To",
    from: "From",
    date: "Date",
    marketingDraft: "Marketing: draft v2",
    whatIsBehind: "What is behind the number",
  },
  de: {
    emailFrom: "E-Mail von {fromName} ({role}), {time}. Betreff: {subject}.",
    messageIn: "Nachricht in {channel} von {fromName} ({role}), {time}: {message}",
    memoFrom: "Memo von {fromName} an {to}, {date}. Betreff: {subject}.",
    calendarEntry: "Kalendereintrag: {title}. {day} {time}. Mit {attendees}.",
    draftSlide: "Entwurf einer Präsentationsfolie mit leerer Headline und vier leeren Aufzählungspunkten.",
    orgChartEmpty: "Organigramm, in dem die Zuständigkeit für Green IT noch offen ist.",
    to: "An",
    from: "Von",
    date: "Datum",
    marketingDraft: "Marketing: Entwurf v2",
    whatIsBehind: "Was hinter der Zahl steckt",
  },
};

/**
 * NS3: artifacts never label themselves as consequences. They arrive as mail,
 * messages and documents, and the reader draws the conclusion.
 */
export function ArtifactCard({ id, plain = false }: { id: string; plain?: boolean }) {
  const locale = useLocale();
  const artifacts = locale === "de" ? ARTIFACTS_DE : ARTIFACTS;
  const a = artifacts[id];
  if (!a) return null;
  return plain ? <PlainText a={a} /> : <Framed a={a} />;
}

/** R8: the linearised version for the "read this phase as text" toggle. */
function PlainText({ a }: { a: Artifact }) {
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;
  const lines: string[] = [];

  if (a.kind === "email") {
    lines.push(fmt(copy.emailFrom, { fromName: a.fromName, role: a.role, time: a.time, subject: a.subject }));
    lines.push(...a.body);
  } else if (a.kind === "slack") {
    lines.push(
      fmt(copy.messageIn, {
        channel: a.channel,
        fromName: a.fromName,
        role: a.role,
        time: a.time,
        message: a.message,
      }),
    );
  } else if (a.kind === "memo") {
    lines.push(fmt(copy.memoFrom, { fromName: a.fromName, to: a.to, date: a.date, subject: a.subject }));
    lines.push(...a.body);
  } else if (a.kind === "calendar") {
    lines.push(
      fmt(copy.calendarEntry, {
        title: a.title,
        day: a.day,
        time: a.time,
        attendees: a.attendees.join(", "),
      }),
    );
  } else if (a.kind === "dashboard") {
    lines.push(a.title);
    lines.push(...a.segments.map((s) => `${s.label}: ${s.value}%`));
    lines.push(a.caption);
    for (const d of a.details) lines.push(`${d.label}: ${d.points.join(" ")}`);
  } else if (a.kind === "slide") {
    lines.push(copy.draftSlide);
  } else if (a.kind === "orgchart") {
    lines.push(copy.orgChartEmpty);
  } else {
    lines.push(`${a.title}. ${a.desc}${a.caption ? ` ${a.caption}` : ""}`);
  }

  return (
    <div className="border-b border-line py-2">
      {lines.map((line, i) => (
        <p key={i} className="text-body text-ink">
          {line}
        </p>
      ))}
    </div>
  );
}

function Framed({ a }: { a: Artifact }) {
  const locale = useLocale();
  const copy = locale === "de" ? COPY.de : COPY.en;
  if (a.kind === "email") {
    return (
      <article className="motion-safe:animate-[artifactIn_240ms_ease-out] rounded-2xl border border-line bg-paper p-4">
        <div className="flex items-start gap-3">
          <StakeholderAvatar who={a.from} size={40} />
          <div className="min-w-0 flex-1">
            <p className="text-body font-semibold text-ink">
              {a.fromName} <span className="font-normal text-ash">· {a.role}</span>
            </p>
            {a.to ? (
              <p className="text-caption text-ash">
                {copy.to}: {a.to}
              </p>
            ) : null}
          </div>
          <span className="flex shrink-0 items-center gap-2 text-caption tabular-nums text-ash">
            {a.time}
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <path d="M3 8l9 6 9-6" />
            </svg>
          </span>
        </div>

        <hr className="my-3 border-line" />

        <h4 className={clsx("mb-2 text-h3 text-ink", a.forwarded && "text-ash")}>
          {a.subject}
        </h4>
        {a.body.map((p, i) => (
          <p key={i} className="mb-1.5 text-body text-ink last:mb-0">
            {p}
          </p>
        ))}
      </article>
    );
  }

  if (a.kind === "slack") {
    return (
      <article className="motion-safe:animate-[artifactIn_240ms_ease-out] rounded-2xl bg-lilac p-3">
        <div className="flex items-start gap-2.5">
          <StakeholderAvatar who={a.from} size={24} />
          <div className="min-w-0">
            <p className="text-caption text-ash">
              <span className="font-semibold text-navy">{a.fromName}</span> · {a.channel} ·{" "}
              <span className="tabular-nums">{a.time}</span>
            </p>
            <p className="mt-1 text-body text-ink">{a.message}</p>
          </div>
        </div>
      </article>
    );
  }

  if (a.kind === "memo") {
    return (
      <article className="motion-safe:animate-[artifactIn_240ms_ease-out] rounded-2xl border border-line border-t-4 border-t-navy bg-paper p-4">
        <dl className="mb-3 grid grid-cols-[auto,1fr] gap-x-3 text-caption tabular-nums text-ash">
          <dt>{copy.from}</dt>
          <dd className="text-navy">{a.fromName}</dd>
          <dt>{copy.to}</dt>
          <dd className="text-navy">{a.to}</dd>
          <dt>{copy.date}</dt>
          <dd className="text-navy">{a.date}</dd>
        </dl>
        <h4 className="mb-2 text-h3 text-ink">{a.subject}</h4>
        {a.body.map((p, i) => (
          <p key={i} className="text-body text-ink">
            {p}
          </p>
        ))}
      </article>
    );
  }

  if (a.kind === "calendar") {
    return (
      <article className="motion-safe:animate-[artifactIn_240ms_ease-out] flex gap-3 rounded-2xl border border-line bg-paper p-4">
        <span className="w-1 shrink-0 rounded-full bg-purple" />
        <div className="min-w-0">
          <p className="text-readout tabular-nums text-ink">
            {a.day} · {a.time}
          </p>
          <p className="mt-1 text-body font-semibold text-ink">{a.title}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {a.attendees.map((who) => (
              <span key={who} className="rounded-full bg-lilac px-2 py-0.5 text-caption text-navy">
                {who}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  }

  if (a.kind === "dashboard") {
    return (
      <article className="motion-safe:animate-[artifactIn_240ms_ease-out] rounded-2xl border border-line bg-paper p-4">
        <h4 className="mb-3 text-h3 text-ink">{a.title}</h4>
        <div className="overflow-hidden rounded-lg">
          <StackedBar id={a.id} segments={a.segments} />
        </div>
        <ul className="mt-3 space-y-1">
          {a.segments.map((s) => (
            <li key={s.label} className="flex items-baseline justify-between gap-3 text-body">
              <span className="text-ink">{s.label}</span>
              <span className="tabular-nums text-ash">{s.value}%</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-caption text-ash">{a.caption}</p>

        <div className="mt-3 space-y-2">
          {a.details.map((d) => (
            <Collapsible key={d.label} label={d.label} hint={copy.whatIsBehind}>
              <ul className="list-disc space-y-1 pl-5">
                {d.points.map((point) => (
                  <li key={point} className="text-caption text-ink">
                    {point}
                  </li>
                ))}
              </ul>
            </Collapsible>
          ))}
        </div>
      </article>
    );
  }

  if (a.kind === "slide") {
    return (
      <article className="motion-safe:animate-[artifactIn_240ms_ease-out] rounded-2xl border border-line bg-paper p-4">
        <SlideMockup id={a.id} />
        <p className="mt-2 text-caption uppercase tracking-wide text-ash">
          {copy.marketingDraft}
        </p>
      </article>
    );
  }

  if (a.kind === "orgchart") {
    return (
      <article className="motion-safe:animate-[artifactIn_240ms_ease-out] rounded-2xl border border-line bg-paper p-4">
        <OrgChart id={a.id} />
      </article>
    );
  }

  return (
    <article className="motion-safe:animate-[artifactIn_240ms_ease-out] rounded-2xl border border-line bg-paper p-4">
      <FigureArtwork id={a.id} art={a.art} title={a.title} desc={a.desc} />
      <p className="mt-2 text-body font-semibold text-ink">{a.title}</p>
      <p className="text-caption text-ash">{a.desc}</p>
      {a.caption ? (
        <p className="mt-2 rounded-lg border-l-4 border-line bg-lilac/40 p-2 text-caption text-navy">
          {a.caption}
        </p>
      ) : null}
    </article>
  );
}
