// Training Ground content. Section 8 of the build prompt.
// N3: generic or invented companies only — never MediPrint, NordCom or Auron.

import type { CategoryCode } from "./categories";
import type { FieldNote } from "./learn";

export type Verdict = "green" | "amber" | "red";

export type PracticeCard = {
  id: string;
  /** One line of scene-setting, so the snippet is not read cold. */
  setting: string;
  snippet: string;
  /** Glossary ids to link inside this card's text. */
  terms: string[];
  /** A nudge towards the diagnostic question. Never names the category. */
  hint: string;
  correctCategory: CategoryCode;
  verdict: Verdict;
  whatItIs: string;
  whoItAffects: string;
  fixBefore: string;
  fixAfter: string;
  /** The transferable rule — what to carry into your own organisation. */
  principle: string;
  note?: FieldNote;
};

export const VERDICT_LABEL: Record<Verdict, string> = {
  green: "Working as intended",
  amber: "Costly habit",
  red: "Structural gap",
};

export const CARDS: PracticeCard[] = [
  {
    id: "t01",
    hint:
      "Nothing is consumed and nothing is bought here. Ask what is simply running while nobody benefits from it.",
    setting:
      "A road freight company with one office building. Facilities manages the building; IT manages the servers inside it. Neither owns the schedule.",
    terms: ["hvac"],
    snippet:
      "GreenLog Freight leaves its office HVAC running through weekends “because nobody wanted to change the schedule”.",
    correctCategory: "E",
    verdict: "amber",
    whatItIs: "Standing energy draw with no user benefit.",
    whoItAffects: "Facilities and IT share responsibility; nobody owns it.",
    fixBefore: "24/7 HVAC.",
    fixAfter: "Scheduled setback plus a named owner.",
    principle:
      "When a waste survives because changing it belongs to nobody, the fix is an owner, not a device.",
  },
  {
    id: "t02",
    hint:
      "The laptops still worked. Ask what was destroyed that had already been paid for, in cash and in carbon.",
    setting:
      "A retail chain consolidating two offices into one over a single weekend, with a moving contractor paid by the hour.",
    terms: ["skip", "embodied-carbon"],
    snippet:
      "Kestrel Retail throws working 4-year-old laptops in the skip during an office move.",
    correctCategory: "R",
    verdict: "red",
    whatItIs: "Embedded carbon and materials discarded early.",
    whoItAffects: "Finance (write-off), IT (disposal), the sustainability report.",
    fixBefore: "Disposal.",
    fixAfter: "Refurbish, then secondary use or donation.",
    principle:
      "A working device thrown away destroys value that was already paid for, in cash and in carbon.",
    note: {
      text: "Around 80% of a laptop's lifetime carbon is spent in manufacturing, before first boot. Discarding a working four-year-old machine throws away a cost that has almost nothing left to give back.",
      source: "techCarbon",
    },
  },
  {
    id: "t03",
    hint:
      "The compute happens either way. Ask what changes when you move the same work somewhere else.",
    setting:
      "A data analytics firm choosing where to run a training job. Cloud providers price the same service differently by location.",
    terms: ["cloud-region", "grid-mix", "finops", "sci"],
    snippet:
      "Novara Analytics trains a large model in a coal-heavy region because it is 12% cheaper.",
    correctCategory: "Em",
    verdict: "red",
    whatItIs: "Compute-driven emissions inflated by the grid mix.",
    whoItAffects: "Data science, cloud FinOps, sustainability reporting.",
    fixBefore: "Region chosen on cost alone.",
    fixAfter: "Region weighted for carbon intensity as well as cost.",
    principle:
      "Same workload, same code, different grid. Emissions can differ by a multiple. Region is a decision, not a default.",
    note: {
      text: "Carbon-aware placement and scheduling is reported to cut workload emissions by 2 to 10 times with no application change. The SCI standard (ISO/IEC 21031:2024) counts this properly and deliberately excludes offsets, so the score only improves through real change.",
      source: "sci",
    },
  },
  {
    id: "t04",
    hint:
      "The equipment and the network are both fine. Ask whose habit, or whose default setting, is driving the load.",
    setting:
      "A consultancy where every meeting is remote by default. The video tool ships with its highest quality preset switched on.",
    terms: ["endpoint"],
    snippet:
      "Halden Group teams routinely default to 4K video and screen-share in every internal call.",
    correctCategory: "U",
    verdict: "amber",
    whatItIs: "Bandwidth and endpoint energy up with no meeting benefit.",
    whoItAffects: "Every user; IT sets the defaults.",
    fixBefore: "4K default.",
    fixAfter: "720p default, HD on request.",
    principle:
      "Changing a default changes thousands of decisions at once. Asking people to choose better changes almost none.",
    note: {
      text: "The energy split for streaming is not where most people expect: viewing devices about 72%, transmission 23%, data centres 5%. Earlier figures blaming the network overstated it by up to 50x. Lowering the default resolution acts on the endpoint, which is the large share.",
      source: "ieaStreaming",
    },
  },
  {
    id: "t05",
    hint:
      "Nothing physical is happening here at all. Ask what is missing from the org chart.",
    setting:
      "An engineering group that bought a monitoring tool after a board discussion about sustainability. It has been live for eight months.",
    terms: ["kpi"],
    snippet:
      "Ferronova has bought a Green IT dashboard but nobody is accountable for its numbers.",
    correctCategory: "G",
    verdict: "red",
    whatItIs: "A tool without ownership, so the metrics are ignored.",
    whoItAffects: "Board, CIO, the sustainability lead who does not exist yet.",
    fixBefore: "Unowned tool.",
    fixAfter: "Named owner plus a monthly review in an existing meeting.",
    principle:
      "Measurement without accountability is decoration. Buy the owner before you buy the tool.",
  },
  {
    id: "t06",
    hint:
      "This one is a good decision, not a gap. Ask which meter goes down as a result.",
    setting:
      "A bank with its own server room. Someone questioned the temperature setting, and measurements were taken before anything was changed.",
    terms: ["setpoint", "data-hall", "thermal-survey", "pue"],
    snippet:
      "Marlin Bank raises its data-hall setpoint from 20 °C to 24 °C after a thermal survey.",
    correctCategory: "E",
    verdict: "green",
    whatItIs: "Cooling load cut with no reliability trade-off.",
    whoItAffects: "Facilities and IT operations.",
    fixBefore: "Kept as is.",
    fixAfter: "Publish the setpoint and repeat the thermal survey annually.",
    principle:
      "The survey is what makes this defensible. The same change without evidence is a gamble that happened to work.",
    note: {
      text: "Cooling is the main thing PUE measures. In Germany this is now regulated: existing data centres must reach an annual PUE of 1.5 by July 2027 and 1.3 by July 2030, with a 2026 draft amendment proposing 1.6 and 1.4 instead.",
      source: "enefg",
    },
  },
  {
    id: "t07",
    hint:
      "Nothing is switched on. Ask what is sitting still that was expensive to make.",
    setting:
      "An insurer that replaced its monitors last year and kept the old ones rather than deciding what to do with them.",
    terms: ["embodied-carbon"],
    snippet: "Otterbrook Insurance keeps a stockroom of 3-year-old monitors “in case”.",
    correctCategory: "R",
    verdict: "amber",
    whatItIs: "Dormant capital and dormant embedded carbon.",
    whoItAffects: "IT asset management.",
    fixBefore: "Hoard.",
    fixAfter: "Reuse in training rooms, or donate.",
    principle:
      "Hoarding feels prudent and reads as waste on any inventory. Set a shelf-life for spares, the way you would for stock.",
  },
  {
    id: "t08",
    hint:
      "No IT system is at fault here. Ask what goes into the air because a digital option was not taken.",
    setting:
      "A media group whose leadership team is spread across four offices in different countries.",
    terms: [],
    snippet: "Salix Media flies 8 people to a 2-hour internal review each month.",
    correctCategory: "Em",
    verdict: "amber",
    whatItIs: "Avoidable travel emissions.",
    whoItAffects: "The business unit and the travel policy owner.",
    fixBefore: "Monthly flight.",
    fixAfter: "Quarterly in person, monthly remote.",
    principle:
      "This is IT as enabler. The emissions sit outside IT, but the alternative is IT's to make good enough to choose.",
  },
  {
    id: "t09",
    hint:
      "The screens are justified; the hours are not. Ask which pattern of use you would change.",
    setting:
      "A manufacturer that installed production dashboards on large wall screens across the factory floor.",
    terms: ["shopfloor"],
    snippet:
      "Delton Manufacturing keeps 40 shopfloor screens streaming a dashboard 24/7 that only day-shift supervisors read.",
    correctCategory: "U",
    verdict: "red",
    whatItIs: "Always-on display for a part-time audience.",
    whoItAffects: "Operations and IT.",
    fixBefore: "24/7.",
    fixAfter: "Scheduled on during shifts, motion-off outside them.",
    principle:
      "Match the runtime to the audience, not to the equipment's capability.",
  },
  {
    id: "t10",
    hint:
      "No device, no electricity, no material. Ask which document is missing a section.",
    setting:
      "A logistics company that published a sustainability strategy last year, written by a team that did not include anyone from IT.",
    terms: ["kpi"],
    snippet: "Astra Freight has a sustainability strategy but IT is not in it.",
    correctCategory: "G",
    verdict: "amber",
    whatItIs: "A strategy without IT scope, which is a blind spot by construction.",
    whoItAffects: "Board, CSO, CIO.",
    fixBefore: "IT absent from scope.",
    fixAfter: "IT written into scope, with its own KPIs.",
    principle:
      "If IT is not named in the strategy, no IT budget holder is obliged to act on it. Scope is permission.",
  },
  {
    id: "t11",
    hint:
      "Same shape as the first card. Ask what is drawing power while the building is empty.",
    setting:
      "A healthcare provider with six sites and no central rule about what happens to a computer at the end of the day.",
    terms: ["patch-window", "wake-on-lan"],
    snippet:
      "Cormorant Health's monitors and desktops stay powered on overnight across 6 sites.",
    correctCategory: "E",
    verdict: "amber",
    whatItIs: "Standing endpoint draw.",
    whoItAffects: "IT policy and users.",
    fixBefore: "No power policy.",
    fixAfter: "Enforced sleep, with wake-on-LAN for patch windows.",
    principle:
      "The usual objection is patching. Answer it before you propose the policy and the objection disappears.",
  },
  {
    id: "t12",
    hint:
      "The scanners are replaced on a date, not on a fault. Ask what is thrown out while it still works.",
    setting:
      "A food distributor whose warehouse scanners are supplied under a framework agreement written five years ago.",
    terms: ["refresh-cycle", "e-waste"],
    snippet:
      "Vibrant Foods replaces all warehouse handheld scanners every year under the vendor's default contract.",
    correctCategory: "R",
    verdict: "red",
    whatItIs: "Contract-driven refresh rather than need-driven.",
    whoItAffects: "Procurement and operations.",
    fixBefore: "Annual swap.",
    fixAfter: "Condition-based swap on a 3-year contract.",
    principle:
      "Refresh cycles are usually inherited from a contract nobody has reread. The renewal date is your intervention point.",
    note: {
      text: "62 million tonnes of e-waste were generated in 2022 and only 22.3% was formally collected and recycled. Contract-driven refresh is one of the quiet engines behind that number.",
      source: "ewaste",
    },
  },
  {
    id: "t13",
    hint:
      "Nothing was bought and no code was changed. Ask what got cleaner when only the clock moved.",
    setting:
      "A utility that runs its reporting jobs on a schedule nobody has questioned since the system was installed.",
    terms: ["batch", "load-shift", "grid-mix"],
    snippet:
      "Northlake Utilities moves batch reports to run overnight during off-peak, lower-carbon hours.",
    correctCategory: "Em",
    verdict: "green",
    whatItIs: "A load shift with a carbon benefit.",
    whoItAffects: "Data platform team and sustainability.",
    fixBefore: "Kept as is.",
    fixAfter: "Publish the runtime shift and the intensity delta.",
    principle:
      "Deferrable work is the cheapest carbon lever in most estates, because nothing has to be bought or rewritten.",
  },
  {
    id: "t14",
    hint:
      "The storage is working exactly as configured. Ask which behaviour keeps filling it.",
    setting:
      "A law firm where every matter generates dozens of document versions, and nobody has ever been told when to delete one.",
    terms: ["redundant", "retention-policy", "canonical-store"],
    snippet:
      "Bracken Legal saves every draft, revision and email attachment on three redundant file shares.",
    correctCategory: "U",
    verdict: "amber",
    whatItIs: "Storage sprawl driving avoidable capacity.",
    whoItAffects: "IT and records management.",
    fixBefore: "Three-times redundancy by default.",
    fixAfter: "A retention policy plus a single canonical store.",
    principle:
      "Storage sprawl is bought twice: once as capacity, and again at the next hardware refresh.",
  },
  {
    id: "t15",
    hint:
      "Ask who is accountable for this, and against which starting number it will be measured.",
    setting:
      "A retailer whose board announced a sustainability commitment in a press release ahead of an investor meeting.",
    terms: ["net-zero", "baseline"],
    snippet:
      "Zephyr Retail's board declares “net zero IT by 2030” with no baseline, no owner, and no budget.",
    correctCategory: "G",
    verdict: "red",
    whatItIs: "An announcement without architecture.",
    whoItAffects: "Board and CIO.",
    fixBefore: "Press release.",
    fixAfter: "Baseline, owner, budget and milestones, then the announcement.",
    principle:
      "A target with no baseline cannot be missed or met, only argued about. That is the reputational risk, not the target itself.",
  },
];

/** Correct answers needed in one category before its badge lights up. */
export const BADGE_THRESHOLD = 3;

// ---- German (DE) ----
// Same ids, same order, same correctCategory/verdict values as CARDS. Only
// the learner-facing prose is translated. Invented company names (GreenLog
// Freight, Kestrel Retail, Novara Analytics, Halden Group, Ferronova,
// Marlin Bank, Otterbrook Insurance, Salix Media, Delton Manufacturing,
// Astra Freight, Cormorant Health, Vibrant Foods, Northlake Utilities,
// Bracken Legal, Zephyr Retail) are proper nouns and stay unchanged.

export const VERDICT_LABEL_DE: typeof VERDICT_LABEL = {
  green: "Funktioniert wie vorgesehen",
  amber: "Teure Gewohnheit",
  red: "Strukturelle Lücke",
};

export const CARDS_DE: typeof CARDS = [
  {
    id: "t01",
    hint:
      "Hier wird nichts verbraucht und nichts gekauft. Frag dich, was einfach weiterläuft, ohne dass jemand davon profitiert.",
    setting:
      "Ein Straßenspediteur mit einem einzigen Bürogebäude. Das Facility Management verantwortet das Gebäude, die IT die Server darin. Für den Zeitplan ist keiner von beiden zuständig.",
    terms: ["hvac"],
    snippet:
      "GreenLog Freight lässt die Bürolüftung (HVAC) auch am Wochenende durchlaufen, „weil niemand den Zeitplan ändern wollte“.",
    correctCategory: "E",
    verdict: "amber",
    whatItIs: "Dauerhafter Energieverbrauch ohne Nutzen für irgendjemanden.",
    whoItAffects: "Facility Management und IT teilen sich die Verantwortung – zuständig ist am Ende niemand.",
    fixBefore: "Klimatechnik rund um die Uhr.",
    fixAfter: "Zeitgesteuerte Absenkung plus benannter Verantwortlicher.",
    principle:
      "Wenn eine Verschwendung nur deshalb fortbesteht, weil niemand dafür zuständig ist, ist die Lösung ein Verantwortlicher – kein Gerät.",
  },
  {
    id: "t02",
    hint:
      "Die Laptops funktionierten noch. Frag dich, was hier vernichtet wurde, das bereits bezahlt war – in Geld und in CO₂.",
    setting:
      "Eine Einzelhandelskette legt an einem einzigen Wochenende zwei Büros zu einem zusammen, mit einer stundenweise bezahlten Umzugsfirma.",
    terms: ["skip", "embodied-carbon"],
    snippet:
      "Kestrel Retail wirft bei einem Büroumzug funktionstüchtige, vier Jahre alte Laptops in den Container.",
    correctCategory: "R",
    verdict: "red",
    whatItIs: "Graue Emissionen und Materialien, vorzeitig entsorgt.",
    whoItAffects: "Finanzabteilung (Abschreibung), IT (Entsorgung), der Nachhaltigkeitsbericht.",
    fixBefore: "Entsorgung.",
    fixAfter: "Aufbereiten, dann Weiternutzung oder Spende.",
    principle:
      "Ein funktionstüchtiges, weggeworfenes Gerät vernichtet einen Wert, der bereits bezahlt wurde – in Geld und in CO₂.",
    note: {
      text: "Rund 80 % der CO₂-Emissionen über die Lebensdauer eines Laptops entstehen bereits in der Herstellung, vor dem ersten Einschalten. Wer ein funktionstüchtiges, vier Jahre altes Gerät entsorgt, wirft Kosten weg, die kaum noch etwas zurückgeben.",
      source: "techCarbon",
    },
  },
  {
    id: "t03",
    hint:
      "Die Rechenleistung fällt so oder so an. Frag dich, was sich ändert, wenn du dieselbe Arbeit woanders ausführen lässt.",
    setting:
      "Ein Datenanalyse-Unternehmen entscheidet, wo ein Trainingsjob laufen soll. Cloud-Anbieter bepreisen denselben Dienst je nach Standort unterschiedlich.",
    terms: ["cloud-region", "grid-mix", "finops", "sci"],
    snippet:
      "Novara Analytics trainiert ein großes Modell in einer kohlelastigen Region, weil das 12 % günstiger ist.",
    correctCategory: "Em",
    verdict: "red",
    whatItIs: "Rechenleistungsbedingte Emissionen, aufgebläht durch den Strommix.",
    whoItAffects: "Data Science, FinOps, Nachhaltigkeitsberichterstattung.",
    fixBefore: "Region allein nach Kosten gewählt.",
    fixAfter: "Region unter Berücksichtigung von CO₂-Intensität und Kosten gewählt.",
    principle:
      "Gleiche Last, gleicher Code, anderes Stromnetz. Die Emissionen können sich um ein Vielfaches unterscheiden. Die Region ist eine Entscheidung, keine Voreinstellung.",
    note: {
      text: "CO₂-bewusste Platzierung und Zeitplanung senkt die Emissionen einer Workload Berichten zufolge um das 2- bis 10-Fache, ohne dass die Anwendung verändert wird. Der SCI-Standard (ISO/IEC 21031:2024) erfasst das korrekt und schließt Kompensationen bewusst aus, sodass sich der Wert nur durch echte Veränderung verbessert.",
      source: "sci",
    },
  },
  {
    id: "t04",
    hint:
      "Ausrüstung und Netzwerk sind beide in Ordnung. Frag dich, wessen Gewohnheit oder wessen Voreinstellung die Last verursacht.",
    setting:
      "Eine Beratungsfirma, in der jedes Meeting standardmäßig remote stattfindet. Das Videotool ist werkseitig auf die höchste Qualitätsstufe eingestellt.",
    terms: ["endpoint"],
    snippet:
      "Teams bei der Halden Group nutzen in jedem internen Call standardmäßig 4K-Video und Bildschirmfreigabe.",
    correctCategory: "U",
    verdict: "amber",
    whatItIs: "Höherer Bandbreiten- und Endgeräteverbrauch ohne Mehrwert für das Meeting.",
    whoItAffects: "Jeder Nutzer; die Voreinstellungen legt die IT fest.",
    fixBefore: "4K als Standard.",
    fixAfter: "720p als Standard, HD auf Anfrage.",
    principle:
      "Eine Voreinstellung zu ändern, verändert Tausende Entscheidungen auf einmal. Menschen zu bitten, besser zu wählen, verändert fast keine.",
    note: {
      text: "Die Energieverteilung beim Streaming liegt nicht dort, wo die meisten sie vermuten: Endgeräte rund 72 %, Übertragung 23 %, Rechenzentren 5 %. Frühere Zahlen, die dem Netzwerk die Schuld gaben, lagen um bis zum 50-Fachen zu hoch. Eine niedrigere Standardauflösung wirkt genau dort, wo der große Anteil liegt: am Endgerät.",
      source: "ieaStreaming",
    },
  },
  {
    id: "t05",
    hint:
      "Hier passiert überhaupt nichts Physisches. Frag dich, was im Organigramm fehlt.",
    setting:
      "Eine Engineering-Abteilung hat nach einer Vorstandsdiskussion über Nachhaltigkeit ein Monitoring-Tool angeschafft. Es läuft seit acht Monaten.",
    terms: ["kpi"],
    snippet:
      "Ferronova hat ein Green-IT-Dashboard angeschafft, aber niemand ist für die Zahlen verantwortlich.",
    correctCategory: "G",
    verdict: "red",
    whatItIs: "Ein Tool ohne Verantwortlichen – die Kennzahlen werden deshalb ignoriert.",
    whoItAffects: "Vorstand, CIO, die Nachhaltigkeitsverantwortliche Person, die es noch nicht gibt.",
    fixBefore: "Tool ohne Verantwortlichen.",
    fixAfter: "Benannter Verantwortlicher plus monatliche Durchsicht in einem bestehenden Meeting.",
    principle:
      "Messung ohne Verantwortlichkeit ist Dekoration. Kläre die Zuständigkeit, bevor du das Tool kaufst.",
  },
  {
    id: "t06",
    hint:
      "Das hier ist eine gute Entscheidung, keine Lücke. Frag dich, welcher Zähler sich dadurch verringert.",
    setting:
      "Eine Bank mit eigenem Serverraum. Jemand stellte die Temperatureinstellung infrage, und es wurde gemessen, bevor irgendetwas geändert wurde.",
    terms: ["setpoint", "data-hall", "thermal-survey", "pue"],
    snippet:
      "Die Marlin Bank erhöht den Sollwert im Rechnerraum nach einer Thermografie-Messung von 20 °C auf 24 °C.",
    correctCategory: "E",
    verdict: "green",
    whatItIs: "Geringere Kühllast ohne Einbußen bei der Betriebssicherheit.",
    whoItAffects: "Facility Management und IT-Betrieb.",
    fixBefore: "Unverändert belassen.",
    fixAfter: "Sollwert veröffentlichen und die Thermografie-Messung jährlich wiederholen.",
    principle:
      "Die Messung ist es, was diese Entscheidung rechtfertigt. Dieselbe Änderung ohne Beleg wäre eine Wette, die zufällig aufgegangen ist.",
    note: {
      text: "Kühlung ist im Wesentlichen das, was PUE misst. In Deutschland ist das inzwischen gesetzlich geregelt: Bestehende Rechenzentren müssen bis Juli 2027 einen Jahres-PUE von 1,5 und bis Juli 2030 von 1,3 erreichen; ein Novellenentwurf von 2026 schlägt stattdessen 1,6 und 1,4 vor.",
      source: "enefg",
    },
  },
  {
    id: "t07",
    hint:
      "Hier wird nichts eingeschaltet. Frag dich, was hier ungenutzt herumsteht, obwohl es teuer in der Herstellung war.",
    setting:
      "Ein Versicherer hat im letzten Jahr seine Monitore ersetzt und die alten aufbewahrt, statt zu entscheiden, was damit geschehen soll.",
    terms: ["embodied-carbon"],
    snippet: "Bei Otterbrook Insurance steht ein Lagerraum voller drei Jahre alter Monitore „für alle Fälle“ bereit.",
    correctCategory: "R",
    verdict: "amber",
    whatItIs: "Gebundenes Kapital und ungenutzte graue Emissionen.",
    whoItAffects: "IT-Asset-Management.",
    fixBefore: "Horten.",
    fixAfter: "Weiterverwenden in Schulungsräumen oder spenden.",
    principle:
      "Horten fühlt sich vorsichtig an, liest sich in jeder Inventur aber als Verschwendung. Setze für Ersatzgeräte eine Haltbarkeitsfrist, so wie du es bei Lagerbeständen tun würdest.",
  },
  {
    id: "t08",
    hint:
      "Hier trifft kein IT-System eine Schuld. Frag dich, was in die Luft geht, weil eine digitale Option nicht genutzt wurde.",
    setting:
      "Ein Medienunternehmen, dessen Führungsteam auf vier Standorte in verschiedenen Ländern verteilt ist.",
    terms: [],
    snippet: "Salix Media fliegt jeden Monat 8 Personen zu einem zweistündigen internen Review ein.",
    correctCategory: "Em",
    verdict: "amber",
    whatItIs: "Vermeidbare Reiseemissionen.",
    whoItAffects: "Der Geschäftsbereich und die für die Reiserichtlinie verantwortliche Person.",
    fixBefore: "Monatlicher Flug.",
    fixAfter: "Vierteljährlich vor Ort, monatlich remote.",
    principle:
      "Hier ist IT ein Enabler. Die Emissionen entstehen außerhalb der IT, aber es ist Aufgabe der IT, die Alternative so gut zu machen, dass man sie auch wählt.",
  },
  {
    id: "t09",
    hint:
      "Die Bildschirme sind gerechtfertigt, die Betriebsstunden nicht. Frag dich, welches Nutzungsmuster du ändern würdest.",
    setting:
      "Ein Hersteller hat Produktionsdashboards auf großen Wandbildschirmen in der gesamten Fertigungshalle installiert.",
    terms: ["shopfloor"],
    snippet:
      "Delton Manufacturing lässt 40 Bildschirme in der Fertigungshalle rund um die Uhr ein Dashboard streamen, das nur die Schichtleitung der Tagschicht liest.",
    correctCategory: "U",
    verdict: "red",
    whatItIs: "Dauerbetrieb der Anzeige für ein Publikum, das nur zeitweise da ist.",
    whoItAffects: "Betrieb und IT.",
    fixBefore: "Rund um die Uhr.",
    fixAfter: "Zeitgesteuert an während der Schichten, außerhalb davon per Bewegungsmelder aus.",
    principle:
      "Richte die Laufzeit nach dem Publikum aus, nicht nach dem, was das Gerät leisten kann.",
  },
  {
    id: "t10",
    hint:
      "Kein Gerät, kein Strom, kein Material. Frag dich, welchem Dokument ein Abschnitt fehlt.",
    setting:
      "Ein Logistikunternehmen hat letztes Jahr eine Nachhaltigkeitsstrategie veröffentlicht, verfasst von einem Team ohne Beteiligung der IT.",
    terms: ["kpi"],
    snippet: "Astra Freight hat eine Nachhaltigkeitsstrategie, in der die IT nicht vorkommt.",
    correctCategory: "G",
    verdict: "amber",
    whatItIs: "Eine Strategie ohne IT-Geltungsbereich – ein blinder Fleck von Anfang an.",
    whoItAffects: "Vorstand, CSO, CIO.",
    fixBefore: "IT fehlt im Geltungsbereich.",
    fixAfter: "IT in den Geltungsbereich aufgenommen, mit eigenen KPIs.",
    principle:
      "Wird die IT in der Strategie nicht genannt, ist kein IT-Budgetverantwortlicher verpflichtet, danach zu handeln. Geltungsbereich ist Handlungsvollmacht.",
  },
  {
    id: "t11",
    hint:
      "Gleiches Muster wie bei der ersten Karte. Frag dich, was Strom zieht, während das Gebäude leer steht.",
    setting:
      "Ein Gesundheitsdienstleister mit sechs Standorten und ohne zentrale Regel, was am Ende des Tages mit einem Rechner geschieht.",
    terms: ["patch-window", "wake-on-lan"],
    snippet:
      "Bei Cormorant Health bleiben Monitore und Desktop-Rechner an 6 Standorten über Nacht eingeschaltet.",
    correctCategory: "E",
    verdict: "amber",
    whatItIs: "Dauerhafter Stromverbrauch der Endgeräte.",
    whoItAffects: "IT-Richtlinie und Nutzer.",
    fixBefore: "Keine Energierichtlinie.",
    fixAfter: "Verbindlicher Ruhezustand, mit Wake-on-LAN für Patch-Fenster.",
    principle:
      "Der übliche Einwand lautet: Patches. Beantworte ihn, bevor du die Richtlinie vorschlägst, und der Einwand verschwindet.",
  },
  {
    id: "t12",
    hint:
      "Die Scanner werden zu einem festen Termin ersetzt, nicht wegen eines Defekts. Frag dich, was hier entsorgt wird, obwohl es noch funktioniert.",
    setting:
      "Ein Lebensmittelgroßhändler, dessen Lagerscanner über einen vor fünf Jahren geschlossenen Rahmenvertrag geliefert werden.",
    terms: ["refresh-cycle", "e-waste"],
    snippet:
      "Vibrant Foods ersetzt gemäß dem Standardvertrag des Lieferanten jedes Jahr sämtliche mobilen Lagerscanner.",
    correctCategory: "R",
    verdict: "red",
    whatItIs: "Vertragsgetriebener statt bedarfsgetriebener Austausch.",
    whoItAffects: "Einkauf und Betrieb.",
    fixBefore: "Jährlicher Austausch.",
    fixAfter: "Zustandsabhängiger Austausch bei einem 3-Jahres-Vertrag.",
    principle:
      "Austauschzyklen stammen meist aus einem Vertrag, den niemand mehr gelesen hat. Der Verlängerungstermin ist dein Ansatzpunkt.",
    note: {
      text: "2022 fielen 62 Millionen Tonnen Elektroschrott an, von denen nur 22,3 % formal gesammelt und recycelt wurden. Vertragsgetriebener Austausch ist einer der stillen Treiber hinter dieser Zahl.",
      source: "ewaste",
    },
  },
  {
    id: "t13",
    hint:
      "Es wurde nichts gekauft und kein Code verändert. Frag dich, was sauberer wurde, obwohl sich nur die Uhrzeit verschoben hat.",
    setting:
      "Ein Energieversorger führt seine Reporting-Jobs nach einem Zeitplan aus, den seit der Einführung des Systems niemand infrage gestellt hat.",
    terms: ["batch", "load-shift", "grid-mix"],
    snippet:
      "Northlake Utilities verlegt Batch-Reports in die Nacht, in verbrauchsschwache Stunden mit geringerer CO₂-Intensität.",
    correctCategory: "Em",
    verdict: "green",
    whatItIs: "Eine Lastverschiebung mit CO₂-Vorteil.",
    whoItAffects: "Datenplattform-Team und Nachhaltigkeit.",
    fixBefore: "Unverändert belassen.",
    fixAfter: "Die Laufzeitverschiebung und die Differenz der CO₂-Intensität veröffentlichen.",
    principle:
      "Verschiebbare Arbeitslasten sind in den meisten IT-Landschaften der günstigste CO₂-Hebel, weil nichts gekauft oder neu geschrieben werden muss.",
  },
  {
    id: "t14",
    hint:
      "Der Speicher funktioniert genau wie konfiguriert. Frag dich, welches Verhalten ihn ständig weiter füllt.",
    setting:
      "Eine Anwaltskanzlei, in der jeder Fall Dutzende Dokumentversionen erzeugt und niemandem je gesagt wurde, wann eine davon gelöscht werden soll.",
    terms: ["redundant", "retention-policy", "canonical-store"],
    snippet:
      "Bracken Legal speichert jeden Entwurf, jede Überarbeitung und jeden E-Mail-Anhang auf drei redundanten Dateifreigaben.",
    correctCategory: "U",
    verdict: "amber",
    whatItIs: "Speicherwildwuchs, der vermeidbare Kapazität verursacht.",
    whoItAffects: "IT und Dokumentenverwaltung.",
    fixBefore: "Dreifache Redundanz als Standard.",
    fixAfter: "Eine Aufbewahrungsrichtlinie plus ein einziger maßgeblicher Speicherort.",
    principle:
      "Speicherwildwuchs wird zweimal bezahlt: einmal als Kapazität, und ein weiteres Mal beim nächsten Hardware-Austausch.",
  },
  {
    id: "t15",
    hint:
      "Frag dich, wer dafür verantwortlich ist und an welchem Ausgangswert es gemessen wird.",
    setting:
      "Ein Einzelhändler, dessen Vorstand vor einem Investorentreffen in einer Pressemitteilung ein Nachhaltigkeitsversprechen verkündet hat.",
    terms: ["net-zero", "baseline"],
    snippet:
      "Der Vorstand von Zephyr Retail verkündet „Net Zero IT bis 2030“ – ohne Ausgangswert, ohne Verantwortlichen und ohne Budget.",
    correctCategory: "G",
    verdict: "red",
    whatItIs: "Eine Ankündigung ohne Architektur dahinter.",
    whoItAffects: "Vorstand und CIO.",
    fixBefore: "Pressemitteilung.",
    fixAfter: "Ausgangswert, Verantwortlicher, Budget und Meilensteine – dann erst die Ankündigung.",
    principle:
      "Ein Ziel ohne Ausgangswert kann weder verfehlt noch erreicht werden, nur diskutiert. Das ist das Reputationsrisiko, nicht das Ziel selbst.",
  },
];
