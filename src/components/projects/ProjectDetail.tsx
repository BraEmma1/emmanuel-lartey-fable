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
import { RelatedExperience } from "@/components/detail/RelatedExperience";
import { routeHref } from "@/content/navigation";
import {
  getExperiencesByOrganization,
  getProjectsWithPages,
  type ResolvedProject,
} from "@/content/queries";

/**
 * The case study template. Everything on the page comes from one resolved
 * project record:
 *
 *   overview      headline, project, organization, category, contribution,
 *                 technologies, intro, the study at a glance
 *   chapters      the project's own `sections`, rendered block by block
 *   competencies  the project's competencies
 *   evidence      the project's evidence, when supplied
 *   experience    the engagement the project belongs to
 *   navigation    back to the index, and to neighbouring case studies
 *
 * Projects differ: a software rollout, an incident response and an
 * infrastructure programme do not share phases. So the record chooses its own
 * chapters and blocks, every fact beyond the title is optional, and a part
 * with nothing to show is left out.
 */
export function ProjectDetail({ project }: { project: ResolvedProject }) {
  const indexHref = routeHref("projects");
  const engagements = getExperiencesByOrganization(project.organizationId);

  const parts: DetailPart[] = (project.sections ?? []).map((section) => ({
    heading: section.heading,
    surface: section.surface,
    // A chapter that is a single short list or paragraph needs less room.
    compact:
      section.blocks.length === 1 &&
      (section.blocks[0].kind === "list" || section.blocks[0].kind === "prose"),
    content: (
      <ContentBlocks
        // The project's own feature is placed where the study reaches it.
        blocks={section.blocks.map((block) =>
          block.kind === "feature" ? project.feature : block,
        )}
        dark={section.surface === "ink"}
      />
    ),
  }));

  if (project.competencySkills.length > 0) {
    parts.push({
      heading: "Technical competencies",
      content: <CompetencyList skills={project.competencySkills} />,
    });
  }

  if (suppliedEvidence(project.evidence).length > 0) {
    parts.push({
      heading: "Supporting evidence",
      content: <EvidenceList evidence={project.evidence} />,
    });
  }

  if (engagements.length > 0) {
    parts.push({
      heading: "Related experience",
      surface: "panel",
      content: <RelatedExperience entries={engagements} />,
    });
  }

  const facts: DetailFact[] = [
    { label: "Project", value: project.displayName },
    {
      label: "Organization",
      value: project.organization.name,
      href: engagements[0]?.href,
    },
    { label: "Category", value: project.category.name },
    { label: "Contribution", value: project.contribution },
    { label: "Technologies", value: project.technologies?.join(", ") },
  ].filter((fact): fact is DetailFact => Boolean(fact.value));

  // Neighbours are other projects whose case studies are live.
  const studies = getProjectsWithPages();
  const position = studies.findIndex((study) => study.slug === project.slug);
  const neighbour = (study: ResolvedProject | undefined) =>
    study?.href ? { label: study.displayName, href: study.href } : null;

  return (
    <DetailPage
      breadcrumb={indexHref ? { label: "Projects", href: indexHref } : null}
      current={project.displayName}
      eyebrow={`Case study ${project.number}`}
      title={project.headline ?? project.displayName}
      titleScale={project.headline ? "statement" : "name"}
      facts={facts}
      intro={project.intro ?? project.summary}
      overview={project.overview}
      parts={parts}
    >
      <RecordNav
        label="Case studies"
        back={indexHref ? { label: "All projects", href: indexHref } : null}
        previous={neighbour(studies[position - 1])}
        next={neighbour(studies[position + 1])}
      />
    </DetailPage>
  );
}
