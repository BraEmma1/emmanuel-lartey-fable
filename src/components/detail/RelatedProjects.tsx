import Link from "next/link";
import type { ResolvedProject } from "@/content/queries";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Projects related to a record, read from the shared project collection.
 * A project links to its case study only once that case study is live;
 * until then its title and summary are shown as plain text.
 */
export function RelatedProjects({ projects }: { projects: ResolvedProject[] }) {
  return (
    <ul>
      {projects.map((project) => (
        <li
          key={project.slug}
          className="grid gap-x-6 gap-y-8 border-t border-ink/25 py-8 last:border-b md:grid-cols-8"
        >
          <div className="md:col-span-5">
            <p className="meta text-muted">{project.category.label}</p>
            <h3 className="display mt-3 text-[clamp(1.75rem,2.7vw,2.625rem)] leading-[1.02]">
              {project.title}
            </h3>
            <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-[1.55] text-ink/80">
              {project.summary}
            </p>
            {project.href ? (
              <Link
                href={project.href}
                className="link mt-4 inline-flex min-h-11 items-center gap-2.5 text-base font-medium"
              >
                Read the case study
                <span className="sr-only">: {project.title}</span>
                <Arrow direction="right" />
              </Link>
            ) : null}
          </div>

          <div className="md:col-span-3">
            <h4 className="meta text-muted">Demonstrated</h4>
            <ul className="mt-3 text-base leading-[1.7]">
              {project.skills.map((skill) => (
                <li key={skill.id}>{skill.label}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
