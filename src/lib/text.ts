const SMALL_WORDS = new Set(["and", "or", "of", "for", "with", "in", "to", "the", "a"]);

/**
 * Sets a label in title case for display, leaving existing capitals alone
 * ("Amazon SES" stays as written). Skill labels are stored as they were first
 * written, some in sentence case and some in title case; lists that show them
 * side by side use this so they read as one set.
 */
export function titleCase(label: string): string {
  return label
    .split(" ")
    .map((word, index) =>
      index > 0 && SMALL_WORDS.has(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}
