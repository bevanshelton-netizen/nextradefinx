export type ResearchSignal = "procurement" | "expansion" | "new_contract" | "hiring" | "brand_refresh";

export type CustomerResearchRecord = {
  id: string;
  company: string;
  industry: string;
  location: string;
  fitScore: number;
  signals: ResearchSignal[];
  opportunity: string;
  estimatedValue: number;
  evidence: string[];
  nextStep: string;
};

/**
 * Safe preview research dataset.
 * This intentionally contains synthetic/public-style examples only.
 * Production enrichment must use authorised data providers and explicit data-governance controls.
 */
export const previewCustomerResearch: CustomerResearchRecord[] = [
  {
    id: "research-001",
    company: "Gauteng Schools Group",
    industry: "Education",
    location: "Gauteng",
    fitScore: 96,
    signals: ["procurement", "brand_refresh"],
    opportunity: "2027 school uniforms, sportswear and staff apparel",
    estimatedValue: 480000,
    evidence: ["Annual procurement cycle", "Multi-school apparel requirement", "Strong fit with local manufacturing"],
    nextStep: "Review procurement introduction before human-approved outreach",
  },
  {
    id: "research-002",
    company: "SecurePro Services",
    industry: "Security & Facilities",
    location: "South Africa",
    fitScore: 93,
    signals: ["procurement", "expansion", "brand_refresh"],
    opportunity: "Multi-site PPE, workwear and branded staff clothing",
    estimatedValue: 310000,
    evidence: ["Distributed workforce", "Recurring PPE requirement", "Potential multi-site supply"],
    nextStep: "Prepare capability profile and qualify procurement route",
  },
  {
    id: "research-003",
    company: "Ubuntu Sports Academy",
    industry: "Sport & Recreation",
    location: "Gauteng",
    fitScore: 89,
    signals: ["brand_refresh", "new_contract"],
    opportunity: "2027 team kits, tracksuits and supporter apparel",
    estimatedValue: 185000,
    evidence: ["Teamwear requirement", "Repeat-season potential", "Strong sportswear fit"],
    nextStep: "Prepare visual kit concept for human review",
  },
  {
    id: "research-004",
    company: "BuildSouth Contractors",
    industry: "Construction",
    location: "South Africa",
    fitScore: 85,
    signals: ["expansion", "procurement", "hiring"],
    opportunity: "Branded site clothing, PPE and workforce apparel",
    estimatedValue: 140000,
    evidence: ["Site workforce requirement", "Safety apparel fit", "Potential repeat orders"],
    nextStep: "Qualify buyer and procurement requirements",
  },
];
