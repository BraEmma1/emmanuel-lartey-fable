import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Metadata for an inner page. The root layout appends the site name to the
 * title; social cards carry the full title themselves.
 */
export function pageMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  const full = `${title} — ${site.name}`;

  return {
    title,
    description,
    openGraph: {
      type: "profile",
      title: full,
      description,
      siteName: site.name,
      locale: "en_GB",
    },
    twitter: { card: "summary", title: full, description },
  };
}
