import type { Metadata } from "next";

import CTASection from "../../components/CTASection";
import Hero from "../../components/Hero";
import USPs from "../../components/USPs";
import { getTranslations } from "../../lib/i18n";
import { getRoute } from "../../lib/routes";
import { seoConfig } from "../../lib/seoConfig";
import { getServerLocale } from "../../lib/serverLocale";
import { company } from "../../lib/siteConfig";

import BlogTeaserBox from "../../components/blog/BlogTeaserBox";
import { CATEGORY_NAMES } from "../../lib/blog/config";
import { getAllPosts } from "../../lib/blog/posts";

import { generatePageAlternates } from "../../lib/seo/metadataUtils";

// ✅ mapka
import HeroMapGraphic from "../../components/HeroMapGraphic";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getServerLocale();
	const entry = seoConfig.Vermietung;

	return {
		title: entry.title[locale],
		description: entry.description[locale],
		alternates: generatePageAlternates("rental", locale),
	};
}

export default async function RentalPage() {
	const locale = await getServerLocale();
	const t = getTranslations(locale);

	const posts = getAllPosts(locale);
	const teaserPost = posts.find((p) => p.cluster === "mobility");
	const categoryLabel = CATEGORY_NAMES[locale].mobility;

	return (
		<main>
			<Hero
				title={t.rental.title}
				subtitle={t.rental.intro}
				primaryCta={{
					label: t.rental.primary,
					href: getRoute("contact", locale),
				}}
				secondaryCta={{ label: t.rental.secondary, href: "tel:+436641261735" }}
				// ✅ zamiast obrazka
				rightGraphic={<HeroMapGraphic className="w-full h-auto" />}
			// backgroundImage zostawiamy opcjonalnie, ale nie jest potrzebny
			// backgroundImage="/images/hero-rental.jpg"
			/>

			<USPs items={t.rental.fleet} title={t.rental.fleetTitle} />

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

			<section className="py-12 bg-gray-50 text-center">
				<div className="container mx-auto px-4">
					<p className="text-gray-700 max-w-2xl mx-auto">{t.rental.note}</p>
				</div>
			</section>

			<CTASection
				title={t.rental.ctaTitle}
				description={t.rental.ctaDescription}
				primary={{ label: t.rental.primary, href: getRoute("contact", locale) }}
				secondary={{ label: t.rental.secondary, href: `tel:${company.phone}` }}
			/>
		</main>
	);
}
