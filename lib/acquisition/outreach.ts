export type OutreachChannel = "email" | "whatsapp" | "linkedin";

export type OutreachDraft = {
  id: string;
  opportunityId: string;
  channel: OutreachChannel;
  subject?: string;
  message: string;
  personalizationNotes: string[];
  requiresApproval: true;
  externalActionEnabled: false;
};

export const previewOutreachDrafts: OutreachDraft[] = [
  {
    id: "draft_001",
    opportunityId: "opp_001",
    channel: "email",
    subject: "Uniform supply planning for your school network",
    message:
      "Hello, we noticed your education network may be approaching a uniform planning cycle. Izakhono Africa manufactures school uniforms and branded apparel locally. We would welcome a short conversation to understand your requirements and see whether we can support your next procurement cycle.",
    personalizationNotes: [
      "Education-sector opportunity",
      "Potential procurement cycle",
      "Local manufacturing capability",
    ],
    requiresApproval: true,
    externalActionEnabled: false,
  },
  {
    id: "draft_002",
    opportunityId: "opp_002",
    channel: "email",
    subject: "PPE and workwear supply capability",
    message:
      "Hello, we are reaching out because your operating environment may require ongoing PPE and branded workwear. Izakhono Africa provides locally manufactured apparel, uniforms and PPE. Could we arrange a brief introduction to understand your current requirements and supplier process?",
    personalizationNotes: [
      "Industrial opportunity",
      "PPE/workwear need",
      "Supplier introduction requested",
    ],
    requiresApproval: true,
    externalActionEnabled: false,
  },
];
