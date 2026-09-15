"use client";

import { FormEvent, useMemo, useState } from "react";

const languages = [
  ["en","English"],["zh-CN","中文"],["hi","हिन्दी"],["es","Español"],["ar","العربية"],["fr","Français"],
  ["bn","বাংলা"],["pt","Português"],["ru","Русский"],["ur","اردو"],["id","Bahasa Indonesia"],["de","Deutsch"],
  ["ja","日本語"],["ko","한국어"],["tr","Türkçe"],["sw","Kiswahili"],["ha","Hausa"],["pcm","Nigerian Pidgin"],
  ["am","አማርኛ"],["yo","Yorùbá"],["ig","Igbo"],["zu","isiZulu"],["xh","isiXhosa"],["af","Afrikaans"],
  ["nso","Sepedi"],["st","Sesotho"],["tn","Setswana"],["ss","siSwati"],["ve","Tshivenda"],["ts","Xitsonga"],["nr","isiNdebele"]
];

const hero: Record<string,string> = {
  en:"Intelligence for every market, in your language.",
  "zh-CN":"用你的语言，洞察全球市场。",
  hi:"हर बाज़ार की समझ, आपकी भाषा में।",
  es:"Inteligencia para cada mercado, en tu idioma.",
  ar:"ذكاء لكل سوق، بلغتك.",
  fr:"L’intelligence de chaque marché, dans votre langue.",
  pt:"Inteligência para todos os mercados, no seu idioma.",
  sw:"Akili ya kila soko, kwa lugha yako.",
  zu:"Ubuhlakani bemakethe yonke, ngolimi lwakho.",
  xh:"Ubukrelekrele beemarike, ngolwimi lwakho.",
  af:"Markintelligensie in jou taal."
};

const markets = [
  ["JSE","South Africa","SIM"],["NYSE","United States","SIM"],["NASDAQ","United States","SIM"],
  ["LSE","United Kingdom","SIM"],["EURONEXT","Europe","SIM"],["HKEX","Hong Kong","SIM"],
  ["NSE","India","SIM"],["JPX","Japan","SIM"]
];

const lessons = [
  ["Market Basics","Understand shares, ETFs, indices and orders."],
  ["Risk Before Return","Position sizing, drawdown and concentration."],
  ["Technical Analysis","Charts, trend, support and resistance."],
  ["Fundamental Analysis","Revenue, cash flow, valuation and news."],
  ["Trading Psychology","Discipline, bias and decision journals."],
  ["Regulation & Safety","Know what changes when real money is involved."]
];

export default function Home() {
  const [locale,setLocale] = useState("en");
  const [query,setQuery] = useState("");
  const [answer,setAnswer] = useState("Ask NexAI a market question. This launch version keeps all prices and orders in simulation mode until approved live feeds and broker connections are configured.");
  const [cash,setCash] = useState(100000);
  const [position,setPosition] = useState(0);
  const [tab,setTab] = useState<"learn"|"practice"|"risk"|"connect">("learn");

  const rtl = ["ar","ur"].includes(locale);
  const headline = hero[locale] ?? hero.en;
  const equity = useMemo(()=>cash + position * 100, [cash,position]);

  function ask(e:FormEvent) {
    e.preventDefault();
    const q=query.trim();
    if(!q) return;
    setAnswer("NexAI launch mode: I can explain concepts, compare market structures, help you build a checklist and analyse scenarios. Live prices are not connected yet, so I will not present simulated figures as real market data. Your question: “"+q+"”");
    setQuery("");
  }

  function paperBuy() {
    if(cash>=1000){ setCash(v=>v-1000); setPosition(v=>v+10); }
  }

  function paperSell() {
    if(position>=10){ setCash(v=>v+1000); setPosition(v=>v-10); }
  }

  return (
    <main dir={rtl?"rtl":"ltr"}>
      <header className="topbar">
        <div className="brand"><span className="mark">N</span><div><strong>NexAI</strong><small>GLOBAL MARKETS</small></div></div>
        <nav><a href="#ai">Ask AI</a><a href="/markets/live">Live Markets</a><a href="#academy">Academy</a></nav>
        <select aria-label="Language" value={locale} onChange={e=>setLocale(e.target.value)}>
          {languages.map(([code,name])=><option key={code} value={code}>{name}</option>)}
        </select>
      </header>

      <section className="hero">
        <div className="eyebrow">BUILT IN AFRICA · FLUENT IN THE WORLD</div>
        <h1>{headline}</h1>
        <p>Learn it. Ask it. Practise it. Risk-check it. Trade it — in your language.</p>
        <div className="badges"><span>31 language locales</span><span>Global market architecture</span><span className="safe">Live execution locked</span></div>
      </section>

      <section id="ai" className="panel ai">
        <div className="panelHead"><div><small>NEXAI</small><h2>Market Intelligence Desk</h2></div><span className="mode">EDUCATION + SIMULATION</span></div>
        <div className="answer">{answer}</div>
        <form onSubmit={ask} className="ask">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ask about a company, currency, market, risk or trading concept…" />
          <button>Ask NexAI</button>
        </form>
        <p className="fine">No profit guarantees. No simulated price is labelled live. AI explanations are educational until licensed execution services are activated.</p>
      </section>

      <section id="markets">
        <div className="sectionTitle"><small>MARKET ACCESS MAP</small><h2>One intelligence layer. Many exchanges.</h2><a className="goldLink" href="/markets/live">Open LIVE MARKETS →</a></div>
        <div className="grid markets">
          {markets.map(([name,region,status])=><article className="marketCard" key={name}><span className="pulse"/><h3>{name}</h3><p>{region}</p><b>{status}ULATION READY</b></article>)}
        </div>
      </section>

      <section id="academy" className="workspace">
        <div className="tabs">
          <button className={tab==="learn"?"active":""} onClick={()=>setTab("learn")}>NexLearn</button>
          <button className={tab==="practice"?"active":""} onClick={()=>setTab("practice")}>Practice Trade</button>
          <button className={tab==="risk"?"active":""} onClick={()=>setTab("risk")}>NexRisk</button>
          <button className={tab==="connect"?"active":""} onClick={()=>setTab("connect")}>Connect</button>
        </div>

        {tab==="learn" && <div className="grid lessons">{lessons.map(([t,d],i)=><article key={t} className="lesson"><span>0{i+1}</span><h3>{t}</h3><p>{d}</p><button>Start lesson</button></article>)}</div>}

        {tab==="practice" && <div className="tradeBox">
          <div><small>PAPER PORTFOLIO</small><h2>R{equity.toLocaleString()}</h2><p>Cash R{cash.toLocaleString()} · Demo units {position}</p></div>
          <div className="tradeActions"><button onClick={paperBuy}>Paper Buy R1,000</button><button className="ghost" onClick={paperSell}>Paper Sell R1,000</button></div>
          <div className="warning">Simulation only — no order leaves NexTradeFinX.</div>
        </div>}

        {tab==="risk" && <div className="riskGrid">
          <article><b>Capital at risk</b><strong>Controlled</strong><p>Live orders disabled.</p></article>
          <article><b>Concentration</b><strong>{position>50?"Elevated":"Low"}</strong><p>Demo exposure: {position} units.</p></article>
          <article><b>Pre-trade gate</b><strong>ON</strong><p>Broker and jurisdiction approval required.</p></article>
          <article><b>Prediction ledger</b><strong>READY</strong><p>Track thesis before outcome.</p></article>
        </div>}

        {tab==="connect" && <div className="connectBox">
          <h2>Broker & Exchange Connection Centre</h2>
          <p>Adapters are designed for FIX and approved broker APIs. Production connections remain locked until legal, KYC/AML, market-data, risk and certification gates are complete.</p>
          <div className="steps"><span>1. Jurisdiction</span><span>2. Licensed partner</span><span>3. Market data</span><span>4. Sandbox</span><span>5. Risk certification</span><span>6. Live</span></div>
          <button disabled>Live trading locked</button>
        </div>}
      </section>

      <section className="launch">
        <div><small>LAUNCH STANDARD</small><h2>Useful before real-money trading is switched on.</h2></div>
        <ul><li>Multilingual AI interface</li><li>Financial education</li><li>Paper trading</li><li>Risk controls</li><li>Exchange roadmap</li><li>Transparent data labelling</li></ul>
      </section>

      <footer><strong>NexAI Global Markets</strong><span>Built in Africa for the world.</span><a href="/api/status">System status</a></footer>
    </main>
  );
}
