import { ExperienceIndex } from "@/components/experience/ExperienceIndex";
import { PageIntro } from "@/components/layout/PageIntro";
import { experiencePage } from "@/content/pages";
import { getExperiences } from "@/content/queries";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(experiencePage.meta);

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        title={experiencePage.title}
        statement={experiencePage.statement}
      />
      <ExperienceIndex entries={getExperiences()} />
    </>
  );
}
