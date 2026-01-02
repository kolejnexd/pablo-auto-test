import type { Metadata } from "next";
import CTASection from "../../components/CTASection";
import ServiceCard from "../../components/ServiceCard";
import { getTranslations } from "../../lib/i18n";
import { getRoute } from "../../lib/routes";
import { seoConfig } from "../../lib/seoConfig";
import { getServerLocale } from "../../lib/serverLocale";
import { company } from "../../lib/siteConfig";

import { generatePageAlternates } from "../../lib/seo/metadataUtils";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getServerLocale();
	const entry = seoConfig.transport;
	return {
		title: entry.title[locale],
		description: entry.description[locale],
		alternates: generatePageAlternates("transport", locale),
	};
}

export default async function TransportPage() {
	const locale = await getServerLocale();
	const t = getTranslations(locale);

	return (
		<div className="space-y-12 pb-16">
			<section className="bg-gradient-to-b from-white to-bg-light py-12">
				<div className="mx-auto max-w-6xl px-4">
					<h1 className="text-3xl font-bold text-brand-primary">
						{t.transport.title}
					</h1>
					<p className="mt-4 text-gray-700">{t.transport.intro}</p>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4">
				<h2 className="text-2xl font-semibold text-brand-primary">
					{t.transport.servicesTitle}
				</h2>
				<div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{t.transport.services.map((item) => (
						<ServiceCard
							key={item.title}
							title={item.title}
							description={item.description}
						/>
					))}
				</div>
			</section>

			<CTASection
				title={t.transport.ctaTitle}
				description={t.transport.ctaDescription}
				primary={{
					label: t.transport.primary,
					href: getRoute("contact", locale),
				}}
				secondary={{
					label: t.transport.secondary,
					href: `https://wa.me/${company.phone.replace(/[^0-9]/g, "")}`,
				}}
			/>
		</div>
	);
}
