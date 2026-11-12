import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import {
  getProject,
  getProjectsWithPages,
  isProjectSlug,
} from "@/content/queries";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

// The whole page depends on the slug, so there is no slug-independent shell
// worth streaming first: `params` is read at the top of the page.
export const instant = false;

// Every case study is complete static output. For a slug that has no case
// study, this makes the server finish rendering before it responds, so the
// request gets a real 404 rather than a streamed 200 with a not-found body.
export const ensureStatic = "navigation";

/** The project for a URL segment, if it has a live case study. */
function findProject(slug: string) {
  if (!isProjectSlug(slug)) return null;
  const project = getProject(slug);
  return project.href ? project : null;
}

// One page per project that has case study content. Adding `sections` to a
// record in `content/projects.ts` is all it takes to add its page.
export async function generateStaticParams() {
  return getProjectsWithPages().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: `${project.displayName}: ${project.organization.name}`,
    description: project.intro ?? project.summary,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
