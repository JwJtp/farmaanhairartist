"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import HeroVortex from "@/components/effects/HeroVortex";
import { SITE } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;
const LINES = ["Artistry", "in every", "strand."];

/**
 * Pure editorial hero: obsidian, oversized type and the gold Originkit Vortex.
 * No photograph here on purpose — the vortex is the hero image.
 */
export default function Hero() {
  return (
    <section id="top" className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-obsidian pb-16 pt-32 sm:pb-24">
      <HeroVortex />

      {/* soft warm light on the right so the composition is balanced */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_30%,rgba(167,125,88,0.14),transparent_55%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />

      {/* Floating editorial type */}
      <motion.p
        aria-hidden
        className="display text-outline pointer-events-none absolute -right-8 top-24 hidden select-none text-[13vw] italic leading-none xl:block"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 0.55, x: 0 }}
        transition={{ duration: 1.8, delay: 1.2, ease }}
      >
        Colour
      </motion.p>
      <motion.div
        aria-hidden
        className="absolute right-12 top-1/2 hidden origin-right -rotate-90 text-[10px] uppercase tracking-luxe text-beige/50 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Hair Artist — Colour Expert — {SITE.location}
      </motion.div>

      <div className="container-x relative z-10">
        <motion.p className="eyebrow mb-8 flex items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}>
          <span className="h-px w-12 bg-champagne" /> {SITE.brand} · by {SITE.name}
        </motion.p>

        <h1 className="display text-[18vw] uppercase sm:text-[15vw] md:text-[11vw] lg:text-[9.5rem] xl:text-[11rem]">
          <span className="sr-only">{SITE.brand} by {SITE.name} — Hair Artist and Hair Colour Expert in Delhi. </span>
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className={`block ${i === 1 ? "pl-[0.6em] italic normal-case text-champagne" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 1.0 + i * 0.14, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease }}
        >
          <div className="max-w-md">
            <p className="text-lg text-ivory">
              <strong className="font-serif text-2xl font-medium">
                Farmaan<span className="text-champagne">.</span>Hair Artist
              </strong>
              <br />
              <span className="text-beige/75">by {SITE.name} · Hair Artist &amp; Colour Expert</span>
            </p>
            <p className="mt-4 font-serif text-2xl italic text-champagne">&ldquo;{SITE.tagline}.&rdquo;</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#finder" className="btn-line">
              Find your cut <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#book" className="btn-gold">
              Book an appointment <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-label="Scroll to About">
        <span className="text-[9px] uppercase tracking-luxe text-beige/50">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-ivory/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scrollcue bg-champagne" />
        </span>
        <ArrowDown className="sr-only" />
      </a>
    </section>
  );
}
