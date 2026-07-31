import Image from "next/image";
import type { Dictionary } from "@/dictionaries";

type Props = {
  dict: Dictionary["footer"];
  brand?: string;
};

export default function Footer({ dict, brand = "Flare" }: Props) {
  return (
    <footer className="border-t border-surface-border bg-bg-elevated">
      <div className="section-max flex flex-col gap-8 px-[clamp(1.25rem,5vw,4rem)] py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <Image src="/brand/mark.svg" alt="" width={26} height={26} />
            <span className="font-display text-lg tracking-tight">{brand}</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {dict.tagline}
          </p>
        </div>

        <div className="text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {brand}
          </p>
        </div>
      </div>
    </footer>
  );
}
