# NexAI Global Markets — Product & Trading Architecture

## Positioning
**NexAI — Africa-built intelligence for the world.**
NexAI is the multilingual AI intelligence layer. **NexTradeFinX** is the financial-market education, research, risk and trading application powered by NexAI.

This product must not be positioned as a clone of another vendor. It should compete on:
- multilingual reasoning and voice;
- African and emerging-market intelligence;
- global market research;
- financial education;
- paper trading;
- broker-connected live execution where legally authorised;
- transparent risk controls and audit trails.

## Core experience
1. **Ask NexAI** — market questions in the user's language.
2. **Learn** — explain investing, trading, products and regulation in simple language.
3. **Research** — equities, ETFs, FX, commodities, indices and digital assets where permitted.
4. **Practise** — paper portfolios and simulated orders.
5. **NexRisk** — suitability prompts, limits, drawdown warnings, concentration checks and pre-trade risk.
6. **Trade** — live order ticket appears only when an approved broker/exchange connector is active for the user's jurisdiction.
7. **Review** — journal, prediction ledger, performance attribution and post-trade learning.

## Global market architecture
Use a venue-agnostic order routing layer:

User -> NexAI/NexTradeFinX -> Risk & Compliance Gate -> Broker/Exchange Adapter -> Venue -> Execution/Status -> Ledger

Adapters should support FIX and broker REST/WebSocket APIs. No exchange credentials or broker secrets belong in the client application or repository.

### Priority connectivity
- Africa: JSE first; then selected African exchanges through local licensed brokers/participants.
- North America: NYSE/Nasdaq through an authorised broker-dealer / clearing relationship.
- Europe/UK: LSE/Euronext/Deutsche Börse through regulated brokers/venues.
- Asia: HKEX, Japan, India, Singapore and other markets through authorised local/global intermediaries.
- Other venues are added adapter-by-adapter after legal, market-data, clearing and execution approval.

## Live-trading gate
Live trading stays **LOCKED by default**.

Activation checklist by jurisdiction:
- licensing/authorisation mapped;
- broker/exchange agreement signed;
- market-data rights confirmed;
- KYC/AML flow approved;
- suitability/appropriateness controls approved;
- pre-trade risk thresholds configured;
- best-execution/order-routing obligations mapped;
- audit logging and complaints process active;
- sandbox/certification completed;
- production keys held in a secrets manager, never source control.

## Product modes
- **Learn Mode** — education only.
- **Research Mode** — market intelligence and analysis.
- **Practice Mode** — simulated trading.
- **Assisted Trade Mode** — user-directed order creation with clear confirmation.
- **Automated Strategy Mode** — only where specifically authorised and controlled.

## AI architecture
NexAI should be model-agnostic initially:
- multilingual orchestration layer;
- finance retrieval layer;
- market-data tool layer;
- calculation/risk engine;
- translation + terminology memory;
- speech-to-text/text-to-speech;
- policy and jurisdiction engine;
- broker/exchange tool layer;
- evaluation and red-team harness.

Longer term, train/fine-tune Africa-owned models on properly licensed data, African financial/regulatory corpora and multilingual instruction data. Keep proprietary datasets, weights and production credentials private.

## Global positioning
Primary promise:
> **Built in Africa. Fluent in the world. Intelligent about markets.**

Secondary:
> **Learn it. Ask it. Practise it. Risk-check it. Trade it — in your language.**

Regional landing pages should localise language, currency, examples, market hours, regulation and available trading partners rather than showing one generic global page.

## Commercial model
- Free: learning, delayed/basic data, limited NexAI.
- Pro: advanced NexAI, research, alerts, portfolio analytics.
- Trader: broker-connected execution tools where available.
- Academy: structured courses, certifications and simulations.
- B2B: white-label intelligence/training for brokers, schools and financial institutions.

## Non-negotiables
- Never promise profits.
- Never describe simulated prices as live.
- Never enable live execution before jurisdiction and partner gates pass.
- Never store broker secrets in source control.
- Every AI recommendation/explanation should expose data timestamp, market, assumptions and risk context.
