import type { NextConfig } from "next";
import { placeholders } from "./content/placeholders";

// Kept in step with src/lib/indexing.ts; path aliases do not resolve here.
const domain = placeholders.DOMAIN.value;
const indexable = process.env.VERCEL_ENV === "production" && domain !== null;
const noindex = { key: "X-Robots-Tag", value: "noindex, nofollow" };

const nextConfig: NextConfig = {
  devIndicators: false,
  trailingSlash: false,
  poweredByHeader: false,

  async headers() {
    return [
      // The advisor portal is never indexed, whatever the environment (C9).
      { source: "/advisors/portal/:path*", headers: [noindex] },
      // Previews, local builds and pre-domain builds are never indexed.
      ...(indexable ? [] : [{ source: "/:path*", headers: [noindex] }]),
    ];
  },

  async redirects() {
    if (!domain) return [];
    // Apex is canonical: www redirects permanently.
    return [
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
