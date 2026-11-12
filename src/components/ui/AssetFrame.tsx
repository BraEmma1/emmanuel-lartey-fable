import Image from "next/image";

type AssetFrameProps = {
  /** What the real image shows, or should show once supplied. */
  label: string;
  /** Path to the real asset. While null, a marked placeholder is rendered. */
  src: string | null;
  /** Short name for the kind of asset, shown on the placeholder. */
  kind?: string;
  /** The frame's proportion, shown on the placeholder as a brief for the asset. */
  ratio?: string;
  /** Tailwind aspect/size classes for the frame. */
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * A fixed-ratio frame for genuine imagery. Until a real asset is supplied it
 * renders a clearly identified placeholder with print-style crop marks, so the
 * layout never shifts when the photograph arrives.
 */
export function AssetFrame({
  label,
  src,
  kind = "Image",
  ratio,
  className = "",
  sizes = "(min-width: 64rem) 40vw, 100vw",
  priority = false,
}: AssetFrameProps) {
  if (src) {
    return (
      <figure className={`relative overflow-hidden bg-tone ${className}`}>
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </figure>
    );
  }

  return (
    <figure
      role="img"
      aria-label={`Placeholder. ${kind} to be supplied: ${label}`}
      className={`crop-marks relative flex flex-col justify-between p-7 text-ink ${className}`}
    >
      <p className="flex items-center justify-between gap-3 text-sm font-medium">
        <span className="flex items-center gap-2">
          <span className="size-2 shrink-0 bg-saffron" />
          {kind} placeholder
        </span>
        {ratio ? <span className="text-muted">{ratio}</span> : null}
      </p>
      <figcaption className="max-w-[26ch] text-sm leading-snug text-muted">
        <span className="block font-medium text-ink">To be supplied</span>
        {label}
      </figcaption>
    </figure>
  );
}
