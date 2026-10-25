import { NextResponse } from "next/server";
import { previewCrmOpportunities } from "@/lib/acquisition/crm";

export const dynamic = "force-dynamic";

/**
 * Read-only CRM pipeline surface for the acquisition MVP.
 * Production persistence and external CRM writes require authorised connectors.
 */
export async function GET() {
  const stages = previewCrmOpportunities.reduce<Record<string, number>>((acc, opportunity) => {
    acc[opportunity.stage] = (acc[opportunity.stage] ?? 0) + 1;
    return acc;
  }, {});

  const pipelineValue = previewCrmOpportunities.reduce(
    (total, opportunity) => total + opportunity.estimatedValue,
    0,
  );

  return NextResponse.json({
    schema: "izakhono.acquisition.crm/v1",
    mode: "preview",
    externalWritesEnabled: false,
    count: previewCrmOpportunities.length,
    pipelineValue,
    stages,
    opportunities: previewCrmOpportunities,
  });
}
