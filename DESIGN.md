# Design system

The approved visual system for the Emmanuel Lartey portfolio. It documents what
the homepage already does, so that new pages extend it rather than reinvent it.
The source of truth for values is [src/app/globals.css](src/app/globals.css);
if this file and the stylesheet disagree, the stylesheet is right and this file
needs updating.

## Direction

Swiss editorial. The page is built from type, rules and space: oversized
grotesque headlines, a strict column grid, thin horizontal rules, flat colour
fields. There is one accent and one icon. Nothing is decorative; every element
either says something or separates two things that do.

## Colour

Seven tokens, defined in `@theme` and available as Tailwind utilities
(`bg-ink`, `text-muted`, `border-stone/20`, …).

| Token     | Value     | Role                                              |
| --------- | --------- | ------------------------------------------------- |
| `ink`     | `#17153B` | Primary text, rules, dark sections                |
| `stone`   | `#E9EAE6` | Main background; text on dark sections            |
| `panel`   | `#F3F3F0` | Lighter surface for an alternating section        |
| `tone`    | `#D8D9D2` | Image frames and placeholder fields               |
| `saffron` | `#F5A800` | The single accent                                 |
| `muted`   | `#55546E` | Secondary text on `stone` and `panel`             |
| `haze`    | `#B3B2CC` | Secondary text on `ink`                           |

Rules for use:

- **Four surfaces only**: `stone` (default), `panel`, `ink`, `saffron`. A page
  is a sequence of full-width fields in these colours. The homepage runs
  stone → ink → stone → panel → ink → stone → saffron.
- **Saffron is scarce.** On light surfaces it appears only as a hover state, the
  text selection colour and the small placeholder marker. On `ink` it may
  colour a phrase or numeral that carries the point of the section. As a
  surface it is reserved for the closing call to action. Never use it for body
  text on a light surface.
- **Opacity, not new colours.** Softer text and rules are made with opacity on
  the existing tokens (`text-ink/80`, `text-stone/85`, `border-ink/25`).
- Dark sections carry the `on-dark` class, which switches the focus ring to
  saffron and the selection colour to stone.

## Typography

Two families, loaded with `next/font` in
[src/app/layout.tsx](src/app/layout.tsx).

- **Archivo** (`--font-display`), variable on weight and width. It speaks in two
  voices from one family.
- **Hanken Grotesk** (`--font-sans`), for all running text.

### Voices

| Class      | Setting                                                    | Used for                                   |
| ---------- | ---------------------------------------------------------- | ------------------------------------------ |
| `.wide`    | Archivo, width 125%, weight 800, tracking −0.02em          | The name, the wordmark, large numerals     |
| `.display` | Archivo, weight 600, tracking −0.035em, leading 0.96, balanced | Every heading and large statement      |
| `.meta`    | Hanken, 0.9375rem, weight 500, leading 1.4                 | Labels, step numbers, engagement lines     |
| body       | Hanken, 1.0625rem, leading 1.6                             | Running text                               |

`.wide` is always uppercase when it sets words. `.display` is always sentence
case. Smaller `.display` settings drop to weight 500 and tracking −0.02em.

### Scale

Sizes are fluid `clamp()` values tied to viewport width, so headlines stay
oversized at every width without breakpoint jumps.

| Level                  | Size                                        | Leading   |
| ---------------------- | ------------------------------------------- | --------- |
| Name (hero)            | Sized from its container to span the measure | 0.84      |
| Statement headline     | `clamp(2.75rem, 8.2vw, 8.75rem)` to `clamp(3.25rem, 11vw, 12rem)` | 0.9–0.93 |
| Section title (`.section-title`) | `clamp(2.75rem, 7.4vw, 7.75rem)`  | 0.96      |
| Numeral (`.wide`)      | `clamp(4.5rem, 13.5vw, 14rem)` and larger   | 0.74–0.8  |
| Page title (inner pages) | `clamp(3.25rem, 10vw, 10.5rem)`           | 0.88      |
| Entry title            | `clamp(2.125rem, 4.8vw, 4.75rem)`           | 0.96      |
| Detail section heading | `clamp(1.875rem, 3vw, 3rem)`                | 1.0       |
| Initiative title       | `clamp(1.875rem, 3.2vw, 3.25rem)`           | 1.0       |
| Group subheading       | `clamp(1.5rem, 2.1vw, 2rem)`                | 1.05      |
| Statement (inner pages) | `clamp(1.375rem, 2vw, 2rem)` to `clamp(1.5rem, 2.3vw, 2.25rem)`, weight 500 | 1.12–1.14 |
| Row title              | `clamp(2.125rem, 3.7vw, 3.75rem)`           | 0.96      |
| Sub-heading            | `clamp(1.75rem, 2.7vw, 2.625rem)`           | 1.02–1.08 |
| Feature text           | `clamp(1.375rem, 1.85vw, 1.75rem)`, weight 500 | 1.12–1.15 |
| Lead paragraph         | 1.125rem (1.1875rem for a project summary)  | 1.55      |
| Body                   | 1.0625rem                                   | 1.55–1.6  |
| Supporting text        | 1rem                                        | 1.5–1.7   |
| Meta                   | 0.9375rem                                   | 1.4       |
| Fine print             | 0.875rem                                    | snug      |

A new page takes its sizes from this table. Introduce a new size only when no
level fits, and add it here.

### Measure

Text blocks are capped in `ch`, never left to fill a column: headlines
12–20ch, lead paragraphs 40–58ch, body 44–52ch, supporting text 26–34ch.

## Layout

- **Shell**: `.shell` centres content at a maximum of 105rem with a fluid
  gutter, `--gutter: clamp(1.25rem, 3.4vw, 3rem)`.
- **Section rhythm**: `.section` sets vertical padding of
  `clamp(4.5rem, 10vw, 9.5rem)`. Coloured fields are full-bleed; the shell sits
  inside them.
- **Grid**: twelve columns from 64rem up, with a 1.5rem column gap
  (`lg:grid-cols-12 gap-x-6`). Below that, a single column with everything on
  the same left edge. Nested content uses a nine- or eight-column sub-grid that
  aligns to the parent.
- **Section header pattern**: title across 7–8 columns, a short introduction
  in the remaining 4–5, both aligned to the baseline (`items-end`).
- **Asymmetry is deliberate.** Content is offset with `col-start` rather than
  centred. Nothing on the site is centre-aligned.
- **Breakpoints**: 40rem, 48rem, 64rem, 80rem (Tailwind `sm`, `md`, `lg`,
  `xl`). The main structural shift is at 64rem.
- **Header**: sticky, 4rem tall (`--header-h`), on `stone` with a hairline
  beneath. In-page anchors are offset by `scroll-padding-top`.

## Rules

Horizontal rules do the work that boxes do elsewhere. All are 1px unless noted.

| Weight                 | Class                           | Meaning                              |
| ---------------------- | ------------------------------- | ------------------------------------ |
| Full                   | `border-ink`                    | Opens a major entry or a new block   |
| Standard               | `border-ink/25`                 | Separates rows in a list             |
| Light                  | `border-ink/15`, `border-ink/20` | Header edge, minor asides           |
| On dark                | `border-stone/20`, `border-stone/25` | The same roles on `ink`         |
| Emphasis (3px)         | `border-t-[3px] border-ink`     | Marks the outcome in a comparison    |

Rules sit above the content they introduce (`border-t` with padding below).
Lists close with a final rule (`last:border-b`). There are no vertical rules,
no boxes, no shadows and no rounded corners.

## Components

Reusable pieces live in [src/components](src/components).

- **`Arrow`** ([ui/Arrow.tsx](src/components/ui/Arrow.tsx)): the site's only
  icon. A single 1.5px stroke, pointing down, up, right or left. It signals
  direction of travel: down for in-page, right for a link that goes deeper,
  left for the way back.
- **`AssetFrame`** ([ui/AssetFrame.tsx](src/components/ui/AssetFrame.tsx)): a
  fixed-ratio frame for genuine imagery. With no source it renders a labelled
  placeholder on `tone` with print-style crop marks (`.crop-marks`), stating
  what is to be supplied and at what ratio. Layout never shifts when the real
  image arrives. Ratios in use: 4:5, 3:2, 3:1, 21:9, 4:3.
- **Text link** (`.link`): a 1px underline offset by 0.3em. On hover the
  underline thickens to 2px and turns saffron. In navigation the underline is
  transparent until hover (`decoration-transparent`).
- **Primary action**: a solid `ink` block, 3.25rem tall, 1.5rem horizontal
  padding, `stone` text, square corners, with an `Arrow`. On hover it turns
  saffron with ink text. One per view.
- **Row list**: the pattern behind experience, expertise, practices and
  contact details. Each row is a grid on the page columns, opened by a rule,
  with a `.display` title and supporting text beside it.
- **Site shell**: `SiteHeader`, `MobileMenu` and `SiteFooter` in
  [layout/](src/components/layout), rendered once by the root layout.

What the system does not have, on purpose: cards, badges, pills, tags, icon
sets, gradients, shadows, rounded corners, background imagery, carousels.

## Inner pages

The homepage makes people remember the name. The inner pages are there to
convince: the same identity, with the expression turned down and the structure
turned up. They are built from these pieces.

- **`PageIntro`** ([layout/PageIntro.tsx](src/components/layout/PageIntro.tsx)):
  opens an index page. One page title across eight columns, a statement in the
  remaining four, baseline-aligned.
- **Index entry**
  ([experience/ExperienceIndex.tsx](src/components/experience/ExperienceIndex.tsx)):
  a full rule, a small `.wide` numeral, the name as an entry title, then a
  detail column holding a labelled role, a description and a two-row metadata
  list. An entry with a detail page is a single link target: the name
  underlines in saffron and its arrow moves on hover. An entry without one has
  no hover state and no arrow.
- **Record overview**
  ([experience/ExperienceDetail.tsx](src/components/experience/ExperienceDetail.tsx)):
  a breadcrumb, the organization as the page title, then a ruled fact list
  beside a short statement. Beneath the statement, the parts of the role sit
  side by side, each under a 3px rule, so the shape of the job is clear on the
  first screen. A numbered "On this page" row of anchors follows.
- **`DetailSection`**
  ([detail/DetailSection.tsx](src/components/detail/DetailSection.tsx)): a
  numbered chapter. The heading holds four columns and stays in view on wide
  screens while the content scrolls in the other eight. A detail page has a
  few chapters, not many sections: related topics are grouped inside one.
- **Content blocks**
  ([detail/ContentBlocks.tsx](src/components/detail/ContentBlocks.tsx)):
  prose; a compact ruled list; a list of named items with a line of detail; a
  numbered sequence; a before and after; a team figure; initiatives; and a
  group.
- **Group.** A subheading in three columns with its own blocks in the other
  five, opened by a full rule. This is how one chapter holds several topics.
  It is also how status is shown: unfinished work sits under plain group
  headings such as "In progress" and "In planning", not under badges.
- **Numbered list.** A compact list with small `.wide` numerals, for steps
  whose order matters. Saffron numerals on the dark surface.
- **Sequence.** A timeline for a process worth showing step by step: one
  continuous rule per row, a small square marker where each step begins, a
  `.wide` numeral and the step in feature text. Rows are kept even: two or four steps sit two
  to a row, anything else three to a row on wide screens and two on tablets;
  one to a row on phones. Markers and numerals are saffron on the dark
  surface. A `timeline` is the same form with a short label above each step,
  naming its phase or who it belonged to. Its `log` layout reads downwards:
  one stage to a row, with the number and stage name on the left and what was
  done on the right. It is for stages with longer descriptions, such as an
  incident response, and it needs no props, icons or code styling to read as
  technical.
- **Short chapters.** In a case study, a chapter that holds a single short
  list or paragraph takes tighter padding (`clamp(2.75rem, 4.5vw, 4.25rem)`),
  so little content is not surrounded by a full chapter's worth of space.
- **Competency labels** are shown in title case on experience pages
  (`titleCase()` in `src/lib/text.ts`) so labels written at different times
  read as one set.
- **Initiatives.** Each entry has a small `.wide` numeral and an entry-size
  title, then labelled rows: "The need", "My contribution", "What was
  implemented". The label sits in a narrow column and the text is set at
  lead-paragraph size, never in small multi-column blocks. "Outcome" closes
  the entry under a 3px rule in feature text, and is omitted when no outcome
  can be supported.
- **Team.** The headline figure, then team structure beside recruitment, then
  the management processes under their own heading at full width with
  saffron numerals.
- **Rhythm.** Generous space separates chapters
  (`clamp(3.5rem, 7vw, 6.5rem)`, more on coloured fields). Inside a chapter,
  blocks sit 2.25 to 2.75rem apart and list rows are tight. Space signals a
  change of subject, so it is not spent between related items.
- **Text sizes.** Supporting text on inner pages is 1.0625rem at 80% ink, not
  1rem muted: these pages are read closely. `meta` labels that name a row of
  content are set in ink; `muted` is kept for section numbers and captions.
- **One dark section per page.** A detail page may set a single section on
  `ink` to carry its most important point, with a `.wide` numeral in saffron.
  On the Vaultz page that is the team. Related case studies sit on `panel`.
- **Evidence** ([detail/EvidenceList.tsx](src/components/detail/EvidenceList.tsx)):
  supplied images sit in an `AssetFrame` with a caption; documents and links
  are ruled rows. It shares a chapter with related case studies. Evidence that
  has not been supplied renders nothing: no placeholder, no empty gallery and
  no note about what is missing.
- **Projects index**
  ([projects/ProjectIndex.tsx](src/components/projects/ProjectIndex.tsx)): the
  more expressive of the two indexes. Each entry opens with a full rule and a
  large `.wide` numeral in the first three columns, as on the homepage, with
  the project name at entry-title size beside it, then the organization and
  category, the summary, and a "Demonstrated" rail. There are no project
  images and no feature blocks here: the index is typography only. An entry
  with a case study is a single link target.
- **Case study header.** The same overview as an experience record, with two
  differences: the title is a headline sentence, set at section-title size
  (`clamp(2.75rem, 7.4vw, 7.75rem)`, capped at 20ch) so it holds two lines,
  and the fact list may carry a link (the organization, to its experience
  page).
- **`RecordNav`** ([detail/RecordNav.tsx](src/components/detail/RecordNav.tsx)):
  closes a detail page with the way back to its index at entry-title size, and
  previous and next records once those pages exist.

## Motion

- Easing: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`.
- One authored moment per page. On the homepage the name rises into place and
  the portrait frame opens beneath it. New pages may have one equivalent
  entrance, and nothing else animates on load.
- Interaction feedback is limited to colour and underline transitions of
  0.2–0.3s and a small arrow nudge on linked rows.
- All motion, including smooth scrolling, sits behind
  `prefers-reduced-motion: no-preference`.

## Accessibility

- Visible focus on everything: a 2px outline offset by 3px, `ink` on light
  surfaces and saffron inside `.on-dark`.
- Interactive targets are at least 2.75rem (44px) tall.
- A skip link is the first focusable element; every page's content sits in
  `<main id="content">`.
- One `h1` per page. Sections are labelled by their heading with
  `aria-labelledby`.
- Decorative numerals are `aria-hidden`, with a visually hidden text
  equivalent where the number carries meaning.
- Placeholders announce themselves as placeholders to assistive technology.

## Content principles that shape the design

- **Nothing is invented.** A detail that has not been supplied is `null` in the
  content and renders as an explicit placeholder or not at all.
- **The page states what is true and leaves out the rest.** No figures that
  are not verified, and no public notes about what is unverified or
  unfinished. An outcome is described in words where it can be supported and
  omitted where it cannot.
- **Nothing is clickable unless it leads somewhere real.** Links appear only
  when their destination exists.
- **Each piece of work is shown in the form that suits it**: a before and
  after, a list of systems, or a sequence of steps, rather than one template
  applied to everything.

## Extending to new pages

1. Compose from the surfaces, voices, grid and rules above. Reuse `.shell`,
   `.section`, `.display`, `.wide`, `.meta`, `.link`.
2. Open each page with one oversized headline in `.display`. `.wide` at
   headline size and the homepage hero composition belong to the name.
3. Alternate surfaces to pace a long page, and end on a clear next step.
4. Prefer a ruled list or a column composition over any boxed layout.
5. If a page needs a new token, size or component, add it to the stylesheet
   and record it here in the same change.
