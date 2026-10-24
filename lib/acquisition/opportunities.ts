export type AcquisitionOpportunity = {
  id: string;
  company: string;
  segment: string;
  score: number;
  need: string;
  next: string;
  stage: "qualified" | "contact_ready" | "outreach_ready";
  estimatedValue: number;
};

/**
 * Preview dataset only. Production connectors must be explicitly authorised
 * before importing live company/contact data.
 */
export const previewOpportunities: AcquisitionOpportunity[] = [
  {
    id: "opp-001",
    company: "Gauteng Schools Group",
    segment: "School Uniforms",
    score: 94,
    need: "2027 uniform procurement",
    next: "Request procurement meeting",
    stage: "qualified",
    estimatedValue: 600000,
  },
  {
    id: "opp-002",
    company: "SecurePro Services",
    segment: "PPE & Workwear",
    score: 91,
    need: "Multi-site PPE refresh",
    next: "Send capability profile",
    stage: "contact_ready",
    estimatedValue: 420000,
  },
  {
    id: "opp-003",
    company: "Ubuntu Sports Academy",
    segment: "Sportswear",
    score: 87,
    need: "2027 team kits",
    next: "Send kit catalogue",
    stage: "outreach_ready",
    estimatedValue: 180000,
  },
  {
    id: "opp-004",
    company: "BuildSouth Contractors",
    segment: "Corporate Apparel",
    score: 82,
    need: "Branded site clothing",
    next: "Qualify decision maker",
    stage: "qualified",
    estimatedValue: 260000,
  },
];
