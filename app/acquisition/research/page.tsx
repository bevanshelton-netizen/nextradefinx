"use client";

import { useEffect, useState } from "react";

type ResearchRecord = {
  id: string;
  company: string;
  industry: string;
  location: string;
  fitScore: number;
  signals: string[];
  opportunity: string;
  estimatedValue: number;
  evidence: string[];
  nextStep: string;
};

const signalLabels: Record<string, string> = {
  procurement: "Procurement",
  expansion: "Expansion",
  new_contract: "New Contract",
  hiring: "Hiring",
  brand_refresh: "Brand Refresh",
};

export default function CustomerResearchPage() {
  const [records, setRecords] = useState<ResearchRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/acquisition/research")
      .then((response) => response.json())
      .then((data) => setRecords(data.research ?? []))
      .finally(() => setLoading(false));
  }, []);

  const pipeline = records.reduce((sum, record) => sum + record.estimatedValue, 0);

  return (
    <main style={{ minHeight: "100vh", background: "radial-gradient(circle at 80% 0%, #103c45 0, #041019 42%)", color: "#f7fbff", padding: "48px clamp(20px, 5vw, 80px)", fontFamily: "Inter,system-ui,sans-serif" }}>
      <div style={{ maxWidth: 1400, margin: "auto" }}>
        <p style={{ color: "#20d9ff", fontSize: 11, fontWeight: 900, letterSpacing: ".18em" }}>IZAKHONO ONE · CUSTOMER INTELLIGENCE</p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 30, alignItems: "end", flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: "clamp(42px,6vw,76px)", lineHeight: .92, letterSpacing: "-.055em", margin: "8px 0 18px" }}>Know <span style={{ color: "#29e5aa" }}>who to sell to.</span></h1>
            <p style={{ color: "#9bb0bb", maxWidth: 760, lineHeight: 1.65 }}>Turn market signals into ranked customer opportunities. Research first, explain the evidence, then place every action behind a human approval gate.</p>
          </div>
          <div style={{ border: "1px solid #1c4b58", borderRadius: 18, padding: "18px 24px", background: "rgba(8,24,34,.86)" }}>
            <small style={{ color: "#78909b" }}>RESEARCH PIPELINE</small>
            <strong style={{ display: "block", fontSize: 28, marginTop: 5 }}>R{pipeline.toLocaleString()}</strong>
          </div>
        </div>

        <div style={{ marginTop: 42, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          {records.map((record) => (
            <article key={record.id} style={{ background: "linear-gradient(145deg,#0a202c,#07151e)", border: "1px solid #194352", borderRadius: 20, padding: 20, boxShadow: "0 18px 60px rgba(0,0,0,.22)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
                <div>
                  <b style={{ fontSize: 20 }}>{record.company}</b>
                  <small style={{ display: "block", color: "#829ba7", marginTop: 5 }}>{record.industry} · {record.location}</small>
                </div>
                <div style={{ minWidth: 52, textAlign: "center", borderRadius: 12, padding: "8px 5px", background: "#0b3033", color: "#29e5aa", fontWeight: 900 }}>{record.fitScore}</div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, margin: "16px 0" }}>
                {record.signals.map((signal) => <span key={signal} style={{ border: "1px solid #20515e", borderRadius: 999, padding: "5px 9px", fontSize: 10, color: "#9fefff" }}>{signalLabels[signal] ?? signal}</span>)}
              </div>

              <h2 style={{ fontSize: 17, lineHeight: 1.35, margin: "0 0 10px" }}>{record.opportunity}</h2>
              <strong style={{ color: "#ffc342", fontSize: 18 }}>R{record.estimatedValue.toLocaleString()}</strong>

              <div style={{ marginTop: 18 }}>
                <small style={{ color: "#78909b", letterSpacing: ".08em" }}>WHY IT QUALIFIES</small>
                {record.evidence.map((item) => <div key={item} style={{ marginTop: 7, color: "#c2d0d6", fontSize: 12 }}>✓ {item}</div>)}
              </div>

              <div style={{ marginTop: 18, padding: 12, borderRadius: 12, background: "#06131b", color: "#9bb0bb", fontSize: 12, lineHeight: 1.5 }}>Next: {record.nextStep}</div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 26, padding: 16, borderRadius: 14, border: "1px solid #173848", background: "rgba(6,19,27,.9)", color: "#8da6b1", fontSize: 12, lineHeight: 1.55 }}>
          🛡️ <b style={{ color: "#fff" }}>Research preview.</b> No private contact harvesting, unsolicited messaging, CRM mutation or external enrichment is enabled. Production research will require authorised data sources, consent/privacy controls and explicit connector permissions.
        </div>
        {loading && <p style={{ color: "#20d9ff" }}>Loading intelligence…</p>}
      </div>
    </main>
  );
}
