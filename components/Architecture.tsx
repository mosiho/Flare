"use client";

import Reveal from "./Reveal";
import type { Dictionary } from "@/dictionaries";

type Props = {
  dict: Dictionary["architecture"];
};

export default function Architecture({ dict }: Props) {
  return (
    <section className="section-pad border-t border-surface-border bg-bg">
      <div className="section-max">
        <Reveal className="max-w-2xl">
          <p className="text-sm text-accent">{dict.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.85rem)] leading-[1.15] tracking-tight text-balance">
            {dict.headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{dict.body}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="mx-auto flex max-w-xl flex-col items-stretch gap-3">
            <div className="border border-accent/40 bg-accent/10 px-6 py-5 text-center">
              <p className="text-sm text-accent">{dict.flareLabel}</p>
              <p className="mt-1 font-display text-xl text-fg">{dict.flareTitle}</p>
            </div>
            <div className="flex justify-center" aria-hidden>
              <div className="h-7 w-px bg-surface-border" />
            </div>
            <div className="border border-surface-border bg-surface px-6 py-5 text-center">
              <p className="text-sm text-muted">{dict.pmsLabel}</p>
              <p className="mt-1 font-display text-xl text-fg">{dict.pmsTitle}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-12 grid gap-8 sm:grid-cols-3">
          {dict.flows.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-xl text-fg">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
