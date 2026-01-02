import Link from "next/link";
import type { ClusterKey } from "../../lib/blog/config";

interface CTAProps {
	category: ClusterKey;
	locale: "de" | "pl" | "en";
}

export default function BlogCTA({ category, locale }: CTAProps) {
	// Define logic based on category
	const isEmergency = category === "roadside";
	const isSelling = category === "selling";

	// Default to 'mobility' or general contact if no specific match

	if (isEmergency) {
		return (
			<div className="my-8 rounded-xl bg-red-50 p-6 text-center border border-red-100">
				<h3 className="text-xl font-bold text-red-700">Notfall auf der A2?</h3>
				<p className="mt-2 text-red-800">
					Wir sind 24/7 für Sie da. Rufen Sie uns jetzt an für schnelle
					Pannenhilfe in Sollenau & Umgebung.
				</p>
				<div className="mt-6">
					<a
						href="tel:+436641234567" // Replace with actual number from constants if available
						className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-700"
					>
						📞 Jetzt Abschleppdienst rufen 24/7
					</a>
				</div>
			</div>
		);
	}

	if (isSelling) {
		return (
			<div className="my-8 rounded-xl bg-slate-900 p-8 text-center text-white shadow-lg">
				<h3 className="text-2xl font-bold text-white">
					Wollen Sie Ihr Auto verkaufen?
				</h3>
				<p className="mt-2 text-slate-300">
					Wir kaufen Ihr Fahrzeug zu fairen Preisen – auch mit Defekten oder
					ohne Pickerl. Kostenlose Bewertung vor Ort.
				</p>
				<div className="mt-6">
					<Link
						href="/kontakt"
						className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-bold text-brand-primary transition-transform hover:scale-105"
					>
						Kostenlose Fahrzeugbewertung anfordern
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="my-8 rounded-xl bg-brand-primary p-8 text-center text-white shadow-lg">
			<h3 className="text-2xl font-bold text-white">
				Ihr Partner für Mobilität
			</h3>
			<p className="mt-2 text-blue-100">
				Von Autokauf bis Transport – Pablo e.U. ist Ihr verlässlicher
				Ansprechpartner in Niederösterreich.
			</p>
			<div className="mt-6">
				<Link
					href="/kontakt"
					className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-bold text-brand-primary transition-transform hover:scale-105"
				>
					Kontakt aufnehmen
				</Link>
			</div>
		</div>
	);
}
