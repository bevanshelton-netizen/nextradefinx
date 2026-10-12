export interface NexScoreInput {
  knowledgePct: number;
  riskScore: number;
  consistencyScore: number;
  processScore: number;
  maxDrawdownPct: number;
  trades: number;
  profitableDays: number;
}

export interface NexScoreResult {
  score: number;
  tier: 'FOUNDATION' | 'DEVELOPING' | 'COMPETENT' | 'FUNDING_READY';
  strengths: string[];
  gaps: string[];
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function calculateNexScore(input: NexScoreInput): NexScoreResult {
  const drawdownScore = clamp(100 - input.maxDrawdownPct * 10);
  const historyScore = clamp((input.trades / 50) * 100);
  const dayScore = clamp((input.profitableDays / 20) * 100);

  const score = Math.round(
    input.knowledgePct * 0.2 +
    input.riskScore * 0.25 +
    input.consistencyScore * 0.2 +
    input.processScore * 0.15 +
    drawdownScore * 0.1 +
    historyScore * 0.05 +
    dayScore * 0.05,
  );

  const strengths: string[] = [];
  const gaps: string[] = [];
  if (input.riskScore >= 80) strengths.push('Risk discipline'); else gaps.push('Risk discipline');
  if (input.consistencyScore >= 75) strengths.push('Consistency'); else gaps.push('Consistency');
  if (input.processScore >= 80) strengths.push('Trading process'); else gaps.push('Trading process');
  if (input.knowledgePct >= 80) strengths.push('Market knowledge'); else gaps.push('Market knowledge');
  if (input.maxDrawdownPct <= 10) strengths.push('Drawdown control'); else gaps.push('Drawdown control');
  if (input.trades >= 50 && input.profitableDays >= 20) strengths.push('Sufficient simulated history'); else gaps.push('More simulated history');

  const tier = score >= 85 && input.trades >= 50 && input.profitableDays >= 20 && input.maxDrawdownPct <= 10
    ? 'FUNDING_READY'
    : score >= 75 ? 'COMPETENT'
    : score >= 60 ? 'DEVELOPING'
    : 'FOUNDATION';

  return { score, tier, strengths, gaps };
}
