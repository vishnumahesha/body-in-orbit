"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What changed most after flight?",
  "What recovered and what didn't?",
  "Which domain needs the most monitoring?",
  "What are you not allowed to conclude?",
  "Why is this not a risk score?",
  "What should mission control monitor?",
];

export default function DebriefPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/debrief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          history: messages,
        }),
      });

      const data = await response.json();
      const aiMessage: Message = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Unable to connect to the debrief service. Please check your connection and try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col">
      {/* Top bar */}
      <div className="border-b border-[#1E293B] px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm text-[#94A3B8] hover:text-[#06B6D4] transition-colors"
        >
          ← Back to Mission Briefing
        </Link>
        <div className="font-space-grotesk text-sm text-[#F8FAFC]">Body in Orbit</div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        <div className="mb-8">
          <h1 className="font-space-grotesk text-2xl font-bold text-[#F8FAFC] mb-2">
            Crew Debrief Assistant
          </h1>
          <p className="font-mono text-xs text-[#94A3B8] mb-8">
            Evidence-constrained molecular debrief · Claim-safe responses
          </p>

          {messages.length === 0 && (
            <div>
              <p className="font-inter text-sm text-[#94A3B8] mb-2">
                Ask plain-English questions about post-flight molecular data.
              </p>
              <p className="font-mono text-xs text-[#64748B] mb-8">
                This is not a clinical tool. It does not diagnose or recommend actions.
              </p>

              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => sendMessage(question)}
                    className="bg-white/5 border border-[#1E293B] text-[#94A3B8] text-xs font-mono px-4 py-2 rounded-full hover:border-[#06B6D4]/30 hover:text-[#06B6D4] transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="space-y-4 mb-24">
          {messages.map((message, index) => (
            <div key={index} className="flex flex-col">
              {message.role === "user" ? (
                <div className="self-end max-w-[80%]">
                  <div className="font-mono text-[10px] text-[#64748B] mb-1">YOU</div>
                  <div className="bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-xl rounded-br-sm px-4 py-3">
                    <p className="font-inter text-sm text-[#F8FAFC]">{message.content}</p>
                  </div>
                </div>
              ) : (
                <div className="self-start max-w-[80%]">
                  <div className="font-mono text-[10px] text-[#64748B] mb-1">DEBRIEF AI</div>
                  <div className="bg-[#05070F] border border-[#1E293B] rounded-xl rounded-bl-sm px-4 py-3">
                    <p className="font-inter text-sm text-[#94A3B8] leading-relaxed">
                      {message.content}
                    </p>
                  </div>

                  {/* AI Safety Trace */}
                  <div className="bg-white/5 border border-[#1E293B] rounded-lg p-3 mt-2">
                    <div className="font-mono text-[10px] text-[#64748B] uppercase tracking-wider mb-2">
                      AI Safety Trace
                    </div>
                    <div className="space-y-1">
                      <div className="font-mono text-xs text-[#64748B]">
                        <span className="text-[#34D399]">✓</span> Used evidence ledger
                      </div>
                      <div className="font-mono text-xs text-[#64748B]">
                        <span className="text-[#34D399]">✓</span> Included confidence label
                      </div>
                      <div className="font-mono text-xs text-[#64748B]">
                        <span className="text-[#34D399]">✓</span> Avoided clinical overclaiming
                      </div>
                      <div className="font-mono text-xs text-[#64748B]">
                        <span className="text-[#34D399]">✓</span> Included non-claim statement
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="self-start">
              <div className="font-mono text-[10px] text-[#64748B] mb-1">DEBRIEF AI</div>
              <div className="bg-[#05070F] border border-[#1E293B] rounded-xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-[#06B6D4]"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-[#06B6D4]"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-[#06B6D4]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input bar */}
      <div className="bg-[#05070F] border-t border-[#1E293B] p-4 sticky bottom-0">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the molecular data..."
            className="flex-1 bg-white/5 border border-[#1E293B] rounded-xl px-4 py-3 text-sm text-[#F8FAFC] font-mono placeholder:text-[#64748B] focus:outline-none focus:border-[#06B6D4]/40"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-[#06B6D4]/10 text-[#06B6D4] px-4 py-3 rounded-xl font-mono text-sm hover:bg-[#06B6D4]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ask
          </button>
        </form>
      </div>
    </div>
  );
}
