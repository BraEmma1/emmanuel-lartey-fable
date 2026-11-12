import Link from "next/link";
import type { ResolvedProject } from "@/content/queries";
import { Arrow } from "@/components/ui/Arrow";
import { titleCase } from "@/lib/text";

/** How many competencies each index entry lists. */
const SKILLS_SHOWN = 5;

function IndexEntry({ project }: { project: ResolvedProject }) {
  const skills = project.competencySkills.slice(0, SKILLS_SHOWN);

  return (
    <li className="group relative border-t border-ink last:border-b">
      <article className="grid gap-x-6 gap-y-6 pb-12 pt-6 lg:grid-cols-12 lg:pb-16 lg:pt-8">
        <p
          aria-hidden="true"
          className="wide text-[clamp(4rem,10.5vw,10.5rem)] leading-[0.8] lg:col-span-3"
        >
          {project.number}
        </p>

        <div className="lg:col-span-9">
          <h2 className="display max-w-[18ch] text-[clamp(2.375rem,5vw,5rem)]">
            {/* The link stretches over the whole entry; the entry is one target. */}
            {project.href ? (
              <Link
                href={project.href}
                className="link decoration-transparent after:absolute after:inset-0"
              >
                {project.displayName}
              </Link>
            ) : (
              project.displayName
            )}
          </h2>
          <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-[1.0625rem] font-medium leading-snug">
            <span>{project.organization.name}</span>
            <span aria-hidden="true" className="text-muted">
              /
            </span>
            <span className="text-muted">{project.category.label}</span>
          </p>

          <div className="mt-9 grid gap-x-6 gap-y-8 md:grid-cols-9 lg:mt-12">
            <div className="md:col-span-5">
              <p className="max-w-[56ch] text-[1.125rem] leading-[1.55]">
                {project.summary}
              </p>
              {project.href ? (
                <p
                  aria-hidden="true"
                  className="meta mt-7 flex items-center gap-2.5"
                >
                  Read the case study
                  <Arrow
                    direction="right"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </p>
              ) : null}
            </div>

            <div className="border-t border-ink/25 pt-4 md:col-span-3 md:col-start-7">
              <h3 className="meta text-muted">Demonstrated</h3>
              <ul className="mt-3 text-base leading-[1.7]">
                {skills.map((skill) => (
                  <li key={skill.id}>{titleCase(skill.label)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

/**
 * The projects index: every project in the collection, one ruled entry each.
 * An entry becomes a link when its project has a live case study, with no
 * change needed here.
 */
export function ProjectIndex({ projects }: { projects: ResolvedProject[] }) {
  return (
    <section
      aria-label="Projects"
      className="shell pb-[clamp(4.5rem,10vw,9.5rem)]"
    >
      <ol>
        {projects.map((project) => (
          <IndexEntry key={project.slug} project={project} />
        ))}
      </ol>
    </section>
  );
}
