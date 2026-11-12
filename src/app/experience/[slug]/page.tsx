import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperienceDetail } from "@/components/experience/ExperienceDetail";
import {
  getExperience,
  getExperiencesWithPages,
  isExperienceSlug,
} from "@/content/queries";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

// The whole page depends on the slug, so there is no slug-independent shell
// worth streaming first: `params` is read at the top of the page.
export const instant = false;

// Every experience page is complete static output. For a slug that has no
// page, this makes the server finish rendering before it responds, so the
// request gets a real 404 rather than a streamed 200 with a not-found body.
export const ensureStatic = "navigation";

/** The engagement for a URL segment, if it has a live detail page. */
function findEntry(slug: string) {
  if (!isExperienceSlug(slug)) return null;
  const entry = getExperience(slug);
  return entry.href ? entry : null;
}

// One page per engagement that has detail content. Adding `sections` to a
// record in `content/experience.ts` is all it takes to add its page.
export async function generateStaticParams() {
  return getExperiencesWithPages().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) return {};

  return pageMetadata({
    title: `${entry.position.text} at ${entry.organization.name}`,
    description: `${site.name} at ${entry.organization.name}. ${entry.description}`,
  });
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) notFound();

  return <ExperienceDetail entry={entry} />;
}
