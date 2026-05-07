import { svgConfig } from "../visualConstants";
import { EvidenceStatus, Confidence } from "@/data/types";

export function polarToCartesian(
  angleDeg: number,
  score: 0 | 1 | 2 | 3
): { x: number; y: number } {
  const radius = scoreToRadius(score);
  const angleRad = (angleDeg * Math.PI) / 180;

  return {
    x: svgConfig.center + radius * Math.cos(angleRad),
    y: svgConfig.center + radius * Math.sin(angleRad),
  };
}

export function scoreToRadius(score: 0 | 1 | 2 | 3): number {
  if (score === 0) return svgConfig.baselineRadius;

  const step =
    (svgConfig.maxRadius - svgConfig.baselineRadius) / 3;
  return svgConfig.baselineRadius + score * step;
}

export function strokePattern(evidenceStatus: EvidenceStatus): string {
  switch (evidenceStatus) {
    case "direct_measured":
      return "0";
    case "postflight_observed":
      return "7 6";
    case "inferred_trajectory":
      return "2 8";
    case "mixed":
      return "5 4 1 4";
    case "not_measured":
      return "2 8";
    default:
      return "0";
  }
}

export function confidenceOpacity(confidence: Confidence): number {
  switch (confidence) {
    case "high":
      return 1;
    case "medium_high":
      return 0.86;
    case "medium":
      return 0.68;
    case "low":
      return 0.45;
    default:
      return 0.68;
  }
}
