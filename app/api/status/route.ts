export async function GET() {
  return Response.json({
    product: "NexAI Global Markets",
    status: "launch-candidate",
    simulation: true,
    liveMarketData: false,
    liveExecution: false,
    executionGate: "broker + jurisdiction + KYC/AML + market-data approval required",
    version: "1.0.0"
  });
}
