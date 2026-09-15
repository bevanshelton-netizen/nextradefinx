import Link from "next/link";
import TradingViewWidget from "@/components/TradingViewWidget";

const ticker = {
  symbols: [
    { proName: "JSE:J200", title: "JSE Top 40" },
    { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
    { proName: "FOREXCOM:NSXUSD", title: "Nasdaq 100" },
    { proName: "FOREXCOM:DJI", title: "Dow 30" },
    { proName: "FX_IDC:USDZAR", title: "USD/ZAR" },
    { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
    { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
    { proName: "BITSTAMP:ETHUSD", title: "Ethereum" }
  ],
  showSymbolLogo: true,
  colorTheme: "dark",
  isTransparent: true,
  displayMode: "adaptive",
  locale: "en"
};

const overview = {
  colorTheme: "dark",
  dateRange: "1D",
  locale: "en",
  isTransparent: true,
  showFloatingTooltip: true,
  showSymbolLogo: true,
  showChart: true,
  width: "100%",
  height: "660",
  tabs: [
    {
      title: "Africa",
      symbols: [
        { s: "JSE:J200", d: "JSE Top 40" },
        { s: "JSE:NPN", d: "Naspers" },
        { s: "JSE:FSR", d: "FirstRand" },
        { s: "JSE:CPI", d: "Capitec" },
        { s: "TVC:SA40", d: "South Africa Top 40" }
      ]
    },
    {
      title: "World Indices",
      symbols: [
        { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
        { s: "FOREXCOM:NSXUSD", d: "Nasdaq 100" },
        { s: "FOREXCOM:DJI", d: "Dow Jones" },
        { s: "INDEX:NKY", d: "Japan 225" },
        { s: "INDEX:DEU40", d: "DAX" },
        { s: "FOREXCOM:UKXGBP", d: "FTSE 100" }
      ]
    },
    {
      title: "FX",
      symbols: [
        { s: "FX_IDC:USDZAR", d: "US Dollar / Rand" },
        { s: "FX_IDC:EURUSD", d: "Euro / US Dollar" },
        { s: "FX_IDC:GBPUSD", d: "Pound / US Dollar" },
        { s: "FX_IDC:USDJPY", d: "US Dollar / Yen" }
      ]
    },
    {
      title: "Crypto",
      symbols: [
        { s: "BITSTAMP:BTCUSD", d: "Bitcoin" },
        { s: "BITSTAMP:ETHUSD", d: "Ethereum" }
      ]
    }
  ]
};

export default function LiveMarketsPage() {
  return (
    <main>
      <header className="topbar">
        <Link className="brand" href="/"><span className="mark">N</span><div><strong>NexAI</strong><small>GLOBAL MARKETS</small></div></Link>
        <nav><Link href="/">NexAI</Link><Link href="/markets/live">Live Markets</Link><Link href="/#academy">Academy</Link></nav>
        <span className="feedBadge">MARKET FEED</span>
      </header>

      <section className="liveHero">
        <div>
          <div className="eyebrow">GLOBAL MARKET SCREEN</div>
          <h1>Markets, moving now.</h1>
          <p>Track major indices, South African shares, currencies and digital assets from one screen.</p>
        </div>
        <div className="liveLegend">
          <span><i className="dot real"/>Real-time where available</span>
          <span><i className="dot delayed"/>Delayed where exchange rules require</span>
        </div>
      </section>

      <section className="tickerShell">
        <TradingViewWidget scriptName="ticker-tape" config={ticker} minHeight={78} />
      </section>

      <section className="liveGrid">
        <div className="liveMain">
          <div className="livePanelHead">
            <div><small>MARKET OVERVIEW</small><h2>Africa first. World connected.</h2></div>
            <span className="provider">Powered by TradingView</span>
          </div>
          <TradingViewWidget scriptName="market-overview" config={overview} minHeight={680} />
        </div>

        <aside className="dataPolicy">
          <small>DATA STATUS</small>
          <h2>Live means correctly labelled.</h2>
          <p>Forex and crypto feeds can be real-time. Many exchange-traded stocks and indices are delayed unless the website has the required exchange data rights.</p>
          <div className="policyItem"><b>Real-time</b><span>Shown when the provider permits real-time distribution.</span></div>
          <div className="policyItem"><b>Delayed</b><span>Used where exchange licensing requires it.</span></div>
          <div className="policyItem"><b>Trading</b><span>Still separate: orders remain locked until approved broker connectivity is active.</span></div>
          <a className="goldLink" href="https://www.tradingview.com/widget-docs/faq/data/" target="_blank" rel="noreferrer">Market-data disclosure ↗</a>
        </aside>
      </section>

      <section className="marketCta">
        <div><small>NEXT LAYER</small><h2>See it. Ask NexAI about it. Practise before risking capital.</h2></div>
        <Link href="/#ai">Ask NexAI</Link>
      </section>

      <footer><strong>NexAI Global Markets</strong><span>Built in Africa for the world.</span><Link href="/api/status">System status</Link></footer>
    </main>
  );
}
