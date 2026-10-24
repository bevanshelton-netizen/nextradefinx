const prospects = [
  { company: "Gauteng Schools Group", segment: "School Uniforms", score: 94, need: "2027 uniform procurement", next: "Request procurement meeting" },
  { company: "SecurePro Services", segment: "PPE & Workwear", score: 91, need: "Multi-site PPE refresh", next: "Send capability profile" },
  { company: "Ubuntu Sports Academy", segment: "Sportswear", score: 87, need: "2027 team kits", next: "Send kit catalogue" },
  { company: "BuildSouth Contractors", segment: "Corporate Apparel", score: 82, need: "Branded site clothing", next: "Qualify decision maker" },
];

export default function AcquisitionPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#07090d", color: "#f5f7fa", padding: "40px 24px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#35e0b5", fontWeight: 700, letterSpacing: 2, fontSize: 13 }}>IZAKHONO ONE</div>
            <h1 style={{ fontSize: 42, margin: "10px 0 8px" }}>AI Client Acquisition Engine</h1>
            <p style={{ color: "#9da6b5", maxWidth: 720, lineHeight: 1.6, margin: 0 }}>
              Research markets, identify qualified prospects, prepare personalised outreach and move opportunities toward meetings and revenue — with a human approval gate before external outreach.
            </p>
          </div>
          <div style={{ border: "1px solid #26303d", borderRadius: 14, padding: "12px 16px", background: "#0d1118" }}>
            <div style={{ fontSize: 11, color: "#7f8998" }}>ENGINE STATUS</div>
            <strong style={{ color: "#35e0b5" }}>SIMULATION / PREVIEW</strong>
          </div>
        </div>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, margin: "34px 0" }}>
          {[
            ["148", "Companies researched"],
            ["42", "Qualified prospects"],
            ["18", "Decision makers found"],
            ["11", "Outreach drafts ready"],
            ["R2.4m", "Pipeline opportunity"],
          ].map(([value, label]) => (
            <div key={label} style={{ border: "1px solid #222a35", borderRadius: 14, padding: 18, background: "#0d1118" }}>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
              <div style={{ color: "#7f8998", fontSize: 13, marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18 }}>
          <div style={{ border: "1px solid #222a35", borderRadius: 16, overflow: "hidden", background: "#0d1118" }}>
            <div style={{ padding: 20, borderBottom: "1px solid #222a35" }}>
              <h2 style={{ margin: 0, fontSize: 20 }}>Qualified opportunity queue</h2>
              <p style={{ color: "#7f8998", fontSize: 13, marginBottom: 0 }}>Highest-fit prospects surfaced by the research layer.</p>
            </div>
            {prospects.map((p) => (
              <div key={p.company} style={{ padding: 18, borderBottom: "1px solid #1b222c", display: "grid", gridTemplateColumns: "1fr auto", gap: 16 }}>
                <div>
                  <strong>{p.company}</strong>
                  <div style={{ color: "#9da6b5", fontSize: 13, marginTop: 5 }}>{p.segment} · {p.need}</div>
                  <div style={{ color: "#cbd2dc", fontSize: 12, marginTop: 9 }}>Next: {p.next}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#35e0b5" }}>{p.score}</div>
                  <div style={{ color: "#7f8998", fontSize: 11 }}>FIT SCORE</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ border: "1px solid #222a35", borderRadius: 16, padding: 20, background: "#0d1118" }}>
            <h2 style={{ marginTop: 0, fontSize: 20 }}>Agent workflow</h2>
            {["Define ICP", "Research companies", "Find decision makers", "Verify contacts", "Generate outreach", "Human approval", "Book meeting", "Follow up", "Convert to CRM"].map((step, i) => (
              <div key={step} style={{ display: "flex", gap: 12, alignItems: "center", padding: "9px 0", borderBottom: i === 8 ? "none" : "1px solid #1b222c" }}>
                <span style={{ width: 24, height: 24, borderRadius: 999, background: i < 5 ? "#173a34" : "#1a2029", color: i < 5 ? "#35e0b5" : "#8d97a6", display: "grid", placeItems: "center", fontSize: 11 }}>{i + 1}</span>
                <span style={{ fontSize: 13 }}>{step}</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginTop: 24, padding: 16, borderRadius: 12, background: "#111720", color: "#9da6b5", fontSize: 12, lineHeight: 1.6 }}>
          Safety boundary: this surface is a product/agent prototype. It does not send unsolicited messages, purchase domains, access private contact data, or make commitments on behalf of a customer without the required permissions and human approval.
        </div>
      </div>
    </main>
  );
}
