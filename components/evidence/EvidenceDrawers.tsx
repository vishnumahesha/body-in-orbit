"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { domains } from "@/data/domains";
import { sources } from "@/data/sources";
import type { DomainId } from "@/data/types";

const ORDER: DomainId[] = ["immune", "oxidative", "energy", "telomere", "microbiome"];

const STATUS_LABEL: Record<string, string> = {
  direct_measured: "Directly measured in flight",
  postflight_observed: "Observed post-flight",
  inferred_trajectory: "Inferred trajectory",
  mixed: "Mixed evidence layers",
  not_measured: "Not measured",
};

export function EvidenceDrawers() {
  const [openId, setOpenId] = useState<DomainId | null>(null);

  return (
    <div className="space-y-3">
      {ORDER.map((id, idx) => {
        const d = domains[id];
        const isOpen = openId === id;
        const e = d.evidence;

        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className={`relative rounded-2xl border overflow-hidden ${
              isOpen ? "border-[var(--c)]/50 bg-[var(--c)]/[0.03] shadow-[0_0_16px_var(--mission-red-glow)]" : "border-[#1E293B] bg-[#05070F]"
            }`}
            style={{ ["--c" as never]: d.color }}
          >
            {/* color rail */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px]"
              style={{ background: d.color, opacity: isOpen ? 1 : 0.4 }}
            />

            <button
              onClick={() => setOpenId(isOpen ? null : id)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-9 h-9 rounded-full border flex items-center justify-center"
                  style={{
                    borderColor: d.color,
                    background: isOpen ? `${d.color}22` : "transparent",
                  }}
                >
                  <span
                    className="font-mono text-xs"
                    style={{ color: d.color }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.2em] mb-1"
                    style={{ color: d.color }}
                  >
                    {d.label}
                  </div>
                  <div className="font-space-grotesk text-lg text-[#F8FAFC] leading-tight">
                    {d.plainLanguage}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="hidden md:block text-right">
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#64748B]">
                    Score · Confidence
                  </div>
                  <div className="font-mono text-xs text-[#94A3B8]">
                    {d.evidence.perturbationScore} · {d.confidence}
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-2xl text-[#94A3B8]"
                >
                  +
                </motion.span>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-7 pt-2 grid lg:grid-cols-3 gap-6">
                    {/* receipt block 1 */}
                    <div className="lg:col-span-2 space-y-5">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748B] mb-2">
                          Technical finding
                        </div>
                        <p className="font-inter text-sm text-[#F8FAFC] leading-relaxed">
                          {e.technicalFinding}
                        </p>
                      </div>

                      <div className="rounded-xl border border-[#06B6D4]/25 bg-[#06B6D4]/[0.04] p-4">
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#06B6D4] mb-2">
                          Astronaut-facing wording
                        </div>
                        <p className="font-inter text-sm text-[#F8FAFC] leading-relaxed italic">
                          &ldquo;{e.astronautSafeWording}&rdquo;
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748B] mb-2">
                            Why this score
                          </div>
                          <p className="font-mono text-sm text-[#94A3B8] leading-relaxed">
                            {e.whyScore}
                          </p>
                        </div>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748B] mb-2">
                            Mission planning relevance
                          </div>
                          <p className="font-inter text-sm text-[#94A3B8] leading-relaxed">
                            {e.missionPlanningRelevance}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-[#F87171]/20 bg-[#F87171]/[0.03] p-4">
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F87171]/80 mb-2">
                          Not claiming
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {e.notClaiming.map((nc, i) => (
                            <span
                              key={`${nc}-${i}`}
                              className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border border-[#F87171]/20 text-[#F87171]/85"
                            >
                              {nc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* receipt sidebar */}
                    <div className="space-y-4">
                      <ReceiptRow
                        label="Evidence status"
                        value={STATUS_LABEL[e.evidenceStatus] ?? e.evidenceStatus}
                      />
                      <ReceiptRow
                        label="Confidence"
                        value={e.confidence}
                      />
                      <ReceiptRow
                        label="Perturbation score"
                        value={`${e.perturbationScore} of 3`}
                      />
                      <ReceiptRow label="Sample size" value={`n = ${e.n}`} />

                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#64748B] mb-2">
                          Assays
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {e.assays.map((a) => (
                            <span
                              key={a}
                              className="font-mono text-[10px] px-2 py-1 rounded-md border border-[#1E293B] text-[#94A3B8]"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#64748B] mb-2">
                          Sample types
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {e.sampleTypes.map((s) => (
                            <span
                              key={s}
                              className="font-mono text-[10px] px-2 py-1 rounded-md border border-[#1E293B] text-[#94A3B8]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#64748B] mb-2">
                          Timepoints measured
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {e.timepointsMeasured.map((tp) => (
                            <span
                              key={tp}
                              className="font-mono text-[10px] px-1.5 py-0.5 rounded text-[#94A3B8] border border-[#1E293B]"
                            >
                              {tp}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#64748B] mb-2">
                          Source publications
                        </div>
                        <ul className="space-y-1.5">
                          {e.sourceIds.map((sid) => {
                            const src = sources[sid];
                            if (!src) return null;
                            return (
                              <li key={sid}>
                                <a
                                  href={src.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-mono text-[10px] text-[#94A3B8] hover:text-[#06B6D4] underline-offset-2 hover:underline"
                                >
                                  {src.authorsShort} · {src.journal} {src.year}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-[#1E293B] pb-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#64748B]">
        {label}
      </span>
      <span className="font-mono text-[11px] text-[#F8FAFC]">{value}</span>
    </div>
  );
}
