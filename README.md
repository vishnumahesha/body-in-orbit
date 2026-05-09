# Body in Orbit

> A communication-safety prototype for post-flight molecular debriefs of Inspiration4 omics data.

**Track 3 — Communication & Visualization** · Torchlight Summit Biosovereignty Hackathon 2026 · Team 3 · Vishnu Mahesha (Rouse High School / Alpha X Program)

🚀 **Live demo:** [body-in-orbit.vercel.app](https://body-in-orbit.vercel.app)
📂 **Repo:** [github.com/vishnumahesha/body-in-orbit](https://github.com/vishnumahesha/body-in-orbit)

The live experience opens with a monitor-style mission console, then routes into a 7-slide scroll-driven Mission Summary before the crew debrief dashboard. The story explains why the data matters, why raw omics data is hard to communicate safely, and why every claim needs an evidence boundary.

---

## Headline Finding

> **The crew landed in three days. The biology did not land all at once.**

Across the Inspiration4 crew (n=4), molecular signals shifted in five biological domains and recovered at five different rates. Some markers returned toward baseline by R+82. Others remained perturbed at R+194. The hardest part of communicating this data is not finding signals — it is communicating what they do, and do not, prove.

---

## Mission Context

| Field | Value |
|---|---|
| Mission | Inspiration4 (Sept 2021) |
| Crew | 4 civilians |
| Duration | 71 hours, 49 minutes |
| Orbit altitude | ~585 km |
| Sampling window | 289 days (L-92 → R+194) |
| Data source | NASA Open Science Data Repository (OSDR) / SOMA consortium |

---

## The Living Baseline

The signature figure of this report. Five biological domains × six mission phases. Distance from center is a baseline-relative perturbation score (0–3) — a **communication score, not clinical severity.**

![The Living Baseline — five domains across six mission phases, baseline-relative perturbation score 0–3](public/figures/living-baseline.png)

→ View interactive version at [body-in-orbit.vercel.app](https://body-in-orbit.vercel.app)

---

## Findings by Domain

All scores are baseline-relative (this crew member vs. their own pre-flight reference). Not population norms. Not clinical thresholds.

| Domain | R+1 score | R+82 score | Evidence type | Datasets |
|---|---|---|---|---|
| **Immune regulation** | 3 / 3 | 2 / 3 (partial recovery) | Direct (cytokine multiplex, q<0.05) | OSD-575, OSD-656, OSD-570, OSD-569 |
| **Oxidative response** | 2 / 3 | 1 / 3 (layered: 93% EVP recovered, 73% plasma still shifted) | Direct (proteomics, EVP) | OSD-571, OSD-656 |
| **Energy metabolism** | 2 / 3 | 1 / 3 (partial) | Pathway-level (OXPHOS enrichment, immune-cell context) | OSD-575, OSD-571, OSD-569 |
| **Genome / telomere** | 2 / 3 | uncertain (bidirectional, n=4) | Direct (DBS in-flight measurement) | OSD-569, OSD-570 |
| **Microbiome** | 2 / 3 | partial / unresolved | Ecological (16S, metagenomics, host-microbe coupling) | OSD-572, OSD-573, OSD-630, OSD-574 |

→ Full per-claim evidence: [docs/EVIDENCE_LEDGER.md](docs/EVIDENCE_LEDGER.md)

---

## What This Report Does NOT Claim

This is a communication-safety prototype, not a clinical instrument.

- **NOT a diagnosis.** No condition is named or implied.
- **NOT a treatment recommendation.** No interventions are advised.
- **NOT a flight clearance.** No mission readiness is determined here.
- **NOT a forecast.** Recovery patterns from n=4 do not predict individual outcomes.
- **NOT a population norm.** All scores are this astronaut versus their own pre-flight baseline.

Forbidden terms anywhere in astronaut-facing copy: *diagnose, disease, abnormal, dangerous, damaged, treatment, clearance, safe, unsafe, healthy, unhealthy, predicts, clinically significant, pathology, caused by, infection.* These appear only inside explicit "do not conclude" sections.

→ Full design rules: [docs/DESIGN_PHILOSOPHY.md](docs/DESIGN_PHILOSOPHY.md)

---

## Datasets

12 OSDR datasets spanning 5 domains and 10 timepoints (L-92 through R+194):

| OSDR ID | Description | Modality |
|---|---|---|
| OSD-572 | Crew skin/oral/nasal swabs | Microbiome |
| OSD-573 | Dragon capsule swabs | Microbiome (environment) |
| OSD-575 | Serum metabolic panel + cytokine arrays | Metabolomics, immune |
| OSD-571 | Plasma metabolomics, EVP & plasma proteomics | Multi-omics, oxidative |
| OSD-656 | Urine inflammation panel (NULISAseq) | Immune, oxidative |
| OSD-630 | Stool metagenomics | Microbiome |
| OSD-569 | Whole blood profiling (RNA, m6A, CBC) | Multi-omics |
| OSD-570 | PBMC profiling (snRNA, ATAC, VDJ) | Immune, genome |
| OSD-574 | Deltoid skin biopsies + microbiome | Skin, microbiome |

→ Full inventory + data shape per dataset: [data/notebookDatasets.ts](data/notebookDatasets.ts)
→ Analysis methods: [docs/METHODS_NOTE.md](docs/METHODS_NOTE.md) · [analysis/methods_note.md](analysis/methods_note.md)

---

## Source Papers

Eight 2024 SOMA consortium publications:

- Kim et al. *Nat Commun* 2024 — [10.1038/s41467-024-49211-2](https://doi.org/10.1038/s41467-024-49211-2) (immune)
- Houerbi et al. *Nat Commun* 2024 — [10.1038/s41467-024-48841-w](https://doi.org/10.1038/s41467-024-48841-w) (secretome, recovery split)
- Garcia-Medina et al. *Precis Clin Med* 2024 — [10.1093/pcmedi/pbae007](https://doi.org/10.1093/pcmedi/pbae007) (telomere)
- Tierney et al. *Nat Microbiol* 2024 — [10.1038/s41564-024-01635-8](https://doi.org/10.1038/s41564-024-01635-8) (microbiome)
- Park et al. *Nat Commun* 2024 — [10.1038/s41467-024-48625-2](https://doi.org/10.1038/s41467-024-48625-2) (skin spatial)
- Overbey et al. *Nat Commun* 2024 — [10.1038/s41467-024-48806-z](https://doi.org/10.1038/s41467-024-48806-z) (SOMA)
- Overbey et al. *Nature* 2024 — [10.1038/s41586-024-07639-y](https://doi.org/10.1038/s41586-024-07639-y) (SOMA flagship)
- Grigorev et al. *Nat Commun* 2024 — [10.1038/s41467-024-48929-3](https://doi.org/10.1038/s41467-024-48929-3) (direct RNA sequencing)

---

## Design Philosophy

Three principles. Full document at [docs/DESIGN_PHILOSOPHY.md](docs/DESIGN_PHILOSOPHY.md).

1. **Visualize scientific responsibility, not just biology.** Every signal is paired with what it does not prove.
2. **n=4 is not a footnote.** Sample size constrains every score, every claim, every animation. Findings are classified Supported / Monitoring Signal / Overclaim — never as clinical conclusions.
3. **Built for the crew.** Test for every line: could a mission specialist read this and understand what it means for their body?

---

## Interactive Components

The live site has a scroll-driven mission summary plus eleven evidence-linked dashboard sections:

1. **Mission Summary** — 7-slide scroll story explaining the mission, sampling timeline, data overload problem, and why communication safety matters.
2. **Mission Questions Bar** — maps the hackathon questions directly to the relevant dashboard sections.
3. **Crew Selector** — choose C001–C004; the site retargets to that crew member's baseline-relative report.
4. **The Living Baseline** — signature slope chart showing five biological domains across mission phases.
5. **Phase Detail** — animated radial chart with phase-level explanation.
6. **Personal Debrief** — crew-facing explanation of what changed, what needs monitoring, and what the data cannot prove.
7. **Evidence Receipts** — per-domain receipts: claim, evidence, sample type, timepoint, score reasoning, and do-not-conclude boundary.
8. **Sample Coverage Matrix** — 12 datasets × 10 timepoints; clearly marks collected data, differential anchors, and gaps.
9. **Communication Safety Check** — claim-classification interaction: Supported / Monitoring Signal / Overclaim.
10. **Monitoring Planner** — compares 3-day, 30-day, and 180-day monitoring priorities as planning scenarios, not forecasts.
11. **Voice Debrief** — approved-script reader with constrained language.
12. **Printable BioBrief** — single-page mission dossier with print-CSS export.

---

## How to View

**Easiest:** open the live demo at [body-in-orbit.vercel.app](https://body-in-orbit.vercel.app)

**Run locally:**
```bash
git clone https://github.com/vishnumahesha/body-in-orbit
cd body-in-orbit
npm install
npm run dev
# → http://localhost:3000
```

**Reproduce the analysis:** see [analysis/methods_note.md](analysis/methods_note.md) for the OSDR data fetch pattern and notebook export.

---

## AI Usage

AI was used throughout the project as a development, writing, and review partner. The goal was not to let AI invent conclusions, but to help move faster while keeping the science readable and careful.

Claude and ChatGPT helped with three main parts of the project:

- turning technical biology terms into language a non-specialist could understand
- checking the site's wording so research signals did not sound like diagnoses, predictions, or medical clearance
- building and refining the React / Next.js interface under hackathon time constraints

This mattered because the project is not only about showing Inspiration4 molecular data. It is about showing how that data can be communicated responsibly. A lot of the work was asking: "Does this sentence sound too certain?" "Does this imply causation?" "Would a crew member understand this without being misled?"

AI helped draft and revise interface copy for evidence receipts, claim boundaries, monitoring explanations, the mission summary, and the voice debrief scripts. It also helped generate and debug components for the crew selector, charts, claim review flow, and printable BioBrief.

AI did not decide the biological findings. The scientific claims were constrained by the OSDR datasets, published SOMA papers, the evidence ledger, and the project's claim-boundary rules. When a claim went beyond what the data could support, it was either softened, moved into a monitoring category, or rejected as an overclaim.

In practice, AI was used the same way the site asks users to use data: as a tool for translation and review, not as a source of unchecked certainty.

---

## Project Documents

- [Proposal](docs/proposal.md) — problem statement and approach (Checkpoint 1 artifact)
- [Design Philosophy](docs/DESIGN_PHILOSOPHY.md) — communication-safety design rules
- [Methods Note](docs/METHODS_NOTE.md) — data pipeline, scoring, AI usage, limitations
- [Evidence Ledger](docs/EVIDENCE_LEDGER.md) — every claim traced to dataset and source

---

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind · Framer Motion · Three.js / R3F · Unicorn Studio · Vercel

---

## License

MIT — see [LICENSE](LICENSE)

---

> **Cleared for communication. Not cleared for overclaiming.**
> 
