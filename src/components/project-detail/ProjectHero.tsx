"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import { extractYouTubeId } from "@/lib/youtube";

interface ProjectHeroProps {
  project: Project;
}

/**
 * Fullscreen / near-fullscreen project hero supporting YouTube video playback
 * or cinematic opening photography with telemetry.
 */
export default function ProjectHero({ project }: ProjectHeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isYouTube = project.hero.type === "youtube";
  const isLocalVideo = project.hero.type === "video";
  const youtubeId = isYouTube ? extractYouTubeId(project.hero.youtubeUrl) : null;

  return (
    <section className="relative flex h-[78vh] w-full items-center justify-center overflow-hidden bg-forest-dark sm:h-[86vh] md:h-[90vh]">
      {isYouTube && isPlaying && youtubeId ? (
        /* In-page Privacy-Enhanced YouTube Player */
        <div className="absolute inset-0 z-20 h-full w-full bg-forest-dark">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      ) : (
        /* Poster / Opening Frame Visual / Local Video */
        <div className="relative h-full w-full">
          {isLocalVideo && project.hero.video ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              src={project.hero.video}
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          ) : project.hero.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.hero.image}
              alt={project.hero.alt || project.title}
              className="h-full w-full object-cover"
            />
          ) : project.hero.poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.hero.poster}
              alt={project.hero.alt || project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            /* Neutral Camera Darkroom Canvas */
            <div
              className="relative flex h-full w-full items-center justify-center bg-gradient-to-b from-[#2d3f36] via-[#23332a] to-forest-dark"
              aria-hidden="true"
            >
              {/* Corner Viewfinder Brackets */}
              <span className="absolute left-4 top-20 h-4 w-4 border-l border-t border-cream/30 sm:left-8 sm:top-24 sm:h-6 sm:w-6" />
              <span className="absolute right-4 top-20 h-4 w-4 border-r border-t border-cream/30 sm:right-8 sm:top-24 sm:h-6 sm:w-6" />
              <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-cream/30 sm:bottom-8 sm:left-8 sm:h-6 sm:w-6" />
              <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-cream/30 sm:bottom-8 sm:right-8 sm:h-6 sm:w-6" />

              {/* Center Watermark */}
              <div className="flex flex-col items-center gap-2 text-center opacity-40">
                <span className="font-display text-xl font-bold uppercase tracking-[0.3em] text-cream sm:text-3xl md:text-4xl">
                  {project.title}
                </span>
                <span className="font-body text-[10px] uppercase tracking-[0.3em] text-cream-dim sm:text-xs">
                  {project.category}
                </span>
              </div>
            </div>
          )}

          {/* Vignette Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/40 to-transparent"
          />

          {/* Micro Production Telemetry */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-20 flex items-center gap-2 sm:left-8 sm:top-24"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-cream/80 font-semibold">
              {isYouTube || isLocalVideo ? "4K MASTER" : "HIGH-RES STILL"}
            </span>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-20 font-body text-[10px] tracking-[0.25em] text-cream-dim/60 font-semibold sm:right-8 sm:top-24"
          >
            {project.id} / 05
          </div>

          {/* Play Trigger for YouTube Video Projects */}
          {isYouTube && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={`Play ${project.title}`}
                className="group flex h-20 w-20 items-center justify-center rounded-full border border-cream/35 bg-forest-dark/75 text-cream backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-terracotta hover:bg-forest-dark hover:text-terracotta focus-visible:outline-terracotta sm:h-24 sm:w-24"
              >
                <svg
                  className="ml-1 h-7 w-7 transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}

          {/* Bottom Title Preview */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 sm:bottom-10 sm:left-8 sm:right-8">
            <div className="flex flex-col gap-1.5">
              <span className="font-body text-[10px] uppercase tracking-[0.3em] text-cream-dim/90 font-semibold sm:text-xs">
                {project.category}
              </span>
              <h1 className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight text-cream sm:text-5xl md:text-6xl lg:text-7xl">
                {project.title}
              </h1>
            </div>

            <span className="font-body text-xs uppercase tracking-[0.25em] text-cream/70 sm:text-sm">
              {project.year}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
