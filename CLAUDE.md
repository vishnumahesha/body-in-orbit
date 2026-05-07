# Body in Orbit — Claude Code Context

## What this is
An interactive BioBrief for astronaut-facing molecular debriefs after SpaceX Inspiration4. Hackathon submission for Torchlight Summit Biosovereignty Hackathon (Track 3: Communication & Visualization).

## Stack
- Next.js 14 App Router, TypeScript strict, Tailwind CSS, Framer Motion, SVG
- Deploy target: Vercel
- No src/ directory — app/ at root

## Design rules
- Pure black background #000000
- Fonts: Space Grotesk (headings), Inter (body), IBM Plex Mono (data/labels)
- Colors: Cyan #06B6D4 (measured), Purple #8B5CF6 (uncertain)
- Domain colors: Immune #22D3EE, Oxidative #FBBF24, Energy #60A5FA, Telomere #A78BFA, Microbiome #2DD4BF
- Max 3 simultaneous animations per section
- All animations use spring: stiffness 90, damping 22, mass 0.45

## Language rules — CRITICAL
NEVER use in user-facing text: diagnosis, disease, abnormal, dangerous, damaged, risk score, treatment, clearance, safe, unsafe
ALWAYS use: signal, shift, perturbation, baseline, recovery, confidence, monitoring, exploratory
Perturbation scores are COMMUNICATION scores, not clinical severity scores.

## Data architecture
- data/types.ts — all TypeScript types
- data/domains.ts — 5 biological domains with full evidence records
- data/sources.ts — 8 Inspiration4 papers with DOIs
- data/sections.ts — 10 scroll sections
- data/perturbationScale.ts — 0-3 rubric
- data/crew.ts — 4 crew members

## Key science rule
Most data is pre-flight vs post-flight comparison. Only telomeres have clear in-flight trajectory (FD1-3). Do NOT say "only in-flight measurement" — say "clearest in-flight trajectory in this visualization."

## Component structure
- components/baseline/ — Living Baseline radial SVG chart
- components/evidence/ — Evidence panels, source chips, claim audit
- components/story/ — Scroll sections, sticky stage, nav
- components/timeline/ — Mission timeline, coverage dots
- components/recovery/ — Recovery split visualization

## Internal goal
"Build the safest, clearest astronaut-facing molecular debrief prototype in the competition."
NOT "Build a cool scroll experience."
