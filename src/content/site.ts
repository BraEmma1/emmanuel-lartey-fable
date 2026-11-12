/**
 * Identity and contact details, shared by every page.
 * Anything set to `null` is a genuine asset or detail that has not been
 * supplied yet; the UI renders an honest placeholder until it is filled in.
 */

export const site = {
  name: "Emmanuel Lartey",
  firstName: "Emmanuel",
  lastName: "Lartey",
  title: "IT Manager",
  field: "Technology Operations & Digital Systems",
  role: "IT Manager | Technology Operations & Digital Systems",
  positioning:
    "Building, managing and improving the technology systems businesses rely on.",
  intro:
    "I am an IT Manager and technology operations professional with experience implementing business systems, managing digital infrastructure, coordinating technology initiatives and leading operational teams.",
  /** Path under /public (e.g. "/portrait.jpg") once a real photograph exists. */
  portrait: "/images/emmanuel-lartey-portrait.jpg" as string | null,
  contact: {
    email: null as string | null,
    linkedin: null as string | null,
    /** Path under /public (e.g. "/emmanuel-lartey-cv.pdf") once the CV exists. */
    cv: null as string | null,
  },
  copyrightYear: 2026,
};
