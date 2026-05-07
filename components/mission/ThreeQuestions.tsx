"use client";

import { motion } from "framer-motion";

const questions = [
  {
    number: "01",
    question: "What biological signals emerge in space?",
    subtext: "Which molecular systems shift after launch and return?",
  },
  {
    number: "02",
    question: "What looks resilient, and what needs monitoring?",
    subtext: "Which signals recover, persist, or remain uncertain?",
  },
  {
    number: "03",
    question: "How do we explain this without false precision?",
    subtext: "Astronauts need clarity, not fake certainty.",
  },
];

export function ThreeQuestions() {
  return (
    <div className="space-y-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-12 text-center"
      >
        Before launch, mission control needs three answers.
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {questions.map((q, index) => (
          <motion.div
            key={q.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="bg-[#05070F] border border-[#1E293B] rounded-2xl p-8 hover:border-[#06B6D4]/40 transition-colors"
          >
            <div className="font-mono text-5xl font-bold text-[#06B6D4]/20 mb-4">
              {q.number}
            </div>
            <h3 className="font-space-grotesk text-xl font-semibold text-[#F8FAFC] mb-3">
              {q.question}
            </h3>
            <p className="font-inter text-sm text-[#94A3B8] leading-relaxed">
              {q.subtext}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
