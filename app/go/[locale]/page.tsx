import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marketingLocaleCodes, marketingLocales } from "@/lib/marketing-locales";

export function generateStaticParams() {
  return marketingLocaleCodes.map(locale => ({ locale }));
}

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> {
  const { locale } = await params;
  const copy = marketingLocales[locale];
  if (!copy) return {};
  return {
    title: `${copy.label} | NexAI Global Markets`,
    description: copy.subhead,
    alternates: {
      canonical: `/go/${locale}`,
      languages: Object.fromEntries(marketingLocaleCodes.map(code => [code, `/go/${code}`]))
    },
    openGraph: {
      title: copy.headline,
      description: copy.subhead,
      type: "website"
    }
  };
}

export default async function MarketingPage({params}:{params:Promise<{locale:string}>}) {
  const { locale } = await params;
  const copy = marketingLocales[locale];
  if (!copy) notFound();

  return (
    <main dir={copy.dir || "ltr"} className="campaignPage">
      <header className="topbar">
        <Link className="brand" href="/"><span className="mark">N</span><div><strong>NexAI</strong><small>GLOBAL MARKETS</small></div></Link>
        <nav><Link href="/markets/live">Live Markets</Link><Link href="/#academy">Academy</Link><Link href="/">Full platform</Link></nav>
        <span className="feedBadge">PUBLIC BETA</span>
      </header>

      <section className="campaignHero">
        <div className="campaignEyebrow">BUILT IN AFRICA · FLUENT IN THE WORLD</div>
        <h1>{copy.headline}</h1>
        <p>{copy.subhead}</p>
        <div className="campaignActions">
          <Link className="primaryCta" href="/">{copy.cta}</Link>
          <Link className="secondaryCta" href="/markets/live">Live Markets</Link>
        </div>
        <div className="campaignTrust">
          <span>31 language locales</span>
          <span>Global market screen</span>
          <span>Paper trading</span>
          <span>Risk-first learning</span>
        </div>
      </section>

      <section className="campaignFeatures">
        {[copy.learn,copy.markets,copy.practice,copy.risk].map((item,i)=>(
          <article key={item}><span>0{i+1}</span><h2>{item}</h2></article>
        ))}
      </section>

      <section className="campaignMarkets">
        <div>
          <small>MARKET INTELLIGENCE</small>
          <h2>Africa first. World connected.</h2>
          <p>JSE · NYSE · NASDAQ · LSE · Euronext · NSE · JPX · FX · Crypto</p>
        </div>
        <Link href="/markets/live">Open market screen →</Link>
      </section>

      <section className="campaignCountries">
        <small>CAMPAIGN MARKETS</small>
        <div>{copy.countries.map(country => <span key={country}>{country}</span>)}</div>
      </section>

      <section className="campaignDisclosure">
        <strong>{copy.disclaimer}</strong>
        <p>Market feeds may be real-time or delayed according to provider and exchange rules. NexAI does not promise returns and does not currently execute real-money orders.</p>
      </section>

      <footer><strong>NexAI Global Markets</strong><span>Built in Africa for the world.</span><Link href="/">Enter platform</Link></footer>
    </main>
  );
}
