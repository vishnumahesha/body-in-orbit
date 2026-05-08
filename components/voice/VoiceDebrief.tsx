"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

interface DebriefScript {
  id: string;
  title: string;
  duration: string;
  script: string;
}

const scripts: DebriefScript[] = [
  {
    id: "mission_overview",
    title: "Mission Overview",
    duration: "45 sec",
    script: "This is your molecular debrief for Inspiration4. Four civilian astronauts. Three days in orbit at 585 kilometers. Samples collected before flight, during flight, and for 194 days after landing. Twelve datasets spanning immune regulation, oxidative response, energy metabolism, telomere dynamics, and microbiome shifts. This briefing shows what shifted, what recovered, what needs monitoring, and what we cannot yet conclude."
  },
  {
    id: "immune_summary",
    title: "Immune Regulation Summary",
    duration: "1 min",
    script: "Immune regulation showed the strongest post-flight signal. Eighteen cytokines, chemokines, and growth factors shifted significantly at return plus one day. Regulatory T cells activated. MHC class one genes remained suppressed through return plus 194 days. These are molecular monitoring signals. They are not signs of illness or immune dysfunction. The perturbation score of three reflects marker breadth and temporal pattern, not clinical severity."
  },
  {
    id: "telomere_summary",
    title: "Telomere Dynamics Summary",
    duration: "50 sec",
    script: "All four crew members showed telomere elongation during flight, measured from dried blood spots collected in orbit. After landing, three of four showed shortening. This is a bidirectional biological signal, not evidence of rejuvenation or damage. Whole genome sequencing and clonal hematopoiesis screening showed no significant genome instability. This domain has the clearest in-flight trajectory in the dataset."
  },
  {
    id: "recovery_summary",
    title: "Recovery Patterns Summary",
    duration: "40 sec",
    script: "Recovery was layered, not uniform. Ninety-three percent of extracellular vesicle protein markers returned toward baseline by return plus 82 days. Seventy-three percent of plasma markers remained perturbed. Immune markers showed the longest persistence. Microbiome shifts partially reversed. Recovery timelines vary by biological layer and assay type."
  },
  {
    id: "n4_constraint",
    title: "Sample Size Constraint",
    duration: "35 sec",
    script: "Four crew members. Every finding in this briefing is calibrated against a sample size of four. Statistical significance does not equal clinical certainty. We classify findings as supported, monitoring signal, or overclaim. Never as diagnosis. This constraint is not a weakness of the study. It is the reality of astronaut molecular research."
  }
];

export function VoiceDebrief() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    setSpeechSupported("speechSynthesis" in window);

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (text: string) => {
    if (!speechSupported) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (!speechSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      speak(scripts[currentIndex].script);
    }
  };

  const handleNext = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % scripts.length);
  };

  const handlePrevious = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + scripts.length) % scripts.length);
  };

  const currentScript = scripts[currentIndex];

  if (!speechSupported) {
    return (
      <div className="max-w-4xl mx-auto p-6 rounded-xl bg-[#05070F] border-2 border-[#1E293B]">
        <p className="font-inter text-[#94A3B8]">
          Voice debrief requires browser speech synthesis support. This feature is not available in your current browser.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Script Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {scripts.map((script, index) => (
          <motion.button
            key={script.id}
            onClick={() => {
              window.speechSynthesis.cancel();
              setIsPlaying(false);
              setCurrentIndex(index);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              p-4 rounded-xl border-2 text-left transition-all
              ${currentIndex === index
                ? "bg-[#06B6D4]/10 border-[#06B6D4]"
                : "bg-[#05070F] border-[#1E293B] hover:border-[#334155]"
              }
            `}
          >
            <div className="font-space-grotesk text-sm font-semibold text-[#F8FAFC] mb-1">
              {script.title}
            </div>
            <div className="font-mono text-xs text-[#64748B]">
              {script.duration}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Player */}
      <motion.div
        layout
        className="bg-[#05070F] border-2 border-[#1E293B] rounded-2xl p-8"
      >
        {/* Now Playing */}
        <div className="flex items-center gap-3 mb-6">
          <Volume2 className="w-5 h-5 text-[#06B6D4]" />
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-[#64748B]">
              Now Playing
            </div>
            <div className="font-space-grotesk text-xl font-semibold text-[#F8FAFC]">
              {currentScript.title}
            </div>
          </div>
        </div>

        {/* Script Text */}
        <div className="mb-8 p-6 rounded-xl bg-[#0A0D14] border border-[#1E293B]">
          <p className="font-inter text-base text-[#94A3B8] leading-relaxed">
            {currentScript.script}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            onClick={handlePrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-[#0A0D14] border border-[#1E293B] hover:border-[#334155] transition-colors"
          >
            <SkipBack className="w-5 h-5 text-[#94A3B8]" />
          </motion.button>

          <motion.button
            onClick={handlePlayPause}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 rounded-full bg-[#06B6D4]/10 border-2 border-[#06B6D4] hover:bg-[#06B6D4]/20 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-[#06B6D4]" />
            ) : (
              <Play className="w-8 h-8 text-[#06B6D4] ml-1" />
            )}
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-[#0A0D14] border border-[#1E293B] hover:border-[#334155] transition-colors"
          >
            <SkipForward className="w-5 h-5 text-[#94A3B8]" />
          </motion.button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {scripts.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === currentIndex ? "w-8 bg-[#06B6D4]" : "w-1 bg-[#1E293B]"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Safety Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 p-4 rounded-xl bg-[#8B5CF6]/5 border border-[#8B5CF6]/30"
      >
        <p className="font-inter text-sm text-[#94A3B8]">
          <span className="text-[#8B5CF6] font-semibold">Voice scripts approved for crew debrief.</span> All language has been reviewed to remove clinical overclaims. Playback uses browser speech synthesis.
        </p>
      </motion.div>
    </div>
  );
}
