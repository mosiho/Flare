"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export default function Nav({ locale, dict }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="nav-bar fixed inset-x-0 top-0 z-50"
    >
      <nav className="section-max flex items-center justify-between px-[clamp(1.25rem,5vw,4rem)] py-4">
        <Link
          href={`${localePath(locale)}#top`}
          className="flex items-center gap-2.5 text-hero-fg no-underline"
        >
          <Image src="/brand/mark.svg" alt="" width={28} height={28} priority />
          <span className="font-display text-lg tracking-tight">Flare</span>
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          <LanguageSwitcher
            locale={locale}
            labels={{ en: dict.lang.en, ro: dict.lang.ro }}
            label={dict.lang.label}
          />
          <Link
            href={localePath(locale, "/signin")}
            className="text-sm text-hero-muted transition-colors hover:text-hero-fg"
          >
            {dict.nav.signIn}
          </Link>
          {/* <a
            href="#contact"
            className="text-sm text-hero-muted transition-colors hover:text-hero-fg"
          >
            {dict.nav.getInTouch}
          </a> */}
        </div>
      </nav>
    </motion.header>
  );
}
