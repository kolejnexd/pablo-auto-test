import { notFound } from "next/navigation";
import CTASection from "../../../../components/CTASection";
import { getTranslations } from "../../../../lib/i18n";
import { getRoute } from "../../../../lib/routes";
import { getServerLocale } from "../../../../lib/serverLocale";

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	return {
		title: `${params.slug.replace(/-/g, " ").toUpperCase()} | Pablo e.U.`,
		description: `Informationen zu ${params.slug}`,
	};
}

export default async function ClusterContentPage(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const locale = await getServerLocale();
	const t = getTranslations(locale);
	const title = params.slug.replace(/-/g, " ");

	return (
		<div className="space-y-12 pb-16">
			<section className="bg-gradient-to-b from-white to-bg-light py-12">
				<div className="mx-auto max-w-4xl px-4">
					{/* Breadcrumb could go here */}
					<h1 className="text-3xl md:text-4xl font-bold text-brand-primary capitalize mb-6">
						{title}
					</h1>
					<div className="prose prose-lg text-gray-700">
						<p className="lead">
							Ausführliche Informationen zum Thema <strong>{title}</strong>.
						</p>
						<p>
							Dieser Bereich wird derzeit aktualisiert, um Ihnen fundierte
							Experteninhalte gemäß unserer Topical Authority Strategie zu
							bieten.
						</p>
						{/* Placeholder for specific content injection */}
					</div>
				</div>
			</section>

			<CTASection
				title={t.common.callNow}
				description={t.common.supporting}
				primary={{
					label: "Kontakt aufnehmen",
					href: getRoute("contact", locale),
				}}
				secondary={{ label: "Zur Übersicht", href: "/" }}
			/>
		</div>
	);
}
