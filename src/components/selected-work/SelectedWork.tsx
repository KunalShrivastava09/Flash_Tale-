"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectItem from "./ProjectItem";
import { projects } from "@/data/projects";
import { WORK_LABEL, WORK_META, WORK_STATEMENT_LINES } from "@/data/copy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STATEMENT_SIZE = { fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" };

/**
 * Selected Work / Portfolio section.
 * Curated editorial showcase of films, photography, and brand productions.
 */
export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header reveal
      const headerElements = section.querySelectorAll<HTMLElement>(
        "[data-work-header]"
      );
      const lines = gsap.utils.toArray<HTMLElement>("[data-work-line]");

      const headerTrigger = {
        trigger: section,
        start: "top 78%",
        toggleActions: "play none none none",
      };

      if (reducedMotion) {
        gsap.set([...headerElements, ...lines], { opacity: 0 });
        gsap.to([...headerElements, ...lines], {
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power1.out",
          scrollTrigger: headerTrigger,
        });
      } else {
        const headerTl = gsap.timeline({ scrollTrigger: headerTrigger });

        gsap.set(headerElements, { opacity: 0 });
        headerTl.to(headerElements, {
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
          stagger: 0.06,
        });

        gsap.set(lines, {
          yPercent: 45,
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
        });
        headerTl.to(
          lines,
          {
            yPercent: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
            stagger: 0.1,
            ease: "power4.out",
            clearProps: "clipPath",
          },
          "-=0.2"
        );
      }

      // 2. Individual project scroll reveals
      const projectItems = gsap.utils.toArray<HTMLElement>(
        "[data-project-item]"
      );

      projectItems.forEach((item) => {
        const itemTrigger = {
          trigger: item,
          start: "top 82%",
          toggleActions: "play none none none",
        };

        if (reducedMotion) {
          gsap.set(item, { opacity: 0 });
          gsap.to(item, {
            opacity: 1,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: itemTrigger,
          });
        } else {
          const mediaEl = item.querySelector("[data-project-media]");
          const otherEls = item.querySelectorAll("h3, div > div, div > span");

          const itemTl = gsap.timeline({ scrollTrigger: itemTrigger });

          if (mediaEl) {
            gsap.set(mediaEl, { opacity: 0, scale: 0.96, y: 20 });
            itemTl.to(mediaEl, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            });
          }

          if (otherEls.length > 0) {
            gsap.set(otherEls, { opacity: 0, y: 12 });
            itemTl.to(
              otherEls,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.06,
                ease: "power2.out",
              },
              "-=0.6"
            );
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="border-t border-line-dark bg-forest px-6 py-20 sm:px-8 sm:py-28 lg:py-36 text-cream"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 md:mb-28">
          <div className="mb-5 flex items-center justify-between gap-4 sm:mb-7">
            <p
              data-work-header
              className="font-body text-xs uppercase tracking-[0.35em] text-cream-dim/90 font-semibold"
            >
              {WORK_LABEL}
            </p>
            <span
              data-work-header
              className="font-body text-[10px] uppercase tracking-[0.25em] text-cream-dim/60 font-semibold sm:text-xs"
            >
              {WORK_META}
            </span>
          </div>

          <h2 className="max-w-2xl font-display font-extrabold uppercase leading-[0.95] tracking-tight text-cream">
            {WORK_STATEMENT_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span data-work-line className="block" style={STATEMENT_SIZE}>
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Curated Editorial Project Showcase */}
        <div className="flex flex-col gap-20 sm:gap-28 lg:gap-36">
          {projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
