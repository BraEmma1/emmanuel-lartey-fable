/**
 * Route registry and navigation.
 *
 * Every planned route is declared here with a status. Nothing on the site may
 * link to a route unless it is "live", so a link can never lead to a page that
 * does not exist. Shipping a page is two steps: add it under `src/app`, then
 * flip its status here. Navigation and record links follow automatically.
 */

export type RouteId =
  | "home"
  | "experience"
  | "experienceDetail"
  | "projects"
  | "projectDetail"
  | "about"
  | "resume"
  | "contact";

type RouteDefinition = {
  /** App Router path. Detail routes carry a `[slug]` segment. */
  path: `/${string}`;
  status: "live" | "planned";
};

export const routes: Record<RouteId, RouteDefinition> = {
  home: { path: "/", status: "live" },
  experience: { path: "/experience", status: "live" },
  experienceDetail: { path: "/experience/[slug]", status: "live" },
  projects: { path: "/projects", status: "live" },
  projectDetail: { path: "/projects/[slug]", status: "live" },
  about: { path: "/about", status: "planned" },
  resume: { path: "/resume", status: "planned" },
  contact: { path: "/contact", status: "planned" },
};

export type Href = `/${string}`;

/**
 * The link for a route, or null while the route is not live. Detail routes
 * take the record's slug.
 */
export function routeHref(id: RouteId, slug?: string): Href | null {
  const { path, status } = routes[id];
  if (status !== "live") return null;
  if (!path.includes("[slug]")) return path;
  return slug ? (path.replace("[slug]", slug) as Href) : null;
}

/* ── Primary navigation ───────────────────────────────────── */

type NavDefinition = {
  label: string;
  /** Id of the homepage section this item points to. */
  section: string;
  /** Dedicated page that takes over from the section once it is live. */
  route?: RouteId;
};

const primary: NavDefinition[] = [
  { label: "Approach", section: "approach" },
  { label: "Work", section: "work", route: "projects" },
  { label: "Experience", section: "experience", route: "experience" },
  { label: "Leadership", section: "leadership" },
  { label: "Expertise", section: "expertise" },
  { label: "Contact", section: "contact", route: "contact" },
];

export type NavItem = { label: string; href: Href };

/**
 * Each item links to its dedicated page when that page is live and to its
 * homepage section otherwise. Hrefs are absolute ("/#work") so the same
 * header and footer work from every page.
 */
export const navItems: NavItem[] = primary.map(({ label, section, route }) => ({
  label,
  href: (route && routeHref(route)) ?? `/#${section}`,
}));
