"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCrew } from "@/lib/crewContext";
import { UnicornScene } from "./UnicornScene";

const colorByDomainId: Record<string, string> = {
  immune: "#22D3EE",
  oxidative: "#FBBF24",
  energy: "#60A5FA",
  telomere: "#A78BFA",
  microbiome: "#2DD4BF",
};

const portraitMap: Record<string, string> = {
  C001: "cNfmqREQbl0Ef3oTF0Kb",
  C002: "6JulkxqiM1AkcRNtpiN8",
  C003: "euUnpkad5Ae5ctmf5KTj",
  C004: "32Fm5JxcdDIPZV5CDlyd",
};

function CrewBadge({ id, isActive }: { id: string; isActive: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`block w-2 h-2 rounded-full ${
          isActive ? "bg-[#06B6D4]" : "bg-[#475569]"
        }`}
        style={{
          boxShadow: isActive ? "0 0 12px #06B6D4" : "none",
        }}
      />
      <span
        className={`font-mono text-[11px] tracking-[0.18em] ${
          isActive ? "text-[#06B6D4]" : "text-[#64748B]"
        }`}
      >
        {id}
      </span>
    </div>
  );
}

export function CrewSelector() {
  const { crewId, setCrewId, allProfiles, profile } = useCrew();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#64748B] mb-2">
            Crew Selector · select to load debrief
          </div>
          <h2 className="font-space-grotesk text-2xl md:text-3xl font-bold text-[#F8FAFC]">
            Four civilians.{" "}
            <span className="text-[#06B6D4]">One mission.</span>{" "}
            Four biological readouts.
          </h2>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`now-${crewId}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-right"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
              Currently briefing
            </div>
            <div className="font-space-grotesk text-lg text-[#F8FAFC]">
              {profile.callsign}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {allProfiles.map((p, i) => {
          const isActive = p.id === crewId;
          const topDomain = p.monitoringPriority[0];
          const accent = colorByDomainId[topDomain] ?? "#06B6D4";
          const portraitId = portraitMap[p.id];

          return (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setCrewId(p.id as typeof crewId)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              className={`relative text-left rounded-2xl border p-5 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/40 transition-colors ${
                isActive
                  ? "border-[#06B6D4]/60 bg-[#06B6D4]/[0.04]"
                  : "border-[#1E293B] bg-[#05070F] hover:border-[#334155]"
              }`}
              aria-pressed={isActive}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                  opacity: isActive ? 0.9 : 0.25,
                }}
              />

              {portraitId && (
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg mb-10 bg-black">
                  <UnicornScene
                    projectId={portraitId}
                    fallbackLabel={p.displayLabel}
                  />
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <CrewBadge id={p.displayLabel} isActive={isActive} />
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748B]"
                >
                  {p.missionRole}
                </span>
              </div>

              <div className="font-space-grotesk text-lg text-[#F8FAFC] leading-tight mb-1">
                {p.bioFocus}
              </div>
              <div className="font-mono text-[10px] text-[#64748B] mb-4">
                {p.ageBand}
              </div>

              <div className="flex gap-1.5 mt-auto">
                {p.monitoringPriority.map((d, idx) => (
                  <span
                    key={d}
                    className="block h-1 rounded-full flex-1"
                    style={{
                      background: colorByDomainId[d] ?? "#334155",
                      opacity: 1 - idx * 0.16,
                    }}
                  />
                ))}
              </div>

              {isActive && (
                <motion.div
                  layoutId="crew-active-glow"
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${accent}, 0 0 36px -10px ${accent}`,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={`note-${crewId}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className="font-inter text-sm text-[#94A3B8] max-w-2xl leading-relaxed"
        >
          {profile.bioFocusBlurb}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
