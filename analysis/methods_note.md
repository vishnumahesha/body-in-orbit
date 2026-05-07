# Analysis Methods

## Data Sources
All datasets loaded from NASA Open Science Data Repository (OSDR) via the official Torchlight Hackathon 2026 starter Colab notebook.

## Datasets Used
1. Crew skin/oral/nasal swabs (OSD-572)
2. Blood serum metabolic panel (OSD-575)
3. Immune & cardiac cytokine arrays (OSD-575)
4. Dragon capsule swabs (OSD-573)
5. Plasma metabolomics (OSD-571)
6. EVP proteomics (OSD-571)
7. Plasma proteomics (OSD-571)
8. Urine inflammation panel (OSD-656)
9. Stool metagenomics (OSD-630)
10. Whole blood profiling (OSD-569)
11. PBMC profiling (OSD-570)
12. Deltoid skin & microbiome (OSD-574)

## Analysis Approach
- Sample coverage inventory across all datasets and timepoints
- Precomputed differential feature counts (significant at q < 0.05)
- Domain-level evidence mapping
- Return-to-Baseline Index from abundance matrix datasets

## Limitations
- n = 4 crew members
- Many assays are ground-only (no in-flight samples)
- Some data products are fixed precomputed comparisons
- Communication metrics are not clinical risk scores
