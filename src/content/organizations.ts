import type { OrganizationRecord } from "./types";

/** Every organization named anywhere on the site. The key is its id. */
export const organizations = {
  "the-vaultz-news": {
    name: "The Vaultz News",
    sector: "News and digital publishing",
  },
  "cyndex-limited": { name: "Cyndex Limited" },
  "pacific-solutions-ghana": { name: "Pacific Solutions Ghana" },
  "fosuaa-herbal-center": { name: "Fosuaa Herbal Center" },
} satisfies Record<string, OrganizationRecord>;

export type OrganizationId = keyof typeof organizations;
