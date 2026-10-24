import { NextResponse } from "next/server";
import { previewOutreachDrafts } from "@/lib/acquisition/outreach";

export const dynamic = "force-dynamic";

/**
 * Preview-only outreach preparation endpoint.
 *
 * Drafts are generated for human review. This endpoint cannot send email,
 * WhatsApp or LinkedIn messages and cannot mutate an external CRM.
 */
export async function GET() {
  return NextResponse.json({
    schema: "izakhono.acquisition.outreach/v1",
    mode: "preview",
    externalActionsEnabled: false,
    approvalRequired: true,
    count: previewOutreachDrafts.length,
    drafts: previewOutreachDrafts,
  });
}
