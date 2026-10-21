import type { ValidationResult } from './nexai-validation';

export interface PerformanceReport {
  symbol: string;
  bars: number;
  startingEquity: number;
  endingEquity: number;
  netPnl: number;
  returnPct: number;
  trades: number;
  wins: number;
  losses: number;
  winRatePct: number;
  profitFactor: number;
  expectancyPerTrade: number;
  maxDrawdownPct: number;
  maxDrawdownAmount: number;
  dailyKillSwitchTriggered: boolean;
  averageWin: number;
  averageLoss: number;
  payoffRatio: number;
  targetExits: number;
  stopExits: number;
  endOfTestExits: number;
  notes: string[];
}

/** Converts deterministic validation output into a compact decision report. */
export function buildPerformanceReport(result: ValidationResult): PerformanceReport {
  const { metrics, trades } = result;
  const wins = trades.filter((trade) => trade.pnl > 0);
  const losses = trades.filter((trade) => trade.pnl < 0);
  const averageWin = wins.length ? wins.reduce((sum, trade) => sum + trade.pnl, 0) / wins.length : 0;
  const averageLoss = losses.length ? losses.reduce((sum, trade) => sum + trade.pnl, 0) / losses.length : 0;

  return {
    symbol: result.symbol,
    bars: result.bars,
    startingEquity: metrics.startingEquity,
    endingEquity: metrics.endingEquity,
    netPnl: metrics.netPnl,
    returnPct: metrics.returnPct,
    trades: metrics.trades,
    wins: metrics.wins,
    losses: metrics.losses,
    winRatePct: metrics.winRatePct,
    profitFactor: metrics.profitFactor,
    expectancyPerTrade: metrics.expectancyPerTrade,
    maxDrawdownPct: metrics.maxDrawdownPct,
    maxDrawdownAmount: metrics.maxDrawdownAmount,
    dailyKillSwitchTriggered: metrics.dailyKillSwitchTriggered,
    averageWin,
    averageLoss,
    payoffRatio: averageLoss === 0 ? (averageWin > 0 ? Number.POSITIVE_INFINITY : 0) : averageWin / Math.abs(averageLoss),
    targetExits: trades.filter((trade) => trade.reason === 'TARGET').length,
    stopExits: trades.filter((trade) => trade.reason === 'STOP').length,
    endOfTestExits: trades.filter((trade) => trade.reason === 'END_OF_TEST').length,
    notes: [
      ...metrics.notes,
      'This report is descriptive validation output, not evidence of future profitability.',
      'Before any live consideration, validate out-of-sample and include fees, spread, slippage and liquidity assumptions.',
    ],
  };
}

export function formatPerformanceReport(report: PerformanceReport): string {
  const money = (value: number) => value.toFixed(2);
  const pct = (value: number) => `${value.toFixed(2)}%`;
  const pf = Number.isFinite(report.profitFactor) ? report.profitFactor.toFixed(2) : '∞';

  return [
    `NexAI Performance Report — ${report.symbol}`,
    `Bars: ${report.bars}`,
    `Equity: ${money(report.startingEquity)} → ${money(report.endingEquity)}`,
    `Net P/L: ${money(report.netPnl)} (${pct(report.returnPct)})`,
    `Trades: ${report.trades} | Wins: ${report.wins} | Losses: ${report.losses}`,
    `Win rate: ${pct(report.winRatePct)} | Profit factor: ${pf}`,
    `Expectancy/trade: ${money(report.expectancyPerTrade)}`,
    `Average win: ${money(report.averageWin)} | Average loss: ${money(report.averageLoss)}`,
    `Payoff ratio: ${Number.isFinite(report.payoffRatio) ? report.payoffRatio.toFixed(2) : '∞'}`,
    `Max drawdown: ${money(report.maxDrawdownAmount)} (${pct(report.maxDrawdownPct)})`,
    `Exits: ${report.targetExits} target / ${report.stopExits} stop / ${report.endOfTestExits} end-of-test`,
    `Daily kill switch triggered: ${report.dailyKillSwitchTriggered ? 'YES' : 'NO'}`,
    'SIMULATION ONLY — not a live-trading result or profit guarantee.',
  ].join('\n');
}
