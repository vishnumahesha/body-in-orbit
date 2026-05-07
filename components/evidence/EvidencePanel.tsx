"use client";

import { motion } from "framer-motion";
import { BiologicalDomain, MissionPhase } from "@/data/types";
import { SourceChip } from "./SourceChip";
import { ClaimAudit } from "./ClaimAudit";
import { X } from "lucide-react";
import { perturbationScale } from "@/data/perturbationScale";
import { strokePattern } from "../baseline/geometry";

interface EvidencePanelProps {
  domain: BiologicalDomain;
  phase: MissionPhase;
  onClose: () => void;
}

export function EvidencePanel({
  domain,
  phase,
  onClose,
}: EvidencePanelProps) {
  const visualState = domain.visualStates[phase];
  const evidence = domain.evidence;
  const scoreInfo = perturbationScale[visualState.perturbationScore];

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.aside
        className="fixed right-0 top-0 bottom-0 w-full lg:w-[380px] bg-black border-l border-[#1E293B] z-50 overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 90, damping: 22, mass: 0.45 }}
      >
        <div
          className="sticky top-0 bg-black border-b border-[#1E293B] z-10"
          style={{ borderLeftColor: domain.color, borderLeftWidth: 4 }}
        >
          <div className="flex items-start justify-between p-6">
            <div>
              <h3
                className="text-2xl font-bold mb-1 font-space-grotesk"
                style={{ color: domain.color }}
              >
                {domain.label}
              </h3>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                {phase.replace(/_/g, " ")}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-base leading-relaxed text-gray-200 mb-4">
              {evidence.plainEnglish}
            </p>

            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs">
                <span className="text-gray-500">Score:</span>
                <span className="font-mono font-bold" style={{ color: domain.color }}>
                  {visualState.perturbationScore}
                </span>
                <span className="text-gray-400">{scoreInfo.label}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs">
                <span className="text-gray-500">Confidence:</span>
                <span className="font-mono text-gray-200">
                  {visualState.confidence.replace(/_/g, " ")}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs">
                <span className="text-gray-500">Recovery:</span>
                <span className="font-mono text-gray-200">
                  {domain.recoveryStatus.replace(/_/g, " ")}
                </span>
              </div>
            </div>
          </div>

          <details open className="group">
            <summary className="cursor-pointer text-xs uppercase tracking-wider text-cyan-400 mb-3 font-mono list-none flex items-center gap-2">
              <span className="inline-block w-0 h-0 border-l-4 border-l-cyan-400 border-y-4 border-y-transparent group-open:rotate-90 transition-transform" />
              Evidence Details
            </summary>

            <div className="space-y-4 pl-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Evidence status:
                </p>
                <div className="flex items-center gap-2">
                  <svg width="24" height="2">
                    <line
                      x1="0"
                      y1="1"
                      x2="24"
                      y2="1"
                      stroke={domain.color}
                      strokeWidth="2"
                      strokeDasharray={strokePattern(visualState.evidenceStatus)}
                    />
                  </svg>
                  <span className="text-sm font-mono text-gray-300">
                    {visualState.evidenceStatus.replace(/_/g, " ")}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Assays:
                </p>
                <div className="flex flex-wrap gap-1">
                  {evidence.assays.map((assay) => (
                    <span
                      key={assay}
                      className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300"
                    >
                      {assay}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Timepoints:
                </p>
                <div className="flex flex-wrap gap-1">
                  {evidence.timepointsMeasured.map((timepoint) => (
                    <span
                      key={timepoint}
                      className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300"
                    >
                      {timepoint}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Sample types:
                </p>
                <p className="text-sm font-mono text-gray-300">
                  {evidence.sampleTypes.join(", ")}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Sample size:
                </p>
                <p className="text-sm font-mono text-gray-300">n = {evidence.n}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Sources:
                </p>
                <div className="flex flex-wrap gap-2">
                  {evidence.sourceIds.map((sourceId) => (
                    <SourceChip key={sourceId} sourceId={sourceId} />
                  ))}
                </div>
              </div>
            </div>
          </details>

          <details className="group">
            <summary className="cursor-pointer text-xs uppercase tracking-wider text-cyan-400 mb-3 font-mono list-none flex items-center gap-2">
              <span className="inline-block w-0 h-0 border-l-4 border-l-cyan-400 border-y-4 border-y-transparent group-open:rotate-90 transition-transform" />
              Claim Safety
            </summary>

            <div className="space-y-4 pl-6">
              <ClaimAudit evidence={evidence} />

              <div>
                <p className="text-xs uppercase tracking-wide text-yellow-500 mb-2">
                  Caution:
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {evidence.caution}
                </p>
              </div>

              <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-lg">
                <p className="text-xs uppercase tracking-wide text-red-400 mb-1">
                  Not claiming:
                </p>
                <p className="text-sm font-semibold text-red-300">
                  {evidence.notClaiming.join(", ")}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Mission planning relevance:
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {evidence.missionPlanningRelevance}
                </p>
              </div>
            </div>
          </details>

          <details className="group">
            <summary className="cursor-pointer text-xs uppercase tracking-wider text-cyan-400 mb-3 font-mono list-none flex items-center gap-2">
              <span className="inline-block w-0 h-0 border-l-4 border-l-cyan-400 border-y-4 border-y-transparent group-open:rotate-90 transition-transform" />
              Score Rationale
            </summary>

            <div className="space-y-4 pl-6">
              <div className="p-3 bg-purple-950/20 border border-purple-900/30 rounded-lg">
                <p className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">
                  Warning
                </p>
                <p className="text-sm text-purple-200">
                  This is a communication score, not clinical severity
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Why this score:
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {evidence.whyScore}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Score inputs:
                </p>
                <div className="space-y-2 text-sm font-mono text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Marker breadth:</span>
                    <span>{evidence.scoreInputs.markerBreadth.replace(/_/g, " ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Assay breadth:</span>
                    <span>{evidence.scoreInputs.assayBreadth.replace(/_/g, " ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Temporal pattern:</span>
                    <span>{evidence.scoreInputs.temporalPattern.replace(/_/g, " ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Confidence:</span>
                    <span>{evidence.scoreInputs.confidence.replace(/_/g, " ")}</span>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
      </motion.aside>
    </>
  );
}
