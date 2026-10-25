"use client";

import { useEffect, useState } from "react";

type Opportunity = {
  id: string;
  company: string;
  segment: string;
  need: string;
  score: number;
  estimatedValue: number;
  stage: string;
  nextAction: string;
  lastActivity: string;
};

const stageOrder = ["qualified", "outreach_ready", "contacted", "meeting", "proposal", "won"];
const stageLabels: Record<string, string> = {
  qualified: "Qualified",
  outreach_ready: "Outreach Ready",
  contacted: "Contacted",
  meeting: "Meeting",
  proposal: "Proposal",
  won: "Won",
};

export default function AcquisitionCrmPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/acquisition/crm")
      .then((response) => response.json())
      .then((data) => setOpportunities(data.opportunities ?? []))
      .finally(() => setLoading(false));
  }, []);

  const total = opportunities.reduce((sum, item) => sum + item.estimatedValue, 0);

  return (
    <main style={{ minHeight: "100vh", background: "#041019", color: "#f7fbff", padding: "48px clamp(20px, 5vw, 80px)", fontFamily: "Inter,system-ui,sans-serif" }}>
      <div style={{ maxWidth: 1400, margin: "auto" }}>
        <p style={{ color: "#20d9ff", fontSize: 11, fontWeight: 900, letterSpacing: ".18em" }}>IZAKHONO ONE · COMMERCIAL CRM</p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 30, alignItems: "end", flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: "clamp(40px,6vw,72px)", lineHeight: .95, letterSpacing: "-.05em", margin: "8px 0 16px" }}>Opportunity <span style={{ color: "#ffc342" }}>Pipeline.</span></h1>
            <p style={{ color: "#9bb0bb", maxWidth: 700, lineHeight: 1.6 }}>Every qualified opportunity gets a lifecycle: from research and outreach preparation through meetings, proposals and revenue.</p>
          </div>
          <div style={{ border: "1px solid #173848", borderRadius: 16, padding: "18px 24px", background: "#081822" }}>
            <small style={{ color: "#78909b" }}>PREVIEW PIPELINE</small>
            <strong style={{ display: "block", fontSize: 28, marginTop: 5 }}>R{total.toLocaleString()}</strong>
          </div>
        </div>

        <div style={{ marginTop: 42, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12 }}>
          {stageOrder.map((stage) => {
            const items = opportunities.filter((item) => item.stage === stage);
            return <section key={stage} style={{ minHeight: 330, background: "#081822", border: "1px solid #173848", borderRadius: 16, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <b>{stageLabels[stage]}</b><span style={{ color: "#20d9ff", fontSize: 12 }}>{items.length}</span>
              </div>
              {items.map((item) => <article key={item.id} style={{ background: "#0c2230", border: "1px solid #1a4050", borderRadius: 12, padding: 15, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><b>{item.company}</b><span style={{ color: "#29e5aa", fontWeight: 900 }}>{item.score}</span></div>
                <small style={{ display: "block", color: "#8da6b1", marginTop: 7 }}>{item.segment}</small>
                <p style={{ fontSize: 12, color: "#c2d0d6", lineHeight: 1.45 }}>{item.need}</p>
                <strong style={{ fontSize: 14 }}>R{item.estimatedValue.toLocaleString()}</strong>
                <small style={{ display: "block", color: "#7e98a4", marginTop: 8 }}>Next: {item.nextAction}</small>
              </article>)}
              {!items.length && <div style={{ color: "#55717d", fontSize: 12, padding: "25px 5px" }}>No opportunities yet</div>}
            </section>;
          })}
        </div>

        <div style={{ marginTop: 25, padding: 16, borderRadius: 12, border: "1px solid #173848", background: "#06131b", color: "#8da6b1", fontSize: 12 }}>
          🛡️ <b style={{ color: "#fff" }}>Preview mode.</b> This workspace is read-only. External CRM writes, messaging and customer-data enrichment remain disabled until authorised connectors and production controls are configured.
        </div>
        {loading && <p style={{ color: "#20d9ff" }}>Loading pipeline…</p>}
      </div>
    </main>
  );
}
