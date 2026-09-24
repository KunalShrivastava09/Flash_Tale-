"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CinematicVideo from "./CinematicVideo";
import { heroMedia } from "@/data/media";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface HeroProps {
  /** True once CinematicIntro has finished — gates the headline reveal so
   * it never plays underneath the intro overlay. */
  revealed: boolean;
}

const HEADLINE_LINES = ["WE CREATE", "VISUAL STORIES", "THAT MOVE."];
const ACCENT_LINE = "VISUAL STORIES";
const HEADLINE_SIZE = { fontSize: "clamp(2.75rem, 7.9vw, 7.25rem)" };

export default function Hero({ revealed }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasRevealedRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  // Initial hidden state for the reveal — kept in its own effect so it
  // re-applies correctly once reducedMotion resolves.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasRevealedRef.current) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      const rest = gsap.utils.toArray<HTMLElement>("[data-hero-rest]");

      if (reducedMotion) {
        gsap.set(lines, { opacity: 0 });
        gsap.set(rest, { opacity: 0 });
      } else {
        gsap.set(lines, { yPercent: 120, opacity: 0, clipPath: "inset(0 0 100% 0)" });
        gsap.set(rest, { opacity: 0, y: 16 });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Plays once, when the intro hands off.
  useEffect(() => {
    if (!revealed || hasRevealedRef.current) return;
    hasRevealedRef.current = true;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      const rest = gsap.utils.toArray<HTMLElement>("[data-hero-rest]");
      const tl = gsap.timeline();

      if (reducedMotion) {
        tl.to(lines, { opacity: 1, duration: 0.6, stagger: 0.08, ease: "power1.out" }).to(
          rest,
          { opacity: 1, duration: 0.5, stagger: 0.08, ease: "power1.out" },
          "-=0.2"
        );
      } else {
        tl.to(lines, {
          yPercent: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
        }).to(
          rest,
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" },
          "-=0.55"
        );
      }
    }, section);

    return () => ctx.revert();
  }, [revealed, reducedMotion]);

  // Scroll-scrubbed depth: video and headline drift at different rates as
  // the hero leaves the viewport. Independent of the reveal gate.
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const videoWrap = videoWrapRef.current;
    const content = contentRef.current;
    if (!section || !videoWrap || !content) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };

      gsap.to(videoWrap, {
        scale: 1.05,
        yPercent: 4,
        ease: "none",
        scrollTrigger: trigger,
      });

      gsap.to(content, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: trigger,
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex h-[100svh] w-full items-end overflow-hidden bg-paper sm:items-center"
    >
      <div ref={videoWrapRef} className="absolute inset-0 opacity-20">
        <CinematicVideo
          sources={heroMedia.sources}
          mobileSources={heroMedia.mobileSources}
          poster={heroMedia.poster}
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-paper via-paper/80 to-paper/40"
        />
      </div>

      {/* Micro UI — the intro's camera language, reduced to just REC and
       * a frame counter, sitting below the fixed nav */}
      <div
        data-hero-rest
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-20 flex items-center gap-2 sm:left-8 sm:top-24"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
        <span className="font-body text-[10px] uppercase tracking-[0.25em] text-forest/70 font-semibold">
          REC
        </span>
      </div>
      <div
        data-hero-rest
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-20 font-body text-[10px] tracking-[0.2em] text-forest/50 font-semibold sm:right-8 sm:top-24"
      >
        01 / 07
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex w-full flex-col gap-6 px-6 pb-14 sm:px-8 sm:pb-0 md:gap-8"
      >
        <h1 className="font-display font-extrabold uppercase leading-[0.92] tracking-tight text-ink">
          {HEADLINE_LINES.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span
                data-hero-line
                className={`block ${line === ACCENT_LINE ? "text-ink" : "text-ink"}`}
                style={HEADLINE_SIZE}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p data-hero-rest className="max-w-md font-body text-sm text-ink-muted sm:text-base md:text-lg">
          Flash Tale is a creative production studio — brand films, photography,
          and campaigns built for people who remember a good story.
        </p>

        <a
          href="#work"
          data-hero-rest
          className="group inline-flex w-fit items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink font-semibold transition-colors hover:text-terracotta"
        >
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
            View Our Work
          </span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-out group-hover:translate-x-1.5 text-terracotta"
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}
