// The canonical dictionary. Every other locale (data/dictionaries/de.ts, and
// whatever comes next) is typed against Dictionary below, so a key added
// here and forgotten there fails the build instead of silently falling back
// to English at runtime.

export type Dictionary = {
  chrome: {
    moduleTitle: string;
    logoAlt: string;
    xp: string;
    streak: string;
    footer: string;
    navAriaLabel: string;
  };
  language: {
    switcherLabel: string;
  };
  home: {
    opening: string;
    continueToLearn: string;
  };
  category: {
    topicAreaPrefix: string;
  };
  openItems: {
    defaultTitle: string;
    complete: string;
    doneOfTotal: string;
    allDone: string;
    hideWhatIsOpen: string;
    showStillOpen: string;
    goThere: string;
  };
  completion: {
    learnLabel: string;
    learnUnit: string;
    meridianLabel: string;
    meridianUnit: string;
    trainingCardsLabel: string;
    trainingCardsUnit: string;
    trainingCardPrefix: string;
    badgesLabel: string;
    badgesUnit: string;
    badgeNeedsAll: string;
    mediprintLabel: string;
    mediprintUnit: string;
    nordcomLabel: string;
    nordcomUnit: string;
    auronLabel: string;
    auronUnit: string;
  };
  case: {
    close: string;
    context: string;
    onTheImage: string;
    topicAreaNote: string;
    markersWithTag: string;
    noMarkerWithTag: string;
    findingsCarryTag: string;
    noFindingWithTag: string;
    interactiveIllustration: string;
    interactiveBoard: string;
    onePassageLegend: string;
    theBuildingLegend: string;
    theFiveArrowsLegend: string;
    passagesOpened: string;
    showListFacts: string;
    hideListFacts: string;
    inCompanyDescription: string;
    findItOnIllustration: string;
    contextOnly: string;
    showFindingsByTopicArea: string;
    oneFindingLegend: string;
    companyBlockLegend: string;
    findingsOpened: string;
    showListFindings: string;
    hideListFindings: string;
    worksheetCodesNote: string;
  };
  nav: {
    learn: { label: string; short: string };
    training: { label: string; short: string };
    mediprint: { label: string; short: string };
    nordcom: { label: string; short: string };
    auron: { label: string; short: string };
    taskMap: { label: string; short: string };
  };
  reset: {
    button: string;
    confirmTitle: string;
    confirmYes: string;
    confirmNo: string;
    bodyIntro: string;
    bodyXpStreak: string;
    bodyBadges: string;
    bodyLearnWidgets: string;
    bodyTrainingRound: string;
    bodyMediprint: string;
    bodyOutro: string;
    doneTitle: string;
    doneBody: string;
    close: string;
  };
};

export const en: Dictionary = {
  chrome: {
    moduleTitle: "Module 1: Green IT as a Lever for Climate Protection & Competitiveness",
    logoAlt: "AION Green IT, go to Learn",
    xp: "XP",
    streak: "Streak",
    footer: "AION Green IT · Module 1 · English (executive edition)",
    navAriaLabel: "Module sections",
  },
  language: {
    switcherLabel: "Language",
  },
  home: {
    opening: "Opening the module…",
    continueToLearn: "Continue to Learn",
  },
  category: {
    topicAreaPrefix: "Topic area",
  },
  openItems: {
    defaultTitle: "What is still open",
    complete: "Complete",
    doneOfTotal: "{done} of {total}",
    allDone: "Nothing left open here. All {total} {unit} are done.",
    hideWhatIsOpen: "Hide what is open",
    showStillOpen: "Show the {n} still open",
    goThere: "Go there →",
  },
  completion: {
    learnLabel: "Learn: widgets completed",
    learnUnit: "widgets",
    meridianLabel: "L2 Meridian: decisions taken",
    meridianUnit: "decisions",
    trainingCardsLabel: "Training Ground: cards answered",
    trainingCardsUnit: "cards",
    trainingCardPrefix: "Card {n}",
    badgesLabel: "Training Ground: category badges",
    badgesUnit: "badges",
    badgeNeedsAll: "{name}: needs all {threshold} of its cards matched",
    mediprintLabel: "Case A MediPrint: passages opened",
    mediprintUnit: "markers",
    nordcomLabel: "Case B NordCom: findings opened",
    nordcomUnit: "findings",
    auronLabel: "Case C Auron: findings opened",
    auronUnit: "findings",
  },
  case: {
    close: "Close",
    context: "Context",
    onTheImage: "On the illustration:",
    topicAreaNote: "One of the five topic areas used across the module.",
    markersWithTag: "Markers carrying this tag",
    noMarkerWithTag:
      "No marker on this illustration carries this tag. The topic area still belongs to the set of five.",
    findingsCarryTag: "{tagged} of {total} findings carry this tag",
    noFindingWithTag:
      "No finding on this board carries this tag. The topic area is still one of the five, and the fact that it is missing here is worth noticing.",
    interactiveIllustration: "Interactive illustration",
    interactiveBoard: "Interactive case board",
    onePassageLegend: "A passage from the description. There are nine in total",
    theBuildingLegend: "The building, with the brief and the context",
    theFiveArrowsLegend: "The five arrows, for the topic areas",
    passagesOpened: "{opened} of {total} passages opened",
    showListFacts: "Show all facts as list",
    hideListFacts: "Hide the list of facts",
    inCompanyDescription: "In the company description",
    findItOnIllustration: "Find it on the illustration →",
    contextOnly: "(context only)",
    showFindingsByTopicArea: "Show findings by topic area:",
    oneFindingLegend: "A finding. There are {total} in total, on the panels and on the scene",
    companyBlockLegend: "The company block, with the brief and the context",
    findingsOpened: "{opened} of {total} findings opened",
    showListFindings: "Show all findings as list",
    hideListFindings: "Hide the list of findings",
    worksheetCodesNote:
      "F1–F{total} match the worksheet's citation labels, in the same order as the numbered markers above.",
  },
  nav: {
    learn: { label: "Learn", short: "Learn" },
    training: { label: "Training Ground", short: "Training" },
    mediprint: { label: "Case A: MediPrint", short: "MediPrint" },
    nordcom: { label: "Case B: NordCom", short: "NordCom" },
    auron: { label: "Case C: Auron", short: "Auron" },
    taskMap: { label: "Task map", short: "Task map" },
  },
  reset: {
    button: "Reset progress",
    confirmTitle: "Reset your progress?",
    confirmYes: "Yes, clear everything",
    confirmNo: "No, keep it",
    bodyIntro: "This clears, on this device:",
    bodyXpStreak: "XP and the current streak",
    bodyBadges: "Category badges",
    bodyLearnWidgets: "Which Learn widgets you have completed",
    bodyTrainingRound: "The round you are part-way through in the Training Ground",
    bodyMediprint: "Which MediPrint passages you have opened",
    bodyOutro:
      "Nothing else is affected, and it cannot be undone. If you pressed this by accident, choose “No, keep it”.",
    doneTitle: "Progress cleared.",
    doneBody: "XP, streak, badges and everything you had opened are back to zero.",
    close: "Close",
  },
};
