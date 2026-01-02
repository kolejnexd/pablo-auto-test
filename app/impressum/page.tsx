import type { Metadata } from "next";
import { seoConfig } from "../../lib/seoConfig";
import { getServerLocale } from "../../lib/serverLocale";

import { generatePageAlternates } from "../../lib/seo/metadataUtils";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getServerLocale();
	const entry = seoConfig.impressum;
	return {
		title: entry.title[locale],
		description: entry.description[locale],
		alternates: generatePageAlternates("imprint", locale),
	};
}

export default async function ImpressumPage() {
	return (
		<div className="space-y-6 pb-16">
			<section className="bg-gradient-to-b from-white to-bg-light py-12">
				<div className="mx-auto max-w-5xl px-4">
					<h1 className="text-3xl font-bold text-brand-primary">Impressum</h1>
					<p className="mt-3 text-gray-700">
						Offenlegung gemäß § 25 MedienG und § 5 ECG
					</p>
				</div>
			</section>
			<section className="mx-auto max-w-5xl px-4 space-y-4 text-gray-700">
				<p>
					<strong>Diensteanbieter und Medieninhaber:</strong> Autohandel und
					Abschleppdienst Pablo e.U. – Kurzbezeichnung / Markenname: Autohandel
					& Abschleppdienst Pablo
				</p>
				<p>
					<strong>Rechtsform:</strong> Einzelunternehmer (e.U.)
					<br />
					<strong>Inhaber / Geschäftsführer:</strong> Paweł Bogusław Ferdynus
				</p>
				<p>
					<strong>Firmenanschrift / Standort:</strong> Industriestraße 1, 2601
					Sollenau, Österreich
				</p>
				<p>
					<strong>Kontakt:</strong> Telefon: +43 664 1261735 (Dieser Anschluss
					dient auch als 24/7-Notrufnummer) • E-Mail: office@pablo-auto.at •
					Website: pablo-auto.at
				</p>
				<p>
					<strong>Register- und Identifikationsdaten:</strong> Firmenbuchnummer
					(FN): 591679 t • UID-Nummer: ATU77674349 • GLN: 9110032719090
				</p>
				<p>
					<strong>Tätigkeitsbereich:</strong> Handel mit gebrauchten Fahrzeugen
					und Erbringung von Abschleppdiensten.
				</p>
			</section>
		</div>
	);
}
