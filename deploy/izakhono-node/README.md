# IZAKHONO NODE deployment

This directory defines the owned-first runtime handoff for the NexTradeFinX / IZAKHONO ONE application.

## Runtime contract

- Container: repository `Dockerfile`
- Application port: `3000`
- Health endpoint: `/api/status`
- Production build: `npm run build`
- Runtime: Node.js 22
- Primary target: IZAKHONO NODE
- Fallback target: Vercel

## Deployment boundary

The application remains a simulation/non-execution financial platform. Do not enable live execution, custody, regulated investment services, or production KYC/AML flows without the required authorised partners and controls.

## Suggested handoff

1. Build the image from the repository commit.
2. Run the container on IZAKHONO NODE.
3. Route the owned domain through the IZAKHONO-controlled ingress.
4. Verify `/api/status` and the `/acquisition` route.
5. Keep Vercel available as an externally reversible fallback.
