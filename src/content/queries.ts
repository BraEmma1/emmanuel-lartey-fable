/**
 * Read side of the content model. Components and pages import from here, not
 * from the record modules: every function returns records with their
 * references already resolved, and derives the reverse relationships
 * (an organization's projects, an engagement's projects) that are never
 * stored.
 */

import { evidence, type EvidenceId } from "./evidence";
import { experience, type ExperienceId } from "./experience";
import { routeHref, type Href } from "./navigation";
import { organizations, type OrganizationId } from "./organizations";
import {
  projectCategories,
  type ProjectCategoryId,
} from "./project-categories";
import { featuredProjectIds, projects, type ProjectId } from "./projects";
import { skillAreas, skills, type SkillAreaId, type SkillId } from "./skills";
import type {
  EvidenceRecord,
  ExperienceRecord,
  OrganizationRecord,
  ProjectRecord,
  SkillAreaRecord,
  SkillRecord,
  SkillRef,
} from "./types";

export type Organization = OrganizationRecord & { id: OrganizationId };
export type Skill = SkillRecord & { id: SkillId };
export type Evidence = EvidenceRecord & { id: EvidenceId };

export type ProjectCategory = {
  id: ProjectCategoryId;
  /** Short form, for lists and bylines. */
  label: string;
  /** Full form, for a case study. Falls back to the label. */
  name: string;
};

export type SkillArea = Omit<SkillAreaRecord, "skillIds"> & {
  id: SkillAreaId;
  skills: Skill[];
};

export type ResolvedProject = ProjectRecord & {
  slug: ProjectId;
  /** Position in its list, zero-padded: "01", "02", … */
  number: string;
  /** The project's plain name: its own `name`, or its title. */
  displayName: string;
  organization: Organization;
  category: ProjectCategory;
  /** The short list shown with the project's summary. */
  skills: Skill[];
  /** The fuller list for the case study: `competencies`, or the skills. */
  competencySkills: Skill[];
  cover: Evidence;
  /** Cover and supporting evidence together, supplied or not. */
  evidence: Evidence[];
  /** Link to the case study. Null until the project has one. */
  href: Href | null;
};

export type ResolvedExperience = ExperienceRecord & {
  slug: ExperienceId;
  organization: Organization;
  /** Position in the display order, zero-padded: "01", "02", … */
  number: string;
  /** Projects carried out for this organization. */
  projects: ResolvedProject[];
  /** Competencies demonstrated: the record's own, or its projects'. */
  skills: Skill[];
  /** Evidence held for this organization, supplied or not. */
  evidence: Evidence[];
  /** Link to the detail page. Null until the engagement has one. */
  href: Href | null;
};

/** Typed `Object.keys`: the collections are keyed by their id types. */
const idsOf = <T extends object>(collection: T) =>
  Object.keys(collection) as (keyof T)[];

const twoDigits = (position: number) => String(position).padStart(2, "0");

/* ── Single records ───────────────────────────────────────── */

export function getOrganization(id: OrganizationId): Organization {
  return { id, ...organizations[id] };
}

export function getSkill(id: SkillId): Skill {
  return { id, ...skills[id] };
}

/** A skill reference, with its label reworded for the context if asked. */
function resolveSkill(ref: SkillRef): Skill {
  return typeof ref === "string"
    ? getSkill(ref)
    : { ...getSkill(ref.id), label: ref.label };
}

export function getEvidence(id: EvidenceId): Evidence {
  return { id, ...evidence[id] };
}

export function getProjectCategory(id: ProjectCategoryId): ProjectCategory {
  const record: { label: string; name?: string } = projectCategories[id];
  return { id, label: record.label, name: record.name ?? record.label };
}

export function getProject(slug: ProjectId): ResolvedProject {
  const record: ProjectRecord = projects[slug];

  return {
    ...record,
    slug,
    number: twoDigits(idsOf(projects).indexOf(slug) + 1),
    displayName: record.name ?? record.title,
    organization: getOrganization(record.organizationId),
    category: getProjectCategory(record.categoryId),
    skills: record.skillIds.map(getSkill),
    competencySkills: (record.competencies ?? record.skillIds).map(resolveSkill),
    cover: getEvidence(record.coverEvidenceId),
    evidence: [record.coverEvidenceId, ...(record.evidenceIds ?? [])].map(
      getEvidence,
    ),
    href: record.sections?.length ? routeHref("projectDetail", slug) : null,
  };
}

export function getExperience(slug: ExperienceId): ResolvedExperience {
  const record: ExperienceRecord = experience[slug];
  const related = getProjectsByOrganization(record.organizationId);
  const skillRefs: SkillRef[] = record.skillIds ?? [
    ...new Set(related.flatMap((project) => project.skillIds)),
  ];

  return {
    ...record,
    slug,
    number: twoDigits(idsOf(experience).indexOf(slug) + 1),
    organization: getOrganization(record.organizationId),
    projects: related,
    skills: skillRefs.map(resolveSkill),
    evidence: getEvidenceByOrganization(record.organizationId),
    href: record.sections?.length ? routeHref("experienceDetail", slug) : null,
  };
}

/* ── Collections, in display order ────────────────────────── */

/** Every project, for the projects index. */
export function getProjects(): ResolvedProject[] {
  return idsOf(projects).map(getProject);
}

/**
 * The curated selection shown on the homepage, numbered by its place in that
 * selection. A new project appears here only when it is added to
 * `featuredProjectIds`.
 */
export function getFeaturedProjects(): ResolvedProject[] {
  return featuredProjectIds.map((id, index) => ({
    ...getProject(id),
    number: twoDigits(index + 1),
  }));
}

export function getExperiences(): ResolvedExperience[] {
  return idsOf(experience).map(getExperience);
}

export function getSkillAreas(): SkillArea[] {
  return idsOf(skillAreas).map((id) => {
    const { skillIds, ...area } = skillAreas[id];
    return { id, ...area, skills: skillIds.map(getSkill) };
  });
}

/* ── Derived relationships ────────────────────────────────── */

export function getProjectsByOrganization(
  id: OrganizationId,
): ResolvedProject[] {
  return getProjects().filter((project) => project.organizationId === id);
}

export function getExperiencesByOrganization(
  id: OrganizationId,
): ResolvedExperience[] {
  return getExperiences().filter((entry) => entry.organizationId === id);
}

export function getEvidenceByOrganization(id: OrganizationId): Evidence[] {
  return idsOf(evidence)
    .map(getEvidence)
    .filter((item) => item.organizationId === id);
}

/** Engagements that have a live detail page, in display order. */
export function getExperiencesWithPages(): ResolvedExperience[] {
  return getExperiences().filter((entry) => entry.href !== null);
}

/** Projects that have a live case study, in display order. */
export function getProjectsWithPages(): ResolvedProject[] {
  return getProjects().filter((project) => project.href !== null);
}

export function getProjectsBySkill(id: SkillId): ResolvedProject[] {
  return getProjects().filter((project) => project.skillIds.includes(id));
}

/* ── Slug lookups for dynamic routes ──────────────────────── */

/** Narrows an untrusted URL segment to a project id. */
export function isProjectSlug(slug: string): slug is ProjectId {
  return Object.hasOwn(projects, slug);
}

/** Narrows an untrusted URL segment to an experience id. */
export function isExperienceSlug(slug: string): slug is ExperienceId {
  return Object.hasOwn(experience, slug);
}
