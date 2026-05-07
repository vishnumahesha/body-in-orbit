"use client";

interface CoverageDotProps {
  status: "collected" | "partial" | "missing";
  inFlight?: boolean;
}

export function CoverageDot({ status, inFlight = false }: CoverageDotProps) {
  if (status === "missing") {
    return <div className="w-3 h-3" />;
  }

  if (status === "partial") {
    return (
      <div className="w-3 h-3 rounded-full border border-[#06B6D4] bg-transparent" />
    );
  }

  // collected
  return (
    <div
      className={`w-3 h-3 rounded-full bg-[#06B6D4] ${
        inFlight ? "shadow-[0_0_8px_#06B6D4]" : ""
      }`}
    />
  );
}
