"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClaimTest {
  id: string;
  claim: string;
  verdict: "supported" | "monitoring_signal" | "overclaim";
  saferWording: string;
  evidence: string;
  why: string;
}

const claimTests: ClaimTest[] = [
  {
    id: "telomere_rejuvenation",
    claim: "Telomeres lengthened in orbit, suggesting rejuvenation or anti-aging effects.",
    verdict: "overclaim",
    saferWording: "All 4 crew members showed telomere elongation during flight (P<0.001), followed by shortening in 3 of 4 after landing.",
    evidence: "OSD-569: Whole blood telomere length measured from dried blood spots",
    why: "The word 'rejuvenation' implies health benefit. Bidirectional change is a biological signal, not proof of aging reversal."
  },
  {
    id: "immune_dysregulation",
    claim: "Immune dysregulation persisted through 6 months post-flight.",
    verdict: "overclaim",
    saferWording: "18 immune markers shifted at R+1. MHC class I genes remained suppressed through R+194.",
    evidence: "OSD-575: Cytokine arrays, OSD-569: RNA-seq",
    why: "'Dysregulation' implies dysfunction. These are molecular shifts that need monitoring, not confirmed immune failure."
  },
  {
    id: "cytokine_shifts",
    claim: "18 cytokines and growth factors showed significant changes at R+1 (q<0.05).",
    verdict: "supported",
    saferWording: "18 cytokines, chemokines, and growth factors showed significant changes at R+1 (q<0.05).",
    evidence: "OSD-575: Immune cytokine array (Eve platform)",
    why: "States the finding directly without clinical interpretation. Sample size and statistical threshold are explicit."
  },
  {
    id: "oxidative_damage",
    claim: "Oxidative stress caused cellular damage that persisted for months.",
    verdict: "overclaim",
    saferWording: "Oxidative stress markers shifted in plasma and EVPs. 93% of EVP markers returned toward baseline by R+82.",
    evidence: "OSD-571: Plasma metabolomics, EVP proteomics",
    why: "'Damage' and 'caused' imply injury and causation. We observed marker shifts and partial recovery — not confirmed cellular injury."
  },
  {
    id: "microbiome_infection",
    claim: "Skin and oral microbiota shifted during and after flight.",
    verdict: "supported",
    saferWording: "Skin and oral microbiota shifted consistently during and after flight (FD2, FD3, R+1).",
    evidence: "OSD-572: Crew microbial swabs (skin, oral, nasal)",
    why: "Describes the ecological shift without claiming infection or harm. 'Shifted' is neutral and accurate."
  }
];

export function ClaimCourt() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [showVerdict, setShowVerdict] = useState(false);

  const currentClaim = claimTests[currentIndex];
  const isCorrect = userAnswer === currentClaim.verdict;

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    setShowVerdict(true);
    setTimeout(() => {
      setIsFlipped(true);
    }, 400);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setShowVerdict(false);
    setUserAnswer(null);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % claimTests.length);
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        <div className="font-mono text-sm text-[#64748B]">
          Claim {currentIndex + 1} of {claimTests.length}
        </div>
        <div className="flex gap-2">
          {claimTests.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentIndex ? "bg-[#06B6D4]" : "bg-[#1E293B]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card Container */}
      <div className="perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 90,
              damping: 22,
              mass: 0.45,
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative min-h-[400px]"
          >
            {/* Front */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="bg-[#05070F] border-2 border-[#1E293B] rounded-2xl p-8">
                <div className="font-mono text-xs uppercase tracking-wider text-[#8B5CF6] mb-4">
                  Astronaut-Facing Claim
                </div>
                <p className="font-inter text-xl text-[#F8FAFC] leading-relaxed mb-8">
                  &quot;{currentClaim.claim}&quot;
                </p>

                <div className="space-y-3">
                  <div className="font-mono text-sm text-[#64748B] mb-4">
                    How should this be classified?
                  </div>
                  {[
                    { id: "supported", label: "Supported", color: "#22D3EE" },
                    { id: "monitoring_signal", label: "Monitoring Signal", color: "#FBBF24" },
                    { id: "overclaim", label: "Overclaim", color: "#F87171" },
                  ].map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      disabled={showVerdict}
                      whileHover={{ scale: showVerdict ? 1 : 1.02 }}
                      whileTap={{ scale: showVerdict ? 1 : 0.98 }}
                      className={`
                        w-full p-4 rounded-xl border-2 text-left transition-all
                        ${userAnswer === option.id
                          ? `border-[${option.color}] bg-[${option.color}]/10`
                          : "border-[#1E293B] bg-[#0A0D14] hover:border-[#334155]"
                        }
                        ${showVerdict ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                      `}
                      style={userAnswer === option.id ? {
                        borderColor: option.color,
                        backgroundColor: `${option.color}1A`
                      } : {}}
                    >
                      <span className="font-space-grotesk font-semibold text-[#F8FAFC]">
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {showVerdict && !isFlipped && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-xl bg-[#06B6D4]/5 border border-[#06B6D4]/30"
                  >
                    <div className="font-mono text-sm text-[#06B6D4]">
                      {isCorrect ? "✓ Correct" : "✗ Not quite"} — Flipping to verdict...
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="bg-[#05070F] border-2 border-[#06B6D4] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        currentClaim.verdict === "supported"
                          ? "#22D3EE"
                          : currentClaim.verdict === "monitoring_signal"
                          ? "#FBBF24"
                          : "#F87171",
                    }}
                  />
                  <div className="font-mono text-xs uppercase tracking-wider text-[#06B6D4]">
                    {currentClaim.verdict.replace(/_/g, " ")}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="font-mono text-xs text-[#64748B] mb-2">
                      Safer Wording
                    </div>
                    <p className="font-inter text-base text-[#F8FAFC] leading-relaxed">
                      {currentClaim.saferWording}
                    </p>
                  </div>

                  <div>
                    <div className="font-mono text-xs text-[#64748B] mb-2">
                      Evidence
                    </div>
                    <p className="font-mono text-sm text-[#94A3B8]">
                      {currentClaim.evidence}
                    </p>
                  </div>

                  <div>
                    <div className="font-mono text-xs text-[#64748B] mb-2">
                      Why This Verdict?
                    </div>
                    <p className="font-inter text-sm text-[#94A3B8] leading-relaxed">
                      {currentClaim.why}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="mt-6 w-full py-3 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] font-mono text-sm hover:bg-[#06B6D4]/20 transition-colors"
                >
                  Next Claim →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
