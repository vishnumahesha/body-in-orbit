export type Extras =
  | { kind: "data-strip"; items: { label: string; value: string }[] }
  | { kind: "timeline"; phases: string[]; groupNote: string; tooltip: string }
  | { kind: "crew-chips"; members: { id: string; role: string; tooltip: string }[]; warning: string }
  | { kind: "domain-cards"; cards: { title: string; measures: string; matters: string; cannot: string }[] }
  | { kind: "pipeline"; steps: string[]; before: string; after: string; caption: string }
  | { kind: "claim-card"; zones: { label: string; desc: string }[]; claim: string; verdict: string; safer: string; cannot: string }
  | { kind: "question-stack"; questions: string[]; cta: string; boundary: string };

export interface StorySlide {
  id: string;
  number: string;
  eyebrow: string;
  image: string;
  textSide: "left" | "right";
  headline: [string, string];
  beats: [string, string, string];
  extras: Extras;
}

export const storySlides: StorySlide[] = [
  {
    id: "launch",
    number: "01",
    eyebrow: "LAUNCH",
    image: "/mission-summary/01.png",
    textSide: "left",
    headline: ["The rocket leaves Earth.", "The biology goes with it."],
    beats: [
      "Space missions are usually measured in engines, altitude, orbit, and landing.",
      "But every crew member also brings a living body into space.",
      "Body in Orbit asks what changed inside that body — and how to explain it without turning research signals into medical claims.",
    ],
    extras: {
      kind: "data-strip",
      items: [
        { label: "MISSION", value: "Inspiration4" },
        { label: "CREW", value: "4 civilians" },
        { label: "DURATION", value: "3 days" },
        { label: "ORBIT", value: "~585 km" },
      ],
    },
  },
  {
    id: "orbit",
    number: "02",
    eyebrow: "ORBIT",
    image: "/mission-summary/02.png",
    textSide: "left",
    headline: ["Three days in orbit.", "Months of biological signal."],
    beats: [
      "The flight was short, but the biological record did not end when the capsule landed.",
      "Samples were collected before flight, during flight, and across recovery.",
      "That timeline lets us ask what appeared quickly, what faded, and what still needed monitoring.",
    ],
    extras: {
      kind: "timeline",
      phases: ["L-92", "L-44", "L-3", "FD2 / FD3", "R+1", "R+45", "R+82", "R+194"],
      groupNote: "Before flight → In orbit → After landing → Longer recovery",
      tooltip: "Not every dataset exists at every timepoint. Missing data is part of the story.",
    },
  },
  {
    id: "crew",
    number: "03",
    eyebrow: "HUMAN CONTEXT",
    image: "/mission-summary/03.png",
    textSide: "left",
    headline: ["Four crew members.", "Four baselines."],
    beats: [
      "There is no single average astronaut body.",
      "Each crew member had their own pre-flight baseline.",
      "So the debrief compares each person against themselves first, then explains how their signals differ from the rest of the crew.",
    ],
    extras: {
      kind: "crew-chips",
      members: [
        { id: "C001", role: "Commander", tooltip: "Compare post-flight signals to C001's own baseline." },
        { id: "C002", role: "Medical Officer", tooltip: "Compare post-flight signals to C002's own baseline." },
        { id: "C003", role: "Pilot", tooltip: "Compare post-flight signals to C003's own baseline." },
        { id: "C004", role: "Mission Specialist", tooltip: "Compare post-flight signals to C004's own baseline." },
      ],
      warning: "Crew IDs are used unless public identity is directly relevant and sourced.",
    },
  },
  {
    id: "samples",
    number: "04",
    eyebrow: "SAMPLE COLLECTION",
    image: "/mission-summary/04.png",
    textSide: "right",
    headline: ["The data starts with samples.", "Not charts."],
    beats: [
      "Blood, swabs, urine, stool, and other biological samples captured different layers of the body.",
      "Some samples point toward immune activity. Some point toward metabolism, microbes, proteins, RNA, or recovery.",
      "No single sample tells the whole story. The value comes from connecting the layers carefully.",
    ],
    extras: {
      kind: "domain-cards",
      cards: [
        { title: "IMMUNE REGULATION", measures: "Cytokines, PBMCs, urine inflammation, CBC.", matters: "Shows monitoring-relevant shifts after flight.", cannot: "Illness, infection, or clinical vulnerability." },
        { title: "OXIDATIVE RESPONSE", measures: "Plasma metabolites and proteins.", matters: "Tracks cellular stress signals across recovery.", cannot: "Damage, disease state, or clinical severity." },
        { title: "ENERGY METABOLISM", measures: "Cellular energy and mitochondrial pathways.", matters: "Reflects shifts in core metabolism.", cannot: "Fitness, fatigue, or medical conclusions." },
        { title: "GENOME REGULATION", measures: "RNA, chromatin, m6A, telomere context.", matters: "Captures gene-activity shifts across phases.", cannot: "Inherited risk or clinical genetics." },
        { title: "MICROBIOME DYNAMICS", measures: "Crew swabs, stool, skin, capsule surfaces.", matters: "Tracks microbial shifts on body and craft.", cannot: "Pathogen presence or infection risk." },
      ],
    },
  },
  {
    id: "translation",
    number: "05",
    eyebrow: "FROM SAMPLE TO SIGNAL",
    image: "/mission-summary/05.png",
    textSide: "left",
    headline: ["Raw biology does not speak human.", "It has to be translated."],
    beats: [
      "Omics data can be massive: thousands of measurements, many timepoints, and technical labels most people cannot interpret.",
      "Body in Orbit turns that into simpler signals: what changed, when, which domain, and how strong the evidence is.",
      "The goal is not to remove the science. The goal is to make it understandable without making it unsafe.",
    ],
    extras: {
      kind: "pipeline",
      steps: ["SAMPLE", "MOLECULAR MEASUREMENT", "BASELINE COMPARISON", "DOMAIN SIGNAL", "ASTRONAUT-SAFE EXPLANATION"],
      before: "logFC, q-value, z-score, adjusted p-value, pathway abundance, gene expression matrix",
      after: "This immune-related signal changed after flight and should be monitored over time.",
      caption: "The app simplifies language without removing scientific boundaries.",
    },
  },
  {
    id: "overload",
    number: "06",
    eyebrow: "DATA OVERLOAD",
    image: "/mission-summary/06.png",
    textSide: "left",
    headline: ["The hard part is not seeing the signal.", "It is knowing what the signal does not prove."],
    beats: [
      "A dashboard can look precise even when the sample size is small.",
      "A chart can look medical even when it only shows a research signal.",
      "So every result in Body in Orbit has a boundary: what the evidence supports, what should be monitored, and what must not be concluded.",
    ],
    extras: {
      kind: "claim-card",
      zones: [
        { label: "SUPPORTED", desc: "The evidence directly supports cautious wording." },
        { label: "MONITORING SIGNAL", desc: "A pattern exists, but it needs more tracking." },
        { label: "OVERCLAIM", desc: "The statement sounds plausible but goes beyond the evidence." },
      ],
      claim: "Immune-related signals shifted after flight.",
      verdict: "Supported, with careful wording.",
      safer: "Immune regulation showed monitoring-relevant shifts after flight.",
      cannot: "Infection, illness, clinical weakness, or mission clearance.",
    },
  },
  {
    id: "debrief",
    number: "07",
    eyebrow: "THE DEBRIEF",
    image: "/mission-summary/07.png",
    textSide: "left",
    headline: ["Now the data becomes", "a crew debrief."],
    beats: [
      "Body in Orbit organizes the mission record into five domains: immune regulation, oxidative response, energy metabolism, genome regulation, and microbiome dynamics.",
      "For each crew member, the site explains what changed, what recovered, what needs monitoring, and what the data cannot prove.",
      "The result is a debrief a non-specialist can understand — with enough evidence boundaries for a scientist to trust.",
    ],
    extras: {
      kind: "question-stack",
      questions: [
        "What does my biology say about my readiness for spaceflight?",
        "Which signals changed during or after the mission?",
        "Which domains should be monitored in orbit?",
        "How does my profile compare with other crew members?",
        "What are we not allowed to conclude?",
      ],
      cta: "OPEN CREW DEBRIEFS",
      boundary: "Exploratory research interface · Not a clinical tool · Not medical clearance · Not a diagnosis.",
    },
  },
];
