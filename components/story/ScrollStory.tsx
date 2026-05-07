"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { MissionPhase, DomainId } from "@/data/types";
import { sections } from "@/data/sections";
import { domains } from "@/data/domains";
import { StickyStage } from "./StickyStage";
import { StorySection } from "./StorySection";
import { SectionNav } from "./SectionNav";
import { EvidencePanel } from "../evidence/EvidencePanel";

export function ScrollStory() {
  const [activePhase, setActivePhase] = useState<MissionPhase>("hero");
  const [activeDomainId, setActiveDomainId] = useState<DomainId | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>("hero");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section-id");
            if (sectionId) {
              const section = sections.find((s) => s.id === sectionId);
              if (section) {
                setActivePhase(section.phase);
                setActiveSectionId(section.id);

                if (section.activeDomainIds.length === 1) {
                  setActiveDomainId(section.activeDomainIds[0]);
                } else if (section.activeDomainIds.length === 0) {
                  setActiveDomainId(null);
                }
              }
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const setSectionRef = (id: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(id, element);
    } else {
      sectionRefs.current.delete(id);
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      <div className="hidden lg:flex lg:flex-row">
        <div className="w-[55vw] h-screen sticky top-0 flex items-center justify-center bg-black">
          <StickyStage
            activePhase={activePhase}
            activeDomainId={activeDomainId}
            onSelectDomain={setActiveDomainId}
          />
        </div>

        <div className="w-[45vw] relative bg-black">
          {sections.map((section) => (
            <StorySection
              key={section.id}
              section={section}
              isActive={section.id === activeSectionId}
              ref={(el) => setSectionRef(section.id, el)}
            />
          ))}
        </div>
      </div>

      <div className="lg:hidden bg-black">
        <div className="min-h-screen flex items-center justify-center p-8">
          <StickyStage
            activePhase={activePhase}
            activeDomainId={activeDomainId}
            onSelectDomain={setActiveDomainId}
          />
        </div>

        {sections.map((section) => (
          <StorySection
            key={section.id}
            section={section}
            isActive={section.id === activeSectionId}
            ref={(el) => setSectionRef(section.id, el)}
          />
        ))}
      </div>

      <SectionNav sections={sections} activeSectionId={activeSectionId} />

      <AnimatePresence>
        {activeDomainId && (
          <EvidencePanel
            domain={domains[activeDomainId]}
            phase={activePhase}
            onClose={() => setActiveDomainId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
