"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface NavProps {
  /** True once CinematicIntro has finished — the nav fades in alongside
   * the Hero reveal, never over the intro overlay. */
  revealed: boolean;
}

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * Minimal fixed nav: wordmark left, links right. Deliberately quiet —
 * no background chrome, no box shadow — so it never competes with the
 * hero typography underneath it.
 */
export default function Nav({ revealed }: NavProps) {
  const navRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    if (!revealed || hasRevealedRef.current) return;
    hasRevealedRef.current = true;

    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      gsap.to(nav, { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 });
    }, nav);

    return () => ctx.revert();
  }, [revealed]);

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-paper/80 px-6 py-5 backdrop-blur-md opacity-0 sm:px-8 border-b border-forest/10"
    >
      <a
        href="#"
        className="font-display text-sm font-extrabold uppercase tracking-tight"
      >
        <span className="text-ink">Flash </span>
        <span className="bg-gradient-to-r from-forest to-terracotta bg-clip-text text-transparent">
          Tale
        </span>
      </a>

      <a
        href="#work"
        className="font-body text-[11px] uppercase tracking-[0.25em] text-ink/80 transition-colors hover:text-terracotta sm:hidden"
      >
        Menu
      </a>

      <ul className="hidden items-center gap-8 sm:flex">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-body text-[11px] uppercase tracking-[0.25em] text-ink/80 transition-colors hover:text-terracotta font-medium"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
