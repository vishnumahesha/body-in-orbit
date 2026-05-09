"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { MissionPhase } from "@/data/types";

const PHASE_EXPLANATIONS: Record<
  MissionPhase,
  { title: string; description: string }
> = {
  baseline: {
    title: "Baseline",
    description:
      "Baseline means this crew member's pre-flight reference state: L-92 to L-3 (92 to 3 days before launch). It is not a universal normal.",
  },
  inflight: {
    title: "In-flight",
    description:
      "Only some layers were sampled during flight. The interface leaves gaps visible instead of pretending continuous monitoring.",
  },
  r_plus_1: {
    title: "R+1",
    description:
      "R+1 (one day after landing) is where the strongest post-flight molecular movement appears across multiple monitoring domains.",
  },
  r_plus_45: {
    title: "R+45",
    description:
      "R+45 (~6 weeks after landing) shows some signals moving back toward baseline, but recovery is not uniform across biological layers.",
  },
  r_plus_82: {
    title: "R+82",
    description:
      "R+82 (~12 weeks after landing) shows layer-dependent recovery. Some domains look closer to baseline while others remain partially shifted or uncertain.",
  },
  r_plus_194: {
    title: "R+194",
    description:
      "R+194 (~6 months after landing) has longer recovery context for fewer datasets, so read this phase with higher coverage caution.",
  },
  hero: {
    title: "Overview",
    description:
      "Select a mission phase to see how biological domains shifted across the timeline.",
  },
  measured: {
    title: "Measured",
    description:
      "Select a mission phase to see how biological domains shifted across the timeline.",
  },
  recovery: {
    title: "Recovery",
    description:
      "Recovery context across multiple timepoints. Movement toward baseline varies by domain and dataset coverage.",
  },
  limits: {
    title: "Limits",
    description:
      "This view highlights what the data cannot prove and where coverage ends.",
  },
};

export function PhaseExplanationPanel({ phase }: { phase: MissionPhase }) {
  const content = PHASE_EXPLANATIONS[phase];

  return (
    <div className="bg-[#05070F] border border-[#1E293B] rounded-xl p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#06B6D4] mb-2">
            Phase context
          </div>
          <h3 className="font-space-grotesk text-lg font-bold text-[#F8FAFC] mb-3">
            {content.title}
          </h3>
          <p className="font-inter text-sm text-[#94A3B8] leading-relaxed mb-4">
            {content.description}
          </p>
          <div className="font-inter text-xs text-[#64748B] border-t border-[#1E293B] pt-3">
            Distance from center is a communication score, not clinical severity.
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
