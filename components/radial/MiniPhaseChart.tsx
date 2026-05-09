"use client";

import { useMemo } from "react";
import { domains } from "@/data/domains";
import type { MissionPhase, DomainId } from "@/data/types";
import { useCrew } from "@/lib/crewContext";

const SVG_SIZE = 560;
const CENTER = SVG_SIZE / 2;
const BASELINE_RADIUS = 38;
const MAX_RADIUS = 230;

function scoreToRadius(score: 0 | 1 | 2 | 3): number {
  if (score === 0) return BASELINE_RADIUS;
  return BASELINE_RADIUS + (score * (MAX_RADIUS - BASELINE_RADIUS)) / 3;
}

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

const DOMAIN_ARRAY = Object.values(domains);

const BASELINE_PTS = DOMAIN_ARRAY.map((d) => {
  const score = d.visualStates["baseline"].perturbationScore as 0 | 1 | 2 | 3;
  return polar(d.angleDeg, scoreToRadius(score));
});

export const MINI_PHASES: MissionPhase[] = [
  "baseline",
  "inflight",
  "r_plus_1",
  "r_plus_45",
  "r_plus_82",
  "r_plus_194",
];

const PHASE_LABELS: Record<string, string> = {
  baseline: "BASELINE",
  inflight: "IN-FLIGHT",
  r_plus_1: "R+1",
  r_plus_45: "R+45",
  r_plus_82: "R+82",
  r_plus_194: "R+194",
};

function MiniPhaseChart({
  phase,
  isActive,
  onClick,
}: {
  phase: MissionPhase;
  isActive: boolean;
  onClick: () => void;
}) {
  const { profile } = useCrew();

  const activePts = useMemo(() => {
    return DOMAIN_ARRAY.map((domain) => {
      const v = domain.visualStates[phase];
      const override = profile.domainScoreOverrides[domain.id as DomainId];
      let score = v.perturbationScore as 0 | 1 | 2 | 3;
      if (
        override !== undefined &&
        (phase === "r_plus_1" || phase === "r_plus_45" || phase === "r_plus_82")
      ) {
        const blend =
          phase === "r_plus_1" ? 1 : phase === "r_plus_45" ? 0.65 : 0.4;
        score = Math.max(
          0,
          Math.min(3, Math.round(score + (override - score) * blend))
        ) as 0 | 1 | 2 | 3;
      }
      return polar(domain.angleDeg, scoreToRadius(score));
    });
  }, [phase, profile]);

  return (
    <button
      onClick={onClick}
      aria-label={`View ${PHASE_LABELS[phase] ?? phase} phase`}
      className={`flex flex-col items-center gap-1.5 shrink-0 rounded-xl p-1.5 transition-all ${
        isActive
          ? "ring-1 ring-[#06B6D4] bg-[#06B6D4]/[0.06]"
          : "hover:bg-white/[0.03]"
      }`}
    >
      <svg
        viewBox={`-40 0 ${SVG_SIZE + 80} ${SVG_SIZE}`}
        className="w-[88px] h-[88px] md:w-[108px] md:h-[108px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <polygon
          points={BASELINE_PTS.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="rgba(100,116,139,0.08)"
          stroke="#64748B"
          strokeWidth={2}
          strokeDasharray="4 3"
        />
        <polygon
          points={activePts.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="rgba(6,182,212,0.10)"
          stroke="rgba(6,182,212,0.55)"
          strokeWidth={2}
        />
      </svg>
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#64748B]">
        {PHASE_LABELS[phase] ?? phase}
      </span>
    </button>
  );
}

export function SmallMultiplesRow({
  activePhase,
  onPhaseSelect,
}: {
  activePhase: MissionPhase;
  onPhaseSelect: (p: MissionPhase) => void;
}) {
  return (
    <div className="space-y-2 mt-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#475569]">
        All phases · click to navigate
      </div>
      <div className="overflow-x-auto -mx-2 px-2">
        <div className="flex gap-1 w-max md:w-auto">
          {MINI_PHASES.map((phase) => (
            <MiniPhaseChart
              key={phase}
              phase={phase}
              isActive={phase === activePhase}
              onClick={() => onPhaseSelect(phase)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
