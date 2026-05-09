export interface StorySlide {
  id: string;
  eyebrow: string;
  image: string;
  headline: string;
  body: string;
  caption: string;
  narration: string;
}

export const storySlides: StorySlide[] = [
  {
    id: "launch",
    eyebrow: "SLIDE 01 · LAUNCH",
    image: "/mission-summary/01.png",
    headline: "They left the planet.",
    body: "On September 15, 2021, four civilians boarded a SpaceX Falcon 9 and rode it to an orbit higher than the International Space Station. No professional astronauts. No government mission. Just four people, a capsule, and 71 hours of microgravity.",
    caption: "Inspiration4 · September 2021 · ~585 km altitude · All-civilian crew",
    narration: "Inspiration4 launched four civilians into orbit in September 2021. This was not a government mission. It was a proof of concept — and the most detailed molecular study of civilian spaceflight ever conducted.",
  },
  {
    id: "orbit",
    eyebrow: "SLIDE 02 · ORBIT",
    headline: "The body adapted immediately.",
    image: "/mission-summary/02.png",
    body: "Within hours, fluid shifted toward the head, circadian rhythms decoupled from Earth's light cycle, and cells began responding to an environment they were never built for. The biology did not wait for science to catch up.",
    caption: "71 hours, 49 minutes in orbit · 15 laps around Earth per day",
    narration: "Microgravity acts on every system simultaneously. The immune system responds. Oxidative balance shifts. Telomeres change. The microbiome reacts. And the crew had no way to read any of it in real time.",
  },
  {
    id: "human",
    eyebrow: "SLIDE 03 · THE CREW",
    headline: "Four people. Four baselines.",
    image: "/mission-summary/03.png",
    body: "Every person carries their own biological normal. The Inspiration4 crew was studied not against a population average, but against their own pre-flight measurements. What mattered was not where they landed on a reference range — it was how far they shifted from where they started.",
    caption: "n=4 · Baseline-relative comparisons only · No population norms used",
    narration: "Personalized medicine starts with a personal baseline. Each crew member's pre-flight profile became the reference. Every post-flight number is measured against that individual starting point.",
  },
  {
    id: "sample",
    eyebrow: "SLIDE 04 · SAMPLE COLLECTION",
    headline: "289 days of sampling.",
    image: "/mission-summary/04.png",
    body: "Blood draws. Urine panels. Saliva swabs. Skin biopsies. Stool metagenomics. From 92 days before launch to 194 days after landing, researchers collected samples across 10 timepoints to trace how five biological domains shifted and recovered.",
    caption: "L-92 through R+194 · 12 OSDR datasets · 5 biological domains",
    narration: "The sampling window spanned nearly a year. Pre-flight, in-flight, and post-flight — each timepoint adds a frame to the story of how the body responds to space and comes back.",
  },
  {
    id: "signal",
    eyebrow: "SLIDE 05 · FROM SAMPLE TO SIGNAL",
    headline: "The sample becomes a signal.",
    image: "/mission-summary/05.png",
    body: "Each sample goes through omics pipelines — proteomics, metabolomics, transcriptomics, metagenomics — and what emerges is not a single number. It is a pattern across time: a perturbation score measuring how far a domain moved from that person's own starting point.",
    caption: "8 peer-reviewed papers · OSD-569 through OSD-656 · SOMA consortium",
    narration: "The SOMA consortium processed 12 OSDR datasets and eight published papers. Every score on this dashboard traces directly to a dataset and a peer-reviewed finding.",
  },
  {
    id: "overload",
    eyebrow: "SLIDE 06 · THE COMMUNICATION PROBLEM",
    headline: "The data tells a story the crew cannot yet read.",
    image: "/mission-summary/06.png",
    body: "Omics dashboards were not built for the person they describe. Heatmaps, volcano plots, and q-values make sense to a bioinformatician. They do not make sense to a mission specialist who wants to know what this means for their body.",
    caption: "The hardest part is not finding the signal. It is translating it.",
    narration: "This is the communication gap this project is built to close. The science exists. The findings are published. What does not yet exist is a format the crew can actually use.",
  },
  {
    id: "debrief",
    eyebrow: "SLIDE 07 · THE DEBRIEF",
    headline: "What this dashboard does.",
    image: "/mission-summary/07.png",
    body: "Body in Orbit translates the molecular data into a crew member's personal debrief. Five domains. Six mission phases. Baseline-relative. Communication-safe. You choose a crew member and the report becomes theirs — without naming a condition, without overclaiming, without turning a perturbation into a verdict.",
    caption: "Communication scores, not clinical severity · Exploratory research interface · Not a clinical tool",
    narration: "This is the debrief the crew deserved. Not a clinical report. Not a wall of heatmaps. A mission briefing — the same format used to prepare for a mission, now used to understand what the mission did.",
  },
];
