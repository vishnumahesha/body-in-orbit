"use client";

import { motion } from "framer-motion";

interface MissionStartProps {
  onBegin: () => void;
}

export function MissionStart({ onBegin }: MissionStartProps) {
  const handleBegin = () => {
    onBegin();
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="min-h-screen w-full relative overflow-hidden bg-transparent flex flex-col items-center justify-center text-center px-6 pointer-events-none">
      {/* Content stack */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#06B6D4]/70 mb-8"
        >
          INSPIRATION4 MOLECULAR DEBRIEF
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-space-grotesk font-bold leading-[0.9] tracking-tight text-[#F8FAFC] mb-4 text-[clamp(3.5rem,12vw,8rem)]"
        >
          Body in Orbit
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-space-grotesk text-lg sm:text-xl md:text-2xl text-[#94A3B8] font-light tracking-wide mb-12"
        >
          Mission Readiness Briefing
        </motion.div>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-inter text-base sm:text-lg text-[#94A3B8]/80 max-w-lg leading-relaxed mb-14"
        >
          Before we send humans farther from Earth, we need to understand what
          space changes inside the body.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleBegin}
          className="group relative inline-flex items-center gap-3 border border-[#06B6D4]/30 text-[#06B6D4] px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-mono text-xs sm:text-sm tracking-[0.15em] uppercase hover:bg-[#06B6D4]/5 hover:border-[#06B6D4]/60 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] transition-all duration-500 cursor-pointer pointer-events-auto"
        >
          <span>Begin Mission Briefing</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.button>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[10px] sm:text-[11px] text-[#64748B]/60 mt-8 tracking-wider"
        >
          Exploratory research interface · Not a clinical tool
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 2.0, duration: 0.5 },
          y: {
            delay: 2.5,
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#94A3B8]"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
