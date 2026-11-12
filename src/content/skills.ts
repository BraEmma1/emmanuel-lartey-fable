import type { SkillAreaRecord, SkillRecord } from "./types";

/**
 * Every competency, named once. Projects and areas of practice reference
 * these by id, so a label is only ever written (and corrected) here.
 */
export const skills = {
  "technology-evaluation": { label: "Technology evaluation" },
  procurement: { label: "Procurement" },
  implementation: { label: "Implementation" },
  "user-administration": { label: "User administration" },
  "business-process-improvement": { label: "Business process improvement" },
  "web-infrastructure-management": { label: "Web infrastructure management" },
  "platform-administration": { label: "Platform administration" },
  "email-delivery": { label: "Email delivery with Sendy and Amazon SES" },
  "systems-integration": { label: "Systems integration" },
  "technology-operations": { label: "Technology operations" },
  "odoo-pos-implementation": { label: "Odoo point-of-sale implementation" },
  "security-incident-response": { label: "Security incident response" },
  "website-administration": { label: "Website administration" },
  "technical-investigation": { label: "Technical investigation" },
  remediation: { label: "Remediation" },
  troubleshooting: { label: "Troubleshooting" },
  "technical-troubleshooting": { label: "Technical troubleshooting" },
  "team-supervision": { label: "Team supervision" },
  "performance-reviews-and-targets": {
    label: "Performance reviews and targets",
  },
  "recruitment-interviewing": { label: "Recruitment interviewing" },
  "quality-control-processes": { label: "Quality-control processes" },
  "it-operations-management": { label: "IT Operations Management" },
  "digital-infrastructure": { label: "Digital Infrastructure" },
  "business-systems-administration": {
    label: "Business Systems Administration",
  },
  "technology-implementation": { label: "Technology Implementation" },
  "security-awareness": { label: "Security Awareness" },
  "team-leadership": { label: "Team Leadership" },
  "operational-planning": { label: "Operational Planning" },
  "staff-training": { label: "Staff Training" },
  "business-email-administration": { label: "Business Email Administration" },
  "it-coordination": { label: "IT Coordination" },
  "infrastructure-planning": { label: "Infrastructure Planning" },
  "it-governance-development": { label: "IT Governance Development" },
  "website-server-administration": {
    label: "Website & Server Administration",
  },
  "it-technical-support": { label: "IT Technical Support" },
  "network-connectivity-troubleshooting": {
    label: "Network Connectivity Troubleshooting",
  },
  "vulnerability-remediation": { label: "Vulnerability Remediation" },
  "business-systems-implementation": {
    label: "Business Systems Implementation",
  },
  "software-configuration": { label: "Software Configuration" },
  "business-process-digitalization": {
    label: "Business Process Digitalization",
  },
  "stakeholder-coordination": { label: "Stakeholder Coordination" },
  "server-maintenance": { label: "Server Maintenance" },
  "operational-risk-awareness": { label: "Operational Risk Awareness" },
} satisfies Record<string, SkillRecord>;

export type SkillId = keyof typeof skills;

/** The areas of practice, in display order. */
export const skillAreas = {
  "it-operations": {
    title: "IT Operations & Infrastructure",
    text: "Day-to-day management of the technology a business runs on: websites and publishing platforms, server environments, user accounts and the services that connect them.",
    skillIds: [
      "web-infrastructure-management",
      "platform-administration",
      "user-administration",
      "email-delivery",
    ],
  },
  "business-systems": {
    title: "Business Systems Implementation",
    text: "Taking a system from identified need to daily use: researching and evaluating options, procurement, deployment and staff adoption.",
    skillIds: [
      "technology-evaluation",
      "procurement",
      "odoo-pos-implementation",
      "business-process-improvement",
    ],
  },
  "security-support": {
    title: "Security & Technical Support",
    text: "Investigating and resolving technical problems, including incident response on a compromised website: containment, environment updates, platform audits and removal of identified malicious files.",
    skillIds: [
      "security-incident-response",
      "technical-investigation",
      "remediation",
      "troubleshooting",
    ],
  },
  "technology-leadership": {
    title: "Technology Leadership & Process Improvement",
    text: "Coordinating technology initiatives and leading a team with clear targets, regular reviews and quality control.",
    skillIds: [
      "team-supervision",
      "performance-reviews-and-targets",
      "recruitment-interviewing",
      "quality-control-processes",
    ],
  },
} satisfies Record<string, SkillAreaRecord>;

export type SkillAreaId = keyof typeof skillAreas;

/** A capability noted beneath the areas of practice rather than among them. */
export const additionalCapability = {
  title: "Web development",
  text: "An additional technical capability, used in support of the infrastructure and systems work above.",
};
