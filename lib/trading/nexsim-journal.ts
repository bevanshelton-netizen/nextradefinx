export interface TradeJournalEntry {
  tradeId: string;
  thesis: string;
  strategy: string;
  riskPct: number;
  stopDefined: boolean;
  targetDefined: boolean;
  emotion: 'CALM' | 'UNCERTAIN' | 'FOMO' | 'REVENGE';
  lesson: string;
  createdAt: string;
}

export function validateJournalEntry(entry: TradeJournalEntry): string[] {
  const errors: string[] = [];
  if (!entry.thesis.trim()) errors.push('A trade thesis is required.');
  if (!entry.strategy.trim()) errors.push('A strategy name is required.');
  if (entry.riskPct <= 0 || entry.riskPct > 2) errors.push('Simulation risk must be greater than 0% and no more than 2%.');
  if (!entry.stopDefined) errors.push('Define a stop before the trade is considered review-ready.');
  if (!entry.targetDefined) errors.push('Define a target before the trade is considered review-ready.');
  return errors;
}
