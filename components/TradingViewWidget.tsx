"use client";

import { useEffect, useRef } from "react";

type Props = {
  scriptName: "ticker-tape" | "market-overview";
  config: Record<string, unknown>;
  minHeight?: number;
};

export default function TradingViewWidget({ scriptName, config, minHeight = 500 }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const configJson = JSON.stringify(config);

  useEffect(() => {
    const node = host.current;
    if (!node) return;

    node.replaceChildren();
    const mount = document.createElement("div");
    mount.className = "tradingview-widget-container__widget";
    node.appendChild(mount);

    const script = document.createElement("script");
    script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${scriptName}.js`;
    script.async = true;
    script.type = "text/javascript";
    script.text = configJson;
    node.appendChild(script);

    return () => node.replaceChildren();
  }, [scriptName, configJson]);

  return (
    <div className="tradingview-widget-container tvHost" ref={host} style={{ minHeight }}>
      <div className="widgetLoading">Loading market feed…</div>
    </div>
  );
}
