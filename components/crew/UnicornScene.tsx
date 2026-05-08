"use client";
import { useEffect, useRef, useState } from "react";

let sdkLoaded = false;
let sdkLoading: Promise<void> | null = null;

function loadSDK(): Promise<void> {
  if (sdkLoaded) return Promise.resolve();
  if (sdkLoading) return sdkLoading;
  sdkLoading = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js";
    script.onload = () => {
      sdkLoaded = true;
      const UnicornStudio = (window as any).UnicornStudio;
      if (UnicornStudio && typeof UnicornStudio.init === "function") {
        UnicornStudio.init();
      }
      resolve();
    };
    script.onerror = () => {
      sdkLoading = null;
      resolve();
    };
    document.head.appendChild(script);
  });
  return sdkLoading;
}

export function UnicornScene({ projectId, className, fallbackLabel }: {
  projectId: string;
  className?: string;
  fallbackLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    loadSDK()
      .then(() => {
        const UnicornStudio = (window as any).UnicornStudio;
        if (UnicornStudio && typeof UnicornStudio.init === "function") {
          UnicornStudio.init();
        }
      })
      .catch(() => {
        setLoadError(true);
      });
  }, [projectId]);

  if (loadError) {
    return (
      <div
        className={`flex items-center justify-center bg-black ${className || ''}`}
        style={{ width: "100%", height: "100%" }}
      >
        <div className="font-mono text-xs uppercase tracking-wider text-[#64748B]">
          {fallbackLabel || "Portrait"}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-us-project={projectId}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
