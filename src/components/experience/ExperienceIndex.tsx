import Link from "next/link";
import type { ResolvedExperience } from "@/content/queries";
import { Arrow } from "@/components/ui/Arrow";
import { titleCase } from "@/lib/text";
import { positionLabel } from "./labels";

/** How many competencies each index entry lists. */
const SKILLS_SHOWN = 4;

function IndexEntry({ entry }: { entry: ResolvedExperience }) {
  const skills = entry.skills.slice(0, SKILLS_SHOWN);

  return (
    <li className="group relative border-t border-ink last:border-b">
      <article className="grid gap-x-6 gap-y-7 py-9 lg:grid-cols-12 lg:py-12">
        <p
          aria-hidden="true"
          className="wide text-[clamp(1.375rem,2vw,2rem)] leading-none lg:col-span-1 lg:pt-[0.55em]"
        >
          {entry.number}
        </p>

        <div className="lg:col-span-6">
          <h2 className="display text-[clamp(2.375rem,5vw,5rem)]">
            {/* The link stretches over the whole entry; the entry is one target. */}
            {entry.href ? (
              <Link
                href={entry.href}
                className="link decoration-transparent after:absolute after:inset-0"
              >
                {entry.organization.name}
              </Link>
            ) : (
              entry.organization.name
            )}
          </h2>
          {entry.href ? (
            <p
              aria-hidden="true"
              className="meta mt-6 flex items-center gap-2.5 lg:mt-8"
            >
              View experience record
              <Arrow
                direction="right"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </p>
          ) : null}
        </div>

        <div className="lg:col-span-5">
          <p className="meta text-muted">
            {positionLabel[entry.position.kind]}
          </p>
          <p className="display mt-2 text-[clamp(1.375rem,1.7vw,1.625rem)] font-medium leading-[1.15] tracking-[-0.02em]">
            {entry.position.text}
          </p>
          <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-[1.55] text-ink/80">
            {entry.description}
          </p>

          <dl className="mt-7 border-t border-ink/25 text-base">
            {entry.engagementType ? (
              <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 border-b border-ink/25 py-3">
                <dt className="meta pt-0.5 text-muted">Engagement</dt>
                <dd>{entry.engagementType}</dd>
              </div>
            ) : null}
            {skills.length > 0 ? (
              <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 border-b border-ink/25 py-3">
                <dt className="meta pt-0.5 text-muted">Demonstrated</dt>
                <dd>
                  <ul className="leading-[1.65]">
                    {skills.map((skill) => (
                      <li key={skill.id}>{titleCase(skill.label)}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </article>
    </li>
  );
}

/**
 * The experience index: one ruled entry per engagement. An entry becomes a
 * link when its record has a live detail page, with no change needed here.
 */
export function ExperienceIndex({ entries }: { entries: ResolvedExperience[] }) {
  return (
    <section
      aria-label="Organizations"
      className="shell pb-[clamp(4.5rem,10vw,9.5rem)]"
    >
      <ol>
        {entries.map((entry) => (
          <IndexEntry key={entry.slug} entry={entry} />
        ))}
      </ol>
    </section>
  );
}
