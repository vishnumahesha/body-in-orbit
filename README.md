# Body in Orbit

**A post-flight molecular debrief for Inspiration4 crew data.**

Torchlight Summit Biosovereignty Hackathon 2026 — Team 3 — Vishnu Mahesha

---

## What This Is

Body in Orbit is an interactive post-flight Recovery Review. The user selects one of four Inspiration4 crew members and receives a personalized molecular debrief: what shifted, what recovered, what needs monitoring, and what the data does not prove.

Every claim traces to a specific dataset (OSD ID), peer-reviewed paper, and confidence level. Every sentence that could be misread as clinical is rewritten with safer wording.

This is Track 3 (Communication & Visualization) with Track 1 (perturbation analysis) and Track 2 (risk profiling) as supporting layers.

## Live Demo

Deployed at: [body-in-orbit.vercel.app](https://body-in-orbit.vercel.app) (pending)

## Interactive Features

### 1. Crew Selector
Four clickable astronaut cards (C001-C004). Selecting a crew member re-keys the entire page — radial chart, evidence drawers, monitoring planner, voice debrief, and printable report all update to show that crew member's biological profile.

### 2. Animated Radial Chart
SVG radar with 5 biological domains animated across 6 mission phases (Baseline → In-flight → R+1 → R+45 → R+82 → R+194). Autoplay loops through phases. Hover any node for plain-language context. Distance from center is a perturbation score (0-3), not clinical severity.

### 3. Claim Court
10 real-shaped claims about the data. User classifies each as Supported, Monitoring Only, or Overclaim. Reveal shows the verdict, evidence source, safer wording, and what should NOT be concluded. Teaches the n=4 constraint through interaction.

### 4. Evidence Receipt Drawers
5 expandable domain cards. Click to open: technical finding, astronaut-safe wording, sample types, timepoints, score reasoning, and explicit non-claims. Every receipt is traceable to an OSD dataset.

### 5. Sample Coverage Matrix
12 datasets x 10 timepoints. Three states: collected, differential anchor, gap. Hover for dataset metadata, comparison method, and caution. Shows where the data exists and where it does not.

### 6. Monitoring Planner
Toggle between 3-day, 30-day, and 180-day mission profiles. Domains reorder by priority with animated transitions. Shows sampling cadence, recovery window, and boundary statements.

### 7. Voice Debrief
Browser speechSynthesis reads crew-specific approved scripts. Play/pause/stop controls, voice picker, line-level highlighting. Audio reads only what is on screen — no claims are added.

### 8. Printable BioBrief
A4-formatted report card with crew metadata, domain scores, recovery notes, monitoring priorities, non-claims list, and full source citations. Print CSS for clean PDF export.

## Data

All data from NASA Open Science Data Repository (OSDR) via the Torchlight Hackathon 2026 starter Colab notebook.

**12 datasets** spanning 5 biological domains:
- Immune regulation (OSD-575, OSD-656, OSD-570, OSD-569)
- Oxidative response (OSD-571, OSD-656)
- Energy metabolism (OSD-575, OSD-571, OSD-569)
- Genome regulation / telomere dynamics (OSD-569, OSD-570)
- Microbiome interactions (OSD-572, OSD-573, OSD-630, OSD-574)

**8 peer-reviewed sources** from the Inspiration4 consortium (Nature, Nature Communications, Nature Microbiology, Precision Clinical Medicine — all 2024).

## Language Safety

Forbidden terms: diagnose, treat, cure, permanent damage, causes (causal), proves, confirms, clearance, risk score, safe, unsafe.

Every astronaut-facing sentence uses: signal, shift, perturbation, baseline, recovery, confidence, monitoring, exploratory, "may relate to."

## Documentation

- [Proposal](docs/proposal.md) — problem statement and approach
- [Design Philosophy](docs/DESIGN_PHILOSOPHY.md) — why a Recovery Review, not a dashboard
- [Methods Note](docs/METHODS_NOTE.md) — data pipeline, scoring, AI usage, limitations
- [Evidence Ledger](docs/EVIDENCE_LEDGER.md) — every claim traced to dataset and source

## Tech Stack

- Next.js 14 (App Router)
- React 18 + Framer Motion
- TypeScript
- Tailwind CSS
- Three.js / React Three Fiber (background scene)
- Vercel (deployment)

## AI Usage Statement

AI (Claude) was used to translate technical findings into astronaut-safe language, audit wording for overclaims, and build interactive UI components. AI did not generate scientific claims, interpret biological significance, or decide perturbation scores. See [Methods Note](docs/METHODS_NOTE.md) for details.

## Thesis

> The astronaut landed in three days. The biology did not land all at once.

> Clear to communicate. Not clear to overclaim.

---

*Body in Orbit does not diagnose astronauts, predict disease, or determine flight readiness. It shows how molecular data from short-duration spaceflight can become a clearer mission briefing.*
