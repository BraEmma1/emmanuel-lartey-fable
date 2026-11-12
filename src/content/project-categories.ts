import type { ProjectCategoryRecord } from "./types";

/**
 * The kinds of project on the site. A project names one category by id, so a
 * category is worded once and can later drive grouping or filtering on the
 * projects index without touching the projects themselves.
 */
export const projectCategories = {
  "business-systems": {
    label: "Business systems",
    name: "Business Systems Implementation & Digital Transformation",
  },
  "digital-infrastructure": {
    label: "Digital infrastructure",
    name: "IT Operations and Digital Infrastructure",
  },
  "security-response": {
    label: "Security response",
    name: "Security and Technical Operations",
  },
} satisfies Record<string, ProjectCategoryRecord>;

export type ProjectCategoryId = keyof typeof projectCategories;
