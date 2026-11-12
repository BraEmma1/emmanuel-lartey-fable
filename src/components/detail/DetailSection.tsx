import type { ReactNode } from "react";

type DetailSectionProps = {
  /** Anchor id, also used to label the section. */
  id: string;
  /** Position on the page, as displayed: "01", "02", … */
  number: string;
  heading: string;
  /** Stone by default. Ink and panel are full-bleed fields. */
  surface?: "ink" | "panel";
  /** Draws the opening rule. Off when the section follows a coloured field. */
  rule?: boolean;
  /** Tighter vertical padding, for a chapter that holds very little. */
  compact?: boolean;
  children: ReactNode;
};

/**
 * One numbered section of a detail page: the heading holds the left columns
 * and stays in view on wide screens while its content scrolls beside it.
 */
export function DetailSection({
  id,
  number,
  heading,
  surface,
  rule = true,
  compact = false,
  children,
}: DetailSectionProps) {
  const dark = surface === "ink";
  const field = dark
    ? "on-dark bg-ink text-stone"
    : surface === "panel"
      ? "bg-panel"
      : "";
  const spacing = surface
    ? "py-[clamp(4rem,8vw,7.5rem)]"
    : compact
      ? "py-[clamp(2.75rem,4.5vw,4.25rem)]"
      : "py-[clamp(3.5rem,7vw,6.5rem)]";

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={field}>
      <div className="shell">
        <div
          className={`grid gap-x-6 gap-y-8 lg:grid-cols-12 ${spacing} ${!surface && rule ? "border-t border-ink" : ""}`}
        >
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p
                aria-hidden="true"
                className={`meta ${dark ? "text-haze" : "text-muted"}`}
              >
                {number}
              </p>
              <h2
                id={`${id}-title`}
                className="display mt-4 max-w-[13ch] text-[clamp(1.875rem,3vw,3rem)] leading-none"
              >
                {heading}
              </h2>
            </div>
          </div>

          <div className="space-y-9 lg:col-span-8 lg:space-y-11">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
