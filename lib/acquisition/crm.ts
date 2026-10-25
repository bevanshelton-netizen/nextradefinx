export type OpportunityStage =
  | "qualified"
  | "outreach_ready"
  | "contacted"
  | "meeting"
  | "proposal"
  | "won"
  | "lost";

export type CrmOpportunity = {
  id: string;
  company: string;
  segment: string;
  need: string;
  score: number;
  estimatedValue: number;
  stage: OpportunityStage;
  owner: string;
  nextAction: string;
  lastActivity: string;
};

export const previewCrmOpportunities: CrmOpportunity[] = [
  {
    id: "opp-001",
    company: "Gauteng Schools Group",
    segment: "School Uniforms",
    need: "2027 uniform procurement",
    score: 94,
    estimatedValue: 480000,
    stage: "outreach_ready",
    owner: "IZAKHONO ONE",
    nextAction: "Review procurement introduction",
    lastActivity: "AI research completed",
  },
  {
    id: "opp-002",
    company: "SecurePro Services",
    segment: "PPE & Workwear",
    need: "Multi-site PPE refresh",
    score: 91,
    estimatedValue: 310000,
    stage: "qualified",
    owner: "IZAKHONO ONE",
    nextAction: "Prepare capability profile",
    lastActivity: "Need signal identified",
  },
  {
    id: "opp-003",
    company: "Ubuntu Sports Academy",
    segment: "Sportswear",
    need: "2027 team kits",
    score: 87,
    estimatedValue: 185000,
    stage: "meeting",
    owner: "IZAKHONO ONE",
    nextAction: "Prepare meeting brief",
    lastActivity: "Meeting opportunity created",
  },
  {
    id: "opp-004",
    company: "BuildSouth Contractors",
    segment: "Corporate Apparel",
    need: "Branded site clothing",
    score: 82,
    estimatedValue: 140000,
    stage: "proposal",
    owner: "IZAKHONO ONE",
    nextAction: "Prepare proposal follow-up",
    lastActivity: "Proposal stage reached",
  },
];
