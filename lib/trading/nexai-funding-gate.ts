export type FundingStage = 'LEARN' | 'SIMULATE' | 'PROVE' | 'FUNDING' | 'LIVE';

export interface FundingGateState {
  stage: FundingStage;
  virtualEquity: number;
  riskScore: number;
  consistencyScore: number;
  drawdownPct: number;
  trades: number;
  profitableDays: number;
  liveExecutionEnabled: boolean;
  eligibleForReview: boolean;
  reason: string;
}

/**
 * Funding gate for NexTradeFinX.
 * It deliberately cannot enable live execution. It determines whether
 * the simulated track has enough evidence to be reviewed for external funding.
 */
export function evaluateFundingGate(input: Omit<FundingGateState, 'stage' | 'liveExecutionEnabled' | 'eligibleForReview' | 'reason'>): FundingGateState {
  const riskReady = input.riskScore >= 80;
  const consistencyReady = input.consistencyScore >= 75;
  const enoughHistory = input.trades >= 50 && input.profitableDays >= 20;
  const drawdownSafe = input.drawdownPct <= 10;

  const eligible = riskReady && consistencyReady && enoughHistory && drawdownSafe;

  return {
    ...input,
    stage: eligible ? 'FUNDING' : 'PROVE',
    liveExecutionEnabled: false,
    eligibleForReview: eligible,
    reason: eligible
      ? 'Simulation evidence is sufficient for funding-provider review. Live execution remains disabled until an approved provider, account type, terms, credentials and explicit owner authorization are verified.'
      : 'Continue simulation and coaching until risk discipline, consistency, trade history and drawdown criteria are met.',
  };
}
