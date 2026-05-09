"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
} from "recharts";
import { domains } from "@/data/domains";
import type { MissionPhase, DomainId } from "@/data/types";
import { useCrew } from "@/lib/crewContext";

const PHASES: { id: MissionPhase; label: string }[] = [
  { id: "baseline", label: "BASELINE" },
  { id: "inflight", label: "IN-FLIGHT" },
  { id: "r_plus_1", label: "R+1" },
  { id: "r_plus_45", label: "R+45" },
  { id: "r_plus_82", label: "R+82" },
  { id: "r_plus_194", label: "R+194" },
];

const DOMAIN_IDS: DomainId[] = ["immune", "oxidative", "energy", "telomere", "microbiome"];

function blendScore(
  base: number,
  override: number | undefined,
  phase: MissionPhase
): number {
  if (override === undefined) return base;
  if (phase === "r_plus_1") return Math.max(0, Math.min(3, Math.round(base + (override - base) * 1)));
  if (phase === "r_plus_45") return Math.max(0, Math.min(3, Math.round(base + (override - base) * 0.65)));
  if (phase === "r_plus_82") return Math.max(0, Math.min(3, Math.round(base + (override - base) * 0.4)));
  return base;
}

type ChartRow = { phase: string } & Record<DomainId, number>;

type TooltipPayload = {
  dataKey: string;
  value: number;
  color: string;
};

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#05070F]/95 backdrop-blur p-3 min-w-[220px]">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748B] mb-2">
        {label}
      </div>
      {payload.map((entry) => {
        const domain = domains[entry.dataKey as DomainId];
        return (
          <div key={entry.dataKey} className="flex items-start gap-2 mb-1.5">
            <span
              className="mt-0.5 block w-2 h-2 rounded-full shrink-0"
              style={{ background: entry.color }}
            />
            <div>
              <div className="font-mono text-[10px] text-[#F8FAFC]">
                {domain.label} · Score {entry.value}
              </div>
              <div className="font-inter text-[10px] text-[#64748B] leading-snug">
                {domain.plainLanguage}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SignatureSlopeChart() {
  const { profile } = useCrew();

  const data = useMemo<ChartRow[]>(() => {
    return PHASES.map(({ id, label }) => {
      const row: ChartRow = { phase: label } as ChartRow;
      for (const domainId of DOMAIN_IDS) {
        const domain = domains[domainId];
        const base = domain.visualStates[id].perturbationScore;
        const override = profile.domainScoreOverrides[domainId];
        row[domainId] = blendScore(base, override, id);
      }
      return row;
    });
  }, [profile]);

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 16, right: 24, left: -8, bottom: 8 }}>
          <CartesianGrid stroke="#1E293B" strokeOpacity={0.6} vertical={false} />
          <XAxis
            dataKey="phase"
            tick={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, fill: "#64748B", letterSpacing: "0.12em" }}
            axisLine={{ stroke: "#1E293B" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 3]}
            ticks={[0, 1, 2, 3]}
            tick={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <ReferenceLine
            y={0}
            stroke="#475569"
            strokeDasharray="4 3"
            strokeWidth={1}
            label={{ value: "PRE-FLIGHT", fill: "#475569", fontSize: 9, fontFamily: "IBM Plex Mono, monospace", dx: 4 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#334155", strokeWidth: 1 }} />
          {DOMAIN_IDS.map((id) => (
            <Line
              key={id}
              type="monotone"
              dataKey={id}
              stroke={domains[id].color}
              strokeWidth={2.5}
              dot={{ r: 4, fill: domains[id].color, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: domains[id].color, strokeWidth: 2, stroke: "#000" }}
              animationDuration={600}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-x-5 gap-y-1.5 justify-center">
        {DOMAIN_IDS.map((id) => (
          <span key={id} className="flex items-center gap-1.5 font-mono text-[10px] text-[#64748B]">
            <span className="block w-3 h-0.5 rounded" style={{ background: domains[id].color }} />
            {domains[id].shortLabel}
          </span>
        ))}
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#64748B]">
          <span className="block w-3 h-0" style={{ borderTop: "1px dashed #475569" }} />
          Pre-flight baseline
        </span>
      </div>

      <p className="font-mono text-[10px] text-[#475569] text-center tracking-[0.12em]">
        Y-axis: perturbation score (0–3) · distance from baseline, not clinical severity
      </p>
    </div>
  );
}
