"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { notebookDatasets } from "@/data/notebookDatasets";

type Coverage = "collected" | "differential" | "missing";

const TIMEPOINTS = [
  "L-92",
  "L-44",
  "L-3",
  "FD1",
  "FD2",
  "FD3",
  "R+1",
  "R+45",
  "R+82",
  "R+194",
] as const;
type Timepoint = (typeof TIMEPOINTS)[number];

const INFLIGHT: Set<Timepoint> = new Set<Timepoint>(["FD1", "FD2", "FD3"]);

function buildCoverage(): Record<string, Record<Timepoint, Coverage>> {
  const out: Record<string, Record<Timepoint, Coverage>> = {};
  notebookDatasets.forEach((d) => {
    const row: Record<Timepoint, Coverage> = TIMEPOINTS.reduce((acc, tp) => {
      acc[tp] = "missing";
      return acc;
    }, {} as Record<Timepoint, Coverage>);

    if (d.dataShape === "precomputed_differential") {
      // Differential R+1 vs pre-flight datasets — mark the pre and post anchors
      row["R+1"] = "differential";
      row["L-92"] = "differential";
      row["L-44"] = "differential";
      row["L-3"] = "differential";
    } else {
      d.timepoints.forEach((t) => {
        if ((TIMEPOINTS as readonly string[]).includes(t)) {
          row[t as Timepoint] = "collected";
        }
      });
    }
    out[d.id] = row;
  });
  return out;
}

const COLOR: Record<Coverage, string> = {
  collected: "#06B6D4",
  differential: "#A78BFA",
  missing: "#1E293B",
};

export function SampleCoverageMatrix() {
  const coverage = useMemo(buildCoverage, []);
  const [hovered, setHovered] = useState<{ row: string; tp: Timepoint } | null>(null);

  const summary = useMemo(() => {
    let collected = 0;
    let differential = 0;
    let missing = 0;
    Object.values(coverage).forEach((row) => {
      Object.values(row).forEach((v) => {
        if (v === "collected") collected += 1;
        else if (v === "differential") differential += 1;
        else missing += 1;
      });
    });
    return { collected, differential, missing };
  }, [coverage]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#64748B] mb-2">
            Sample coverage matrix · 12 datasets × 10 timepoints
          </div>
          <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-[#F8FAFC]">
            What was collected — and where the gaps live.
          </h3>
          <p className="mt-3 max-w-3xl font-inter text-xs leading-relaxed text-[#94A3B8]">
            Rows use OSD-XXX, the NASA Open Science Data Repository study ID. Mission
            shorthand: L-92 to L-3 (92 to 3 days before launch), FD2-FD3 (days 2-3 of
            the flight), R+1 (one day after landing), R+45 (~6 weeks after landing),
            R+82 (~12 weeks after landing), and R+194 (~6 months after landing).
          </p>
        </div>
        <div className="flex gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#94A3B8]">
          <span className="flex items-center gap-2">
            <span
              className="block w-3 h-3 rounded-sm"
              style={{ background: COLOR.collected }}
            />
            Collected · {summary.collected}
          </span>
          <span className="flex items-center gap-2">
            <span
              className="block w-3 h-3 rounded-sm"
              style={{ background: COLOR.differential }}
            />
            Differential anchor · {summary.differential}
          </span>
          <span className="flex items-center gap-2">
            <span
              className="block w-3 h-3 rounded-sm border border-[#334155]"
            />
            Gap · {summary.missing}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
       <div className="rounded-2xl border border-[#1E293B] bg-[#05070F] p-5">
        <div className="min-w-[820px]">
          {/* header row */}
          <div className="grid grid-cols-[260px_repeat(10,1fr)] gap-2 mb-3">
            <div />
            {TIMEPOINTS.map((tp) => {
              const inflight = INFLIGHT.has(tp);
              const isHoveredCol = hovered?.tp === tp;
              return (
                <div
                  key={tp}
                  className={`text-center transition-colors ${
                    isHoveredCol ? "text-[#06B6D4]" : "text-[#94A3B8]"
                  }`}
                >
                  {inflight && (
                    <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#06B6D4]">
                      Inflight
                    </div>
                  )}
                  <div className="font-mono text-[10px] tracking-wide">{tp}</div>
                </div>
              );
            })}
          </div>

          {/* rows */}
          <div className="space-y-1">
            {notebookDatasets.map((d) => {
              const isRowHovered = hovered?.row === d.id;
              return (
                <div
                  key={d.id}
                  className={`grid grid-cols-[260px_repeat(10,1fr)] gap-2 items-center px-2 py-1.5 rounded-lg transition-colors ${
                    isRowHovered ? "bg-[#06B6D4]/[0.04]" : ""
                  }`}
                >
                  <div className="pr-2">
                    <div
                      className={`font-mono text-[12px] uppercase tracking-[0.16em] ${
                        isRowHovered ? "text-[#06B6D4]" : "text-[#64748B]"
                      }`}
                    >
                      {d.osdId}
                    </div>
                    <div className="font-inter text-[13px] text-[#F8FAFC] leading-tight">
                      {d.label}
                    </div>
                  </div>
                  {TIMEPOINTS.map((tp) => {
                    const c = coverage[d.id][tp];
                    const inflight = INFLIGHT.has(tp);
                    const cellHovered =
                      hovered?.row === d.id && hovered?.tp === tp;
                    return (
                      <button
                        key={tp}
                        type="button"
                        onClick={() => setHovered({ row: d.id, tp })}
                        onMouseEnter={() => setHovered({ row: d.id, tp })}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered({ row: d.id, tp })}
                        onBlur={() => setHovered(null)}
                        className={`relative h-7 rounded-md transition-all ${
                          inflight ? "ring-1 ring-[#06B6D4]/15" : ""
                        }`}
                        style={{
                          background:
                            c === "missing"
                              ? "transparent"
                              : `${COLOR[c]}${cellHovered ? "" : "CC"}`,
                          border: c === "missing" ? "1px dashed #1E293B" : "none",
                          boxShadow: cellHovered
                            ? `0 0 0 2px ${COLOR[c]}`
                            : "none",
                        }}
                        aria-label={`${d.label} at ${tp}: ${c}`}
                      >
                        {cellHovered && c !== "missing" && (
                          <motion.span
                            layoutId="cov-cell-glow"
                            className="absolute inset-0 rounded-md"
                            style={{
                              boxShadow: `0 0 22px ${COLOR[c]}`,
                              opacity: 0.5,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
       </div>
      </div>

      <p className="md:hidden text-[11px] font-mono text-cyan-400/60 mt-3">↔ swipe to see all timepoints</p>

      {/* tooltip */}
      <div className="min-h-[110px]">
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.div
              key={`${hovered.row}-${hovered.tp}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-[#1E293B] bg-[#05070F] px-5 py-4"
            >
              {(() => {
                const ds = notebookDatasets.find((d) => d.id === hovered.row);
                if (!ds) return null;
                const c = coverage[ds.id][hovered.tp];
                return (
                  <div className="grid md:grid-cols-[180px_1fr] gap-4 items-start">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
                        Cell
                      </div>
                      <div className="font-mono text-sm text-[#F8FAFC]">
                        {ds.osdId} · {hovered.tp}
                      </div>
                      <div
                        className="font-mono text-[10px] uppercase tracking-[0.18em] mt-2"
                        style={{ color: COLOR[c] }}
                      >
                        {c === "missing"
                          ? "No sample at this timepoint"
                          : c === "differential"
                          ? "Anchor in precomputed differential"
                          : "Sample collected"}
                      </div>
                    </div>
                    <div>
                      <div className="font-inter text-sm text-[#F8FAFC] mb-1">
                        {ds.label}
                      </div>
                      <p className="font-inter text-xs text-[#94A3B8] leading-relaxed mb-2">
                        {ds.comparisonNote}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F87171]/70">
                        Caution · {ds.caution}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[11px] text-[#475569]"
            >
              Each cell shows whether that dataset was collected at that timepoint. Teal = collected. Purple = differential anchor (the reference data point used for comparison). Dashed = not collected.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
