import { NextResponse } from "next/server";
import { previewOpportunities } from "@/lib/acquisition/opportunities";

export const dynamic = "force-dynamic";

/**
 * Read-only acquisition API for the MVP.
 *
 * This endpoint intentionally serves preview data only. It does not discover
 * contacts, send outreach, buy domains, access private data, or perform CRM
 * mutations. Those capabilities require separately authorised connectors.
 */
export async function GET() {
  const pipelineValue = previewOpportunities.reduce(
    (total, opportunity) => total + opportunity.estimatedValue,
    0,
  );

  return NextResponse.json({
    schema: "izakhono.acquisition/v1",
    mode: "preview",
    externalActionsEnabled: false,
    count: previewOpportunities.length,
    pipelineValue,
    opportunities: previewOpportunities,
  });
}
