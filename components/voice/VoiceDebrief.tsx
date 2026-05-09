"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCrew } from "@/lib/crewContext";

type Status = "idle" | "playing" | "paused";

export function VoiceDebrief() {
  const { profile } = useCrew();
  const [status, setStatus] = useState<Status>("idle");
  const [activeLine, setActiveLine] = useState<number>(-1);
  const [supported, setSupported] = useState<boolean>(true);
  const [voiceURI, setVoiceURI] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const queueRef = useRef<SpeechSynthesisUtterance[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const ALLOWED = ["Samantha", "Alex", "Daniel", "Karen", "Moira", "Tessa", "Google US English"];
    const refresh = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const filtered = allVoices.filter(
        (v) => v.lang.startsWith("en") && ALLOWED.includes(v.name)
      );
      const list =
        filtered.length > 0
          ? filtered
          : allVoices.filter((v) => v.lang.startsWith("en") && v.default).slice(0, 3);
      setVoices(list);
      if (!voiceURI && list.length) {
        const preferred =
          list.find((v) => v.name === "Samantha") ||
          list.find((v) => /^en/i.test(v.lang)) ||
          list[0];
        if (preferred) setVoiceURI(preferred.voiceURI);
      }
    };
    refresh();
    window.speechSynthesis.onvoiceschanged = refresh;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [voiceURI]);

  // unmount cleanup — cancel any speech queued/in-flight
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // stop on crew change
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setStatus("idle");
    setActiveLine(-1);
    queueRef.current = [];
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [profile.id]);

  const play = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    queueRef.current = [];

    profile.voiceLines.forEach((line, i) => {
      const u = new SpeechSynthesisUtterance(line);
      const v = voices.find((vv) => vv.voiceURI === voiceURI);
      if (v) u.voice = v;
      u.rate = 0.96;
      u.pitch = 0.96;
      u.onstart = () => setActiveLine(i);
      u.onend = () => {
        if (i === profile.voiceLines.length - 1) {
          setStatus("idle");
          setActiveLine(-1);
        }
      };
      queueRef.current.push(u);
      window.speechSynthesis.speak(u);
    });
    setStatus("playing");
  };

  const pause = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.pause();
    setStatus("paused");
  };

  const resume = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.resume();
    setStatus("playing");
  };

  const stop = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    queueRef.current = [];
    setStatus("idle");
    setActiveLine(-1);
  };

  return (
    <div className="rounded-2xl border border-[#1E293B] bg-[#05070F] p-5 md:p-6 space-y-4 relative overflow-hidden max-w-4xl">
      <div
        className="pointer-events-none absolute -inset-px"
        style={{
          background:
            "radial-gradient(60% 50% at 100% 0%, rgba(6,182,212,0.10), transparent 60%)",
        }}
      />

      <div className="relative flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-1">
            Voice debrief · approved script
          </div>
          <h3 className="font-space-grotesk text-lg text-[#F8FAFC] leading-tight">
            Hear the {profile.displayLabel} brief in mission tone.
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {voices.length > 0 && (
            <select
              value={voiceURI ?? ""}
              onChange={(e) => setVoiceURI(e.target.value)}
              className="bg-black/60 border border-[#1E293B] rounded-lg font-mono text-[11px] text-[#94A3B8] px-2 py-1.5"
              aria-label="Voice"
            >
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} · {v.lang}
                </option>
              ))}
            </select>
          )}
          <div className="flex items-center gap-2">
            {status === "idle" && (
              <button
                onClick={play}
                disabled={!supported}
                className="font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-xl border border-[#06B6D4]/40 text-[#06B6D4] hover:bg-[#06B6D4]/[0.06] disabled:opacity-30"
              >
                ▶ Play debrief
              </button>
            )}
            {status === "playing" && (
              <>
                <button
                  onClick={pause}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-xl border border-[#FBBF24]/40 text-[#FBBF24] hover:bg-[#FBBF24]/[0.06]"
                >
                  ❙❙ Pause
                </button>
                <button
                  onClick={stop}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-2 rounded-xl border border-[#1E293B] text-[#94A3B8] hover:border-[#334155]"
                >
                  ■ Stop
                </button>
              </>
            )}
            {status === "paused" && (
              <>
                <button
                  onClick={resume}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-xl border border-[#06B6D4]/40 text-[#06B6D4] hover:bg-[#06B6D4]/[0.06]"
                >
                  ▶ Resume
                </button>
                <button
                  onClick={stop}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-2 rounded-xl border border-[#1E293B] text-[#94A3B8] hover:border-[#334155]"
                >
                  ■ Stop
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="relative space-y-2">
        {profile.voiceLines.map((line, i) => {
          const isActive = activeLine === i;
          return (
            <motion.div
              key={`${profile.id}-${i}`}
              animate={{
                opacity: isActive ? 1 : activeLine > i ? 0.55 : 0.85,
                scale: isActive ? 1.005 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`relative rounded-xl border p-4 ${
                isActive
                  ? "border-[#06B6D4]/60 bg-[#06B6D4]/[0.04]"
                  : "border-[#1E293B] bg-black/40"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] mt-0.5 ${
                    isActive ? "text-[#06B6D4]" : "text-[#475569]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className={`font-inter text-base leading-relaxed ${
                    isActive ? "text-[#F8FAFC]" : "text-[#94A3B8]"
                  }`}
                >
                  {line}
                </p>
              </div>
              {isActive && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r"
                  style={{ background: "#06B6D4" }}
                  layoutId="voice-active-rail"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {!supported && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FBBF24]/80"
          >
            This browser does not support speech synthesis. Script remains readable above.
          </motion.p>
        )}
      </AnimatePresence>

      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#475569]">
        Audio is read directly from the approved on-screen script. No claims are added to it.
      </p>
    </div>
  );
}
