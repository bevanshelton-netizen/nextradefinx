import type { Candle } from './nexai-night-trader';

export type MarketDataProvider = 'CSV' | 'ALPHA_VANTAGE';

export type HistoricalBar = Candle & { symbol: string; timestamp: string };

export function parseHistoricalCsv(csv: string, symbol: string): HistoricalBar[] {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const indexOf = (...names: string[]) => names.map((n) => headers.indexOf(n)).find((i) => i >= 0) ?? -1;
  const timeIndex = indexOf('timestamp', 'time', 'date', 'datetime');
  const openIndex = indexOf('open');
  const highIndex = indexOf('high');
  const lowIndex = indexOf('low');
  const closeIndex = indexOf('close');
  const volumeIndex = indexOf('volume');
  if ([timeIndex, openIndex, highIndex, lowIndex, closeIndex].some((i) => i < 0)) {
    throw new Error('CSV must contain timestamp/date, open, high, low and close columns.');
  }

  return lines.slice(1).map((line, row) => {
    const values = line.split(',').map((v) => v.trim());
    const timestamp = values[timeIndex];
    const timeMs = Date.parse(timestamp);
    if (!Number.isFinite(timeMs)) throw new Error(`Invalid timestamp on CSV row ${row + 2}.`);
    const open = Number(values[openIndex]);
    const high = Number(values[highIndex]);
    const low = Number(values[lowIndex]);
    const close = Number(values[closeIndex]);
    const volume = volumeIndex >= 0 ? Number(values[volumeIndex]) : undefined;
    if (![open, high, low, close].every(Number.isFinite) || high < low) {
      throw new Error(`Invalid OHLC values on CSV row ${row + 2}.`);
    }
    return {
      symbol,
      timestamp: new Date(timeMs).toISOString(),
      time: Math.floor(timeMs / 1000),
      open,
      high,
      low,
      close,
      ...(Number.isFinite(volume) ? { volume } : {}),
    };
  }).sort((a, b) => a.time - b.time);
}

export function buildAlphaVantageDailyUrl(symbol: string, apiKey: string): string {
  if (!symbol.trim()) throw new Error('Symbol is required.');
  if (!apiKey.trim()) throw new Error('API key is required.');
  const params = new URLSearchParams({
    function: 'TIME_SERIES_DAILY',
    symbol,
    outputsize: 'full',
    apikey: apiKey,
  });
  return `https://www.alphavantage.co/query?${params.toString()}`;
}

export function parseAlphaVantageDaily(payload: Record<string, unknown>, symbol: string): HistoricalBar[] {
  const series = payload['Time Series (Daily)'];
  if (!series || typeof series !== 'object') throw new Error('Alpha Vantage response does not contain daily time-series data.');
  return Object.entries(series as Record<string, Record<string, string>>).map(([date, values]) => {
    const open = Number(values['1. open']);
    const high = Number(values['2. high']);
    const low = Number(values['3. low']);
    const close = Number(values['4. close']);
    const volume = Number(values['5. volume']);
    const timeMs = Date.parse(`${date}T00:00:00Z`);
    return {
      symbol,
      timestamp: new Date(timeMs).toISOString(),
      time: Math.floor(timeMs / 1000),
      open,
      high,
      low,
      close,
      volume,
    };
  }).filter((bar) => [bar.open, bar.high, bar.low, bar.close].every(Number.isFinite)).sort((a, b) => a.time - b.time);
}

export const NEXAI_MARKET_DATA_POLICY = {
  defaultMode: 'CSV_IMPORT',
  liveFetch: false,
  credentialsInSourceControl: false,
  notes: [
    'Historical data must be identified by provider, symbol and timeframe.',
    'Do not mix adjusted and unadjusted price series without recording the choice.',
    'Realistic spread, slippage, fees and liquidity assumptions must be applied before live consideration.',
  ],
} as const;
