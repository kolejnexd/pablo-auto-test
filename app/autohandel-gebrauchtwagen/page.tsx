import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";
import { Button } from "../../components/Button";
import CTASection from "../../components/CTASection";
import FAQ from "../../components/FAQ";
import Hero from "../../components/Hero";
import { Pagination } from "../../components/Pagination";
import ServiceCard from "../../components/ServiceCard";
import USPs from "../../components/USPs";
import VehicleCard from "../../components/VehicleCard";
import BlogTeaserBox from "../../components/blog/BlogTeaserBox";
import { CATEGORY_NAMES } from "../../lib/blog/config";
import { getAllPosts } from "../../lib/blog/posts";
import { getTranslations } from "../../lib/i18n";
import { getRoute } from "../../lib/routes";
import type { Locale } from "../../lib/routes";
import { generateSeoMetadata } from "../../lib/seo/metadataUtils";
import { seoConfig } from "../../lib/seoConfig";
import { getServerLocale } from "../../lib/serverLocale";
import { getVehicleListings } from "../../lib/wpClient";

import HeroMarketPanel from "../../components/HeroMarketPanel";
import { generatePageAlternates } from "../../lib/seo/metadataUtils";

export const revalidate = 3600; // 1 hour for inventory

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getServerLocale();
	const entry = seoConfig.autohandel;
	return {
		title: entry.title[locale],
		description: entry.description[locale],
		alternates: generatePageAlternates("carSales", locale),
	};
}

interface PageProps {
	searchParams: Promise<{ page?: string }>;
}

export default async function AutohandelPage(props: PageProps) {
	const searchParams = await props.searchParams;
	const locale = await getServerLocale();
	const t = getTranslations(locale);

	const currentPage = Number(searchParams?.page) || 1;
	const { vehicles, totalPages } = await getVehicleListings(currentPage, 24);

	const posts = getAllPosts(locale);
	const teaserPost = posts.find(
		(p) => p.cluster === "selling" || p.cluster === "buying",
	);
	const categoryLabel = teaserPost
		? CATEGORY_NAMES[locale][teaserPost.cluster]
		: "";

	return (
		<div className="space-y-12 pb-16">
			<Script
				id="autohandel-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "AutoDealer",
						name: "Pablo e.U. Autohandel",
						description: t.autohandel.intro,
						inLanguage:
							locale === "de" ? "de-AT" : locale === "pl" ? "pl-PL" : "en-GB",
						url: `${process.env.NEXT_PUBLIC_SITE_URL}${getRoute("carSales", locale)}`,
						priceRange: "$$",
					}),
				}}
			/>

			<Hero
				title={t.autohandel.title}
				subtitle={t.autohandel.intro}
				primaryCta={{
					label: t.autohandel.ctaTitle,
					href: getRoute("contact", locale),
				}}
				secondaryCta={{ label: t.autohandel.secondary, href: "#inventory" }}
				rightGraphic={<HeroMarketPanel labels={t.autohandel.marketPanel} />}
			/>

			<section className="mx-auto max-w-6xl px-4 grid gap-8 lg:grid-cols-2">
				<div className="rounded-2xl bg-white p-8 shadow-soft">
					<h2 className="text-2xl font-semibold text-brand-primary">
						{t.autohandel.buyTitle}
					</h2>
					<p className="mt-3 text-gray-700">{t.autohandel.buyDescription}</p>
					<div className="mt-4">
						<Button href={getRoute("contact", locale)} variant="primary">
							{t.autohandel.primary}
						</Button>
					</div>
				</div>
				<div className="rounded-2xl bg-bg-light p-8">
					<h2 className="text-2xl font-semibold text-brand-primary">
						{t.autohandel.sellTitle}
					</h2>
					<p className="mt-3 text-gray-700">{t.autohandel.sellDescription}</p>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4" id="inventory">
				<h2 className="text-2xl font-semibold text-brand-primary mb-6">
					{t.autohandel.inventoryTitle}
				</h2>

				{vehicles.length > 0 ? (
					<>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{vehicles.map((vehicle) => (
								<VehicleCard
									key={vehicle.slug}
									vehicle={vehicle}
									locale={locale}
									cta={t.common.detailsCta}
								/>
							))}
						</div>
						<div className="mt-8">
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								locale={locale}
							/>
						</div>
					</>
				) : (
					<div className="py-24 text-center rounded-3xl bg-gray-50 border border-gray-200 border-dashed">
						<p className="text-xl font-bold text-gray-900">
							{locale === "pl"
								? "Aktualnie brak pojazdów"
								: "Derzeit keine Fahrzeuge verfügbar"}
						</p>
					</div>
				)}
			</section>

			<section className="bg-bg-light py-12">
				<div className="mx-auto max-w-6xl px-4">
					<h2 className="text-2xl font-semibold text-brand-primary">
						{t.autohandel.benefitsTitle}
					</h2>
					<div className="mt-6 grid gap-6 md:grid-cols-2">
						{t.autohandel.benefits.map((item) => (
							<ServiceCard
								key={item.title}
								title={item.title}
								description={item.description}
							/>
						))}
					</div>
				</div>
			</section>

			{teaserPost && (
				<section className="py-12 bg-white">
					<div className="container mx-auto px-4">
						<BlogTeaserBox
							post={teaserPost}
							categoryLabel={categoryLabel}
							locale={locale}
						/>
					</div>
				</section>
			)}

			<CTASection
				title={t.autohandel.ctaTitle}
				description={t.autohandel.ctaDescription}
				primary={{
					label: t.autohandel.primary,
					href: getRoute("contact", locale),
				}}
				secondary={{ label: t.autohandel.secondary, href: "#inventory" }}
			/>

			<FAQ items={t.faq.items} title={t.faq.title} />
		</div>
	);
}
