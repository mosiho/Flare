"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import type { Dictionary } from "@/dictionaries";

type Props = {
  dict: Dictionary["example"];
  imageSrc?: string;
};

export default function Example({
  dict,
  imageSrc = "/images/atelier-example-box.jpg",
}: Props) {
  return (
    <section className="border-t border-surface-border bg-bg-elevated px-[clamp(1.25rem,5vw,4rem)] py-[clamp(3rem,8vh,5rem)]">
      <div className="section-max grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4] lg:sticky lg:top-24 lg:aspect-auto lg:min-h-[22rem]">
          <Image
            src={imageSrc}
            alt={dict.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-sm text-accent">{dict.eyebrow}</p>
          <h2 className="mt-2 font-display text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.15] tracking-tight text-balance">
            {dict.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{dict.body}</p>

          <div className="mt-7 border-t border-surface-border pt-6">
            <p className="text-sm text-fg">{dict.howLabel}</p>
            <ol className="mt-4 space-y-4">
              {dict.beats.map((beat, i) => (
                <li key={beat.title} className="grid grid-cols-[1.75rem_1fr] gap-3">
                  <span className="font-display text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-base text-fg">{beat.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{beat.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
