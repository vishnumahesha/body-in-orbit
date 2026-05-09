"use client";

import { motion } from "framer-motion";
import { domains } from "@/data/domains";

const domainColors: Record<string, string> = {
  immune: "#22D3EE",
  oxidative: "#FBBF24",
  energy: "#60A5FA",
  telomere: "#A78BFA",
  microbiome: "#2DD4BF",
};

function getPriorityBadge(score: number) {
  if (score >= 3) {
    return {
      label: "Elevated",
      className: "bg-[#06B6D4]/10 text-[#06B6D4]",
    };
  }
  if (score >= 2) {
    return {
      label: "Moderate",
      className: "bg-[#FBBF24]/10 text-[#FBBF24]",
    };
  }
  return {
    label: "Low",
    className: "bg-[#94A3B8]/10 text-[#94A3B8]",
  };
}

export function MonitoringProfile() {
  const domainArray = Object.values(domains);

  return (
    <div className="space-y-12">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4"
        >
          Crew Monitoring Profile
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-inter text-lg text-[#94A3B8] mb-12"
        >
          Five biological domains. Each reported as a monitoring signal, not a clinical communication score.
        </motion.p>
      </div>

      <div className="space-y-4">
        {domainArray.map((domain, index) => {
          const priority = getPriorityBadge(domain.defaultScore);
          const borderColor = domainColors[domain.id];

          return (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#05070F] rounded-xl p-6 mb-4"
              style={{ borderLeft: `4px solid ${borderColor}` }}
            >
              <h3 className="font-space-grotesk text-lg font-semibold text-[#F8FAFC] mb-3">
                {domain.label}
              </h3>

              <div className="flex gap-2 mb-4 flex-wrap">
                <span
                  className={`font-mono text-xs rounded-full px-3 py-1 ${priority.className}`}
                >
                  {priority.label}
                </span>
                <span className="font-mono text-xs rounded-full px-3 py-1 bg-white/5 text-[#94A3B8]">
                  {domain.confidence}
                </span>
                <span className="font-mono text-xs rounded-full px-3 py-1 bg-white/5 text-[#94A3B8]">
                  {domain.recoveryStatus.replace(/_/g, " ")}
                </span>
              </div>

              <p className="font-inter text-sm text-[#94A3B8] mb-3 leading-relaxed">
                {domain.evidence.astronautSafeWording}
              </p>

              <p className="font-inter text-xs text-[#64748B] mb-2 italic">
                {domain.missionPlanningRelevance}
              </p>

              <p className="font-mono text-xs text-[#64748B]">
                Do not conclude: {domain.notClaiming.join(", ")}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
