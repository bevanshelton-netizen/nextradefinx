const playbooks = [
  {
    title: "Trend Campaigner",
    subtitle: "Ride strength, cut weakness",
    focus: "Waits for structure, enters when trend evidence is strong, then protects capital as the move develops.",
    phases: [
      ["Thesis","What trend exists, on which timeframe, and what evidence would prove it is not real?"],
      ["Entry","Looks for confirmation rather than chasing the first move."],
      ["Risk budget","Defines the maximum loss before entry and sizes the position from that number."],
      ["Invalidation","Exits when the original trend condition breaks instead of inventing a new reason to stay."],
      ["Scale","Adds only when the trade is working and risk remains controlled."],
      ["Exit","Uses trailing structure, targets or a regime change instead of hope."],
      ["Review","Measures whether the process was followed, not only whether money was made."]
    ]
  },
  {
    title: "Value Campaigner",
    subtitle: "Price versus underlying worth",
    focus: "Starts with business quality, cash generation, valuation and patience; price is one input, not the whole story.",
    phases: [
      ["Thesis","Writes down why the asset may be mispriced and what catalyst could close the gap."],
      ["Entry","Builds exposure gradually instead of assuming the first price is perfect."],
      ["Risk budget","Controls concentration because a good thesis can still be early or wrong."],
      ["Invalidation","Changes course when fundamentals deteriorate or the valuation case disappears."],
      ["Scale","Adds when evidence improves, not merely because price fell."],
      ["Exit","Reduces when value is realised, the thesis changes, or better opportunities emerge."],
      ["Review","Compares the original valuation assumptions with what actually happened."]
    ]
  },
  {
    title: "Macro Campaigner",
    subtitle: "Trade the regime, not the headline",
    focus: "Connects rates, inflation, currencies, liquidity and policy into a scenario map before taking risk.",
    phases: [
      ["Thesis","Builds base, bull and bear scenarios rather than one prediction."],
      ["Entry","Acts when price behaviour starts confirming the preferred macro scenario."],
      ["Risk budget","Uses smaller size when uncertainty or event risk is high."],
      ["Invalidation","Cuts exposure when the macro relationship stops behaving as expected."],
      ["Scale","Adds after confirmation across multiple related markets."],
      ["Exit","Takes risk off when the regime, policy path or correlation structure changes."],
      ["Review","Separates bad analysis from bad timing and from poor execution."]
    ]
  },
  {
    title: "Tactical Campaigner",
    subtitle: "Execution, discipline, repetition",
    focus: "Trades a narrow playbook repeatedly and treats every position as one sample in a long series.",
    phases: [
      ["Thesis","Uses a short checklist with clearly defined market conditions."],
      ["Entry","Requires a precise trigger; no trigger means no trade."],
      ["Risk budget","Uses consistent risk units instead of changing size with emotion."],
      ["Invalidation","Exits quickly when the setup fails."],
      ["Scale","Only scales if the original setup remains valid and liquidity permits."],
      ["Exit","Follows the predetermined management plan rather than reacting impulsively."],
      ["Review","Screenshots, journals and tags every setup to identify what actually has an edge."]
    ]
  }
];

const habits = [
  ["Capital first","Veterans think about staying in the game before they think about the upside."],
  ["One thesis, one invalidation","They know what would make them wrong before they enter."],
  ["Risk in units","They compare opportunities by risk, not excitement."],
  ["No revenge trading","A loss is data; it is not a reason to increase size."],
  ["Regime awareness","A method that works in one market environment may fail in another."],
  ["Review relentlessly","The journal is where a trading system becomes measurable."]
];

export default function SeasonedCampaignersPage(){
  return (
    <main className="campaignerPage">
      <header className="topbar">
        <div className="brand"><span className="mark">N</span><div><strong>NexAI</strong><small>GLOBAL MARKETS</small></div></div>
        <nav><a href="/">Home</a><a href="/markets/live">Live Markets</a><a href="/#academy">Academy</a></nav>
        <span className="mode">EDUCATION ONLY</span>
      </header>

      <section className="campaignerHero">
        <div className="campaignEyebrow">INSIDE THE CAMPAIGN</div>
        <h1>See how seasoned traders think before, during and after a trade.</h1>
        <p>
          Not signals. Not hero worship. Not “copy my trade.” This desk breaks experienced decision-making into repeatable operating habits: thesis, entry, risk, invalidation, scaling, exit and review.
        </p>
        <div className="campaignActions">
          <a className="primaryCta" href="#playbooks">Open the playbooks</a>
          <a className="secondaryCta" href="/#academy">Back to NexLearn</a>
        </div>
        <div className="campaignTrust">
          <span>Process over prediction</span>
          <span>Risk before return</span>
          <span>No guaranteed outcomes</span>
          <span>Paper-study compatible</span>
        </div>
      </section>

      <section className="campaignerPrinciples">
        <div className="sectionTitle">
          <small>WHAT THE EXPERIENCED CONSISTENTLY DO</small>
          <h2>The edge is often in behaviour, not a secret indicator.</h2>
        </div>
        <div className="campaignerHabitGrid">
          {habits.map(([title,description])=>(
            <article key={title}>
              <strong>{title}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="playbooks" className="campaignerPlaybooks">
        <div className="sectionTitle">
          <small>FOUR OPERATING STYLES</small>
          <h2>Study the campaign from start to finish.</h2>
          <p className="campaignerIntro">These are educational archetypes based on common professional disciplines. They are not recommendations to buy or sell any specific instrument.</p>
        </div>

        <div className="campaignerGrid">
          {playbooks.map((playbook,index)=>(
            <article className="campaignerCard" key={playbook.title}>
              <div className="campaignerCardHead">
                <span>0{index+1}</span>
                <div><h3>{playbook.title}</h3><b>{playbook.subtitle}</b></div>
              </div>
              <p className="campaignerFocus">{playbook.focus}</p>
              <div className="campaignerPhases">
                {playbook.phases.map(([phase,text])=>(
                  <div key={phase}>
                    <strong>{phase}</strong>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="campaignerReplay">
        <div>
          <small>CAMPAIGN REPLAY</small>
          <h2>Learn from the decision sequence, not just the final chart.</h2>
          <p>
            The next layer can replay historical and simulated market situations one decision at a time: what was known then, what the trader considered, how much was at risk, and what later proved the thesis right or wrong.
          </p>
        </div>
        <div className="campaignerReplaySteps">
          <span>1. Context</span><span>2. Thesis</span><span>3. Trigger</span><span>4. Risk</span><span>5. Management</span><span>6. Exit</span><span>7. Review</span>
        </div>
      </section>

      <section className="campaignerDisclosure">
        <strong>Educational boundary</strong>
        <p>
          This feature is designed to teach trading process and risk discipline. It does not provide personalised investment advice, live trade signals, copy trading, guaranteed returns or claims that any method has been “perfected.” Historical success does not remove future risk.
        </p>
      </section>

      <footer><strong>NexAI Global Markets</strong><span>Built in Africa for the world.</span><a href="/api/status">System status</a></footer>
    </main>
  );
}
