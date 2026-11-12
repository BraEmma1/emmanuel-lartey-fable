import Link from "next/link";
import { experienceIntro } from "@/content/home";
import { getExperiences, type ResolvedExperience } from "@/content/queries";
import { Arrow } from "@/components/ui/Arrow";

function ExperienceRow({ entry }: { entry: ResolvedExperience }) {
  const content = (
    <div className="grid gap-x-6 gap-y-5 py-9 lg:grid-cols-12 lg:py-11">
      <h3 className="display flex items-baseline gap-4 text-[clamp(2.125rem,3.7vw,3.75rem)] lg:col-span-6">
        {entry.organization.name}
        {entry.href ? (
          <Arrow
            direction="right"
            className="size-[0.45em] transition-transform duration-300 group-hover:translate-x-1"
          />
        ) : null}
      </h3>

      <div className="lg:col-span-4 lg:pt-1.5">
        {/* Several titles read as one joint role, one title per line. */}
        <p className="display text-[clamp(1.375rem,1.7vw,1.625rem)] leading-[1.15] tracking-[-0.02em]">
          {entry.roles.map((role, index) => (
            <span key={role} className="block">
              {index > 0 ? "& " : ""}
              {role}
            </span>
          ))}
        </p>
        <p className="mt-3 max-w-[46ch] text-[1.0625rem] leading-[1.55] text-ink/80">
          {entry.description}
        </p>
      </div>

      {entry.engagement ? (
        <p className="meta lg:col-span-2 lg:pt-2.5 lg:text-right">
          {entry.engagement}
        </p>
      ) : null}
    </div>
  );

  return (
    <li className="border-t border-ink/25 last:border-b">
      {entry.href ? (
        <Link href={entry.href} className="group block">
          {content}
        </Link>
      ) : (
        content
      )}
    </li>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="bg-panel"
    >
      <div className="shell section">
        <div className="grid items-end gap-x-6 gap-y-6 lg:grid-cols-12">
          <h2
            id="experience-title"
            className="display section-title lg:col-span-8"
          >
            {experienceIntro.title}
          </h2>
          <p className="max-w-[40ch] text-[1.125rem] text-muted lg:col-span-4 lg:pb-3">
            {experienceIntro.intro}
          </p>
        </div>

        <ul className="mt-[clamp(3rem,6vw,5rem)]">
          {getExperiences().map((entry) => (
            <ExperienceRow key={entry.slug} entry={entry} />
          ))}
        </ul>
      </div>
    </section>
  );
}
