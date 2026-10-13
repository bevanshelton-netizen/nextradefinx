"use client";

import { useMemo, useState } from "react";

const lessons = [
  ["01", "Market Foundations", "Understand instruments, exchanges and orders", "COMPLETE"],
  ["02", "Reading the Market", "Trend, structure, support and resistance", "IN PROGRESS"],
  ["03", "Risk Management", "Position sizing, stops and drawdown", "LOCKED"],
  ["04", "Trading Psychology", "Discipline, patience and process", "LOCKED"],
];

export default function Dashboard() {
  const [tab, setTab] = useState("Overview");
  const [equity, setEquity] = useState(100000);
  const [trades, setTrades] = useState(12);
  const [coachOpen, setCoachOpen] = useState(false);

  const score = 78;
  const progress = 62;
  const drawdown = 2.4;
  const risk = 0.25;
  const nextGate = useMemo(() => score >= 85 && trades >= 50 && drawdown <= 10 ? "FUNDING REVIEW" : "BUILD MORE EVIDENCE", [score, trades, drawdown]);

  function paperTrade(direction: "BUY" | "SELL") {
    setTrades(v => v + 1);
    setEquity(v => Math.round(v + (direction === "BUY" ? 185 : -95)));
  }

  return (
    <main className="traderDash">
      <header className="dashTop">
        <a href="/" className="dashBrand"><span>N</span><div><strong>NEXTRADE<span>FINX</span></strong><small>TRADER WORKSPACE</small></div></a>
        <nav>{["Overview", "Learn", "Simulate", "Coach", "Score"].map(item => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}</nav>
        <div className="status"><i/> SIMULATION ACTIVE</div>
      </header>

      <section className="dashHero">
        <div>
          <small>TRADER DEVELOPMENT · {tab.toUpperCase()}</small>
          <h1>Build skill.<br/><em>Prove discipline.</em></h1>
          <p>Your trading journey is measured by decisions, risk control and consistency — not one lucky trade.</p>
        </div>
        <div className="stageCard"><span>CURRENT STAGE</span><strong>PROVE</strong><b>{nextGate}</b><div className="stageLine"><i style={{width: `${progress}%`}}/></div><small>{progress}% journey progress</small></div>
      </section>

      <section className="dashStats">
        <article><span>VIRTUAL EQUITY</span><strong>R{equity.toLocaleString()}</strong><b>+R{(equity - 100000).toLocaleString()}</b></article>
        <article><span>NEXSCORE</span><strong>{score}<small>/100</small></strong><b>DEVELOPING →</b></article>
        <article><span>MAX DRAWDOWN</span><strong>{drawdown}%</strong><b>WITHIN LIMIT</b></article>
        <article><span>TRADES LOGGED</span><strong>{trades}</strong><b>38 TO FUNDING REVIEW</b></article>
      </section>

      <section className="dashGrid">
        <div className="dashPanel learningPanel">
          <div className="panelHead"><div><small>NEXLEARN</small><h2>Learning path</h2></div><span>{progress}% COMPLETE</span></div>
          <div className="lessonList">{lessons.map(([n,title,desc,state]) => <button key={n} className={state === "IN PROGRESS" ? "current" : ""} onClick={() => setTab("Learn")}><i>{n}</i><div><b>{title}</b><p>{desc}</p></div><em>{state}</em></button>)}</div>
        </div>

        <div className="dashPanel coachPanel">
          <div className="panelHead"><div><small>NEXAI COACH</small><h2>Decision quality</h2></div><span className="greenText">ONLINE</span></div>
          <div className="coachScore"><strong>82</strong><span>PROCESS SCORE</span><div><i style={{width:"82%"}}/></div></div>
          <ul><li><b>Risk discipline</b><span>Strong</span></li><li><b>Plan adherence</b><span>Good</span></li><li><b>Stop usage</b><span>Needs evidence</span></li><li><b>Overtrading</b><span>Controlled</span></li></ul>
          <button className="goldBtn" onClick={() => setCoachOpen(v => !v)}>{coachOpen ? "Hide coaching" : "Review my last decision"}</button>
          {coachOpen && <div className="coachNote">NexAI Coach recommends continuing simulation at the current risk level. Do not increase position size until you have a larger consistent sample.</div>}
        </div>
      </section>

      <section className="dashGrid lower">
        <div className="dashPanel simulatorPanel">
          <div className="panelHead"><div><small>NEXSIM · VIRTUAL CAPITAL</small><h2>Practice the market</h2></div><span>R100,000 START</span></div>
          <div className="miniChart"><svg viewBox="0 0 700 180" preserveAspectRatio="none"><path d="M0 142 C60 132 70 105 125 118 S195 88 250 102 S320 55 380 80 S440 68 500 78 S575 32 700 48" fill="none" stroke="currentColor" strokeWidth="4"/></svg><div><span>MARKET SIMULATION</span><b>+1.85%</b></div></div>
          <div className="tradeBar"><span>Risk per trade <b>{risk}%</b></span><button onClick={() => paperTrade("SELL")}>Paper Sell</button><button className="goldBtn" onClick={() => paperTrade("BUY")}>Paper Buy</button></div>
          <small className="simulationNote">Simulation only. No real-money order is transmitted.</small>
        </div>

        <div className="dashPanel scorePanel">
          <div className="panelHead"><div><small>NEXSCORE</small><h2>Competency</h2></div><span>FUNDING GATE</span></div>
          <div className="scoreRing"><strong>{score}</strong><span>DEVELOPING</span></div>
          <div className="scoreRows"><p><span>Knowledge</span><b>84%</b></p><p><span>Risk</span><b>88%</b></p><p><span>Consistency</span><b>72%</b></p><p><span>Process</span><b>81%</b></p></div>
          <div className="gateBox"><b>Funding readiness</b><span>Requires 85+ score, 50+ trades, 20+ profitable days and ≤10% drawdown.</span></div>
        </div>
      </section>

      <section className="gateTimeline"><div className="timelineHead"><div><small>READINESS ENGINE</small><h2>One controlled path to live access.</h2></div><p>Live execution remains locked until the trader demonstrates competence and all legitimate broker, jurisdiction, KYC/AML and market-access requirements are satisfied.</p></div><div className="steps">{[["01","LEARN","Knowledge"],["02","SIMULATE","Practice"],["03","PROVE","Evidence"],["04","FUNDING","Review"],["05","LIVE","Approved access"]].map(([n,t,d],i)=><div className={i < 3 ? "done" : ""} key={n}><span>{n}</span><b>{t}</b><small>{d}</small></div>)}</div></section>

      <footer className="dashFooter"><a href="/">← Back to NexTradeFinX</a><span>Educational & simulation environment · No profit guarantee · Live trading subject to applicable requirements.</span></footer>
    </main>
  );
}
