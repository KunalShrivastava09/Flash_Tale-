"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Client } from "@/data/clients";

interface ClientMarqueeProps {
  clients: Client[];
}

interface ClientFrameProps {
  client: Client;
  index: number;
}

// Subtle width variation per index for an authentic film-strip / contact-sheet rhythm
function getFrameWidthClass(index: number): string {
  const mod = index % 3;
  if (mod === 0) return "min-w-[190px] sm:min-w-[240px] md:min-w-[280px]";
  if (mod === 1) return "min-w-[220px] sm:min-w-[270px] md:min-w-[320px]";
  return "min-w-[200px] sm:min-w-[250px] md:min-w-[295px]";
}

function ClientFrame({ client, index }: ClientFrameProps) {
  const widthClass = getFrameWidthClass(index);
  const frameNumber = String((index % 8) + 1).padStart(2, "0");

  return (
    <div
      className={`group relative flex h-14 shrink-0 items-center justify-center border border-forest/20 bg-paper-light/60 px-6 transition-all duration-300 ease-out hover:scale-[1.02] hover:border-forest/40 hover:bg-paper-light sm:h-18 sm:px-8 md:h-20 ${widthClass}`}
    >
      {/* Subtle contact-sheet frame index */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 top-1.5 font-body text-[8px] tracking-[0.2em] text-olive/70 tabular-nums uppercase transition-colors duration-300 group-hover:text-forest sm:left-3.5 sm:top-2 sm:text-[9px]"
      >
        {frameNumber}
      </span>

      {client.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={client.logo}
          alt={client.name}
          className="max-h-6 w-auto object-contain opacity-75 transition-opacity duration-300 group-hover:opacity-100 sm:max-h-8"
        />
      ) : (
        <span className="select-none font-display text-xs font-bold uppercase tracking-[0.25em] text-forest transition-colors duration-300 group-hover:text-ink sm:text-sm md:text-base">
          {client.name}
        </span>
      )}
    </div>
  );
}

/**
 * Two horizontal marquee rows with seamless GSAP looping in opposing directions.
 * Includes subtle deceleration on hover via GSAP timeScale without freezing.
 */
export default function ClientMarquee({ clients }: ClientMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!container || !track1 || !track2) return;

    let tween1: gsap.core.Tween | null = null;
    let tween2: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      // Row 1: Right -> Left
      tween1 = gsap.fromTo(
        track1,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 32,
          ease: "none",
          repeat: -1,
        }
      );

      // Row 2: Left -> Right
      tween2 = gsap.fromTo(
        track2,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 36,
          ease: "none",
          repeat: -1,
        }
      );
    }, container);

    const handleMouseEnter = () => {
      if (tween1 && tween2) {
        gsap.to([tween1, tween2], {
          timeScale: 0.35,
          duration: 0.6,
          ease: "power1.out",
        });
      }
    };

    const handleMouseLeave = () => {
      if (tween1 && tween2) {
        gsap.to([tween1, tween2], {
          timeScale: 1,
          duration: 0.6,
          ease: "power1.out",
        });
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      ctx.revert();
    };
  }, []);

  // Duplicate for seamless 50% translation loop
  const row1Items = [...clients, ...clients];
  // Offset row 2 so vertically adjacent items differ
  const row2Source = [...clients.slice(4), ...clients.slice(0, 4)];
  const row2Items = [...row2Source, ...row2Source];

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-3.5 overflow-hidden py-2 sm:gap-5"
      aria-label="Client marquee"
    >
      {/* Row 1: Right to Left */}
      <div className="flex w-max gap-3.5 sm:gap-5" ref={track1Ref}>
        {row1Items.map((client, index) => (
          <ClientFrame
            key={`row1-${client.name}-${index}`}
            client={client}
            index={index}
          />
        ))}
      </div>

      {/* Row 2: Left to Right */}
      <div className="flex w-max gap-3.5 sm:gap-5" ref={track2Ref}>
        {row2Items.map((client, index) => (
          <ClientFrame
            key={`row2-${client.name}-${index}`}
            client={client}
            index={index + 4}
          />
        ))}
      </div>
    </div>
  );
}
