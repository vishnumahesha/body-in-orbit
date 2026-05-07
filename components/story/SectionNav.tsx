"use client";

import { StorySection } from "@/data/types";

interface SectionNavProps {
  sections: StorySection[];
  activeSectionId: string;
}

export function SectionNav({ sections, activeSectionId }: SectionNavProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section-id="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <nav className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-50">
      {sections.map((section) => {
        const isActive = section.id === activeSectionId;
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group flex items-center gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded ${
              isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
            }`}
            aria-label={`Go to ${section.headline}`}
          >
            <span className="text-xs font-mono text-gray-400 w-6 text-right">
              {String(section.index).padStart(2, "0")}
            </span>
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                isActive
                  ? "bg-cyan-400 scale-125"
                  : "bg-white/20 group-hover:bg-white/40"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
