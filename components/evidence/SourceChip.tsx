"use client";

import { sources } from "@/data/sources";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface SourceChipProps {
  sourceId: string;
}

export function SourceChip({ sourceId }: SourceChipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const source = sources[sourceId];

  if (!source) return null;

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs font-mono border border-white/10 rounded-full px-3 py-1 transition-all hover:border-white/30 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={isHovered ? "underline" : ""}>
        {source.authorsShort} {source.year}
      </span>
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}
