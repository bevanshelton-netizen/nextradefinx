import { calculateNexScore, type NexScoreInput, type NexScoreResult } from './nexscore';
import { evaluateFundingGate, type FundingGateState } from './nexai-funding-gate';

export interface NexAIReadinessInput extends NexScoreInput {
  virtualEquity: number;
}

export interface NexAIReadinessResult {
  scorecard: NexScoreResult;
  fundingGate: FundingGateState;
  liveExecutionEnabled: false;
  recommendation: string;
}

/**
 * Single decision layer joining learning performance, simulation evidence,
 * NexScore and the external-funding review gate.
 *
 * This function can recommend review; it can never authorize live execution.
 */
export function evaluateNexAIReadiness(input: NexAIReadinessInput): NexAIReadinessResult {
  const scorecard = calculateNexScore(input);
  const fundingGate = evaluateFundingGate({
    virtualEquity: input.virtualEquity,
    riskScore: input.riskScore,
    consistencyScore: input.consistencyScore,
    drawdownPct: input.maxDrawdownPct,
    trades: input.trades,
    profitableDays: input.profitableDays,
  });

  return {
    scorecard,
    fundingGate,
    liveExecutionEnabled: false,
    recommendation: fundingGate.eligibleForReview
      ? 'Eligible for review by a legitimate funding or broker partner. Verify provider terms, jurisdiction, account type, automation permissions and credentials before any live connection.'
      : 'Remain in NexLearn/NexSim training and address the NexScore gaps before seeking external capital.',
  };
}
