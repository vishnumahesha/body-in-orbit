import { CrewMember, DomainId } from "./types";

export interface CrewProfile extends CrewMember {
  callsign: string;
  ageBand: string;
  bioFocus: string;
  bioFocusBlurb: string;
  signature: string;
  domainScoreOverrides: Partial<Record<DomainId, 0 | 1 | 2 | 3>>;
  recoveryNote: string;
  monitoringPriority: DomainId[];
  voiceLines: string[];
}

export const crew: Record<string, CrewProfile> = {
  C001: {
    id: "C001",
    publicName: "Crew Member C001",
    missionRole: "Commander",
    displayLabel: "C001",
    callsign: "C001 · CDR",
    ageBand: "Age band 35-44",
    bioFocus: "Brief focus: immune monitoring",
    bioFocusBlurb:
      "Multi-marker immune perturbation persisted longest in this crew member, with cytokine signal still distinct from baseline at R+82.",
    signature:
      "Immune regulation read as the highest-priority monitoring domain across the post-flight window.",
    domainScoreOverrides: { immune: 3, oxidative: 2, telomere: 2 },
    recoveryNote: "Plasma protein layer recovered slower than EVP layer.",
    monitoringPriority: ["immune", "oxidative", "telomere", "energy", "microbiome"],
    voiceLines: [
      "C001. Commander. Three-day mission. Age band thirty-five to forty-four.",
      "Strongest signal in your debrief is immune regulation. Eighteen markers shifted.",
      "These are signals, not symptoms. Monitoring continues through R plus one ninety-four.",
    ],
    note: "Individual views are baseline-relative report structure, not clinical assessment.",
  },
  C002: {
    id: "C002",
    publicName: "Crew Member C002",
    missionRole: "Medical Officer",
    displayLabel: "C002",
    callsign: "C002 · MED",
    ageBand: "Age band 25-34",
    bioFocus: "Brief focus: oxidative recovery context",
    bioFocusBlurb:
      "EVP markers returned toward baseline by R+82 while the plasma compartment held a distinct signal — recovery happened in layers.",
    signature:
      "Oxidative response sits highest in this brief because of split recovery rates between molecular compartments.",
    domainScoreOverrides: { oxidative: 3, immune: 2, energy: 2 },
    recoveryNote: "EVP markers ~93% returned, plasma ~73% still perturbed at R+82.",
    monitoringPriority: ["oxidative", "immune", "energy", "telomere", "microbiome"],
    voiceLines: [
      "C002. Medical officer. Recovery did not happen in one motion.",
      "Extracellular vesicle proteins returned toward baseline. Plasma proteins did not.",
      "Same body. Same flight. Different layers recovered at different speeds.",
    ],
    note: "Individual views are baseline-relative report structure, not clinical assessment.",
  },
  C003: {
    id: "C003",
    publicName: "Crew Member C003",
    missionRole: "Pilot",
    displayLabel: "C003",
    callsign: "C003 · PLT",
    ageBand: "Age band 45-54",
    bioFocus: "Brief focus: genome / telomere context",
    bioFocusBlurb:
      "Telomeres elongated during flight and shortened after — a bidirectional pattern observed in all four crew members and most pronounced here.",
    signature:
      "Telomere dynamics is the only domain in this brief with direct in-flight measurement via dried blood spots.",
    domainScoreOverrides: { telomere: 3, immune: 2, oxidative: 1 },
    recoveryNote: "Telomeres elongated FD1-3 (P<0.001), shortened post-flight (P<0.02).",
    monitoringPriority: ["telomere", "immune", "energy", "oxidative", "microbiome"],
    voiceLines: [
      "C003. Pilot. Telomeres got longer during flight. Three of four shortened after.",
      "This is not rejuvenation. This is not damage. This is a bidirectional signal.",
      "The data point that is hardest to interpret is the data point most worth tracking.",
    ],
    note: "Individual views are baseline-relative report structure, not clinical assessment.",
  },
  C004: {
    id: "C004",
    publicName: "Crew Member C004",
    missionRole: "Mission Specialist",
    displayLabel: "C004",
    callsign: "C004 · SPC",
    ageBand: "Age band 35-44",
    bioFocus: "Brief focus: microbiome and immune context",
    bioFocusBlurb:
      "Skin and oral microbiota shifted at FD2-3 and R+1, with microbial gene expression patterns correlating with immune cell activity.",
    signature:
      "Microbiome shifts read as a coupled monitoring layer rather than an isolated infection signal.",
    domainScoreOverrides: { microbiome: 2, immune: 2, energy: 2 },
    recoveryNote: "Skin spatial transcriptomics: 95 genes up, 121 down at R+1 vs L-44.",
    monitoringPriority: ["microbiome", "immune", "oxidative", "energy", "telomere"],
    voiceLines: [
      "C004. Mission specialist. The body was not the only ecosystem in orbit.",
      "Skin and oral microbiota shifted at flight day two, three, and recovery plus one.",
      "These shifts correlated with immune cell activity. Coupled signal, not infection.",
    ],
    note: "Individual views are baseline-relative report structure, not clinical assessment.",
  },
};

export const crewIds = ["C001", "C002", "C003", "C004"] as const;
export type CrewId = (typeof crewIds)[number];
