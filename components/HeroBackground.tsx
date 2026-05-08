"use client";

import { useEffect, useRef } from "react";

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js";
    script.onload = async () => {
      try {
        const scene = await (window as any).UnicornStudio.addScene({
          elementId: "unicorn-bg",
          projectId: "f930H2fgrDSWGwbXCGWv",
          scale: 0.5,
          dpi: 1,
          fps: 30,
          lazyLoad: true,
          production: true,
        });
        sceneRef.current = scene;
      } catch (e) {
        console.warn("Unicorn Studio failed to load:", e);
      }
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
      if (sceneRef.current?.destroy) sceneRef.current.destroy();
    };
  }, []);

  return (
    <div
      id="unicorn-bg"
      ref={containerRef}
      className="fixed inset-0 z-0 w-full h-screen pointer-events-none"
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
