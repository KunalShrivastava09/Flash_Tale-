import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectNavProps {
  nextProject: Project;
}

/**
 * Bottom navigation linking to the next project in the portfolio reel.
 */
export default function ProjectNav({ nextProject }: ProjectNavProps) {
  return (
    <footer className="border-t border-line-dark bg-forest px-6 py-20 sm:px-8 sm:py-28 md:py-36 text-cream">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-12 sm:flex-row sm:items-end">
        <Link
          href="/#work"
          className="group flex items-center gap-2 font-body text-xs uppercase tracking-[0.25em] text-cream-dim/90 font-medium transition-colors hover:text-terracotta"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-out group-hover:-translate-x-1 text-terracotta"
          >
            ←
          </span>
          <span>Back to All Work</span>
        </Link>

        <Link
          href={`/work/${nextProject.slug}`}
          className="group flex flex-col items-start gap-2 text-left sm:items-end sm:text-right"
          aria-label={`Next project: ${nextProject.title}`}
        >
          <span className="font-body text-[11px] uppercase tracking-[0.3em] text-cream-dim/80 font-semibold">
            NEXT PROJECT // {nextProject.id}
          </span>
          <div className="flex items-center gap-4">
            <h4 className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight text-cream transition-colors duration-300 group-hover:text-terracotta sm:text-4xl md:text-5xl">
              {nextProject.title}
            </h4>
            <span
              aria-hidden="true"
              className="font-display text-2xl font-extrabold text-terracotta transition-all duration-300 group-hover:translate-x-2 group-hover:text-terracotta-bright sm:text-4xl md:text-5xl"
            >
              →
            </span>
          </div>
        </Link>
      </div>
    </footer>
  );
}
