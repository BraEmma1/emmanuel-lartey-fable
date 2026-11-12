type ArrowProps = {
  direction?: "down" | "up" | "right" | "left";
  className?: string;
};

const rotation = {
  down: "rotate-0",
  up: "rotate-180",
  right: "-rotate-90",
  left: "rotate-90",
};

/** The site's only icon: a single-stroke arrow, drawn to match the type weight. */
export function Arrow({ direction = "down", className = "" }: ArrowProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={`shrink-0 ${rotation[direction]} ${className}`}
    >
      <path d="M8 2v11.5M3.25 8.75 8 13.5l4.75-4.75" />
    </svg>
  );
}
