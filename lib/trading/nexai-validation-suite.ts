import type { BotConfig, Candle } from './nexai-night-trader';
import { validateStrategy, type ValidationResult } from './nexai-validation';

export interface ValidationSuiteResult {
  inSample: ValidationResult;
  outOfSample: ValidationResult;
  splitIndex: number;
  warnings: string[];
}

/**
 * Runs a chronological in-sample/out-of-sample validation split.
 * No shuffling is permitted: the later segment must remain unseen by the first test.
 */
export function validateOutOfSample(
  candles: Candle[],
  symbol: string,
  config: BotConfig,
  startingEquity = config.startingEquity,
  inSampleFraction = 0.7,
): ValidationSuiteResult {
  if (candles.length < 100) throw new Error('At least 100 candles are required for a meaningful split.');
  if (inSampleFraction <= 0.5 || inSampleFraction >= 0.9) {
    throw new Error('inSampleFraction must be greater than 0.5 and less than 0.9.');
  }

  const splitIndex = Math.floor(candles.length * inSampleFraction);
  const inSample = validateStrategy(candles.slice(0, splitIndex), config, startingEquity);
  const outOfSample = validateStrategy(candles.slice(splitIndex), symbol, config, startingEquity);

  return {
    inSample: { ...inSample, symbol },
    outOfSample: { ...outOfSample, symbol },
    splitIndex,
    warnings: [
      'This is a research validation, not evidence of future profitability.',
      'The out-of-sample segment must not be used to tune the strategy after inspection.',
      'Fees, spread, slippage, liquidity and corporate-action/data-quality effects must be modelled for the selected market.',
      'No live trading is enabled by this validation suite.',
    ],
  };
}
