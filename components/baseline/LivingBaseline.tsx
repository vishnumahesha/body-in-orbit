"use client";

import { DomainId, MissionPhase } from "@/data/types";
import { domains } from "@/data/domains";
import { BaselineGrid } from "./BaselineGrid";
import { DomainTrail } from "./DomainTrail";
import { DomainNode } from "./DomainNode";
import { svgConfig } from "../visualConstants";

interface LivingBaselineProps {
  phase: MissionPhase;
  activeDomainId: DomainId | null;
  onSelectDomain: (domainId: DomainId | null) => void;
}

export function LivingBaseline({
  phase,
  activeDomainId,
  onSelectDomain,
}: LivingBaselineProps) {
  const domainArray = Object.values(domains);

  return (
    <div className="flex flex-col items-center gap-6 w-full relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0.1) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <svg
        viewBox={`0 0 ${svgConfig.size} ${svgConfig.size}`}
        className="w-full h-auto max-w-[500px] relative z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        <BaselineGrid />

        {domainArray.map((domain) => (
          <DomainTrail
            key={`trail-${domain.id}`}
            domain={domain}
            currentPhase={phase}
          />
        ))}

        {domainArray.map((domain) => {
          const visualState = domain.visualStates[phase];
          const isActive = domain.id === activeDomainId;
          const isDimmed = activeDomainId !== null && !isActive;
          return (
            <DomainNode
              key={`node-${domain.id}`}
              domain={domain}
              visualState={visualState}
              isActive={isActive}
              isDimmed={isDimmed}
              onClick={() =>
                onSelectDomain(
                  domain.id === activeDomainId ? null : domain.id
                )
              }
            />
          );
        })}
      </svg>

      <div className="flex flex-col gap-3 text-xs font-mono px-4 max-w-[500px] w-full">
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-gray-400">
          <span className="flex items-center gap-2">
            <svg width="20" height="2">
              <line x1="0" y1="1" x2="20" y2="1" stroke="#94A3B8" />
            </svg>
            <span className="text-[11px]">measured</span>
          </span>
          <span className="flex items-center gap-2">
            <svg width="20" height="2">
              <line
                x1="0"
                y1="1"
                x2="20"
                y2="1"
                stroke="#94A3B8"
                strokeDasharray="7 6"
              />
            </svg>
            <span className="text-[11px]">post-flight</span>
          </span>
          <span className="flex items-center gap-2">
            <svg width="20" height="2">
              <line
                x1="0"
                y1="1"
                x2="20"
                y2="1"
                stroke="#94A3B8"
                strokeDasharray="2 8"
              />
            </svg>
            <span className="text-[11px]">inferred</span>
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14">
              <circle cx="7" cy="7" r="5" fill="#94A3B8" />
            </svg>
            <span className="text-[11px]">filled</span>
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14">
              <circle
                cx="7"
                cy="7"
                r="4"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
              />
            </svg>
            <span className="text-[11px]">hollow</span>
          </span>
        </div>

        <p className="text-center text-[10px] text-gray-500 leading-relaxed">
          Distance = communication perturbation score, not clinical severity
        </p>
      </div>
    </div>
  );
}
