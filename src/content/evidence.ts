import type { EvidenceRecord } from "./types";

/**
 * Real artefacts that support the work described on the site. A record is
 * added as soon as the artefact is known to be needed; `src` stays null until
 * the genuine file exists, and the UI shows a marked placeholder meanwhile.
 */
export const evidence = {
  "fosuaa-pos-in-use": {
    kind: "image",
    description: "The point-of-sale system in use at Fosuaa Herbal Center",
    src: null,
    organizationId: "fosuaa-herbal-center",
  },
  "vaultz-publishing-infrastructure": {
    kind: "image",
    description: "The Vaultz News publishing and newsletter infrastructure",
    src: null,
    organizationId: "the-vaultz-news",
  },
  "pacific-incident-documentation": {
    kind: "image",
    description:
      "Documentation from the Pacific Solutions Ghana incident response",
    src: null,
    organizationId: "pacific-solutions-ghana",
  },
} satisfies Record<string, EvidenceRecord>;

export type EvidenceId = keyof typeof evidence;
