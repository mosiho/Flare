"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import type { Dictionary } from "@/dictionaries";

type Social = {
  name: string;
  href?: string;
  icon: (props: { className?: string }) => React.JSX.Element;
};

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.251 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 2.838 1.874 2.838 1.874 1.07 1.835 2.809 1.905 3.495 1.45.108-.897.417-1.905.76-2.341-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const SOCIALS: Social[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mosiho/",
    icon: LinkedInIcon,
  },
  { name: "X", icon: XIcon },
  { name: "Instagram", icon: InstagramIcon },
  { name: "GitHub", icon: GitHubIcon },
];

const iconClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-bg text-fg transition-all duration-300 hover:border-accent hover:bg-accent hover:text-hero-fg hover:shadow-[0_12px_40px_-12px_rgba(201,120,42,0.65)]";

type Props = {
  dict: Dictionary["contact"];
};

export default function Contact({ dict }: Props) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-surface-border bg-bg-elevated"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(201,120,42,0.12), transparent 70%)",
        }}
      />

      <div className="relative px-[clamp(1.25rem,5vw,4rem)] py-8 sm:py-10">
        <Reveal>
          <div className="section-max flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <div
                  className="absolute -inset-2 rounded-full opacity-50 blur-xl"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(circle, rgba(201,120,42,0.35), transparent 68%)",
                  }}
                />
                <div className="relative overflow-hidden rounded-full ring-1 ring-accent/30 ring-offset-2 ring-offset-bg-elevated">
                  <Image
                    src="/images/mosi.jpg"
                    alt={dict.name}
                    width={96}
                    height={96}
                    className="h-16 w-16 object-cover sm:h-20 sm:w-20"
                    priority
                  />
                </div>
              </div>

              <div className="min-w-0 text-left">
                <p className="text-xs text-accent sm:text-sm">{dict.eyebrow}</p>
                <h2 className="mt-0.5 font-display text-2xl leading-none tracking-tight text-fg sm:text-3xl">
                  {dict.name}
                </h2>
                <p className="mt-1 text-sm text-muted sm:text-base">{dict.body}</p>
              </div>
            </div>

            <ul className="flex items-center gap-2.5" aria-label={dict.socialLabel}>
              {SOCIALS.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group ${iconClass}`}
                      aria-label={`${dict.onPlatform} ${name}`}
                    >
                      <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-105" />
                    </a>
                  ) : (
                    <span
                      className={`${iconClass} cursor-default opacity-70`}
                      aria-label={`${name} ${dict.comingSoonAria}`}
                      title={dict.comingSoon}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
