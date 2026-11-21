"use client";

import { useEffect, useRef, useState } from "react";

/** Feature checks run once on the client. Nothing here touches a GPU context
 *  that it does not immediately release, so no stray contexts are left open. */
export function supportsWebGL(version: 1 | 2): boolean {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext(version === 2 ? "webgl2" : "webgl");
    const ok = !!gl;
    (gl as WebGLRenderingContext | null)?.getExtension("WEBGL_lose_context")?.loseContext();
    return ok;
  } catch {
    return false;
  }
}

export async function supportsWebGPU(): Promise<boolean> {
  try {
    if (typeof navigator === "undefined" || !("gpu" in navigator)) return false;
    const adapter = await navigator.gpu.requestAdapter();
    return !!adapter;
  } catch {
    return false;
  }
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/**
 * True while the element is near the viewport. Heavy effects mount only then
 * and unmount (disposing their GPU resources) once scrolled well away, so at
 * most one or two GPU contexts are ever alive at the same time.
 */
export function useNearViewport<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, near] as const;
}
