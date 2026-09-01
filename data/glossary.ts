// Plain-language definitions for every term the tabs use without explaining.
// Written for a room where English is a second language: short sentences,
// concrete nouns, and one line on why the term matters for a decision.

export type GlossaryEntry = {
  id: string;
  term: string;
  /** The exact string to find in body text, matched case-insensitively. */
  match: string;
  /** Alternative spellings that should also link, e.g. plurals. */
  also?: string[];
  plain: string;
  /** Why a decision-maker should care. Optional — not every term needs one. */
  soWhat?: string;
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    id: "hvac",
    term: "HVAC",
    match: "HVAC",
    plain:
      "Heating, Ventilation and Air Conditioning. This is the building's climate system. It warms, cools and moves fresh air through the offices.",
    soWhat:
      "In most office buildings this is the single largest electricity user, ahead of all the computers put together. It is also usually managed by facilities, not IT, which is why nobody notices it running at the weekend.",
  },
  {
    id: "skip",
    term: "Skip",
    match: "skip",
    plain:
      "A large open metal container for waste, parked outside a building during a move or renovation. American English calls it a dumpster.",
    soWhat:
      "What goes in a skip goes to landfill. It is the difference between disposal and reuse, decided by whoever is carrying the boxes.",
  },
  {
    id: "embodied-carbon",
    term: "Embodied carbon",
    match: "Embedded carbon",
    also: ["embodied carbon", "embedded carbon", "manufacturing footprint"],
    plain:
      "The emissions already released to make a product, covering mining, refining, manufacturing and shipping, before anyone switches it on for the first time.",
    soWhat:
      "For a laptop this is roughly four fifths of its lifetime total. You cannot reduce it after the purchase. You can only spread it across more years of use, which is why service life is such a strong lever.",
  },
  {
    id: "grid-mix",
    term: "Grid mix / carbon intensity",
    match: "grid mix",
    also: ["carbon intensity", "coal-heavy region", "coal-heavy"],
    plain:
      "How much CO₂ is released per unit of electricity on a particular power grid, at a particular moment. Coal-heavy grids are high; wind, solar, hydro and nuclear are low.",
    soWhat:
      "The same server doing the same work emits very differently depending on where and when it runs. This is a choice, and it is usually made by default.",
  },
  {
    id: "cloud-region",
    term: "Cloud region",
    match: "region",
    also: ["cloud region"],
    plain:
      "The physical place where a cloud provider actually runs your workload. It is a cluster of data centres in one country or area. You pick it when you set the service up.",
    soWhat:
      "Most teams pick a region on price or speed and never look at the local energy mix. Changing it later usually means moving data, which is why the first choice matters.",
  },
  {
    id: "finops",
    term: "FinOps",
    match: "FinOps",
    plain:
      "The practice of managing cloud spending, by tracking what each team runs and what it costs, month by month.",
    soWhat:
      "It is already the place where cloud usage gets questioned. That makes it the cheapest place to add carbon as a second number next to cost.",
  },
  {
    id: "endpoint",
    term: "Endpoint",
    match: "endpoint",
    also: ["endpoints"],
    plain:
      "The device in front of the person: laptop, desktop, monitor, phone. The opposite end of the connection from the server.",
    soWhat:
      "IT usually controls endpoint default settings centrally. Changing a default changes thousands of decisions at once, without asking anyone to behave differently.",
  },
  {
    id: "setpoint",
    term: "Setpoint",
    match: "setpoint",
    plain:
      "The temperature a cooling system is told to hold. A lower setpoint means the cooling runs harder and uses more electricity.",
    soWhat:
      "Many server rooms are held far colder than the equipment needs, because the number was set once and never revisited.",
  },
  {
    id: "data-hall",
    term: "Data hall",
    match: "data-hall",
    also: ["data hall"],
    plain:
      "The room inside a data centre where the server racks actually stand. The rest of the building is power supply, cooling plant and offices.",
  },
  {
    id: "thermal-survey",
    term: "Thermal survey",
    match: "thermal survey",
    plain:
      "A measurement of how hot and cold air actually move through a server room, taken with sensors rather than assumed from the design drawings.",
    soWhat:
      "It is what turns “we could probably run warmer” into a decision you can defend if a server later fails. The survey is the real work; the setpoint change takes a minute.",
  },
  {
    id: "pue",
    term: "PUE",
    match: "PUE",
    plain:
      "Power Usage Effectiveness. Total electricity entering a data centre, divided by the electricity that reaches the computers. PUE 1.5 means that for every 10 units of computing, 5 more go to cooling, power conversion and the building.",
    soWhat:
      "In Germany this is now a statutory duty with dates attached, not a best-practice metric. It also says nothing about whether the computing was worth doing. A half-empty data centre can post an excellent PUE.",
  },
  {
    id: "wake-on-lan",
    term: "Wake-on-LAN",
    match: "wake-on-LAN",
    plain:
      "A feature that lets IT switch a sleeping computer back on remotely, over the network.",
    soWhat:
      "It is the answer to the standard objection against any sleep policy: “but we need the machines awake at night for updates.” Prepare this answer before proposing the policy.",
  },
  {
    id: "patch-window",
    term: "Patch window",
    match: "patch window",
    also: ["patch windows"],
    plain:
      "The scheduled time, usually at night, when IT installs security updates across the fleet.",
    soWhat:
      "Any power-saving policy has to survive the patch window, or it gets switched off again within a month and nobody tells you.",
  },
  {
    id: "batch",
    term: "Batch job",
    match: "batch reports",
    also: ["batch job", "batch jobs", "batch"],
    plain:
      "Work a computer does in one long run with nobody waiting for the result, such as overnight reports, backups and billing runs.",
    soWhat:
      "Because nobody is waiting, it can be moved to a different hour. That makes it the easiest work in the estate to shift onto cleaner electricity.",
  },
  {
    id: "load-shift",
    term: "Load shifting",
    match: "load shift",
    also: ["off-peak", "carbon-aware"],
    plain:
      "Moving flexible computing work to a time or a place where the electricity is cleaner. The work itself does not change. Only the schedule or the location changes.",
    soWhat:
      "Nothing is bought and no code is rewritten, which is rare. Reported reductions run from two to ten times for the work that is moved.",
  },
  {
    id: "retention-policy",
    term: "Retention policy",
    match: "retention policy",
    plain:
      "A written rule stating how long each kind of file is kept, and when it is deleted.",
    soWhat:
      "Without one, everything is kept forever. Storage then grows quietly until it is bought again at the next hardware refresh, so the same data is paid for twice.",
  },
  {
    id: "canonical-store",
    term: "Canonical store",
    match: "canonical store",
    plain:
      "The one agreed location that holds the authoritative version of a file. Everything elsewhere is a copy that may be deleted.",
  },
  {
    id: "redundant",
    term: "Redundant copies",
    match: "redundant file shares",
    also: ["redundancy", "redundant"],
    plain:
      "Extra copies of the same data kept in more than one place.",
    soWhat:
      "Some redundancy protects against loss and is worth paying for. Beyond that it is capacity being bought, powered and backed up for no benefit.",
  },
  {
    id: "kpi",
    term: "KPI",
    match: "KPI",
    also: ["KPIs"],
    plain:
      "Key Performance Indicator. It is a number that a named person is accountable for and reports on a fixed rhythm.",
    soWhat:
      "A number nobody reports is not a KPI, it is a statistic. The name attached to it is what makes it steer anything.",
  },
  {
    id: "baseline",
    term: "Baseline",
    match: "baseline",
    plain:
      "The starting measurement, taken before you change anything.",
    soWhat:
      "A target with no baseline can be neither met nor missed. It can only be argued about. That, not the target itself, is the reputational risk.",
  },
  {
    id: "net-zero",
    term: "Net zero",
    match: "net zero",
    plain:
      "A claim that whatever emissions remain are balanced by removals somewhere else, so the total is zero.",
    soWhat:
      "It is a claim about a total. On its own it says nothing about whether anything was actually reduced, which is why the baseline and the milestones are what get scrutinised.",
  },
  {
    id: "scope-3",
    term: "Scope 3",
    match: "Scope 3",
    plain:
      "Emissions that happen outside your own company but because of it: at suppliers, at cloud providers, and inside the products you buy.",
    soWhat:
      "For most IT organisations it is the largest of the three scopes and the hardest to get data for. Moving a workload to the cloud moves it from Scope 2 into Scope 3: a reporting change, not a reduction.",
  },
  {
    id: "tco",
    term: "TCO",
    match: "total cost of ownership",
    also: ["TCO"],
    plain:
      "Total Cost of Ownership. It is the purchase price plus energy, support, repairs and disposal, across the whole service life.",
    soWhat:
      "The cheapest device to buy is often not the cheapest to own. German Blue Angel criteria require TCO to be calculated at purchase for exactly this reason.",
  },
  {
    id: "e-waste",
    term: "E-waste",
    match: "e-waste",
    plain:
      "Discarded electrical and electronic equipment. It is anything with a plug or a battery that has been thrown away.",
    soWhat:
      "About 62 million tonnes a year globally, of which roughly a fifth is formally collected and recycled. The rest is unaccounted for.",
  },
  {
    id: "sci",
    term: "SCI",
    match: "SCI standard",
    also: ["SCI"],
    plain:
      "Software Carbon Intensity. It is an international standard (ISO/IEC 21031) that scores emissions per unit of useful work: per transaction, per request.",
    soWhat:
      "It deliberately ignores offsets. The score can only improve if the software, or where it runs, actually changes. That is why engineers trust it.",
  },
  {
    id: "refresh-cycle",
    term: "Refresh cycle",
    match: "refresh cycle",
    also: ["refresh cycles", "refresh"],
    plain:
      "How often a company replaces a class of device, such as laptops every three years or scanners every year.",
    soWhat:
      "It is usually inherited from a supplier contract rather than chosen from the condition of the hardware. The contract renewal date is your intervention point.",
  },
  {
    id: "shopfloor",
    term: "Shop floor",
    match: "shopfloor",
    also: ["shop floor"],
    plain:
      "The production or warehouse area of a company, where the physical work happens, as opposed to the offices.",
  },
  {
    id: "utilisation",
    term: "Utilisation",
    match: "utilisation",
    plain:
      "How much of the capacity you are paying for is actually doing work. A server at 10% utilisation still draws a large share of its full power.",
    soWhat:
      "Consolidating lightly used servers usually beats making each of them more efficient.",
  },
  {
    id: "esg",
    term: "ESG",
    match: "ESG",
    plain:
      "Environmental, Social, Governance. It is the reporting framework investors and regulators use. Regulated, numeric and audited.",
    soWhat:
      "It is where your IT figures have to survive an auditor. Green IT produces the data; ESG consumes it.",
  },
];

export const GLOSSARY_BY_ID: Record<string, GlossaryEntry> = Object.fromEntries(
  GLOSSARY.map((entry) => [entry.id, entry]),
);

// ---- German (DE) ----
// Same ids and order as GLOSSARY. Standard acronyms and ESG/Green IT terms
// used identically in German business usage (HVAC, PUE, KPI, ESG, Scope 3,
// Net Zero, TCO, SCI, FinOps, Wake-on-LAN) are kept as the headword; plain
// descriptive terms are translated. `match`/`also` are updated to the
// German words the term is meant to link on inside CARDS_DE's translated
// text, so the same linking mechanism can be wired up per locale — note
// that German noun/adjective inflection means exact-substring matching
// will still miss some inflected forms (see final report).

export const GLOSSARY_DE: typeof GLOSSARY = [
  {
    id: "hvac",
    term: "HVAC",
    match: "HVAC",
    plain:
      "Heating, Ventilation and Air Conditioning – auf Deutsch Heizung, Lüftung und Klimatechnik. Das ist die Klimaanlage des Gebäudes: Sie heizt, kühlt und führt frische Luft durch die Büros.",
    soWhat:
      "In den meisten Bürogebäuden ist das der mit Abstand größte Stromverbraucher – noch vor allen Computern zusammen. Zuständig ist meist das Facility Management, nicht die IT, weshalb niemand bemerkt, dass die Anlage am Wochenende weiterläuft.",
  },
  {
    id: "skip",
    term: "Container",
    match: "Container",
    plain:
      "Ein großer, offener Container für Abfall, der bei einem Umzug oder einer Renovierung vor dem Gebäude aufgestellt wird. Im britischen Englisch heißt er „skip“, im amerikanischen „dumpster“.",
    soWhat:
      "Was in den Container wandert, landet auf der Deponie. Das ist der Unterschied zwischen Entsorgung und Weiterverwendung – entschieden von der Person, die gerade die Kisten trägt.",
  },
  {
    id: "embodied-carbon",
    term: "Graue Emissionen",
    match: "Graue Emissionen",
    also: ["graue Emissionen", "verkörperte Emissionen", "Herstellungs-Fußabdruck"],
    plain:
      "Die Emissionen, die bereits bei der Herstellung eines Produkts freigesetzt wurden – Rohstoffabbau, Verarbeitung, Fertigung und Transport –, bevor es überhaupt zum ersten Mal eingeschaltet wird.",
    soWhat:
      "Bei einem Laptop sind das etwa vier Fünftel der gesamten Emissionen über die Nutzungsdauer. Nach dem Kauf lässt sich daran nichts mehr ändern – du kannst sie nur auf mehr Nutzungsjahre verteilen. Deshalb ist die Nutzungsdauer ein so wirksamer Hebel.",
  },
  {
    id: "grid-mix",
    term: "Strommix / CO₂-Intensität",
    match: "Strommix",
    also: ["CO₂-Intensität", "kohlelastige Region", "kohlelastig"],
    plain:
      "Wie viel CO₂ pro Einheit Strom in einem bestimmten Stromnetz zu einem bestimmten Zeitpunkt freigesetzt wird. Kohlelastige Netze liegen hoch, Wind, Solar, Wasserkraft und Kernkraft liegen niedrig.",
    soWhat:
      "Derselbe Server mit derselben Arbeitslast verursacht je nach Ort und Zeitpunkt sehr unterschiedliche Emissionen. Das ist eine Entscheidung – meist wird sie per Voreinstellung getroffen.",
  },
  {
    id: "cloud-region",
    term: "Cloud-Region",
    match: "Region",
    also: ["Cloud-Region"],
    plain:
      "Der physische Ort, an dem ein Cloud-Anbieter deine Arbeitslast tatsächlich ausführt. Es handelt sich um eine Gruppe von Rechenzentren in einem Land oder einer Region. Du wählst sie bei der Einrichtung des Dienstes.",
    soWhat:
      "Die meisten Teams wählen die Region nach Preis oder Geschwindigkeit und schauen sich nie den lokalen Energiemix an. Eine spätere Änderung bedeutet meist, Daten zu verschieben – deshalb zählt die erste Wahl.",
  },
  {
    id: "finops",
    term: "FinOps",
    match: "FinOps",
    plain:
      "Die Praxis, Cloud-Ausgaben zu steuern, indem monatlich erfasst wird, was jedes Team betreibt und was es kostet.",
    soWhat:
      "Hier wird die Cloud-Nutzung ohnehin schon hinterfragt. Das macht es zum günstigsten Ort, um CO₂ als zweite Kennzahl neben den Kosten einzuführen.",
  },
  {
    id: "endpoint",
    term: "Endgerät",
    match: "Endgerät",
    also: ["Endgeräte"],
    plain:
      "Das Gerät vor der Person: Laptop, Desktop-Rechner, Monitor, Smartphone. Das andere Ende der Verbindung, gegenüber dem Server.",
    soWhat:
      "Die Standardeinstellungen der Endgeräte werden meist zentral von der IT festgelegt. Eine Voreinstellung zu ändern, verändert Tausende Entscheidungen auf einmal, ohne dass sich jemand anders verhalten muss.",
  },
  {
    id: "setpoint",
    term: "Sollwert",
    match: "Sollwert",
    plain:
      "Die Temperatur, auf die ein Kühlsystem eingestellt ist. Ein niedrigerer Sollwert bedeutet, dass die Kühlung stärker arbeitet und mehr Strom verbraucht.",
    soWhat:
      "Viele Serverräume werden weit kälter gehalten, als die Geräte benötigen, weil der Wert einmal festgelegt und nie wieder hinterfragt wurde.",
  },
  {
    id: "data-hall",
    term: "Rechnerraum",
    match: "Rechnerraum",
    also: ["Serverraum"],
    plain:
      "Der Raum innerhalb eines Rechenzentrums, in dem die Serverracks tatsächlich stehen. Der Rest des Gebäudes besteht aus Stromversorgung, Kühltechnik und Büros.",
  },
  {
    id: "thermal-survey",
    term: "Thermografie-Messung",
    match: "Thermografie-Messung",
    plain:
      "Eine Messung, wie warme und kalte Luft tatsächlich durch einen Serverraum strömen, erfasst mit Sensoren statt anhand von Planzeichnungen angenommen.",
    soWhat:
      "Sie macht aus „wir könnten wahrscheinlich wärmer fahren“ eine Entscheidung, die du später verteidigen kannst, falls ein Server ausfällt. Die Messung ist die eigentliche Arbeit – die Sollwertänderung dauert eine Minute.",
  },
  {
    id: "pue",
    term: "PUE",
    match: "PUE",
    plain:
      "Power Usage Effectiveness. Die gesamte Strommenge, die in ein Rechenzentrum fließt, geteilt durch den Strom, der tatsächlich bei den Rechnern ankommt. Ein PUE von 1,5 bedeutet: Für je 10 Einheiten Rechenleistung fließen weitere 5 in Kühlung, Stromumwandlung und Gebäudetechnik.",
    soWhat:
      "In Deutschland ist das inzwischen eine gesetzliche Pflicht mit festen Terminen, keine bloße Best-Practice-Kennzahl. Der Wert sagt aber nichts darüber aus, ob die Rechenleistung überhaupt sinnvoll war – ein halbleeres Rechenzentrum kann einen hervorragenden PUE ausweisen.",
  },
  {
    id: "wake-on-lan",
    term: "Wake-on-LAN",
    match: "Wake-on-LAN",
    plain:
      "Eine Funktion, mit der die IT einen schlafenden Rechner aus der Ferne über das Netzwerk wieder aufwecken kann.",
    soWhat:
      "Das ist die Antwort auf den üblichen Einwand gegen jede Ruhezustand-Richtlinie: „Aber wir brauchen die Rechner nachts für Updates.“ Halte diese Antwort bereit, bevor du die Richtlinie vorschlägst.",
  },
  {
    id: "patch-window",
    term: "Patch-Fenster",
    match: "Patch-Fenster",
    plain:
      "Der geplante Zeitraum, meist nachts, in dem die IT Sicherheitsupdates auf allen Geräten einspielt.",
    soWhat:
      "Jede Energiesparrichtlinie muss das Patch-Fenster überstehen – sonst wird sie innerhalb eines Monats wieder abgeschaltet, ohne dass es dir jemand sagt.",
  },
  {
    id: "batch",
    term: "Batch-Job",
    match: "Batch-Reports",
    also: ["Batch-Job", "Batch-Jobs", "Batch"],
    plain:
      "Arbeit, die ein Computer in einem einzigen langen Durchlauf erledigt, ohne dass jemand auf das Ergebnis wartet – etwa nächtliche Reports, Backups oder Abrechnungsläufe.",
    soWhat:
      "Weil niemand darauf wartet, lässt sich die Arbeit auf eine andere Uhrzeit verschieben. Das macht sie zur einfachsten Arbeitslast, die sich auf sauberer erzeugten Strom verlagern lässt.",
  },
  {
    id: "load-shift",
    term: "Lastverschiebung",
    match: "Lastverschiebung",
    also: ["verbrauchsschwach", "CO₂-bewusst"],
    plain:
      "Flexible Rechenarbeit auf einen Zeitpunkt oder Ort verlagern, an dem der Strom sauberer ist. Die Arbeit selbst ändert sich nicht – nur der Zeitplan oder der Ort.",
    soWhat:
      "Es wird nichts gekauft und kein Code neu geschrieben – das ist selten. Berichteten Reduktionen zufolge liegt die Einsparung für die verlagerte Arbeit beim Zwei- bis Zehnfachen.",
  },
  {
    id: "retention-policy",
    term: "Aufbewahrungsrichtlinie",
    match: "Aufbewahrungsrichtlinie",
    plain:
      "Eine schriftliche Regel, die festlegt, wie lange welche Art von Datei aufbewahrt und wann sie gelöscht wird.",
    soWhat:
      "Ohne eine solche Regel wird alles auf unbestimmte Zeit aufbewahrt. Der Speicher wächst dann still weiter, bis er beim nächsten Hardware-Austausch erneut gekauft werden muss – dieselben Daten werden also zweimal bezahlt.",
  },
  {
    id: "canonical-store",
    term: "Maßgeblicher Speicherort",
    match: "maßgeblicher Speicherort",
    plain:
      "Der eine vereinbarte Ort, an dem die maßgebliche Version einer Datei liegt. Alles andere ist eine Kopie, die gelöscht werden darf.",
  },
  {
    id: "redundant",
    term: "Redundante Kopien",
    match: "redundanten Dateifreigaben",
    also: ["Redundanz", "redundant", "redundante Kopien"],
    plain: "Zusätzliche Kopien derselben Daten, die an mehr als einem Ort aufbewahrt werden.",
    soWhat:
      "Ein gewisses Maß an Redundanz schützt vor Datenverlust und ist sein Geld wert. Alles darüber hinaus ist Kapazität, die gekauft, mit Strom versorgt und gesichert wird, ohne einen Nutzen zu bringen.",
  },
  {
    id: "kpi",
    term: "KPI",
    match: "KPI",
    also: ["KPIs"],
    plain:
      "Key Performance Indicator – eine Kennzahl, für die eine benannte Person verantwortlich ist und die in festem Rhythmus berichtet wird.",
    soWhat:
      "Eine Zahl, die niemand berichtet, ist kein KPI, sondern eine Statistik. Erst der Name, der daranhängt, sorgt dafür, dass sie überhaupt etwas steuert.",
  },
  {
    id: "baseline",
    term: "Ausgangswert",
    match: "Ausgangswert",
    plain: "Die Ausgangsmessung, die erfasst wird, bevor irgendetwas verändert wird.",
    soWhat:
      "Ein Ziel ohne Ausgangswert kann weder erreicht noch verfehlt werden. Es kann nur diskutiert werden. Das – nicht das Ziel selbst – ist das Reputationsrisiko.",
  },
  {
    id: "net-zero",
    term: "Net Zero",
    match: "Net Zero",
    plain:
      "Das Versprechen, dass verbleibende Emissionen an anderer Stelle durch Entnahmen ausgeglichen werden, sodass die Bilanz null ergibt.",
    soWhat:
      "Es ist eine Aussage über eine Gesamtbilanz. Für sich genommen sagt sie nichts darüber aus, ob tatsächlich etwas reduziert wurde – deshalb stehen Ausgangswert und Meilensteine im Fokus der Prüfung.",
  },
  {
    id: "scope-3",
    term: "Scope 3",
    match: "Scope 3",
    plain:
      "Emissionen, die außerhalb des eigenen Unternehmens entstehen, aber durch dessen Handeln verursacht werden: bei Lieferanten, bei Cloud-Anbietern und in den Produkten, die eingekauft werden.",
    soWhat:
      "Für die meisten IT-Organisationen ist das der größte der drei Scopes und der, für den am schwersten Daten zu bekommen sind. Eine Workload in die Cloud zu verlagern, verschiebt sie von Scope 2 nach Scope 3 – eine Änderung in der Berichterstattung, keine Reduktion.",
  },
  {
    id: "tco",
    term: "TCO",
    match: "Gesamtbetriebskosten",
    also: ["TCO"],
    plain:
      "Total Cost of Ownership, auf Deutsch Gesamtbetriebskosten. Das ist der Kaufpreis plus Energie, Support, Reparaturen und Entsorgung über die gesamte Nutzungsdauer.",
    soWhat:
      "Das im Einkauf günstigste Gerät ist oft nicht das günstigste im Besitz. Die Kriterien des Blauen Engel verlangen genau aus diesem Grund, die Gesamtbetriebskosten bereits beim Kauf zu berechnen.",
  },
  {
    id: "e-waste",
    term: "Elektroschrott",
    match: "Elektroschrott",
    plain:
      "Entsorgte Elektro- und Elektronikgeräte. Das ist alles mit einem Stecker oder einer Batterie, das weggeworfen wurde.",
    soWhat:
      "Weltweit rund 62 Millionen Tonnen pro Jahr, von denen etwa ein Fünftel formal gesammelt und recycelt wird. Der Rest bleibt unerfasst.",
  },
  {
    id: "sci",
    term: "SCI",
    match: "SCI-Standard",
    also: ["SCI"],
    plain:
      "Software Carbon Intensity. Ein internationaler Standard (ISO/IEC 21031), der Emissionen pro Einheit nützlicher Arbeit bewertet: pro Transaktion, pro Anfrage.",
    soWhat:
      "Kompensationen werden bewusst nicht berücksichtigt. Der Wert kann sich nur verbessern, wenn sich die Software oder ihr Ausführungsort tatsächlich ändert. Deshalb vertrauen Entwicklerinnen und Entwickler ihm.",
  },
  {
    id: "refresh-cycle",
    term: "Austauschzyklus",
    match: "Austauschzyklus",
    also: ["Austauschzyklen", "Austausch"],
    plain:
      "Wie oft ein Unternehmen eine Gerätekategorie ersetzt, etwa Laptops alle drei Jahre oder Scanner jedes Jahr.",
    soWhat:
      "Er stammt meist aus einem Lieferantenvertrag statt aus dem tatsächlichen Zustand der Hardware. Der Vertragsverlängerungstermin ist dein Ansatzpunkt.",
  },
  {
    id: "shopfloor",
    term: "Fertigungshalle",
    match: "Fertigungshalle",
    also: ["Werkshalle"],
    plain:
      "Der Produktions- oder Lagerbereich eines Unternehmens, in dem die physische Arbeit stattfindet, im Gegensatz zu den Büros.",
  },
  {
    id: "utilisation",
    term: "Auslastung",
    match: "Auslastung",
    plain:
      "Wie viel von der bezahlten Kapazität tatsächlich Arbeit leistet. Ein Server mit 10 % Auslastung zieht trotzdem einen großen Teil seiner vollen Leistungsaufnahme.",
    soWhat: "Gering ausgelastete Server zu konsolidieren schlägt meist den Versuch, jeden einzelnen effizienter zu machen.",
  },
  {
    id: "esg",
    term: "ESG",
    match: "ESG",
    plain:
      "Environmental, Social, Governance – Umwelt, Soziales, Unternehmensführung. Das ist der Berichtsrahmen, den Investoren und Regulierungsbehörden nutzen: reguliert, zahlenbasiert und geprüft.",
    soWhat: "Hier müssen deine IT-Zahlen einer Prüfung standhalten. Green IT liefert die Daten, ESG verarbeitet sie.",
  },
];

export const GLOSSARY_BY_ID_DE: Record<string, GlossaryEntry> = Object.fromEntries(
  GLOSSARY_DE.map((entry) => [entry.id, entry]),
);
