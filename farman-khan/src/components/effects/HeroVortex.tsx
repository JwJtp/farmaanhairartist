"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { supportsWebGL, useNearViewport } from "./support";

// The original Originkit Vortex, loaded only in the browser and only when needed.
const Vortex = dynamic(() => import("./originkit/Vortex"), { ssr: false });

/** Champagne/bronze tuning. Phones get a lighter particle budget. */
function vortexProps(mobile: boolean) {
  return {
    background: "transparent",
    topRadius: 420,
    waistRadius: 48,
    waistPosition: 46,
    bottomRadius: 1250,
    twist: 3,
    zoom: mobile ? 64 : 72,
    speed: 5,
    direction: "right",
    lineOptions: { count: mobile ? 100 : 170, color: "#C6A477", glow: 6 },
    dots: true,
    dotOptions: { count: mobile ? 1500 : 3600, size: 16, color: "#E9D6B4", glow: 6, flicker: 8 },
    comets: true,
    cometOptions: { count: mobile ? 3 : 6, speed: 4, color: "#D9A06A", glow: 6, tail: 22, delay: 8, collide: 4 },
    repel: false,
  };
}

const MASK = "radial-gradient(ellipse 62% 78% at 50% 55%, #000 55%, transparent 100%)";

/** Sits behind the hero copy, with a static gold glow underneath as the fallback. */
export default function HeroVortex() {
  const [state, setState] = useState<{ ok: boolean; mobile: boolean }>({ ok: false, mobile: false });
  const [ref, near] = useNearViewport<HTMLDivElement>("0px");

  useEffect(() => {
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const light = !window.matchMedia("(min-width: 768px)").matches || (!!mem && mem < 4);
    setState({ ok: supportsWebGL(2) || supportsWebGL(1), mobile: light });
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_55%,rgba(198,164,119,0.16),transparent_60%)]" />
      {state.ok && near && (
        <div
          className="absolute inset-y-0 left-[-30%] w-[160%] opacity-90 mix-blend-screen [contain:strict] md:left-[22%] md:w-[88%]"
          style={{ maskImage: MASK, WebkitMaskImage: MASK }}
        >
          <Vortex {...vortexProps(state.mobile)} />
        </div>
      )}
    </div>
  );
}
