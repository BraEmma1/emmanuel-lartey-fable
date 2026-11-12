/**
 * Content schemas.
 *
 * Every collection is authored as a keyed object in its own module
 * (`organizations.ts`, `skills.ts`, `evidence.ts`, `projects.ts`,
 * `experience.ts`). The key is the record's id and, where the record has a
 * page, its URL slug. Id types are derived from those keys, so a reference to
 * a record that does not exist is a compile error.
 *
 * References point one way only, which keeps every fact in a single place:
 *
 *   organizations ─┐
 *   skills ────────┼─▶ projects      (organizationId, skillIds, evidence ids)
 *   evidence ──────┘
 *   organizations ───▶ experience    (organizationId)
 *   organizations ───▶ evidence      (organizationId)
 *
 * The reverse directions (an organization's projects, an engagement's
 * projects, a skill's projects) are derived in `queries.ts`, never stored.
 *
 * Anything typed `| null` is a genuine detail that has not been supplied yet.
 * The UI renders an honest placeholder, or nothing, until it is filled in.
 */

import type { EvidenceId } from "./evidence";
import type { OrganizationId } from "./organizations";
import type { ProjectCategoryId } from "./project-categories";
import type { SkillId } from "./skills";

/* ── Organizations ────────────────────────────────────────── */

export type OrganizationRecord = {
  name: string;
  /** What kind of organization it is, in a few words. Only when confirmed. */
  sector?: string;
  /** Public website, once confirmed. */
  url?: string;
};

/* ── Skills and competencies ──────────────────────────────── */

/** A single competency, named once and referenced everywhere. */
export type SkillRecord = {
  label: string;
};

/**
 * A reference to a skill. Usually just its id. Where the context calls for
 * slightly different wording ("IT Procurement" for "Procurement"), the
 * reference carries its own label, so a near-identical skill never has to be
 * created just to change two words.
 */
export type SkillRef = SkillId | { id: SkillId; label: string };

/** An area of practice: a titled, ordered selection of skills. */
export type SkillAreaRecord = {
  title: string;
  text: string;
  /** Skills listed under this area, in display order. */
  skillIds: SkillId[];
};

/* ── Evidence ─────────────────────────────────────────────── */

export type EvidenceKind = "image" | "document" | "link";

/** A real artefact that supports a claim: a photograph, a document, a link. */
export type EvidenceRecord = {
  kind: EvidenceKind;
  /** What the artefact shows. Used as alt text and as the placeholder brief. */
  description: string;
  /** Path under /public, or a URL. Null until the genuine artefact exists. */
  src: string | null;
  organizationId: OrganizationId;
};

/* ── Content blocks ───────────────────────────────────────── */

/** The three structured forms a piece of work can take on the page. */
export type FeatureBlock =
  | { kind: "beforeAfter"; before: string; after: string }
  | { kind: "stack"; items: { name: string; detail: string }[] }
  | { kind: "sequence"; steps: string[] };

/** A team led: the headline figure, who it is made of, how it is run. */
export type TeamBlock = {
  kind: "team";
  /** The headline figure as displayed, e.g. "05". */
  count: string;
  label: string;
  members: { count: string; role: string }[];
  practicesHeading: string;
  practices: string[];
  /** A further statement set beside the team structure. */
  note?: { heading: string; text: string };
};

/**
 * Initiatives, each told in the same four parts so they can be compared:
 * the need, the contribution made, what was implemented, and the outcome.
 */
export type InitiativesBlock = {
  kind: "initiatives";
  items: {
    title: string;
    /** The business or operational need the work answered. */
    need: string;
    /** What was personally done. */
    contribution: string;
    /** The solution or change that was put in place. */
    solution: string;
    /** The result. Only stated where it can be supported; omitted otherwise. */
    outcome?: string;
  }[];
};

/**
 * A titled group inside a section: a subheading with its own blocks beside
 * it. Lets one chapter hold several related topics without each becoming a
 * full section.
 */
export type GroupBlock = {
  kind: "group";
  heading: string;
  blocks: ContentBlock[];
};

/**
 * A process shown step by step. Like a `sequence`, but each step can carry a
 * short label above it: a phase ("Equipment"), or who the step belonged to
 * ("Management decision").
 */
export type TimelineBlock = {
  kind: "timeline";
  /**
   * "grid" (the default) sets the steps side by side. "log" sets one step to
   * a row with its label beside it, the way an incident report reads: use it
   * when the steps are stages with longer descriptions.
   */
  layout?: "grid" | "log";
  steps: { label?: string; title: string }[];
};

/** Everything a detail page can be composed from. */
export type ContentBlock =
  | FeatureBlock
  | TeamBlock
  | InitiativesBlock
  | GroupBlock
  | TimelineBlock
  | { kind: "prose"; paragraphs: string[] }
  /** A compact ruled list of short items. Numbered when order matters. */
  | { kind: "list"; items: string[]; numbered?: boolean }
  /**
   * In a case study: the project's own `feature`, placed where the story
   * reaches it, so the before and after (or stack, or sequence) shown with
   * the project's summary is not written a second time.
   */
  | { kind: "feature" }
  | { kind: "evidence"; evidenceId: EvidenceId };

/**
 * One titled section of an experience detail page or a project case study.
 * Both templates render the same shape, so one renderer serves both.
 */
export type DetailSection = {
  heading: string;
  /** Sets the section on the dark surface. Use once per page, for emphasis. */
  surface?: "ink";
  blocks: ContentBlock[];
};

/* ── Projects ─────────────────────────────────────────────── */

export type ProjectCategoryRecord = {
  /** Short form, for lists and bylines. */
  label: string;
  /** Full form, for a case study. Omit when the label already says it. */
  name?: string;
};

export type ProjectRecord = {
  /** Editorial title, as shown with the homepage's selected work. */
  title: string;
  /** The project's plain name, for the index and case study. Defaults to the title. */
  name?: string;
  categoryId: ProjectCategoryId;
  organizationId: OrganizationId;
  summary: string;
  /** Competencies shown with the project's summary, in display order. */
  skillIds: SkillId[];
  /** The fuller list for the case study. Defaults to `skillIds`. */
  competencies?: SkillRef[];
  /** Case study headline. Defaults to the project's name. */
  headline?: string;
  /** Opening statement of the case study. Defaults to the summary. */
  intro?: string;
  /** The case study at a glance, shown beside the opening statement. */
  overview?: { name: string; detail: string }[];
  /** What was personally done, in a few words. */
  contribution?: string;
  /** Technologies involved. Only those that are established. */
  technologies?: string[];
  /** The project's substance in the structured form that suits it. */
  feature: FeatureBlock;
  /** The lead image for the project. */
  coverEvidenceId: EvidenceId;
  /** Further supporting evidence, shown on the case study. */
  evidenceIds?: EvidenceId[];
  /** Case study body. The project gets a detail page only once this exists. */
  sections?: DetailSection[];
};

/* ── Professional experience ──────────────────────────────── */

export type ExperienceRecord = {
  organizationId: OrganizationId;
  /** One or more titles. Several titles are shown together as a joint role. */
  roles: string[];
  /** The role as one line, for the experience index and detail pages. */
  position: {
    /**
     * How firm the wording is: a held title, a working description of a
     * consulting role, or an area of responsibility.
     */
    kind: "title" | "working" | "area";
    text: string;
  };
  /** Public engagement line. Null hides it until the detail is confirmed. */
  engagement: string | null;
  /** Short classification. Null until verified; never shown while null. */
  engagementType: "Full-time" | "Consulting" | "Consulting / Hybrid" | null;
  description: string;
  /** Opening statement of the detail page. Falls back to the description. */
  intro?: string;
  /**
   * The parts of the role, shown beside the opening statement so the shape
   * of the job is clear before any section is read.
   */
  overview?: { name: string; detail: string }[];
  /**
   * Competencies this engagement demonstrates, in display order. When
   * omitted they are taken from the engagement's projects.
   */
  skillIds?: SkillRef[];
  /** Detail page body. The engagement gets a page only once this exists. */
  sections?: DetailSection[];
  /**
   * INTERNAL ONLY. Never rendered. Records what still needs confirming before
   * it can be published.
   */
  unresolved?: string[];
};
