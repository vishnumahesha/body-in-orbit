"use client";

const QUESTIONS = [
  {
    label: "QUESTION 01",
    title: "What does my biology say about future mission planning?",
    body: "See how this crew member's post-flight signals compare with their own pre-flight starting point.",
    cta: "Jump to personal debrief",
    targetId: "personal-debrief",
  },
  {
    label: "QUESTION 02",
    title: "What health signals might need attention during a mission?",
    body: "Open the evidence receipts to see which domains shifted and what each signal does not prove.",
    cta: "Review evidence",
    targetId: "evidence-receipts",
  },
  {
    label: "QUESTION 03",
    title: "Which biological signals should be monitored in orbit?",
    body: "Use the monitoring planner to see which domains rise in priority as mission length increases.",
    cta: "Open monitoring planner",
    targetId: "monitoring-planner",
  },
  {
    label: "QUESTION 04",
    title: "How does my profile compare with the other crew members?",
    body: "Use the Living Baseline to compare patterns across crew members without turning them into medical rankings.",
    cta: "Compare profiles",
    targetId: "living-baseline",
  },
];

export function MissionQuestionsBar() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {QUESTIONS.map(({ label, title, body, cta, targetId }) => (
          <button
            key={targetId}
            onClick={() =>
              document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="rounded-2xl border border-red-950/60 bg-slate-950/80 p-5 shadow-[0_0_40px_rgba(127,29,29,0.18)] hover:border-cyan-400/50 hover:bg-slate-900/80 text-left transition-colors"
          >
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300">{label}</div>
            <div className="mt-3 text-base font-semibold text-slate-100">{title}</div>
            <div className="mt-2 text-sm leading-6 text-slate-400">{body}</div>
            <div className="mt-4 text-xs uppercase tracking-[0.18em] text-cyan-300">{cta} →</div>
          </button>
        ))}
      </div>
    </div>
  );
}
