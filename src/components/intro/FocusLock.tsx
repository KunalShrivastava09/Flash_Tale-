/**
 * The center focus-acquisition frame. Presentational only — CinematicIntro
 * scales `[data-flash-el="focus"]` in from slightly-larger-than-rest to
 * rest (the corners "move inward"), holds, then fades it out.
 */
export default function FocusLock() {
  return (
    <div
      data-flash-el="focus"
      className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 opacity-0 sm:h-28 sm:w-28"
      aria-hidden="true"
    >
      <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-terracotta" />
      <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-terracotta" />
      <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-terracotta" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-terracotta" />
    </div>
  );
}
