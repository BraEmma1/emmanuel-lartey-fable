import type { Skill } from "@/content/queries";
import { titleCase } from "@/lib/text";

/** The competencies a record demonstrates, as a ruled grid of labels. */
export function CompetencyList({ skills }: { skills: Skill[] }) {
  return (
    <ul className="grid gap-x-6 sm:grid-cols-2 xl:grid-cols-3">
      {skills.map((skill) => (
        <li
          key={skill.id}
          className="display border-t border-ink/25 pb-6 pt-4 text-[clamp(1.375rem,1.85vw,1.75rem)] font-medium leading-[1.12]"
        >
          {titleCase(skill.label)}
        </li>
      ))}
    </ul>
  );
}
