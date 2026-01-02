import { build } from "velite";

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
			// Legacy Blog Redirects
			{ source: "/blog", destination: "/ratgeber", permanent: true },
			{
				source: "/blog/:slug",
				destination: "/ratgeber/:slug",
				permanent: true,
			},
			{ source: "/pl/blog", destination: "/pl/poradnik", permanent: true },
			{
				source: "/pl/blog/:slug",
				destination: "/pl/poradnik/:slug",
				permanent: true,
			},
			{ source: "/en/blog", destination: "/en/guides", permanent: true },
			{
				source: "/en/blog/:slug",
				destination: "/en/guides/:slug",
				permanent: true,
			},

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
				source: "/Vermietung",
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

	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value:
							"camera=(), microphone=(), geolocation=(), interest-cohort=()",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
				],
			},
		];
	},
	productionBrowserSourceMaps: false,
};

const isDev = process.argv.includes("dev");
const isBuild = process.argv.includes("build");

if (isDev || isBuild) {
	// Use await to ensure content is ready before Next.js builds/starts
	await build({ watch: isDev, clean: !isDev });
}

export default nextConfig;
