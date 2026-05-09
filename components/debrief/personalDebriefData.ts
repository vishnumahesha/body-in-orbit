export type CrewId = "C001" | "C002" | "C003" | "C004";

export const crewRoles: Record<CrewId, string> = {
  C001: "COMMANDER",
  C002: "MEDICAL OFFICER",
  C003: "PILOT",
  C004: "MISSION SPECIALIST",
};

export interface DebriefEntry {
  readiness: string;
  risks: string;
  monitoring: string;
  comparison: string;
}

export const personalDebriefs: Record<CrewId, DebriefEntry> = {
  C001: {
    readiness:  "Your baseline placed you within crew range on all five domains.",
    risks:      "At FD2 (day 2 of the flight) your immune markers began shifting. By R+1 (one day after landing), cytokines (immune messenger proteins) peaked above crew average.",
    monitoring: "For this briefing, immune monitoring would be prioritized through R+194 (~6 months after landing).",
    comparison: "Your immune perturbation (shift from your own baseline) ranked highest among crew members at R+1.",
  },
  C002: {
    readiness:  "Your oxidative baseline was within expected pre-flight range.",
    risks:      "EVP and plasma oxidative markers diverged at R+1 (one day after landing); recovery happened in layers.",
    monitoring: "Plasma protein markers warranted monitoring through R+82 (~12 weeks after landing).",
    comparison: "Your oxidative recovery showed the clearest compartment split in the crew.",
  },
  C003: {
    readiness:  "Your telomere (protective cap on the end of your DNA) baseline showed pre-flight length in the expected range.",
    risks:      "In-flight telomere elongation was the strongest signal measured across all crew.",
    monitoring: "Post-flight shortening warrants tracking through the six-month window.",
    comparison: "Your telomere signal was most pronounced in the crew during FD2-FD3 (days 2-3 of the flight).",
  },
  C004: {
    readiness:  "Your microbiome (the bacteria living on and in you) baseline showed typical pre-flight diversity.",
    risks:      "Skin and oral microbiota shifted at FD2-FD3 (days 2-3 of the flight), tracking alongside immune activity.",
    monitoring: "Microbiome-immune coupling suggests an integrated monitoring approach.",
    comparison: "Your microbiome perturbation (shift from your own baseline) was most coupled to immune signals in the crew.",
  },
};
