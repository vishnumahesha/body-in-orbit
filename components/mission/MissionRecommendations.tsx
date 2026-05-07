"use client";

import { motion } from "framer-motion";

interface RecommendationRow {
  domain: string;
  domainColor: string;
  observedSignal: string;
  priority: "Elevated" | "Moderate" | "Low";
  followUp: string;
  doNotInfer: string;
}

const recommendations: RecommendationRow[] = [
  {
    domain: "Immune regulation",
    domainColor: "#22D3EE",
    observedSignal: "Postflight immune-related molecular shift",
    priority: "Elevated",
    followUp: "Cytokine patterns, immune-cell markers, symptoms, recovery timing",
    doNotInfer: "Infection or immune dysfunction",
  },
  {
    domain: "Oxidative response",
    domainColor: "#FBBF24",
    observedSignal: "Stress-response and antioxidant-associated shifts",
    priority: "Moderate",
    followUp: "Oxidative stress markers, recovery trajectory",
    doNotInfer: "Tissue injury or cellular damage",
  },
  {
    domain: "Energy metabolism",
    domainColor: "#60A5FA",
    observedSignal: "Energy-pathway shift in immune cells",
    priority: "Moderate",
    followUp: "Pathway-level energy metabolism signals",
    doNotInfer: "Mitochondrial disease or failure",
  },
  {
    domain: "Telomere dynamics",
    domainColor: "#A78BFA",
    observedSignal: "Telomere length shifted across mission phases",
    priority: "Moderate",
    followUp: "Genome-stress indicators, recovery trajectory",
    doNotInfer: "Rejuvenation or genome damage",
  },
  {
    domain: "Microbiome",
    domainColor: "#2DD4BF",
    observedSignal: "Skin and oral microbiome shifts",
    priority: "Low",
    followUp: "Host-microbe patterns, immune context",
    doNotInfer: "Infection or harmful exposure",
  },
];

function getPriorityBadge(priority: string) {
  if (priority === "Elevated") {
    return "bg-[#06B6D4]/10 text-[#06B6D4]";
  }
  if (priority === "Moderate") {
    return "bg-[#FBBF24]/10 text-[#FBBF24]";
  }
  return "bg-[#94A3B8]/10 text-[#94A3B8]";
}

export function MissionRecommendations() {
  return (
    <div className="space-y-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-12"
      >
        What should mission control monitor next?
      </motion.h2>

      <div className="bg-[#05070F] border border-[#1E293B] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-white/5">
              <tr>
                <th className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] px-4 py-3 text-left">
                  Domain
                </th>
                <th className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] px-4 py-3 text-left">
                  Observed Signal
                </th>
                <th className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] px-4 py-3 text-left">
                  Priority
                </th>
                <th className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] px-4 py-3 text-left">
                  Follow-up
                </th>
                <th className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] px-4 py-3 text-left">
                  Do Not Infer
                </th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((row, index) => (
                <motion.tr
                  key={row.domain}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border-t border-[#1E293B]"
                >
                  <td className="px-4 py-4">
                    <span
                      className="font-inter text-sm font-semibold"
                      style={{ color: row.domainColor }}
                    >
                      {row.domain}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-inter text-xs text-[#94A3B8]">
                    {row.observedSignal}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`font-mono text-xs rounded-full px-3 py-1 inline-block ${getPriorityBadge(
                        row.priority
                      )}`}
                    >
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-inter text-xs text-[#94A3B8]">
                    {row.followUp}
                  </td>
                  <td className="px-4 py-4 font-inter text-xs text-[#94A3B8]">
                    {row.doNotInfer}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#06B6D4]/5 border border-[#06B6D4]/20 rounded-xl p-5 mt-8"
      >
        <div className="font-mono text-xs text-[#06B6D4] uppercase tracking-wider mb-2">
          Flight Surgeon View
        </div>
        <p className="font-inter text-sm text-[#94A3B8]">
          Use this report to prioritize monitoring questions, not to make clinical decisions.
          Omics signals should be interpreted alongside symptoms, clinical labs, and mission context.
        </p>
      </motion.div>
    </div>
  );
}
