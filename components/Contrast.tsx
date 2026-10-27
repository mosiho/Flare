"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import type { Dictionary } from "@/dictionaries";

type Props = {
  dict: Dictionary["contrast"];
  imageSrc?: string;
};

export default function Contrast({
  dict,
  imageSrc = "/images/atelier-contrast.jpg",
}: Props) {
  return (
    <section className="section-pad border-t border-surface-border bg-bg">
      <div className="section-max">
        <Reveal className="max-w-xl">
          <p className="text-sm text-accent">{dict.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.85rem)] leading-[1.15] tracking-tight text-balance">
            {dict.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {dict.body}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 sm:mt-12">
          <figure>
            <Image
              src={imageSrc}
              alt={dict.imageAlt}
              width={1920}
              height={1080}
              sizes="(max-width: 1152px) 100vw, 72rem"
              className="h-auto w-full"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
