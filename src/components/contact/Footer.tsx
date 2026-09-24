import Link from "next/link";
import { contactData } from "@/data/contact";

/**
 * Quiet, editorial closing footer.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-line-dark bg-forest-dark py-12 sm:mt-28 sm:py-16 md:mt-36 text-cream">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 px-6 sm:px-8 md:flex-row md:items-end">
        {/* Brand & Studio Discipline */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="font-display text-base font-extrabold uppercase tracking-tight text-cream"
          >
            <span>Flash </span>
            <span className="bg-gradient-to-r from-terracotta to-olive-light bg-clip-text text-transparent">
              Tale
            </span>
          </Link>

          <p className="font-body text-[11px] uppercase tracking-[0.25em] text-cream-dim/85 font-medium sm:text-xs">
            Creative Production Studio — By Dev Yadav
          </p>

          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-cream/50">
            Film · Photography · Creative Direction · Post Production
          </p>
        </div>

        {/* Socials & Copyright */}
        <div className="flex flex-col gap-4 md:items-end">
          {contactData.socials && contactData.socials.length > 0 && (
            <ul className="flex flex-wrap items-center gap-5 sm:gap-6">
              {contactData.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[11px] uppercase tracking-[0.25em] text-cream-dim transition-colors hover:text-terracotta sm:text-xs"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-cream-dim/50 sm:text-[11px]">
            © {currentYear} Flash Tale. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
