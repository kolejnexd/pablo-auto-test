import type { Metadata } from "next";
import Script from "next/script";
import CTASection from "../../components/CTASection";
import { getTranslations } from "../../lib/i18n";
import { getRoute } from "../../lib/routes";
import { seoConfig } from "../../lib/seoConfig";
import { getServerLocale } from "../../lib/serverLocale";

import { generatePageAlternates } from "../../lib/seo/metadataUtils";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getServerLocale();
	const entry = seoConfig.ueber_uns;
	return {
		title: entry.title[locale],
		description: entry.description[locale],
		alternates: generatePageAlternates("about", locale),
	};
}

export default async function UeberUnsPage() {
	const locale = await getServerLocale();
	const t = getTranslations(locale);

	return (
		<div className="space-y-12 pb-16">
			<Script
				id="about-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "AboutPage",
						name: t.about.title,
						description: t.about.intro,
						inLanguage:
							locale === "de" ? "de-AT" : locale === "pl" ? "pl-PL" : "en-GB",
						mainEntity: {
							"@type": "Organization",
							name: "Pablo e.U.",
							foundingDate: "2018",
							founder: {
								"@type": "Person",
								name: "Paweł Bogusław Ferdynus",
							},
						},
					}),
				}}
			/>
			<section className="bg-gradient-to-b from-white to-bg-light py-12">
				<div className="mx-auto max-w-6xl px-4">
					<h1 className="text-3xl font-bold text-brand-primary">
						{t.about.title}
					</h1>
					<p className="mt-4 text-gray-700">{t.about.intro}</p>
				</div>
			</section>

			<section className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-3">
				<div className="rounded-2xl bg-white p-8 shadow-soft lg:col-span-2">
					<h2 className="text-2xl font-semibold text-brand-primary">
						{t.about.storyTitle}
					</h2>
					<p className="mt-3 text-gray-700">{t.about.story}</p>
					<h3 className="mt-6 text-xl font-semibold text-brand-primary">
						{t.about.secondTitle}
					</h3>
					<p className="mt-3 text-gray-700">{t.about.second}</p>
					<h3 className="mt-6 text-xl font-semibold text-brand-primary">
						{t.about.valuesTitle}
					</h3>
					<ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
						{t.about.values.map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
				<div className="rounded-2xl bg-bg-light p-8">
					<h3 className="text-xl font-semibold text-brand-primary">
						{t.about.whyTitle}
					</h3>
					<p className="mt-3 text-gray-700">{t.about.why}</p>
				</div>
			</section>

			<CTASection
				title={t.about.ctaTitle}
				description={t.about.ctaDescription}
				primary={{ label: t.about.primary, href: getRoute("contact", locale) }}
				secondary={{
					label: t.about.secondary,
					href: getRoute("vehicles", locale),
				}}
			/>
		</div>
	);
}
