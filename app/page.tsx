"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeroBackground } from "@/components/HeroBackground";
import { CrewSelector } from "@/components/crew/CrewSelector";
import { LivingBaseline } from "@/components/baseline/LivingBaseline";
import { MissionTimeline } from "@/components/timeline/MissionTimeline";
import { RecoverySplit } from "@/components/recovery/RecoverySplit";
import { ClaimCourt } from "@/components/claim/ClaimCourt";
import { MonitoringPlanner } from "@/components/monitoring/MonitoringPlanner";
import { VoiceDebrief } from "@/components/voice/VoiceDebrief";
import { PrintableBioBrief } from "@/components/print/PrintableBioBrief";
import { EvidenceDrawer } from "@/components/evidence/EvidenceDrawer";
import { crew } from "@/data/crew";
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
  const [selectedCrewId, setSelectedCrewId] = useState<string | null>(null);
  const [activeDomainId, setActiveDomainId] = useState<DomainId | null>(null);

  const crewArray = Object.values(crew);
  const selectedCrew = selectedCrewId ? crew[selectedCrewId] : null;

  return (
    <div className="min-h-screen bg-[#000000]">
      <HeroBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="min-h-screen flex items-center justify-center px-6"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="font-space-grotesk text-6xl md:text-8xl font-bold text-white mb-6">
                Body in Orbit
              </h1>
              <p className="font-inter text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
                Interactive Molecular Debrief for Inspiration4
              </p>
              <div className="font-mono text-sm text-cyan-400">
                Four crew members • Three days in orbit • 289 days of molecular tracking
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Crew Selector Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-32 md:py-40"
        >
          <div className="max-w-6xl mx-auto px-6 mb-16">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-4">
              Select Crew Member
            </h2>
            <p className="font-inter text-lg text-[#94A3B8] max-w-3xl">
              View baseline-relative molecular reports for each Inspiration4 astronaut. Individual data is calibrated against their pre-flight baseline, not population norms.
            </p>
          </div>
          <CrewSelector
            crew={crewArray}
            selectedId={selectedCrewId}
            onSelect={setSelectedCrewId}
          />
          {selectedCrew && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto px-6 mt-8"
            >
              <div className="p-6 rounded-xl bg-[#06B6D4]/5 border border-[#06B6D4]/30">
                <div className="font-space-grotesk text-lg font-semibold text-[#06B6D4] mb-2">
                  {selectedCrew.publicName} — {selectedCrew.missionRole}
                </div>
                <p className="font-inter text-sm text-[#94A3B8]">
                  {selectedCrew.note}
                </p>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Living Baseline Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-32 md:py-40 max-w-6xl mx-auto px-6"
        >
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-2">
            Living Baseline Chart
          </h2>
          <h3 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#06B6D4] mb-4">
            Five biological domains tracked through mission phases
          </h3>
          <p className="font-inter text-lg text-[#94A3B8] max-w-2xl mb-12">
            Distance from center represents communication perturbation score, not clinical severity. Click a domain to see evidence details.
          </p>

          <LivingBaseline
            phase="recovery"
            activeDomainId={activeDomainId}
            onSelectDomain={setActiveDomainId}
          />

          {/* Evidence Drawer */}
          <EvidenceDrawer
            activeDomainId={activeDomainId}
            phase="recovery"
            onClose={() => setActiveDomainId(null)}
          />
        </motion.section>

        {/* Sample Coverage Matrix */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-32 md:py-40 max-w-6xl mx-auto px-6"
        >
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
            Sample Coverage Matrix
          </h2>
          <p className="font-inter text-lg text-[#94A3B8] max-w-2xl mb-12">
            Twelve datasets spanning 289 days of sampling. Gaps are real. Gaps matter.
          </p>

          <MissionTimeline />
        </motion.section>

        {/* Recovery Patterns */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-32 md:py-40 max-w-6xl mx-auto px-6"
        >
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
            Recovery Was Layered
          </h2>
          <p className="font-inter text-lg text-[#94A3B8] max-w-2xl mb-12">
            Different biological systems recovered at different rates. Not all markers returned to baseline by 194 days post-landing.
          </p>

          <RecoverySplit />
        </motion.section>

        {/* Claim Court */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-32 md:py-40 max-w-6xl mx-auto px-6"
        >
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
            Claim Court
          </h2>
          <p className="font-inter text-lg text-[#94A3B8] max-w-2xl mb-12">
            Test your understanding. Which claims are supported by n=4 data? Which overstep the evidence?
          </p>

          <ClaimCourt />
        </motion.section>

        {/* Monitoring Planner */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-32 md:py-40 max-w-6xl mx-auto px-6"
        >
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
            Monitoring Planner
          </h2>
          <p className="font-inter text-lg text-[#94A3B8] max-w-2xl mb-12">
            Domain priorities shift based on mission duration. Toggle between 3-day, 30-day, and 180-day profiles.
          </p>

          <MonitoringPlanner />
        </motion.section>

        {/* Voice Debrief */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-32 md:py-40 max-w-6xl mx-auto px-6"
        >
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
            Voice Debrief
          </h2>
          <p className="font-inter text-lg text-[#94A3B8] max-w-2xl mb-12">
            Audio summaries reviewed for language safety. No clinical overclaims.
          </p>

          <VoiceDebrief />
        </motion.section>

        {/* Printable BioBrief */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-32 md:py-40 max-w-6xl mx-auto px-6"
        >
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
            Printable BioBrief
          </h2>
          <p className="font-inter text-lg text-[#94A3B8] max-w-2xl mb-12">
            Export a summary report for offline review or crew records.
          </p>

          <PrintableBioBrief />
        </motion.section>

        {/* Closing */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-32 md:py-40 max-w-6xl mx-auto px-6"
        >
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-6">
            A responsible debrief knows where to stop.
          </h2>

          <p className="font-inter text-lg text-[#94A3B8] max-w-2xl mb-8 leading-relaxed">
            This platform does not diagnose astronauts, predict disease, or determine flight readiness. It shows how molecular data from short-duration spaceflight can become a clearer mission briefing: what shifted, what recovered, what needs monitoring, and what remains uncertain.
          </p>

          <p className="font-inter text-lg italic text-[#06B6D4] mb-12">
            The boundary between observation and interpretation is not a weakness of the data. It is the story.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
