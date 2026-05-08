"use client";

import { motion } from "framer-motion";
import type { CrewMember } from "@/data/types";

interface CrewSelectorProps {
  crew: CrewMember[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CrewSelector({ crew, selectedId, onSelect }: CrewSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-6 mb-16">
      {crew.map((member, index) => {
        const isSelected = selectedId === member.id;
        return (
          <motion.button
            key={member.id}
            onClick={() => onSelect(member.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              stiffness: 90,
              damping: 22,
              mass: 0.45,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative p-6 rounded-xl border-2 transition-all duration-300
              ${isSelected
                ? "bg-[#06B6D4]/10 border-[#06B6D4] shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                : "bg-[#05070F] border-[#1E293B] hover:border-[#334155]"
              }
            `}
          >
            {/* Selection indicator */}
            {isSelected && (
              <motion.div
                layoutId="crew-selected"
                className="absolute -top-1 -right-1 w-3 h-3 bg-[#06B6D4] rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}

            <div className="font-mono text-xs uppercase tracking-wider text-[#64748B] mb-2">
              {member.displayLabel}
            </div>
            <div className="font-space-grotesk text-lg font-semibold text-[#F8FAFC] mb-1">
              {member.publicName}
            </div>
            <div className="font-inter text-sm text-[#94A3B8]">
              {member.missionRole}
            </div>

            {/* Status indicator */}
            {isSelected && (
              <div className="mt-4 pt-4 border-t border-[#06B6D4]/30">
                <div className="font-mono text-xs text-[#06B6D4]">
                  Viewing baseline-relative report
                </div>
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
