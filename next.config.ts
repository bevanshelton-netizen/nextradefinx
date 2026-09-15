import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), geolocation=(), payment=()" },
        { key: "Content-Security-Policy", value: "default-src 'self'; img-src 'self' data: https://*.tradingview.com; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://s3.tradingview.com; connect-src 'self'; font-src 'self' data:; frame-src https://*.tradingview.com https://*.tradingview-widget.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" }
      ]
    }];
  }
};

export default nextConfig;
