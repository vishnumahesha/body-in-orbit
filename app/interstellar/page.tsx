"use client";
import dynamic from "next/dynamic";

const InterstellarScene = dynamic(
  () => import("@/components/3d/InterstellarScene").then((mod) => ({ default: mod.InterstellarScene })),
  { ssr: false, loading: () => <div className="w-full h-screen bg-black" /> }
);

export default function InterstellarPage() {
  return <InterstellarScene className="w-full h-screen" />;
}
