"use client";

import type { Project } from "@/data/projects";

interface ProjectMediaProps {
  project: Project;
  className?: string;
  reducedMotion?: boolean;
}

function getAspectRatioClass(aspectRatio?: Project["aspectRatio"]): string {
  switch (aspectRatio) {
    case "cinema":
      return "aspect-[2.39/1]";
    case "wide":
      return "aspect-[21/9]";
    case "video":
    default:
      return "aspect-video";
  }
}

function getAspectLabel(aspectRatio?: Project["aspectRatio"]): string {
  switch (aspectRatio) {
    case "cinema":
      return "2.39 : 1 ANAMORPHIC";
    case "wide":
      return "21 : 9 WIDE";
    case "video":
    default:
      return "16 : 9 CINEMA";
  }
}

/**
 * High-impact cinematic media container. Supports live video, photography,
 * or an honest camera/viewfinder darkroom placeholder.
 */
export default function ProjectMedia({
  project,
  className = "",
  reducedMotion = false,
}: ProjectMediaProps) {
  const aspectClass = getAspectRatioClass(project.aspectRatio);
  const scaleHover = reducedMotion
    ? ""
    : "transition-transform duration-700 ease-out group-hover:scale-[1.03]";

  const mediaSrc =
    project.thumbnail ||
    project.hero.image ||
    project.hero.poster ||
    project.hero.video;
  const isVideoSrc =
    project.thumbnail?.endsWith(".mp4") ||
    (project.hero.type === "video" && !!project.hero.video) ||
    mediaSrc?.endsWith(".mp4");

  return (
    <div
      data-project-media
      className={`relative w-full overflow-hidden bg-forest-dark ${aspectClass} ${className}`}
    >
      {isVideoSrc && mediaSrc ? (
        <video
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          src={mediaSrc}
          aria-hidden="true"
          className={`h-full w-full object-cover ${scaleHover}`}
        />
      ) : mediaSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={mediaSrc}
          alt={project.title}
          className={`h-full w-full object-cover ${scaleHover}`}
        />
      ) : (
        /* Honest camera darkroom production container */
        <div
          className={`relative flex h-full w-full items-center justify-center border border-line-dark/60 bg-gradient-to-b from-[#2d3f36] via-[#23332a] to-forest-dark p-6 transition-colors duration-500 group-hover:border-cream/35 ${scaleHover}`}
          aria-hidden="true"
        >
          {/* Subtle corner viewfinder brackets */}
          <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-cream/30 sm:left-5 sm:top-5 sm:h-4 sm:w-4" />
          <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-cream/30 sm:right-5 sm:top-5 sm:h-4 sm:w-4" />
          <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-cream/30 sm:bottom-5 sm:left-5 sm:h-4 sm:w-4" />
          <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-cream/30 sm:bottom-5 sm:right-5 sm:h-4 sm:w-4" />

          {/* Micro camera HUD telemetry inside frame */}
          <div className="absolute left-4 top-4 flex items-center gap-2 font-body text-[8px] uppercase tracking-[0.25em] text-cream/70 sm:left-6 sm:top-6 sm:text-[9px]">
            <span className="h-1 w-1 rounded-full bg-terracotta" />
            <span>{getAspectLabel(project.aspectRatio)}</span>
          </div>

          <div className="absolute right-4 top-4 font-body text-[8px] tracking-[0.2em] text-cream/50 sm:right-6 sm:top-6 sm:text-[9px]">
            {project.id} / 05
          </div>

          <div className="absolute bottom-4 left-4 font-body text-[8px] uppercase tracking-[0.25em] text-cream/50 sm:bottom-6 sm:left-6 sm:text-[9px]">
            4K RAW
          </div>

          <div className="absolute bottom-4 right-4 font-body text-[8px] tracking-[0.2em] text-cream/50 sm:bottom-6 sm:right-6 sm:text-[9px]">
            24 FPS
          </div>

          {/* Center subtle title watermark */}
          <div className="flex flex-col items-center gap-1.5 opacity-40 transition-opacity duration-500 group-hover:opacity-75">
            <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-cream sm:text-base md:text-lg">
              {project.title}
            </span>
            <span className="font-body text-[8px] uppercase tracking-[0.25em] text-cream-dim sm:text-[9px]">
              {project.category}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
