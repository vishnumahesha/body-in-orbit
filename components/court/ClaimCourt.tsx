"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { claims, type ClaimZone } from "@/data/claims";

const ZONE_META: Record<ClaimZone, { label: string; color: string; glyph: string }> = {
  supported: { label: "Supported", color: "#34D399", glyph: "✓" },
  monitoring: { label: "Monitoring signal", color: "#FBBF24", glyph: "◎" },
  overclaim: { label: "Overclaim", color: "#F87171", glyph: "✕" },
};

export function ClaimCourt() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Record<number, ClaimZone>>({});

  const current = claims[index];
  const userPick = picked[current.id];
  const isCorrect = userPick === current.correctZone;
  const showVerdict = userPick !== undefined;

  const correctCount = useMemo(
    () =>
      Object.entries(picked).filter(
        ([id, z]) => claims.find((c) => c.id === Number(id))?.correctZone === z
      ).length,
    [picked]
  );

  const handlePick = (zone: ClaimZone) => {
    setPicked((p) => ({ ...p, [current.id]: zone }));
  };

  const handleNext = () => {
    setIndex((i) => Math.min(claims.length - 1, i + 1));
  };

  const handlePrev = () => {
    setIndex((i) => Math.max(0, i - 1));
  };

  const handleReset = () => {
    setPicked({});
    setIndex(0);
  };

  const completed = Object.keys(picked).length === claims.length;

  return (
    <div className="space-y-8">
      {/* counter rail */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#64748B]">
            Claim {index + 1} of {claims.length}
          </div>
          <div className="flex gap-1">
            {claims.map((c, i) => {
              const p = picked[c.id];
              const correct = p === c.correctZone;
              return (
                <button
                  key={c.id}
                  onClick={() => setIndex(i)}
                  className={`block w-2 h-2 rounded-full transition-all ${
                    i === index ? "scale-125" : "opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    background:
                      p === undefined
                        ? "#334155"
                        : correct
                        ? "#34D399"
                        : "#F87171",
                  }}
                  aria-label={`Jump to claim ${i + 1}`}
                />
              );
            })}
          </div>
        </div>
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#94A3B8]">
          Review progress: {correctCount} / {claims.length}
        </div>
      </div>

      {/* card */}
      <div className="relative" style={{ perspective: 2000 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, rotateY: -10, y: 12 }}
            animate={{ opacity: 1, rotateY: 0, y: 0 }}
            exit={{ opacity: 0, rotateY: 10, y: -12 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#05070F] border rounded-3xl p-8 md:p-10 overflow-hidden shadow-[0_0_20px_var(--mission-red-glow)]"
            style={{
              borderImage: "linear-gradient(135deg, var(--mission-red), rgba(6,182,212,0.4)) 1",
            }}
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl"
              style={{
                background:
                  "radial-gradient(120% 60% at 50% 0%, rgba(6,182,212,0.12), var(--mission-red-soft) 70%, transparent 90%)",
              }}
            />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#64748B]"
                >
                  Submitted claim · {current.domain}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748B]">
                  Court of evidence
                </span>
              </div>

              <p className="font-space-grotesk text-2xl md:text-3xl text-[#F8FAFC] leading-tight max-w-3xl">
                &ldquo;{current.text}&rdquo;
              </p>

              <div className="mt-8 grid md:grid-cols-3 gap-3">
                {(Object.keys(ZONE_META) as ClaimZone[]).map((zone) => {
                  const meta = ZONE_META[zone];
                  const isPicked = userPick === zone;
                  const reveal = showVerdict;
                  const isAnswer = current.correctZone === zone;
                  return (
                    <button
                      key={zone}
                      onClick={() => !showVerdict && handlePick(zone)}
                      disabled={showVerdict}
                      className={`relative rounded-xl border p-4 text-left transition-all ${
                        reveal && isAnswer
                          ? "border-[var(--c)] bg-[var(--c)]/[0.07]"
                          : isPicked
                          ? "border-[var(--c)]/60 bg-[var(--c)]/[0.05]"
                          : "border-[#1E293B] bg-black/40 hover:border-[#334155]"
                      } ${showVerdict ? "cursor-default" : "cursor-pointer"}`}
                      style={{ ["--c" as never]: meta.color }}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="font-mono text-[11px] uppercase tracking-[0.18em]"
                          style={{ color: meta.color }}
                        >
                          {meta.glyph} {meta.label}
                        </div>
                        {reveal && isAnswer && (
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.18em]"
                            style={{ color: meta.color }}
                          >
                            Correct
                          </span>
                        )}
                        {reveal && isPicked && !isAnswer && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F87171]">
                            Your pick
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showVerdict && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div
                          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]"
                          style={{
                            color: isCorrect ? "#34D399" : "#F87171",
                          }}
                        >
                          <span>{isCorrect ? "Verdict matches" : "Verdict differs"}</span>
                          <span className="text-[#64748B]">
                            · Court verdict: {ZONE_META[current.correctZone].label}
                          </span>
                        </div>

                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748B] mb-1">
                            Why
                          </div>
                          <p className="font-inter text-sm text-[#94A3B8] leading-relaxed">
                            {current.why}
                          </p>
                        </div>

                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748B] mb-1">
                            Source
                          </div>
                          <p className="font-mono text-sm text-[#94A3B8]">
                            {current.source}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-xl border border-[#06B6D4]/30 bg-[#06B6D4]/[0.05] p-4">
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#06B6D4] mb-2">
                            Safer wording
                          </div>
                          <p className="font-inter text-sm text-[#F8FAFC] leading-relaxed italic">
                            &ldquo;{current.saferWording}&rdquo;
                          </p>
                        </div>
                        <div className="rounded-xl border border-[#F87171]/25 bg-[#F87171]/[0.04] p-4">
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F87171]/80 mb-2">
                            Do not conclude
                          </div>
                          <p className="font-mono text-sm text-[#F87171]/80 leading-relaxed">
                            {current.doNotConclude}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* nav */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-xl border border-[#1E293B] text-[#94A3B8] hover:border-[#334155] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <button
          onClick={handleReset}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748B] hover:text-[#94A3B8]"
        >
          ⟲ Reset court
        </button>

        <button
          onClick={handleNext}
          disabled={index === claims.length - 1 || !showVerdict}
          className="font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-xl border border-[#06B6D4]/40 text-[#06B6D4] hover:bg-[#06B6D4]/[0.05] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next claim →
        </button>
      </div>

      {completed && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#06B6D4]/30 bg-[#06B6D4]/[0.04] p-6"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#06B6D4] mb-2">
            Court adjourned
          </div>
          <p className="font-space-grotesk text-xl text-[#F8FAFC] mb-2">
            {correctCount} of {claims.length} claims classified the same way the court did.
          </p>
          <p className="font-inter text-sm text-[#94A3B8] leading-relaxed">
            Knowing the boundary between observed signal and clinical claim is not optional in this
            briefing — it is the briefing.
          </p>
        </motion.div>
      )}
    </div>
  );
}
