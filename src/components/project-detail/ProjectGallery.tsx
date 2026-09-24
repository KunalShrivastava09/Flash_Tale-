"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectGalleryItem } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ProjectGalleryProps {
  gallery?: ProjectGalleryItem[];
  projectTitle: string;
}

function getGalleryLayoutClass(layout?: ProjectGalleryItem["layout"]): {
  container: string;
  aspect: string;
} {
  switch (layout) {
    case "full":
      return {
        container: "max-w-7xl mx-auto w-full",
        aspect: "aspect-[21/9] sm:aspect-[2.39/1]",
      };
    case "portrait":
      return {
        container: "max-w-xl mx-auto md:ml-24",
        aspect: "aspect-[3/4] sm:aspect-[4/5]",
      };
    case "landscape":
      return {
        container: "max-w-4xl mx-auto md:mr-16",
        aspect: "aspect-[16/10]",
      };
    case "wide":
    default:
      return {
        container: "max-w-6xl mx-auto",
        aspect: "aspect-video sm:aspect-[21/9]",
      };
  }
}

/**
 * Cinematic Editorial Photo Story with dynamic frame metadata,
 * varied layout compositions, and ScrollTrigger reveals.
 */
export default function ProjectGallery({
  gallery,
  projectTitle,
}: ProjectGalleryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !gallery || gallery.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-gallery-item]");

      items.forEach((item) => {
        const trigger = {
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
            scrollTrigger: trigger,
          });
        } else {
          const media = item.querySelector("[data-gallery-media]");
          const caption = item.querySelector("[data-gallery-caption]");
          const tl = gsap.timeline({ scrollTrigger: trigger });

          if (media) {
            gsap.set(media, { opacity: 0, scale: 0.97, y: 24 });
            tl.to(media, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            });
          }

          if (caption) {
            gsap.set(caption, { opacity: 0, y: 8 });
            tl.to(
              caption,
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
              "-=0.4"
            );
          }
        }
      });
    }, container);

    return () => ctx.revert();
  }, [gallery, reducedMotion]);

  if (!gallery || gallery.length === 0) return null;

  const totalFrames = String(gallery.length).padStart(2, "0");

  return (
    <section
      ref={containerRef}
      className="border-t border-forest/15 bg-paper-light px-6 py-20 sm:px-8 sm:py-28 md:py-36 text-ink"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 sm:mb-20">
          <span className="font-body text-xs uppercase tracking-[0.35em] text-olive font-semibold">
            VISUAL STORY // {projectTitle}
          </span>
        </div>

        <div className="flex flex-col gap-20 sm:gap-28 md:gap-36">
          {gallery.map((item, index) => {
            const { container, aspect } = getGalleryLayoutClass(item.layout);
            const frameNum = String(index + 1).padStart(2, "0");

            return (
              <figure
                key={index}
                data-gallery-item
                className={`flex flex-col gap-4 ${container}`}
              >
                <div
                  data-gallery-media
                  className={`relative w-full overflow-hidden bg-paper border border-forest/20 ${aspect}`}
                >
                  {item.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    /* Photographic Film-Frame Placeholder */
                    <div
                      className="relative flex h-full w-full items-center justify-center border border-forest/25 bg-gradient-to-tr from-[#ded0b6] via-[#e6cfa7] to-[#f2e4c5] p-6 text-center"
                      aria-hidden="true"
                    >
                      {/* Viewfinder corner ticks */}
                      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-forest/30 sm:left-4 sm:top-4" />
                      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-forest/30 sm:right-4 sm:top-4" />
                      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-forest/30 sm:bottom-4 sm:left-4" />
                      <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-forest/30 sm:bottom-4 sm:right-4" />

                      <div className="flex flex-col items-center gap-2 opacity-60">
                        <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-forest sm:text-base">
                          {item.alt}
                        </span>
                        <span className="font-body text-[9px] uppercase tracking-[0.2em] text-olive font-semibold sm:text-[10px]">
                          PRODUCTION STILL // {item.layout?.toUpperCase() || "WIDE"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <figcaption
                  data-gallery-caption
                  className="flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.25em] text-forest/80 font-medium sm:text-xs"
                >
                  <span className="text-olive font-semibold">
                    FRAME {frameNum} / {totalFrames}
                  </span>
                  {item.caption && (
                    <>
                      <span className="h-px w-2.5 bg-forest/25" />
                      <span className="text-ink">{item.caption}</span>
                    </>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
