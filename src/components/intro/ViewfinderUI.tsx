interface ViewfinderUIProps {
  /** Reduced-motion mode renders everything statically, already visible. */
  reducedMotion?: boolean;
}

/**
 * The camera-monitor chrome: REC indicator, timecode readout, battery,
 * ISO, resolution tags, a faint grid, and corner viewfinder brackets.
 * Purely presentational — CinematicIntro's GSAP timeline drives every
 * animated property via the `data-flash-el` hooks below.
 */
export default function ViewfinderUI({ reducedMotion = false }: ViewfinderUIProps) {
  const baseOpacity = reducedMotion ? "opacity-100" : "opacity-0";

  return (
    <div
      data-flash-el="viewfinder"
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {/* Extremely subtle guide grid — thirds, not a website grid */}
      <div
        data-flash-el="grid"
        className={`absolute inset-0 ${baseOpacity}`}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(242,228,197,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,228,197,0.06) 1px, transparent 1px)",
          backgroundSize: "33.333% 33.333%",
        }}
      />

      {/* Outer viewfinder frame corners */}
      <div data-flash-el="frame" className={`absolute inset-4 sm:inset-8 ${baseOpacity}`}>
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-cream/30 sm:h-4 sm:w-4" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-cream/30 sm:h-4 sm:w-4" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-cream/30 sm:h-4 sm:w-4" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-cream/30 sm:h-4 sm:w-4" />
      </div>

      {/* Top-left: REC */}
      <div
        data-flash-el="rec"
        className={`absolute left-4 top-4 flex items-center gap-2 sm:left-8 sm:top-8 ${baseOpacity}`}
      >
        <span
          data-flash-el="rec-dot"
          className="h-1.5 w-1.5 rounded-full bg-terracotta shadow-[0_0_0_0_rgba(183,110,80,0)]"
        />
        <span className="font-body text-[10px] uppercase tracking-[0.25em] text-cream/80 sm:text-xs">
          REC
        </span>
        <span className="h-px w-3 rotate-45 bg-cream/30" />
      </div>

      {/* Top-center: timecode */}
      <div
        data-flash-el="timecode-wrap"
        className={`absolute left-1/2 top-4 -translate-x-1/2 sm:top-8 ${baseOpacity}`}
      >
        <span
          data-flash-el="timecode"
          className="font-body text-[10px] tabular-nums tracking-[0.2em] text-cream/80 sm:text-xs"
        >
          00:00:00
        </span>
      </div>

      {/* Top-right: battery */}
      <div
        data-flash-el="battery"
        className={`absolute right-4 top-4 flex items-center gap-1.5 sm:right-8 sm:top-8 ${baseOpacity}`}
      >
        <span className="font-body text-[10px] tracking-[0.2em] text-cream/80 sm:text-xs">
          98%
        </span>
        <span className="relative block h-2.5 w-5 rounded-[2px] border border-cream/50">
          <span className="absolute inset-y-0 left-0 w-[85%] bg-cream/50" />
        </span>
      </div>

      {/* Bottom-left: ISO */}
      <div
        data-flash-el="iso"
        className={`absolute bottom-4 left-4 sm:bottom-8 sm:left-8 ${baseOpacity}`}
      >
        <span className="font-body text-[10px] tracking-[0.2em] text-cream/80 sm:text-xs">
          ISO 100
        </span>
      </div>

      {/* Bottom-right: resolution */}
      <div
        data-flash-el="res"
        className={`absolute bottom-4 right-4 flex items-center gap-3 sm:bottom-8 sm:right-8 ${baseOpacity}`}
      >
        <span className="font-body text-[10px] tracking-[0.2em] text-cream/80 sm:text-xs">4K</span>
        <span className="font-body text-[10px] tracking-[0.2em] text-cream/40 sm:text-xs">HD</span>
      </div>
    </div>
  );
}
