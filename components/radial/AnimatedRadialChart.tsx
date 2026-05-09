"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { domains } from "@/data/domains";
import type { DomainId, MissionPhase } from "@/data/types";
import { useCrew } from "@/lib/crewContext";
import { SmallMultiplesRow } from "./MiniPhaseChart";

const PHASES: { id: MissionPhase; label: string; sub: string }[] = [
  { id: "baseline", label: "Baseline", sub: "L−92 to L−3" },
  { id: "inflight", label: "In-flight", sub: "FD2 – FD3" },
  { id: "r_plus_1", label: "R+1", sub: "Day after landing" },
  { id: "r_plus_45", label: "R+45", sub: "Six weeks post" },
  { id: "r_plus_82", label: "R+82", sub: "Twelve weeks post" },
  { id: "r_plus_194", label: "R+194", sub: "Six months post" },
];

const SVG_SIZE = 560;
const CENTER = SVG_SIZE / 2;
const BASELINE_RADIUS = 38;
const MAX_RADIUS = 230;

function scoreToRadius(score: 0 | 1 | 2 | 3) {
  if (score === 0) return BASELINE_RADIUS;
  const step = (MAX_RADIUS - BASELINE_RADIUS) / 3;
  return BASELINE_RADIUS + score * step;
}

function polar(angleDeg: number, radius: number) {
  const r = (angleDeg * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(r), y: CENTER + radius * Math.sin(r) };
}

const SPRING = { type: "spring", stiffness: 110, damping: 24, mass: 0.5 } as const;

export function AnimatedRadialChart({
  controlledPhase,
  onPhaseChange,
}: {
  controlledPhase?: MissionPhase;
  onPhaseChange?: (phase: MissionPhase) => void;
} = {}) {
  const { profile } = useCrew();
  const [internalPhase, setInternalPhase] = useState<MissionPhase>("r_plus_1");
  const [hovered, setHovered] = useState<DomainId | null>(null);
  const [autoplay, setAutoplay] = useState(false);

  const phase = controlledPhase ?? internalPhase;
  const setPhase = (newPhase: MissionPhase) => {
    if (controlledPhase === undefined) {
      setInternalPhase(newPhase);
    }
    onPhaseChange?.(newPhase);
  };

  const domainArray = useMemo(() => Object.values(domains), []);

  // baseline ghost — always phase "baseline", no crew overrides (scores are all 0 by definition)
  const baselinePoints = useMemo(
    () =>
      domainArray.map((domain) => {
        const v = domain.visualStates["baseline"];
        const score = v.perturbationScore as 0 | 1 | 2 | 3;
        const { x, y } = polar(domain.angleDeg, scoreToRadius(score));
        return { x, y };
      }),
    [domainArray]
  );

  // build per-crew override
  const adjustedPoints = domainArray.map((domain) => {
    const v = domain.visualStates[phase];
    const override = profile.domainScoreOverrides[domain.id];
    let score = v.perturbationScore;
    // Scale the score curve toward this crew's override at peak phase
    if (override !== undefined && (phase === "r_plus_1" || phase === "r_plus_45" || phase === "r_plus_82")) {
      const blend = phase === "r_plus_1" ? 1 : phase === "r_plus_45" ? 0.65 : 0.4;
      const blended = Math.round(score + (override - score) * blend);
      score = Math.max(0, Math.min(3, blended)) as 0 | 1 | 2 | 3;
    }
    const { x, y } = polar(domain.angleDeg, scoreToRadius(score));
    return { domain, score, x, y, visual: v };
  });

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => {
      const idx = PHASES.findIndex((p) => p.id === phase);
      setPhase(PHASES[(idx + 1) % PHASES.length].id);
    }, 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, phase]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap gap-2">
          {PHASES.map((p) => {
            const active = p.id === phase;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setAutoplay(false);
                  setPhase(p.id);
                }}
                className={`group relative rounded-xl border px-3.5 py-2 text-left transition-all ${
                  active
                    ? "border-[#06B6D4]/60 bg-[#06B6D4]/[0.06]"
                    : "border-[#1E293B] bg-[#05070F] hover:border-[#334155]"
                }`}
              >
                <div
                  className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                    active ? "text-[#06B6D4]" : "text-[#94A3B8]"
                  }`}
                >
                  {p.label}
                </div>
                <div className="font-mono text-[9px] text-[#64748B]">{p.sub}</div>
                {active && (
                  <motion.span
                    layoutId="phase-underline"
                    className="absolute -bottom-px left-3 right-3 h-px bg-[#06B6D4]"
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setAutoplay((v) => !v)}
          className={`font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-2 rounded-xl border transition-colors ${
            autoplay
              ? "border-[#06B6D4] text-[#06B6D4] bg-[#06B6D4]/[0.10] ring-1 ring-[#06B6D4]/40 shadow-[0_0_18px_rgba(6,182,212,0.25)]"
              : "border-[#1E293B] text-[#94A3B8] hover:border-[#334155]"
          }`}
        >
          {autoplay ? "❙❙ Stop loop" : "▶ Loop phases"}
        </button>
      </div>

      <div className="relative aspect-square w-full max-w-[640px] mx-auto">
        {/* ambient blob */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div
            className="w-[70%] h-[70%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0.04) 45%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <svg
          viewBox={`-40 0 ${SVG_SIZE + 80} ${SVG_SIZE}`}
          className="relative z-10 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="rc-radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.16" />
              <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
            <filter id="rc-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          <circle cx={CENTER} cy={CENTER} r={MAX_RADIUS} fill="url(#rc-radarGlow)" />

          {/* concentric rings */}
          {[1, 2, 3].map((s) => {
            const r = scoreToRadius(s as 1 | 2 | 3);
            return (
              <g key={s}>
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={r}
                  fill="none"
                  stroke="#06B6D4"
                  strokeOpacity={0.16}
                />
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={r}
                  fill="none"
                  stroke="#06B6D4"
                  strokeOpacity={0.08}
                  strokeDasharray="3 9"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="12"
                    dur="14s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x={CENTER + r + 6}
                  y={CENTER + 4}
                  fill="#06B6D4"
                  opacity={0.4}
                  fontSize="10"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  {s}
                </text>
              </g>
            );
          })}

          {/* spokes */}
          {domainArray.map((d) => {
            const tip = polar(d.angleDeg, MAX_RADIUS);
            return (
              <line
                key={`spoke-${d.id}`}
                x1={CENTER}
                y1={CENTER}
                x2={tip.x}
                y2={tip.y}
                stroke="#1E293B"
                strokeOpacity={0.4}
              />
            );
          })}

          {/* baseline center pulse */}
          <circle cx={CENTER} cy={CENTER} r={6} fill="#06B6D4" opacity={0.45}>
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur="3.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={CENTER} cy={CENTER} r={3} fill="#06B6D4" />

          {/* baseline ghost — always shown, never animates */}
          <polygon
            points={baselinePoints.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="rgba(100,116,139,0.08)"
            stroke="#64748B"
            strokeWidth={1}
            strokeDasharray="4 3"
          />

          {/* active-phase polygon */}
          <motion.polygon
            points={adjustedPoints.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="rgba(6, 182, 212, 0.08)"
            stroke="rgba(6, 182, 212, 0.45)"
            strokeWidth={1}
            initial={false}
            animate={{
              points: adjustedPoints.map((p) => `${p.x},${p.y}`).join(" "),
            }}
            transition={SPRING}
          />

          {/* domain nodes */}
          {adjustedPoints.map(({ domain, x, y, visual, score }) => {
            const isHovered = hovered === domain.id;
            const isFilled = visual.nodeFill === "filled";
            const labelPos = polar(domain.angleDeg, MAX_RADIUS + 28);

            return (
              <g
                key={domain.id}
                onMouseEnter={() => setHovered(domain.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 22 : 14}
                  fill={domain.color}
                  opacity={isHovered ? 0.18 : 0.05}
                  filter="url(#rc-glow)"
                  initial={false}
                  animate={{ cx: x, cy: y }}
                  transition={SPRING}
                />
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 10 : 8}
                  fill={isFilled ? domain.color : "#000"}
                  stroke={domain.color}
                  strokeWidth={2.5}
                  initial={false}
                  animate={{ cx: x, cy: y }}
                  transition={SPRING}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  fill={isHovered ? domain.color : "#94A3B8"}
                  fontSize="11"
                  fontFamily="IBM Plex Mono, monospace"
                  letterSpacing="0.12em"
                  style={{
                    textShadow: isHovered ? `0 0 10px ${domain.color}` : "none",
                  }}
                >
                  {domain.shortLabel.toUpperCase()}
                </text>
                <text
                  x={labelPos.x}
                  y={labelPos.y + 14}
                  textAnchor="middle"
                  fill="#475569"
                  fontSize="9"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  Score {score}
                </text>
              </g>
            );
          })}

          {/* baseline label */}
          <text
            x={CENTER}
            y={CENTER + BASELINE_RADIUS + 18}
            textAnchor="middle"
            fill="#06B6D4"
            opacity={0.55}
            fontSize="9"
            fontFamily="IBM Plex Mono, monospace"
            letterSpacing="0.15em"
          >
            PRE-FLIGHT BASELINE
          </text>

          {/* legend */}
          <text
            x={CENTER}
            y={SVG_SIZE - 10}
            textAnchor="middle"
            fill="#475569"
            fontSize="9"
            fontFamily="IBM Plex Mono, monospace"
            letterSpacing="0.12em"
          >
            BASELINE (DASHED) · ACTIVE PHASE (SOLID)
          </text>
        </svg>

        <AnimatePresence mode="wait">
          {hovered && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 max-w-[420px] w-[88%] rounded-xl border border-[#1E293B] bg-[#05070F]/90 backdrop-blur p-4 z-20"
            >
              <div className="flex items-center justify-between mb-1">
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: domains[hovered].color }}
                >
                  {domains[hovered].label}
                </div>
                <div className="font-mono text-[10px] text-[#64748B]">
                  Confidence · {domains[hovered].confidence}
                </div>
              </div>
              <div className="text-[#F8FAFC] text-sm leading-relaxed">
                {domains[hovered].plainLanguage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center font-mono text-[10px] text-[#64748B]">
        <span className="flex items-center gap-2">
          <span className="block w-3 h-3 rounded-full bg-[#06B6D4]/40 border border-[#06B6D4]" />
          measured perturbation
        </span>
        <span className="flex items-center gap-2">
          <span className="block w-3 h-3 rounded-full border border-[#06B6D4]" />
          inferred / extrapolated
        </span>
        <span>distance from center = perturbation score, not severity</span>
      </div>

      <SmallMultiplesRow
        activePhase={phase}
        onPhaseSelect={(p) => {
          setAutoplay(false);
          setPhase(p);
        }}
      />
    </div>
  );
}
