# Design Philosophy: Body in Orbit

## Core Principle
This project treats uncertainty as part of the result, not a footnote.

## Why a Recovery Review, Not a Dashboard
Dashboards display data. Body in Orbit asks users to decide what the data means, then teaches them where their judgment fails. Every interaction is designed around one question: what are we allowed to conclude?

## The n=4 Problem
Four crew members. Every visualization, every claim, every metric in this project is calibrated against a sample size of four. We never present statistical results without acknowledging this constraint. We classify findings as Supported, Monitoring Signal, or Overclaim — never as clinical diagnoses.

## Claim Boundary Framework
Every scientific claim passes through:
- Claim → Evidence (with OSD dataset ID) → Confidence Level → Safer Wording → Operational Action

This framework is not specific to Inspiration4. It could apply to any future crew mission where molecular data needs honest communication.

## Data Shape Awareness
The starter notebook contains two types of data, and the interface never conflates them:
- **Abundance matrices** (metagenomics, cytokine panels, metabolic panel, urine, CBC): rows are features, columns are samples. We build the comparisons.
- **Pre-computed differentials** (metabolomics, proteomics, EVP, blood RNA-seq, single-cell, spatial): rows are features, columns are statistics (logFC, p, q). The comparison is fixed.

Ground-only data is never animated as a direct in-flight trajectory.

## Language Safety
This project maintains a forbidden terms list: diagnose, treat, cure, permanent damage, causes (in causal sense), proves, confirms. These words imply clinical certainty that n=4 multi-omics data cannot support.

## Built For the Crew
The test for every piece of text: could Hayley Arceneaux, Sian Proctor, or Chris Sembroski actually read this and understand what it means for their health? If not, it gets rewritten.

## AI as Tool, Not Confidence Amplifier
AI is used to help translate technical findings into astronaut-safe language, not to generate novel claims. Every AI-assisted output includes a visible safety trace showing what checks were performed.
