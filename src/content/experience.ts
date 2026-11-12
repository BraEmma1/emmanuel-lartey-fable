import type { ExperienceRecord } from "./types";

/**
 * Professional experience, in display order. The key is the engagement's id
 * and the slug of its detail page at /experience/[slug].
 *
 * An engagement gets a detail page, and links to it appear, as soon as its
 * record has `sections`. Nothing else needs to change. Each record chooses
 * its own sections and blocks; the template only decides how they look.
 */
export const experience = {
  "the-vaultz-news": {
    organizationId: "the-vaultz-news",
    roles: ["IT Manager", "Online Manager"],
    position: { kind: "title", text: "IT Manager & Online Manager" },
    engagement: "Full-time employment",
    engagementType: "Full-time",
    description:
      "A dual role: responsibility for the organization's technology operations, publishing platforms and newsletter infrastructure, combined with direct supervision of a five-person creative production team.",
    intro:
      "One position, two responsibilities: the technology The Vaultz News publishes on, and the team and workflows that produce its digital output.",
    overview: [
      {
        name: "IT Manager",
        detail:
          "Technology operations, digital infrastructure, systems administration and technical implementation.",
      },
      {
        name: "Online Manager",
        detail:
          "Supervising digital production staff, managing publishing workflows and coordinating online platform operations.",
      },
    ],
    skillIds: [
      "it-operations-management",
      "digital-infrastructure",
      "team-leadership",
      "technology-implementation",
      "business-systems-administration",
      "technical-troubleshooting",
      "security-awareness",
      "operational-planning",
      "staff-training",
    ],
    sections: [
      {
        heading: "IT operations and infrastructure",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "As IT Manager I am responsible for the technology the organization runs on: its website and publishing platforms, the hosting behind them, the newsletter system, and the accounts and support its staff depend on.",
            ],
          },
          {
            kind: "group",
            heading: "Daily operations",
            blocks: [
              {
                kind: "list",
                items: [
                  "Website and publishing infrastructure administration",
                  "Hosting and platform maintenance",
                  "Technical troubleshooting",
                  "Staff technical support",
                  "Technology assessment and recommendations",
                  "Procurement coordination",
                  "Systems implementation",
                  "Technology improvement initiatives",
                ],
              },
            ],
          },
          {
            kind: "group",
            heading: "Website improvements",
            blocks: [
              {
                kind: "prose",
                paragraphs: [
                  "I led technical auditing of the website and the work that followed from it. A news site is only useful if its pages load, its links lead somewhere and search engines can find what has been published.",
                ],
              },
              {
                kind: "list",
                items: [
                  "Website technical audits",
                  "Correction of identified issues",
                  "Broken-link remediation",
                  "Search indexing improvements",
                  "Ongoing performance and maintenance",
                ],
              },
            ],
          },
          {
            kind: "group",
            heading: "Newsletter infrastructure",
            blocks: [
              {
                kind: "prose",
                paragraphs: [
                  "I helped lead the setup of the organization's email newsletter infrastructure and I continue to administer it. It runs on Sendy, with Amazon Simple Email Service (SES) handling delivery.",
                  "My part is the technology that holds the mailing lists and delivers the email. Editorial content and audience growth are separate, wider activities.",
                ],
              },
            ],
          },
          {
            kind: "group",
            heading: "Security and account administration",
            blocks: [
              {
                kind: "prose",
                paragraphs: [
                  "I introduced improved procedures for managing passwords and securing accounts, and I administer who has access to the organization's accounts and platforms.",
                ],
              },
              {
                kind: "list",
                items: [
                  "Password-management procedures",
                  "Account security practices",
                  "User account and access management",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Team leadership and digital operations",
        surface: "ink",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "As Online Manager I directly supervise five digital production staff and coordinate how the organization's digital output is produced and published. This is cross-functional operations leadership of a video, design and social media team, separate from my IT responsibilities.",
            ],
          },
          {
            kind: "team",
            count: "05",
            label: "direct reports",
            members: [
              { count: "Two", role: "video editors" },
              { count: "Two", role: "graphic designers" },
              { count: "One", role: "social media manager" },
            ],
            practicesHeading: "Structured management processes I introduced",
            practices: [
              "Weekly performance review meetings",
              "Weekly production target setting",
              "Daily deliverable monitoring",
              "Output quality reviews",
              "Feedback and corrective processes",
            ],
            note: {
              heading: "Recruitment",
              text: "I conducted the recruitment interviews for the initial design team.",
            },
          },
          {
            kind: "group",
            heading: "Digital platform operations",
            blocks: [
              {
                kind: "list",
                items: [
                  "Coordination of digital publishing workflows",
                  "Oversight of creative and video production deliverables",
                  "Social media operations",
                  "Meta advertising management",
                  "Platform verification and advertising authorization processes",
                  "Staff training in digital publishing and related workflows",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Key initiatives and achievements",
        blocks: [
          {
            kind: "initiatives",
            items: [
              {
                title: "Website technical improvement",
                need: "A news website depends on pages that load, links that lead somewhere and content that search engines can find.",
                contribution:
                  "I led the technical auditing of the website and the improvement work that followed from it.",
                solution:
                  "Technical audits, correction of the issues they identified, broken-link remediation and search indexing improvements.",
                outcome:
                  "Identified issues corrected and broken links repaired, with performance and maintenance continuing as a standing responsibility.",
              },
              {
                title: "Newsletter infrastructure implementation",
                need: "The organization needed infrastructure for sending email newsletters to its audience.",
                contribution:
                  "I helped lead the setup and I administer the system.",
                solution:
                  "Email newsletter infrastructure built on Sendy, with Amazon Simple Email Service (SES) for delivery.",
                outcome:
                  "Newsletters are sent through infrastructure the organization manages itself.",
              },
              {
                title: "Digital team establishment and performance processes",
                need: "Digital production needed staff, and a consistent way to plan, monitor and review their output.",
                contribution:
                  "I conducted the recruitment interviews for the initial design team and introduced the processes the team is managed by.",
                solution:
                  "Weekly performance review meetings, weekly production targets, daily deliverable monitoring, and quality reviews with feedback.",
                outcome:
                  "A five-person production team working to weekly targets, with its output monitored daily and reviewed for quality.",
              },
              {
                title: "Security and access management improvements",
                need: "Organizational accounts and platforms depend on sound password handling and clear control over who has access.",
                contribution:
                  "I introduced the improved procedures and I administer user access.",
                solution:
                  "Improved password-management procedures, account security practices and user access administration.",
                outcome:
                  "Password and account security procedures in place, with user access administered on a continuing basis.",
              },
            ],
          },
        ],
      },
    ],
  },
  "cyndex-limited": {
    organizationId: "cyndex-limited",
    roles: ["IT & Digital Systems Consulting"],
    position: { kind: "working", text: "IT & Digital Systems Consultant" },
    engagement: "Independent consulting engagement",
    engagementType: "Consulting",
    description:
      "Implemented corporate email on Hostinger and provided broader IT coordination for the business.",
    intro:
      "My work with Cyndex Limited began with managing its corporate website. It grew into coordinating the organization's IT: I implemented corporate email and am now coordinating further technology improvements.",
    overview: [
      {
        name: "Website management",
        detail: "Where the engagement began: maintaining the corporate website.",
      },
      {
        name: "IT coordination",
        detail:
          "A primary contact for technology matters, including meetings with external technical personnel.",
      },
      {
        name: "Implementation and planning",
        detail:
          "Corporate email implemented. Further technology improvements being coordinated.",
      },
    ],
    skillIds: [
      "technology-operations",
      "business-email-administration",
      "it-coordination",
      "technology-implementation",
      "website-administration",
      "infrastructure-planning",
      "it-governance-development",
    ],
    sections: [
      {
        heading: "Role and responsibility",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "I work with Cyndex Limited as an independent consultant. The engagement began with one responsibility: managing and maintaining the company's corporate website.",
              "Over time the company came to rely on me for wider IT requirements and technical coordination. I became a primary contact for technology matters and have represented the organization in meetings with external technical personnel.",
            ],
          },
        ],
      },
      {
        heading: "Website management and IT operations",
        blocks: [
          {
            kind: "list",
            items: [
              "Corporate website administration and maintenance",
              "Technical support for business technology requirements",
              "Coordination with external technical personnel",
              "Assessment of organizational IT needs",
              "Support for technology-related discussions and decisions",
            ],
          },
        ],
      },
      {
        heading: "Corporate email implementation",
        surface: "ink",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "The most significant completed work in this engagement: moving the company's official communication onto company-branded email.",
            ],
          },
          {
            kind: "group",
            heading: "The problem",
            blocks: [
              {
                kind: "list",
                items: [
                  "Employees relied on personal email addresses for company communication.",
                  "Company documents were stored separately by individual employees.",
                  "There was no standardized, company-managed email environment.",
                ],
              },
            ],
          },
          {
            kind: "group",
            heading: "My contribution",
            blocks: [
              {
                kind: "list",
                numbered: true,
                items: [
                  "Identified the need for company-branded email",
                  "Recommended adopting corporate email services",
                  "Coordinated the purchase of the solution",
                  "Set up corporate email using Hostinger Webmail",
                  "Supported the adoption of company email for official communication",
                ],
              },
            ],
          },
          {
            kind: "beforeAfter",
            before:
              "Company communication ran through employees' personal email addresses.",
            after:
              "Company-branded email addresses are used for business correspondence, with less reliance on personal accounts.",
          },
        ],
      },
      {
        heading: "IT modernization and current initiatives",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "The current stage of the engagement is assessment, planning and coordination. The work below is under way or being planned; none of it is a completed implementation.",
            ],
          },
          {
            kind: "group",
            heading: "In progress",
            blocks: [
              {
                kind: "list",
                items: [
                  "Assessing existing technology practices",
                  "Coordinating IT improvement planning",
                  "Evaluating technology options and pricing",
                  "Coordinating network improvement initiatives",
                  "Drafting IT policies and procedures",
                ],
              },
            ],
          },
          {
            kind: "group",
            heading: "In planning",
            blocks: [
              {
                kind: "list",
                items: [
                  "Microsoft 365 adoption",
                  "Centralized document management",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  "pacific-solutions-ghana": {
    organizationId: "pacific-solutions-ghana",
    roles: ["Website & IT Support Consulting"],
    position: { kind: "working", text: "Website & IT Support Consultant" },
    engagement: "Independent consulting engagement",
    engagementType: "Consulting / Hybrid",
    description:
      "Website administration and technical support, including the response to a website security incident.",
    intro:
      "My work with Pacific Solutions Ghana began with its website and extended into technical support and website infrastructure, including the response to a website security compromise.",
    overview: [
      {
        name: "Website management",
        detail: "Managing and maintaining the corporate website and its hosting.",
      },
      {
        name: "Technical support",
        detail:
          "A primary technical contact for staff, office systems and connectivity.",
      },
      {
        name: "Security response",
        detail:
          "Responded to a website compromise and remediated a reported vulnerability.",
      },
    ],
    skillIds: [
      "website-server-administration",
      "security-incident-response",
      "it-technical-support",
      "vulnerability-remediation",
      "network-connectivity-troubleshooting",
      "business-email-administration",
      "technical-troubleshooting",
    ],
    sections: [
      {
        heading: "Role and technical responsibilities",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "My involvement with Pacific Solutions Ghana began with managing its website. It extended into broader technical support and the administration of the website's infrastructure, and I serve as a primary technical contact for the organization.",
            ],
          },
          {
            kind: "list",
            items: [
              "Corporate website management",
              "Hosting and server-related troubleshooting",
              "Business email configuration",
              "Technical support for staff and office systems",
              "Wi-Fi and network connectivity troubleshooting",
              "Responding to reported IT problems",
            ],
          },
        ],
      },
      {
        heading: "Website and infrastructure operations",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "I am responsible for keeping the website maintained, and for investigating and resolving disruptions to it when they occur.",
            ],
          },
          {
            kind: "list",
            items: [
              "Website availability troubleshooting",
              "Server-side problem resolution",
              "Hosting administration",
              "Maintenance and technical support",
              "Email service configuration",
            ],
          },
        ],
      },
      {
        heading: "Website security incident response",
        surface: "ink",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "A website within the organization's environment experienced a security compromise. I carried out the response, in the order below.",
            ],
          },
          {
            kind: "sequence",
            steps: [
              "Identified the affected website",
              "Quarantined the affected website files",
              "Updated the server environment",
              "Audited related platforms for malicious code",
              "Removed the identified malicious files",
            ],
          },
          {
            kind: "group",
            heading: "Result",
            blocks: [
              {
                kind: "prose",
                paragraphs: [
                  "The identified malicious files were removed, and related platforms were inspected for signs of compromise.",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Vulnerability remediation and technical support",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "Separately from the incident, I remediated a reported PHP-related vulnerability, and I continue to maintain the organization's systems and support its staff.",
            ],
          },
          {
            kind: "list",
            items: [
              "Remediation of a reported PHP-related vulnerability",
              "Technical maintenance",
              "Office connectivity troubleshooting",
              "User and workstation support",
              "Ongoing incident response responsibilities",
            ],
          },
        ],
      },
    ],
  },
  "fosuaa-herbal-center": {
    organizationId: "fosuaa-herbal-center",
    roles: ["IT & Operations Management"],
    position: { kind: "area", text: "IT & Operations Management" },
    engagement: null,
    engagementType: null,
    description:
      "Evaluated, procured and implemented an Odoo-based point-of-sale system that replaced handwritten sales records.",
    intro:
      "At Fosuaa Herbal Center I took sales from handwritten notebooks to an Odoo point-of-sale system: evaluating the options, leading procurement, implementing the system and supporting the staff who use it.",
    overview: [
      {
        name: "Evaluation and procurement",
        detail:
          "Researched equipment and software, gathered pricing and prepared recommendations for management.",
      },
      {
        name: "Implementation",
        detail:
          "Set up the POS hardware and configured Odoo for daily operations.",
      },
      {
        name: "Adoption",
        detail:
          "Sales staff process daily sales on the system, and management sees sales totals in the backend.",
      },
    ],
    skillIds: [
      "business-systems-implementation",
      "technology-evaluation",
      { id: "procurement", label: "IT Procurement" },
      "business-process-digitalization",
      "software-configuration",
      { id: "user-administration", label: "User Account Administration" },
      { id: "it-technical-support", label: "Technical Support" },
      "stakeholder-coordination",
    ],
    sections: [
      {
        heading: "Professional responsibility",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "I support Fosuaa Herbal Center's business technology needs. The work runs from deciding what the business should use, through buying and setting it up, to supporting it once it is in daily operation.",
            ],
          },
          {
            kind: "list",
            items: [
              "Technology evaluation",
              "IT procurement",
              "Business system deployment",
              "Software configuration",
              "Operational support",
            ],
          },
        ],
      },
      {
        heading: "The business challenge",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "Before the point-of-sale system, the business ran its sales records on paper.",
            ],
          },
          {
            kind: "list",
            items: [
              "Sales transactions were recorded manually in notebooks.",
              "Stock records were also maintained manually.",
              "The business wanted a more structured system for its sales operations.",
            ],
          },
        ],
      },
      {
        heading: "Technology evaluation and procurement",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "I led the evaluation and procurement process. Final approval of the expenditure rested with management.",
            ],
          },
          {
            kind: "sequence",
            steps: [
              "Researched available POS equipment",
              "Evaluated Odoo-based POS software",
              "Gathered equipment and software pricing",
              "Prepared recommendations for management",
              "Received management approval and funding",
              "Coordinated purchase and implementation",
            ],
          },
        ],
      },
      {
        heading: "Odoo POS implementation",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "With approval in place, I set the system up and prepared it for the sales staff.",
            ],
          },
          {
            kind: "list",
            items: [
              "POS hardware procurement and setup",
              "Odoo software installation and configuration",
              "Creation of salesperson user accounts",
              "Preparation of the system for daily operations",
              "Ongoing technical support",
            ],
          },
        ],
      },
      {
        heading: "Adoption and business outcome",
        surface: "ink",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "The system went into daily use. Sales staff began processing sales through the POS, and the organization moved from notebook-based sales recording to electronic transactions.",
            ],
          },
          {
            kind: "beforeAfter",
            before: "Sales transactions were recorded by hand, in notebooks.",
            after:
              "Sales staff process daily sales through the POS, and management has access to sales totals through the system backend.",
          },
        ],
      },
    ],
    unresolved: [
      "Engagement details to be verified (employment or consulting, and its terms).",
    ],
  },
} satisfies Record<string, ExperienceRecord>;

export type ExperienceId = keyof typeof experience;
