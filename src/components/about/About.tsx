"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MediaPlaceholder from "./MediaPlaceholder";
import { aboutMedia } from "@/data/media";
import { ABOUT_LABEL, ABOUT_STATEMENT_LINES, ABOUT_SUPPORTING } from "@/data/copy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STATEMENT_SIZE = { fontSize: "clamp(2rem, 5vw, 4.25rem)" };

/**
 * About: a small section label, a large editorial statement, a media slot,
 * and a supporting paragraph. Source order already matches the desired
 * mobile stack — desktop just repositions the same elements into a grid.
 */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const label = section.querySelector<HTMLElement>("[data-about-label]");
      const lines = gsap.utils.toArray<HTMLElement>("[data-about-line]");
      const supporting = section.querySelector<HTMLElement>("[data-about-supporting]");
      const trigger = { trigger: section, start: "top 75%", toggleActions: "play none none none" };

      if (reducedMotion) {
        gsap.set([label, ...lines, supporting, media], { opacity: 0 });
        gsap.to([label, ...lines, supporting, media], {
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power1.out",
          scrollTrigger: trigger,
        });
        return;
      }

      const tl = gsap.timeline({ scrollTrigger: trigger });

      // Section label — subtle fade.
      gsap.set(label, { opacity: 0 });
      tl.to(label, { opacity: 1, duration: 0.5, ease: "power1.out" });

      // Main statement — clip-path reveal, same language as BigStatement.
      gsap.set(lines, { yPercent: 45, opacity: 0, clipPath: "inset(0 0 100% 0)" });
      tl.to(
        lines,
        {
          yPercent: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
        },
        "-=0.2"
      );

      // Media — scales up from just-under natural size.
      if (media) {
        gsap.set(media, { scale: 0.94, opacity: 0 });
        tl.to(media, { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.7");
      }

      // Supporting paragraph — subtle upward reveal, no clip-path.
      gsap.set(supporting, { opacity: 0, y: 16 });
      tl.to(supporting, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-t border-line-dark bg-forest px-6 py-24 sm:px-8 sm:py-32 lg:py-40 text-cream"
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-10 lg:gap-x-24">
        <p
          data-about-label
          className="font-body text-xs uppercase tracking-[0.35em] text-cream-dim/90 md:col-span-2"
        >
          {ABOUT_LABEL}
        </p>

        <h2 className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-cream md:col-start-1 md:row-start-2">
          {ABOUT_STATEMENT_LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span data-about-line className="block" style={STATEMENT_SIZE}>
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div
          ref={mediaRef}
          className="relative aspect-video w-full overflow-hidden border border-line-dark md:col-start-2 md:row-start-2 md:self-center"
        >
          <MediaPlaceholder
            type={aboutMedia.type}
            src={aboutMedia.src}
            poster={aboutMedia.poster}
            alt="Flash Tale — About"
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <p
          data-about-supporting
          className="max-w-md font-body text-base text-cream-dim sm:text-lg md:col-start-1 md:row-start-3"
        >
          {ABOUT_SUPPORTING}
        </p>
      </div>
    </section>
  );
}
