import Link from "next/link";
import type { ResolvedExperience } from "@/content/queries";
import { Arrow } from "@/components/ui/Arrow";

/**
 * The engagement a project was carried out in, read from the experience
 * collection. It links to the experience record only when that page is live.
 */
export function RelatedExperience({
  entries,
}: {
  entries: ResolvedExperience[];
}) {
  return (
    <ul>
      {entries.map((entry) => (
        <li
          key={entry.slug}
          className="grid gap-x-6 gap-y-6 border-t border-ink/25 py-8 last:border-b md:grid-cols-8"
        >
          <div className="md:col-span-5">
            <h3 className="display text-[clamp(1.75rem,2.7vw,2.625rem)] leading-[1.02]">
              {entry.organization.name}
            </h3>
            <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-[1.55] text-ink/80">
              {entry.description}
            </p>
            {entry.href ? (
              <Link
                href={entry.href}
                className="link mt-4 inline-flex min-h-11 items-center gap-2.5 text-base font-medium"
              >
                View the experience record
                <span className="sr-only">: {entry.organization.name}</span>
                <Arrow direction="right" />
              </Link>
            ) : null}
          </div>

          <div className="md:col-span-3">
            <h4 className="meta text-muted">Role</h4>
            <p className="mt-3 text-base leading-[1.7]">
              {entry.position.text}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
