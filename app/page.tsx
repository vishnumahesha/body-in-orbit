"use client";

import { HeroBackground } from "@/components/HeroBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <HeroBackground />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-6">
          <h1 className="font-space-grotesk text-6xl md:text-8xl font-bold text-white mb-4">
            Body in Orbit
          </h1>
          <p className="font-inter text-xl md:text-2xl text-gray-400">
            Unicorn Studio WebGL Background
          </p>
        </div>
      </div>
    </div>
  );
}
