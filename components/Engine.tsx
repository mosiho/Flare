"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import type { Dictionary } from "@/dictionaries";

type Props = {
  dict: Dictionary["engine"];
};

const stepMedia = [
  "/images/whisper-capture.jpg",
  "/images/taste-graph.jpg",
  "/images/moment-return-note.jpg",
  "/images/staff-prompt.jpg",
];

export default function Engine({ dict }: Props) {
  const reduce = useReducedMotion();
  const steps = dict.steps.map((step, index) => ({
    ...step,
    image: stepMedia[index],
  }));

  return (
    <section id="how" className="section-pad border-t border-surface-border bg-bg">
      <div className="section-max">
        <Reveal className="max-w-2xl">
          <p className="text-sm text-accent">{dict.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.85rem)] leading-[1.15] tracking-tight text-balance">
            {dict.headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{dict.body}</p>
        </Reveal>

        <ol className="relative mt-16 space-y-0 lg:mt-20">
          <div
            className="pointer-events-none absolute bottom-8 left-[1.15rem] top-8 hidden w-px bg-linear-to-b from-accent/50 via-surface-border to-accent/40 sm:left-6 lg:block"
            aria-hidden
          />

          {steps.map((step, index) => {
            const flip = index % 2 === 1;

            return (
              <li key={step.id} className="relative">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12% 0px" }}
                  transition={{
                    duration: 0.8,
                    delay: reduce ? 0 : 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={[
                    "grid items-stretch gap-0 border-t border-surface-border lg:grid-cols-2",
                    index === steps.length - 1 ? "border-b border-surface-border" : "",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "relative flex flex-col justify-center py-10 pr-0 sm:py-12 lg:py-16",
                      flip ? "lg:order-2 lg:pl-14 lg:pr-2" : "lg:pr-14 lg:pl-14",
                      "pl-12 sm:pl-16 lg:pl-14",
                    ].join(" ")}
                  >
                    <span
                      className="absolute left-0 top-10 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg font-display text-sm text-accent ring-1 ring-accent/45 sm:top-12 lg:top-16"
                      aria-hidden
                    >
                      {step.id}
                    </span>

                    <p className="font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-none tracking-tight text-fg/8">
                      {step.id}
                    </p>
                    <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.15rem)] leading-tight text-fg">
                      {step.name}
                    </h3>
                    <p className="mt-4 max-w-md text-lg leading-relaxed text-fg">
                      {step.body}
                    </p>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                      {step.detail}
                    </p>
                  </div>

                  <motion.div
                    initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-12% 0px" }}
                    transition={{
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={[
                      "relative min-h-[16rem] overflow-hidden sm:min-h-[20rem] lg:min-h-[26rem]",
                      flip ? "lg:order-1" : "",
                    ].join(" ")}
                  >
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.03]"
                    />
                    <div
                      className={[
                        "pointer-events-none absolute inset-0",
                        flip
                          ? "bg-linear-to-r from-transparent via-transparent to-bg/25"
                          : "bg-linear-to-l from-transparent via-transparent to-bg/25",
                      ].join(" ")}
                      aria-hidden
                    />
                  </motion.div>
                </motion.div>
              </li>
            );
          })}
        </ol>

        <Reveal delay={0.1} className="mt-10 flex items-center gap-4 text-sm text-muted sm:mt-12">
          <span className="h-px flex-1 bg-surface-border" aria-hidden />
          <span className="font-display text-base text-fg/70">{dict.loopAgain}</span>
          <span className="h-px flex-1 bg-surface-border" aria-hidden />
        </Reveal>
      </div>
    </section>
  );
}
