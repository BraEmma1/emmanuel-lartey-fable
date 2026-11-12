import Link from "next/link";
import type { Href } from "@/content/navigation";
import { Arrow } from "@/components/ui/Arrow";

type RecordLink = { label: string; href: Href };

type RecordNavProps = {
  /** Names the set of records, for assistive technology. */
  label: string;
  /** The index the record belongs to. */
  back: RecordLink | null;
  /** Neighbouring records. Passed only when their pages exist. */
  previous?: RecordLink | null;
  next?: RecordLink | null;
};

/** Closes a detail page: the way back to its index, and to its neighbours. */
export function RecordNav({ label, back, previous, next }: RecordNavProps) {
  if (!back && !previous && !next) return null;

  return (
    <nav aria-label={label} className="shell pb-[clamp(4rem,8vw,7rem)]">
      <div className="grid gap-x-6 gap-y-8 border-t border-ink pt-8 lg:grid-cols-12 lg:pt-10">
        {back ? (
          <Link
            href={back.href}
            className="display group flex items-baseline gap-[0.35em] text-[clamp(2.125rem,4.8vw,4.75rem)] lg:col-span-7"
          >
            <Arrow
              direction="left"
              className="size-[0.45em] transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span className="link decoration-transparent group-hover:decoration-saffron">
              {back.label}
            </span>
          </Link>
        ) : null}

        {previous || next ? (
          <ul className="lg:col-span-4 lg:col-start-9">
            {(
              [
                ["Previous", previous],
                ["Next", next],
              ] as const
            ).map(([direction, record]) =>
              record ? (
                <li
                  key={direction}
                  className="border-t border-ink/25 last:border-b"
                >
                  <Link
                    href={record.href}
                    className="group flex min-h-11 items-baseline justify-between gap-6 py-4"
                  >
                    <span className="meta text-muted">{direction}</span>
                    <span className="display text-[clamp(1.375rem,1.7vw,1.625rem)] font-medium leading-[1.15] tracking-[-0.02em]">
                      {record.label}
                    </span>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        ) : null}
      </div>
    </nav>
  );
}
