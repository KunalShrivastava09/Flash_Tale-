import type { Service } from "@/data/services";

interface ServiceRowProps {
  service: Service;
  index: number;
  reducedMotion?: boolean;
}

/**
 * Editorial Service Row item.
 * Clean two-column layout on desktop, stacking naturally on mobile.
 * Features restrained editorial typography with dot-separated capabilities.
 */
export default function ServiceRow({
  service,
  reducedMotion = false,
}: ServiceRowProps) {
  const translateShift = reducedMotion
    ? ""
    : "transition-transform duration-300 ease-out group-hover:translate-x-2.5 sm:group-hover:translate-x-3";
  const numShift = reducedMotion
    ? ""
    : "transition-transform duration-300 ease-out group-hover:translate-x-1";

  return (
    <article
      data-service-row
      className="group border-t border-forest/15 py-10 transition-colors duration-300 hover:border-forest/40 sm:py-12 md:py-14"
    >
      <div className="grid gap-5 md:grid-cols-12 md:gap-10 lg:gap-16">
        {/* Left: Production Category Number */}
        <div className="md:col-span-3 lg:col-span-3">
          <span
            className={`inline-block font-body text-xs font-bold uppercase tracking-[0.3em] text-terracotta transition-colors duration-300 group-hover:text-terracotta-bright sm:text-sm ${numShift}`}
          >
            {service.number} / 04
          </span>
        </div>

        {/* Right: Title, Description, & Dot-Separated Capabilities */}
        <div className="flex flex-col gap-4 md:col-span-9 lg:col-span-9 sm:gap-6">
          <div className="flex items-center gap-4">
            <h3
              className={`font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink transition-colors duration-300 group-hover:text-forest sm:text-4xl md:text-5xl lg:text-6xl ${translateShift}`}
            >
              {service.title}
            </h3>

            {/* Subtle Directional Indicator */}
            <span
              aria-hidden="true"
              className={`hidden font-display text-2xl font-bold text-terracotta opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 sm:inline-block sm:text-3xl md:text-4xl ${
                reducedMotion ? "transform-none" : "-translate-x-2"
              }`}
            >
              →
            </span>
          </div>

          <p className="max-w-2xl font-body text-sm leading-relaxed text-ink-muted sm:text-base md:text-lg">
            {service.description}
          </p>

          {/* Restrained Editorial Capability List with Dot Separators */}
          <div
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pt-1 font-body text-xs uppercase tracking-[0.2em] text-forest/90 font-medium sm:text-sm"
            aria-label={`${service.title} capabilities`}
          >
            {service.capabilities.map((capability, idx) => (
              <span
                key={capability}
                className="inline-flex items-center gap-2.5"
              >
                <span className="transition-colors duration-300 group-hover:text-ink">
                  {capability}
                </span>
                {idx < service.capabilities.length - 1 && (
                  <span aria-hidden="true" className="select-none text-terracotta">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
