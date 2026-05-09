"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCrew } from "@/lib/crewContext";
import { personalDebriefs, crewRoles, type CrewId } from "./personalDebriefData";

const QUESTIONS: { key: keyof typeof personalDebriefs.C001; label: string }[] = [
  { key: "readiness",  label: "What does my biology say about future mission planning?" },
  { key: "risks",      label: "What health signals might need attention during a mission?" },
  { key: "monitoring", label: "Which biological signals should be monitored in orbit?" },
  { key: "comparison", label: "How does my profile compare with the other crew members?" },
];

export function PersonalDebrief() {
  const { crewId } = useCrew();
  const id = crewId as CrewId;
  const debrief = personalDebriefs[id];
  const role = crewRoles[id];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="font-mono text-[10px] tracking-[0.2em] text-cyan-400/70 mb-2">
        CREW · {role} · {id}
      </div>
      <h3 className="font-space-grotesk text-2xl font-bold text-[#F8FAFC] mb-8">
        Crew Member {id}
      </h3>

      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {QUESTIONS.map(({ key, label }) => (
            <div key={key} className="border-l-2 border-cyan-400/30 pl-5 py-1">
              <div className="font-mono text-xs tracking-wider text-cyan-400/80 mb-2">
                {label}
              </div>
              <p className="font-inter text-base text-slate-300 leading-relaxed">
                {debrief[key]}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="font-mono text-[10px] tracking-wider text-slate-600 mt-10 pt-6 border-t border-slate-800">
        ALL SCORES ARE BASELINE-RELATIVE (COMPARED TO YOUR OWN PRE-FLIGHT
        NUMBERS). THIS IS A COMMUNICATION AID, NOT A CLINICAL ASSESSMENT. n=4
        (DATA FROM 4 CREW MEMBERS).
      </p>
    </div>
  );
}
