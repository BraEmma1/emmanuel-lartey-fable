import type { ExperienceRecord } from "@/content/types";

/**
 * How a position is introduced, matched to how firm its wording is: a held
 * title, a working description of a consulting role, or an area of
 * responsibility.
 */
export const positionLabel: Record<
  ExperienceRecord["position"]["kind"],
  string
> = {
  title: "Position",
  working: "Working role",
  area: "Role area",
};
