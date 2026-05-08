"use client";

import { motion } from "framer-motion";
import { FileText, Printer } from "lucide-react";

export function PrintableBioBrief() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Print Button */}
      <div className="mb-8 flex justify-end print:hidden">
        <motion.button
          onClick={handlePrint}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#06B6D4]/10 border-2 border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4]/20 transition-colors"
        >
          <Printer className="w-5 h-5" />
          <span className="font-mono text-sm">Print BioBrief</span>
        </motion.button>
      </div>

      {/* Printable Report */}
      <div className="print-report bg-[#05070F] border-2 border-[#1E293B] rounded-2xl p-12 print:border-0 print:bg-white print:text-black">
        {/* Header */}
        <div className="mb-12 print:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-[#06B6D4] print:text-black" />
            <h1 className="font-space-grotesk text-4xl font-bold text-[#F8FAFC] print:text-black">
              BioBrief
            </h1>
          </div>
          <div className="font-mono text-sm text-[#64748B] print:text-gray-600">
            Inspiration4 Post-Flight Molecular Debrief
          </div>
          <div className="font-mono text-xs text-[#64748B] print:text-gray-500 mt-1">
            Generated {new Date().toLocaleDateString()} • Baseline-relative report structure
          </div>
        </div>

        {/* Mission Summary */}
        <section className="mb-10 print:mb-6">
          <h2 className="font-space-grotesk text-2xl font-bold text-[#F8FAFC] print:text-black mb-4">
            Mission Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-4 print:gap-2">
            {[
              { label: "Crew", value: "4 civilians" },
              { label: "Duration", value: "3 days" },
              { label: "Altitude", value: "~585 km" },
              { label: "Sampling", value: "L-92 through R+194" }
            ].map((item) => (
              <div key={item.label} className="print:border print:border-gray-300 print:p-2">
                <div className="font-mono text-xs text-[#64748B] print:text-gray-600 mb-1">
                  {item.label}
                </div>
                <div className="font-space-grotesk text-lg text-[#F8FAFC] print:text-black">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Domain Status */}
        <section className="mb-10 print:mb-6">
          <h2 className="font-space-grotesk text-2xl font-bold text-[#F8FAFC] print:text-black mb-4">
            Biological Domain Status
          </h2>
          <div className="space-y-4 print:space-y-2">
            {[
              {
                domain: "Immune Regulation",
                score: 3,
                status: "Persistent perturbation",
                key: "18 markers shifted at R+1, MHC suppression through R+194"
              },
              {
                domain: "Telomere Dynamics",
                score: 3,
                status: "Bidirectional signal",
                key: "Elongation in-flight (4/4), shortening post-landing (3/4)"
              },
              {
                domain: "Oxidative Response",
                score: 2,
                status: "Partial recovery",
                key: "EVP markers 93% recovered, plasma 73% perturbed at R+82"
              },
              {
                domain: "Microbiome",
                score: 2,
                status: "Ecological shift",
                key: "Skin/oral shifts during flight, spatial transcriptomics signal"
              },
              {
                domain: "Energy Metabolism",
                score: 1,
                status: "Monitoring signal",
                key: "OXPHOS pathway enrichment in immune cells"
              }
            ].map((item) => (
              <div
                key={item.domain}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#0A0D14] border border-[#1E293B] print:border print:border-gray-300 print:bg-transparent print:p-2"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#06B6D4]/10 border-2 border-[#06B6D4] flex items-center justify-center font-space-grotesk font-bold text-[#06B6D4] print:border-black print:text-black">
                  {item.score}
                </div>
                <div className="flex-1">
                  <div className="font-space-grotesk font-semibold text-[#F8FAFC] print:text-black mb-1">
                    {item.domain}
                  </div>
                  <div className="font-mono text-xs text-[#64748B] print:text-gray-600 mb-2">
                    {item.status}
                  </div>
                  <div className="font-inter text-sm text-[#94A3B8] print:text-gray-700">
                    {item.key}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Monitoring Recommendations */}
        <section className="mb-10 print:mb-6">
          <h2 className="font-space-grotesk text-2xl font-bold text-[#F8FAFC] print:text-black mb-4">
            Monitoring Recommendations
          </h2>
          <ul className="space-y-3 print:space-y-1">
            {[
              "Continue immune panel monitoring through R+365 minimum",
              "Track telomere length and clonal hematopoiesis markers bi-annually",
              "Oxidative stress markers: quarterly assessment for next 12 months",
              "Microbiome: optional follow-up at R+365 for ecological stability",
              "Energy metabolism: cell-type specific assays if symptoms emerge"
            ].map((item, i) => (
              <li
                key={i}
                className="flex gap-3 font-inter text-sm text-[#94A3B8] print:text-gray-700"
              >
                <span className="text-[#06B6D4] print:text-black">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Critical Constraints */}
        <section className="mb-10 print:mb-6">
          <h2 className="font-space-grotesk text-2xl font-bold text-[#F8FAFC] print:text-black mb-4">
            Critical Constraints
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#8B5CF6]/5 border border-[#8B5CF6]/30 print:border print:border-gray-300 print:bg-transparent">
              <div className="font-mono text-xs text-[#8B5CF6] print:text-black mb-1">
                n = 4
              </div>
              <p className="font-inter text-sm text-[#94A3B8] print:text-gray-700">
                All findings calibrated against sample size of four crew members. Statistical significance does not equal clinical certainty.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#8B5CF6]/5 border border-[#8B5CF6]/30 print:border print:border-gray-300 print:bg-transparent">
              <div className="font-mono text-xs text-[#8B5CF6] print:text-black mb-1">
                Ground-only data predominates
              </div>
              <p className="font-inter text-sm text-[#94A3B8] print:text-gray-700">
                Most assays are pre-flight vs post-flight comparisons. Only telomeres and microbiome swabs have clear in-flight measurements.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-6 border-t-2 border-[#1E293B] print:border-gray-300">
          <p className="font-inter text-xs text-[#64748B] print:text-gray-500 italic">
            This BioBrief does not diagnose, predict disease, or determine flight readiness. Perturbation scores are communication metrics, not clinical severity ratings. Individual crew data should be interpreted as baseline-relative monitoring signals.
          </p>
          <div className="mt-4 font-mono text-xs text-[#64748B] print:text-gray-500">
            Data source: NASA OSDR / SOMA • Inspiration4 multi-omic datasets
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: letter;
            margin: 0.5in;
          }

          body {
            background: white !important;
            color: black !important;
          }

          .print-report {
            background: white !important;
            border: none !important;
            box-shadow: none !important;
          }

          .print\\:hidden {
            display: none !important;
          }

          .print\\:text-black {
            color: black !important;
          }

          .print\\:bg-white {
            background-color: white !important;
          }

          .print\\:border {
            border: 1px solid #ccc !important;
          }

          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
