import type { Metadata } from "next";
import Script from "next/script";
import FaqAccordion from "../../components/FaqAccordion";
import { FAQ_SNIPPETS } from "../../lib/data/seo-snippets";
import { getTranslations } from "../../lib/i18n";
import { generateFaqSchema } from "../../lib/seo/schemaUtils";
import { seoConfig } from "../../lib/seoConfig";
import { getServerLocale } from "../../lib/serverLocale";

import { generatePageAlternates } from "../../lib/seo/metadataUtils";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getServerLocale();
	const entry = seoConfig.faq;
	return {
		title: entry.title[locale],
		description: entry.description[locale],
		alternates: generatePageAlternates("faq", locale),
	};
}

export default async function FAQPage() {
	const locale = await getServerLocale();
	const t = getTranslations(locale);

	return (
		<div className="space-y-8 pb-16">
			<section className="bg-gradient-to-b from-white to-bg-light py-12">
				<div className="mx-auto max-w-6xl px-4">
					<h1 className="text-3xl font-bold text-brand-primary">
						{t.faq.title}
					</h1>
					<p className="mt-3 text-gray-700">{t.faq.intro}</p>
				</div>
			</section>
			<section className="mx-auto max-w-6xl px-4">
				<FaqAccordion
					items={FAQ_SNIPPETS.map((item) => ({
						question: item.question[locale],
						answer: item.answer[locale],
					}))}
				/>
			</section>

			<Script
				id="faq-page-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(generateFaqSchema(FAQ_SNIPPETS, locale)),
				}}
			/>
			<section className="mx-auto max-w-6xl px-4">
				<h2 className="text-xl font-semibold text-brand-primary">
					{t.faq.blogTitle}
				</h2>
				<div className="mt-4 grid gap-4 md:grid-cols-2">
					{t.faq.blog.map((item) => (
						<article
							key={item.title}
							className="rounded-2xl bg-white p-6 shadow-soft"
						>
							<h3 className="text-lg font-semibold text-brand-primary">
								{item.title}
							</h3>
							<p className="mt-2 text-sm text-gray-700">{item.description}</p>
						</article>
					))}
				</div>
			</section>
		</div>
	);
}
