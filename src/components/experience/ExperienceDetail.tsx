import { CompetencyList } from "@/components/detail/CompetencyList";
import { ContentBlocks } from "@/components/detail/ContentBlocks";
import {
  DetailPage,
  type DetailFact,
  type DetailPart,
} from "@/components/detail/DetailPage";
import {
  EvidenceList,
  suppliedEvidence,
} from "@/components/detail/EvidenceList";
import { RecordNav } from "@/components/detail/RecordNav";
import { RelatedProjects } from "@/components/detail/RelatedProjects";
import { routeHref } from "@/content/navigation";
import {
  getExperiencesWithPages,
  type ResolvedExperience,
} from "@/content/queries";
import { positionLabel } from "./labels";

/**
 * The experience detail template. Everything on the page comes from one
 * resolved experience record:
 *
 *   overview      organization, position, engagement, intro, parts of the role
 *   chapters      the record's own `sections`, rendered block by block
 *   case studies  projects carried out for the organization, with any
 *                 supplied evidence
 *   competencies  the record's skills
 *   navigation    back to the index, and to neighbouring records
 *
 * The record decides how many chapters there are and what each contains. A
 * part with nothing to show is left out, and the numbering closes up.
 */
export function ExperienceDetail({ entry }: { entry: ResolvedExperience }) {
  const { organization } = entry;
  const indexHref = routeHref("experience");

  const parts: DetailPart[] = (entry.sections ?? []).map((section) => ({
    heading: section.heading,
    surface: section.surface,
    content: (
      <ContentBlocks
        blocks={section.blocks}
        dark={section.surface === "ink"}
        context={section.heading}
      />
    ),
  }));

  // Case studies and evidence share a chapter: both are proof of the work.
  const hasProjects = entry.projects.length > 0;
  const hasEvidence = suppliedEvidence(entry.evidence).length > 0;
  if (hasProjects || hasEvidence) {
    parts.push({
      heading:
        hasProjects && hasEvidence
          ? "Case studies and evidence"
          : hasProjects
            ? "Related case studies"
            : "Supporting evidence",
      surface: "panel",
      content: (
        <>
          {hasProjects ? <RelatedProjects projects={entry.projects} /> : null}
          <EvidenceList evidence={entry.evidence} />
        </>
      ),
    });
  }

  if (entry.skills.length > 0) {
    parts.push({
      heading: "Competencies",
      content: <CompetencyList skills={entry.skills} />,
    });
  }

  const facts: DetailFact[] = [
    { label: positionLabel[entry.position.kind], value: entry.position.text },
    { label: "Engagement", value: entry.engagementType },
    { label: "Organization", value: organization.sector },
  ].filter((fact): fact is { label: string; value: string } =>
    Boolean(fact.value),
  );

  // Neighbours are other engagements whose detail pages are live.
  const records = getExperiencesWithPages();
  const position = records.findIndex((record) => record.slug === entry.slug);
  const neighbour = (record: ResolvedExperience | undefined) =>
    record?.href
      ? { label: record.organization.name, href: record.href }
      : null;

  return (
    <DetailPage
      breadcrumb={indexHref ? { label: "Experience", href: indexHref } : null}
      current={organization.name}
      eyebrow={`Experience record ${entry.number}`}
      title={organization.name}
      facts={facts}
      intro={entry.intro ?? entry.description}
      overview={entry.overview}
      parts={parts}
    >
      <RecordNav
        label="Experience records"
        back={indexHref ? { label: "All experience", href: indexHref } : null}
        previous={neighbour(records[position - 1])}
        next={neighbour(records[position + 1])}
      />
    </DetailPage>
  );
}
