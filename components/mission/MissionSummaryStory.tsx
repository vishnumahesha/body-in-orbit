"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { storySlides, type StorySlide, type Extras } from "./missionSummaryData";

const SLIDE_VH = 400;

export function MissionSummaryStory() {
  const [idx, setIdx] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const slideHeightPx = (window.innerHeight * SLIDE_VH) / 100;
      const i = Math.min(storySlides.length - 1, Math.max(0, Math.floor(window.scrollY / slideHeightPx)));
      setIdx(i);
      setShowHint(window.scrollY < 240);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLast = idx === storySlides.length - 1;

  return (
    <div className="bg-slate-950 text-white">
      <div className="fixed top-6 left-6 z-50 font-mono text-[10px] tracking-[0.3em] text-slate-300/80 px-3 py-2 rounded-md bg-slate-950/40 backdrop-blur-sm border border-slate-700/40">
        MISSION SUMMARY
      </div>

      {!isLast && (
        <Link
          href="/?skipIntro=1#crew-sandbox"
          className="fixed top-6 right-6 z-50 font-mono text-xs tracking-[0.15em] text-slate-300 hover:text-cyan-300 px-4 py-2 rounded-md bg-slate-950/40 backdrop-blur-sm border border-slate-700/40 hover:border-cyan-500/40 transition-colors"
        >
          SKIP TO RESULTS →
        </Link>
      )}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 font-mono text-xs tracking-[0.25em] text-slate-300/90 px-4 py-2 rounded-md bg-slate-950/40 backdrop-blur-sm border border-slate-700/40">
        {String(idx + 1).padStart(2, "0")} / {String(storySlides.length).padStart(2, "0")}
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        {isLast ? (
          <Link
            href="/?skipIntro=1#crew-sandbox"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-500/15 border border-cyan-500/50 text-cyan-200 font-mono text-xs tracking-[0.2em] uppercase hover:bg-cyan-500/25 transition-colors"
          >
            Open Crew Debriefs →
          </Link>
        ) : (
          <span
            className={`font-mono text-[10px] tracking-[0.25em] text-slate-400 transition-opacity duration-500 ${
              showHint ? "opacity-100" : "opacity-50"
            }`}
          >
            SCROLL TO CONTINUE ↓
          </span>
        )}
      </div>

      {storySlides.map((slide) => (
        <SlideStep key={slide.id} slide={slide} />
      ))}
    </div>
  );
}

function SlideStep({ slide }: { slide: StorySlide }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const opOut = reduce ? [1, 1] : [0, 1];
  const yOut = reduce ? [0, 0] : [16, 0];

  const ebOp = useTransform(scrollYProgress, [0.02, 0.08], opOut);
  const ebY  = useTransform(scrollYProgress, [0.02, 0.08], yOut);
  const hdOp = useTransform(scrollYProgress, [0.08, 0.18], opOut);
  const hdY  = useTransform(scrollYProgress, [0.08, 0.18], yOut);
  const b1Op = useTransform(scrollYProgress, [0.18, 0.30], opOut);
  const b1Y  = useTransform(scrollYProgress, [0.18, 0.30], yOut);
  const b2Op = useTransform(scrollYProgress, [0.30, 0.44], opOut);
  const b2Y  = useTransform(scrollYProgress, [0.30, 0.44], yOut);
  const b3Op = useTransform(scrollYProgress, [0.44, 0.58], opOut);
  const b3Y  = useTransform(scrollYProgress, [0.44, 0.58], yOut);
  const exOp = useTransform(scrollYProgress, [0.58, 0.74], opOut);
  const exY  = useTransform(scrollYProgress, [0.58, 0.74], yOut);

  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.0, 1.05]);
  const imgY     = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  const ovOp     = useTransform(scrollYProgress, [0, 0.10, 0.85, 1], reduce ? [0.7, 0.7, 0.7, 0.7] : [0.35, 0.85, 0.85, 0.45]);

  const isLeft = slide.textSide === "left";
  const sideGradient = isLeft
    ? "linear-gradient(90deg, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.75) 24%, rgba(2,6,23,0.30) 50%, rgba(2,6,23,0) 68%)"
    : "linear-gradient(270deg, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.75) 24%, rgba(2,6,23,0.30) 50%, rgba(2,6,23,0) 68%)";

  return (
    <section ref={ref} className="relative" style={{ height: `${SLIDE_VH}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.image} alt={slide.headline.join(" ")} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: ovOp, background: sideGradient }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(2,6,23,0) 0%, rgba(2,6,23,0.5) 100%)" }}
        />

        <div className="relative z-10 h-full flex items-center">
          <div
            className={`w-full max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8 items-center ${
              isLeft ? "" : "md:[direction:rtl]"
            }`}
          >
            <div className={`md:col-span-7 max-w-xl ${isLeft ? "" : "md:[direction:ltr]"}`}>
              <motion.div
                style={{ opacity: ebOp, y: ebY }}
                className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 mb-5"
              >
                SLIDE {slide.number} · {slide.eyebrow}
              </motion.div>
              <motion.h2
                style={{ opacity: hdOp, y: hdY, textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
                className="font-space-grotesk text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.05] tracking-tight"
              >
                {slide.headline[0]}
                <br />
                <span className="text-cyan-300">{slide.headline[1]}</span>
              </motion.h2>
              <div className="space-y-5">
                {([
                  [b1Op, b1Y, slide.beats[0]],
                  [b2Op, b2Y, slide.beats[1]],
                  [b3Op, b3Y, slide.beats[2]],
                ] as const).map(([op, y, text], i) => (
                  <motion.p
                    key={i}
                    style={{ opacity: op, y, textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
                    className="font-inter text-base md:text-lg text-slate-100 leading-relaxed"
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </div>
            <motion.div
              style={{ opacity: exOp, y: exY }}
              className={`md:col-span-5 ${isLeft ? "" : "md:[direction:ltr]"}`}
            >
              <ExtraPanel extras={slide.extras} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExtraPanel({ extras }: { extras: Extras }) {
  const wrap = "rounded-xl border border-cyan-500/20 bg-slate-950/60 backdrop-blur-md p-5 md:p-6 shadow-[0_0_40px_rgba(6,182,212,0.06)]";

  if (extras.kind === "data-strip") {
    return (
      <div className={wrap}>
        <div className="grid grid-cols-2 gap-4">
          {extras.items.map((it) => (
            <div key={it.label}>
              <div className="font-mono text-[9px] tracking-[0.25em] text-cyan-400/70 mb-1">{it.label}</div>
              <div className="font-space-grotesk text-base md:text-lg text-white">{it.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (extras.kind === "timeline") {
    return (
      <div className={wrap}>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {extras.phases.map((p) => (
            <span key={p} className="font-mono text-[10px] tracking-wider text-cyan-300 px-2.5 py-1 rounded border border-cyan-500/30 bg-cyan-500/5">
              {p}
            </span>
          ))}
        </div>
        <div className="font-mono text-[11px] tracking-wider text-slate-200 mb-2">{extras.groupNote}</div>
        <p className="font-inter text-xs text-slate-400 leading-relaxed">{extras.tooltip}</p>
      </div>
    );
  }

  if (extras.kind === "crew-chips") {
    return (
      <div className={wrap}>
        <div className="space-y-2 mb-4">
          {extras.members.map((m) => (
            <div key={m.id} title={m.tooltip} className="flex items-center gap-3 px-3 py-2 rounded-md border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-colors cursor-help">
              <span className="font-mono text-xs text-cyan-300">{m.id}</span>
              <span className="font-mono text-[10px] tracking-wider text-slate-300 uppercase">· {m.role}</span>
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] tracking-wider text-slate-500">{extras.warning}</p>
      </div>
    );
  }

  if (extras.kind === "domain-cards") {
    return (
      <div className={`${wrap} max-h-[60vh] overflow-y-auto`}>
        <div className="space-y-3">
          {extras.cards.map((c) => (
            <details key={c.title} className="group rounded-md border border-cyan-500/20 bg-slate-900/40 px-3 py-2 open:bg-slate-900/70">
              <summary className="font-mono text-[11px] tracking-wider text-cyan-300 cursor-pointer list-none flex justify-between items-center">
                {c.title}
                <span className="text-slate-500 group-open:rotate-90 transition-transform">›</span>
              </summary>
              <div className="mt-2 space-y-1.5 font-inter text-xs text-slate-300 leading-relaxed">
                <p><span className="text-cyan-400/70 font-mono text-[10px] tracking-wider mr-1">MEASURES:</span>{c.measures}</p>
                <p><span className="text-cyan-400/70 font-mono text-[10px] tracking-wider mr-1">MATTERS:</span>{c.matters}</p>
                <p><span className="text-amber-400/70 font-mono text-[10px] tracking-wider mr-1">CANNOT PROVE:</span>{c.cannot}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    );
  }

  if (extras.kind === "pipeline") {
    return (
      <div className={wrap}>
        <div className="space-y-1.5 mb-4">
          {extras.steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-slate-600 w-6">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-mono text-[10px] tracking-wider text-cyan-300 px-2.5 py-1 rounded bg-cyan-500/5 border border-cyan-500/20 flex-1">{s}</span>
            </div>
          ))}
        </div>
        <div className="rounded-md border border-slate-700/40 bg-slate-900/50 p-3 mb-2">
          <div className="font-mono text-[9px] tracking-wider text-slate-500 mb-1">BEFORE</div>
          <p className="font-mono text-[11px] text-slate-400 leading-relaxed">{extras.before}</p>
        </div>
        <div className="rounded-md border border-cyan-500/30 bg-cyan-500/5 p-3 mb-3">
          <div className="font-mono text-[9px] tracking-wider text-cyan-400 mb-1">AFTER</div>
          <p className="font-inter text-xs text-slate-100 leading-relaxed">{extras.after}</p>
        </div>
        <p className="font-mono text-[10px] tracking-wider text-slate-500">{extras.caption}</p>
      </div>
    );
  }

  if (extras.kind === "claim-card") {
    return (
      <div className={wrap}>
        <div className="space-y-1.5 mb-4">
          {extras.zones.map((z) => (
            <div key={z.label} className="flex items-start gap-2">
              <span className="font-mono text-[9px] tracking-wider text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 flex-shrink-0 mt-0.5">
                {z.label}
              </span>
              <span className="font-inter text-xs text-slate-300 leading-relaxed">{z.desc}</span>
            </div>
          ))}
        </div>
        <div className="rounded-md border border-cyan-500/30 bg-cyan-500/5 p-3 space-y-2">
          <div>
            <div className="font-mono text-[9px] tracking-wider text-slate-500 mb-1">CLAIM</div>
            <p className="font-inter text-xs text-slate-100">{extras.claim}</p>
          </div>
          <div>
            <div className="font-mono text-[9px] tracking-wider text-slate-500 mb-1">VERDICT</div>
            <p className="font-mono text-[11px] text-cyan-300">{extras.verdict}</p>
          </div>
          <div>
            <div className="font-mono text-[9px] tracking-wider text-slate-500 mb-1">SAFER WORDING</div>
            <p className="font-inter text-xs text-slate-100">{extras.safer}</p>
          </div>
          <div>
            <div className="font-mono text-[9px] tracking-wider text-amber-400/70 mb-1">DO NOT CONCLUDE</div>
            <p className="font-inter text-xs text-slate-300">{extras.cannot}</p>
          </div>
        </div>
      </div>
    );
  }

  if (extras.kind === "question-stack") {
    return (
      <div className={wrap}>
        <div className="space-y-2 mb-5">
          {extras.questions.map((q, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="font-mono text-[9px] text-cyan-400/70 mt-1">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-inter text-sm text-slate-100 leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
        <Link
          href="/?skipIntro=1#crew-sandbox"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan-500/15 border border-cyan-500/50 text-cyan-200 font-mono text-xs tracking-[0.2em] uppercase hover:bg-cyan-500/25 transition-colors w-full"
        >
          {extras.cta} →
        </Link>
        <p className="font-mono text-[9px] tracking-wider text-slate-500 mt-3 leading-relaxed">{extras.boundary}</p>
      </div>
    );
  }

  return null;
}
