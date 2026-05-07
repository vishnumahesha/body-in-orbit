"use client";

import { motion } from "framer-motion";
import { BiologicalDomain, MissionPhase } from "@/data/types";
import { polarToCartesian, strokePattern, confidenceOpacity } from "./geometry";
import { motionSpring } from "../visualConstants";

interface DomainTrailProps {
  domain: BiologicalDomain;
  currentPhase: MissionPhase;
}

const phaseOrder: MissionPhase[] = [
  "hero",
  "measured",
  "baseline",
  "inflight",
  "r_plus_1",
  "r_plus_45",
  "r_plus_82",
  "r_plus_194",
  "recovery",
  "limits",
];

export function DomainTrail({ domain, currentPhase }: DomainTrailProps) {
  const currentIndex = phaseOrder.indexOf(currentPhase);
  const phasesToShow = phaseOrder.slice(0, currentIndex + 1);

  if (phasesToShow.length < 2) return null;

  const points = phasesToShow.map((phase) => {
    const state = domain.visualStates[phase];
    return polarToCartesian(domain.angleDeg, state.perturbationScore);
  });

  const pathD = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    return `${acc} L ${point.x} ${point.y}`;
  }, "");

  const lastState = domain.visualStates[currentPhase];
  const dashArray = strokePattern(lastState.evidenceStatus);
  const opacity = confidenceOpacity(lastState.confidence) * 0.4;

  return (
    <motion.path
      d={pathD}
      fill="none"
      stroke={domain.color}
      strokeWidth="1.5"
      strokeDasharray={dashArray}
      opacity={opacity}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ type: "spring", ...motionSpring }}
    />
  );
}
