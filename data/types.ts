export type DomainId = "immune" | "oxidative" | "energy" | "telomere" | "microbiome";

export type Timepoint =
  | "L-92"
  | "L-44"
  | "L-3"
  | "FD1"
  | "FD2"
  | "FD3"
  | "R+1"
  | "R+45"
  | "R+82"
  | "R+194";

export type MissionPhase =
  | "hero"
  | "measured"
  | "baseline"
  | "inflight"
  | "r_plus_1"
  | "r_plus_45"
  | "r_plus_82"
  | "r_plus_194"
  | "recovery"
  | "limits";

export type EvidenceStatus =
  | "direct_measured"
  | "postflight_observed"
  | "inferred_trajectory"
  | "mixed"
  | "not_measured";

export type Confidence = "low" | "medium" | "medium_high" | "high";

export type RecoveryStatus =
  | "returned_toward_baseline"
  | "partial_recovery"
  | "persistent_perturbation"
  | "unclear"
  | "not_applicable";

export interface SourceRef {
  id: string;
  title: string;
  authorsShort: string;
  journal: string;
  year: number;
  doi: string;
  url: string;
  usedFor: string[];
}

export interface ScoreInputs {
  markerBreadth: "none" | "single" | "multiple";
  assayBreadth: "single_assay" | "multi_assay";
  temporalPattern: "none" | "single_timepoint" | "recovery_pattern" | "persistent_pattern";
  confidence: Confidence;
}

export interface EvidenceRecord {
  id: string;
  domainId: DomainId;
  claim: string;
  plainEnglish: string;
  technicalFinding: string;
  astronautSafeWording: string;
  evidenceStatus: EvidenceStatus;
  assays: string[];
  sampleTypes: string[];
  timepointsMeasured: Timepoint[];
  n: number;
  sourceIds: string[];
  confidence: Confidence;
  perturbationScore: 0 | 1 | 2 | 3;
  scoreInputs: ScoreInputs;
  whyScore: string;
  caution: string;
  notClaiming: string[];
  missionPlanningRelevance: string;
}

export interface VisualState {
  phase: MissionPhase;
  perturbationScore: 0 | 1 | 2 | 3;
  evidenceStatus: EvidenceStatus;
  confidence: Confidence;
  nodeFill: "filled" | "hollow";
  label: string;
}

export interface BiologicalDomain {
  id: DomainId;
  label: string;
  shortLabel: string;
  plainLanguage: string;
  color: string;
  angleDeg: number;
  defaultScore: 0 | 1 | 2 | 3;
  recoveryStatus: RecoveryStatus;
  confidence: Confidence;
  primaryEvidenceStatus: EvidenceStatus;
  observedTimepoints: Timepoint[];
  sourceIds: string[];
  keyFindings: string[];
  caution: string;
  notClaiming: string[];
  missionPlanningRelevance: string;
  evidence: EvidenceRecord;
  visualStates: Record<MissionPhase, VisualState>;
}

export interface StorySection {
  id: string;
  index: number;
  eyebrow: string;
  headline: string;
  body: string;
  callout: string;
  phase: MissionPhase;
  activeDomainIds: DomainId[];
  scrollVh: number;
}

export interface CrewMember {
  id: string;
  publicName: string;
  missionRole: string;
  displayLabel: string;
  note: string;
}
