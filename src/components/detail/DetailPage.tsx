import Link from "next/link";
import type { ReactNode } from "react";
import type { Href } from "@/content/navigation";
import { Disclosure } from "@/components/ui/Disclosure";
import { DetailSection } from "./DetailSection";

export type DetailPart = {
  heading: string;
  surface?: "ink" | "panel";
  /** Tighter spacing, for a chapter that holds very little. */
  compact?: boolean;
  content: ReactNode;
};

export type DetailFact = {
  label: string;
  value: string;
  /** Makes the value a link. Pass only when the destination is live. */
  href?: Href | null;
  /** Context rather than the headline facts: waits behind a control on phones. */
  secondary?: boolean;
};

type DetailPageProps = {
  /** The index this record belongs to. Null hides the breadcrumb. */
  breadcrumb: { label: string; href: Href } | null;
  /** The record's own name in the breadcrumb. */
  current: string;
  /** Small line above the title, e.g. "Experience record 01". */
  eyebrow: string;
  title: string;
  /**
   * "name" for a short proper name set at full page-title size; "statement"
   * for a headline sentence, which is set smaller so it holds two lines.
   */
  titleScale?: "name" | "statement";
  facts: DetailFact[];
  intro: string;
  /** The record at a glance: two or three parts beside the intro. */
  overview?: { name: string; detail: string }[];
  /** The numbered chapters, in order. */
  parts: DetailPart[];
  /** Closing navigation. */
  children?: ReactNode;
};

const anchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const titleSizes = {
  name: "text-[clamp(3.25rem,10vw,10.5rem)] leading-[0.88]",
  statement: "max-w-[20ch] text-[clamp(2.75rem,7.4vw,7.75rem)] leading-[0.92]",
};

/**
 * The page every detail record is laid out on: experience records and project
 * case studies alike. It owns the overview header, the "On this page" list and
 * the numbered chapters. The template that calls it decides what the facts and
 * chapters are.
 */
export function DetailPage({
  breadcrumb,
  current,
  eyebrow,
  title,
  titleScale = "name",
  facts,
  intro,
  overview,
  parts,
  children,
}: DetailPageProps) {
  const numbered = parts.map((part, index) => ({
    ...part,
    id: anchor(part.heading),
    number: String(index + 1).padStart(2, "0"),
  }));

  const factList = (
    <dl>
      {facts.map((fact) => (
        <div
          key={fact.label}
          className={`border-b border-ink/25 py-3.5 first:pt-0 max-md:py-3 max-md:first:pt-0 ${fact.secondary ? "dz-extra" : ""}`}
        >
          <dt className="meta text-muted">{fact.label}</dt>
          <dd className="display mt-1 text-[clamp(1.375rem,1.7vw,1.625rem)] font-medium max-md:text-[1.25rem] leading-[1.15] tracking-[-0.02em]">
            {fact.href ? (
              <Link href={fact.href} className="link">
                {fact.value}
              </Link>
            ) : (
              fact.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );

  return (
    <>
      <section aria-labelledby="record-title" className="shell">
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className="pt-2">
            <ol className="meta flex flex-wrap items-center gap-x-3 text-muted">
              <li>
                <Link
                  href={breadcrumb.href}
                  className="link flex h-11 items-center decoration-transparent"
                >
                  {breadcrumb.label}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {current}
              </li>
            </ol>
          </nav>
        ) : null}

        <p className="meta mt-[clamp(0.75rem,2.2vw,2rem)] text-muted">
          {eyebrow}
        </p>
        <h1
          id="record-title"
          className={`display mt-3 ${titleSizes[titleScale]}`}
        >
          {title}
        </h1>

        {/* The overview: the facts, and the shape of the record at a glance. */}
        <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-x-6 gap-y-8 border-t border-ink pt-6 md:gap-y-10 lg:grid-cols-12 lg:pt-7">
          {facts.some((fact) => fact.secondary) ? (
            <Disclosure
              className="lg:col-span-4"
              context="Project facts"
              showLabel="More facts"
              hideLabel="Fewer facts"
              summary={factList}
            />
          ) : (
            <div className="lg:col-span-4">{factList}</div>
          )}

          <div className="lg:col-span-8">
            <p className="display max-w-[36ch] text-[clamp(1.5rem,2.3vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.025em]">
              {intro}
            </p>

            {overview?.length ? (
              <ul
                className={`mt-6 grid gap-x-6 gap-y-6 md:mt-8 md:gap-y-7 lg:mt-9 ${overview.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
              >
                {overview.map((part) => (
                  <li
                    key={part.name}
                    className="border-t-[3px] border-ink pt-[calc(1rem-2px)]"
                  >
                    <h2 className="display text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.05]">
                      {part.name}
                    </h2>
                    <p className="mt-2.5 max-w-[38ch] text-[1.0625rem] leading-[1.5] text-ink/80">
                      {part.detail}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <nav
          aria-labelledby="contents-title"
          className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(3rem,5vw,4.5rem)] max-md:pb-10 max-md:pt-9"
        >
          <h2 id="contents-title" className="meta text-muted">
            On this page
          </h2>
          {/* One row while it fits; longer pages wrap to four columns. */}
          <ol
            className={`mt-4 grid gap-x-6 sm:grid-cols-2 ${numbered.length > 5 ? "lg:grid-cols-4" : "lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none"}`}
          >
            {numbered.map((part) => (
              <li key={part.id} className="border-t border-ink/25">
                <a
                  href={`#${part.id}`}
                  className="group flex min-h-11 gap-3.5 py-3 text-base leading-snug"
                >
                  <span aria-hidden="true" className="text-muted">
                    {part.number}
                  </span>
                  <span className="link decoration-transparent group-hover:decoration-saffron">
                    {part.heading}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {numbered.map((part, index) => (
        <DetailSection
          key={part.id}
          id={part.id}
          number={part.number}
          heading={part.heading}
          surface={part.surface}
          rule={!numbered[index - 1]?.surface}
          compact={part.compact}
        >
          {part.content}
        </DetailSection>
      ))}

      {children}
    </>
  );
}
