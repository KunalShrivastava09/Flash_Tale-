import type { Project } from "@/data/projects";

interface ProjectInfoProps {
  project: Project;
}

const CREDIT_LABELS: Record<string, string> = {
  director: "DIRECTOR",
  cinematography: "CINEMATOGRAPHY",
  client: "CLIENT",
  production: "PRODUCTION",
  colorGrade: "COLOR GRADE",
  aspectRatio: "ASPECT RATIO",
  year: "YEAR",
};

/**
 * Editorial Project Information & Production Credits.
 * Fully data-driven: only renders fields that exist in project data.
 */
export default function ProjectInfo({ project }: ProjectInfoProps) {
  const creditsEntries = project.credits
    ? Object.entries(project.credits).filter(
        ([, value]) => typeof value === "string" && value.trim().length > 0
      )
    : [];

  const hasDescription = Boolean(project.description?.trim());
  const hasCredits = creditsEntries.length > 0;

  if (!hasDescription && !hasCredits) return null;

  return (
    <section className="border-t border-forest/15 bg-paper px-6 py-16 sm:px-8 sm:py-20 md:py-24 text-ink">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-24">
          {/* Narrative Overview */}
          {hasDescription && (
            <div
              className={`flex flex-col gap-6 ${
                hasCredits
                  ? "md:col-span-7 lg:col-span-8"
                  : "max-w-3xl md:col-span-12"
              }`}
            >
              <span className="font-body text-xs uppercase tracking-[0.35em] text-olive font-semibold">
                PROJECT OVERVIEW
              </span>

              <p className="font-body text-lg leading-relaxed text-ink/95 sm:text-xl md:text-2xl md:leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          {/* Production Credits */}
          {hasCredits && (
            <div
              className={`flex flex-col gap-6 ${
                hasDescription
                  ? "md:col-span-5 lg:col-span-4"
                  : "max-w-md md:col-span-12"
              }`}
            >
              <span className="font-body text-xs uppercase tracking-[0.35em] text-olive font-semibold">
                CREDITS & SPECS
              </span>

              <dl className="flex flex-col divide-y divide-forest/15">
                {creditsEntries.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-baseline justify-between py-3 font-body text-xs sm:text-sm"
                  >
                    <dt className="uppercase tracking-[0.2em] text-olive font-medium">
                      {CREDIT_LABELS[key] || key.toUpperCase()}
                    </dt>
                    <dd className="font-medium uppercase tracking-[0.15em] text-ink font-semibold">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
