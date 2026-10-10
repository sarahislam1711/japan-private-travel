import type { NextConfig } from "next";
import { placeholders } from "./content/placeholders";

// Kept in step with src/lib/indexing.ts; path aliases do not resolve here.
const domain = placeholders.DOMAIN.value;
const indexable = process.env.VERCEL_ENV === "production" && domain !== null;
const noindex = { key: "X-Robots-Tag", value: "noindex, nofollow" };

// Security headers on every response: trust signals for browsers and search engines.
const security = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  trailingSlash: false,
  poweredByHeader: false,

  async headers() {
    return [
      { source: "/:path*", headers: security },
      // The advisor portal is never indexed, whatever the environment (C9).
      { source: "/advisors/portal/:path*", headers: [noindex] },
      { source: "/ar/advisors/portal/:path*", headers: [noindex] },
      // The team's admin area and the API are never indexed, whatever the environment.
      { source: "/admin/:path*", headers: [noindex] },
      { source: "/admin", headers: [noindex] },
      { source: "/api/:path*", headers: [noindex] },
      // Previews, local builds and pre-domain builds are never indexed.
      ...(indexable ? [] : [{ source: "/:path*", headers: [noindex] }]),
    ];
  },

  async redirects() {
    // Family Services became Family Packages (10 Oct 2026): old addresses move permanently.
    const renamed = [
      { source: "/family-services", destination: "/family-packages", permanent: true },
      { source: "/ar/" + encodeURIComponent("خدمات-العائلات"), destination: "/ar/" + encodeURIComponent("باقات-العائلات"), permanent: true },
    ];
    if (!domain) return renamed;
    // Apex is canonical: www redirects permanently.
    return [
      ...renamed,
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${domain}` }],
        destination: `https://${domain}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
