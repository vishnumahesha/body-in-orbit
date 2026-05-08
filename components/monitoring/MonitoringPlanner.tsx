"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DomainId } from "@/data/types";

const missionProfiles = {
  "3day": {
    label: "3-Day Mission",
    subtitle: "Inspiration4 profile",
    priorities: [
      {
        domainId: "telomere" as DomainId,
        label: "Telomere Dynamics",
        color: "#A78BFA",
        priority: 1,
        rationale: "Only domain with clear in-flight trajectory. Elongation during flight, shortening post-landing.",
        keyMarkers: ["Telomere length (dried blood spots FD1-3)", "Clonal hematopoiesis screening"]
      },
      {
        domainId: "immune" as DomainId,
        label: "Immune Regulation",
        color: "#22D3EE",
        priority: 2,
        rationale: "18 markers shifted at R+1. MHC class I suppression persisted through R+194.",
        keyMarkers: ["Cytokine panel (18 markers)", "FOXP3+ regulatory T cells", "MHC class I genes"]
      },
      {
        domainId: "microbiome" as DomainId,
        label: "Microbiome",
        color: "#2DD4BF",
        priority: 3,
        rationale: "Skin and oral shifts during flight. Spatial transcriptomics shows tissue-level response.",
        keyMarkers: ["Skin/oral/nasal swabs", "Spatial transcriptomics (deltoid)"]
      },
      {
        domainId: "oxidative" as DomainId,
        label: "Oxidative Response",
        color: "#FBBF24",
        priority: 4,
        rationale: "Layered recovery: EVPs recovered faster than plasma markers.",
        keyMarkers: ["Plasma metabolomics", "EVP proteomics", "Inosine, taurine"]
      },
      {
        domainId: "energy" as DomainId,
        label: "Energy Metabolism",
        color: "#60A5FA",
        priority: 5,
        rationale: "OXPHOS pathway enrichment in immune cells. Cell-type specific signal.",
        keyMarkers: ["Single-cell RNA-seq", "OXPHOS pathway scores"]
      }
    ]
  },
  "30day": {
    label: "30-Day Mission",
    subtitle: "Extended LEO stay",
    priorities: [
      {
        domainId: "immune" as DomainId,
        label: "Immune Regulation",
        color: "#22D3EE",
        priority: 1,
        rationale: "Persistent MHC suppression suggests longer monitoring window needed.",
        keyMarkers: ["Weekly cytokine panels", "T cell subsets", "MHC expression"]
      },
      {
        domainId: "oxidative" as DomainId,
        label: "Oxidative Response",
        color: "#FBBF24",
        priority: 2,
        rationale: "Longer exposure increases oxidative load. Monitor recovery trajectory.",
        keyMarkers: ["Plasma oxidative markers", "EVP proteomics", "Antioxidant capacity"]
      },
      {
        domainId: "telomere" as DomainId,
        label: "Telomere Dynamics",
        color: "#A78BFA",
        priority: 3,
        rationale: "Extended flight may amplify bidirectional changes observed in 3-day mission.",
        keyMarkers: ["Weekly telomere length", "Clonal expansion screening"]
      },
      {
        domainId: "energy" as DomainId,
        label: "Energy Metabolism",
        color: "#60A5FA",
        priority: 4,
        rationale: "Sustained microgravity may stress cellular energy systems.",
        keyMarkers: ["Mitochondrial function markers", "OXPHOS pathway", "Lactate/pyruvate"]
      },
      {
        domainId: "microbiome" as DomainId,
        label: "Microbiome",
        color: "#2DD4BF",
        priority: 5,
        rationale: "Ecological shifts stabilize over time. Lower priority for 30-day window.",
        keyMarkers: ["Bi-weekly swabs", "Gut metagenomics"]
      }
    ]
  },
  "180day": {
    label: "180-Day Mission",
    subtitle: "ISS long-duration profile",
    priorities: [
      {
        domainId: "immune" as DomainId,
        label: "Immune Regulation",
        color: "#22D3EE",
        priority: 1,
        rationale: "Longest perturbation observed in Inspiration4 (R+194). Critical for extended missions.",
        keyMarkers: ["Monthly comprehensive immune panel", "Infection monitoring", "Vaccine response"]
      },
      {
        domainId: "energy" as DomainId,
        label: "Energy Metabolism",
        color: "#60A5FA",
        priority: 2,
        rationale: "Chronic metabolic adaptation becomes primary concern over months.",
        keyMarkers: ["Mitochondrial biogenesis", "Metabolic panel", "Muscle biopsy markers"]
      },
      {
        domainId: "telomere" as DomainId,
        label: "Telomere Dynamics",
        color: "#A78BFA",
        priority: 3,
        rationale: "Cumulative radiation exposure and replication stress over 6 months.",
        keyMarkers: ["Monthly telomere length", "DNA damage markers", "Senescence markers"]
      },
      {
        domainId: "oxidative" as DomainId,
        label: "Oxidative Response",
        color: "#FBBF24",
        priority: 4,
        rationale: "Chronic oxidative stress management critical for long-duration health.",
        keyMarkers: ["Antioxidant reserves", "Protein carbonylation", "Lipid peroxidation"]
      },
      {
        domainId: "microbiome" as DomainId,
        label: "Microbiome",
        color: "#2DD4BF",
        priority: 5,
        rationale: "Stable after initial adaptation. Monitor for dysbiosis signals.",
        keyMarkers: ["Monthly gut metagenomics", "Skin barrier function"]
      }
    ]
  }
};

export function MonitoringPlanner() {
  const [selectedProfile, setSelectedProfile] = useState<keyof typeof missionProfiles>("3day");
  const profile = missionProfiles[selectedProfile];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Mission Duration Selector */}
      <div className="flex gap-4 mb-12 justify-center">
        {Object.entries(missionProfiles).map(([key, value]) => (
          <motion.button
            key={key}
            onClick={() => setSelectedProfile(key as keyof typeof missionProfiles)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              px-6 py-4 rounded-xl border-2 transition-all
              ${selectedProfile === key
                ? "bg-[#06B6D4]/10 border-[#06B6D4] shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                : "bg-[#05070F] border-[#1E293B] hover:border-[#334155]"
              }
            `}
          >
            <div className="font-space-grotesk text-lg font-semibold text-[#F8FAFC] mb-1">
              {value.label}
            </div>
            <div className="font-mono text-xs text-[#64748B]">
              {value.subtitle}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Priority List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProfile}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 90,
            damping: 22,
            mass: 0.45,
          }}
          className="space-y-4"
        >
          {profile.priorities.map((item, index) => (
            <motion.div
              key={item.domainId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 90,
                damping: 22,
                mass: 0.45,
              }}
              className="bg-[#05070F] border-2 border-[#1E293B] rounded-xl p-6 hover:border-[#334155] transition-colors"
            >
              <div className="flex items-start gap-6">
                {/* Priority Number */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-space-grotesk text-xl font-bold"
                  style={{
                    backgroundColor: `${item.color}1A`,
                    color: item.color,
                    border: `2px solid ${item.color}`,
                  }}
                >
                  {item.priority}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-space-grotesk text-xl font-semibold text-[#F8FAFC]">
                      {item.label}
                    </h3>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>

                  <p className="font-inter text-sm text-[#94A3B8] leading-relaxed mb-4">
                    {item.rationale}
                  </p>

                  <div>
                    <div className="font-mono text-xs text-[#64748B] mb-2">
                      Key Markers
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.keyMarkers.map((marker, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg bg-[#0A0D14] border border-[#1E293B] font-mono text-xs text-[#94A3B8]"
                        >
                          {marker}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-4 rounded-xl bg-[#8B5CF6]/5 border border-[#8B5CF6]/30"
      >
        <p className="font-inter text-sm text-[#94A3B8] leading-relaxed">
          <span className="text-[#8B5CF6] font-semibold">Note:</span> Priority rankings are guidance based on Inspiration4 findings. Actual mission plans should be individualized based on crew baseline, mission objectives, and available assay capacity.
        </p>
      </motion.div>
    </div>
  );
}
