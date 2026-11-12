import type { ReactNode } from "react";
import { getEvidence } from "@/content/queries";
import type {
  ContentBlock,
  GroupBlock,
  InitiativesBlock,
  TeamBlock,
} from "@/content/types";
import { Disclosure } from "@/components/ui/Disclosure";
import { EvidenceFigure } from "./EvidenceList";

/*
 * Renders the typed content blocks a detail page is written in. Experience
 * pages and project case studies share this one renderer.
 */

const featureText =
  "display text-[clamp(1.375rem,1.85vw,1.75rem)] font-medium leading-[1.12]";
const subheading = "display text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.05]";
const twoDigits = (index: number) => String(index + 1).padStart(2, "0");

/*
 * Progressive disclosure on phones (see Disclosure.tsx). A list or a run of
 * steps longer than LONG shows its first SHOWN entries and offers the rest;
 * the entries that wait carry the `dz-extra` class. Tablet and up show all.
 */
const LONG = 5;
const SHOWN = 3;
const waits = (index: number, total: number) =>
  total > LONG && index >= SHOWN ? "dz-extra" : "";

/** The disclosure around a long list or run of steps, or the bare content. */
function RestOf({
  total,
  noun,
  context,
  children,
}: {
  total: number;
  noun: string;
  context: string;
  children: ReactNode;
}) {
  if (total <= LONG) return <>{children}</>;
  return (
    <Disclosure
      context={context}
      showLabel={`Show ${total - SHOWN} more ${noun}`}
      hideLabel={`Show fewer ${noun}`}
      summary={children}
    />
  );
}

/** Colour roles that differ between the light and dark surfaces. */
function palette(dark: boolean) {
  return dark
    ? {
        rule: "border-stone/25",
        strong: "border-stone/60",
        heavy: "border-stone",
        soft: "text-haze",
        body: "text-stone/85",
        accent: "text-saffron",
      }
    : {
        rule: "border-ink/25",
        strong: "border-ink",
        heavy: "border-ink",
        soft: "text-muted",
        body: "text-ink/80",
        accent: "",
      };
}

type BlockProps<T> = {
  block: T;
  dark: boolean;
  /** Inside a group: one narrower column, one heading level down. */
  nested: boolean;
};

function Team({ block, dark }: BlockProps<TeamBlock>) {
  const tone = palette(dark);

  return (
    <div>
      <p className="flex items-end gap-x-[0.08em]">
        <span
          className={`wide text-[clamp(6.5rem,17vw,16rem)] leading-[0.74] ${tone.accent}`}
        >
          {block.count}
        </span>
        <span className="display pb-[0.1em] text-[clamp(1.75rem,4vw,4rem)] leading-[0.92]">
          {block.label.split(" ").map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
        </span>
      </p>

      <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-12">
        <div>
          <h3 className={`meta ${tone.soft}`}>Team structure</h3>
          <ul className="mt-4">
            {block.members.map((member) => (
              <li
                key={member.role}
                className={`${featureText} border-t ${tone.rule} py-4 last:border-b`}
              >
                <span className={tone.accent}>{member.count}</span>{" "}
                {member.role}
              </li>
            ))}
          </ul>
        </div>

        {block.note ? (
          <div>
            <h3 className={`meta ${tone.soft}`}>{block.note.heading}</h3>
            <div className={`mt-4 border-t ${tone.rule} pt-4`}>
              <p
                className={`display max-w-[20ch] text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.1] ${tone.accent}`}
              >
                {block.note.text}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {/* The processes are the substance of the leadership: given a heading
          of their own and the full width, not a column beside the team. */}
      <div className={`mt-12 border-t ${tone.strong} pt-6 lg:mt-16`}>
        <h3 className="display max-w-[20ch] text-[clamp(1.75rem,2.7vw,2.625rem)] leading-[1.02]">
          {block.practicesHeading}
        </h3>
        <ol className="mt-7 grid gap-x-6 md:grid-cols-2 lg:mt-9">
          {block.practices.map((practice, index) => (
            <li
              key={practice}
              className={`flex items-baseline gap-5 border-t ${tone.rule} py-5`}
            >
              <span
                aria-hidden="true"
                className={`wide text-[1.0625rem] leading-none ${dark ? tone.accent : tone.soft}`}
              >
                {twoDigits(index)}
              </span>
              <span className={featureText}>{practice}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Initiatives({ block, dark }: BlockProps<InitiativesBlock>) {
  const tone = palette(dark);

  return (
    <ol className="space-y-12 md:space-y-[clamp(3.5rem,6vw,5.5rem)]">
      {block.items.map((item, index) => {
        const rows = [
          ["The need", item.need],
          ["My contribution", item.contribution],
          ["What was implemented", item.solution],
        ] as const;

        return (
          <li key={item.title} className={`border-t ${tone.heavy} pt-5`}>
            <p
              aria-hidden="true"
              className={`wide text-[1.0625rem] leading-none ${tone.soft}`}
            >
              {twoDigits(index)}
            </p>
            <h3 className="display mt-4 max-w-[20ch] text-[clamp(1.875rem,3.2vw,3.25rem)] leading-none">
              {item.title}
            </h3>

            {/* On phones the title and the outcome stay in view; the need, the
                contribution and the solution open beneath. With no outcome
                stated, the contribution stays instead. */}
            <Disclosure
              context={item.title}
              summary={
                <dl className="mt-5 md:mt-7 lg:mt-9">
                  {rows.map(([label, text]) => (
                    <div
                      key={label}
                      className={`grid gap-x-6 gap-y-1.5 border-t ${tone.rule} py-4 md:grid-cols-8 md:py-5 ${
                        item.outcome || label !== "My contribution"
                          ? "dz-extra"
                          : ""
                      }`}
                    >
                      <dt className="meta md:col-span-2 md:pt-1">{label}</dt>
                      <dd
                        className={`max-w-[54ch] text-[1.125rem] leading-[1.5] md:col-span-6 ${dark ? tone.body : ""}`}
                      >
                        {text}
                      </dd>
                    </div>
                  ))}

                  {/* The outcome is the point of the entry: heavier rule, larger type. */}
                  {item.outcome ? (
                    <div
                      className={`grid gap-x-6 gap-y-2 border-t-[3px] ${tone.heavy} pt-[calc(1.25rem-2px)] md:grid-cols-8`}
                    >
                      <dt className="meta md:col-span-2 md:pt-1.5">Outcome</dt>
                      <dd
                        className={`${featureText} max-w-[34ch] md:col-span-6`}
                      >
                        {item.outcome}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              }
            />
          </li>
        );
      })}
    </ol>
  );
}

/**
 * A timeline: one continuous rule per row, a square marker where each step
 * begins, and the steps numbered in order. Rows are kept even: two or four
 * steps sit two to a row, anything else three to a row.
 */
function Timeline({
  steps,
  dark,
  nested,
  folded,
  context,
}: {
  steps: { label?: string; title: string }[];
  dark: boolean;
  nested: boolean;
  folded: boolean;
  context: string;
}) {
  const tone = palette(dark);
  const pairs = nested || steps.length === 2 || steps.length === 4;
  // Inside a disclosure already: shown whole, never a second control.
  const total = folded ? 0 : steps.length;

  return (
    <RestOf total={total} noun="steps" context={context}>
      <ol
        className={`grid ${pairs ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
      >
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`relative border-t ${tone.strong} pb-6 pr-6 pt-5 md:pb-9 md:pt-6 ${waits(index, total)} before:absolute before:-top-[5px] before:left-0 before:size-[9px] ${dark ? "before:bg-saffron" : "before:bg-ink"}`}
          >
            <p
              className={`wide text-[1.0625rem] leading-none ${dark ? tone.accent : tone.soft}`}
            >
              <span className="sr-only">Step </span>
              {twoDigits(index)}
            </p>
            {step.label ? <p className="meta mt-4">{step.label}</p> : null}
            <p
              className={`${featureText} ${step.label ? "mt-1.5 max-w-[20ch]" : "mt-4 max-w-[16ch]"}`}
            >
              {step.title}
            </p>
          </li>
        ))}
      </ol>
    </RestOf>
  );
}

/**
 * The same timeline read downwards, as a log: each stage is a row, with its
 * number and name on the left and what was done on the right.
 */
function TimelineLog({
  steps,
  dark,
}: {
  steps: { label?: string; title: string }[];
  dark: boolean;
}) {
  const tone = palette(dark);

  // On phones the stages stay listed by name; their descriptions open together.
  const describes = steps.every((step) => step.label);

  return (
    <Disclosure
      context="Description of each stage"
      showLabel="View stage details"
      hideLabel="Hide stage details"
      summary={
        <ol>
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={`relative grid gap-x-6 gap-y-3 border-t ${tone.strong} pb-5 pt-5 md:pb-8 md:pt-6 before:absolute before:-top-[5px] before:left-0 before:size-[9px] md:grid-cols-8 ${dark ? "before:bg-saffron" : "before:bg-ink"}`}
            >
              <p className="flex items-baseline gap-4 md:col-span-3">
                <span
                  className={`wide text-[1.0625rem] leading-none ${dark ? tone.accent : tone.soft}`}
                >
                  <span className="sr-only">Stage </span>
                  {twoDigits(index)}
                </span>
                {step.label ? (
                  <span className={subheading}>{step.label}</span>
                ) : null}
              </p>
              <p
                className={`max-w-[34ch] text-[1.1875rem] leading-[1.45] md:col-span-5 ${dark ? tone.body : ""} ${describes ? "dz-extra" : ""}`}
              >
                {step.title}
              </p>
            </li>
          ))}
        </ol>
      }
    />
  );
}

function Group({ block, dark }: BlockProps<GroupBlock>) {
  const tone = palette(dark);
  const [lead, ...rest] = block.blocks;

  // On phones a group that opens with prose shows that prose and keeps the
  // remaining blocks (a list, steps) behind a control. A group made only of
  // a list or of its own prose is left whole; a long list trims itself.
  const folds = lead?.kind === "prose" && rest.length > 0;
  const body = folds ? (
    <Disclosure
      context={block.heading}
      summary={<ContentBlocks blocks={[lead]} dark={dark} nested />}
    >
      <div className="space-y-6">
        <ContentBlocks blocks={rest} dark={dark} nested folded />
      </div>
    </Disclosure>
  ) : (
    <ContentBlocks
      blocks={block.blocks}
      dark={dark}
      nested
      context={block.heading}
    />
  );

  return (
    <div
      className={`grid gap-x-6 gap-y-5 border-t ${tone.strong} pt-6 md:grid-cols-8`}
    >
      <h3 className={`${subheading} max-w-[16ch] md:col-span-3`}>
        {block.heading}
      </h3>
      <div className="space-y-6 md:col-span-5">{body}</div>
    </div>
  );
}

function Block({
  block,
  dark,
  nested,
  folded,
  context,
}: BlockProps<ContentBlock> & { folded: boolean; context: string }) {
  const tone = palette(dark);
  const ItemHeading = nested ? "h4" : "h3";
  const columns = nested ? "" : "md:grid-cols-2";

  switch (block.kind) {
    case "prose":
      return (
        <div className="space-y-4">
          {block.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className={`max-w-[58ch] text-[1.125rem] leading-[1.55] ${dark ? tone.body : ""}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      );

    case "list": {
      const row = `border-t ${tone.rule} py-3.5 text-[1.0625rem] font-medium leading-snug ${nested ? "last:border-b" : ""}`;

      // Numbered: the order is part of the meaning, so it stays one column.
      const total = folded ? 0 : block.items.length;
      const wait = (index: number) => (folded ? "" : waits(index, total));

      if (block.numbered) {
        return (
          <RestOf total={total} noun="items" context={context}>
            <ol>
              {block.items.map((item, index) => (
                <li
                  key={item}
                  className={`flex items-baseline gap-4 ${row} ${wait(index)}`}
                >
                  <span
                    aria-hidden="true"
                    className={`wide text-[0.9375rem] leading-none ${dark ? tone.accent : tone.soft}`}
                  >
                    {twoDigits(index)}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </RestOf>
        );
      }

      return (
        <RestOf total={total} noun="items" context={context}>
          <ul className={`grid gap-x-6 ${columns}`}>
            {block.items.map((item, index) => (
              <li key={item} className={`${row} ${wait(index)}`}>
                {item}
              </li>
            ))}
          </ul>
        </RestOf>
      );
    }

    case "stack":
      return (
        <ul className={`grid gap-x-6 ${columns}`}>
          {block.items.map((item) => (
            <li key={item.name} className={`border-t ${tone.rule} pb-7 pt-4`}>
              <ItemHeading className={featureText}>{item.name}</ItemHeading>
              <p
                className={`mt-2 max-w-[42ch] text-[1.0625rem] leading-[1.5] ${tone.body}`}
              >
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      );

    case "sequence":
      return (
        <Timeline
          steps={block.steps.map((title) => ({ title }))}
          dark={dark}
          nested={nested}
          folded={folded}
          context={context}
        />
      );

    case "timeline":
      return block.layout === "log" ? (
        <TimelineLog steps={block.steps} dark={dark} />
      ) : (
        <Timeline
          steps={block.steps}
          dark={dark}
          nested={nested}
          folded={folded}
          context={context}
        />
      );

    case "beforeAfter":
      return (
        <div className="grid gap-x-6 gap-y-8 md:grid-cols-2">
          <div className={`border-t ${tone.rule} pt-4`}>
            <ItemHeading className={`meta ${tone.soft}`}>Before</ItemHeading>
            <p className={`${featureText} mt-4 max-w-[20ch] ${tone.soft}`}>
              {block.before}
            </p>
          </div>
          <div className={`border-t-[3px] pt-[calc(1rem-2px)] ${tone.heavy}`}>
            <ItemHeading className="meta">After</ItemHeading>
            <p className={`${featureText} mt-4 max-w-[22ch]`}>{block.after}</p>
          </div>
        </div>
      );

    case "group":
      return <Group block={block} dark={dark} nested={nested} />;

    case "team":
      return <Team block={block} dark={dark} nested={nested} />;

    case "initiatives":
      return <Initiatives block={block} dark={dark} nested={nested} />;

    // Resolved to the project's feature by the case study template before
    // it reaches here; on its own it has nothing to show.
    case "feature":
      return null;

    case "evidence": {
      // Only genuine, supplied evidence is shown inline.
      const item = getEvidence(block.evidenceId);
      return item.src ? <EvidenceFigure item={item} /> : null;
    }
  }
}

export function ContentBlocks({
  blocks,
  dark = false,
  nested = false,
  folded = false,
  context = "this section",
}: {
  blocks: ContentBlock[];
  dark?: boolean;
  nested?: boolean;
  /** Already inside a disclosure: its lists are shown whole. */
  folded?: boolean;
  /** Names the surrounding section, so each control can say what it opens. */
  context?: string;
}) {
  return (
    <>
      {blocks.map((block, index) => (
        <Block
          key={`${block.kind}-${index}`}
          block={block}
          dark={dark}
          nested={nested}
          folded={folded}
          context={context}
        />
      ))}
    </>
  );
}
