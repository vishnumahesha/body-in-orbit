export type ClaimZone = "supported" | "monitoring" | "overclaim";

export interface ClaimCard {
  id: number;
  text: string;
  correctZone: ClaimZone;
  why: string;
  saferWording: string;
  source: string;
  doNotConclude: string;
  domain: string;
}

export const claims: ClaimCard[] = [
  {
    id: 1,
    text: "Immune-related signals shifted after flight.",
    correctZone: "supported",
    why: "Published Inspiration4 immune analyses reported cytokine, chemokine, and immune-cell signal changes after flight.",
    saferWording: "Immune regulation showed a monitoring-relevant shift after flight.",
    source: "Kim et al. 2024 · Nature Communications",
    doNotConclude: "infection · immune dysfunction · illness",
    domain: "immune",
  },
  {
    id: 2,
    text: "This astronaut has immune dysfunction.",
    correctZone: "overclaim",
    why: "Molecular shifts do not support a clinical conclusion about dysfunction.",
    saferWording: "Some immune signals shifted relative to baseline and may merit monitoring.",
    source: "Kim et al. 2024 · Nature Communications",
    doNotConclude: "diagnosis · disease · immune failure",
    domain: "immune",
  },
  {
    id: 3,
    text: "Telomere length changed during and after flight.",
    correctZone: "supported",
    why: "Published genome analyses reported telomere elongation during flight and shortening after return.",
    saferWording: "Telomere dynamics shifted across mission phases.",
    source: "Garcia-Medina et al. 2024 · Precision Clinical Medicine",
    doNotConclude: "rejuvenation · improved aging · clinical benefit",
    domain: "telomere",
  },
  {
    id: 4,
    text: "Spaceflight made this astronaut biologically younger.",
    correctZone: "overclaim",
    why: "Telomere elongation is not evidence of whole-body rejuvenation. Telomeres also shortened after landing in 3 of 4 crew.",
    saferWording: "Telomere length changed during flight and should be interpreted cautiously.",
    source: "Garcia-Medina et al. 2024 · Precision Clinical Medicine",
    doNotConclude: "rejuvenation · anti-aging effect",
    domain: "telomere",
  },
  {
    id: 5,
    text: "Some molecular layers recovered faster than others.",
    correctZone: "supported",
    why: "Secretome analyses reported different recovery behavior across plasma proteins, EVPs, and metabolites.",
    saferWording: "Recovery appeared layer-specific rather than uniform.",
    source: "Houerbi et al. 2024 · Nature Communications",
    doNotConclude: "full recovery · permanent harm",
    domain: "oxidative",
  },
  {
    id: 6,
    text: "This astronaut should receive treatment.",
    correctZone: "overclaim",
    why: "Exploratory omics data do not support treatment recommendations.",
    saferWording: "Some domains may warrant follow-up monitoring in mission context.",
    source: "Project claim-safety rule",
    doNotConclude: "treatment need · medical diagnosis",
    domain: "immune",
  },
  {
    id: 7,
    text: "Microbiome composition shifted during flight.",
    correctZone: "supported",
    why: "Published host-microbiome analyses reported skin and oral microbiome changes across the mission.",
    saferWording: "Microbiome composition showed mission-associated shifts.",
    source: "Tierney et al. 2024 · Nature Microbiology",
    doNotConclude: "infection · harmful exposure",
    domain: "microbiome",
  },
  {
    id: 8,
    text: "The astronaut was infected in orbit.",
    correctZone: "overclaim",
    why: "Microbiome and immune shifts do not prove infection.",
    saferWording: "Microbial and immune signals changed and should be interpreted with clinical context.",
    source: "Tierney et al. 2024 / Kim et al. 2024",
    doNotConclude: "infection · illness",
    domain: "microbiome",
  },
  {
    id: 9,
    text: "Energy metabolism pathways shifted in immune cells post-flight.",
    correctZone: "monitoring",
    why: "OXPHOS pathway enrichment is observed at the pathway level — not a clinical change in metabolism. Worth monitoring, not over-interpreting.",
    saferWording: "Energy-related pathway activity shifted in immune cells. Monitoring continues.",
    source: "Kim et al. 2024 · Nature Communications",
    doNotConclude: "mitochondrial failure · metabolic disease",
    domain: "energy",
  },
  {
    id: 10,
    text: "This crew member is unfit to fly again.",
    correctZone: "overclaim",
    why: "Flight readiness decisions require clinical assessment, not molecular monitoring data alone.",
    saferWording: "Continued monitoring is recommended; flight readiness is a separate clinical decision.",
    source: "Project claim-safety rule",
    doNotConclude: "flight disqualification · clinical judgment",
    domain: "immune",
  },
];
