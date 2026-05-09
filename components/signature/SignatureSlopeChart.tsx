"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { domains } from "@/data/domains";
import { useCrew } from "@/lib/crewContext";
import type { MissionPhase, DomainId } from "@/data/types";
import type { CrewProfile } from "@/data/crew";

const PHASE_ORDER: MissionPhase[] = [
  "baseline", "inflight", "r_plus_1", "r_plus_45", "r_plus_82", "r_plus_194",
];
const PHASE_LABELS: Partial<Record<MissionPhase, string>> = {
  baseline: "BASELINE", inflight: "IN-FLIGHT", r_plus_1: "R+1",
  r_plus_45: "R+45", r_plus_82: "R+82", r_plus_194: "R+194",
};

const DOMAIN_CFG: Record<DomainId, { color: string; label: string }> = {
  immune:     { color: "#06B6D4", label: "IMMUNE" },
  oxidative:  { color: "#FBBF24", label: "OXIDATIVE" },
  energy:     { color: "#3B82F6", label: "ENERGY" },
  telomere:   { color: "#A855F7", label: "TELOMERE" },
  microbiome: { color: "#10B981", label: "MICROBIOME" },
};
const DOMAIN_KEYS = Object.keys(DOMAIN_CFG) as DomainId[];

type ChartPoint = { phase: string; immune: number; oxidative: number; energy: number; telomere: number; microbiome: number };

function computeScore(id: DomainId, phase: MissionPhase, profile: CrewProfile): number {
  const v = domains[id].visualStates[phase];
  let score: number = v.perturbationScore;
  const override = profile.domainScoreOverrides[id];
  if (override !== undefined && (phase === "r_plus_1" || phase === "r_plus_45" || phase === "r_plus_82")) {
    const blend = phase === "r_plus_1" ? 1 : phase === "r_plus_45" ? 0.65 : 0.4;
    score = Math.max(0, Math.min(3, Math.round(score + (override - score) * blend)));
  }
  return score;
}

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number; color: string }>;
  label?: string;
};

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0F172A", border: "1px solid rgba(148,163,184,0.2)", borderRadius: "8px", padding: "12px" }}>
      <div className="font-mono text-[10px] tracking-wider text-slate-400 mb-2">{label}</div>
      {payload.map((entry) => {
        const cfg = DOMAIN_CFG[entry.dataKey as DomainId];
        if (!cfg) return null;
        return (
          <div key={entry.dataKey} className="flex items-center gap-3 mb-1 last:mb-0">
            <span className="font-mono text-[11px] tracking-wider" style={{ color: entry.color }}>{cfg.label}</span>
            <span className="font-mono text-[11px] text-slate-300">Score {entry.value} of 3</span>
          </div>
        );
      })}
      {payload[0] && (
        <div className="text-[11px] text-slate-400 mt-2 max-w-[220px] leading-relaxed">
          {domains[payload[0].dataKey as DomainId]?.plainLanguage}
        </div>
      )}
    </div>
  );
}

export function SignatureSlopeChart() {
  const { profile } = useCrew();
  const [hoveredDomain, setHoveredDomain] = useState<DomainId | null>(null);

  const data = useMemo<ChartPoint[]>(
    () =>
      PHASE_ORDER.map((phase) => ({
        phase: PHASE_LABELS[phase] ?? phase,
        immune: computeScore("immune", phase, profile),
        oxidative: computeScore("oxidative", phase, profile),
        energy: computeScore("energy", phase, profile),
        telomere: computeScore("telomere", phase, profile),
        microbiome: computeScore("microbiome", phase, profile),
      })),
    [profile]
  );

  return (
    <div className="max-w-[960px] mx-auto py-8" id="signature-slope-chart" data-testid="signature-slope-chart">
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
        {DOMAIN_KEYS.map((key) => {
          const { color, label } = DOMAIN_CFG[key];
          const faded = hoveredDomain !== null && hoveredDomain !== key;
          return (
            <button
              key={key}
              className="flex items-center gap-2 font-mono text-xs tracking-wider transition-opacity"
              style={{ opacity: faded ? 0.3 : 1, color }}
              onMouseEnter={() => setHoveredDomain(key)}
              onMouseLeave={() => setHoveredDomain(null)}
            >
              <span className="block w-5 h-px" style={{ background: color }} />
              {label}
            </button>
          );
        })}
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.08)" />
          <XAxis
            dataKey="phase"
            tick={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, fill: "#64748B" }}
            axisLine={{ stroke: "#1E293B" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 3]}
            ticks={[0, 1, 2, 3]}
            tick={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "PERTURBATION",
              angle: -90,
              position: "insideLeft",
              style: { fontFamily: "IBM Plex Mono, monospace", fontSize: 10, fill: "#64748B" },
              dx: -4,
            }}
            width={72}
          />
          <ReferenceLine
            y={0}
            stroke="#64748B"
            strokeDasharray="4 3"
            label={{ value: "BASELINE", position: "insideTopRight", style: { fontFamily: "IBM Plex Mono, monospace", fontSize: 9, fill: "#64748B" } }}
          />
          <Tooltip content={(props) => <ChartTooltip {...(props as unknown as TooltipProps)} />} />
          {DOMAIN_KEYS.map((key, i) => {
            const { color } = DOMAIN_CFG[key];
            const faded = hoveredDomain !== null && hoveredDomain !== key;
            return (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={2.5}
                strokeOpacity={faded ? 0.3 : 1}
                dot={{ r: 4, fill: color, stroke: "#0F172A", strokeWidth: 1.5 }}
                activeDot={{ r: 6, fill: color, stroke: "#0F172A", strokeWidth: 2 }}
                isAnimationActive
                animationBegin={i * 200}
                animationDuration={1200}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
