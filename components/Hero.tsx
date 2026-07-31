"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/dictionaries";
import HeroAtmosphere, { type HeroAtmosphereProps } from "./HeroAtmosphere";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.25 + i * 0.12,
    },
  }),
};

type Props = {
  dict: Dictionary["hero"];
  brand?: string;
  atmosphere?: HeroAtmosphereProps;
};

export default function Hero({
  dict,
  brand = "Flare",
  atmosphere,
}: Props) {
  const brandClass =
    brand.length > 8
      ? "font-display text-[clamp(2.75rem,9vw,5.75rem)] leading-[0.92] tracking-tight text-hero-fg text-balance"
      : "font-display text-[clamp(3.5rem,12vw,7.5rem)] leading-[0.9] tracking-tight text-hero-fg";

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <HeroAtmosphere {...atmosphere} />

      <div className="relative z-10 w-full section-pad pb-[clamp(3.5rem,10vh,6rem)] pt-28">
        <div className="section-max max-w-3xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className={brandClass}
          >
            {brand}
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl font-display text-[clamp(1.65rem,4.2vw,2.75rem)] leading-[1.15] tracking-tight text-balance text-hero-fg"
          >
            {dict.headline}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 max-w-md text-base leading-relaxed text-hero-muted sm:text-lg"
          >
            {dict.sub}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-accent px-6 py-3 text-sm font-medium text-hero-fg transition-colors hover:bg-accent-deep"
            >
              {dict.cta}
            </a>
            <a
              href="#how"
              className="text-sm text-hero-fg/85 underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {dict.secondary}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
