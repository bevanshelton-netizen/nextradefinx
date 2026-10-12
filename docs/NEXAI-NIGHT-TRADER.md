# NexAI Night Trader

NexAI Night Trader is the first automated strategy engine for NexTradeFinX. It is deliberately **paper-first** and risk-first.

## Objective

Automate a simple, auditable trend-following process while the user is away from the screen. The engine uses EMA trend transitions and ATR-based position sizing, with hard daily-loss and position-count limits.

## Current safety gates

- Paper/simulation mode by default.
- 0.25% maximum model risk per trade.
- 2% daily loss kill-switch.
- One open position by default.
- ATR stop distance.
- 2:1 target-to-risk model.
- No broker credentials in GitHub.
- Live execution disabled until a broker adapter is explicitly configured.

## Funding route

For a South African trader, QuickTrade.World currently advertises its TurboTrade.Fund programme as providing up to $200,000 of funded capital, with up to 80% profit share. Its published FAQ states that Expert Advisors and automated strategies are supported on its accounts, subject to its rules. Verify the current agreement, eligibility, fees, drawdown rules and live-execution terms before paying for or connecting any account.

## Important distinction

A funded-account programme is not a promise of free money. Evaluation rules, drawdown limits, platform rules and market risk still apply. The bot must be tested on historical and forward data before live use, and the strategy may lose money.

## Next integration stage

1. Build the backtest runner.
2. Add walk-forward testing and performance reporting.
3. Add a broker adapter interface.
4. Run the exact bot on a demo/funded evaluation account.
5. Verify the provider permits the exact automation method.
6. Add encrypted secrets through the deployment environment — never source control.
7. Require an explicit live-enable switch and emergency kill switch.
8. Only then consider live execution.
