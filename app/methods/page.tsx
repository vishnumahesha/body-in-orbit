import { readFile } from "node:fs/promises";
import { join } from "node:path";

import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata = {
  title: "Methods Note · Body in Orbit",
  description:
    "How Body in Orbit turns Inspiration4 molecular data into a responsible crew debrief.",
};

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold text-[#F8FAFC] mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-space-grotesk text-2xl md:text-3xl font-bold text-[#F8FAFC] mt-12 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-space-grotesk text-xl font-semibold text-[#E2E8F0] mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="font-inter text-base leading-relaxed text-[#CBD5E1] mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="font-inter text-base leading-relaxed text-[#CBD5E1] list-disc pl-6 space-y-2 mb-5">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="font-inter text-base leading-relaxed text-[#CBD5E1] list-decimal pl-6 space-y-2 mb-5">
      {children}
    </ol>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#F8FAFC]">{children}</strong>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-[#1E293B]">
      <table className="min-w-full border-collapse text-left font-inter text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-[#1E293B] bg-[#0F172A] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#94A3B8]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-[#1E293B]/70 px-4 py-3 text-[#CBD5E1]">
      {children}
    </td>
  ),
  code: ({ children }) => (
    <code className="rounded border border-[#1E293B] bg-[#020617] px-1.5 py-0.5 font-mono text-sm text-[#06B6D4]">
      {children}
    </code>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[#06B6D4] underline decoration-[#06B6D4]/40 underline-offset-4 hover:decoration-[#06B6D4]"
    >
      {children}
    </a>
  ),
};

export default async function MethodsPage() {
  const methodsPath = join(process.cwd(), "docs", "METHODS_NOTE.md");
  const markdown = await readFile(methodsPath, "utf8");

  return (
    <main className="min-h-screen bg-black px-6 py-12 md:py-20">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-10 inline-flex min-h-11 items-center rounded-xl border border-[#1E293B] px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#94A3B8] transition-colors hover:border-[#06B6D4]/40 hover:text-[#06B6D4]"
        >
          Back to debrief
        </Link>

        <div className="mb-10 border-l border-[#06B6D4]/40 pl-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#06B6D4]">
          Methods note · communication safety record
        </div>

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {markdown}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
