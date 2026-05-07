"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { StorySection as StorySectionType } from "@/data/types";

interface StorySectionProps {
  section: StorySectionType;
  isActive: boolean;
}

export const StorySection = forwardRef<HTMLElement, StorySectionProps>(
  function StorySection({ section, isActive }, ref) {
    const isHero = section.id === "hero";

    if (isHero) {
      return (
        <section
          ref={ref}
          data-section-id={section.id}
          className="h-screen flex flex-col items-center justify-center px-8 bg-black relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial from-cyan-950/10 via-transparent to-transparent opacity-40" />

          <motion.div
            className="text-center z-10 max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 22, mass: 0.45 }}
          >
            <motion.p
              className="text-cyan-400 font-mono mb-6"
              style={{
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ type: "spring", stiffness: 90, damping: 22, mass: 0.45, delay: 0.3 }}
            >
              {section.eyebrow}
            </motion.p>

            <motion.h1
              className="font-bold leading-none text-white mb-8"
              style={{
                fontSize: "clamp(4rem, 12vw, 9rem)",
                fontFamily: "var(--font-space-grotesk)",
                textShadow: "0 0 80px rgba(6, 182, 212, 0.3)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 90, damping: 22, mass: 0.45, delay: 0.5 }}
            >
              {section.headline}
            </motion.h1>

            <motion.p
              className="text-gray-400 max-w-2xl mx-auto"
              style={{
                fontSize: "1.25rem",
                lineHeight: "1.8",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ type: "spring", stiffness: 90, damping: 22, mass: 0.45, delay: 0.8 }}
            >
              {section.body}
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ type: "spring", stiffness: 90, damping: 22, mass: 0.45, delay: 1.5 }}
          >
            <div className="flex flex-col items-center gap-2 text-gray-600 text-xs uppercase tracking-widest">
              <span>Scroll</span>
              <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
                <motion.path
                  d="M10 5 L10 20 M10 20 L5 15 M10 20 L15 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  animate={{ y: [0, 5] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </div>
          </motion.div>
        </section>
      );
    }

    return (
      <section
        ref={ref}
        data-section-id={section.id}
        style={{ minHeight: `${section.scrollVh}vh` }}
        className="flex items-center justify-center px-8 py-16 bg-black relative"
      >
        <motion.div
          className="max-w-xl w-full z-10"
          initial={{ opacity: 0.3, y: 20 }}
          animate={{
            opacity: isActive ? 1 : 0.3,
            y: isActive ? 0 : 20
          }}
          transition={{ type: "spring", stiffness: 90, damping: 22, mass: 0.45 }}
        >
          {section.eyebrow && (
            <p
              className="text-cyan-400 font-mono mb-4"
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              {section.eyebrow}
            </p>
          )}

          <h2
            className="font-bold mb-6 leading-tight text-white"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            {section.headline}
          </h2>

          <div
            className="text-gray-300 leading-relaxed mb-6 max-w-prose"
            style={{
              fontSize: "1.125rem",
              lineHeight: "1.75",
            }}
          >
            {section.body}
          </div>

          {section.callout && (
            <div
              className="pl-4 italic text-gray-400 mt-6 relative"
              style={{
                borderLeft: "2px solid rgba(6, 182, 212, 0.5)",
                fontSize: "0.875rem",
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-transparent opacity-50" />
              {section.callout}
            </div>
          )}
        </motion.div>
      </section>
    );
  }
);
