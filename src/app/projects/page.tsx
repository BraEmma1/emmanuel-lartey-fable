import { PageIntro } from "@/components/layout/PageIntro";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { projectsPage } from "@/content/pages";
import { getProjects } from "@/content/queries";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(projectsPage.meta);

export default function ProjectsPage() {
  return (
    <>
      <PageIntro title={projectsPage.title} statement={projectsPage.statement} />
      <ProjectIndex projects={getProjects()} />
    </>
  );
}
