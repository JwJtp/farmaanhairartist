"use client";

import { motion } from "framer-motion";

/** Fade-and-rise on first view. MotionConfig(reducedMotion="user") disables the movement when asked. */
export default function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow mb-5 flex items-center gap-4 data-[c=true]:justify-center" data-c={align === "center"}>
        <span className="h-px w-10 bg-champagne/60" /> {eyebrow}
      </p>
      <h2 className="display text-5xl sm:text-6xl lg:text-7xl">
        {title} {accent && <em className="font-normal italic text-champagne">{accent}</em>}
      </h2>
      {intro && <p className="mt-6 max-w-xl text-base leading-relaxed text-beige/70 data-[c=true]:mx-auto" data-c={align === "center"}>{intro}</p>}
    </Reveal>
  );
}
