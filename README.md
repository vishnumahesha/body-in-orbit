# Body in Orbit

An interactive molecular debrief for astronauts returning from spaceflight.

## What This Is

Body in Orbit is an astronaut-facing BioBrief that translates molecular changes from the SpaceX Inspiration4 mission into a calm, scrollable narrative. Built for the Torchlight Summit Biosovereignty Hackathon (Track 3: Communication & Visualization), this tool presents multi-omic findings as a living baseline, not a clinical diagnosis.

This is a mission debrief. Every claim traces back to peer-reviewed research. No predictions, no clinical language, no alarm.

## Core Features

### Living Baseline Radial Chart
- 5 biological domains: immune, oxidative stress, energy metabolism, telomeres, microbiome
- Dynamic values based on Inspiration4 flight data
- Animated transitions between states (preflight, in-flight, recovery)

### Evidence Panels
- Source traceability for every molecular change
- 8 papers from Nature and Nature Communications
- Direct quotes and figure references
- Expandable context for deeper exploration

### Scroll Story (10 Sections)
1. **Welcome** — Mission context and interface orientation
2. **Your Living Baseline** — Introduction to the radial chart
3. **Immune System** — T cell activation, cytokine patterns
4. **Oxidative Stress** — Antioxidant response, DNA damage markers
5. **Energy Metabolism** — Mitochondrial function, metabolic shifts
6. **Telomeres** — Length changes and stability
7. **Microbiome** — Skin and gut microbial dynamics
8. **Recovery Timeline** — Post-flight normalization patterns
9. **What This Means** — Context without conclusions
10. **Next Steps** — Resources and follow-up guidance

### Language Safety System
Forbidden clinical terms (diagnosis, treatment, disease, patient, symptoms) are blocked at build time. Preferred alternatives (change, shift, pattern, crew member, observations) enforce mission-appropriate tone.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Graphics**: Custom SVG radial chart
- **Deployment**: Vercel

## Data Sources

All molecular findings sourced from 8 Inspiration4 publications:

1. Ryon et al. (2024) — Immune system
2. Tierney et al. (2024) — Multi-omic integration
3. da Silveira et al. (2024) — Immune & stress response
4. Kim et al. (2024) — Telomere dynamics
5. Overbey et al. (2024) — Skin microbiome
6. Tierney et al. (2024) — Longitudinal multi-omics
7. Houerbi et al. (2024) — Oxidative stress
8. Ryon et al. (2024) — T cell receptor diversity

Published in *Nature*, *Nature Communications*, and *Nature Medicine* (2024).

## Language Safety

### Forbidden Terms
- diagnosis, diagnose, diagnosed
- treatment, treat, therapy
- disease, disorder, condition
- patient, clinical, medical
- symptoms, pathology, prognosis
- abnormal, deficiency, impairment

### Preferred Terms
- change, shift, pattern, observation
- response, adaptation, finding
- crew member, astronaut, individual
- variation, difference, signature
- molecular landscape, biological state

The codebase includes a pre-commit check that scans all content files for forbidden terms.

## Local Development

```bash
# Clone repository
git clone <repository-url>
cd body-in-orbit

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run language safety check
npm run check-language
```

Open [http://localhost:3000](http://localhost:3000) to view the debrief.

## Deployment

Deployed on Vercel. Push to main branch triggers automatic deployment.

```bash
# Deploy to production
vercel --prod
```

## Project Philosophy

**"The safest, clearest astronaut-facing molecular debrief."**

This tool exists at the intersection of scientific rigor and human comprehension. Astronauts deserve to understand what happened to their bodies at the molecular level without wading through jargon, clinical framing, or predictive claims.

Every visualization choice, every word, every data point serves one goal: transform multi-omic complexity into a calm, accurate, actionable debrief.

This is not a medical report. This is a mission debrief.

## Project Structure

```
body-in-orbit/
├── app/
│   ├── page.tsx              # Main scroll story
│   └── layout.tsx            # Root layout
├── components/
│   ├── RadialChart.tsx       # Living baseline visualization
│   ├── EvidencePanel.tsx     # Source traceability
│   ├── ScrollSection.tsx     # Story sections
│   └── LanguageGuard.tsx     # Term validation
├── data/
│   ├── baseline-data.json    # Molecular values
│   └── papers.json           # Research sources
├── lib/
│   └── language-check.ts     # Safety validation
└── public/
    └── assets/               # Icons and graphics
```

## License

Built for Torchlight Summit Biosovereignty Hackathon 2026.

## Contact

vishnu.mahesha@2hourlearning.com

---

*Built with clarity. Backed by science. Designed for humans who fly.*
