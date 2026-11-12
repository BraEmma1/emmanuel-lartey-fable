# Architecture

How the portfolio is organised, and how to add the pages that are planned. The
visual system is documented separately in [DESIGN.md](../DESIGN.md).

## Stack

Next.js 16 App Router (Cache Components enabled), React 19, Tailwind CSS 4,
TypeScript in strict mode. No other runtime dependencies. All content is static
and type-checked; every route prerenders.

## Structure

```
src/
  app/
    layout.tsx        Fonts, metadata, and the shell shared by every page
    page.tsx          Homepage: an ordered list of sections
    experience/
      page.tsx        Experience index
      [slug]/page.tsx Experience detail, one page per record with sections
    projects/
      page.tsx        Projects index
      [slug]/page.tsx Case study, one page per project with sections
    globals.css       Design tokens and the few hand-written primitives
  components/
    layout/           SiteHeader, MobileMenu, SiteFooter, PageIntro
    sections/         Homepage sections, one file each
    experience/       ExperienceIndex, ExperienceDetail (the template)
    projects/         ProjectIndex, ProjectDetail (the case study template)
    detail/           Shared by every detail page: DetailPage, DetailSection,
                      ContentBlocks, CompetencyList, RelatedProjects,
                      RelatedExperience, EvidenceList, RecordNav
    ui/               Arrow, AssetFrame
  lib/
    metadata.ts       Page titles, descriptions and social cards
  content/
    types.ts          Schemas for every record
    site.ts           Identity and contact details
    navigation.ts     Route registry and primary navigation
    organizations.ts       ┐
    skills.ts              │
    evidence.ts            │
    project-categories.ts  ├ Record collections
    projects.ts            │
    experience.ts          ┘
    queries.ts        Read side: resolved records and derived relationships
    home.ts           Editorial copy used by the homepage only
    pages.ts          Heading, statement and description of each inner page
```

Two rules hold the structure together:

1. **Content never lives in components.** Components receive data and decide
   how it looks. Words, names and facts live under `src/content`.
2. **Components read through `queries.ts`.** They do not import the record
   collections directly, so they always receive resolved records and never
   handle raw ids.

## Routes

| Route                | Status  | Source of content                               |
| -------------------- | ------- | ----------------------------------------------- |
| `/`                  | Live    | `site.ts`, `home.ts`, queries                   |
| `/experience`        | Live    | `pages.ts`, `getExperiences()`                  |
| `/experience/[slug]` | Live    | `getExperience(slug)`; all four engagements have pages |
| `/projects`          | Live    | `pages.ts`, `getProjects()`                     |
| `/projects/[slug]`   | Live    | `getProject(slug)`; all three projects have case studies |
| `/about`             | Planned | `site.ts`, `getSkillAreas()`, new `about.ts`    |
| `/resume`            | Planned | Composed from experience, projects and skills   |
| `/contact`           | Planned | `site.contact`                                  |

Planned routes have no files under `src/app` yet. They are declared in the
route registry in [navigation.ts](../src/content/navigation.ts) with
`status: "planned"`.

### No dead links, by construction

`routeHref(id, slug?)` is the only way to obtain a link to a route, and it
returns `null` while the route is planned. Everything that links follows from
that:

- **Navigation.** Each primary item names a homepage section and, optionally,
  the page that will replace it. It links to the page when the page is live and
  to the section otherwise. "Experience" resolves to `/experience` and "Work"
  to `/projects`; the rest still resolve to homepage sections
  (`/#approach`).
- **Record links.** `ResolvedProject.href` and `ResolvedExperience.href` are
  `null` unless the detail route is live *and* the record has detail content
  (`sections`). The homepage experience rows already render as links only when
  `href` is set.

### Shipping a page

1. Add the route under `src/app`.
2. Set its status to `"live"` in `navigation.ts`.
3. If the page takes over from a homepage section and is not yet named in the
   primary navigation, add `route` to that item.

Navigation hrefs are absolute (`/#approach`) and rendered with `next/link`, so
the header and footer behave the same on every page.

Two decisions are deferred until the pages they concern are designed:
whether "Approach", "Leadership" and "Expertise" remain homepage sections or
move under `/about`, and whether `/resume` and `/about` join the primary
navigation or the footer.

## Content model

Each collection is a keyed object. The key is the record's id and, for
projects and experience, its URL slug. Id types are derived from the keys
(`ProjectId = keyof typeof projects`), so a reference to a record that does not
exist fails type-checking.

```
organizations ─┐
skills ────────┼─▶ projects      organizationId, skillIds,
evidence ──────┘                 coverEvidenceId, evidenceIds
organizations ───▶ experience    organizationId
organizations ───▶ evidence      organizationId
```

| Collection      | Holds                                              | Module             |
| --------------- | -------------------------------------------------- | ------------------ |
| Organizations   | Name, and later public details such as a website   | `organizations.ts` |
| Skills          | Each competency, named once                        | `skills.ts`        |
| Skill areas     | Titled, ordered selections of skills               | `skills.ts`        |
| Evidence        | Artefacts supporting the work; `src` null until supplied | `evidence.ts` |
| Projects        | Technical projects and their case study content    | `projects.ts`      |
| Experience      | Engagements and their detail content               | `experience.ts`    |

### One direction stored, the other derived

References are stored in one direction only. The reverse is computed in
`queries.ts`, so no fact is written twice and the two sides cannot drift:

- A project names its organization. `getProjectsByOrganization(id)` gives an
  organization its projects, and `getExperiencesByOrganization(id)` gives a
  project its engagement. That is how a case study and an experience page link
  to each other without either naming the other.
- `getExperience(slug)` returns the engagement with `organization` and
  `projects` attached, so an experience page can list the related case studies
  and a case study can link back through `project.organization`.
- `getProjectsBySkill(id)` gives a skill its projects.

An organization's name is written once, in `organizations.ts`, and appears on
the homepage, in experience and in projects from there. The same holds for
every skill label.

### Adding content

- **A project**: add a record to `projects.ts`. Its organization, skills and
  cover evidence must already exist, or the build fails.
- **An organization, skill or piece of evidence**: add a record to its
  collection, then reference it by key.
- **Order** is the order of the keys in the collection. Project numbers
  ("01", "02") are derived from that order.
- **Unconfirmed details** stay `null` or go in `unresolved`, which is never
  rendered.

## Detail pages: one template approach for both

Experience detail pages and project case studies are built from the same
shape. Both records have an optional `sections` field:

```ts
type DetailSection = {
  heading: string;
  surface?: "ink";          // at most one dark section per page
  blocks: ContentBlock[];
};

type ContentBlock =
  | { kind: "prose"; paragraphs: string[] }
  | { kind: "list"; items: string[]; numbered?: boolean }
  | { kind: "stack"; items: { name: string; detail: string }[] }
  | { kind: "sequence"; steps: string[] }
  | { kind: "beforeAfter"; before: string; after: string }
  | { kind: "team"; count; label; members; practicesHeading; practices; note? }
  | { kind: "initiatives"; items: { title; need; contribution; solution; outcome? }[] }
  | { kind: "group"; heading: string; blocks: ContentBlock[] }
  | { kind: "timeline"; layout?: "grid" | "log"; steps: { label?: string; title: string }[] }
  | { kind: "feature" }                 // case studies: the project's own feature
  | { kind: "evidence"; evidenceId: EvidenceId };
```

A record chooses its own chapters and blocks, so organizations with different
kinds of work get differently shaped pages from the same components. `group`
nests blocks under a subheading, which is how one chapter covers several
related topics without each becoming a section of its own. The Vaultz page
uses three chapters: IT operations (four groups), team leadership (a team
block and a group, on the dark surface) and key initiatives. The Cyndex page
uses four shorter ones and puts its one completed project, the corporate email
implementation, on the dark surface as a problem, a numbered contribution and
a before and after. Work that is not finished is separated by status, using
groups headed "In progress" and "In planning". The Pacific Solutions page
centres on a five-step incident response shown as a `sequence` timeline on the
dark surface. The Fosuaa page follows one project from challenge to adoption,
with procurement as a timeline and the outcome as a before and after on the
dark surface. Both pick up their related case study from the project
collection automatically.

### The experience template

[ExperienceDetail.tsx](../src/components/experience/ExperienceDetail.tsx)
builds the whole page from one resolved record. Nothing on it is written in
the component.

| Part                     | Comes from                                        |
| ------------------------ | ------------------------------------------------- |
| Overview                 | organization, `position`, `engagementType`, `intro` (or `description`), `overview` |
| Numbered chapters        | the record's `sections`                           |
| Case studies and evidence | projects and supplied evidence that name the same organization, in one chapter |
| Competencies             | the record's `skillIds`, or its projects' skills  |
| Closing navigation       | the index route, and neighbouring records with pages |

A part with nothing to show is left out and the numbering closes up. The
"On this page" list is generated from the same parts.

**Adding a company page** (Cyndex, Pacific Solutions, Fosuaa) is a content
change only: add `sections` to its record in
[experience.ts](../src/content/experience.ts). The route is generated, the
index entry and the homepage row become links, and previous and next
navigation appears between the pages that exist. No component, route or
navigation file needs to change.

### Rules the template enforces

- **Evidence.** Only evidence with a real `src` is rendered. Awaited evidence
  renders nothing in any environment: no placeholder and no note. The chapter
  is titled for what it actually holds ("Related case studies", "Case studies
  and evidence" or "Supporting evidence") and is left out when it holds
  nothing.
- **Outcomes.** An initiative's `outcome` is optional. It is written only
  where it can be supported, in words, and the row is omitted otherwise.
- **Related projects.** A project links to its case study only when that case
  study is live. Until then its title and summary are plain text.
- **Engagement.** `engagementType` is `null` until verified and is not
  rendered while null.
- **Position wording.** `position.kind` records whether the role is a held
  title, a working description or an area of responsibility, and the label
  shown beside it follows ("Position", "Working role", "Role area").

### The route

[experience/[slug]/page.tsx](../src/app/experience/[slug]/page.tsx) lists the
slugs of records with `sections` in `generateStaticParams`, so each is
prerendered. It sets `instant = false` and reads `params` at the top of the
page: the entire page depends on the slug, and resolving it before rendering
lets an unknown or not-yet-written slug return a true 404.

### Case studies

Both templates are thin. `DetailPage`
([detail/DetailPage.tsx](../src/components/detail/DetailPage.tsx)) owns the
page: breadcrumb, title, fact list, intro, the at-a-glance overview, the
"On this page" list and the numbered chapters. `ExperienceDetail` and
`ProjectDetail` only decide which facts and chapters to hand it.

[ProjectDetail.tsx](../src/components/projects/ProjectDetail.tsx) builds a
case study from one resolved project:

| Part                 | Comes from                                            |
| -------------------- | ----------------------------------------------------- |
| Title                | `headline`, or the project's name                     |
| Facts                | name, organization (linked to its experience page when live), category, `contribution`, `technologies` |
| Intro and overview   | `intro` (or `summary`), `overview`                    |
| Numbered chapters    | the project's `sections`                              |
| Technical competencies | `competencies`, or `skillIds`                       |
| Supporting evidence  | the cover and `evidenceIds`, only those supplied      |
| Related experience   | engagements with the same organization                |
| Closing navigation   | the index route, and neighbouring case studies        |

Everything beyond the title, summary and organization is optional, and each
project writes its own chapters. An incident response, an infrastructure
programme and a software rollout do not share phases, so the template does not
impose any. A fact with no value and a part with nothing to show are left out.

**Adding a case study** is a content change: add `sections` to the project in
[projects.ts](../src/content/projects.ts). Its page is generated, its entry on
the projects index becomes a link, the related case study on its
organization's experience page becomes a link, and previous and next
navigation appears between the case studies that exist.

Three details keep facts in one place:

- **`{ kind: "feature" }`** in a case study chapter is replaced by the
  project's own `feature`, so the before and after shown with the project's
  summary on the homepage is not written a second time.
- **Skill references can carry a label.** `competencies` and an experience
  record's `skillIds` accept `{ id, label }` as well as a plain id, so
  "IT Procurement" can be shown for the existing "Procurement" skill without
  creating a near-duplicate record.
- **Categories are records.** A project names a category by id from
  [project-categories.ts](../src/content/project-categories.ts). A category
  has a short label for lists and an optional full name for the case study.
  Grouping or filtering the index by category later needs no change to the
  projects.

### Three case studies, three shapes

The three case studies show the range the template is meant to cover:

- **Odoo POS implementation** follows a rollout: the problem, evaluation and
  procurement (with a timeline that marks which steps were management's),
  implementation, then the outcome as a before and after on the dark surface.
- **Digital infrastructure improvement** follows an improvement programme:
  the challenge, a six-step timeline from assessment through correction to
  operations, the newsletter system on the dark surface as need, solution and
  implementation, then ongoing management and outcomes.
- **Website security incident response** reads as an incident report: an
  overview, the response as a `log` timeline on the dark surface with the
  outcome beneath it, then the wider responsibilities it sits within.

None of this is in the template. Each is a different `sections` array.

### Featured projects

The projects index shows every project. The homepage shows only the projects
listed in `featuredProjectIds` in `projects.ts`, through
`getFeaturedProjects()`, numbered by their place in that list. Adding a project
to the collection never changes the homepage. A featured project shows a "Read
the case study" link beneath its summary once its case study is live.

The route mirrors the experience route, narrowing the slug with
`isProjectSlug`.

The homepage keeps its own rendering of `ProjectRecord.feature` in
[SelectedWork.tsx](../src/components/sections/SelectedWork.tsx), because there
each form is composed together with the project's cover image. The detail
renderer handles the same three kinds without an image.

A record without `sections` has no detail page and no link pointing to one.
Detail content is written only from confirmed facts; nothing is generated to
fill a template.

## Conventions

- Server Components by default. `MobileMenu` is the only Client Component.
- Internal navigation uses `next/link`. Plain anchors are for same-page
  fragments inside a page's own sections, downloads and external links.
- Every page's content renders inside the layout's `<main id="content">`; a
  page returns its sections and nothing else.
- Inner pages set their metadata with `pageMetadata()`. The root layout
  appends the site name to the title.
- No new dependency without a need the platform cannot meet.

## Verification

```
npx tsc --noEmit
npm run lint
npm run build
```
