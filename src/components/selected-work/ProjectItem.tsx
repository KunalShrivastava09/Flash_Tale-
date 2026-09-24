"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import ProjectMedia from "./ProjectMedia";

interface ProjectItemProps {
  project: Project;
  index: number;
  reducedMotion?: boolean;
}

/**
 * Editorial Project Item link that routes to `/work/[slug]`.
 * Features responsive layout variations and restrained cinematic hover interactions.
 */
export default function ProjectItem({
  project,
  index,
  reducedMotion = false,
}: ProjectItemProps) {
  const layoutVariant = index % 4;

  // Layout Variant 0: Full-width Anamorphic Cinema Display
  if (layoutVariant === 0) {
    return (
      <article data-project-item>
        <Link
          href={`/work/${project.slug}`}
          className="group relative flex flex-col gap-5 sm:gap-6 block focus-visible:outline-terracotta"
          aria-label={`View project: ${project.title}`}
        >
          <ProjectMedia project={project} reducedMotion={reducedMotion} />

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.25em] text-cream-dim transition-colors duration-300 group-hover:text-cream/90 sm:text-xs">
                <span className="text-terracotta font-semibold">{project.id}</span>
                <span className="h-px w-3 bg-cream/20" />
                <span>{project.category}</span>
              </div>
              <h3 className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight text-cream transition-colors duration-300 group-hover:text-paper-light sm:text-3xl md:text-4xl lg:text-5xl">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-4 font-body text-xs uppercase tracking-[0.2em] text-cream-dim transition-colors duration-300 group-hover:text-cream sm:text-sm">
              <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden sm:inline text-[11px] tracking-[0.25em] text-terracotta font-medium">
                VIEW PROJECT
              </span>
              <span>{project.year}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 text-terracotta"
              >
                →
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Layout Variant 1: Asymmetrical Media Left (7/12) + Metadata Right (5/12)
  if (layoutVariant === 1) {
    return (
      <article data-project-item>
        <Link
          href={`/work/${project.slug}`}
          className="group relative grid gap-6 md:grid-cols-12 md:items-center md:gap-10 lg:gap-14 block focus-visible:outline-terracotta"
          aria-label={`View project: ${project.title}`}
        >
          <div className="md:col-span-7 lg:col-span-8">
            <ProjectMedia project={project} reducedMotion={reducedMotion} />
          </div>

          <div className="flex flex-col gap-4 md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.25em] text-cream-dim transition-colors duration-300 group-hover:text-cream/90 sm:text-xs">
              <span className="text-terracotta font-semibold">{project.id}</span>
              <span className="h-px w-3 bg-cream/20" />
              <span>{project.category}</span>
            </div>

            <h3 className="font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-cream transition-colors duration-300 group-hover:text-paper-light sm:text-3xl md:text-3xl lg:text-4xl">
              {project.title}
            </h3>

            <div className="mt-2 flex items-center gap-4 font-body text-xs uppercase tracking-[0.2em] text-cream-dim transition-colors duration-300 group-hover:text-cream sm:text-sm">
              <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden sm:inline text-[11px] tracking-[0.25em] text-terracotta font-medium">
                VIEW PROJECT
              </span>
              <span>{project.year}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 text-terracotta"
              >
                →
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Layout Variant 2: Asymmetrical Metadata Left (5/12) + Media Right (7/12)
  if (layoutVariant === 2) {
    return (
      <article data-project-item>
        <Link
          href={`/work/${project.slug}`}
          className="group relative grid gap-6 md:grid-cols-12 md:items-center md:gap-10 lg:gap-14 block focus-visible:outline-terracotta"
          aria-label={`View project: ${project.title}`}
        >
          <div className="order-2 flex flex-col gap-4 md:order-1 md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.25em] text-cream-dim transition-colors duration-300 group-hover:text-cream/90 sm:text-xs">
              <span className="text-terracotta font-semibold">{project.id}</span>
              <span className="h-px w-3 bg-cream/20" />
              <span>{project.category}</span>
            </div>

            <h3 className="font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-cream transition-colors duration-300 group-hover:text-paper-light sm:text-3xl md:text-3xl lg:text-4xl">
              {project.title}
            </h3>

            <div className="mt-2 flex items-center gap-4 font-body text-xs uppercase tracking-[0.2em] text-cream-dim transition-colors duration-300 group-hover:text-cream sm:text-sm">
              <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden sm:inline text-[11px] tracking-[0.25em] text-terracotta font-medium">
                VIEW PROJECT
              </span>
              <span>{project.year}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 text-terracotta"
              >
                →
              </span>
            </div>
          </div>

          <div className="order-1 md:order-2 md:col-span-7 lg:col-span-8">
            <ProjectMedia project={project} reducedMotion={reducedMotion} />
          </div>
        </Link>
      </article>
    );
  }

  // Layout Variant 3: Offset Center Composition
  return (
    <article data-project-item>
      <Link
        href={`/work/${project.slug}`}
        className="group relative grid gap-6 md:grid-cols-12 md:gap-8 block focus-visible:outline-terracotta"
        aria-label={`View project: ${project.title}`}
      >
        <div className="md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2">
          <ProjectMedia project={project} reducedMotion={reducedMotion} />

          <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline sm:gap-6">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.25em] text-cream-dim transition-colors duration-300 group-hover:text-cream/90 sm:text-xs">
                <span className="text-terracotta font-semibold">{project.id}</span>
                <span className="h-px w-3 bg-cream/20" />
                <span>{project.category}</span>
              </div>
              <h3 className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight text-cream transition-colors duration-300 group-hover:text-paper-light sm:text-3xl md:text-4xl">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-4 font-body text-xs uppercase tracking-[0.2em] text-cream-dim transition-colors duration-300 group-hover:text-cream sm:text-sm">
              <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden sm:inline text-[11px] tracking-[0.25em] text-terracotta font-medium">
                VIEW PROJECT
              </span>
              <span>{project.year}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 text-terracotta"
              >
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
