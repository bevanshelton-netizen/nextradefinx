import type { Candle } from './nexai-night-trader';

export interface SimMarketBar extends Candle {
  symbol: string;
  timestamp: string;
}

export interface ReplayState {
  bars: SimMarketBar[];
  index: number;
  running: boolean;
}

export function createReplayState(bars: SimMarketBar[]): ReplayState {
  return { bars, index: 0, running: false };
}

export function currentReplayBar(state: ReplayState): SimMarketBar | null {
  return state.bars[state.index] ?? null;
}

export function advanceReplay(state: ReplayState): ReplayState {
  if (state.index >= state.bars.length - 1) return { ...state, running: false };
  return { ...state, index: state.index + 1 };
}

export function resetReplay(state: ReplayState): ReplayState {
  return { ...state, index: 0, running: false };
}

export function generateDemoMarket(symbol = 'JSE:TOP40', count = 120, start = 1800): SimMarketBar[] {
  const bars: SimMarketBar[] = [];
  let price = start;
  for (let i = 0; i < count; i += 1) {
    const drift = Math.sin(i / 8) * 2 + Math.cos(i / 17) * 1.2;
    const move = drift + ((i * 17) % 7 - 3) * 0.7;
    const open = price;
    const close = Math.max(1, open + move);
    const high = Math.max(open, close) + 2 + (i % 3) * 0.5;
    const low = Math.min(open, close) - 2 - (i % 2) * 0.6;
    bars.push({
      symbol,
      timestamp: new Date(Date.UTC(2026, 0, 1, 9, 0) + i * 60_000).toISOString(),
      time: Math.floor((Date.UTC(2026, 0, 1, 9, 0) + i * 60_000) / 1000),
      open,
      high,
      low,
      close,
      volume: 1000 + (i % 19) * 125,
    });
    price = close;
  }
  return bars;
}
