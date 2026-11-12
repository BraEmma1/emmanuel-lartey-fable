import { selectedWork } from "@/content/home";
import { getFeaturedProjects, type ResolvedProject } from "@/content/queries";
import Link from "next/link";
import { Disclosure } from "@/components/ui/Disclosure";
import { Arrow } from "@/components/ui/Arrow";
import { AssetFrame } from "@/components/ui/AssetFrame";

/*
 * Every project sits on the same nine-column field (to the right of its
 * numeral). The last three columns form a constant detail rail: it holds the
 * "Demonstrated" list in every project, and whatever sits beneath it lines up
 * on the same edge.
 */

const featureText =
  "display text-[clamp(1.375rem,1.85vw,1.75rem)] font-medium leading-[1.12]";
const featureLabel = "meta text-muted";

/**
 * Each project presents its substance in the form that suits it:
 * a before/after, a list of systems, or a sequence of steps.
 */
function ProjectFeature({ project }: { project: ResolvedProject }) {
  const { feature, cover } = project;

  switch (feature.kind) {
    case "beforeAfter":
      return (
        <div className="grid gap-x-6 gap-y-8 md:grid-cols-9">
          <div className="border-t border-ink/25 pt-4 md:col-span-3">
            <h4 className={featureLabel}>Before</h4>
            <p className={`${featureText} mt-5 max-w-[18ch] text-muted`}>
              {feature.before}
            </p>
          </div>
          <div className="border-t-[3px] border-ink pt-[calc(1rem-2px)] md:col-span-3">
            <h4 className="meta">After</h4>
            <p className={`${featureText} mt-5 max-w-[20ch]`}>
              {feature.after}
            </p>
          </div>
          <AssetFrame
            ratio="4:5"
            label={cover.description}
            src={cover.src}
            sizes="(min-width: 48rem) 25vw, 100vw"
            className="aspect-[4/3] md:col-span-3 md:aspect-[4/5]"
          />
        </div>
      );

    case "stack":
      return (
        <div className="grid gap-x-6 gap-y-8 md:grid-cols-9">
          <AssetFrame
            ratio="3:2"
            label={cover.description}
            src={cover.src}
            sizes="(min-width: 48rem) 45vw, 100vw"
            className="aspect-[4/3] md:col-span-6 md:aspect-[3/2]"
          />
          <ul className="md:col-span-3">
            {feature.items.map((item) => (
              <li
                key={item.name}
                className="border-t border-ink/25 pb-7 pt-4 last:pb-0"
              >
                <h4 className={featureText}>{item.name}</h4>
                <p className="mt-2 text-base text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      );

    case "sequence":
      return (
        <div>
          <ol className="grid gap-x-6 sm:grid-cols-2 xl:grid-cols-4">
            {feature.steps.map((step, index) => (
              <li key={step} className="border-t border-ink/25 pb-9 pt-4">
                <p className={featureLabel}>
                  <span className="sr-only">Step </span>
                  {index + 1}
                </p>
                <p className={`${featureText} mt-5 max-w-[15ch]`}>{step}</p>
              </li>
            ))}
          </ol>
          <AssetFrame
            ratio="3:1"
            label={cover.description}
            src={cover.src}
            sizes="(min-width: 64rem) 70vw, 100vw"
            className="aspect-[4/3] sm:aspect-[21/9] xl:aspect-[3/1]"
          />
        </div>
      );
  }
}

function ProjectEntry({ project }: { project: ResolvedProject }) {
  return (
    <article className="grid gap-x-6 border-t border-ink pt-6 lg:grid-cols-12 lg:pt-8">
      <p
        aria-hidden="true"
        className="wide text-[clamp(4.5rem,13.5vw,14rem)] leading-[0.8] lg:col-span-3"
      >
        {project.number}
      </p>

      <div className="mt-6 md:mt-8 lg:col-span-9 lg:mt-0">
        <h3 className="display text-[clamp(2.125rem,4.8vw,4.75rem)]">
          <span className="sr-only">Project {project.number}: </span>
          {project.title}
        </h3>
        <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-[1.0625rem] font-medium leading-snug lg:mt-6">
          <span>{project.organization.name}</span>
          <span aria-hidden="true" className="text-muted">
            /
          </span>
          <span className="text-muted">{project.category.label}</span>
        </p>

        {/* On phones the summary and the case study link stay in view; the
            skills and the project's feature open beneath. */}
        <Disclosure
          context={project.title}
          showLabel="View project details"
          hideLabel="Hide project details"
          summary={
            <>
              <div className="mt-8 grid gap-x-6 gap-y-8 md:mt-10 md:grid-cols-9 lg:mt-16">
                <div className="md:col-span-5">
                  <p className="max-w-[56ch] text-[1.1875rem] leading-[1.55]">
                    {project.summary}
                  </p>
                  {/* Shown only once the project's case study is live. */}
                  {project.href ? (
                    <Link
                      href={project.href}
                      className="link mt-5 inline-flex min-h-11 items-center gap-2.5 text-base font-medium"
                    >
                      Read the case study
                      <span className="sr-only">: {project.title}</span>
                      <Arrow direction="right" />
                    </Link>
                  ) : null}
                </div>
                <div className="dz-extra border-t border-ink/25 pt-4 md:col-span-3 md:col-start-7">
                  <h4 className={featureLabel}>Demonstrated</h4>
                  <ul className="mt-3 text-base leading-[1.7]">
                    {project.skills.map((skill) => (
                      <li key={skill.id}>{skill.label}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="dz-extra mt-10 md:mt-12 lg:mt-16">
                <ProjectFeature project={project} />
              </div>
            </>
          }
        />
      </div>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="shell section">
      <div className="grid items-end gap-x-6 gap-y-6 lg:grid-cols-12">
        <h2 id="work-title" className="display section-title lg:col-span-8">
          {selectedWork.title}
        </h2>
        <p className="max-w-[40ch] text-[1.125rem] text-muted lg:col-span-4 lg:pb-3">
          {selectedWork.intro}
        </p>
      </div>

      <div className="mt-[clamp(3rem,7vw,6rem)] space-y-16 md:space-y-[clamp(5rem,9vw,8.5rem)]">
        {getFeaturedProjects().map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
