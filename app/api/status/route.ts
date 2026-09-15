export async function GET() {
  return Response.json({
    product: "NexAI Global Markets",
    status: "launch-candidate",
    simulation: true,
    marketDisplay: "TradingView widget feed; real-time where available, delayed where exchange rules require",
    directLiveMarketData: false,
    liveExecution: false,
    executionGate: "broker + jurisdiction + KYC/AML + market-data approval required",
    version: "1.0.0"
  });
}
