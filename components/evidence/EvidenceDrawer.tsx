"use client";

import { AnimatePresence } from "framer-motion";
import { EvidencePanel } from "./EvidencePanel";
import { domains } from "@/data/domains";
import type { DomainId, MissionPhase } from "@/data/types";

interface EvidenceDrawerProps {
  activeDomainId: DomainId | null;
  phase: MissionPhase;
  onClose: () => void;
}

export function EvidenceDrawer({ activeDomainId, phase, onClose }: EvidenceDrawerProps) {
  const activeDomain = activeDomainId ? domains[activeDomainId] : null;

  return (
    <AnimatePresence>
      {activeDomain && (
        <EvidencePanel
          domain={activeDomain}
          phase={phase}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}
