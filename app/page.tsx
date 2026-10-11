"use client";

import { FormEvent, useState } from "react";

const languages = [
  ["en","English"],["zh-CN","中文"],["hi","हिन्दी"],["es","Español"],["ar","العربية"],["fr","Français"],
  ["pt","Português"],["sw","Kiswahili"],["de","Deutsch"],["ja","日本語"],["ko","한국어"],["tr","Türkçe"],
  ["zu","isiZulu"],["xh","isiXhosa"],["af","Afrikaans"],["st","Sesotho"],["tn","Setswana"],["ss","siSwati"],
  ["ve","Tshivenda"],["ts","itsonga"],["nr","isiNdebele"]
];

const markets = [
  ["JSE","South Africa","01"],["NYSE","United States","02"],["NASDAQ","United States","03"],
  ["LSE","United Kingdom","04"],["EURONEXT","Europe","05"],["HKEX","Hong Kong","06"],
  ["NSE","India","07"],["JPX","Japan","08"]
];

function Icon({type}:{type:string}) {
  const common={width:28,height:28,viewBox:"0 0 28 28",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round" as const,strokeLinejoin:"round" as const};
  if(type==="ai") return <svg {...common}><circle cx="14" cy="14" r="9"/><path d="M9 14h10M14 9v10M6 6l2 2M22 6l-2 2M6 22l2-2M22 22l-2-2"/></svg>;
  if(type==="chart") return <svg {...common}><path d="M4 21V7M4 21h20"/><path d="m7 17 4-5 3 3 6-8"/><path d="M18 7h2v2"/></svg>;
  if(type==="shield") return <svg {...common}><path d="M14 3 23 7v6c0 6-4 10-9 12C9 23 5 19 5 13V7l9-4Z"/><path d="m9.5 14 3 3 6-7"/></svg>;
  if(type==="globe") return <svg {...common}><circle cx="14" cy="14" r="10"/><path d="M4 14h20M14 4c3 3 4 6 4 10s-1 7-4 10c-3-3-4-6-4-10s1-7 4-10Z"/></svg>;
  if(type==="book") return <svg {...common}><path d="M5 5h6c2 0 3 1 3 3v15c0-2-1-3-3-3H5V5ZM23 5h-6c-2 0-3 1-3 3v15c0-2 1-3 3-3h6V5Z"/></svg>;
  return <svg {...common}><circle cx="14" cy="14" r="10"/><path d="M14 8v6l4 2"/></svg>;
}

function MarketGraphic(){
  return <div className="marketGraphic" aria-label="Illustration of AI market intelligence dashboard">
    <div className="graphTop"><span>MARKET INTELLIGENCE</span><b>LIVE / SIMULATION</b></div>
    <div className="chartWrap">
      <div className="chartAxis"><span>1,950</span><span>1,900</span><span>1,850</span><span>1,800</span></div>
      <svg viewBox="0 0 600 260" preserveAspectRatio="none" className="chartSvg">
        <defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d6ad55" stopOpacity=".32"/><stop offset="1" stopColor="#d6ad55" stopOpacity="0"/></linearGradient></defs>
        <path d="M0 205 C55 198 62 178 105 188 S165 151 205 166 S255 115 302 132 S350 102 390 116 S440 76 480 93 S535 52 600 62 V260 H0Z" fill="url(#fill)"/>
        <path d="M0 205 C55 198 62 178 105 188 S165 151 205 166 S255 115 302 132 S350 102 390 116 S440 76 480 93 S535 52 600 62" fill="none" stroke="#d6ad55" strokeWidth="4"/>
      </svg>
    </div>
    <div className="metricRow"><div><small>AI SIGNAL</small><strong>STRUCTURED</strong></div><div><small>RISK STATE</small><strong className="green">CONTROLLED</strong></div><div><small>DECISION</small><strong>YOUR CALL</strong></div></div>
  </div>
}

export default function Home(){
  const [locale,setLocale]=useState("en");
  const [query,setQuery]=useState("");
  const [answer,setAnswer]=useState("Ask NexAI what is moving a market, how to read a chart, where risk sits, or how to structure a paper trade.");
  const [asking,setAsking]=useState(false);
  const [cash,setCash]=useState(100000);
  const [units,setUnits]=useState(0);

  async function ask(e:FormEvent){
    e.preventDefault(); const q=query.trim(); if(!q||asking)return;
    setAsking(true); setAnswer("NexAI is analysing the question…");
    try{const r=await fetch("/api/ai",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({question:q,locale})});const d=await r.json();if(!r.ok)throw new Error(d?.error||"NexAI unavailable");setAnswer(d.text);setQuery("");}
    catch(err){setAnswer(err instanceof Error?err.message:"NexAI is temporarily unavailable.");}
    finally{setAsking(false);}
  }
  const equity=cash+units*100;

  return <main>
    <header className="topbar">
      <a className="brand" href="#top"><span className="brandMark">N</span><span><strong>NEXTRADE<span>FINX</span></strong><small>AI TRADING INTELLIGENCE</small></span></a>
      <nav><a href="#platform">Platform</a><a href="#intelligence">AI Intelligence</a><a href="#academy">Academy</a><a href="#markets">Markets</a><a href="#security">Security</a></nav>
      <select value={locale} onChange={e=>setLocale(e.target.value)} aria-label="Language">{languages.map(([c,n])=><option key={c} value={c}>{n}</option>)}</select>
      <a className="topCta" href="#try">Try the platform</a>
    </header>

    <section id="top" className="heroNew">
      <div className="heroCopy">
        <div className="eyebrow"><i/> BUILT IN AFRICA · READY FOR THE WORLD</div>
        <h1>See the market.<br/><em>Understand the risk.</em><br/>Make better decisions.</h1>
        <p className="heroLead">NexTradeFinX brings AI market intelligence, financial education, paper trading and risk discipline into one beautifully simple workspace.</p>
        <div className="heroActions"><a className="primaryCta" href="#try">Enter NexTradeFinX →</a><a className="secondaryCta" href="#platform">Explore what we offer</a></div>
        <div className="trustStrip"><span>AI-powered intelligence</span><span>Paper trading</span><span>Multilingual</span><span>Risk-first</span></div>
      </div>
      <div className="heroVisual"><MarketGraphic/><div className="floatingCard aiFloat"><Icon type="ai"/><div><small>NEXAI</small><b>Ask the market</b><span>Explain · Compare · Simulate</span></div></div><div className="floatingCard riskFloat"><Icon type="shield"/><div><small>NEXRISK</small><b>Risk gate ON</b><span>Capital protected in simulation</span></div></div></div>
    </section>

    <section className="statement"><p>One platform. One decision workspace. <strong>From first lesson to professional market intelligence.</strong></p></section>

    <section id="platform" className="sectionBlock">
      <div className="sectionIntro"><div><small>THE PLATFORM</small><h2>Everything the client needs to understand the opportunity.</h2></div><p>We are not asking a client to stitch together five different apps. NexTradeFinX brings the learning, analysis, practice and risk workflow together.</p></div>
      <div className="featureGrid">
        {[["ai","NexAI Market Intelligence","Ask questions in plain language. Explore market drivers, companies, sectors, currencies and trading concepts."],["chart","Market Analytics","Charts, trends, support and resistance, technical context and structured market views."],["shield","NexRisk","Position sizing, concentration, drawdown awareness and a pre-trade risk gate for simulation."],["book","NexLearn Academy","Bite-sized lessons covering markets, technical analysis, fundamentals, psychology and safety."],["globe","Global Market Architecture","JSE first-class, with a roadmap across US, UK, European and Asian exchanges."],["clock","Paper Trading Lab","Practise decisions with virtual capital, track outcomes and build a repeatable process." ]].map(([icon,title,desc])=><article className="featureCard" key={title}><div className="featureIcon"><Icon type={icon}/></div><h3>{title}</h3><p>{desc}</p><span className="learnMore">Explore →</span></article>)}
      </div>
    </section>

    <section id="intelligence" className="darkShowcase">
      <div className="showcaseCopy"><small>NEXAI · YOUR MARKET COMPANION</small><h2>Ask questions the way you actually think.</h2><p>Instead of forcing the client to understand financial jargon first, NexAI lets them start with a question and work toward understanding.</p><div className="promptChips"><button onClick={()=>setQuery("Why is this market moving today?")}>Why is this market moving?</button><button onClick={()=>setQuery("Show me the risks before I paper trade")}>Show me the risks</button><button onClick={()=>setQuery("Explain support and resistance simply")}>Explain this simply</button></div></div>
      <div className="aiDesk"><div className="deskHeader"><span><i/> NEXAI ONLINE</span><b>EDUCATION + SIMULATION</b></div><div className="chatBubble">{answer}</div><form onSubmit={ask}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ask NexAI anything about the market…"/><button disabled={asking||!query.trim()}>{asking?"Thinking":"Ask AI"}</button></form><small className="disclaimer">AI output is educational and informational. No profit guarantee. No real-money execution is enabled by this interface.</small></div>
    </section>

    <section id="markets" className="sectionBlock marketsSection">
      <div className="sectionIntro"><div><small>GLOBAL MARKET MAP</small><h2>Start in Africa. Think globally.</h2></div><p>Designed to give clients a clear view of where market intelligence can take them, with transparent simulation status.</p></div>
      <div className="marketGrid">{markets.map(([name,region,n])=><article key={name}><span>0{n}</span><h3>{name}</h3><p>{region}</p><b>SIMULATION READY</b></article>)}</div>
    </section>

    <section id="academy" className="academyBanner"><div><small>NEXLEARN ACADEMY</small><h2>Build skill before you put capital at risk.</h2><p>From market basics to technical analysis, fundamentals, psychology and risk discipline.</p></div><a href="/academy/seasoned-campaigners">Explore the Academy →</a></section>

    <section id="try" className="practiceSection">
      <div className="sectionIntro"><div><small>TRY THE EXPERIENCE</small><h2>Practice a decision — not a deposit.</h2></div><p>Clients can experience the workflow before any regulated real-money execution is considered.</p></div>
      <div className="practiceGrid"><div className="portfolioCard"><small>PAPER PORTFOLIO</small><strong>R{equity.toLocaleString()}</strong><span>Virtual capital · no real order</span><div className="portfolioActions"><button onClick={()=>{if(cash>=1000){setCash(v=>v-1000);setUnits(v=>v+10)}}}>Paper Buy R1,000</button><button onClick={()=>{if(units>=10){setCash(v=>v+1000);setUnits(v=>v-10)}}}>Paper Sell R1,000</button></div><div className="paperNote">Simulation only. No order leaves NexTradeFinX.</div></div><div className="workflowCard"><div><span>01</span><b>Learn</b><p>Understand the instrument and the market.</p></div><div><span>02</span><b>Ask</b><p>Use NexAI to interrogate the decision.</p></div><div><span>03</span><b>Risk-check</b><p>Size the idea and define invalidation.</p></div><div><span>04</span><b>Practise</b><p>Record the outcome and improve the process.</p></div></div></div>
    </section>

    <section id="security" className="securitySection"><div className="securityIcon"><Icon type="shield"/></div><div><small>SECURITY · GOVERNANCE · TRANSPARENCY</small><h2>Trust is part of the product.</h2><p>Live execution remains gated behind jurisdiction, KYC/AML, licensed partner, market-data, risk and certification requirements. Simulation data is clearly labelled. Clients always know what is live, simulated or unavailable.</p></div><div className="securityPills"><span>Risk-first architecture</span><span>Transparent labelling</span><span>Broker-ready adapters</span><span>Audit-conscious design</span></div></section>

    <section className="finalCta"><div className="finalOrb"><Icon type="globe"/></div><small>THE NEXTRADEFINX PROMISE</small><h2>Make the market easier to understand.</h2><p>Learn. Ask. Analyse. Practise. Risk-check. Decide.</p><a className="primaryCta" href="#top">Enter NexTradeFinX →</a></section>

    <footer><div><strong>NEXTRADEFINX</strong><span>AI TRADING INTELLIGENCE</span></div><p>Built in Africa for the world.</p><div className="footerLinks"><a href="#platform">Platform</a><a href="#intelligence">NexAI</a><a href="#academy">Academy</a><a href="#security">Security</a></div><small>Educational and informational platform. Trading and investment involve risk. Real-money execution is subject to applicable law, licensing and approved partner controls.</small></footer>
  </main>
}
