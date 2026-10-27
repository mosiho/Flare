"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import type { Dictionary } from "@/dictionaries";

type Props = {
  dict: Dictionary["network"];
  imageSrc?: string;
};

export default function Network({
  dict,
  imageSrc = "/images/atelier-memory-flow.jpg",
}: Props) {
  return (
    <section className="section-pad border-t border-surface-border bg-bg-elevated">
      <div className="section-max">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-accent">{dict.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.85rem)] leading-[1.15] tracking-tight text-balance">
            {dict.headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{dict.body}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 sm:mt-12">
          <figure className="overflow-hidden">
            <Image
              src={imageSrc}
              alt={dict.imageAlt}
              width={1536}
              height={1024}
              sizes="(max-width: 1152px) 100vw, 72rem"
              className="h-auto w-full"
              priority={false}
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
