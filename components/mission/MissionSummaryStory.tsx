"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { storySlides } from "./missionSummaryData";

export function MissionSummaryStory() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollHint(window.scrollY < window.innerHeight * 0.3);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = slideRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setCurrentSlide(i); },
        { threshold: 0.5 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const y0 = reducedMotion ? 0 : 24;
  const dur = reducedMotion ? 0.2 : 0.6;

  return (
    <div className="relative bg-black min-h-screen">
      <Link
        href="/?skipIntro=1#crew-sandbox"
        className="fixed top-4 right-4 z-50 font-mono text-[11px] tracking-[0.18em] uppercase text-slate-400 border border-slate-700 hover:border-cyan-500/40 hover:text-cyan-400 bg-slate-950/60 backdrop-blur-sm px-3 py-2 rounded-lg transition-colors"
      >
        Skip →
      </Link>

      <div className="fixed top-4 left-4 z-50 font-mono text-[11px] tracking-[0.18em] text-slate-500 pointer-events-none">
        {currentSlide + 1} / {storySlides.length}
      </div>

      {showScrollHint && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-slate-500 animate-bounce pointer-events-none">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      )}

      {storySlides.map((slide, i) => {
        const isLast = i === storySlides.length - 1;
        return (
          <section
            key={slide.id}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="relative min-h-screen flex items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.image} alt={slide.headline} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/70 to-slate-950/85" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,.55) 75%)" }}
            />
            <motion.div
              initial={{ opacity: 0, y: y0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-25%" }}
              transition={{ duration: dur, ease: "easeOut" }}
              className="relative z-10 max-w-xl mx-6 md:ml-20 bg-slate-950/70 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 md:p-8 shadow-[0_0_40px_rgba(6,182,212,0.08)]"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-red-500/60 rounded-t-2xl" />
              <div className="font-mono text-[10px] tracking-[0.2em] text-cyan-400/70 mb-3">{slide.eyebrow}</div>
              <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4 leading-tight">{slide.headline}</h2>
              <p className="font-inter text-base text-slate-300 leading-relaxed mb-4">{slide.body}</p>
              <p className="font-mono text-[11px] tracking-wider text-slate-500 uppercase border-t border-slate-800 pt-3 mt-4">{slide.caption}</p>
              {isLast && (
                <div className="flex flex-col gap-3 mt-6">
                  <Link
                    href="/?skipIntro=1#crew-sandbox"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-mono text-sm tracking-wider hover:bg-cyan-500/20 transition-colors"
                  >
                    ENTER MOLECULAR DEBRIEF →
                  </Link>
                  <Link
                    href="/?skipIntro=1#crew-sandbox"
                    className="inline-flex items-center justify-center font-mono text-xs text-slate-500 hover:text-slate-300 underline underline-offset-4 transition-colors"
                  >
                    Skip briefing
                  </Link>
                </div>
              )}
            </motion.div>
          </section>
        );
      })}
    </div>
  );
}
