# Methods Note

## How Body in Orbit Was Built

### Data Pipeline
All data originates from the NASA Open Science Data Repository (OSDR) via the official Torchlight Hackathon 2026 starter Colab notebook. No external data sources were added.

### Datasets (12 total)
| # | Dataset | OSD ID | Data Shape | Collection |
|---|---------|--------|------------|------------|
| 1 | Crew skin/oral/nasal swabs | OSD-572 | Abundance matrix | Ground + flight |
| 2 | Blood serum metabolic panel | OSD-575 | Abundance matrix | Ground only |
| 3 | Immune & cardiac cytokines | OSD-575 | Abundance matrix | Ground only |
| 4 | Dragon capsule swabs | OSD-573 | Abundance matrix | Capsule environment |
| 5 | Plasma metabolomics | OSD-571 | Precomputed differential | Ground only |
| 6 | EVP proteomics | OSD-571 | Precomputed differential | Ground only |
| 7 | Plasma proteomics | OSD-571 | Precomputed differential | Ground only |
| 8 | Urine inflammation (NULISAseq) | OSD-656 | Abundance matrix | Ground only |
| 9 | Stool metagenomics | OSD-630 | Abundance matrix | Ground only |
| 10 | Whole blood (RNA, m6A, CBC) | OSD-569 | Mixed | Ground only |
| 11 | PBMC (snRNA, ATAC, VDJ) | OSD-570 | Precomputed differential | Ground only |
| 12 | Deltoid skin biopsies | OSD-574 | Mixed | Ground only |

### Two Data Shapes
The interface never conflates these:
- **Abundance matrices**: rows = features, columns = samples. We build the comparisons.
- **Precomputed differentials**: rows = features, columns = statistics (logFC, p, q). The comparison is fixed by the original authors.

### Perturbation Scores (0-3)
These are communication scores, not clinical severity scores. They are derived from:
- Number of significantly differential features (q < 0.05)
- Proportion of markers returning toward baseline by R+82
- Whether in-flight data exists for that domain
- Cross-domain correlation strength

Scores are calibrated per-crew-member against their own pre-flight baseline.

### Claim Boundary Framework
Every astronaut-facing sentence passes through:
1. **Claim** — what the sentence says
2. **Evidence** — which OSD dataset supports it
3. **Confidence** — high / medium-high / medium / low
4. **Safer wording** — how a flight surgeon would phrase it
5. **Do not conclude** — what this claim does NOT mean

### AI Usage
AI (Claude) was used to:
- Translate technical methods sections into astronaut-safe language
- Audit claim wording for overclaims
- Build interactive UI components from design specifications

AI was NOT used to:
- Generate scientific claims
- Interpret biological significance
- Decide perturbation scores
- Replace evidence review

### Limitations
- n = 4 crew members. No population-level inference is possible.
- Many assays are ground-only (no in-flight samples).
- Some datasets are fixed precomputed comparisons that cannot be re-analyzed.
- Perturbation scores are communication tools, not validated clinical metrics.
- Ground-only data is never animated as a direct in-flight trajectory.
