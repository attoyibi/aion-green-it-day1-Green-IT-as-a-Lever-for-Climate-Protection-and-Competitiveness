// L2 experiential scenario — Meridian Logistics AG.
//
// NS1: Meridian is a new fictional company. Nothing here references MediPrint,
// NordCom or Auron, and nothing here may leak into /learn or /training.
// NS2: at pick time every option is presented as valid. Tags are factual.
// NS3: consequences arrive as world state, never as verdicts.
// NS5: reveal vocabulary is permitted only in the debrief.

import type { CategoryCode } from "./categories";
import type { SourceKey } from "./sources";
import type { EndingId, Mood, Phase, StakeholderKey } from "@/lib/types";

export const STAKEHOLDERS: Record<
  StakeholderKey,
  {
    name: string;
    role: string;
    tint: string;
    /** What they are pushing for. */
    wants: string;
    /** The lever they actually hold over you. */
    controls: string;
    /** Why they behave that way — none of them is an obstacle by temperament. */
    why: string;
  }
> = {
  marcus: {
    name: "Marcus Vogel",
    role: "CIO",
    tint: "#6E8DC1",
    wants: "Quick wins he can carry into the quarterly board meeting.",
    controls: "Your objectives, your budget request, and what the board hears about you.",
    why: "He is your boss and he is not an obstacle. It is his own position that is exposed if the Nordvind clause is missed.",
  },
  sabine: {
    name: "Sabine Keller",
    role: "Head of Procurement",
    tint: "#F1B24A",
    wants: "No drama. Three tenders close this quarter and she is already at capacity.",
    controls: "The vendor list. Nothing gets bought outside it, and she decides what goes on it.",
    why: "Fifteen years at Meridian. She has watched IT arrive with a new priority before, and watched it leave again.",
  },
  rafael: {
    name: "Rafael Costa",
    role: "Head of Operations",
    tint: "#6FB56A",
    wants: "IT that does not move. Every disruption is a delayed order and an unhappy customer.",
    controls: "Warehouse change windows. Nothing touches the sites without his sign-off.",
    why: "He is measured on orders shipped, not on emissions. Stability is not caution for him, it is the job.",
  },
  elena: {
    name: "Elena",
    role: "CFO",
    tint: "#B389D6",
    wants: "A concrete return she can set against the line item.",
    controls: "Budget approval. She does not sit in your meetings; she reads the numbers afterwards.",
    why: "She has not appeared yet, which is why her position starts as unknown. You will hear from her the moment a figure needs justifying.",
  },
};

export const MOOD_LABEL: Record<Mood, string> = {
  unknown: "Unknown",
  hostile: "Hostile",
  skeptical: "Sceptical",
  wary: "Wary",
  neutral: "Neutral",
  warming: "Warming",
  ally: "Ally",
};

export const MOOD_COLOUR: Record<Mood, string> = {
  hostile: "#B33A3A",
  skeptical: "#C0721D",
  wary: "#D9A24A",
  unknown: "#9994A3",
  neutral: "#5F7A8E",
  warming: "#68A48A",
  ally: "#2F9E5A",
};

// ---------------------------------------------------------------- artifacts

export type FigureArt =
  | "audit-preview"
  | "laptop-photo"
  | "workshop-notes"
  | "consultant-report"
  | "fleet-dashboard"
  | "cloud-savings";

export type Artifact =
  | { id: string; kind: "email"; from: StakeholderKey | "external"; fromName: string; role: string; to?: string; time: string; subject: string; body: string[]; forwarded?: boolean }
  | { id: string; kind: "slack"; channel: string; from: StakeholderKey | "external"; fromName: string; role: string; time: string; message: string }
  | { id: string; kind: "memo"; from: StakeholderKey; fromName: string; to: string; date: string; subject: string; body: string[] }
  | { id: string; kind: "calendar"; title: string; day: string; time: string; attendees: string[]; urgent?: boolean }
  | { id: string; kind: "dashboard"; title: string; segments: { label: string; value: number; category: CategoryCode }[]; caption: string; details: { label: string; points: string[] }[] }
  | { id: string; kind: "slide"; template: "nordvind-draft" }
  | { id: string; kind: "orgchart"; highlightNodeId: string }
  | { id: string; kind: "figure"; title: string; desc: string; art: FigureArt; caption?: string };

export const ARTIFACTS: Record<string, Artifact> = {
  "meridian/email-marcus-opening": {
    id: "meridian/email-marcus-opening",
    kind: "email",
    from: "marcus",
    fromName: "Marcus Vogel",
    role: "CIO",
    to: "Nadia Rahmani",
    time: "08:47",
    subject: "Nordvind clause: we need a plan",
    body: [
      "Nadia, I have just come out of the Nordvind Retail meeting. They're 30% of our revenue. Their RFP renewal has a new clause: IT sustainability disclosure required within 6 months, or the contract doesn't renew.",
      "Board meeting is in 12 weeks. They want to see your plan.",
      "Handle this.",
      "M",
    ],
  },
  "meridian/slack-sabine-heads-up": {
    id: "meridian/slack-sabine-heads-up",
    kind: "slack",
    channel: "DM",
    from: "sabine",
    fromName: "Sabine Keller",
    role: "Head of Procurement",
    time: "09:12",
    message:
      "heard about the “green IT” thing. please don't turn this into a drama. we have three tenders closing this quarter.",
  },
  "meridian/email-rafael-cold": {
    id: "meridian/email-rafael-cold",
    kind: "email",
    from: "rafael",
    fromName: "Rafael Costa",
    role: "Head of Operations",
    time: "09:34",
    subject: "Re: Laptop refresh windows",
    forwarded: true,
    body: [
      "If Green IT means touching anything in the warehouses, I need two weeks notice. Every hour of downtime is a delayed order.",
    ],
  },

  // --- Phase 1 outcomes
  "meridian/artifact-audit-preview": {
    id: "meridian/artifact-audit-preview",
    kind: "figure",
    title: "Energy audit: partial results",
    desc: "A dashboard part-filled with data, three panels populated and two still empty.",
    art: "audit-preview",
  },
  "meridian/calendar-urgent-marcus": {
    id: "meridian/calendar-urgent-marcus",
    kind: "calendar",
    title: "URGENT: the board is asking. What am I telling them?",
    day: "Thursday",
    time: "16:30",
    attendees: ["Marcus Vogel", "Nadia Rahmani"],
    urgent: true,
  },
  "meridian/slack-marcus-doorway": {
    id: "meridian/slack-marcus-doorway",
    kind: "slack",
    channel: "DM",
    from: "marcus",
    fromName: "Marcus Vogel",
    role: "CIO",
    time: "09:20",
    message:
      "came by, you were in the audit review. board wants an update next week. what am I telling them?",
  },
  "meridian/artifact-laptop-photo": {
    id: "meridian/artifact-laptop-photo",
    kind: "figure",
    title: "Fifty new laptops, staged in the warehouse",
    desc: "Stacked boxes of new laptops on a warehouse pallet, photographed for reporting.",
    art: "laptop-photo",
  },
  "meridian/email-sabine-complaint": {
    id: "meridian/email-sabine-complaint",
    kind: "email",
    from: "sabine",
    fromName: "Sabine Keller",
    role: "Head of Procurement",
    to: "Marcus Vogel · cc People & Culture",
    time: "16:55",
    subject: "Procurement process: the laptop order",
    body: [
      "Marcus, fifty units went through on a fast-track authorisation without passing procurement. I found out when the invoice arrived.",
      "I am not objecting to the devices. I am objecting to being told afterwards. If Green IT is going to work this way, say so now and I will plan around it.",
    ],
  },
  "meridian/email-audit-late": {
    id: "meridian/email-audit-late",
    kind: "email",
    from: "external",
    fromName: "Facilities",
    role: "Energy reporting",
    time: "11:20",
    subject: "Footprint breakdown: first pass",
    body: [
      "First pass at the IT breakdown you asked for. The laptop fleet comes out at roughly 12% of total IT footprint. The on-prem data centre is the dominant line.",
    ],
  },
  "meridian/artifact-workshop-notes": {
    id: "meridian/artifact-workshop-notes",
    kind: "figure",
    title: "Workshop whiteboard",
    desc: "A whiteboard divided into columns by function, each with sticky notes and one name written at the top.",
    art: "workshop-notes",
  },
  "meridian/slack-marcus-nervous": {
    id: "meridian/slack-marcus-nervous",
    kind: "slack",
    channel: "DM",
    from: "marcus",
    fromName: "Marcus Vogel",
    role: "CIO",
    time: "17:05",
    message: "any movement I can point at?",
  },
  "meridian/artifact-consultant-report": {
    id: "meridian/artifact-consultant-report",
    kind: "figure",
    title: "External assessment: 47 pages",
    desc: "The cover of a thick bound consultancy report with a page count on the spine.",
    art: "consultant-report",
    caption:
      "Benchmarks, sector averages and a maturity model. Nothing in it names a Meridian system, a Meridian contract or a Meridian person.",
  },
  "meridian/memo-elena-questions": {
    id: "meridian/memo-elena-questions",
    kind: "memo",
    from: "elena",
    fromName: "Elena",
    to: "Nadia Rahmani",
    date: "Week 5",
    subject: "Advisory engagement: cost breakdown",
    body: [
      "Please break down the €45k against expected outcomes. I need to show the line against something.",
    ],
  },

  // --- Phase 2
  "meridian/dashboard-footprint-preview": {
    id: "meridian/dashboard-footprint-preview",
    kind: "dashboard",
    title: "Where Meridian's IT energy goes",
    segments: [
      { label: "Data centre on-prem", value: 42, category: "E" },
      { label: "Cloud sprawl (3 providers)", value: 25, category: "Em" },
      { label: "Laptop fleet (800 units, avg 5.8y)", value: 18, category: "R" },
      { label: "Other (network, print, misc)", value: 15, category: "U" },
    ],
    caption:
      "PUE 2.1 · refresh cycle 3y (backlog) · idle cloud resources not consolidated.",
    details: [
      {
        label: "Data centre on-prem",
        points: [
          "Installed in 2016 and never re-planned.",
          "PUE 2.1. For every unit reaching the computing, 1.1 more goes to cooling, conversion and the building.",
          "Largest single line, and the one Rafael's warehouses depend on.",
        ],
      },
      {
        label: "Cloud sprawl",
        points: [
          "Three providers, adopted separately.",
          "Cost up 60% year on year.",
          "Idle resources never consolidated; carbon per workload not instrumented at all.",
        ],
      },
      {
        label: "Laptop fleet",
        points: [
          "800 units, average age 5.8 years.",
          "A three-year refresh cycle on paper, with a backlog that puts most of the fleet past it.",
          "The most visible area to employees, and the smallest of the three.",
        ],
      },
    ],
  },
  "meridian/email-rafael-warning": {
    id: "meridian/email-rafael-warning",
    kind: "email",
    from: "rafael",
    fromName: "Rafael Costa",
    role: "Head of Operations",
    time: "07:55",
    subject: "Migration windows",
    body: [
      "A migration of that size touches every warehouse system. I want the cutover plan in writing before anything is signed, and I want the fallback in the same document.",
    ],
  },
  "meridian/artifact-fleet-dashboard": {
    id: "meridian/artifact-fleet-dashboard",
    kind: "figure",
    title: "Fleet lifecycle tracker",
    desc: "A tracker showing device ages grouped into bands, with a refurbishment queue alongside.",
    art: "fleet-dashboard",
  },
  "meridian/artifact-cloud-savings": {
    id: "meridian/artifact-cloud-savings",
    kind: "figure",
    title: "Cloud consolidation: running total",
    desc: "A descending line chart with idle resources marked as they are switched off.",
    art: "cloud-savings",
  },
  "meridian/slack-team-confusion": {
    id: "meridian/slack-team-confusion",
    kind: "slack",
    channel: "#greenit-delivery",
    from: "external",
    fromName: "Delivery team",
    role: "IT",
    time: "10:41",
    message: "which workstream is the priority this sprint?",
  },

  // --- Phase 3
  "meridian/slide-nordvind-draft": {
    id: "meridian/slide-nordvind-draft",
    kind: "slide",
    template: "nordvind-draft",
  },
  "meridian/email-marketing-slide": {
    id: "meridian/email-marketing-slide",
    kind: "email",
    from: "external",
    fromName: "Marketing",
    role: "Brand & Communications",
    time: "11:05",
    subject: "Nordvind slide: the headline is still open",
    body: [
      "We have left the headline box empty for you. Our advice is something aggressive but believable.",
      "Buyers in this sector expect a number. “Significant reduction” reads as nothing to a procurement team, because they see that phrasing every week. Tell us what to put in the box and we will build the rest around it.",
    ],
  },
  "meridian/email-nordvind-excited": {
    id: "meridian/email-nordvind-excited",
    kind: "email",
    from: "external",
    fromName: "Nordvind Retail",
    role: "Supplier sustainability",
    time: "14:02",
    subject: "Re: preview meeting",
    body: [
      "This is exactly the level of ambition we were hoping to see from a partner of your size. We'd like to feature it in our own supplier communications.",
    ],
  },
  "meridian/slack-cto-nervous": {
    id: "meridian/slack-cto-nervous",
    kind: "slack",
    channel: "DM",
    from: "marcus",
    fromName: "Marcus Vogel",
    role: "CIO",
    time: "14:36",
    message: "we can actually hit that, right?",
  },
  "meridian/email-nordvind-cautious": {
    id: "meridian/email-nordvind-cautious",
    kind: "email",
    from: "external",
    fromName: "Nordvind Retail",
    role: "Supplier sustainability",
    time: "15:18",
    subject: "Re: preview meeting",
    body: [
      "Thank you for the baseline. It is less than some suppliers claim and more than most can show. We'll extend evaluation by 60 days.",
    ],
  },
  "meridian/email-nordvind-pushback": {
    id: "meridian/email-nordvind-pushback",
    kind: "email",
    from: "external",
    fromName: "Nordvind Retail",
    role: "Supplier sustainability",
    time: "16:44",
    subject: "Re: preview meeting",
    body: ["Can you share your baseline?"],
  },
  "meridian/email-nordvind-intrigued": {
    id: "meridian/email-nordvind-intrigued",
    kind: "email",
    from: "external",
    fromName: "Nordvind Retail",
    role: "Supplier sustainability",
    time: "13:09",
    subject: "Re: preview meeting",
    body: ["Let's scope a joint working group."],
  },

  // --- Phase 4
  "meridian/org-chart-empty": {
    id: "meridian/org-chart-empty",
    kind: "orgchart",
    highlightNodeId: "owner",
  },
};

export const MERIDIAN_ARTIFACT_IDS = Object.keys(ARTIFACTS);

// ---------------------------------------------------------------- phases

export type TagKey = "clock" | "wallet" | "target" | "eye" | "handshake" | "doc" | "chartDown" | "megaphone" | "shield" | "feather" | "question" | "scales" | "dice" | "globe" | "key" | "warning" | "rocket" | "turtle" | "brain" | "recycle" | "gap" | "trophy";

export type Choice = {
  id: string;
  title: string;
  body: string;
  /**
   * Who has a stake in this option. Knowable before deciding — unlike how they
   * will react, which is the thing the scenario is actually about.
   */
  touches: StakeholderKey[];
  tags: { icon: TagKey; text: string }[];
  category: CategoryCode;
  consequence: {
    weekSet?: number;
    weekAdd?: number;
    budget: number;
    moods: Partial<Record<StakeholderKey, Mood>>;
    /** Applied only when the stakeholder is currently in `whenCurrent`. */
    moodsIf?: { key: StakeholderKey; whenCurrent: Mood; then: Mood }[];
    revealNow: string[];
    revealNextPhase: string[];
  };
};

/** How to think about a phase, never which option to take. */
export type Briefing = {
  short: string;
  /** Each question carries what a good answer sounds like — never which one. */
  questions: { q: string; lookFor: string }[];
  more: {
    title: string;
    paragraphs: string[];
    links: { label: string; source: SourceKey; note: string }[];
  };
};

export type PhaseSpec = {
  id: Phase;
  briefing: Briefing;
  banner: { left: string; right: string };
  readBack: string;
  /** Artifacts shown above the choices for this phase. */
  opener: string[];
  choices: Choice[];
  next: Phase;
};

export const PROLOGUE = {
  company: {
    title: "Meridian Logistics AG",
    subline:
      "Mid-size European logistics & fulfilment · 800 employees · 3 sites (HQ + 2 warehouses)",
    growth:
      "The business has grown 40% in two years. IT has not kept pace with it, and the gap is now visible from outside the company.",
    /** The state of the estate — the thing Nadia has inherited. */
    estateTitle: "What you have inherited",
    estate: [
      {
        label: "Hybrid, and unplanned",
        text: "An ageing on-premise data centre running alongside cloud services from three providers, adopted at different times for different reasons.",
      },
      {
        label: "A mixed laptop fleet",
        text: "No standard model and no standard age. What a person is issued depends on when and where they joined.",
      },
      {
        label: "Decentralised device procurement",
        text: "Each site buys its own hardware. There is no single list of what Meridian owns.",
      },
      {
        label: "Electricity climbing every quarter",
        text: "Data centre consumption has risen in each of the last several quarters. Nobody has been asked why.",
      },
      {
        label: "No number for the footprint",
        text: "Not one person in the company holds a firm figure for IT's carbon footprint. Not IT, not Facilities, not Finance.",
      },
    ],
  },
  role: "You are Nadia, IT Strategy Lead. Six weeks in the role. Direct report to Marcus (CIO).",
  artifacts: [
    "meridian/email-marcus-opening",
    "meridian/slack-sabine-heads-up",
    "meridian/email-rafael-cold",
  ],
  situation: "12 weeks. Budget not confirmed. No baseline data. Board waiting.",
};

export const PHASES: PhaseSpec[] = [
  {
    id: "p1",
    briefing: {
      short:
        "A first move is not just what you do. It is what you can still know afterwards. Before picking, separate a field of action from optics.",
      questions: [
        {
          q: "Which of these produces knowledge you do not have yet?",
          lookFor:
            "You are listening for whether the output is a fact or an impression. An audit produces numbers. A photograph produces a feeling. Both are useful; only one can be argued from.",
        },
        {
          q: "Which one produces something to show, and is visibility what is scarce right now, or is it evidence?",
          lookFor:
            "Scarcity decides. If the programme is safe, visibility is cheap and evidence is valuable. If it is about to be cut, the reverse is true.",
        },
        {
          q: "What does each one make impossible for the next eight weeks?",
          lookFor:
            "Add the duration on the card to today. Whatever falls after that date is what you just gave up, whether or not anyone names it.",
        },
      ],
      more: {
        title: "Fields of action, and the cost of a first move",
        paragraphs: [
          "A field of action is somewhere a decision can change a physical or contractual fact: what is bought, how long it runs, when it is replaced, who signs it off. Optics is anything that changes what people believe without changing one of those. Both are legitimate moves; the mistake is not being able to say which one you just made.",
          "Every first move spends the same twelve weeks. The real cost of an option is not on its price tag. It is the option it closes off. Six weeks of audit means six weeks not spent negotiating a contract. Three weeks of visible delivery means arriving at Phase 2 without a baseline to argue from.",
          "Meridian's estate has four candidate fields of action: what the data centre draws, how long devices live, how cloud is bought, and who decides any of it. Nothing in Phase 1 fixes any of them. It decides which one you will be able to see clearly.",
        ],
        links: [
          {
            label: "How IT footprints are usually broken down",
            source: "techCarbon",
            note: "The categories most estates split into, and where the weight normally sits.",
          },
          {
            label: "Why the value chain is usually the biggest share",
            source: "csrd",
            note: "Scope 3 is most of the number for a technology estate, and the hardest to evidence.",
          },
        ],
      },
    },
    banner: { left: "Phase 1 · Week 1", right: "Your first move sets the pattern." },
    readBack:
      "One week to establish direction. Marcus is watching. Sabine just warned you off drama. Rafael doesn't want disruption. What do you do first?",
    opener: [],
    next: "p2",
    choices: [
      {
        id: "p1-a",
        touches: ["marcus", "elena"],
        title: "Data first",
        body: "Commission a full energy audit and device inventory before any commitments are made.",
        tags: [
          { icon: "clock", text: "6 to 8 weeks" },
          { icon: "wallet", text: "low cost" },
          { icon: "target", text: "fact base" },
        ],
        category: "G",
        consequence: {
          weekSet: 6,
          budget: 5,
          moods: { marcus: "skeptical" },
          revealNow: ["meridian/artifact-audit-preview"],
          revealNextPhase: [
            "meridian/calendar-urgent-marcus",
            "meridian/slack-marcus-doorway",
          ],
        },
      },
      {
        id: "p1-b",
        touches: ["sabine", "marcus"],
        title: "Visible quick win",
        body: "Push through a fast-track laptop refresh of the 50 oldest units. Photo-friendly and simple to report.",
        tags: [
          { icon: "clock", text: "3 weeks" },
          { icon: "wallet", text: "€80k" },
          { icon: "eye", text: "board-visible" },
        ],
        category: "R",
        consequence: {
          weekSet: 4,
          budget: 80,
          moods: { sabine: "hostile", marcus: "warming" },
          revealNow: ["meridian/artifact-laptop-photo"],
          revealNextPhase: [
            "meridian/email-sabine-complaint",
            "meridian/email-audit-late",
          ],
        },
      },
      {
        id: "p1-c",
        touches: ["sabine", "rafael", "elena"],
        title: "Alignment first",
        body: "Convene an internal workshop with Procurement, Ops and Finance. Set scope, ownership and shared vocabulary.",
        tags: [
          { icon: "clock", text: "2 weeks" },
          { icon: "wallet", text: "low cost" },
          { icon: "handshake", text: "stakeholder buy-in" },
        ],
        category: "G",
        consequence: {
          weekSet: 3,
          budget: 3,
          moods: { sabine: "wary", rafael: "neutral", marcus: "wary" },
          revealNow: ["meridian/artifact-workshop-notes"],
          revealNextPhase: ["meridian/slack-marcus-nervous"],
        },
      },
      {
        id: "p1-d",
        touches: ["elena", "marcus"],
        title: "External assessment",
        body: "Retain an ESG advisory firm for a rapid 4-week assessment. Independent, but generic and expensive.",
        tags: [
          { icon: "clock", text: "4 weeks" },
          { icon: "wallet", text: "€45k" },
          { icon: "doc", text: "external report" },
        ],
        category: "G",
        consequence: {
          weekSet: 5,
          budget: 45,
          moods: { elena: "skeptical", marcus: "neutral" },
          revealNow: ["meridian/artifact-consultant-report"],
          revealNextPhase: ["meridian/memo-elena-questions"],
        },
      },
    ],
  },
  {
    id: "p2",
    briefing: {
      short:
        "Three areas, one budget. Impact, feasibility and visibility rarely point at the same one, and the largest line is not always the movable one.",
      questions: [
        {
          q: "Which area is largest, and which is most changeable? They are often not the same.",
          lookFor:
            "The percentages give you size. The duration tags give you horizon. Size is the ceiling; horizon decides whether you reach it inside the year.",
        },
        {
          q: "Who has to agree before this can start, and do they know that yet?",
          lookFor:
            "Look at whose stake is listed under the option. If someone holding a veto is not in the conversation yet, the timeline on the card is optimistic.",
        },
        {
          q: "If this is all you deliver this year, does the year still hold together?",
          lookFor:
            "Ask whether it leaves the next decision easier or leaves something that has to be defended on its own.",
        },
      ],
      more: {
        title: "Prioritising when the three tests disagree",
        paragraphs: [
          "Impact asks how much of the footprint an option can move. Feasibility asks whether it can be done with the people, budget and authority you actually have. Visibility asks whether anyone outside IT will notice. A strong option usually wins two and loses one, and being able to name which one it loses is what makes the case defensible.",
          "The trap in this phase is treating the biggest percentage as the answer. The data centre is the largest line and also the one with the longest horizon, the highest capital cost and the most operational risk. That is a different question from whether it is the right thing to start.",
          "The other trap is the opposite: choosing the smallest, safest area because it can be finished. Finishing something small is worth a great deal in a first year, and worth very little if it becomes the whole programme.",
        ],
        links: [
          {
            label: "Data centre energy, in context",
            source: "ieaEnergyAi",
            note: "How large data centre demand actually is, and how fast it is moving.",
          },
          {
            label: "Why device lifetime carries so much weight",
            source: "techCarbon",
            note: "Most of a device's footprint is spent before it is switched on.",
          },
          {
            label: "Shifting workloads rather than replacing them",
            source: "sci",
            note: "The standard behind carbon-aware placement, and why offsets do not move it.",
          },
        ],
      },
    },
    banner: { left: "Phase 2", right: "Choose your focus." },
    readBack:
      "You now have a rough sense of Meridian's IT footprint. Three areas stand out. Marcus has approved budget for one serious initiative plus small governance work. What do you fund?",
    opener: ["meridian/dashboard-footprint-preview"],
    next: "p3",
    choices: [
      {
        id: "p2-a",
        touches: ["rafael", "elena"],
        title: "Data centre migration",
        body: "Migrate on-prem workloads to a green-certified colocation partner. Largest impact, longest horizon, highest disruption risk.",
        tags: [
          { icon: "clock", text: "12 to 18 months" },
          { icon: "wallet", text: "€800k+ CAPEX" },
          { icon: "chartDown", text: "~35% reduction" },
        ],
        category: "E",
        consequence: {
          weekAdd: 3,
          budget: 40,
          moods: { rafael: "hostile", elena: "skeptical" },
          revealNow: [],
          revealNextPhase: ["meridian/email-rafael-warning"],
        },
      },
      {
        id: "p2-b",
        touches: ["sabine", "marcus"],
        title: "Laptop lifecycle programme",
        body: "Extend fleet lifetime with structured refurb, condition-based refresh, and end-of-life management. Fast, visible, Procurement can co-own.",
        tags: [
          { icon: "clock", text: "3 to 4 months" },
          { icon: "wallet", text: "€120k" },
          { icon: "chartDown", text: "~15% reduction" },
        ],
        category: "R",
        consequence: {
          weekAdd: 3,
          budget: 120,
          moods: { sabine: "warming", marcus: "warming" },
          moodsIf: [{ key: "sabine", whenCurrent: "hostile", then: "wary" }],
          revealNow: [],
          revealNextPhase: ["meridian/artifact-fleet-dashboard"],
        },
      },
      {
        id: "p2-c",
        touches: ["elena", "marcus"],
        title: "Cloud FinOps + governance",
        body: "Consolidate providers, kill idle resources, and instrument carbon per workload. Strong number, low visibility, needs a skilled owner.",
        tags: [
          { icon: "clock", text: "6 months" },
          { icon: "wallet", text: "€90k" },
          { icon: "chartDown", text: "~25% reduction" },
        ],
        category: "Em",
        consequence: {
          weekAdd: 4,
          budget: 90,
          moods: { elena: "warming", marcus: "wary" },
          revealNow: [],
          revealNextPhase: ["meridian/artifact-cloud-savings"],
        },
      },
      {
        id: "p2-d",
        touches: ["marcus", "sabine", "rafael", "elena"],
        title: "Balanced roadmap (start all three small)",
        body: "A staged programme that touches all three areas at reduced scope. Nothing lands fully in 12 weeks. Political cover via breadth.",
        tags: [
          { icon: "clock", text: "ongoing" },
          { icon: "wallet", text: "€150k spread" },
          { icon: "scales", text: "diffused impact" },
        ],
        category: "G",
        consequence: {
          weekAdd: 4,
          budget: 150,
          moods: {},
          revealNow: [],
          revealNextPhase: ["meridian/slack-team-confusion"],
        },
      },
    ],
  },
  {
    id: "p3",
    briefing: {
      short:
        "A claim is a commitment. Whatever goes in that box becomes something a customer, an auditor or a journalist can check against your delivery.",
      questions: [
        {
          q: "Can you defend this line by line in twelve months, with what you will actually have?",
          lookFor:
            "Take each clause and name the document you would produce for it. A clause with no document behind it is a promise, not a claim.",
        },
        {
          q: "What happens to this sentence if delivery slips by two quarters?",
          lookFor:
            "A modest claim survives a slip as a delay. An ambitious one converts the same slip into a credibility problem.",
        },
        {
          q: "Who is the audience: the buyer's procurement team, your own board, or a press release?",
          lookFor:
            "Procurement reads for evidence, a board reads for confidence, a press release reads for a headline. Only one of the three is still reading in twelve months.",
        },
      ],
      more: {
        title: "What a sustainability claim exposes you to",
        paragraphs: [
          "The exposure in this phase is not having a weak position. It is publishing a position you cannot evidence. A modest number you can show beats an ambitious number you cannot, because the ambitious one converts every later delay into a credibility problem rather than a delivery problem.",
          "Buyers' procurement teams read these claims for a living. Vague commitment language, such as “significant reduction” or “aligned with science-based targets”, is legally safe and reads to a professional buyer as an absence of data. It usually produces a follow-up question rather than a signature.",
          "This is also the phase where somebody else's incentives are pulling on you. Marketing wants a headline. Your CIO wants a board slide. Neither of them will be asked to produce the evidence in twelve months.",
        ],
        links: [
          {
            label: "A €25 million fine for the claim, not the performance",
            source: "dws",
            note: "German prosecutors fined DWS after its ESG marketing did not match its processes.",
          },
          {
            label: "What regulated disclosure actually requires",
            source: "csrd",
            note: "Where a voluntary claim stops and an auditable statement begins.",
          },
        ],
      },
    },
    banner: { left: "Phase 3 · Week 10", right: "Two weeks to board." },
    readBack:
      "Nordvind wants a preview meeting before the board presentation. Marketing has drafted a slide with room for a headline claim. Nadia's data says progress is real but modest.",
    opener: ["meridian/slide-nordvind-draft", "meridian/email-marketing-slide"],
    next: "p4",
    choices: [
      {
        id: "p3-a",
        touches: ["marcus"],
        title: "Bold public commitment",
        body: "Announce Net Zero IT by 2028 with quantified interim targets. Nordvind will love it. Internal data supports maybe 40% of the claim.",
        tags: [
          { icon: "megaphone", text: "high signal" },
          { icon: "warning", text: "credibility exposure" },
          { icon: "target", text: "aspirational" },
        ],
        category: "G",
        consequence: {
          weekSet: 10,
          budget: 0,
          moods: { marcus: "warming" },
          revealNow: [],
          revealNextPhase: [
            "meridian/email-nordvind-excited",
            "meridian/slack-cto-nervous",
          ],
        },
      },
      {
        id: "p3-b",
        touches: ["elena", "marcus"],
        title: "Honest baseline + modest roadmap",
        body: "Present the actual baseline and a 3-year roadmap you can defend line by line. Nordvind may push back or shop around.",
        tags: [
          { icon: "doc", text: "evidence-first" },
          { icon: "shield", text: "defensible" },
          { icon: "chartDown", text: "unglamorous" },
        ],
        category: "G",
        consequence: {
          weekSet: 10,
          budget: 0,
          moods: { elena: "ally" },
          revealNow: [],
          revealNextPhase: ["meridian/email-nordvind-cautious"],
        },
      },
      {
        id: "p3-c",
        touches: [],
        title: "Aspirational language, no hard number",
        body: "“Committed to significant reduction, aligned with science-based targets.” Safe on paper. Nordvind's team has been burned by greenwashing claims before.",
        tags: [
          { icon: "feather", text: "low-risk copy" },
          { icon: "question", text: "vague to buyer" },
          { icon: "scales", text: "legally safe" },
        ],
        category: "G",
        consequence: {
          weekSet: 10,
          budget: 0,
          moods: {},
          revealNow: [],
          revealNextPhase: ["meridian/email-nordvind-pushback"],
        },
      },
      {
        id: "p3-d",
        touches: ["rafael", "marcus"],
        title: "Reframe the conversation",
        body: "Propose a joint pilot on shared supply-chain sustainability data. Shift from vendor-report to partnership. Risky: may read as deflection.",
        tags: [
          { icon: "handshake", text: "partnership move" },
          { icon: "dice", text: "outcome uncertain" },
          { icon: "globe", text: "wider scope" },
        ],
        category: "G",
        consequence: {
          weekSet: 10,
          budget: 0,
          moods: { rafael: "warming", marcus: "wary" },
          revealNow: [],
          revealNextPhase: ["meridian/email-nordvind-intrigued"],
        },
      },
    ],
  },
  {
    id: "p4",
    briefing: {
      short:
        "Ownership is the decision that decides the others. Ask what survives your own departure, not what works while you are in the room.",
      questions: [
        {
          q: "Who is accountable when the number is questioned in public?",
          lookFor:
            "Name the person out loud. If you cannot, the arrangement has not answered the question yet.",
        },
        {
          q: "What happens to this arrangement if you are promoted in nine months?",
          lookFor:
            "Anything that stops when one person moves was a person, not a structure.",
        },
        {
          q: "Does this need expertise, authority, or both, and does the option supply the one it needs?",
          lookFor:
            "Expertise without a mandate produces recommendations nobody has to act on. A mandate without expertise approves the wrong things confidently.",
        },
      ],
      more: {
        title: "Why governance is the L3 question",
        paragraphs: [
          "Every earlier phase produced something that has to keep running: a baseline that needs maintaining, criteria that need applying, a claim that needs evidencing. Governance is the answer to who does that after the attention moves on.",
          "The choice is usually framed as speed against resilience. A single owner decides quickly and stops the moment that person changes role. A committee decides slowly and survives. Expertise and authority are separate things: a specialist without a mandate writes recommendations, and a mandate without expertise approves the wrong ones.",
          "This is where L2 hands over to L3. Everything before this was about choosing well. This is about making the next person's choices better than yours were, which is the only version of the job that compounds.",
        ],
        links: [
          {
            label: "Roles and duties that are becoming statutory",
            source: "enefg",
            note: "German data centres now carry named obligations, not just good intentions.",
          },
          {
            label: "Where sustainability governance gets disclosed",
            source: "csrd",
            note: "Reporting asks who is accountable, not only what the figures are.",
          },
        ],
      },
    },
    banner: { left: "Phase 4 · Week 12", right: "Board meeting tomorrow." },
    readBack:
      "Marcus asks the question the board will ask: “Who owns this going forward?”",
    opener: ["meridian/org-chart-empty"],
    next: "debrief",
    choices: [
      {
        id: "p4-a",
        touches: ["marcus"],
        title: "Nadia takes it personally",
        body: "You add Green IT to your remit as IT Strategy Lead. Full control, career accelerator, no protection against burnout or turnover.",
        tags: [
          { icon: "key", text: "clear owner" },
          { icon: "warning", text: "single point of failure" },
          { icon: "rocket", text: "career move" },
        ],
        category: "G",
        consequence: { weekSet: 12, budget: 0, moods: {}, revealNow: [], revealNextPhase: [] },
      },
      {
        id: "p4-b",
        touches: ["marcus", "sabine", "rafael", "elena"],
        title: "Cross-functional steering committee",
        body: "IT, Procurement, Ops, Finance sit together monthly. Slower decisions, resilient to any one person leaving.",
        tags: [
          { icon: "handshake", text: "shared ownership" },
          { icon: "turtle", text: "slower cadence" },
          { icon: "shield", text: "resilient" },
        ],
        category: "G",
        consequence: { weekSet: 12, budget: 0, moods: {}, revealNow: [], revealNextPhase: [] },
      },
      {
        id: "p4-c",
        touches: ["elena", "marcus"],
        title: "Hire a dedicated Sustainability Officer in IT",
        body: "€90k/year role reporting to the CIO. Expertise from day one; Finance will challenge the ROI early.",
        tags: [
          { icon: "brain", text: "specialist" },
          { icon: "wallet", text: "recurring cost" },
          { icon: "clock", text: "3-month hire" },
        ],
        category: "G",
        consequence: { weekSet: 12, budget: 0, moods: {}, revealNow: [], revealNextPhase: [] },
      },
      {
        id: "p4-d",
        touches: [],
        title: "Delegate to existing CSR team (in HR)",
        body: "They already report sustainability. They also don't understand IT infrastructure. Recommendations risk being unimplementable.",
        tags: [
          { icon: "recycle", text: "reuses org" },
          { icon: "gap", text: "IT-CSR distance" },
          { icon: "doc", text: "report-shaped" },
        ],
        category: "G",
        consequence: { weekSet: 12, budget: 0, moods: {}, revealNow: [], revealNextPhase: [] },
      },
    ],
  },
];

// ---------------------------------------------------------------- endings

export const ENDINGS: Record<
  EndingId,
  { name: string; body: string; art: EndingId; beats: string[] }
> = {
  "photo-op-trap": {
    beats: [
      "Nordvind signs. The board applauds.",
      "Month 18: an independent audit shows total footprint barely moved.",
      "Year 3: Nordvind churns, and the claim is still searchable.",
    ],
    name: "The Photo Op",
    art: "photo-op-trap",
    body: "Nordvind signs. The board applauds. Eighteen months later, an independent audit shows total footprint barely moved. Nordvind churns in year 3, and there is now a reputational tail on Google.",
  },
  "slow-burn": {
    beats: [
      "Week 8: Marcus asks to see progress before the board pack.",
      "Nordvind signs after a negotiation, with a 60-day evaluation clause.",
      "Elena starts treating Green IT as a category rather than a project.",
    ],
    name: "Quiet Winning",
    art: "slow-burn",
    body: "No spectacle. The roadmap is defensible line by line. Nordvind extends the contract with a 60-day evaluation clause. Marcus gets his board slide. Elena starts asking about the Green IT line as a category, not a project.",
  },
  overreach: {
    beats: [
      "The commitment lands well externally.",
      "Month 12: internal delivery is off pace against the interim targets.",
      "Nordvind asks for evidence. The board asks Marcus. Marcus asks you.",
    ],
    name: "The Bold Claim",
    art: "overreach",
    body: "The commitment lands well externally, but 12 months later the internal delivery is off pace. Nordvind asks for evidence. The board asks Marcus. Marcus asks you. Your calendar changes.",
  },
  "missed-opportunity": {
    beats: [
      "The method was sound and the alignment was real.",
      "Week 12 arrives with analysis and no decision to present.",
      "Nordvind's clause triggers.",
    ],
    name: "Right Process, Wrong Pace",
    art: "missed-opportunity",
    body: "The method was sound. The alignment was real. But 12 weeks was not enough runway for the shape you chose. Nordvind's clause triggers. The board asks what happened.",
  },
  "governance-win": {
    beats: [
      "The committee meets monthly and keeps meeting.",
      "The board approves continued budget.",
      "Nadia is promoted nine months later, and the ownership survives it.",
    ],
    name: "The Boring Win",
    art: "governance-win",
    body: "The steering committee is unglamorous but it holds. Ownership survives your next promotion, and the one after. Six years later, this is the year Meridian stops calling Green IT a project.",
  },
  "quiet-architect": {
    name: "The Quiet Architect",
    art: "quiet-architect",
    beats: [
      "Nobody outside the programme noticed the year happening.",
      "The spend never grew large enough to need defending.",
      "The next person to hold this inherits a working machine, not a backlog.",
    ],
    body: "You built the capability, kept ownership shared, and did it for less money than a single quick win would have cost. There is no announcement and no relaunch, because there is nothing to relaunch. The decisions that follow are simply better than the ones before them, and nobody can point to the moment that changed.",
  },
  "quiet-drift": {
    beats: [
      "Nordvind's clause is met with a boilerplate paragraph.",
      "No headline decisions and no headline consequences.",
      "Someone else inherits this in eighteen months.",
    ],
    name: "Nothing Happened",
    art: "quiet-drift",
    body: "No headline decisions, no headline consequences. Nordvind's clause is met with a boilerplate paragraph. Someone else will inherit this in eighteen months.",
  },
};

export const DEBRIEF_MESSAGE = [
  "Green IT at management level is not the question “which choice is correct.” It is the question “does this sequence of choices hold together.” A bold commitment paired with weak governance is not braver than a modest commitment paired with strong governance. It is more exposed.",
  "Notice which stakeholders you brought with you, and which you left behind. In practice, that is what determines whether a decision survives a change of CIO.",
];

export const SIGNAL_LABELS: { key: keyof import("@/lib/types").Signals; label: string }[] = [
  { key: "visibility", label: "Visibility" },
  { key: "depth", label: "Depth" },
  { key: "governance", label: "Governance" },
  { key: "soloism", label: "Soloism" },
  { key: "deferral", label: "Deferral" },
  { key: "reframe", label: "Reframe" },
];

// ==================================================================
// German (_DE). Structure, ids, numbers, hex colours, mood/category
// type values and SourceKey values are identical to the English
// source above — only learner-facing prose is translated. Person
// names and "Meridian Logistics" stay as-is; role titles are
// rendered as natural German org-chart titles. See lib/locale.ts for
// the overlay pattern these are consumed with.
// ==================================================================

export const STAKEHOLDERS_DE: typeof STAKEHOLDERS = {
  marcus: {
    name: "Marcus Vogel",
    role: "CIO",
    tint: "#6E8DC1",
    wants: "Schnelle Erfolge, die er in die nächste Vorstandssitzung mitnehmen kann.",
    controls: "Deine Ziele, deinen Budgetantrag und das, was der Vorstand über dich hört.",
    why: "Er ist dein Vorgesetzter, und er ist kein Hindernis. Es ist seine eigene Position, die exponiert ist, wenn die Nordvind-Klausel verpasst wird.",
  },
  sabine: {
    name: "Sabine Keller",
    role: "Leiterin Einkauf",
    tint: "#F1B24A",
    wants: "Keine Dramen. Drei Ausschreibungen schließen dieses Quartal, und sie ist schon jetzt ausgelastet.",
    controls: "Die Lieferantenliste. Nichts wird außerhalb davon eingekauft, und sie entscheidet, was draufkommt.",
    why: "Fünfzehn Jahre bei Meridian. Sie hat schon erlebt, wie die IT mit einer neuen Priorität ankam – und wie diese wieder verschwand.",
  },
  rafael: {
    name: "Rafael Costa",
    role: "Leiter Operations",
    tint: "#6FB56A",
    wants: "IT, die sich nicht bewegt. Jede Störung ist eine verspätete Bestellung und ein unzufriedener Kunde.",
    controls: "Die Änderungsfenster in den Lagern. Ohne seine Freigabe passiert nichts an den Standorten.",
    why: "Er wird an ausgelieferten Bestellungen gemessen, nicht an Emissionen. Für ihn ist Stabilität keine Vorsicht, sondern der Job.",
  },
  elena: {
    name: "Elena",
    role: "CFO",
    tint: "#B389D6",
    wants: "Eine konkrete Rendite, die sie der Position gegenüberstellen kann.",
    controls: "Die Budgetfreigabe. Sie sitzt nicht in deinen Meetings; sie liest die Zahlen im Nachhinein.",
    why: "Sie ist bisher noch nicht aufgetreten, weshalb ihre Haltung als unbekannt beginnt. Du wirst von ihr hören, sobald eine Zahl gerechtfertigt werden muss.",
  },
};

export const MOOD_LABEL_DE: typeof MOOD_LABEL = {
  unknown: "Unbekannt",
  hostile: "Feindselig",
  skeptical: "Skeptisch",
  wary: "Vorsichtig",
  neutral: "Neutral",
  warming: "Auftauend",
  ally: "Verbündet",
};

export const ARTIFACTS_DE: typeof ARTIFACTS = {
  "meridian/email-marcus-opening": {
    id: "meridian/email-marcus-opening",
    kind: "email",
    from: "marcus",
    fromName: "Marcus Vogel",
    role: "CIO",
    to: "Nadia Rahmani",
    time: "08:47",
    subject: "Nordvind-Klausel: wir brauchen einen Plan",
    body: [
      "Nadia, ich komme gerade aus dem Meeting mit Nordvind Retail. Sie stehen für 30 % unseres Umsatzes. Ihre Ausschreibungsverlängerung enthält eine neue Klausel: IT-Nachhaltigkeitsbericht innerhalb von 6 Monaten, sonst wird der Vertrag nicht verlängert.",
      "Vorstandssitzung ist in 12 Wochen. Die wollen deinen Plan sehen.",
      "Kümmere dich darum.",
      "M",
    ],
  },
  "meridian/slack-sabine-heads-up": {
    id: "meridian/slack-sabine-heads-up",
    kind: "slack",
    channel: "DM",
    from: "sabine",
    fromName: "Sabine Keller",
    role: "Leiterin Einkauf",
    time: "09:12",
    message:
      "hab von dem „Green IT“-Ding gehört. bitte mach kein drama draus. wir haben dieses quartal noch drei ausschreibungen am laufen.",
  },
  "meridian/email-rafael-cold": {
    id: "meridian/email-rafael-cold",
    kind: "email",
    from: "rafael",
    fromName: "Rafael Costa",
    role: "Leiter Operations",
    time: "09:34",
    subject: "Re: Laptop-Erneuerungsfenster",
    forwarded: true,
    body: [
      "Wenn Green IT bedeutet, dass in den Lagern etwas angefasst wird, brauche ich zwei Wochen Vorlauf. Jede Stunde Ausfallzeit ist eine verspätete Bestellung.",
    ],
  },

  // --- Phase 1 outcomes
  "meridian/artifact-audit-preview": {
    id: "meridian/artifact-audit-preview",
    kind: "figure",
    title: "Energieaudit: Teilergebnisse",
    desc: "Ein Dashboard, teilweise mit Daten gefüllt: drei Kacheln befüllt, zwei noch leer.",
    art: "audit-preview",
  },
  "meridian/calendar-urgent-marcus": {
    id: "meridian/calendar-urgent-marcus",
    kind: "calendar",
    title: "DRINGEND: Der Vorstand fragt nach. Was sage ich denen?",
    day: "Donnerstag",
    time: "16:30",
    attendees: ["Marcus Vogel", "Nadia Rahmani"],
    urgent: true,
  },
  "meridian/slack-marcus-doorway": {
    id: "meridian/slack-marcus-doorway",
    kind: "slack",
    channel: "DM",
    from: "marcus",
    fromName: "Marcus Vogel",
    role: "CIO",
    time: "09:20",
    message:
      "war grad bei dir, du warst in der Audit-Review. der vorstand will nächste woche ein update. was sag ich denen?",
  },
  "meridian/artifact-laptop-photo": {
    id: "meridian/artifact-laptop-photo",
    kind: "figure",
    title: "Fünfzig neue Laptops, bereitgestellt im Lager",
    desc: "Gestapelte Kartons mit neuen Laptops auf einer Lagerpalette, fotografiert fürs Reporting.",
    art: "laptop-photo",
  },
  "meridian/email-sabine-complaint": {
    id: "meridian/email-sabine-complaint",
    kind: "email",
    from: "sabine",
    fromName: "Sabine Keller",
    role: "Leiterin Einkauf",
    to: "Marcus Vogel · cc Personal & Kultur",
    time: "16:55",
    subject: "Beschaffungsprozess: die Laptop-Bestellung",
    body: [
      "Marcus, fünfzig Geräte sind über eine Express-Freigabe gelaufen, ohne den Einkauf zu durchlaufen. Ich habe erst durch die Rechnung davon erfahren.",
      "Ich habe nichts gegen die Geräte einzuwenden. Ich habe etwas dagegen, erst hinterher informiert zu werden. Wenn Green IT künftig so laufen soll, sag es jetzt, dann plane ich entsprechend.",
    ],
  },
  "meridian/email-audit-late": {
    id: "meridian/email-audit-late",
    kind: "email",
    from: "external",
    fromName: "Facility Management",
    role: "Energiereporting",
    time: "11:20",
    subject: "Fußabdruck-Aufschlüsselung: erster Entwurf",
    body: [
      "Erster Entwurf der angeforderten IT-Aufschlüsselung. Die Laptop-Flotte macht rund 12 % des gesamten IT-Fußabdrucks aus. Das On-Prem-Rechenzentrum ist der dominante Posten.",
    ],
  },
  "meridian/artifact-workshop-notes": {
    id: "meridian/artifact-workshop-notes",
    kind: "figure",
    title: "Workshop-Whiteboard",
    desc: "Ein Whiteboard, in Spalten nach Funktion unterteilt, jede mit Klebezetteln und einem Namen oben.",
    art: "workshop-notes",
  },
  "meridian/slack-marcus-nervous": {
    id: "meridian/slack-marcus-nervous",
    kind: "slack",
    channel: "DM",
    from: "marcus",
    fromName: "Marcus Vogel",
    role: "CIO",
    time: "17:05",
    message: "gibt's schon was, worauf ich zeigen kann?",
  },
  "meridian/artifact-consultant-report": {
    id: "meridian/artifact-consultant-report",
    kind: "figure",
    title: "Externe Bewertung: 47 Seiten",
    desc: "Das Deckblatt eines dicken, gebundenen Beratungsberichts mit Seitenzahl auf dem Buchrücken.",
    art: "consultant-report",
    caption:
      "Benchmarks, Branchendurchschnitte und ein Reifegradmodell. Nichts darin nennt ein System, einen Vertrag oder eine Person von Meridian.",
  },
  "meridian/memo-elena-questions": {
    id: "meridian/memo-elena-questions",
    kind: "memo",
    from: "elena",
    fromName: "Elena",
    to: "Nadia Rahmani",
    date: "Woche 5",
    subject: "Beratungsmandat: Kostenaufschlüsselung",
    body: [
      "Bitte schlüssle die €45k gegen die erwarteten Ergebnisse auf. Ich muss die Position gegen etwas rechtfertigen können.",
    ],
  },

  // --- Phase 2
  "meridian/dashboard-footprint-preview": {
    id: "meridian/dashboard-footprint-preview",
    kind: "dashboard",
    title: "Wo Meridians IT-Energie hingeht",
    segments: [
      { label: "Rechenzentrum on-prem", value: 42, category: "E" },
      { label: "Cloud-Wildwuchs (3 Anbieter)", value: 25, category: "Em" },
      { label: "Laptop-Flotte (800 Geräte, Ø 5,8 Jahre)", value: 18, category: "R" },
      { label: "Sonstiges (Netzwerk, Druck, Diverses)", value: 15, category: "U" },
    ],
    caption:
      "PUE 2,1 · Erneuerungszyklus 3 Jahre (Rückstau) · ungenutzte Cloud-Ressourcen nicht konsolidiert.",
    details: [
      {
        label: "Rechenzentrum on-prem",
        points: [
          "2016 installiert und nie neu geplant.",
          "PUE 2,1. Für jede Einheit, die bei der Rechenleistung ankommt, gehen 1,1 weitere in Kühlung, Umwandlung und Gebäudetechnik.",
          "Größter Einzelposten, und derjenige, von dem Rafaels Lager abhängen.",
        ],
      },
      {
        label: "Cloud-Wildwuchs",
        points: [
          "Drei Anbieter, unabhängig voneinander eingeführt.",
          "Kosten im Jahresvergleich um 60 % gestiegen.",
          "Ungenutzte Ressourcen nie konsolidiert; CO₂ pro Workload überhaupt nicht erfasst.",
        ],
      },
      {
        label: "Laptop-Flotte",
        points: [
          "800 Geräte, Durchschnittsalter 5,8 Jahre.",
          "Auf dem Papier ein Dreijahres-Erneuerungszyklus, mit einem Rückstau, der den Großteil der Flotte darüber hinaus treibt.",
          "Der für Mitarbeitende sichtbarste Bereich, und der kleinste der drei.",
        ],
      },
    ],
  },
  "meridian/email-rafael-warning": {
    id: "meridian/email-rafael-warning",
    kind: "email",
    from: "rafael",
    fromName: "Rafael Costa",
    role: "Leiter Operations",
    time: "07:55",
    subject: "Migrationsfenster",
    body: [
      "Eine Migration dieser Größenordnung betrifft jedes System im Lager. Ich will den Umstellungsplan schriftlich, bevor irgendetwas unterschrieben wird, und den Rückfallplan im selben Dokument.",
    ],
  },
  "meridian/artifact-fleet-dashboard": {
    id: "meridian/artifact-fleet-dashboard",
    kind: "figure",
    title: "Flotten-Lebenszyklus-Tracker",
    desc: "Ein Tracker, der Geräte nach Altersgruppen zeigt, daneben eine Warteschlange für Aufbereitung.",
    art: "fleet-dashboard",
  },
  "meridian/artifact-cloud-savings": {
    id: "meridian/artifact-cloud-savings",
    kind: "figure",
    title: "Cloud-Konsolidierung: laufende Summe",
    desc: "Ein fallendes Liniendiagramm, in dem ungenutzte Ressourcen markiert werden, sobald sie abgeschaltet werden.",
    art: "cloud-savings",
  },
  "meridian/slack-team-confusion": {
    id: "meridian/slack-team-confusion",
    kind: "slack",
    channel: "#greenit-delivery",
    from: "external",
    fromName: "Delivery-Team",
    role: "IT",
    time: "10:41",
    message: "welcher workstream hat diesen sprint priorität?",
  },

  // --- Phase 3
  "meridian/slide-nordvind-draft": {
    id: "meridian/slide-nordvind-draft",
    kind: "slide",
    template: "nordvind-draft",
  },
  "meridian/email-marketing-slide": {
    id: "meridian/email-marketing-slide",
    kind: "email",
    from: "external",
    fromName: "Marketing",
    role: "Marke & Kommunikation",
    time: "11:05",
    subject: "Nordvind-Folie: Die Headline ist noch offen",
    body: [
      "Wir haben das Headline-Feld für dich freigelassen. Unser Rat: etwas Forsches, das trotzdem glaubwürdig bleibt.",
      "Einkäufer in dieser Branche erwarten eine Zahl. „Deutliche Reduktion“ liest sich für ein Einkaufsteam wie nichts, weil sie diese Formulierung jede Woche sehen. Sag uns, was ins Feld soll, wir bauen den Rest drumherum.",
    ],
  },
  "meridian/email-nordvind-excited": {
    id: "meridian/email-nordvind-excited",
    kind: "email",
    from: "external",
    fromName: "Nordvind Retail",
    role: "Lieferanten-Nachhaltigkeit",
    time: "14:02",
    subject: "Re: Vorab-Meeting",
    body: [
      "Das ist genau das Ambitionsniveau, das wir uns von einem Partner eurer Größe erhofft haben. Wir würden das gerne in unserer eigenen Lieferantenkommunikation aufgreifen.",
    ],
  },
  "meridian/slack-cto-nervous": {
    id: "meridian/slack-cto-nervous",
    kind: "slack",
    channel: "DM",
    from: "marcus",
    fromName: "Marcus Vogel",
    role: "CIO",
    time: "14:36",
    message: "das können wir doch wirklich schaffen, oder?",
  },
  "meridian/email-nordvind-cautious": {
    id: "meridian/email-nordvind-cautious",
    kind: "email",
    from: "external",
    fromName: "Nordvind Retail",
    role: "Lieferanten-Nachhaltigkeit",
    time: "15:18",
    subject: "Re: Vorab-Meeting",
    body: [
      "Danke für die Baseline. Sie ist geringer, als manche Lieferanten behaupten, und höher, als die meisten belegen können. Wir verlängern die Prüfung um 60 Tage.",
    ],
  },
  "meridian/email-nordvind-pushback": {
    id: "meridian/email-nordvind-pushback",
    kind: "email",
    from: "external",
    fromName: "Nordvind Retail",
    role: "Lieferanten-Nachhaltigkeit",
    time: "16:44",
    subject: "Re: Vorab-Meeting",
    body: ["Könnt ihr uns eure Baseline zeigen?"],
  },
  "meridian/email-nordvind-intrigued": {
    id: "meridian/email-nordvind-intrigued",
    kind: "email",
    from: "external",
    fromName: "Nordvind Retail",
    role: "Lieferanten-Nachhaltigkeit",
    time: "13:09",
    subject: "Re: Vorab-Meeting",
    body: ["Lasst uns eine gemeinsame Arbeitsgruppe aufsetzen."],
  },

  // --- Phase 4
  "meridian/org-chart-empty": {
    id: "meridian/org-chart-empty",
    kind: "orgchart",
    highlightNodeId: "owner",
  },
};

export const PHASES_DE: typeof PHASES = [
  {
    id: "p1",
    briefing: {
      short:
        "Ein erster Schritt ist nicht nur das, was du tust. Es ist das, was du danach noch wissen kannst. Trenne vor der Wahl ein Handlungsfeld von reiner Außenwirkung.",
      questions: [
        {
          q: "Welche dieser Optionen liefert Wissen, das du noch nicht hast?",
          lookFor:
            "Achte darauf, ob das Ergebnis eine Tatsache ist oder ein Eindruck. Ein Audit liefert Zahlen. Ein Foto liefert ein Gefühl. Beides ist nützlich – aber nur eines lässt sich als Argument anführen.",
        },
        {
          q: "Welche Option liefert etwas Vorzeigbares – und ist gerade Sichtbarkeit das Knappe, oder ist es Evidenz?",
          lookFor:
            "Die Knappheit entscheidet. Ist das Programm sicher, ist Sichtbarkeit billig und Evidenz wertvoll. Steht es kurz vor der Streichung, ist es umgekehrt.",
        },
        {
          q: "Was macht jede Option für die nächsten acht Wochen unmöglich?",
          lookFor:
            "Addiere die Dauer auf der Karte zum heutigen Tag. Was danach liegt, hast du gerade aufgegeben – ob es jemand ausspricht oder nicht.",
        },
      ],
      more: {
        title: "Handlungsfelder, und der Preis eines ersten Schritts",
        paragraphs: [
          "Ein Handlungsfeld ist ein Ort, an dem eine Entscheidung eine physische oder vertragliche Tatsache verändern kann: was gekauft wird, wie lange es läuft, wann es ersetzt wird, wer es abzeichnet. Außenwirkung ist alles, was verändert, was Menschen glauben, ohne eine dieser Tatsachen zu ändern. Beides sind legitime Schritte; der Fehler ist, nicht sagen zu können, welchen du gerade gemacht hast.",
          "Jeder erste Schritt verbraucht dieselben zwölf Wochen. Die wahren Kosten einer Option stehen nicht auf ihrem Preisschild. Sie bestehen aus der Option, die dadurch verschlossen wird. Sechs Wochen Audit bedeuten sechs Wochen, die nicht in Vertragsverhandlungen fließen. Drei Wochen sichtbare Lieferung bedeuten, dass du ohne belastbare Baseline in Phase 2 ankommst.",
          "Meridians IT-Bestand bietet vier mögliche Handlungsfelder: was das Rechenzentrum verbraucht, wie lange Geräte leben, wie Cloud eingekauft wird, und wer darüber entscheidet. Nichts in Phase 1 legt eines davon fest. Es entscheidet, welches davon du klar sehen kannst.",
        ],
        links: [
          {
            label: "Wie IT-Fußabdrücke üblicherweise aufgeschlüsselt werden",
            source: "techCarbon",
            note: "Die Kategorien, in die die meisten IT-Bestände zerfallen, und wo das Gewicht normalerweise liegt.",
          },
          {
            label: "Warum die Wertschöpfungskette meist den größten Anteil ausmacht",
            source: "csrd",
            note: "Scope 3 macht den größten Teil der Zahl für einen Technologiebestand aus – und ist am schwersten zu belegen.",
          },
        ],
      },
    },
    banner: { left: "Phase 1 · Woche 1", right: "Dein erster Schritt setzt das Muster." },
    readBack:
      "Eine Woche, um die Richtung festzulegen. Marcus schaut zu. Sabine hat dich gerade vor Drama gewarnt. Rafael will keine Störung. Was tust du zuerst?",
    opener: [],
    next: "p2",
    choices: [
      {
        id: "p1-a",
        touches: ["marcus", "elena"],
        title: "Erst die Daten",
        body: "Beauftrage ein vollständiges Energieaudit und eine Geräteinventur, bevor irgendwelche Zusagen gemacht werden.",
        tags: [
          { icon: "clock", text: "6 bis 8 Wochen" },
          { icon: "wallet", text: "geringe Kosten" },
          { icon: "target", text: "Faktenbasis" },
        ],
        category: "G",
        consequence: {
          weekSet: 6,
          budget: 5,
          moods: { marcus: "skeptical" },
          revealNow: ["meridian/artifact-audit-preview"],
          revealNextPhase: [
            "meridian/calendar-urgent-marcus",
            "meridian/slack-marcus-doorway",
          ],
        },
      },
      {
        id: "p1-b",
        touches: ["sabine", "marcus"],
        title: "Sichtbarer Schnellerfolg",
        body: "Setze eine Express-Erneuerung der 50 ältesten Laptops durch. Fototauglich und einfach zu berichten.",
        tags: [
          { icon: "clock", text: "3 Wochen" },
          { icon: "wallet", text: "€80k" },
          { icon: "eye", text: "vorstandssichtbar" },
        ],
        category: "R",
        consequence: {
          weekSet: 4,
          budget: 80,
          moods: { sabine: "hostile", marcus: "warming" },
          revealNow: ["meridian/artifact-laptop-photo"],
          revealNextPhase: [
            "meridian/email-sabine-complaint",
            "meridian/email-audit-late",
          ],
        },
      },
      {
        id: "p1-c",
        touches: ["sabine", "rafael", "elena"],
        title: "Erst Abstimmung",
        body: "Berufe einen internen Workshop mit Einkauf, Operations und Finance ein. Lege Umfang, Zuständigkeit und ein gemeinsames Vokabular fest.",
        tags: [
          { icon: "clock", text: "2 Wochen" },
          { icon: "wallet", text: "geringe Kosten" },
          { icon: "handshake", text: "Stakeholder-Zustimmung" },
        ],
        category: "G",
        consequence: {
          weekSet: 3,
          budget: 3,
          moods: { sabine: "wary", rafael: "neutral", marcus: "wary" },
          revealNow: ["meridian/artifact-workshop-notes"],
          revealNextPhase: ["meridian/slack-marcus-nervous"],
        },
      },
      {
        id: "p1-d",
        touches: ["elena", "marcus"],
        title: "Externe Bewertung",
        body: "Beauftrage eine ESG-Beratung mit einer schnellen 4-Wochen-Bewertung. Unabhängig, aber generisch und teuer.",
        tags: [
          { icon: "clock", text: "4 Wochen" },
          { icon: "wallet", text: "€45k" },
          { icon: "doc", text: "externer Bericht" },
        ],
        category: "G",
        consequence: {
          weekSet: 5,
          budget: 45,
          moods: { elena: "skeptical", marcus: "neutral" },
          revealNow: ["meridian/artifact-consultant-report"],
          revealNextPhase: ["meridian/memo-elena-questions"],
        },
      },
    ],
  },
  {
    id: "p2",
    briefing: {
      short:
        "Drei Bereiche, ein Budget. Wirkung, Machbarkeit und Sichtbarkeit zeigen selten auf denselben Bereich, und der größte Posten ist nicht immer der beweglichste.",
      questions: [
        {
          q: "Welcher Bereich ist am größten, und welcher am veränderbarsten? Oft ist das nicht derselbe.",
          lookFor:
            "Die Prozentzahlen geben dir die Größe. Die Dauer-Tags geben dir den Zeithorizont. Die Größe ist die Obergrenze; der Horizont entscheidet, ob du sie innerhalb des Jahres erreichst.",
        },
        {
          q: "Wer muss zustimmen, bevor das starten kann – und weiß diese Person das schon?",
          lookFor:
            "Schau, wessen Interesse unter der Option aufgeführt ist. Sitzt jemand mit einem Veto noch nicht am Tisch, ist der Zeitplan auf der Karte optimistisch.",
        },
        {
          q: "Wenn das alles ist, was du dieses Jahr lieferst – trägt das Jahr trotzdem?",
          lookFor:
            "Frag dich, ob es die nächste Entscheidung leichter macht oder etwas hinterlässt, das für sich allein verteidigt werden muss.",
        },
      ],
      more: {
        title: "Priorisieren, wenn die drei Tests widersprechen",
        paragraphs: [
          "Wirkung fragt, wie viel vom Fußabdruck eine Option bewegen kann. Machbarkeit fragt, ob es sich mit den Leuten, dem Budget und der Befugnis umsetzen lässt, die du tatsächlich hast. Sichtbarkeit fragt, ob außerhalb der IT irgendjemand es bemerkt. Eine starke Option gewinnt meist zwei und verliert eine – und benennen zu können, welche sie verliert, macht den Fall verteidigungsfähig.",
          "Die Falle in dieser Phase ist, die größte Prozentzahl als Antwort zu behandeln. Das Rechenzentrum ist der größte Posten – und zugleich der mit dem längsten Zeithorizont, den höchsten Investitionskosten und dem größten operativen Risiko. Das ist eine andere Frage als die, ob es der richtige Startpunkt ist.",
          "Die andere Falle ist das Gegenteil: den kleinsten, sichersten Bereich zu wählen, weil er sich abschließen lässt. Etwas Kleines fertigzustellen ist im ersten Jahr viel wert – und sehr wenig wert, wenn es zum gesamten Programm wird.",
        ],
        links: [
          {
            label: "Rechenzentrums-Energie im Kontext",
            source: "ieaEnergyAi",
            note: "Wie groß der Energiebedarf von Rechenzentren tatsächlich ist, und wie schnell er wächst.",
          },
          {
            label: "Warum die Lebensdauer von Geräten so viel Gewicht hat",
            source: "techCarbon",
            note: "Der größte Teil des Fußabdrucks eines Geräts entsteht, bevor es überhaupt eingeschaltet wird.",
          },
          {
            label: "Workloads verschieben statt ersetzen",
            source: "sci",
            note: "Der Standard hinter CO₂-bewusster Platzierung, und warum Kompensation daran nichts ändert.",
          },
        ],
      },
    },
    banner: { left: "Phase 2", right: "Wähle deinen Schwerpunkt." },
    readBack:
      "Du hast jetzt ein grobes Bild von Meridians IT-Fußabdruck. Drei Bereiche stechen heraus. Marcus hat Budget für eine ernsthafte Initiative plus kleinere Governance-Arbeit freigegeben. Was finanzierst du?",
    opener: ["meridian/dashboard-footprint-preview"],
    next: "p3",
    choices: [
      {
        id: "p2-a",
        touches: ["rafael", "elena"],
        title: "Rechenzentrums-Migration",
        body: "Migriere On-Prem-Workloads zu einem grün zertifizierten Colocation-Partner. Größte Wirkung, längster Zeithorizont, höchstes Störungsrisiko.",
        tags: [
          { icon: "clock", text: "12 bis 18 Monate" },
          { icon: "wallet", text: "€800k+ CAPEX" },
          { icon: "chartDown", text: "~35 % Reduktion" },
        ],
        category: "E",
        consequence: {
          weekAdd: 3,
          budget: 40,
          moods: { rafael: "hostile", elena: "skeptical" },
          revealNow: [],
          revealNextPhase: ["meridian/email-rafael-warning"],
        },
      },
      {
        id: "p2-b",
        touches: ["sabine", "marcus"],
        title: "Laptop-Lebenszyklus-Programm",
        body: "Verlängere die Lebensdauer der Flotte mit strukturierter Aufbereitung, zustandsbasierter Erneuerung und End-of-Life-Management. Schnell, sichtbar, der Einkauf kann mitverantworten.",
        tags: [
          { icon: "clock", text: "3 bis 4 Monate" },
          { icon: "wallet", text: "€120k" },
          { icon: "chartDown", text: "~15 % Reduktion" },
        ],
        category: "R",
        consequence: {
          weekAdd: 3,
          budget: 120,
          moods: { sabine: "warming", marcus: "warming" },
          moodsIf: [{ key: "sabine", whenCurrent: "hostile", then: "wary" }],
          revealNow: [],
          revealNextPhase: ["meridian/artifact-fleet-dashboard"],
        },
      },
      {
        id: "p2-c",
        touches: ["elena", "marcus"],
        title: "Cloud-FinOps + Governance",
        body: "Konsolidiere Anbieter, schalte ungenutzte Ressourcen ab und erfasse CO₂ pro Workload. Starke Zahl, geringe Sichtbarkeit, braucht eine kompetente verantwortliche Person.",
        tags: [
          { icon: "clock", text: "6 Monate" },
          { icon: "wallet", text: "€90k" },
          { icon: "chartDown", text: "~25 % Reduktion" },
        ],
        category: "Em",
        consequence: {
          weekAdd: 4,
          budget: 90,
          moods: { elena: "warming", marcus: "wary" },
          revealNow: [],
          revealNextPhase: ["meridian/artifact-cloud-savings"],
        },
      },
      {
        id: "p2-d",
        touches: ["marcus", "sabine", "rafael", "elena"],
        title: "Ausgewogene Roadmap (alle drei klein starten)",
        body: "Ein gestuftes Programm, das alle drei Bereiche in reduziertem Umfang anfasst. Nichts landet in 12 Wochen vollständig. Politische Absicherung durch Breite.",
        tags: [
          { icon: "clock", text: "laufend" },
          { icon: "wallet", text: "€150k verteilt" },
          { icon: "scales", text: "verteilte Wirkung" },
        ],
        category: "G",
        consequence: {
          weekAdd: 4,
          budget: 150,
          moods: {},
          revealNow: [],
          revealNextPhase: ["meridian/slack-team-confusion"],
        },
      },
    ],
  },
  {
    id: "p3",
    briefing: {
      short:
        "Eine Aussage ist eine Verpflichtung. Was auch immer in dieses Feld kommt, wird zu etwas, das ein Kunde, ein Prüfer oder ein Journalist gegen deine Lieferung abgleichen kann.",
      questions: [
        {
          q: "Kannst du das in zwölf Monaten Zeile für Zeile verteidigen, mit dem, was du dann tatsächlich hast?",
          lookFor:
            "Nimm jede Formulierung und benenne das Dokument, das du dafür vorlegen würdest. Eine Formulierung ohne Dokument dahinter ist ein Versprechen, keine Aussage.",
        },
        {
          q: "Was passiert mit diesem Satz, wenn sich die Lieferung um zwei Quartale verzögert?",
          lookFor:
            "Eine bescheidene Aussage übersteht eine Verzögerung als Verzögerung. Eine ambitionierte macht aus derselben Verzögerung ein Glaubwürdigkeitsproblem.",
        },
        {
          q: "Wer ist das Publikum: das Einkaufsteam des Kunden, dein eigener Vorstand, oder eine Pressemitteilung?",
          lookFor:
            "Der Einkauf liest nach Belegen, ein Vorstand liest nach Zuversicht, eine Pressemitteilung liest nach einer Schlagzeile. Nur eines der drei liest in zwölf Monaten noch mit.",
        },
      ],
      more: {
        title: "Wofür dich eine Nachhaltigkeitsaussage angreifbar macht",
        paragraphs: [
          "Das Risiko in dieser Phase ist nicht, eine schwache Position zu haben. Es ist, eine Position zu veröffentlichen, die du nicht belegen kannst. Eine bescheidene Zahl, die du zeigen kannst, schlägt eine ambitionierte, die du nicht belegen kannst, weil die ambitionierte jede spätere Verzögerung in ein Glaubwürdigkeitsproblem statt in ein Lieferproblem verwandelt.",
          "Die Einkaufsteams der Kunden lesen solche Aussagen beruflich. Vage Formulierungen wie „deutliche Reduktion“ oder „im Einklang mit wissenschaftsbasierten Zielen“ sind rechtlich sicher, lesen sich für einen professionellen Einkäufer aber wie ein Fehlen von Daten. Meist folgt eine Rückfrage, keine Unterschrift.",
          "Das ist auch die Phase, in der die Anreize anderer an dir ziehen. Marketing will eine Schlagzeile. Dein CIO will eine Vorstandsfolie. Keiner von beiden wird in zwölf Monaten gebeten werden, die Belege zu liefern.",
        ],
        links: [
          {
            label: "Eine Strafe von 25 Millionen Euro für die Aussage, nicht die Leistung",
            source: "dws",
            note: "Deutsche Staatsanwälte verhängten gegen die DWS eine Strafe, nachdem ihr ESG-Marketing nicht zu ihren tatsächlichen Prozessen passte.",
          },
          {
            label: "Was regulierte Offenlegung tatsächlich verlangt",
            source: "csrd",
            note: "Wo eine freiwillige Aussage endet und eine prüfbare Erklärung beginnt.",
          },
        ],
      },
    },
    banner: { left: "Phase 3 · Woche 10", right: "Zwei Wochen bis zum Vorstand." },
    readBack:
      "Nordvind will ein Vorab-Meeting vor der Vorstandspräsentation. Marketing hat eine Folie mit Platz für eine Schlagzeilen-Aussage entworfen. Nadias Daten zeigen: Der Fortschritt ist real, aber bescheiden.",
    opener: ["meridian/slide-nordvind-draft", "meridian/email-marketing-slide"],
    next: "p4",
    choices: [
      {
        id: "p3-a",
        touches: ["marcus"],
        title: "Mutiges öffentliches Bekenntnis",
        body: "Verkünde Net Zero IT bis 2028 mit quantifizierten Zwischenzielen. Nordvind wird es lieben. Die internen Daten stützen vielleicht 40 % der Aussage.",
        tags: [
          { icon: "megaphone", text: "starkes Signal" },
          { icon: "warning", text: "Glaubwürdigkeitsrisiko" },
          { icon: "target", text: "ambitioniert" },
        ],
        category: "G",
        consequence: {
          weekSet: 10,
          budget: 0,
          moods: { marcus: "warming" },
          revealNow: [],
          revealNextPhase: [
            "meridian/email-nordvind-excited",
            "meridian/slack-cto-nervous",
          ],
        },
      },
      {
        id: "p3-b",
        touches: ["elena", "marcus"],
        title: "Ehrliche Baseline + bescheidene Roadmap",
        body: "Präsentiere die tatsächliche Baseline und eine Dreijahres-Roadmap, die du Zeile für Zeile verteidigen kannst. Nordvind könnte zurückdrängen oder sich anderswo umsehen.",
        tags: [
          { icon: "doc", text: "evidenzbasiert" },
          { icon: "shield", text: "verteidigungsfähig" },
          { icon: "chartDown", text: "unspektakulär" },
        ],
        category: "G",
        consequence: {
          weekSet: 10,
          budget: 0,
          moods: { elena: "ally" },
          revealNow: [],
          revealNextPhase: ["meridian/email-nordvind-cautious"],
        },
      },
      {
        id: "p3-c",
        touches: [],
        title: "Ambitionierte Sprache, keine harte Zahl",
        body: "„Wir verpflichten uns zu einer deutlichen Reduktion, im Einklang mit wissenschaftsbasierten Zielen.“ Auf dem Papier sicher. Nordvinds Team wurde schon einmal von Greenwashing-Aussagen enttäuscht.",
        tags: [
          { icon: "feather", text: "risikoarmer Text" },
          { icon: "question", text: "vage für den Einkäufer" },
          { icon: "scales", text: "rechtlich sicher" },
        ],
        category: "G",
        consequence: {
          weekSet: 10,
          budget: 0,
          moods: {},
          revealNow: [],
          revealNextPhase: ["meridian/email-nordvind-pushback"],
        },
      },
      {
        id: "p3-d",
        touches: ["rafael", "marcus"],
        title: "Das Gespräch neu rahmen",
        body: "Schlage ein gemeinsames Pilotprojekt zu geteilten Nachhaltigkeitsdaten in der Lieferkette vor. Verschiebung vom Lieferantenbericht zur Partnerschaft. Riskant: könnte als Ausweichmanöver gelesen werden.",
        tags: [
          { icon: "handshake", text: "Partnerschafts-Schritt" },
          { icon: "dice", text: "Ausgang ungewiss" },
          { icon: "globe", text: "breiterer Rahmen" },
        ],
        category: "G",
        consequence: {
          weekSet: 10,
          budget: 0,
          moods: { rafael: "warming", marcus: "wary" },
          revealNow: [],
          revealNextPhase: ["meridian/email-nordvind-intrigued"],
        },
      },
    ],
  },
  {
    id: "p4",
    briefing: {
      short:
        "Zuständigkeit ist die Entscheidung, die die anderen entscheidet. Frag, was deinen eigenen Abgang übersteht, nicht, was funktioniert, solange du im Raum bist.",
      questions: [
        {
          q: "Wer ist verantwortlich, wenn die Zahl öffentlich infrage gestellt wird?",
          lookFor:
            "Nenne die Person laut beim Namen. Kannst du das nicht, hat die Regelung die Frage noch nicht beantwortet.",
        },
        {
          q: "Was passiert mit dieser Regelung, wenn du in neun Monaten befördert wirst?",
          lookFor:
            "Alles, was aufhört, wenn eine Person wechselt, war eine Person – keine Struktur.",
        },
        {
          q: "Braucht es Fachwissen, Befugnis, oder beides – und liefert die Option das, was gebraucht wird?",
          lookFor:
            "Fachwissen ohne Mandat erzeugt Empfehlungen, denen niemand folgen muss. Ein Mandat ohne Fachwissen genehmigt selbstbewusst die falschen Dinge.",
        },
      ],
      more: {
        title: "Warum Governance die L3-Frage ist",
        paragraphs: [
          "Jede vorherige Phase hat etwas hervorgebracht, das am Laufen gehalten werden muss: eine Baseline, die gepflegt werden muss, Kriterien, die angewendet werden müssen, eine Aussage, die belegt werden muss. Governance ist die Antwort darauf, wer das tut, wenn die Aufmerksamkeit weiterzieht.",
          "Die Wahl wird meist als Geschwindigkeit gegen Resilienz gerahmt. Eine einzelne verantwortliche Person entscheidet schnell und hört auf, sobald diese Person die Rolle wechselt. Ein Gremium entscheidet langsam und überlebt. Fachwissen und Befugnis sind getrennte Dinge: eine Fachperson ohne Mandat schreibt Empfehlungen, und ein Mandat ohne Fachwissen genehmigt die falschen.",
          "Hier übergibt L2 an L3. Alles zuvor drehte sich darum, gut zu wählen. Hier geht es darum, die Entscheidungen der nächsten Person besser zu machen als deine eigenen – die einzige Version des Jobs, die sich aufsummiert.",
        ],
        links: [
          {
            label: "Rollen und Pflichten, die gesetzlich verankert werden",
            source: "enefg",
            note: "Deutsche Rechenzentren tragen inzwischen benannte Pflichten, nicht nur gute Absichten.",
          },
          {
            label: "Wo Nachhaltigkeits-Governance offengelegt wird",
            source: "csrd",
            note: "Berichterstattung fragt, wer verantwortlich ist, nicht nur, wie die Zahlen aussehen.",
          },
        ],
      },
    },
    banner: { left: "Phase 4 · Woche 12", right: "Vorstandssitzung morgen." },
    readBack:
      "Marcus stellt die Frage, die der Vorstand stellen wird: „Wer ist künftig dafür verantwortlich?“",
    opener: ["meridian/org-chart-empty"],
    next: "debrief",
    choices: [
      {
        id: "p4-a",
        touches: ["marcus"],
        title: "Nadia übernimmt es persönlich",
        body: "Du nimmst Green IT zusätzlich in deinen Verantwortungsbereich als IT Strategy Lead auf. Volle Kontrolle, Karrierebeschleuniger, kein Schutz vor Burnout oder Fluktuation.",
        tags: [
          { icon: "key", text: "klare Zuständigkeit" },
          { icon: "warning", text: "Single Point of Failure" },
          { icon: "rocket", text: "Karriereschritt" },
        ],
        category: "G",
        consequence: { weekSet: 12, budget: 0, moods: {}, revealNow: [], revealNextPhase: [] },
      },
      {
        id: "p4-b",
        touches: ["marcus", "sabine", "rafael", "elena"],
        title: "Bereichsübergreifendes Lenkungsgremium",
        body: "IT, Einkauf, Operations und Finance sitzen monatlich zusammen. Langsamere Entscheidungen, robust gegen den Weggang einer einzelnen Person.",
        tags: [
          { icon: "handshake", text: "geteilte Verantwortung" },
          { icon: "turtle", text: "langsamerer Takt" },
          { icon: "shield", text: "resilient" },
        ],
        category: "G",
        consequence: { weekSet: 12, budget: 0, moods: {}, revealNow: [], revealNextPhase: [] },
      },
      {
        id: "p4-c",
        touches: ["elena", "marcus"],
        title: "Eigene Sustainability-Officer-Stelle in der IT schaffen",
        body: "Eine Stelle für €90k/Jahr, berichtet an den CIO. Fachwissen ab Tag eins; Finance wird den ROI früh infrage stellen.",
        tags: [
          { icon: "brain", text: "Fachperson" },
          { icon: "wallet", text: "laufende Kosten" },
          { icon: "clock", text: "3 Monate bis Besetzung" },
        ],
        category: "G",
        consequence: { weekSet: 12, budget: 0, moods: {}, revealNow: [], revealNextPhase: [] },
      },
      {
        id: "p4-d",
        touches: [],
        title: "An bestehendes CSR-Team (in HR) delegieren",
        body: "Sie berichten bereits zu Nachhaltigkeit. Sie verstehen aber auch nichts von IT-Infrastruktur. Empfehlungen laufen Gefahr, nicht umsetzbar zu sein.",
        tags: [
          { icon: "recycle", text: "nutzt bestehende Struktur" },
          { icon: "gap", text: "Distanz IT–CSR" },
          { icon: "doc", text: "berichtsförmig" },
        ],
        category: "G",
        consequence: { weekSet: 12, budget: 0, moods: {}, revealNow: [], revealNextPhase: [] },
      },
    ],
  },
];

export const PROLOGUE_DE: typeof PROLOGUE = {
  company: {
    title: "Meridian Logistics AG",
    subline:
      "Mittelständische europäische Logistik & Fulfillment · 800 Mitarbeitende · 3 Standorte (Hauptsitz + 2 Lager)",
    growth:
      "Das Unternehmen ist in zwei Jahren um 40 % gewachsen. Die IT ist damit nicht mitgewachsen, und die Lücke ist inzwischen auch von außerhalb des Unternehmens sichtbar.",
    estateTitle: "Was du geerbt hast",
    estate: [
      {
        label: "Hybrid, und ungeplant",
        text: "Ein alterndes On-Premise-Rechenzentrum läuft neben Cloud-Diensten von drei Anbietern, die zu unterschiedlichen Zeiten aus unterschiedlichen Gründen eingeführt wurden.",
      },
      {
        label: "Eine gemischte Laptop-Flotte",
        text: "Kein Standardmodell und kein Standardalter. Was jemand bekommt, hängt davon ab, wann und wo diese Person angefangen hat.",
      },
      {
        label: "Dezentrale Gerätebeschaffung",
        text: "Jeder Standort kauft seine eigene Hardware. Es gibt keine einzige Liste dessen, was Meridian besitzt.",
      },
      {
        label: "Stromverbrauch steigt jedes Quartal",
        text: "Der Stromverbrauch des Rechenzentrums ist in jedem der letzten Quartale gestiegen. Niemand wurde je gefragt, warum.",
      },
      {
        label: "Keine Zahl für den Fußabdruck",
        text: "Niemand im Unternehmen hat eine belastbare Zahl für den CO₂-Fußabdruck der IT. Weder die IT, noch das Facility Management, noch Finance.",
      },
    ],
  },
  role: "Du bist Nadia, IT Strategy Lead. Sechs Wochen im Amt. Direkt berichtend an Marcus (CIO).",
  artifacts: [
    "meridian/email-marcus-opening",
    "meridian/slack-sabine-heads-up",
    "meridian/email-rafael-cold",
  ],
  situation: "12 Wochen. Budget nicht bestätigt. Keine Baseline-Daten. Der Vorstand wartet.",
};

// ---------------------------------------------------------------- endings (DE)

export const ENDINGS_DE: typeof ENDINGS = {
  "photo-op-trap": {
    beats: [
      "Nordvind unterschreibt. Der Vorstand applaudiert.",
      "Monat 18: Ein unabhängiges Audit zeigt, dass sich der Gesamtfußabdruck kaum bewegt hat.",
      "Jahr 3: Nordvind springt ab, und die Aussage ist immer noch auffindbar.",
    ],
    name: "Der Fototermin",
    art: "photo-op-trap",
    body: "Nordvind unterschreibt. Der Vorstand applaudiert. Achtzehn Monate später zeigt ein unabhängiges Audit, dass sich der Gesamtfußabdruck kaum bewegt hat. Nordvind springt in Jahr 3 ab, und es gibt jetzt eine Reputationsspur bei Google.",
  },
  "slow-burn": {
    beats: [
      "Woche 8: Marcus will Fortschritt sehen, bevor die Vorstandsunterlagen fertig sind.",
      "Nordvind unterschreibt nach einer Verhandlung, mit einer 60-Tage-Prüfklausel.",
      "Elena beginnt, Green IT als Kategorie zu behandeln statt als Projekt.",
    ],
    name: "Stiller Erfolg",
    art: "slow-burn",
    body: "Kein Spektakel. Die Roadmap ist Zeile für Zeile verteidigungsfähig. Nordvind verlängert den Vertrag mit einer 60-Tage-Prüfklausel. Marcus bekommt seine Vorstandsfolie. Elena beginnt, nach der Green-IT-Position als Kategorie zu fragen, nicht als Projekt.",
  },
  overreach: {
    beats: [
      "Das Bekenntnis kommt extern gut an.",
      "Monat 12: Die interne Lieferung liegt hinter den Zwischenzielen zurück.",
      "Nordvind verlangt Belege. Der Vorstand fragt Marcus. Marcus fragt dich.",
    ],
    name: "Die mutige Aussage",
    art: "overreach",
    body: "Das Bekenntnis kommt extern gut an, aber 12 Monate später liegt die interne Lieferung zurück. Nordvind verlangt Belege. Der Vorstand fragt Marcus. Marcus fragt dich. Dein Kalender ändert sich.",
  },
  "missed-opportunity": {
    beats: [
      "Die Methode war solide, und die Abstimmung war echt.",
      "Woche 12 kommt mit Analyse an – und ohne Entscheidung zum Präsentieren.",
      "Nordvinds Klausel greift.",
    ],
    name: "Richtiger Prozess, falsches Tempo",
    art: "missed-opportunity",
    body: "Die Methode war solide. Die Abstimmung war echt. Aber 12 Wochen waren nicht genug Vorlauf für die Form, die du gewählt hast. Nordvinds Klausel greift. Der Vorstand fragt, was passiert ist.",
  },
  "governance-win": {
    beats: [
      "Das Gremium trifft sich monatlich – und trifft sich weiter.",
      "Der Vorstand genehmigt weiteres Budget.",
      "Nadia wird neun Monate später befördert, und die Zuständigkeit übersteht es.",
    ],
    name: "Der unspektakuläre Sieg",
    art: "governance-win",
    body: "Das Lenkungsgremium ist unspektakulär, aber es hält. Die Zuständigkeit übersteht deine nächste Beförderung, und die danach. Sechs Jahre später ist dies das Jahr, in dem Meridian aufhört, Green IT ein Projekt zu nennen.",
  },
  "quiet-architect": {
    name: "Die stille Architektin",
    art: "quiet-architect",
    beats: [
      "Niemand außerhalb des Programms hat das Jahr überhaupt bemerkt.",
      "Die Ausgaben wurden nie groß genug, um verteidigt werden zu müssen.",
      "Die nächste Person in dieser Rolle erbt eine funktionierende Maschine, keinen Rückstau.",
    ],
    body: "Du hast die Fähigkeit aufgebaut, die Zuständigkeit geteilt gehalten, und das für weniger Geld, als ein einzelner Schnellerfolg gekostet hätte. Es gibt keine Ankündigung und keinen Neustart, weil es nichts neu zu starten gibt. Die folgenden Entscheidungen sind einfach besser als die davor, und niemand kann auf den Moment zeigen, an dem sich das geändert hat.",
  },
  "quiet-drift": {
    beats: [
      "Nordvinds Klausel wird mit einem Standardabsatz beantwortet.",
      "Keine Schlagzeilen-Entscheidungen und keine Schlagzeilen-Konsequenzen.",
      "Jemand anderes erbt das in achtzehn Monaten.",
    ],
    name: "Nichts ist passiert",
    art: "quiet-drift",
    body: "Keine Schlagzeilen-Entscheidungen, keine Schlagzeilen-Konsequenzen. Nordvinds Klausel wird mit einem Standardabsatz beantwortet. Jemand anderes wird das in achtzehn Monaten erben.",
  },
};

export const DEBRIEF_MESSAGE_DE: typeof DEBRIEF_MESSAGE = [
  "Green IT auf Managementebene ist nicht die Frage „welche Wahl ist richtig“. Es ist die Frage „hält diese Abfolge von Entscheidungen zusammen“. Ein mutiges Bekenntnis gepaart mit schwacher Governance ist nicht mutiger als ein bescheidenes Bekenntnis gepaart mit starker Governance. Es ist angreifbarer.",
  "Achte darauf, welche Stakeholder du mitgenommen hast, und welche du zurückgelassen hast. In der Praxis entscheidet das darüber, ob eine Entscheidung einen CIO-Wechsel übersteht.",
];

export const SIGNAL_LABELS_DE: typeof SIGNAL_LABELS = [
  { key: "visibility", label: "Sichtbarkeit" },
  { key: "depth", label: "Tiefe" },
  { key: "governance", label: "Governance" },
  { key: "soloism", label: "Alleingang" },
  { key: "deferral", label: "Vertagung" },
  { key: "reframe", label: "Perspektivwechsel" },
];
