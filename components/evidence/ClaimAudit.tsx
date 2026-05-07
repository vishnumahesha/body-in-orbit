import { EvidenceRecord } from "@/data/types";
import { ShieldCheck } from "lucide-react";

interface ClaimAuditProps {
  evidence: EvidenceRecord;
}

export function ClaimAudit({ evidence }: ClaimAuditProps) {
  return (
    <div className="space-y-4 p-4 bg-black border border-[#1E293B] rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
          Claim audit: verified
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
            Technical finding:
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            {evidence.technicalFinding}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
            Astronaut-facing wording:
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            {evidence.astronautSafeWording}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-red-400 mb-1">
            Do not conclude:
          </p>
          <div className="flex flex-wrap gap-2">
            {evidence.notClaiming.map((item) => (
              <span
                key={item}
                className="text-xs font-mono px-2 py-1 bg-red-950/30 border border-red-900/30 rounded text-red-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
