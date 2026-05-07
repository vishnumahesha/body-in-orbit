---
name: product-context
description: What Body in Orbit is, target users, and what NOT to build
trigger: planning features, writing copy, or making design decisions
---

## What this is
Interactive BioBrief for astronaut-facing molecular debriefs after SpaceX Inspiration4. Hackathon submission for Torchlight Summit Biosovereignty Hackathon (Track 3: Communication & Visualization).

## Target user
- Primary: Astronauts reviewing their own post-flight molecular data
- Secondary: Flight surgeons, mission planners
- Tertiary: Hackathon judges, scientists

## Core features (already built)
1. Living Baseline — radial SVG chart showing 5 domains across mission phases
2. Evidence panels — click any node to see source-backed proof
3. Scroll story — 10 sections with progressive disclosure
4. Claim traceability — every visual movement traceable to paper, assay, timepoint

## Language rules — CRITICAL
NEVER use: diagnosis, disease, abnormal, dangerous, damaged, risk score, treatment, clearance, safe, unsafe

ALWAYS use: signal, shift, perturbation, baseline, recovery, confidence, monitoring, exploratory

Perturbation scores (0-3) are COMMUNICATION scores, not clinical severity scores.

## Key science rule
Most data is pre-flight vs post-flight comparison. Only telomeres have clear in-flight trajectory (FD1-3 dried blood spots). Do NOT say "only in-flight measurement" — say "clearest in-flight trajectory in this visualization."

## What NOT to build
- ❌ Armstrong face or any real astronaut photos
- ❌ 3D graphics or WebGL
- ❌ Live AI chatbot
- ❌ Fake risk scores or clinical predictions
- ❌ Ambient space sounds
- ❌ 12-minute scroll (keep it tight)
- ❌ Database or user accounts
- ❌ Real-time data fetching
- ❌ Complex animations (max 3 simultaneous)

## Internal goal
"Build the safest, clearest astronaut-facing molecular debrief prototype in the competition."

NOT "Build a cool scroll experience."

## Competition edge
Other teams will build pretty dashboards with weak science OR strong science notebooks with ugly presentation. We're the only one building a project where every animated pixel is traceable to a real paper, and the language is so careful that the diagnostics judge can't find a single clinical overclaim.

## Next features (not yet built)
- Timeline showing what was actually measured when
- Recovery split visualization (93% EVP vs 73% plasma)
- README with screenshots
- Design philosophy doc
- Vercel deployment
