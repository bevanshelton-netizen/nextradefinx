export type SimSide = 'LONG' | 'SHORT';

export interface SimPosition {
  id: string;
  side: SimSide;
  entry: number;
  stop: number;
  target: number;
  units: number;
  openedAt: string;
}

export interface SimTrade {
  id: string;
  side: SimSide;
  entry: number;
  exit: number;
  units: number;
  pnl: number;
  reason: 'TARGET' | 'STOP' | 'MANUAL';
  openedAt: string;
  closedAt: string;
}

export interface SimAccount {
  startingEquity: number;
  equity: number;
  peakEquity: number;
  maxDrawdownPct: number;
  dailyStartEquity: number;
  dailyPnl: number;
  openPosition: SimPosition | null;
  trades: SimTrade[];
}

export function createSimAccount(startingEquity = 100_000): SimAccount {
  return {
    startingEquity,
    equity: startingEquity,
    peakEquity: startingEquity,
    maxDrawdownPct: 0,
    dailyStartEquity: startingEquity,
    dailyPnl: 0,
    openPosition: null,
    trades: [],
  };
}

function updateDrawdown(account: SimAccount) {
  account.peakEquity = Math.max(account.peakEquity, account.equity);
  const drawdown = account.peakEquity === 0 ? 0 : ((account.peakEquity - account.equity) / account.peakEquity) * 100;
  account.maxDrawdownPct = Math.max(account.maxDrawdownPct, drawdown);
}

export function openSimPosition(
  account: SimAccount,
  position: Omit<SimPosition, 'id' | 'openedAt'>,
  now = new Date(),
): SimAccount {
  if (account.openPosition) throw new Error('NexSim allows one open position at a time.');
  if (position.units <= 0) throw new Error('Position size must be positive.');
  if (position.stop <= 0 || position.target <= 0 || position.entry <= 0) throw new Error('Prices must be positive.');

  account.openPosition = { ...position, id: `sim-${Date.now()}`, openedAt: now.toISOString() };
  return account;
}

export function closeSimPosition(
  account: SimAccount,
  exit: number,
  reason: SimTrade['reason'],
  now = new Date(),
): SimAccount {
  const position = account.openPosition;
  if (!position) throw new Error('No open simulation position.');
  if (exit <= 0) throw new Error('Exit price must be positive.');

  const direction = position.side === 'LONG' ? 1 : -1;
  const pnl = (exit - position.entry) * position.units * direction;
  account.equity += pnl;
  account.dailyPnl = account.equity - account.dailyStartEquity;
  account.trades.push({
    id: position.id,
    side: position.side,
    entry: position.entry,
    exit,
    units: position.units,
    pnl,
    reason,
    openedAt: position.openedAt,
    closedAt: now.toISOString(),
  });
  account.openPosition = null;
  updateDrawdown(account);
  return account;
}

export function resetSimDay(account: SimAccount) {
  account.dailyStartEquity = account.equity;
  account.dailyPnl = 0;
  return account;
}

export function isDailyKillSwitchTriggered(account: SimAccount, maxDailyLossPct = 2): boolean {
  if (account.dailyStartEquity <= 0) return true;
  const lossPct = ((account.dailyStartEquity - account.equity) / account.dailyStartEquity) * 100;
  return lossPct >= maxDailyLossPct;
}
