import { notFound } from "next/navigation";
import { cache } from "react";
import LocationPageTemplate from "../../components/templates/LocationPageTemplate";
import {
	LOCATION_PAGES,
	type LocationPageConfig,
} from "../../lib/data/location-pages";
import { company } from "../../lib/siteConfig";

export const revalidate = 86400; // 24 hours ISR
export const dynamicParams = true; // Allow generating new pages on demand if list changes

// 1. Cached Data Fetcher
// Deduplicates the lookup between generateMetadata and the Page component
const getLocationPageConfig = cache(
	(slug: string): LocationPageConfig | undefined => {
		return LOCATION_PAGES.find((p) => p.slug === slug);
	},
);

// 2. Generate Static Params for SSG
// Builds all declared pages at build time
export async function generateStaticParams() {
	return LOCATION_PAGES.map((page) => ({
		locationSlug: page.slug,
	}));
}

// 3. Metadata Generation
export async function generateMetadata(props: {
	params: Promise<{ locationSlug: string }>;
}) {
	const params = await props.params;
	const config = getLocationPageConfig(params.locationSlug);

	if (!config) {
		return {};
	}

	// Determine current locale (fallback to 'de' if undefined, but config.language is typed)
	const activeLocale = config.language;
	const canonicalUrl = `https://pablo-auto.at/${config.slug}`;

	return {
		alternates: {
			canonical: canonicalUrl,
		},
		title: config.seoTitle,
		description: config.seoDescription,
		openGraph: {
			title: config.seoTitle,
			description: config.seoDescription,
			url: canonicalUrl,
			siteName: company.name,
			locale:
				activeLocale === "de"
					? "de_AT"
					: activeLocale === "pl"
						? "pl_PL"
						: "en_US",
			images: [`${company.website}/opengraph-image.png`],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: config.seoTitle,
			description: config.seoDescription,
			images: [`${company.website}/opengraph-image.png`],
		},
	};
	/* 
       Overriding the return from helper to include specific canonical 
       because helper might generate generic ones based on locale routing 
       which this page bypasses (it's root level [slug]).
    */
}

// 4. Page Component
export default async function LocationPage(props: {
	params: Promise<{ locationSlug: string }>;
}) {
	const params = await props.params;
	const config = getLocationPageConfig(params.locationSlug);

	if (!config) {
		notFound();
	}

	return <LocationPageTemplate config={config} />;
}
