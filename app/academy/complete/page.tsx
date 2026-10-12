"use client";

import { useMemo, useState } from "react";

const modules = [
  ["01","Market Foundations","What markets are, why prices move, asset classes, exchanges, sessions, liquidity, spreads and orders."],
  ["02","Reading Price","Candles, trend, support/resistance, structure, volatility, volume and multi-timeframe context."],
  ["03","Fundamental Analysis","Revenue, earnings, cash flow, valuation, economic indicators, rates, inflation and catalysts."],
  ["04","Technical Analysis","Setups, indicators, momentum, breakouts, pullbacks, confirmation and avoiding indicator overload."],
  ["05","Risk Management","Position sizing, stop logic, risk/reward, concentration, drawdown, leverage and survival."],
  ["06","Trading Psychology","Fear, greed, FOMO, revenge trading, patience, discipline, routines and decision journals."],
  ["07","Execution","Market/limit/stop orders, slippage, liquidity, entries, exits, trade management and execution review."],
  ["08","Strategies","Trend following, momentum, mean reversion, value, swing trading, intraday frameworks and when not to trade."],
  ["09","Copy & Learn","How professional traders build a thesis, what can be learned from their decisions, and why copying blindly is dangerous."],
  ["10","Portfolio Thinking","Correlation, diversification, exposure, hedging concepts, allocation and portfolio-level risk."],
  ["11","Market Scenarios","Bull, bear and sideways regimes; macro shocks; news events; liquidity events and scenario planning."],
  ["12","Professional Practice","Build a playbook, journal every decision, measure an edge, review performance and prepare for regulated execution."],
];

const traders = [
  ["Trend Mentor","Trend following","Wait for structure → confirmation → controlled entry → defined invalidation."],
  ["Value Mentor","Fundamental value","Study business quality → valuation → catalyst → patient position management."],
  ["Macro Mentor","Macro regime","Rates → inflation → liquidity → currencies → scenario confirmation."],
  ["Tactical Mentor","Execution discipline","One setup → one trigger → fixed risk unit → repeat and review."],
];

export default function CompleteTradingAcademy(){
  const [capital,setCapital]=useState(100000);
  const [equity,setEquity]=useState(100000);
  const [risk,setRisk]=useState(1);
  const [selected,setSelected]=useState("Trend Mentor");
  const [lesson,setLesson]=useState(0);
  const [score,setScore]=useState(0);
  const [trade,setTrade]=useState<"idle"|"win"|"loss">("idle");
  const [journal,setJournal]=useState<string[]>([]);

  const progress=useMemo(()=>Math.round(((lesson+1)/modules.length)*100),[lesson]);
  const riskAmount=capital*(risk/100);

  function simulate(outcome:"win"|"loss"){
    const delta=outcome==="win"?riskAmount*1.5:-riskAmount;
    const next=Math.max(0,equity+delta);
    setEquity(next); setTrade(outcome); setScore(s=>Math.min(100,s+(outcome==="win"?8:3)));
    setJournal(j=>[`Simulated ${outcome} | ${selected} | risk R${riskAmount.toFixed(0)} | equity R${next.toFixed(0)}`,...j].slice(0,6));
  }

  return <main style={{minHeight:"100vh",background:"#07090d",color:"#f5f1e7",fontFamily:"Arial, sans-serif"}}>
    <header style={{position:"sticky",top:0,zIndex:5,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 5vw",background:"rgba(7,9,13,.94)",borderBottom:"1px solid #222832",backdropFilter:"blur(12px)"}}>
      <a href="/" style={{color:"#f5f1e7",textDecoration:"none",fontWeight:800,letterSpacing:1}}>NEXTRADEFINX <span style={{color:"#d6ad55"}}>ACADEMY</span></a>
      <a href="/" style={{color:"#aeb6c3",textDecoration:"none"}}>Back to platform →</a>
    </header>

    <section style={{padding:"80px 5vw 55px",maxWidth:1200,margin:"auto"}}>
      <div style={{color:"#d6ad55",fontSize:12,fontWeight:800,letterSpacing:2}}>COMPLETE TRADING EDUCATION + PRACTICAL SIMULATION</div>
      <h1 style={{fontSize:"clamp(42px,7vw,82px)",lineHeight:.95,margin:"18px 0",maxWidth:900}}>Learn to trade.<br/><span style={{color:"#d6ad55"}}>Then prove you understand it.</span></h1>
      <p style={{fontSize:20,lineHeight:1.65,color:"#b9c0ca",maxWidth:850}}>NexTradeFinX teaches the full trading journey from first principles to professional decision-making. After each stage, learners practise with virtual training capital and real-time market scenarios before they ever risk real money.</p>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:28}}><a href="#curriculum" style={{background:"#d6ad55",color:"#080a0e",padding:"14px 20px",borderRadius:8,textDecoration:"none",fontWeight:800}}>Start the curriculum</a><a href="#lab" style={{border:"1px solid #3a414c",color:"#f5f1e7",padding:"14px 20px",borderRadius:8,textDecoration:"none"}}>Enter Training Lab</a></div>
    </section>

    <section id="curriculum" style={{padding:"40px 5vw 70px",maxWidth:1200,margin:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:20,alignItems:"end",marginBottom:22}}><div><div style={{color:"#d6ad55",fontSize:12,fontWeight:800,letterSpacing:2}}>THE COMPLETE PATH</div><h2 style={{fontSize:38,margin:"8px 0"}}>12 stages from beginner to disciplined practitioner.</h2></div><div style={{color:"#aeb6c3",minWidth:130}}>{progress}% complete</div></div>
      <div style={{height:8,background:"#1b2028",borderRadius:8,marginBottom:28}}><div style={{height:"100%",width:`${progress}%`,background:"#d6ad55",borderRadius:8}}/></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>{modules.map(([n,title,desc],i)=><button key={n} onClick={()=>setLesson(i)} style={{textAlign:"left",padding:20,borderRadius:12,border:i===lesson?"1px solid #d6ad55":"1px solid #252b35",background:i===lesson?"#15130e":"#0d1117",color:"inherit",cursor:"pointer"}}><div style={{color:"#d6ad55",fontWeight:800,fontSize:12}}>{n}</div><h3 style={{margin:"10px 0 8px"}}>{title}</h3><p style={{color:"#aeb6c3",lineHeight:1.55,margin:0}}>{desc}</p></button>)}</div>
    </section>

    <section style={{padding:"65px 5vw",background:"#0c1016",borderTop:"1px solid #1e242d",borderBottom:"1px solid #1e242d"}}>
      <div style={{maxWidth:1200,margin:"auto"}}><div style={{color:"#d6ad55",fontSize:12,fontWeight:800,letterSpacing:2}}>LEARN FROM SEASONED DECISION-MAKERS</div><h2 style={{fontSize:42,margin:"10px 0"}}>Piggyback the <em>thinking</em> — not someone else's money.</h2><p style={{color:"#aeb6c3",maxWidth:800,lineHeight:1.7}}>Learners can follow simulated mentor portfolios and see how an experienced trader frames a thesis, sizes risk, enters, manages and exits. The platform must clearly distinguish education from regulated copy-trading or personalised investment advice.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14,marginTop:25}}>{traders.map(([name,style,desc])=><button key={name} onClick={()=>setSelected(name)} style={{textAlign:"left",padding:20,borderRadius:12,border:selected===name?"1px solid #d6ad55":"1px solid #252b35",background:selected===name?"#17140d":"#10151c",color:"inherit"}}><b>{name}</b><div style={{color:"#d6ad55",fontSize:12,margin:"7px 0"}}>{style}</div><p style={{color:"#aeb6c3",lineHeight:1.5}}>{desc}</p></button>)}</div></div>
    </section>

    <section id="lab" style={{padding:"70px 5vw",maxWidth:1200,margin:"auto"}}>
      <div style={{color:"#d6ad55",fontSize:12,fontWeight:800,letterSpacing:2}}>NEXTRAINING MONEY LAB</div><h2 style={{fontSize:44,margin:"10px 0"}}>Here is where understanding gets tested.</h2><p style={{color:"#aeb6c3",maxWidth:820,lineHeight:1.7}}>Every learner receives virtual training capital. They watch the market, make simulated decisions and experience profit, loss, drawdown and uncertainty in a controlled environment. The goal is competence — not gambling.</p>
      <div style={{display:"grid",gridTemplateColumns:"minmax(280px,1.1fr) minmax(280px,.9fr)",gap:18,marginTop:28}}>
        <div style={{padding:26,border:"1px solid #2b323d",borderRadius:16,background:"#0d1117"}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#aeb6c3"}}>VIRTUAL TRAINING EQUITY</span><span style={{color:"#d6ad55"}}>SIMULATION</span></div><div style={{fontSize:48,fontWeight:800,margin:"18px 0"}}>R{equity.toLocaleString(undefined,{maximumFractionDigits:0})}</div><div style={{display:"flex",gap:20,color:"#aeb6c3"}}><span>Starting: R{capital.toLocaleString()}</span><span>Score: {score}/100</span></div><div style={{marginTop:25}}><label style={{display:"block",color:"#aeb6c3",marginBottom:8}}>Risk per simulated trade: {risk}%</label><input type="range" min="0.25" max="3" step="0.25" value={risk} onChange={e=>setRisk(Number(e.target.value))} style={{width:"100%"}}/><div style={{color:"#d6ad55",marginTop:8}}>R{riskAmount.toFixed(0)} maximum planned loss</div></div><div style={{display:"flex",gap:10,marginTop:25}}><button onClick={()=>simulate("win")} style={{flex:1,padding:14,borderRadius:8,border:0,background:"#d6ad55",fontWeight:800}}>Simulate disciplined win</button><button onClick={()=>simulate("loss")} style={{flex:1,padding:14,borderRadius:8,border:"1px solid #3a414c",background:"#141922",color:"#f5f1e7"}}>Simulate loss</button></div>{trade!=="idle"&&<p style={{color:"#aeb6c3"}}>Scenario recorded. The lesson is to evaluate the process, not celebrate or chase the result.</p>}</div>
        <div style={{padding:26,border:"1px solid #2b323d",borderRadius:16,background:"#0d1117"}}><div style={{color:"#d6ad55",fontWeight:800}}>YOUR CURRENT MENTOR</div><h3 style={{fontSize:28,margin:"8px 0"}}>{selected}</h3><p style={{color:"#aeb6c3",lineHeight:1.6}}>Study the mentor's simulated decisions, then make your own call. NexTradeFinX records whether you understood the setup, risk, invalidation and exit — not whether you happened to guess the direction.</p><div style={{padding:15,background:"#151a22",borderRadius:10,marginTop:20}}><b>Decision checklist</b><ul style={{color:"#aeb6c3",lineHeight:1.8}}><li>What is the thesis?</li><li>What would prove it wrong?</li><li>How much can I lose?</li><li>Where is the exit?</li><li>Would I take this trade again?</li></ul></div></div>
      </div>
      <div style={{marginTop:18,padding:22,border:"1px solid #2b323d",borderRadius:16,background:"#0d1117"}}><b>Decision journal</b>{journal.length===0?<p style={{color:"#7f8997"}}>Your simulated decisions will appear here.</p>:journal.map((x,i)=><div key={i} style={{padding:"10px 0",borderBottom:"1px solid #202631",color:"#aeb6c3"}}>{x}</div>)}</div>
    </section>

    <section style={{padding:"60px 5vw",background:"#d6ad55",color:"#080a0e"}}><div style={{maxWidth:1100,margin:"auto"}}><h2 style={{fontSize:42,margin:"0 0 12px"}}>Graduation should be earned.</h2><p style={{fontSize:18,lineHeight:1.6,maxWidth:800}}>Before a learner graduates from NexTradeFinX Academy, the platform can require knowledge checks, scenario decisions, a minimum simulated sample, risk-discipline thresholds and a complete trading journal. Passing means the learner demonstrated process competence — never that profits are guaranteed.</p></div></section>

    <footer style={{padding:"35px 5vw",color:"#7f8997",textAlign:"center",fontSize:13}}>NexTradeFinX Academy · Educational and simulation environment. Trading and investing involve substantial risk. No simulation result guarantees future performance. Real-money execution, if ever offered, must be subject to applicable law, licensing, KYC/AML, suitability and approved regulated partners.</footer>
  </main>;
}
