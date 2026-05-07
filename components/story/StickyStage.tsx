"use client";

import { MissionPhase, DomainId } from "@/data/types";
import { LivingBaseline } from "../baseline/LivingBaseline";

interface StickyStageProps {
  activePhase: MissionPhase;
  activeDomainId: DomainId | null;
  onSelectDomain: (domainId: DomainId | null) => void;
}

export function StickyStage({
  activePhase,
  activeDomainId,
  onSelectDomain,
}: StickyStageProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-black">
      <div className="w-full max-w-[500px]">
        <LivingBaseline
          phase={activePhase}
          activeDomainId={activeDomainId}
          onSelectDomain={onSelectDomain}
        />
      </div>
    </div>
  );
}
