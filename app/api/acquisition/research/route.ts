import { NextResponse } from "next/server";
import { previewCustomerResearch } from "@/lib/acquisition/research";

export const dynamic = "force-dynamic";

export async function GET() {
  const estimatedPipeline = previewCustomerResearch.reduce(
    (total, record) => total + record.estimatedValue,
    0,
  );

  return NextResponse.json({
    schema: "izakhono.acquisition.research/v1",
    mode: "preview",
    externalEnrichmentEnabled: false,
    externalActionsEnabled: false,
    count: previewCustomerResearch.length,
    estimatedPipeline,
    research: previewCustomerResearch,
  });
}
