"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { domains } from "@/data/domains";
import type { DomainId } from "@/data/types";
import { useCrew } from "@/lib/crewContext";

type MissionLength = "3d" | "30d" | "180d";

interface MissionProfile {
  id: MissionLength;
  label: string;
  shortLabel: string;
  duration: string;
  weights: Record<DomainId, number>;
  cadence: string;
  recoveryWindow: string;
  notes: string;
}

const MISSIONS: MissionProfile[] = [
  {
    id: "3d",
    label: "Short orbital",
    shortLabel: "3-day",
    duration: "3 days · LEO",
    weights: { immune: 1.0, oxidative: 0.85, telomere: 0.6, energy: 0.55, microbiome: 0.5 },
    cadence: "Pre · R+1 · R+45 · R+82 · R+194",
    recoveryWindow: "Six months of post-flight monitoring",
    notes: "Inspiration4 (the 2021 first all-civilian SpaceX mission) class profile. Strongest signals appear post-flight; in-flight sampling limited to dried blood spots.",
  },
  {
    id: "30d",
    label: "Cislunar",
    shortLabel: "30-day",
    duration: "30 days · cislunar transit",
    weights: { immune: 1.0, oxidative: 0.95, energy: 0.9, telomere: 0.85, microbiome: 0.7 },
    cadence: "Pre · weekly DBS · landing · R+30 · R+90 · R+180",
    recoveryWindow: "Twelve months of layered post-flight monitoring",
    notes: "Mission length crosses the threshold where in-flight metabolic and telomere (protective caps on the ends of your DNA) signals stop being inferable from short missions alone.",
  },
  {
    id: "180d",
    label: "Mars-relevant",
    shortLabel: "180-day",
    duration: "180 days · deep space transit",
    weights: { immune: 0.95, energy: 1.0, oxidative: 0.95, telomere: 0.95, microbiome: 0.85 },
    cadence: "Pre · biweekly DBS + microbiome · landing · R+30 · R+90 · R+180 · R+365",
    recoveryWindow: "Eighteen months of recovery monitoring",
    notes: "Energy metabolism rises in priority. Microbiome (the bacteria living on and in you) sampling becomes a continuous coupled-immune layer rather than a standalone signal.",
  },
];

export function MonitoringPlanner() {
  const [missionId, setMissionId] = useState<MissionLength>("3d");
  const { profile } = useCrew();
  const mission = MISSIONS.find((m) => m.id === missionId)!;

  const ordered = useMemo(() => {
    const ids: DomainId[] = ["immune", "oxidative", "energy", "telomere", "microbiome"];
    return ids
      .map((id) => {
        const base = mission.weights[id] ?? 0.5;
        // crew priority bumps
        const bump = profile.monitoringPriority.indexOf(id);
        const priorityScore = bump >= 0 ? (5 - bump) * 0.05 : 0;
        return { id, score: base + priorityScore };
      })
      .sort((a, b) => b.score - a.score);
  }, [mission, profile]);

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#64748B] mb-2">
            Prioritization preview · longer missions, layered monitoring
          </div>
          <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-[#F8FAFC] max-w-3xl">
            Different missions need{" "}
            <span className="text-[#06B6D4]">different monitoring trees.</span>
          </h3>
        </div>

        <div className="rounded-2xl bg-[#05070F] border border-[#1E293B] p-1 flex">
          {MISSIONS.map((m) => {
            const active = m.id === missionId;
            return (
              <button
                key={m.id}
                onClick={() => setMissionId(m.id)}
                className={`relative px-4 py-2 rounded-xl font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-[#06B6D4]" : "text-[#64748B] hover:text-[#94A3B8]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="planner-pill"
                    className="absolute inset-0 rounded-xl bg-[#06B6D4]/[0.08] border border-[#06B6D4]/40"
                    transition={{ type: "spring", stiffness: 250, damping: 30 }}
                  />
                )}
                <span className="relative">{m.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="rounded-2xl border border-[#1E293B] bg-[#05070F] p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-4">
            Priority order · {mission.label.toLowerCase()} · {profile.callsign}
          </div>

          <LayoutGroup>
            <ul className="space-y-2">
              {ordered.map((row, idx) => {
                const d = domains[row.id];
                return (
                  <motion.li
                    key={row.id}
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 28,
                    }}
                    className="relative grid grid-cols-[36px_220px_1fr_64px] gap-3 items-center rounded-xl border border-[#1E293B] bg-black/40 px-4 py-3"
                  >
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.18em]"
                      style={{ color: d.color }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div
                        className="font-mono text-[10px] uppercase tracking-[0.18em]"
                        style={{ color: d.color }}
                      >
                        {d.label}
                      </div>
                      <div className="font-inter text-[11px] text-[#94A3B8] leading-tight">
                        {d.shortLabel} signal
                      </div>
                    </div>
                    <div className="relative h-2 rounded-full bg-[#0B1220] overflow-hidden">
                      <motion.div
                        layout
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: d.color,
                          width: `${Math.min(100, row.score * 100)}%`,
                          boxShadow: `0 0 14px ${d.color}66`,
                        }}
                        animate={{
                          width: `${Math.min(100, row.score * 100)}%`,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 150,
                          damping: 28,
                        }}
                      />
                    </div>
                    <div className="font-mono text-[11px] text-[#F8FAFC] text-right">
                      {Math.round(row.score * 100)}
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </LayoutGroup>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-[#1E293B] bg-[#05070F] p-6 space-y-5"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
                Mission profile
              </div>
              <div className="font-space-grotesk text-2xl text-[#F8FAFC]">
                {mission.label}
              </div>
              <div className="font-mono text-xs text-[#94A3B8]">{mission.duration}</div>
            </div>

            <PlannerRow label="Sampling cadence" value={mission.cadence} />
            <PlannerRow label="Recovery window" value={mission.recoveryWindow} />

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-2">
                Why this order
              </div>
              <p className="font-inter text-sm text-[#94A3B8] leading-relaxed">
                {mission.notes}
              </p>
            </div>

            <div className="rounded-xl border border-[#FBBF24]/20 bg-[#FBBF24]/[0.04] p-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FBBF24] mb-1">
                Boundary
              </div>
              <p className="font-mono text-[11px] text-[#94A3B8] leading-relaxed">
                Inspiration4 evidence supports{" "}
                <span className="text-[#F8FAFC]">3-day</span> profile directly. Longer
                missions are <span className="text-[#F8FAFC]">monitoring proposals</span>,
                not validated forecasts.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PlannerRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-1">
        {label}
      </div>
      <div className="font-mono text-xs text-[#F8FAFC] leading-relaxed">{value}</div>
    </div>
  );
}
