"use client";

import { motion } from "framer-motion";
import { domains } from "@/data/domains";
import { sources } from "@/data/sources";
import { useCrew } from "@/lib/crewContext";
import type { DomainId } from "@/data/types";

const ORDER: DomainId[] = ["immune", "oxidative", "energy", "telomere", "microbiome"];

export function PrintableBiobrief() {
  const { profile } = useCrew();

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap print:hidden">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#64748B] mb-2">
            Printable biobrief · take it offline
          </div>
          <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-[#F8FAFC]">
            One report card. Five domains.{" "}
            <span className="text-[#06B6D4]">Every claim sourced.</span>
          </h3>
        </div>
        <button
          onClick={handlePrint}
          className="font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-xl border border-[#06B6D4]/40 text-[#06B6D4] hover:bg-[#06B6D4]/[0.06]"
        >
          ⎙ Print / Save as PDF
        </button>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id="biobrief-printable"
        className="biobrief rounded-3xl border border-[#1E293B] bg-[#05070F] p-8 md:p-10 overflow-hidden relative"
      >
        <div
          className="pointer-events-none absolute -inset-px print:hidden"
          style={{
            background:
              "radial-gradient(60% 50% at 100% 0%, rgba(6,182,212,0.08), transparent 60%)",
          }}
        />

        <header className="relative grid md:grid-cols-[1fr_auto] gap-4 items-end pb-6 border-b mb-8"
          style={{
            borderImage: "linear-gradient(90deg, var(--mission-red), transparent) 1",
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{
              background: "linear-gradient(90deg, var(--mission-red), transparent)",
              opacity: 0.6,
            }}
          />
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#06B6D4] mb-2">
              Body in Orbit · Astronaut biological debrief
            </div>
            <h1 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] leading-tight">
              {profile.callsign}
            </h1>
            <div className="font-inter text-sm text-[#94A3B8] mt-1">
              {profile.missionRole} · {profile.ageBand}
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
              Generated
            </div>
            <div className="font-mono text-sm text-[#F8FAFC]">{today}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748B] mt-2">
              Mission · Inspiration4
            </div>
            <div className="font-mono text-xs text-[#94A3B8]">3 days · LEO ~585 km</div>
          </div>
        </header>

        <section className="mb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-2">
            Headline finding
          </div>
          <p className="font-space-grotesk text-xl md:text-2xl text-[#F8FAFC] leading-snug">
            {profile.signature}
          </p>
          <p className="font-inter text-sm text-[#94A3B8] mt-3 max-w-3xl leading-relaxed">
            {profile.bioFocusBlurb}
          </p>
        </section>

        <section className="mb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-3">
            Domain readout · post-flight perturbation score (0–3)
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ORDER.map((id) => {
              const d = domains[id];
              const override = profile.domainScoreOverrides[id];
              const score = override ?? d.evidence.perturbationScore;
              return (
                <div
                  key={id}
                  className="rounded-xl border border-[#1E293B] p-4 print:break-inside-avoid"
                  style={{ background: "rgba(255,255,255,0.01)" }}
                >
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.2em] mb-1"
                    style={{ color: d.color }}
                  >
                    {d.label}
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="font-space-grotesk text-3xl text-[#F8FAFC]">
                      {score}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748B]">
                      / 3
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className="block flex-1 h-1.5 rounded"
                        style={{
                          background:
                            n <= score
                              ? d.color
                              : "rgba(148,163,184,0.16)",
                        }}
                      />
                    ))}
                  </div>
                  <p className="font-inter text-xs text-[#94A3B8] leading-relaxed">
                    {d.plainLanguage}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-8 grid md:grid-cols-2 gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-2">
              Recovery note
            </div>
            <p className="font-inter text-sm text-[#F8FAFC] leading-relaxed">
              {profile.recoveryNote}
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-2">
              Suggested monitoring priority
            </div>
            <ol className="space-y-1">
              {profile.monitoringPriority.map((id, i) => {
                const d = domains[id];
                return (
                  <li
                    key={id}
                    className="flex items-center gap-3 font-mono text-xs text-[#F8FAFC]"
                  >
                    <span
                      className="font-mono text-[10px] tracking-wider"
                      style={{ color: d.color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{d.label}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F87171]/80 mb-3">
            What this report does not claim
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "diagnosis",
              "disease",
              "infection",
              "rejuvenation",
              "treatment recommendation",
              "flight readiness",
              "predictive risk",
            ].map((nc) => (
              <span
                key={nc}
                className="font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-md border border-[#F87171]/30 text-[#F87171]/85"
              >
                {nc}
              </span>
            ))}
          </div>
        </section>

        <section>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-3">
            Sources · every claim traceable
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {Object.values(sources).map((s) => (
              <li
                key={s.id}
                className="font-mono text-[11px] text-[#94A3B8] leading-snug"
              >
                <span className="text-[#F8FAFC]">{s.authorsShort}</span> ·{" "}
                {s.journal} {s.year}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-[#475569] hover:text-[#06B6D4]"
                >
                  {s.doi}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#06B6D4] mt-8 pt-6 border-t border-[#1E293B]/50">
          Cleared for communication. Not cleared for overclaiming.
        </div>

        <footer className="mt-10 pt-5 border-t border-[#1E293B] flex justify-between flex-wrap gap-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
            Body in Orbit · Inspiration4 debrief · molecular monitoring report
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
            Not a diagnosis · not medical clearance · not a forecast
          </div>
        </footer>
      </motion.article>
    </div>
  );
}
