import Link from "next/link";

/**
 * Top fixed minimal navigation for project detail pages.
 */
export default function ProjectDetailNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-forest/90 border-b border-line-dark px-6 py-5 backdrop-blur-md sm:px-8 text-cream">
      <Link
        href="/"
        className="font-display text-sm font-extrabold uppercase tracking-tight text-cream"
      >
        <span>Flash </span>
        <span className="bg-gradient-to-r from-terracotta to-olive-light bg-clip-text text-transparent">
          Tale
        </span>
      </Link>

      <Link
        href="/#work"
        className="group flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.25em] text-cream-dim/90 font-medium transition-colors hover:text-terracotta"
      >
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:-translate-x-1 text-terracotta"
        >
          ←
        </span>
        <span>Back to Work</span>
      </Link>
    </nav>
  );
}
