import type { MetadataRoute } from "next";
import { getAllBlogSitemapEntries } from "../lib/blog/sitemap";
import { LOCATION_PAGES } from "../lib/data/location-pages";
import { type RouteKey, getRoute } from "../lib/routes";
import { getSitemapVehicles } from "../lib/wpClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pablo-auto.at";

type SitemapEntry = {
	url: string;
	lastModified?: string | Date;
	changeFrequency?:
		| "always"
		| "hourly"
		| "daily"
		| "weekly"
		| "monthly"
		| "yearly"
		| "never";
	priority?: number;
};

// Static routes configuration
const staticRoutes: {
	key: RouteKey;
	priority: number;
	changeFrequency: SitemapEntry["changeFrequency"];
}[] = [
	{ key: "home", priority: 1.0, changeFrequency: "weekly" },
	{ key: "towing", priority: 0.8, changeFrequency: "monthly" },
	{ key: "carSales", priority: 0.8, changeFrequency: "daily" },
	{ key: "rental", priority: 0.8, changeFrequency: "monthly" },
	{ key: "about", priority: 0.5, changeFrequency: "yearly" },
	{ key: "faq", priority: 0.8, changeFrequency: "monthly" },
	{ key: "contact", priority: 0.8, changeFrequency: "yearly" },
	{ key: "imprint", priority: 0.1, changeFrequency: "yearly" },
	{ key: "privacy", priority: 0.1, changeFrequency: "yearly" },
	{ key: "vehicles", priority: 0.8, changeFrequency: "daily" },
];

async function getVehicles() {
	return await getSitemapVehicles();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const vehicles = await getVehicles();
	// Use a Map to dedupe by URL
	const entriesMap = new Map<string, SitemapEntry>();

	const addEntry = (entry: SitemapEntry) => {
		// Normalize URL: remove trailing slash (unless it's root)
		const url =
			entry.url.endsWith("/") && entry.url.length > SITE_URL.length + 1
				? entry.url.slice(0, -1)
				: entry.url;

		if (!entriesMap.has(url)) {
			entriesMap.set(url, { ...entry, url });
		}
	};

	// 1. Static Pages
	for (const route of staticRoutes) {
		// DE
		addEntry({
			url: `${SITE_URL}${getRoute(route.key, "de") === "/" ? "" : getRoute(route.key, "de")}`,
			lastModified: new Date(),
			changeFrequency: route.changeFrequency,
			priority: route.priority,
		});
		// PL
		addEntry({
			url: `${SITE_URL}${getRoute(route.key, "pl")}`,
			lastModified: new Date(),
			changeFrequency: route.changeFrequency,
			priority: route.priority,
		});
		// EN
		addEntry({
			url: `${SITE_URL}${getRoute(route.key, "en")}`,
			lastModified: new Date(),
			changeFrequency: route.changeFrequency,
			priority: route.priority,
		});
	}

	// 2. Dynamic Vehicles
	for (const vehicle of vehicles) {
		const lastMod = new Date(vehicle.modified);
		// DE
		addEntry({
			url: `${SITE_URL}${getRoute("vehicles", "de")}/${vehicle.slug}`,
			lastModified: lastMod,
			changeFrequency: "weekly",
			priority: 0.9,
		});
		// PL
		addEntry({
			url: `${SITE_URL}${getRoute("vehicles", "pl")}/${vehicle.slug}`,
			lastModified: lastMod,
			changeFrequency: "weekly",
			priority: 0.9,
		});
		// EN
		addEntry({
			url: `${SITE_URL}${getRoute("vehicles", "en")}/${vehicle.slug}`,
			lastModified: lastMod,
			changeFrequency: "weekly",
			priority: 0.9,
		});
	}

	// 2.5 Blog (index + hubs + posts)
	const blogEntries = getAllBlogSitemapEntries(SITE_URL);
	blogEntries.forEach(addEntry);

	// 3. Location Pages
	for (const page of LOCATION_PAGES) {
		addEntry({
			url: `${SITE_URL}/${page.slug}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		});
	}

	// Sort deterministically by URL
	return Array.from(entriesMap.values()).sort((a, b) =>
		a.url.localeCompare(b.url),
	);
}
