import type { ProjectRecord } from "./types";

/**
 * Technical projects, in display order. The key is the project's id and the
 * slug of its case study at /projects/[slug].
 *
 * Every project appears on the projects index. A project gets a case study
 * page, and links to it appear, as soon as its record has `sections`. The
 * homepage shows only the projects named in `featuredProjectIds` below.
 */
export const projects = {
  "business-systems-digitalization": {
    title: "Business Systems Digitalization",
    categoryId: "business-systems",
    organizationId: "fosuaa-herbal-center",
    summary:
      "Fosuaa Herbal Center kept its sales records by hand. I researched and evaluated the options, handled procurement and implemented an Odoo-based point-of-sale system, then administered its users as staff moved their daily sales onto it.",
    skillIds: [
      "technology-evaluation",
      "procurement",
      "implementation",
      "user-administration",
      "business-process-improvement",
    ],
    feature: {
      kind: "beforeAfter",
      before: "Sales records were maintained manually, in notebooks.",
      after:
        "Staff process sales through the POS, and management can access sales totals through the software backend.",
    },
    coverEvidenceId: "fosuaa-pos-in-use",
    name: "Odoo POS Implementation",
    headline: "From Paper Records to Digital Sales Operations.",
    intro:
      "I led the evaluation, procurement and deployment of an Odoo-based point-of-sale system that replaced handwritten sales recording at Fosuaa Herbal Center.",
    overview: [
      {
        name: "The problem",
        detail: "Sales and stock records were kept by hand, in notebooks.",
      },
      {
        name: "The work",
        detail:
          "Evaluation, procurement and deployment of an Odoo-based point of sale.",
      },
      {
        name: "The outcome",
        detail:
          "Daily sales are processed digitally, and management can see sales totals.",
      },
    ],
    contribution: "Led evaluation, procurement and deployment",
    technologies: ["Odoo point-of-sale software", "POS hardware"],
    competencies: [
      "technology-evaluation",
      { id: "procurement", label: "IT Procurement" },
      "business-systems-implementation",
      "software-configuration",
      { id: "user-administration", label: "User Account Administration" },
      "stakeholder-coordination",
      "business-process-digitalization",
      { id: "it-technical-support", label: "Technical Support" },
    ],
    sections: [
      {
        heading: "The business problem",
        blocks: [
          {
            kind: "list",
            items: [
              "Sales records were maintained in notebooks.",
              "Stock records were also maintained manually.",
              "The organization needed a more structured system for its sales operations.",
            ],
          },
        ],
      },
      {
        heading: "Evaluation and procurement",
        blocks: [
          {
            kind: "group",
            heading: "Technology evaluation",
            blocks: [
              {
                kind: "prose",
                paragraphs: [
                  "My part was to establish what was available to meet the need and what it would cost, and to recommend a solution.",
                ],
              },
              {
                kind: "list",
                numbered: true,
                items: [
                  "Researched suitable POS equipment",
                  "Evaluated Odoo software",
                  "Reviewed available solutions",
                  "Gathered pricing information",
                  "Prepared recommendations for management",
                ],
              },
            ],
          },
          {
            kind: "group",
            heading: "Approval and procurement",
            blocks: [
              {
                kind: "prose",
                paragraphs: [
                  "The decision to spend was management's. Once the expenditure was approved and the funding released, I carried out the procurement and setup.",
                ],
              },
            ],
          },
          {
            kind: "timeline",
            steps: [
              {
                label: "My responsibility",
                title: "Recommended solution presented to management",
              },
              {
                label: "Management decision",
                title: "Expenditure approved",
              },
              { label: "Management decision", title: "Funding released" },
              {
                label: "My responsibility",
                title: "Procurement and setup carried out",
              },
            ],
          },
        ],
      },
      {
        heading: "Technical implementation",
        blocks: [
          {
            kind: "timeline",
            steps: [
              {
                label: "Equipment",
                title: "POS hardware procured and set up",
              },
              {
                label: "Software",
                title: "Odoo installed and configured",
              },
              {
                label: "User accounts",
                title: "Salesperson user accounts created",
              },
              {
                label: "Readiness",
                title: "System prepared for business use",
              },
              { label: "Support", title: "Ongoing technical support" },
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
              "Employees adopted digital sales processing, and management gained access to sales totals.",
            ],
          },
          { kind: "feature" },
        ],
      },
    ],
  },
  "digital-infrastructure-improvement": {
    title: "Digital Infrastructure Improvement",
    categoryId: "digital-infrastructure",
    organizationId: "the-vaultz-news",
    summary:
      "At The Vaultz News I led technical website auditing and improvement initiatives, administered the publishing platforms the newsroom depends on, and implemented a self-managed email newsletter system.",
    skillIds: [
      "web-infrastructure-management",
      "systems-integration",
      "technical-troubleshooting",
      "technology-operations",
    ],
    feature: {
      kind: "stack",
      items: [
        {
          name: "Website audits",
          detail: "Led technical auditing and improvement initiatives.",
        },
        {
          name: "Publishing platforms",
          detail: "Ongoing administration of the platforms used to publish.",
        },
        {
          name: "Newsletter system",
          detail: "Implemented using Sendy with Amazon SES for delivery.",
        },
      ],
    },
    coverEvidenceId: "vaultz-publishing-infrastructure",
    name: "Digital Infrastructure & Platform Improvement",
    headline: "Auditing, Repairing and Extending a News Platform.",
    intro:
      "As IT Manager at The Vaultz News I assessed the website's technical condition, corrected the issues that were found, and led the implementation of a newsletter system that I continue to administer.",
    overview: [
      {
        name: "The challenge",
        detail: "A news website with technical issues and limited search visibility.",
      },
      {
        name: "The work",
        detail:
          "A technical audit and corrections, then a newsletter system on Sendy and Amazon SES.",
      },
      {
        name: "The outcome",
        detail:
          "Issues addressed, indexing improved and newsletter distribution introduced.",
      },
    ],
    contribution: "Led the technical audit, the corrections and the newsletter implementation",
    technologies: ["Sendy", "Amazon Simple Email Service (SES)"],
    competencies: [
      "it-operations-management",
      { id: "web-infrastructure-management", label: "Website Infrastructure" },
      "technical-troubleshooting",
      "systems-integration",
      "platform-administration",
      "technology-implementation",
    ],
    sections: [
      {
        heading: "The original challenge",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "When I became involved, the news website had technical issues and limited visibility in search.",
              "I began with a technical assessment, to identify the problems affecting the platform and how readily its content could be found.",
            ],
          },
        ],
      },
      {
        heading: "Website audit and technical improvements",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "The assessment led to a practical programme of corrections, which continues as maintenance.",
            ],
          },
          {
            kind: "timeline",
            steps: [
              { label: "Assessment", title: "Technical audit of the website" },
              {
                label: "Correction",
                title: "Website issues identified and corrected",
              },
              { label: "Correction", title: "Broken links remediated" },
              { label: "Correction", title: "Search indexing improved" },
              {
                label: "Operations",
                title: "Website configuration and maintenance",
              },
              {
                label: "Operations",
                title: "Ongoing technical troubleshooting",
              },
            ],
          },
        ],
      },
      {
        heading: "Newsletter infrastructure implementation",
        surface: "ink",
        blocks: [
          {
            kind: "group",
            heading: "The need",
            blocks: [
              {
                kind: "prose",
                paragraphs: [
                  "The organization needed a way to distribute email newsletters to its audience.",
                ],
              },
            ],
          },
          {
            kind: "group",
            heading: "The solution",
            blocks: [
              {
                kind: "stack",
                items: [
                  {
                    name: "Sendy",
                    detail:
                      "The newsletter application, used to manage mailing lists and send newsletters.",
                  },
                  {
                    name: "Amazon Simple Email Service (SES)",
                    detail: "The service the email is delivered through.",
                  },
                ],
              },
            ],
          },
          {
            kind: "group",
            heading: "Implementation and administration",
            blocks: [
              {
                kind: "prose",
                paragraphs: [
                  "I led the implementation of the system and I continue to administer it. The work covers the technology that holds the mailing lists and delivers the email; editorial content and audience growth are separate activities.",
                ],
              },
              {
                kind: "list",
                numbered: true,
                items: [
                  "Implementation of the newsletter system",
                  "Configuration of Sendy with Amazon SES for delivery",
                  "Ongoing administration of the platform",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Ongoing infrastructure management",
        blocks: [
          {
            kind: "list",
            items: [
              "Publishing platform administration",
              "Website maintenance",
              "Technical troubleshooting",
              "User access management",
              "Supporting platform availability",
              "Continued technology improvements",
            ],
          },
        ],
      },
      {
        heading: "Outcomes and operational contribution",
        blocks: [
          {
            kind: "list",
            items: [
              "Website technical issues were addressed.",
              "Indexing-related improvements were implemented.",
              "A newsletter distribution system was introduced.",
              "I continue to administer the platforms involved.",
            ],
          },
        ],
      },
    ],
  },
  "website-security-incident-response": {
    title: "Website Security Incident Response",
    categoryId: "security-response",
    organizationId: "pacific-solutions-ghana",
    summary:
      "When a Pacific Solutions Ghana website was compromised, I took responsibility for the response: containing the affected files, bringing the server environment up to date, checking the platforms connected to it and removing the malicious files that were identified.",
    skillIds: [
      "security-incident-response",
      "website-administration",
      "technical-investigation",
      "remediation",
    ],
    feature: {
      kind: "sequence",
      steps: [
        "Quarantined the affected files",
        "Updated the server environment",
        "Audited related platforms",
        "Removed identified malicious files",
      ],
    },
    coverEvidenceId: "pacific-incident-documentation",
    name: "Website Security Incident Response & Remediation",
    headline: "Responding to a Website Security Compromise.",
    intro:
      "A website associated with Pacific Solutions Ghana was compromised. I handled the response: containing the affected files, updating the server environment, investigating related platforms and removing the malicious files that were found.",
    overview: [
      {
        name: "The incident",
        detail:
          "A website associated with the organization experienced a security compromise.",
      },
      {
        name: "The response",
        detail:
          "Detection, containment, server maintenance, investigation and remediation.",
      },
      {
        name: "The outcome",
        detail:
          "Identified malicious files removed, and related websites inspected.",
      },
    ],
    contribution: "Carried out the incident response personally",
    competencies: [
      "security-incident-response",
      "website-administration",
      "technical-troubleshooting",
      "vulnerability-remediation",
      "server-maintenance",
      "operational-risk-awareness",
    ],
    sections: [
      {
        heading: "Incident overview",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "A website associated with Pacific Solutions Ghana experienced a security compromise. I personally carried out the response described here.",
            ],
          },
          {
            kind: "group",
            heading: "The technical challenge",
            blocks: [
              {
                kind: "prose",
                paragraphs: [
                  "The response had two parts: to investigate and deal with the affected files on the compromised website, and to check related platforms for signs of malicious code.",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Incident response process",
        surface: "ink",
        blocks: [
          {
            kind: "timeline",
            layout: "log",
            steps: [
              { label: "Detection", title: "Identified the affected website." },
              {
                label: "Containment",
                title: "Quarantined the affected website files.",
              },
              {
                label: "Server maintenance",
                title: "Performed updates to the server environment.",
              },
              {
                label: "Investigation",
                title:
                  "Audited website files and checked related platforms for potentially malicious code.",
              },
              {
                label: "Remediation",
                title:
                  "Removed the malicious files identified during the investigation.",
              },
            ],
          },
          {
            kind: "group",
            heading: "Remediation outcome",
            blocks: [
              {
                kind: "prose",
                paragraphs: [
                  "Malicious files identified during the investigation were removed, and related websites were inspected for signs of compromise.",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Broader technical responsibilities",
        blocks: [
          {
            kind: "prose",
            paragraphs: [
              "The incident sits within my continuing technical work for the organization.",
            ],
          },
          {
            kind: "list",
            items: [
              "Website administration",
              "Server-side troubleshooting",
              "Hosting maintenance",
              "Remediation of a reported PHP-related vulnerability, as a separate piece of work",
              "Technical support",
            ],
          },
        ],
      },
    ],
  },
} satisfies Record<string, ProjectRecord>;

export type ProjectId = keyof typeof projects;

/**
 * The projects shown under "Selected work" on the homepage, in order. This is
 * a deliberate selection: adding a project to the collection does not add it
 * here.
 */
export const featuredProjectIds: ProjectId[] = [
  "business-systems-digitalization",
  "digital-infrastructure-improvement",
  "website-security-incident-response",
];
