"use client";

import { HeroBackground } from "@/components/HeroBackground";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { MissionStart } from "@/components/mission/MissionStart";

import { CrewProvider, useCrew } from "@/lib/crewContext";
import { CrewSelector } from "@/components/crew/CrewSelector";
import { AnimatedRadialChart } from "@/components/radial/AnimatedRadialChart";
import { ClaimCourt } from "@/components/court/ClaimCourt";
import { EvidenceDrawers } from "@/components/evidence/EvidenceDrawers";
import { SampleCoverageMatrix } from "@/components/coverage/SampleCoverageMatrix";
import { MonitoringPlanner } from "@/components/planner/MonitoringPlanner";
import { VoiceDebrief } from "@/components/voice/VoiceDebrief";
import { PrintableBiobrief } from "@/components/biobrief/PrintableBiobrief";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function Section({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionVariants}
      className="py-24 md:py-32 max-w-6xl mx-auto px-6"
    >
      {eyebrow && (
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#06B6D4]/80 mb-6">
          {eyebrow}
        </div>
      )}
      {children}
    </motion.section>
  );
}

function BriefingHeader() {
  const { profile } = useCrew();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={profile.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#64748B]"
      >
        Active brief · {profile.callsign}
      </motion.div>
    </AnimatePresence>
  );
}

function HomeContent() {
  const [briefingStarted, setBriefingStarted] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000]">
      {!briefingStarted && <HeroBackground />}

      <div className="relative z-10">
        <MissionStart onBegin={() => setBriefingStarted(true)} />
      </div>

      {briefingStarted && (
        <div className="relative z-10 opacity-0 animate-[fadeIn_0.6s_ease-out_0.3s_forwards]">
          {/* Section 1: Crew Selector — centerpiece */}
          <Section eyebrow="01 · Crew Selector">
            <CrewSelector />
          </Section>

          {/* Section 2: Mission framing */}
          <Section eyebrow="02 · Mission framing">
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
                Inspiration4 gives us one of the deepest public molecular snapshots: four civilians,
                sampled before, during, and after a three-day mission at roughly 585 kilometers
                above Earth.
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
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-[#05070F] border border-[#1E293B] rounded-xl p-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-1">
                    {item.label}
                  </div>
                  <div className="font-space-grotesk text-lg text-[#F8FAFC]">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Section 3: Animated radial chart */}
          <Section eyebrow="03 · Domain readout">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start mb-10">
              <div>
                <BriefingHeader />
                <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mt-3">
                  Five domains.{" "}
                  <span className="text-[#06B6D4]">Six mission phases.</span>{" "}
                  Watch the body move.
                </h2>
                <p className="font-inter text-base text-[#94A3B8] leading-relaxed mt-4 max-w-xl">
                  Distance from center is a perturbation score from 0 to 3 — a communication score,
                  not a clinical severity score. Phase buttons retime the entire chart; loop the
                  phases or hover any node for plain-language context.
                </p>
              </div>
              <AnimatedRadialChart />
            </div>
          </Section>

          {/* Section 4: Evidence drawers */}
          <Section eyebrow="04 · Evidence receipts">
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-3">
              Every domain card opens its receipts.
            </h2>
            <p className="font-inter text-base text-[#94A3B8] max-w-2xl mb-10 leading-relaxed">
              Click any card. The receipt drawer below pulls the technical finding, the
              astronaut-safe wording, the sample types, the timepoints, the score reasoning, and
              what we are explicitly <em>not</em> claiming.
            </p>
            <EvidenceDrawers />
          </Section>

          {/* Section 5: Sample coverage matrix */}
          <Section eyebrow="05 · Coverage matrix">
            <SampleCoverageMatrix />
          </Section>

          {/* Section 6: Claim Court */}
          <Section eyebrow="06 · Claim court">
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-3">
              The hardest part is not seeing the signal.
            </h2>
            <h3 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#06B6D4] mb-6">
              It is knowing what the signal does not prove.
            </h3>
            <p className="font-inter text-base text-[#94A3B8] max-w-2xl mb-10 leading-relaxed">
              Each card is a real-shaped claim about the data. Pick how it should be communicated,
              then watch the verdict, source, safer wording, and the conclusions to{" "}
              <span className="text-[#F87171]">not</span> reach.
            </p>
            <ClaimCourt />
          </Section>

          {/* Section 7: Monitoring planner */}
          <Section eyebrow="07 · Monitoring planner">
            <MonitoringPlanner />
          </Section>

          {/* Section 8: Voice debrief */}
          <Section eyebrow="08 · Voice debrief">
            <VoiceDebrief />
          </Section>

          {/* Section 9: Printable biobrief */}
          <Section eyebrow="09 · Printable biobrief">
            <PrintableBiobrief />
          </Section>

          {/* Section 10: Closing */}
          <Section eyebrow="10 · Boundary">
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
                onClick={() =>
                  typeof window !== "undefined" &&
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="bg-white/5 border border-[#1E293B] text-[#94A3B8] px-6 py-3 rounded-xl font-mono text-sm hover:border-[#94A3B8] transition-colors"
              >
                Review Evidence
              </button>
            </div>
          </Section>
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

export default function Home() {
  return (
    <CrewProvider>
      <HomeContent />
    </CrewProvider>
  );
}
