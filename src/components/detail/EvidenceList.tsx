import type { Evidence } from "@/content/queries";
import { Arrow } from "@/components/ui/Arrow";
import { AssetFrame } from "@/components/ui/AssetFrame";

/** Evidence that genuinely exists. Awaited evidence is never shown. */
export function suppliedEvidence(evidence: Evidence[]) {
  return evidence.filter((item) => item.src);
}

/** One supplied piece of evidence: an image in a frame, or a ruled link. */
export function EvidenceFigure({ item }: { item: Evidence }) {
  if (!item.src) return null;

  if (item.kind === "image") {
    return (
      <div>
        <AssetFrame
          label={item.description}
          src={item.src}
          sizes="(min-width: 64rem) 60vw, 100vw"
          className="aspect-[3/2]"
        />
        <p className="meta mt-3 text-muted">{item.description}</p>
      </div>
    );
  }

  return (
    <p className="border-t border-ink/25 py-5">
      <a
        href={item.src}
        className="link flex min-h-11 items-center justify-between gap-6 text-[1.0625rem] font-medium decoration-transparent"
        {...(item.kind === "link"
          ? { target: "_blank", rel: "noreferrer" }
          : { download: true })}
      >
        {item.description}
        <Arrow direction="right" />
      </a>
    </p>
  );
}

/**
 * Supporting evidence for a record. Renders only what has been supplied, and
 * nothing at all when there is none: no placeholder, no empty gallery.
 */
export function EvidenceList({ evidence }: { evidence: Evidence[] }) {
  const supplied = suppliedEvidence(evidence);
  if (supplied.length === 0) return null;

  return (
    <div className="space-y-10">
      {supplied.map((item) => (
        <EvidenceFigure key={item.id} item={item} />
      ))}
    </div>
  );
}
