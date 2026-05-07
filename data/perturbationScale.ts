export const perturbationScale = {
  0: {
    score: 0,
    label: "Baseline / no clear shift",
    description: "No measurable perturbation or baseline state",
  },
  1: {
    score: 1,
    label: "Mild shift",
    description: "One assay or weak pathway signal",
  },
  2: {
    score: 2,
    label: "Moderate shift",
    description: "Repeated marker/pathway evidence",
  },
  3: {
    score: 3,
    label: "Strong shift",
    description: "Multi-marker/multi-assay with clear post-flight pattern",
  },
} as const;

export const scoringWarning =
  "Perturbation scores are communication scores, not clinical severity scores.";

export const forbiddenClinicalTerms = [
  "diagnosis",
  "disease",
  "abnormal",
  "dangerous",
  "damaged",
  "risk score",
  "treatment",
  "clearance",
  "safe",
  "unsafe",
];

export const preferredTerms = [
  "signal",
  "shift",
  "perturbation",
  "baseline",
  "recovery",
  "confidence",
  "monitoring",
  "exploratory",
];
