import { svgConfig } from "../visualConstants";
import { scoreToRadius } from "./geometry";

export function BaselineGrid() {
  const scores: (1 | 2 | 3)[] = [1, 2, 3];

  return (
    <g className="baseline-grid">
      <defs>
        <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle
        cx={svgConfig.center}
        cy={svgConfig.center}
        r={svgConfig.maxRadius}
        fill="url(#radarGlow)"
        opacity={0.6}
      />

      {scores.map((score) => {
        const radius = scoreToRadius(score);
        return (
          <g key={score}>
            <circle
              cx={svgConfig.center}
              cy={svgConfig.center}
              r={radius}
              fill="none"
              stroke="#06B6D4"
              strokeWidth={0.5}
              opacity={0.2}
            />
            <circle
              cx={svgConfig.center}
              cy={svgConfig.center}
              r={radius}
              fill="none"
              stroke="#06B6D4"
              strokeWidth={1}
              opacity={0.1}
              strokeDasharray="4 8"
              filter="url(#glow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="12"
                dur="8s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}

      <circle
        cx={svgConfig.center}
        cy={svgConfig.center}
        r={6}
        fill="#06B6D4"
        opacity={0.4}
        filter="url(#glow)"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.6;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        cx={svgConfig.center}
        cy={svgConfig.center}
        r={3}
        fill="#06B6D4"
        opacity={0.9}
      />

      <text
        x={svgConfig.center}
        y={svgConfig.center + svgConfig.baselineRadius + 18}
        textAnchor="middle"
        fontSize={10}
        fill="#06B6D4"
        opacity={0.5}
        fontFamily="IBM Plex Mono, monospace"
        letterSpacing="0.05em"
      >
        PRE-FLIGHT BASELINE
      </text>

      {scores.map((score) => {
        const radius = scoreToRadius(score);
        return (
          <text
            key={`label-${score}`}
            x={svgConfig.center + radius + 12}
            y={svgConfig.center + 4}
            fontSize={9}
            fill="#06B6D4"
            opacity={0.4}
            fontFamily="IBM Plex Mono, monospace"
          >
            {score}
          </text>
        );
      })}
    </g>
  );
}
