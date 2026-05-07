export type DataShape = "abundance_matrix" | "precomputed_differential" | "mixed";
export type CollectionMode = "ground_only" | "ground_and_flight" | "capsule_environment";

export interface NotebookDataset {
  id: string;
  osdId: string;
  label: string;
  section: number;
  dataShape: DataShape;
  collectionMode: CollectionMode;
  timepoints: string[];
  domains: string[];
  comparisonNote: string;
  caution: string;
}

export const notebookDatasets: NotebookDataset[] = [
  {
    id: "crew_swabs",
    osdId: "OSD-572",
    label: "Crew skin/oral/nasal microbial swabs",
    section: 1,
    dataShape: "abundance_matrix",
    collectionMode: "ground_and_flight",
    timepoints: ["L-92","L-44","L-3","FD2","FD3","R+1","R+45","R+82"],
    domains: ["microbiome"],
    comparisonNote: "User builds pre/in-flight/post comparisons from abundance matrices.",
    caution: "Microbiome shifts are ecological signals, not infection labels."
  },
  {
    id: "serum_metabolic",
    osdId: "OSD-575",
    label: "Blood serum metabolic panel",
    section: 2,
    dataShape: "abundance_matrix",
    collectionMode: "ground_only",
    timepoints: ["L-92","L-44","L-3","R+1","R+45","R+82"],
    domains: ["metabolism"],
    comparisonNote: "User builds pre/post/recovery comparisons.",
    caution: "Ground-only. Do not animate as in-flight trajectory."
  },
  {
    id: "serum_cytokines",
    osdId: "OSD-575",
    label: "Immune & cardiac cytokine arrays",
    section: 3,
    dataShape: "abundance_matrix",
    collectionMode: "ground_only",
    timepoints: ["L-92","L-44","L-3","R+1","R+45","R+82"],
    domains: ["immune"],
    comparisonNote: "Three panels: immune Eve, immune Alamar, cardiovascular Eve.",
    caution: "Cytokine shifts are monitoring signals, not clinical labels."
  },
  {
    id: "dragon_swabs",
    osdId: "OSD-573",
    label: "Dragon capsule microbial swabs",
    section: 4,
    dataShape: "abundance_matrix",
    collectionMode: "capsule_environment",
    timepoints: ["L-92","L-44","FD2","FD3"],
    domains: ["microbiome"],
    comparisonNote: "Compares training capsule with in-flight Dragon surfaces.",
    caution: "Environmental shifts are not crew health claims."
  },
  {
    id: "plasma_metabolomics",
    osdId: "OSD-571",
    label: "Plasma metabolomics",
    section: 5,
    dataShape: "precomputed_differential",
    collectionMode: "ground_only",
    timepoints: ["R+1 vs pre-flight"],
    domains: ["oxidative","metabolism"],
    comparisonNote: "Limma differential: R+1 vs (L-92, L-44, L-3). Positive logFC = higher post-flight.",
    caution: "Fixed comparison. Do not imply full longitudinal trajectory."
  },
  {
    id: "evp_proteomics",
    osdId: "OSD-571",
    label: "Plasma EVP proteomics",
    section: 6,
    dataShape: "precomputed_differential",
    collectionMode: "ground_only",
    timepoints: ["R+1 vs pre-flight"],
    domains: ["oxidative"],
    comparisonNote: "Limma differential: R+1 vs pre-flight.",
    caution: "EVP findings are layer-specific, not whole-body recovery."
  },
  {
    id: "plasma_proteomics",
    osdId: "OSD-571",
    label: "Plasma proteomics",
    section: 7,
    dataShape: "precomputed_differential",
    collectionMode: "ground_only",
    timepoints: ["R+1 vs pre-flight"],
    domains: ["oxidative"],
    comparisonNote: "Limma differential: pre vs post-flight.",
    caution: "Bulk plasma and EVP layers should not be collapsed into one label."
  },
  {
    id: "urine_inflammation",
    osdId: "OSD-656",
    label: "Urine inflammation panel (NULISAseq)",
    section: 8,
    dataShape: "abundance_matrix",
    collectionMode: "ground_only",
    timepoints: ["L-92","L-44","L-3","R+1","R+45","R+82"],
    domains: ["immune"],
    comparisonNote: "203 inflammatory proteins. Can compute return-to-baseline index.",
    caution: "Inflammatory changes are monitoring signals, not diagnosis."
  },
  {
    id: "stool_metagenomics",
    osdId: "OSD-630",
    label: "Stool metagenomics",
    section: 9,
    dataShape: "abundance_matrix",
    collectionMode: "ground_only",
    timepoints: ["L-92","L-44","R+45","R+82"],
    domains: ["microbiome"],
    comparisonNote: "Pre vs post gut microbiome comparisons.",
    caution: "Ground-only. No in-flight gut data."
  },
  {
    id: "whole_blood",
    osdId: "OSD-569",
    label: "Whole blood profiling (RNA, m6A, CBC)",
    section: 10,
    dataShape: "mixed",
    collectionMode: "ground_only",
    timepoints: ["L-92","L-44","L-3","R+1","R+45","R+82","R+194"],
    domains: ["genome","immune","metabolism"],
    comparisonNote: "RNA: R+82 vs pre (DESeq2). m6A: modification probabilities. CBC: clinical counts.",
    caution: "Ground-only venous blood. Not a direct in-flight trajectory."
  },
  {
    id: "pbmc",
    osdId: "OSD-570",
    label: "PBMC profiling (snRNA, ATAC, VDJ)",
    section: 11,
    dataShape: "precomputed_differential",
    collectionMode: "ground_only",
    timepoints: ["L-92","L-44","L-3","R+1","R+45","R+82"],
    domains: ["immune","genome"],
    comparisonNote: "snRNA: R+45 vs R+1. ATAC: R+1 vs pre. VDJ: clonal tracking.",
    caution: "Cell-type specific. Do not generalize to whole body."
  },
  {
    id: "deltoid_skin",
    osdId: "OSD-574",
    label: "Deltoid skin biopsies & microbiome",
    section: 12,
    dataShape: "mixed",
    collectionMode: "ground_only",
    timepoints: ["L-44","R+1"],
    domains: ["microbiome"],
    comparisonNote: "Spatial transcriptomics: R+1 vs L-44, 4 skin compartments, 18677 genes.",
    caution: "Tissue-specific. Limited to available pre/post biopsy samples."
  }
];
