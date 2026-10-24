import { nextSignal, type BotConfig, type Candle, DEFAULT_CONFIG } from './nexai-night-trader';

export interface ValidationTrade {
  side: 'LONG' | 'SHORT';
  entry: number;
  exit: number;
  units: number;
  pnl: number;
  reason: 'TARGET' | 'STOP' | 'END_OF_TEST';
  openedAt: string;
  closedAt: string;
}

interface ValidationPosition {
  side: 'LONG' | 'SHORT';
  entry: number;
  stop: number;
  target: number;
  units: number;
  openedAt: string;
}

export interface ValidationMetrics {
  startingEquity: number;
  endingEquity: number;
  netPnl: number;
  returnPct: number;
  trades: number;
  wins: number;
  losses: number;
  winRatePct: number;
  grossProfit: number;
  grossLoss: number;
  profitFactor: number;
  expectancyPerTrade: number;
  maxDrawdownPct: number;
  maxDrawdownAmount: number;
  dailyKillSwitchTriggered: boolean;
  notes: string[];
}

export interface ValidationResult {
  symbol: string;
  bars: number;
  config: BotConfig;
  trades: ValidationTrade[];
  metrics: ValidationMetrics;
}

function closeTrade(
  trade: ValidationPosition,
  exit: number,
  reason: ValidationTrade['reason'],
  closedAt: string,
): ValidationTrade {
  const direction = trade.side === 'LONG' ? 1 : -1;
  return {
    side: trade.side,
    entry: trade.entry,
    exit,
    units: trade.units,
    pnl: (exit - trade.entry) * trade.units * direction,
    reason,
    openedAt: trade.openedAt,
    closedAt,
  };
}

/**
 * Deterministic historical validator for NexAI/NexSim.
 * It never submits an order and uses candle OHLC only.
 * If a candle touches both stop and target, STOP wins (conservative assumption).
 */
export function validateStrategy(
  candles: Candle[],
  config: BotConfig = DEFAULT_CONFIG,
  startingEquity = config.startingEquity,
  symbol = 'VALIDATION',
): ValidationResult {
  if (candles.length < Math.max(config.slowEma, config.atrPeriod) + 2) {
    throw new Error('Not enough candles for validation.');
  }
  if (startingEquity <= 0) throw new Error('Starting equity must be positive.');

  let equity = startingEquity;
  let peakEquity = startingEquity;
  let maxDrawdownAmount = 0;
  let maxDrawdownPct = 0;
  let dailyStartEquity = startingEquity;
  let dailyKillSwitchActive = false;
  let dailyKillSwitchEverTriggered = false;
  let position: ValidationPosition | null = null;
  const trades: ValidationTrade[] = [];
  let currentDay = new Date(candles[0].time * 1000).toISOString().slice(0, 10);

  const updateRisk = () => {
    peakEquity = Math.max(peakEquity, equity);
    const ddAmount = peakEquity - equity;
    maxDrawdownAmount = Math.max(maxDrawdownAmount, ddAmount);
    maxDrawdownPct = Math.max(maxDrawdownPct, peakEquity > 0 ? (ddAmount / peakEquity) * 100 : 0);
  };

  for (let i = 0; i < candles.length; i += 1) {
    const bar = candles[i];
    const day = new Date(bar.time * 1000).toISOString().slice(0, 10);
    if (day !== currentDay) {
      currentDay = day;
      dailyStartEquity = equity;
      dailyKillSwitchActive = false;
    }

    if (position) {
      const hitStop = position.side === 'LONG' ? bar.low <= position.stop : bar.high >= position.stop;
      const hitTarget = position.side === 'LONG' ? bar.high >= position.target : bar.low <= position.target;
      if (hitStop || hitTarget) {
        const exit = hitStop ? position.stop : position.target;
        const reason: ValidationTrade['reason'] = hitStop ? 'STOP' : 'TARGET';
        const trade = closeTrade(position, exit, reason, new Date(bar.time * 1000).toISOString());
        equity += trade.pnl;
        trades.push(trade);
        position = null;
        updateRisk();
      }
    }

    if (!position && !dailyKillSwitchActive) {
      const dailyLossPct = dailyStartEquity > 0 ? ((dailyStartEquity - equity) / dailyStartEquity) * 100 : 100;
      if (dailyLossPct >= config.maxDailyLossPct) {
        dailyKillSwitchActive = true;
        dailyKillSwitchEverTriggered = true;
      } else {
        const signal = nextSignal(candles.slice(0, i + 1), equity, equity - dailyStartEquity, 0, config);
        if (signal.side !== 'FLAT') {
          position = {
            side: signal.side,
            entry: signal.entry,
            stop: signal.stop,
            target: signal.target,
            units: signal.units,
            openedAt: new Date(bar.time * 1000).toISOString(),
          };
        }
      }
    }
  }

  const last = candles[candles.length - 1];
  if (position) {
    const trade = closeTrade(position, last.close, 'END_OF_TEST', new Date(last.time * 1000).toISOString());
    equity += trade.pnl;
    trades.push(trade);
    position = null;
    updateRisk();
  }

  const wins = trades.filter((t) => t.pnl > 0).length;
  const losses = trades.filter((t) => t.pnl < 0).length;
  const grossProfit = trades.filter((t) => t.pnl > 0).reduce((sum, t) => sum + t.pnl, 0);
  const grossLoss = Math.abs(trades.filter((t) => t.pnl < 0).reduce((sum, t) => sum + t.pnl, 0));
  const netPnl = equity - startingEquity;
  const profitFactor = grossLoss === 0 ? (grossProfit > 0 ? Number.POSITIVE_INFINITY : 0) : grossProfit / grossLoss;

  return {
    symbol,
    bars: candles.length,
    config,
    trades,
    metrics: {
      startingEquity,
      endingEquity: equity,
      netPnl,
      returnPct: (netPnl / startingEquity) * 100,
      trades: trades.length,
      wins,
      losses,
      winRatePct: trades.length ? (wins / trades.length) * 100 : 0,
      grossProfit,
      grossLoss,
      profitFactor,
      expectancyPerTrade: trades.length ? netPnl / trades.length : 0,
      maxDrawdownPct,
      maxDrawdownAmount,
      dailyKillSwitchTriggered: dailyKillSwitchEverTriggered,
      notes: [
        'Historical simulation only; no live orders are submitted.',
        'OHLC ambiguity is resolved conservatively: when stop and target are both touched in one candle, stop is assumed first.',
        'Results can be affected by spread, slippage, fees, liquidity and data quality; those must be modelled before any live consideration.',
        'Signal generation uses only candles available through the current bar; no future bars are supplied to the strategy.',
      ],
    },
  };
}
