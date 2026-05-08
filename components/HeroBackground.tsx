"use client";
import dynamic from "next/dynamic";

const UnicornScene = dynamic(
  () => import("unicornstudio-react/next"),
  { ssr: false }
);

export function HeroBackground() {
  return (
    <div className="fixed inset-0 z-0 w-full h-screen">
      <UnicornScene
        projectId="zyHJsjFGn7aneecGwHL8"
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js"
        width="100%"
        height="100vh"
      />
    </div>
  );
}
