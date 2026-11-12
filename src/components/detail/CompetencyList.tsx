import { Disclosure } from "@/components/ui/Disclosure";
import type { Skill } from "@/content/queries";
import { titleCase } from "@/lib/text";

/** Longer than this, a phone shows the first few and offers the rest. */
const LONG = 6;
const SHOWN = 4;

/** The competencies a record demonstrates, as a ruled grid of labels. */
export function CompetencyList({ skills }: { skills: Skill[] }) {
  const long = skills.length > LONG;

  const list = (
    <ul className="grid gap-x-6 sm:grid-cols-2 xl:grid-cols-3">
      {skills.map((skill, index) => (
        <li
          key={skill.id}
          className={`display border-t border-ink/25 pb-6 pt-4 text-[clamp(1.375rem,1.85vw,1.75rem)] font-medium leading-[1.12] max-md:pb-4 ${long && index >= SHOWN ? "dz-extra" : ""}`}
        >
          {titleCase(skill.label)}
        </li>
      ))}
    </ul>
  );

  if (!long) return list;

  return (
    <Disclosure
      context="Competencies"
      showLabel={`Show all ${skills.length} competencies`}
      hideLabel="Show fewer competencies"
      summary={list}
    />
  );
}
