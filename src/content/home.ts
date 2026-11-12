/**
 * Editorial copy that belongs to the homepage alone. Records shared with
 * other pages (organizations, projects, experience, skills, evidence) live in
 * their own modules and are read through `queries.ts`.
 */

/* ── Approach ─────────────────────────────────────────────── */

export const approach = {
  headline: {
    lead: "Technology should solve business problems,",
    turn: "not create new ones.",
  },
  paragraphs: [
    "My work starts with the business, not the tool. Before anything is bought or built, I look at how the organization actually operates: where its records live, where time is lost, and what people need from a system on an ordinary working day.",
    "From there I evaluate the options, implement what fits, and stay responsible for it afterwards. That means administering users, supporting staff, fixing what breaks and improving what can be better. Technology has earned its place when the people relying on it no longer have to think about it.",
  ],
  steps: [
    {
      name: "Assess",
      text: "Understand the operation and the real problem before choosing any technology.",
    },
    {
      name: "Implement",
      text: "Evaluate, procure and deploy systems that fit how the business works.",
    },
    {
      name: "Operate",
      text: "Administer, support and secure those systems day to day.",
    },
    {
      name: "Improve",
      text: "Review what is working and refine tools and processes against business needs.",
    },
  ],
};

/* ── Section introductions ────────────────────────────────── */

export const selectedWork = {
  title: "Selected work",
  intro:
    "Three projects, each one starting from an operational problem rather than a piece of technology.",
};

export const experienceIntro = {
  title: "Experience",
  intro:
    "Four organizations, across full-time employment and independent consulting.",
};

export const expertiseIntro = {
  title: "Expertise",
  intro:
    "Four areas of practice, each grounded in work I have carried out and remained responsible for.",
};

/* ── Leadership ───────────────────────────────────────────── */

export const leadership = {
  lead: "At The Vaultz News I am responsible for the technology and for a team. Alongside managing the organization's platforms and systems, I directly supervise five employees in creative production and I am accountable for what they deliver.",
  reports: {
    count: "5",
    label: "direct reports",
    context: "A creative production team at The Vaultz News, managed alongside my technology responsibilities.",
  },
  team: [
    { count: "Two", role: "video editors" },
    { count: "Two", role: "graphic designers" },
    { count: "One", role: "social media manager" },
  ],
  practices: [
    "Weekly team performance reviews",
    "Production targets",
    "Daily deliverable monitoring",
    "Quality-control processes",
  ],
  recruitment: "I led the recruitment interviews for the initial design team.",
};

/* ── Contact ──────────────────────────────────────────────── */

export const closing = {
  headline: "Let's make technology work better.",
  lead: "I am open to professional opportunities in IT operations and IT management.",
  text: "That includes IT Manager, IT Officer and IT Operations roles, where I can take responsibility for an organization's systems and the people who depend on them. I also take on consulting engagements for businesses that need their technology assessed, implemented or brought under control.",
};
