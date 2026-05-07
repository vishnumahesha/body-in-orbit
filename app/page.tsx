"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MissionStart } from "@/components/mission/MissionStart";

const InterstellarScene = dynamic(
  () => import("@/components/3d/InterstellarScene").then((mod) => ({ default: mod.InterstellarScene })),
  {
    ssr: false,
    loading: () => <div className="w-full h-screen bg-black" />,
  }
);
import { ThreeQuestions } from "@/components/mission/ThreeQuestions";
import { MissionTimeline } from "@/components/timeline/MissionTimeline";
import { LivingBaseline } from "@/components/baseline/LivingBaseline";
import { MonitoringProfile } from "@/components/mission/MonitoringProfile";
import { RecoverySplit } from "@/components/recovery/RecoverySplit";
import { ClaimBoundaryEngine } from "@/components/boundary/ClaimBoundaryEngine";
import { MissionRecommendations } from "@/components/mission/MissionRecommendations";
import type { DomainId } from "@/data/types";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Home() {
  const [briefingStarted, setBriefingStarted] = useState(false);
  const [activeDomainId, setActiveDomainId] = useState<DomainId | null>(null);

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 w-full h-screen">
        <InterstellarScene className="w-full h-full" />
      </div>

      {/* Section 0: Mission Start */}
      <div className="relative z-10">
        <MissionStart onBegin={() => setBriefingStarted(true)} />
      </div>

      {/* All remaining sections - hidden until briefing starts */}
      {briefingStarted && (
        <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.3s_forwards]">
          {/* Section 1: Mission Briefing */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="py-32 md:py-40 max-w-6xl mx-auto px-6"
          >
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-2">
              The mission is no longer only about rockets.
            </h2>
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-[#06B6D4] mb-8">
              It is about biology.
            </h2>

            <div className="max-w-3xl mb-12">
              <p className="font-inter text-lg text-[#94A3B8] leading-relaxed mb-6">
                Future crews may travel for months or years beyond Earth. To prepare them safely,
                mission teams need more than launch systems and habitats. They need to understand
                how the human body responds to spaceflight.
              </p>
              <p className="font-inter text-lg text-[#94A3B8] leading-relaxed">
                Inspiration4 gives us one of the deepest public molecular snapshots: four civilian
                astronauts, sampled before, during, and after a three-day mission at roughly 585
                kilometers above Earth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Mission", value: "Inspiration4" },
                { label: "Crew", value: "4 civilians" },
                { label: "Duration", value: "3 days" },
                { label: "Altitude", value: "~585 km" },
                { label: "Data source", value: "NASA OSDR / SOMA" },
                { label: "Objective", value: "Translate omics into monitoring" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#05070F] border border-[#1E293B] rounded-xl p-5"
                >
                  <div className="font-mono text-xs uppercase tracking-wider text-[#64748B] mb-1">
                    {item.label}
                  </div>
                  <div className="font-space-grotesk text-lg text-[#F8FAFC]">{item.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Section 2: The Three Questions */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="py-32 md:py-40 max-w-6xl mx-auto px-6"
          >
            <ThreeQuestions />
          </motion.section>

          {/* Section 3: What Was Measured */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="py-32 md:py-40 max-w-6xl mx-auto px-6"
          >
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
              These data are snapshots, not a livestream.
            </h2>
            <p className="font-inter text-lg text-[#94A3B8] max-w-2xl mb-12">
              Samples were collected at specific moments before, during, and after flight. Every
              gap is real. Every gap matters.
            </p>

            <MissionTimeline />
          </motion.section>

          {/* Section 4: The Living Baseline */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="py-32 md:py-40 max-w-6xl mx-auto px-6"
          >
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-2">
              Baseline does not mean healthy.
            </h2>
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#06B6D4] mb-4">
              Baseline means this astronaut before flight.
            </h2>
            <p className="font-inter text-lg text-[#94A3B8] max-w-2xl mb-12">
              The center of this chart is not an ideal body. It is that person&apos;s biological
              starting point. Distance from center represents a communication perturbation score —
              not clinical severity.
            </p>

            <LivingBaseline
              phase="baseline"
              activeDomainId={activeDomainId}
              onSelectDomain={setActiveDomainId}
            />
          </motion.section>

          {/* Section 5: Crew Monitoring Profile */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="py-32 md:py-40 max-w-6xl mx-auto px-6"
          >
            <MonitoringProfile />
          </motion.section>

          {/* Section 6: Domain Deep Dive */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="py-32 md:py-40 max-w-6xl mx-auto px-6"
          >
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-16">
              Domain Deep Dive
            </h2>

            <div className="space-y-32">
              {/* Immune */}
              <div className="space-y-6">
                <div className="font-mono text-xs tracking-wider uppercase text-[#22D3EE] mb-2">
                  Immune Regulation
                </div>
                <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">
                  The strongest post-flight signal was immune regulation.
                </h3>
                <p className="font-inter text-lg text-[#94A3B8] leading-relaxed max-w-3xl mb-4">
                  18 cytokines, chemokines, and growth factors showed significant changes (q&lt;0.05). FOXP3+ regulatory T cells activated at R+1. MHC class I genes (HLA-A, HLA-B, HLA-C, B2M) remained suppressed through R+194. This is the largest multi-marker perturbation we observed.
                </p>
                <p className="font-inter text-sm text-[#64748B] italic">
                  These are molecular signals, not signs of illness or immune dysfunction.
                </p>
              </div>

              {/* Oxidative */}
              <div className="space-y-6">
                <div className="font-mono text-xs tracking-wider uppercase text-[#FBBF24] mb-2">
                  Oxidative Response
                </div>
                <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">
                  Some stress signals arrived with their own counter-signal.
                </h3>
                <p className="font-inter text-lg text-[#94A3B8] leading-relaxed max-w-3xl mb-4">
                  Oxidative stress markers shifted in both plasma and extracellular vesicle proteins (EVPs). Inosine and taurine increased significantly. But the recovery was layered: 93% of EVP markers returned toward baseline by R+82, while 73% of plasma markers remained perturbed.
                </p>
                <p className="font-inter text-sm text-[#64748B] italic">
                  Perturbation and compensation can coexist. This is not evidence of cellular injury.
                </p>
              </div>

              {/* Energy */}
              <div className="space-y-6">
                <div className="font-mono text-xs tracking-wider uppercase text-[#60A5FA] mb-2">
                  Energy Metabolism
                </div>
                <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">
                  Energy pathways shifted inside immune cells.
                </h3>
                <p className="font-inter text-lg text-[#94A3B8] leading-relaxed max-w-3xl mb-4">
                  OXPHOS (oxidative phosphorylation) pathway enrichment appeared in single-cell data from immune cells. This is pathway-level signal, not individual marker measurements. The perturbation appeared at R+1 and partially recovered through R+82.
                </p>
                <p className="font-inter text-sm text-[#64748B] italic">
                  Pathway shifts do not indicate mitochondrial failure.
                </p>
              </div>

              {/* Telomere */}
              <div className="space-y-6">
                <div className="font-mono text-xs tracking-wider uppercase text-[#A78BFA] mb-2">
                  Telomere Dynamics
                </div>
                <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">
                  The most tempting story is the one to handle most carefully.
                </h3>
                <p className="font-inter text-lg text-[#94A3B8] leading-relaxed max-w-3xl mb-4">
                  All 4 crew members showed telomere elongation during flight (P&lt;0.001), measured directly from dried blood spots collected in orbit. After landing, 3 out of 4 showed shortening (P&lt;0.02). Whole-genome sequencing and clonal hematopoiesis panels showed no significant genome instability.
                </p>
                <p className="font-inter text-sm text-[#64748B] italic">
                  This is not evidence of rejuvenation or damage. It is a bidirectional biological signal.
                </p>
              </div>

              {/* Microbiome */}
              <div className="space-y-6">
                <div className="font-mono text-xs tracking-wider uppercase text-[#2DD4BF] mb-2">
                  Microbiome Dynamics
                </div>
                <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4">
                  The body was not the only ecosystem in orbit.
                </h3>
                <p className="font-inter text-lg text-[#94A3B8] leading-relaxed max-w-3xl mb-4">
                  Skin and oral microbiota shifted consistently during and after flight (FD2, FD3, R+1). Microbial gene expression patterns correlated with immune cell activity. Spatial transcriptomics of skin tissue revealed 95 upregulated and 121 downregulated genes.
                </p>
                <p className="font-inter text-sm text-[#64748B] italic">
                  Microbiome shifts are not signs of infection or harmful exposure.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 7: Recovery Split */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="py-32 md:py-40 max-w-6xl mx-auto px-6"
          >
            <RecoverySplit />
          </motion.section>

          {/* Section 8: Claim Boundary Engine */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="py-32 md:py-40 max-w-6xl mx-auto px-6"
          >
            <ClaimBoundaryEngine />
          </motion.section>

          {/* Section 9: Mission Control Recommendations */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="py-32 md:py-40 max-w-6xl mx-auto px-6"
          >
            <MissionRecommendations />
          </motion.section>

          {/* Section 10: Closing */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="py-32 md:py-40 max-w-6xl mx-auto px-6"
          >
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-6">
              A responsible report knows where to stop.
            </h2>

            <p className="font-inter text-lg text-[#94A3B8] max-w-2xl mb-8 leading-relaxed">
              Body in Orbit does not diagnose astronauts, predict disease, or determine flight
              readiness. It shows how molecular data from short-duration spaceflight can become a
              clearer mission briefing: what shifted, what recovered, what needs monitoring, and
              what remains uncertain.
            </p>

            <p className="font-inter text-lg italic text-[#06B6D4] mb-12">
              The boundary between observation and interpretation is not a weakness of the data. It
              is the story.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link
                href="/debrief"
                className="bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] px-6 py-3 rounded-xl font-mono text-sm hover:bg-[#06B6D4]/20 transition-colors"
              >
                Enter Crew Debrief →
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-white/5 border border-[#1E293B] text-[#94A3B8] px-6 py-3 rounded-xl font-mono text-sm hover:border-[#94A3B8] transition-colors"
              >
                Review Evidence
              </button>
            </div>
          </motion.section>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
