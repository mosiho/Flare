"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import HeroAtmosphere, { type HeroAtmosphereProps } from "./HeroAtmosphere";
import LanguageSwitcher from "./LanguageSwitcher";

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

const fieldClass =
  "mt-2 w-full border border-hero-fg/15 bg-hero-fg/[0.06] px-3.5 py-3 text-sm text-hero-fg outline-none transition-colors placeholder:text-hero-fg/35 focus:border-accent focus:ring-1 focus:ring-accent";

type Props = {
  locale: Locale;
  dict: Dictionary;
  brand?: string;
  atmosphere?: HeroAtmosphereProps;
  basePath?: string;
};

export default function SignIn({
  locale,
  dict,
  brand = "Flare",
  atmosphere,
  basePath = "",
}: Props) {
  const t = dict.signIn;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const brandClass =
    brand.length > 8
      ? "font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.92] tracking-tight text-hero-fg text-balance"
      : "font-display text-[clamp(3rem,10vw,5.5rem)] leading-[0.9] tracking-tight text-hero-fg";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError(t.errorEmail);
      return;
    }
    if (password.length < 8) {
      setError(t.errorPassword);
      return;
    }

    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("idle");
      setError(t.errorCredentials);
    }, 1400);
  }

  return (
    <div className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroAtmosphere {...atmosphere} />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#0c0a08]/85 via-transparent to-[#0c0a08]/45 lg:bg-gradient-to-r lg:from-[#0c0a08]/55 lg:via-transparent lg:to-[#0c0a08]/70"
        aria-hidden
      />

      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="nav-bar relative z-20"
      >
        <nav className="section-max flex items-center justify-between px-[clamp(1.25rem,5vw,4rem)] py-4">
          <Link
            href={localePath(locale, "", basePath)}
            className="flex items-center gap-2.5 text-hero-fg no-underline"
          >
            <Image src="/brand/mark.svg" alt="" width={28} height={28} priority />
            <span className="font-display text-lg tracking-tight">{brand}</span>
          </Link>
          <div className="flex items-center gap-5 sm:gap-7">
            <LanguageSwitcher
              locale={locale}
              labels={{ en: dict.lang.en, ro: dict.lang.ro }}
              label={dict.lang.label}
              basePath={basePath}
            />
            <Link
              href={`${localePath(locale, "", basePath)}#contact`}
              className="text-sm text-hero-muted transition-colors hover:text-hero-fg"
            >
              {t.getInTouch}
            </Link>
          </div>
        </nav>
      </motion.header>

      <main className="relative z-10 flex flex-1 items-end lg:items-center">
        <div className="section-max grid w-full gap-12 px-[clamp(1.25rem,5vw,4rem)] pb-[clamp(2.5rem,8vh,5rem)] pt-10 lg:grid-cols-[1fr_minmax(20rem,24rem)] lg:items-end lg:gap-16 lg:pb-[clamp(3.5rem,10vh,6rem)]">
          <div className="max-w-xl">
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
              className="mt-5 font-display text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[1.15] tracking-tight text-balance text-hero-fg"
            >
              {t.headline}
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-4 max-w-md text-base leading-relaxed text-hero-muted sm:text-lg"
            >
              {t.sub}
            </motion.p>
          </div>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="signin-glass w-full"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-hero-muted"
                >
                  {t.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className={fieldClass}
                  disabled={status === "submitting"}
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="block text-sm text-hero-muted"
                  >
                    {t.password}
                  </label>
                  <button
                    type="button"
                    className="text-xs text-hero-fg/70 underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {t.forgot}
                  </button>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={fieldClass}
                  disabled={status === "submitting"}
                />
              </div>

              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-hero-muted">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={status === "submitting"}
                  className="size-4 accent-[var(--accent)]"
                />
                {t.remember}
              </label>

              {error ? (
                <p className="text-sm text-[#e8a07a]" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center bg-accent px-6 py-3 text-sm font-medium text-hero-fg transition-colors hover:bg-accent-deep disabled:cursor-wait disabled:opacity-80"
              >
                {status === "submitting" ? t.submitting : t.submit}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-hero-muted">
              {t.newProperty}{" "}
              <Link
                href={`${localePath(locale, "", basePath)}#contact`}
                className="text-hero-fg/90 underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {t.requestAccess}
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
