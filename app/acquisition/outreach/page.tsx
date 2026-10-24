"use client";

import { useEffect, useState } from "react";

type Draft = {
  id: string;
  opportunityId: string;
  channel: string;
  subject?: string;
  message: string;
  personalizationNotes: string[];
};

export default function OutreachReviewPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [selected, setSelected] = useState<Draft | null>(null);

  useEffect(() => {
    fetch("/api/acquisition/outreach-drafts")
      .then((response) => response.json())
      .then((data) => {
        setDrafts(data.drafts ?? []);
        setSelected(data.drafts?.[0] ?? null);
      })
      .catch(() => setDrafts([]));
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#041019", color: "#f7fbff", fontFamily: "Inter,system-ui,sans-serif", padding: "32px clamp(18px,5vw,70px)" }}>
      <header style={{ maxWidth: 1250, margin: "0 auto 34px", display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center" }}>
        <div>
          <div style={{ color: "#20d9ff", fontSize: 11, fontWeight: 900, letterSpacing: ".18em" }}>IZAKHONO ONE · COMMERCIAL ENGINE</div>
          <h1 style={{ fontSize: "clamp(34px,5vw,58px)", letterSpacing: "-.045em", margin: "8px 0" }}>Outreach Review</h1>
          <p style={{ color: "#9bb0bb", margin: 0 }}>AI-prepared messages. Human-approved actions.</p>
        </div>
        <a href="/acquisition" style={{ padding: "11px 15px", border: "1px solid #173848", borderRadius: 10, color: "#c5d3d9", textDecoration: "none" }}>← Acquisition Engine</a>
      </header>

      <section style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(260px,.72fr) minmax(0,1.28fr)", gap: 16 }}>
        <div style={{ background: "#081822", border: "1px solid #173848", borderRadius: 18, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}><b>Draft queue</b><span style={{ color: "#29e5aa", fontSize: 11 }}>{drafts.length} READY</span></div>
          {drafts.map((draft) => (
            <button key={draft.id} onClick={() => setSelected(draft)} style={{ width: "100%", textAlign: "left", background: selected?.id === draft.id ? "#0d2b38" : "#06131b", border: `1px solid ${selected?.id === draft.id ? "#20d9ff66" : "#173848"}`, borderRadius: 12, padding: 14, marginBottom: 9, color: "#fff", cursor: "pointer" }}>
              <div style={{ color: "#20d9ff", fontSize: 10, textTransform: "uppercase", fontWeight: 900 }}>{draft.channel}</div>
              <b style={{ display: "block", margin: "5px 0" }}>{draft.subject}</b>
              <small style={{ color: "#8fa7b1" }}>{draft.opportunityId}</small>
            </button>
          ))}
        </div>

        <div style={{ background: "#081822", border: "1px solid #173848", borderRadius: 18, padding: "clamp(20px,4vw,34px)" }}>
          {selected ? <>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
              <div><span style={{ color: "#20d9ff", fontSize: 10, fontWeight: 900, letterSpacing: ".14em" }}>MESSAGE PREVIEW</span><h2 style={{ margin: "8px 0", fontSize: 27 }}>{selected.subject}</h2></div>
              <span style={{ background: "#ffc34222", color: "#ffc342", border: "1px solid #ffc34255", padding: "7px 10px", borderRadius: 999, fontSize: 10, fontWeight: 900 }}>APPROVAL REQUIRED</span>
            </div>
            <div style={{ background: "#06131b", border: "1px solid #173848", borderRadius: 13, padding: 20, margin: "22px 0", color: "#c3d0d6", lineHeight: 1.7 }}>{selected.message}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>{selected.personalizationNotes.map((note) => <span key={note} style={{ border: "1px solid #173848", borderRadius: 999, padding: "7px 10px", color: "#8fa7b1", fontSize: 10 }}>{note}</span>)}</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button disabled style={{ padding: "13px 18px", border: 0, borderRadius: 10, background: "linear-gradient(100deg,#20d9ff,#29e5aa)", color: "#031015", fontWeight: 1000, opacity: .55 }}>Approve & Send — Disabled in Preview</button>
              <button onClick={() => setSelected(null)} style={{ padding: "13px 18px", border: "1px solid #284858", borderRadius: 10, background: "transparent", color: "#d7e2e6", fontWeight: 800 }}>Reject Draft</button>
            </div>
            <p style={{ color: "#718b96", fontSize: 11, lineHeight: 1.6, marginTop: 20 }}>Safety boundary: this prototype never sends email, WhatsApp or LinkedIn messages and does not mutate an external CRM.</p>
          </> : <p style={{ color: "#9bb0bb" }}>No drafts available.</p>}
        </div>
      </section>
    </main>
  );
}
