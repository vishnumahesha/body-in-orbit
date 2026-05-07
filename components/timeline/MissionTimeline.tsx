"use client";

import { CoverageDot } from "./CoverageDot";

type Timepoint = "L-92" | "L-44" | "L-3" | "FD1" | "FD2" | "FD3" | "R+1" | "R+45" | "R+82" | "R+194";
type CoverageStatus = "collected" | "partial" | "missing";

interface AssayCoverage {
  assay: string;
  coverage: Record<Timepoint, CoverageStatus>;
}

const timelineData: AssayCoverage[] = [
  {
    assay: "Single-cell multiome",
    coverage: {
      "L-92": "collected",
      "L-44": "collected",
      "L-3": "collected",
      "FD1": "missing",
      "FD2": "missing",
      "FD3": "missing",
      "R+1": "collected",
      "R+45": "collected",
      "R+82": "collected",
      "R+194": "collected",
    },
  },
  {
    assay: "Cytokine profiling",
    coverage: {
      "L-92": "collected",
      "L-44": "collected",
      "L-3": "collected",
      "FD1": "missing",
      "FD2": "missing",
      "FD3": "missing",
      "R+1": "collected",
      "R+45": "collected",
      "R+82": "collected",
      "R+194": "collected",
    },
  },
  {
    assay: "Plasma proteomics",
    coverage: {
      "L-92": "collected",
      "L-44": "collected",
      "L-3": "collected",
      "FD1": "missing",
      "FD2": "missing",
      "FD3": "missing",
      "R+1": "collected",
      "R+45": "collected",
      "R+82": "collected",
      "R+194": "missing",
    },
  },
  {
    assay: "Metabolomics",
    coverage: {
      "L-92": "collected",
      "L-44": "collected",
      "L-3": "collected",
      "FD1": "missing",
      "FD2": "missing",
      "FD3": "missing",
      "R+1": "collected",
      "R+45": "collected",
      "R+82": "collected",
      "R+194": "missing",
    },
  },
  {
    assay: "EVP proteomics",
    coverage: {
      "L-92": "collected",
      "L-44": "collected",
      "L-3": "collected",
      "FD1": "missing",
      "FD2": "missing",
      "FD3": "missing",
      "R+1": "collected",
      "R+45": "collected",
      "R+82": "collected",
      "R+194": "missing",
    },
  },
  {
    assay: "Telomere DBS",
    coverage: {
      "L-92": "collected",
      "L-44": "collected",
      "L-3": "collected",
      "FD1": "collected",
      "FD2": "collected",
      "FD3": "collected",
      "R+1": "collected",
      "R+45": "collected",
      "R+82": "collected",
      "R+194": "missing",
    },
  },
  {
    assay: "Microbiome swabs",
    coverage: {
      "L-92": "missing",
      "L-44": "collected",
      "L-3": "missing",
      "FD1": "missing",
      "FD2": "collected",
      "FD3": "collected",
      "R+1": "collected",
      "R+45": "missing",
      "R+82": "missing",
      "R+194": "missing",
    },
  },
  {
    assay: "Skin biopsy",
    coverage: {
      "L-92": "missing",
      "L-44": "collected",
      "L-3": "missing",
      "FD1": "missing",
      "FD2": "missing",
      "FD3": "missing",
      "R+1": "collected",
      "R+45": "missing",
      "R+82": "missing",
      "R+194": "missing",
    },
  },
];

const timepoints: Timepoint[] = ["L-92", "L-44", "L-3", "FD1", "FD2", "FD3", "R+1", "R+45", "R+82", "R+194"];
const inflightTimepoints: Timepoint[] = ["FD1", "FD2", "FD3"];

export function MissionTimeline() {
  return (
    <div className="bg-[#05070F]/50 border border-[#1E293B] rounded-2xl p-6 overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header row */}
        <div className="grid grid-cols-[200px_repeat(10,1fr)] gap-3 mb-4">
          <div className="font-mono text-xs text-[#94A3B8]"></div>
          {timepoints.map((tp) => {
            const isInFlight = inflightTimepoints.includes(tp);
            return (
              <div key={tp} className="text-center">
                {isInFlight && (
                  <div className="font-mono text-[8px] text-[#06B6D4] mb-1 uppercase tracking-wider">
                    IN-FLIGHT
                  </div>
                )}
                <div
                  className={`font-mono text-xs ${
                    isInFlight ? "text-[#06B6D4]" : "text-[#94A3B8]"
                  }`}
                >
                  {tp}
                </div>
              </div>
            );
          })}
        </div>

        {/* Data rows */}
        {timelineData.map((row) => (
          <div
            key={row.assay}
            className="grid grid-cols-[200px_repeat(10,1fr)] gap-3 items-center py-2"
          >
            <div className="font-mono text-xs text-[#94A3B8] whitespace-nowrap">
              {row.assay}
            </div>
            {timepoints.map((tp) => {
              const isInFlight = inflightTimepoints.includes(tp);
              return (
                <div
                  key={tp}
                  className={`flex justify-center ${
                    isInFlight ? "bg-[#06B6D4]/5 -mx-1.5 px-1.5 py-2" : ""
                  }`}
                >
                  <CoverageDot
                    status={row.coverage[tp]}
                    inFlight={isInFlight}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="font-inter text-sm italic text-[#64748B] mt-6">
        A missing dot is not a failed result. It is part of the evidence boundary.
      </p>
    </div>
  );
}
