import type { Metadata } from "next";
import { seoConfig } from "../../lib/seoConfig";
import { getServerLocale } from "../../lib/serverLocale";

import { generatePageAlternates } from "../../lib/seo/metadataUtils";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getServerLocale();
	const entry = seoConfig.datenschutz;
	return {
		title: entry.title[locale],
		description: entry.description[locale],
		alternates: generatePageAlternates("privacy", locale),
	};
}

export default async function DatenschutzPage() {
	return (
		<div className="space-y-6 pb-16">
			<section className="bg-gradient-to-b from-white to-bg-light py-12">
				<div className="mx-auto max-w-5xl px-4">
					<h1 className="text-3xl font-bold text-brand-primary">
						Datenschutzerklärung
					</h1>
				</div>
			</section>
			<section className="mx-auto max-w-5xl px-4 space-y-4 text-gray-700 leading-relaxed">
				<p>
					Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die
					Ihr Webbrowser auf Ihrem Endgerät speichert. Einige Cookies sind
					technisch notwendig, während andere zur Analyse des Nutzerverhaltens
					dienen. Sie können Ihren Browser so einstellen, dass Sie über das
					Setzen von Cookies informiert werden und Cookies nur im Einzelfall
					erlauben oder die Annahme von Cookies ausschließen.
				</p>
				<p>
					<strong>Google Maps</strong>
					<br />
					Diese Website verwendet Google Maps zur Darstellung von
					Standortinformationen und zur Vereinfachung der Anfahrt zum
					Firmenstandort (Industriestraße 1, 2601 Sollenau). Durch die Nutzung
					von Google Maps können Informationen über die Nutzung dieser Website
					einschließlich Ihrer IP-Adresse an einen Server von Google in den USA
					übertragen werden. Bitte beachten Sie die Datenschutzbestimmungen von
					Google.
				</p>
				<p>
					<strong>Webanalyse (Google Analytics – falls implementiert)</strong>
					<br />
					Zur bedarfsgerechten Gestaltung und Optimierung nutzen wir
					gegebenenfalls Google Analytics. Dieser Dienst verwendet Cookies zur
					Analyse der Benutzung der Website. Die Funktion der IP-Anonymisierung
					ist aktiv, sodass Ihre IP-Adresse innerhalb der EU oder des EWR
					gekürzt wird.
				</p>
				<p>
					<strong>Ihre Rechte (Betroffenenrechte)</strong>
					<br />
					Ihnen stehen die Rechte auf Auskunft, Berichtigung, Löschung,
					Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn
					Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen das
					Datenschutzrecht verstößt, haben Sie das Recht auf Beschwerde bei der
					Aufsichtsbehörde (Österreichische Datenschutzbehörde).
				</p>
			</section>
		</div>
	);
}
