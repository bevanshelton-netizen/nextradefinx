export type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
};

export type Side = "LONG" | "SHORT" | "FLAT";

export type BotConfig = {
  startingEquity: number;
  riskPerTradePct: number;
  maxDailyLossPct: number;
  maxOpenPositions: number;
  fastEma: number;
  slowEma: number;
  atrPeriod: number;
  atrStopMultiple: number;
  rewardRisk: number;
};

export type Signal = {
  side: Side;
  entry: number;
  stop: number;
  target: number;
  units: number;
  riskAmount: number;
  reason: string;
};

export const DEFAULT_CONFIG: BotConfig = {
  startingEquity: 100_000,
  riskPerTradePct: 0.25,
  maxDailyLossPct: 2,
  maxOpenPositions: 1,
  fastEma: 20,
  slowEma: 50,
  atrPeriod: 14,
  atrStopMultiple: 2,
  rewardRisk: 2,
};

function ema(values: number[], period: number): number {
  if (values.length < period) return values.at(-1) ?? 0;
  const k = 2 / (period + 1);
  let value = values.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (const price of values.slice(period)) value = price * k + value * (1 - k);
  return value;
}

function atr(candles: Candle[], period: number): number {
  if (candles.length < period + 1) return 0;
  const trs: number[] = [];
  for (let i = 1; i < candles.length; i++) {
    const c = candles[i];
    const prev = candles[i - 1].close;
    trs.push(Math.max(c.high - c.low, Math.abs(c.high - prev), Math.abs(c.low - prev)));
  }
  return trs.slice(-period).reduce((a, b) => a + b, 0) / period;
}

export function nextSignal(
  candles: Candle[],
  equity: number,
  dailyPnl: number,
  openPositions = 0,
  config: BotConfig = DEFAULT_CONFIG,
): Signal {
  const flat: Signal = { side: "FLAT", entry: 0, stop: 0, target: 0, units: 0, riskAmount: 0, reason: "No valid setup" };
  if (openPositions >= config.maxOpenPositions) return { ...flat, reason: "Position limit reached" };
  if (dailyPnl <= -(equity * config.maxDailyLossPct) / 100) return { ...flat, reason: "Daily loss kill-switch active" };
  if (candles.length < Math.max(config.slowEma, config.atrPeriod) + 5) return { ...flat, reason: "Insufficient market history" };

  const closes = candles.map(c => c.close);
  const fast = ema(closes, config.fastEma);
  const slow = ema(closes, config.slowEma);
  const volatility = atr(candles, config.atrPeriod);
  const price = closes.at(-1) ?? 0;
  if (!volatility || !price) return { ...flat, reason: "Insufficient volatility data" };

  const previousCloses = closes.slice(0, -1);
  const previousFast = ema(previousCloses, config.fastEma);
  const previousSlow = ema(previousCloses, config.slowEma);
  const crossedUp = previousFast <= previousSlow && fast > slow;
  const crossedDown = previousFast >= previousSlow && fast < slow;
  const riskAmount = equity * (config.riskPerTradePct / 100);
  const stopDistance = volatility * config.atrStopMultiple;
  const units = Math.max(0, riskAmount / stopDistance);

  if (crossedUp) {
    const stop = price - stopDistance;
    return {
      side: "LONG",
      entry: price,
      stop,
      target: price + stopDistance * config.rewardRisk,
      units,
      riskAmount,
      reason: `EMA${config.fastEma} crossed above EMA${config.slowEma}; ATR risk model confirms sizing`,
    };
  }

  if (crossedDown) {
    const stop = price + stopDistance;
    return {
      side: "SHORT",
      entry: price,
      stop,
      target: price - stopDistance * config.rewardRisk,
      units,
      riskAmount,
      reason: `EMA${config.fastEma} crossed below EMA${config.slowEma}; ATR risk model confirms sizing`,
    };
  }

  return { ...flat, reason: "No confirmed trend transition" };
}

export const NEXAI_NIGHT_TRADER_POLICY = {
  mode: "paper-first",
  liveExecution: false,
  requiresBrokerAdapter: true,
  maxRiskPerTradePct: 0.25,
  maxDailyLossPct: 2,
  killSwitch: true,
  notes: [
    "This is an automated strategy engine, not a profit guarantee.",
    "Backtest and forward-test before any live connection.",
    "Live execution must use an approved broker/API and comply with that provider's rules.",
    "Never store broker credentials in source control.",
  ],
} as const;
