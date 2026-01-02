import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pablo-auto.at";

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api/", "/private/", "/_next/"],
		},
		sitemap: `${siteUrl}/sitemap.xml`,
		host: siteUrl,
	};
}
