"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { supportsWebGPU, useNearViewport, usePrefersReducedMotion } from "./support";

// The original Originkit WebGPU fluid simulation — only fetched if WebGPU exists.
const WaterBall = dynamic(() => import("./originkit/WaterBall"), { ssr: false });

/** Lighten a hair shade toward ivory so the water stays translucent, not ink-black. */
function liquidTone(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number, t: number) => Math.round(c + (t - c) * 0.45);
  const r = mix((n >> 16) & 255, 0xf4), g = mix((n >> 8) & 255, 0xf0), b = mix(n & 255, 0xe9);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function StaticOrb({ hex }: { hex: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="aspect-square w-[58%] max-w-[340px] rounded-full transition-[background] duration-700"
        style={{
          background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.75), ${liquidTone(hex)} 22%, ${hex} 62%, #0b0b0b 100%)`,
          boxShadow: `0 40px 120px -20px ${hex}88, inset -20px -30px 60px rgba(0,0,0,0.45)`,
        }}
      />
    </div>
  );
}

/**
 * Starts the real fluid simulation automatically when the section is on screen
 * (WebGPU browsers). The component's canvas zooms on mouse-wheel, which would
 * trap page scrolling, so wheel events are stopped before they reach it.
 * Browsers without WebGPU, and reduced-motion users, get a static liquid orb.
 */
export default function WaterBallLab({ hex }: { hex: string }) {
  const [gpu, setGpu] = useState<boolean | null>(null);
  const reduced = usePrefersReducedMotion();
  const [ref, near] = useNearViewport<HTMLDivElement>("100px");
  const wheelGuard = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supportsWebGPU().then(setGpu);
  }, []);

  useEffect(() => {
    const el = wheelGuard.current;
    if (!el) return;
    const stop = (e: WheelEvent) => e.stopPropagation(); // page still scrolls; canvas never sees it
    el.addEventListener("wheel", stop, { capture: true });
    return () => el.removeEventListener("wheel", stop, { capture: true });
  }, []);

  const live = gpu === true && near && !reduced;

  return (
    <div ref={ref} className="relative h-full w-full">
      <div ref={wheelGuard} className="absolute inset-0">
        {live ? (
          <WaterBall waterColor={liquidTone(hex)} tint={24} reflection={18} detail="small" size={115} cursorForce={30} autoRotate spinSpeed={3} />
        ) : (
          <StaticOrb hex={hex} />
        )}
      </div>
      {live && (
        <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-[10px] uppercase tracking-[0.28em] text-beige/50">
          Move across it · drag to turn
        </p>
      )}
      {gpu === false && (
        <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] uppercase tracking-[0.28em] text-beige/40">
          Live liquid version needs WebGPU (latest Chrome / Edge)
        </p>
      )}
    </div>
  );
}
