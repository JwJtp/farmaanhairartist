"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { supportsWebGL, useNearViewport } from "./support";

// The original Originkit ray-traced glass cube (WebGL2), loaded on demand.
const TransparentGlassCube = dynamic(() => import("./originkit/TransparentGlassCube"), { ssr: false });

/** Champagne · bronze · rose gold · ivory, replacing the preset's neon palette. */
const CUBE_PROPS = {
  speed: 34,
  scale: 100,
  ior: 150,
  dispersion: 70,
  hoverGlow: 22,
  speedBoost: 40,
  colorWarm: "#C6A477",
  colorCool: "#5B3F2B",
  background: "#0B0B0B",
  advanced: {
    hotColor: "#F4E6CF",
    pinkColor: "#D9A28E",
    magentaColor: "#B7836B",
    violetColor: "#A77D58",
    rimColor: "#F4F0E9",
    rimAmount: 30,
    cubeSize: 54,
    maxPixels: 900, // cap the ray-traced pixel budget
  },
  // Override the component's 1200×800 intrinsic minimum so it fits as a small accent.
  style: { minWidth: 0, minHeight: 0 },
};

function StaticCube() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-1/2 w-1/2 rotate-[20deg] rounded-sm border border-champagne/40 bg-gradient-to-br from-champagne/30 via-[#D9A28E]/10 to-bronze/30 shadow-[0_0_60px_rgba(198,164,119,0.25)] backdrop-blur">
        <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-ivory/60 via-champagne/60 to-bronze/70" />
      </div>
    </div>
  );
}

export default function GlassCubeAccent({ className = "" }: { className?: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  const [ref, near] = useNearViewport<HTMLDivElement>("150px");

  useEffect(() => setOk(supportsWebGL(2)), []);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-obsidian ${className}`} aria-label="Decorative glass cube" role="img">
      {ok === false && <StaticCube />}
      {ok && near ? <TransparentGlassCube {...CUBE_PROPS} /> : ok !== false && <StaticCube />}
    </div>
  );
}
