"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const recoveryData = [
  {
    label: "EVP proteins",
    percentage: 93,
    text: "93% returned",
    color: "#06B6D4",
  },
  {
    label: "Metabolites",
    percentage: 93,
    text: "93% returned",
    color: "#06B6D4",
  },
  {
    label: "Plasma proteins",
    percentage: 27,
    text: "73% still perturbed",
    color: "#FBBF24",
    inverted: true,
  },
];

export function RecoverySplit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="space-y-12">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-space-grotesk text-3xl md:text-5xl font-bold text-[#F8FAFC] mb-4"
        >
          The body did not recover as one object.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-inter text-xl text-[#94A3B8] mb-16"
        >
          Landing is one moment. Biological recovery is layered.
        </motion.p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {recoveryData.map((item, index) => (
          <div key={item.label}>
            <div className="flex justify-between mb-2">
              <span className="font-inter text-sm text-[#F8FAFC]">
                {item.label}
              </span>
              <span
                className="font-mono text-sm"
                style={{ color: item.color }}
              >
                {item.text}
              </span>
            </div>

            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={isInView ? { width: `${item.percentage}%` } : { width: "0%" }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full rounded-full"
                style={{
                  backgroundColor: item.inverted
                    ? `${item.color}B3`
                    : item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="font-inter text-sm text-[#64748B] mt-8 italic"
      >
        Recovery depends on molecular layer, not just time after landing.
      </motion.p>
    </div>
  );
}
