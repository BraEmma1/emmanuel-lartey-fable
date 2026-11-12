import { Disclosure } from "@/components/ui/Disclosure";
import { expertiseIntro } from "@/content/home";
import { getSkillAreas } from "@/content/queries";
import { additionalCapability } from "@/content/skills";

export function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-title"
      className="shell section"
    >
      <div className="grid gap-x-6 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
            <h2
              id="expertise-title"
              className="display text-[clamp(2.75rem,6vw,6rem)]"
            >
              {expertiseIntro.title}
            </h2>
            <p className="mt-6 max-w-[34ch] text-[1.125rem] text-muted">
              {expertiseIntro.intro}
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ol>
            {getSkillAreas().map((area, index) => (
              <li
                key={area.id}
                className="grid gap-x-6 gap-y-5 border-t border-ink py-6 md:grid-cols-8 md:py-8 lg:py-10"
              >
                <h3 className="display flex gap-5 text-[clamp(1.75rem,2.7vw,2.625rem)] leading-[1.02] md:col-span-4">
                  <span aria-hidden="true" className="text-muted">
                    {index + 1}
                  </span>
                  <span>{area.title}</span>
                </h3>
                <Disclosure
                  className="md:col-span-4"
                  context={area.title}
                  showLabel="View skills"
                  hideLabel="Hide skills"
                  summary={
                    <>
                      <p className="max-w-[52ch] text-[1.0625rem] leading-[1.55]">
                        {area.text}
                      </p>
                      <ul className="dz-extra mt-5 text-base leading-[1.7] text-muted">
                        {area.skills.map((skill) => (
                          <li key={skill.id}>{skill.label}</li>
                        ))}
                      </ul>
                    </>
                  }
                />
              </li>
            ))}
          </ol>

          <div className="grid gap-x-6 gap-y-2 border-y border-ink/20 py-6 md:grid-cols-8">
            <h3 className="font-medium md:col-span-4">
              Also: {additionalCapability.title}
            </h3>
            <p className="max-w-[52ch] text-base text-muted md:col-span-4">
              {additionalCapability.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
