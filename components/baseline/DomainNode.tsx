"use client";

import { motion } from "framer-motion";
import { BiologicalDomain, VisualState } from "@/data/types";
import { polarToCartesian, confidenceOpacity } from "./geometry";
import { svgConfig, motionSpring } from "../visualConstants";
import { useState } from "react";

interface DomainNodeProps {
  domain: BiologicalDomain;
  visualState: VisualState;
  isActive: boolean;
  isDimmed: boolean;
  onClick: () => void;
}

export function DomainNode({
  domain,
  visualState,
  isActive,
  isDimmed,
  onClick,
}: DomainNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = polarToCartesian(domain.angleDeg, visualState.perturbationScore);
  const radius = isActive ? svgConfig.activeNodeRadius : svgConfig.nodeRadius;
  const baseOpacity = confidenceOpacity(visualState.confidence);
  const opacity = isDimmed ? baseOpacity * 0.3 : baseOpacity;
  const isFilled = visualState.nodeFill === "filled";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  const glowId = `glow-${domain.id}`;

  return (
    <g
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
    >
      <defs>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.circle
        cx={x}
        cy={y}
        r={radius + 6}
        fill={domain.color}
        opacity={isActive ? 0.2 : isHovered ? 0.15 : 0}
        animate={{
          scale: isActive ? [1, 1.1] : 1,
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: isActive ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      />

      <motion.circle
        cx={x}
        cy={y}
        r={radius}
        fill={isFilled ? domain.color : "none"}
        stroke={domain.color}
        strokeWidth={isFilled ? 0 : 2.5}
        opacity={opacity}
        filter={`url(#${glowId})`}
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 90, damping: 22, mass: 0.45 },
        }}
      />

      {isActive && (
        <motion.circle
          cx={x}
          cy={y}
          r={radius + 3}
          fill="none"
          stroke={domain.color}
          strokeWidth={1}
          opacity={0.4}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ type: "spring", stiffness: 90, damping: 22, mass: 0.45 }}
        />
      )}

      <motion.text
        x={x}
        y={y - radius - 12}
        textAnchor="middle"
        fontSize={isActive ? 13 : 11}
        fontWeight={isActive ? "600" : "400"}
        fill={isActive ? domain.color : "#F8FAFC"}
        opacity={isDimmed ? opacity * 0.5 : opacity * 0.95}
        fontFamily="IBM Plex Mono, monospace"
        letterSpacing="0.05em"
        style={{
          textShadow: isActive ? `0 0 10px ${domain.color}` : "none",
        }}
        animate={{ x, y }}
        transition={{
          x: { type: "spring", ...motionSpring },
          y: { type: "spring", ...motionSpring },
        }}
      >
        {domain.shortLabel}
      </motion.text>
    </g>
  );
}
