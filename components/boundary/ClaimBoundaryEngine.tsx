"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type ClaimZone = "supported" | "monitoring" | "overclaim";

interface ClaimCard {
  id: number;
  text: string;
  correctZone: ClaimZone;
  why: string;
  saferWording: string;
  source: string;
  doNotConclude: string;
}

const claims: ClaimCard[] = [
  {
    id: 1,
    text: "Immune-related signals shifted after flight.",
    correctZone: "supported",
    why: "Published Inspiration4 immune analyses reported cytokine, chemokine, and immune-cell signal changes after flight.",
    saferWording: "Immune regulation showed a monitoring-relevant shift after flight.",
    source: "Kim et al. 2024",
    doNotConclude: "infection, immune dysfunction, illness",
  },
  {
    id: 2,
    text: "This astronaut has immune dysfunction.",
    correctZone: "overclaim",
    why: "The data support immune-related molecular shifts, not a clinical conclusion about dysfunction.",
    saferWording: "Some immune signals shifted relative to baseline and may merit monitoring.",
    source: "Kim et al. 2024",
    doNotConclude: "diagnosis, disease, immune failure",
  },
  {
    id: 3,
    text: "Telomere length changed during and after flight.",
    correctZone: "supported",
    why: "Published Inspiration4 genome analyses reported telomere elongation during flight and shortening after return.",
    saferWording: "Telomere dynamics shifted across mission phases.",
    source: "Garcia-Medina et al. 2024",
    doNotConclude: "rejuvenation, improved aging, clinical benefit",
  },
  {
    id: 4,
    text: "Spaceflight made this astronaut biologically younger.",
    correctZone: "overclaim",
    why: "Telomere elongation is not evidence of whole-body rejuvenation.",
    saferWording: "Telomere length changed during flight and should be interpreted cautiously.",
    source: "Garcia-Medina et al. 2024",
    doNotConclude: "rejuvenation, anti-aging effect",
  },
  {
    id: 5,
    text: "Some molecular layers recovered faster than others.",
    correctZone: "supported",
    why: "Secretome analyses reported different recovery behavior across plasma proteins, EVPs, and metabolites.",
    saferWording: "Recovery appeared layer-specific rather than uniform.",
    source: "Houerbi et al. 2024",
    doNotConclude: "full recovery, permanent harm",
  },
  {
    id: 6,
    text: "This astronaut should receive treatment.",
    correctZone: "overclaim",
    why: "Exploratory omics data do not support treatment recommendations.",
    saferWording: "Some domains may warrant follow-up monitoring in mission context.",
    source: "Project claim-safety rule",
    doNotConclude: "treatment need, medical diagnosis",
  },
  {
    id: 7,
    text: "Microbiome composition shifted during flight.",
    correctZone: "supported",
    why: "Published host-microbiome analyses reported skin and oral microbiome changes across the mission.",
    saferWording: "Microbiome composition showed mission-associated shifts.",
    source: "Tierney et al. 2024",
    doNotConclude: "infection, harmful exposure",
  },
  {
    id: 8,
    text: "The astronaut was infected in orbit.",
    correctZone: "overclaim",
    why: "Microbiome and immune shifts do not prove infection.",
    saferWording: "Microbial and immune signals changed and should be interpreted with clinical context.",
    source: "Tierney et al. 2024 / Kim et al. 2024",
    doNotConclude: "infection, illness",
  },
];

export function ClaimBoundaryEngine() {
  const [classifications, setClassifications] = useState<Record<number, ClaimZone>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const handleClassify = (claimId: number, zone: ClaimZone) => {
    setClassifications((prev) => ({ ...prev, [claimId]: zone }));
    setRevealed((prev) => ({ ...prev, [claimId]: true }));
  };

  const correctCount = Object.entries(classifications).filter(
    ([id, zone]) => claims.find((c) => c.id === Number(id))?.correctZone === zone
  ).length;

  const allRevealed = claims.every((c) => revealed[c.id]);

  return (
    <div className="space-y-12">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-2"
        >
          The hardest part is not seeing the signal.
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#06B6D4] mb-4"
        >
          It is knowing what the signal does not prove.
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-lg text-[#94A3B8] max-w-2xl mb-4"
        >
          A molecular shift can become a useful monitoring signal or an unsafe clinical overclaim
          depending on how it is communicated. Classify each claim below.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-sm text-[#94A3B8]"
        >
          Claims safely classified: {correctCount} / 8
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {claims.map((claim) => {
          const isRevealed = revealed[claim.id];
          const userClassification = classifications[claim.id];
          const isCorrect = userClassification === claim.correctZone;

          return (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#05070F] border border-[#1E293B] rounded-xl p-5"
            >
              <p className="font-inter text-[#F8FAFC] text-sm leading-relaxed mb-4">
                &ldquo;{claim.text}&rdquo;
              </p>

              {!isRevealed ? (
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleClassify(claim.id, "supported")}
                    className="border border-[#06B6D4]/30 text-[#06B6D4] text-xs font-mono px-3 py-1.5 rounded-lg hover:bg-[#06B6D4]/10 transition-colors"
                  >
                    Supported
                  </button>
                  <button
                    onClick={() => handleClassify(claim.id, "monitoring")}
                    className="border border-[#FBBF24]/30 text-[#FBBF24] text-xs font-mono px-3 py-1.5 rounded-lg hover:bg-[#FBBF24]/10 transition-colors"
                  >
                    Monitoring only
                  </button>
                  <button
                    onClick={() => handleClassify(claim.id, "overclaim")}
                    className="border border-[#F87171]/30 text-[#F87171] text-xs font-mono px-3 py-1.5 rounded-lg hover:bg-[#F87171]/10 transition-colors"
                  >
                    Overclaim
                  </button>
                </div>
              ) : (
                <div>
                  <div
                    className={`font-mono text-xs mb-3 ${
                      isCorrect ? "text-[#34D399]" : "text-[#F87171]"
                    }`}
                  >
                    {isCorrect
                      ? "✓ Correct"
                      : `✗ This is actually: ${claim.correctZone}`}
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 mt-2 space-y-2">
                    <div>
                      <span className="font-mono text-xs text-[#64748B]">Why: </span>
                      <span className="font-inter text-xs text-[#94A3B8]">{claim.why}</span>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[#64748B]">Safer wording: </span>
                      <span className="text-xs text-[#06B6D4]">{claim.saferWording}</span>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[#64748B]">Source: </span>
                      <span className="text-xs text-[#94A3B8]">{claim.source}</span>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[#64748B]">Do not conclude: </span>
                      <span className="text-xs text-[#F87171]/80">{claim.doNotConclude}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {allRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#05070F] border border-[#1E293B] rounded-xl p-6 mt-8"
        >
          <p className="font-inter text-sm text-[#94A3B8] italic">
            Understanding the boundary between evidence and overclaim is the foundation of
            responsible astronaut health communication.
          </p>
        </motion.div>
      )}
    </div>
  );
}
