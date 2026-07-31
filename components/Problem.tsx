"use client";

import Reveal from "./Reveal";
import type { Dictionary } from "@/dictionaries";

type Props = {
  dict: Dictionary["problem"];
};

export default function Problem({ dict }: Props) {
  return (
    <section id="thesis" className="section-pad border-t border-surface-border bg-bg">
      <div className="section-max max-w-3xl">
        <Reveal>
          <p className="text-sm text-accent">{dict.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.85rem)] leading-[1.15] tracking-tight text-balance">
            {dict.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{dict.body}</p>
          <p className="mt-8 font-display text-xl leading-snug text-fg sm:text-2xl">
            {dict.closer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
