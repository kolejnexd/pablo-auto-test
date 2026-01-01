import { withContentlayer } from "next-contentlayer2";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "panel.pablo-auto.at",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "pablo-auto.at",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.pablo-auto.at",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },

  async redirects() {
    return [
      // Legacy / Short DE Routes
      {
        source: "/abschleppdienst",
        destination: "/abschleppdienst-wien-niederoesterreich",
        permanent: true,
      },
      {
        source: "/autohandel",
        destination: "/autohandel-gebrauchtwagen",
        permanent: true,
      },
      {
        source: "/vermietung",
        destination: "/vermietung-service",
        permanent: true,
      },

      // Localized Direct Access Fixes (if accessing without prefix)
      {
        source: "/skup-aut-handel",
        destination: "/pl/skup-aut-handel",
        permanent: true,
      },
      {
        source: "/pomoc-drogowa",
        destination: "/pl/pomoc-drogowa",
        permanent: true,
      },
      {
        source: "/wynajem-service",
        destination: "/pl/wynajem-service",
        permanent: true,
      },
    ];
  },
};

export default withContentlayer(nextConfig);