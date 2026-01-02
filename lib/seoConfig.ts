import type { Locale } from "./i18n";

export type SeoEntry = {
	title: Record<Locale, string>;
	description: Record<Locale, string>;
};

export const seoConfig: Record<string, SeoEntry> = {
	home: {
		title: {
			de: "Abschleppdienst Sollenau 24/7 & Autohandel | Wiener Neustadt & A2",
			pl: "Laweta 24h Austria | Pomoc drogowa Sollenau i Wiener Neustadt",
			en: "24/7 Towing Service A2 | Used Cars near Wiener Neustadt",
		},
		description: {
			de: "Ihr Pannendienst in Niederösterreich (Sollenau, Wr. Neustadt). 24/7 Abschleppdienst A2, Unfallhilfe & Autohandel. Wir sprechen Deutsch, Polnisch & Englisch. Jetzt anrufen!",
			pl: "Autohandel & Abschleppdienst Pablo e.U. – całodobowa laweta, pomoc drogowa, skup i sprzedaż aut oraz wynajem w Sollenau. Obsługa PL/DE/EN.",
			en: "Autohandel & Abschleppdienst Pablo e.U. – 24/7 towing, roadside assistance, used cars and rentals from Sollenau covering the A2 South Autobahn and Wiener Neustadt.",
		},
	},
	abschleppdienst: {
		title: {
			de: "Abschleppdienst Sollenau 24/7 | Pannendienst Wiener Neustadt & A2",
			pl: "Pomoc drogowa Sollenau 24/7 | Pannendienst Wiener Neustadt & A2",
			en: "Towing Service Sollenau 24/7 | Roadside Assistance Wiener Neustadt & A2",
		},
		description: {
			de: "24/7 Notruf für Sollenau & Wr. Neustadt. Schneller Abschleppdienst A2, Pannenhilfe (Starthilfe, Reifenwechsel) & Ersatzwagen. Deutsch & Polnisch. Jetzt anrufen!",
			pl: "Alarm 24/7 dla Sollenau i Wiener Neustadt. Szybka pomoc drogowa na A2, uruchomienie auta, wymiana koła i auto zastępcze. Niemiecki i polski. Zadzwoń teraz!",
			en: "24/7 emergency hotline for Sollenau & Wiener Neustadt. Fast towing on the A2, roadside help (jump start, tire change) & replacement car. German & Polish. Call now!",
		},
	},
	autohandel: {
		title: {
			de: "Zertifizierte Gebrauchtwagen in Sollenau | Günstiger als in Wien",
			pl: "Certyfikowane auta używane w Sollenau | Taniej niż w Wiedniu",
			en: "Certified Used Cars in Sollenau | Cheaper than in Vienna",
		},
		description: {
			de: "Geprüfte Qualität: Gebrauchtwagen, Ankauf & Verkauf in Sollenau bei Wien. Finanzierung ohne Anzahlung, Garantie & Export-Service. Jetzt Probefahrt buchen!",
			pl: "Sprawdzona jakość: auta używane, skup i sprzedaż w Sollenau pod Wiedniem. Finansowanie bez wpłaty, gwarancja i eksport. Umów jazdę próbną!",
			en: "Verified quality: Used cars, buying & selling in Sollenau near Vienna. Financing with no down payment, warranty & export service. Book a test drive!",
		},
	},
	Vermietung: {
		title: {
			de: "Vermietung Pablo e.U.: Mietwagen & Immobilien in Baden & Wien",
			pl: "Wynajem Pablo e.U.: Auta i Nieruchomości w Baden i Wiedniu",
			en: "Rental Pablo e.U.: Car Rental & Real Estate in Baden & Vienna",
		},
		description: {
			de: "Alles aus einer Hand: Transporter mieten ohne Kreditkarte, Unfallersatzwagen kostenlos & Immobilien-Management (Sorglos-Paket).",
			pl: "Wszystko w jednym: wynajem busa bez karty kredytowej, płatne z OC sprawcy & zarządzanie najmem (pakiet beztroski).",
			en: "One-stop shop: Rent vans without credit card, free accident replacement cars & real estate management (carefree package).",
		},
	},
	transport: {
		title: {
			de: "Transport & Umzugsservice: Österreich & Europa (Polen-Linie)",
			pl: "Transport i Przeprowadzki: Austria & Europa (Linia Polska)",
			en: "Transport & Moving Service: Austria & Europe (Poland Line)",
		},
		description: {
			de: "Zuverlässige Umzüge in Wien/NÖ zum Pauschalpreis. Regelmäßige Transportlinie nach Polen (Möbel/Pakete) & Maschinentransport. Jetzt anfragen!",
			pl: "Niezawodne przeprowadzki Wiedeń/NÖ w stałej cenie. Regularna linia transportowa do Polski (meble/paczki) i transport maszyn. Zapytaj teraz!",
			en: "Reliable moves in Vienna/Lower Austria at a flat rate. Regular transport line to Poland (furniture/packages) & machine transport. Inquire now!",
		},
	},
	ueber_uns: {
		title: {
			de: "Über uns | Autohandel & Abschleppdienst Pablo e.U.",
			pl: "O nas | Autohandel & Abschleppdienst Pablo e.U.",
			en: "About us | Autohandel & Abschleppdienst Pablo e.U.",
		},
		description: {
			de: "Seit 2018 verbindet Pablo e.U. Gebrauchtwagenhandel mit Abschleppdienst, Mietwagen und mehrsprachiger Betreuung (DE/PL/EN) in Sollenau.",
			pl: "Od 2018 łączymy autohandel z lawetą, wynajmem i obsługą PL/DE/EN w Sollenau.",
			en: "Since 2018 we combine used car trading with towing, rentals and German/Polish/English support from Sollenau.",
		},
	},
	kontakt: {
		title: {
			de: "Kontakt & Anfahrt | Abschleppdienst Pablo Sollenau",
			pl: "Kontakt i dojazd | Pablo Sollenau",
			en: "Contact & directions | Pablo Sollenau",
		},
		description: {
			de: "24/7 Hotline +43 664 1261735, Standort Industriestraße 1, 2601 Sollenau. Mehrsprachige Beratung und schneller Notruf.",
			pl: "Całodobowa linia +43 664 1261735, adres Industriestraße 1, 2601 Sollenau. Obsługa PL/DE/EN.",
			en: "24/7 hotline +43 664 1261735, Industriestraße 1, 2601 Sollenau. German/Polish/English support and emergency response.",
		},
	},
	faq: {
		title: {
			de: "FAQ & Ratgeber | Abschleppdienst Pablo",
			pl: "FAQ i porady | Pablo Sollenau",
			en: "FAQ & advice | Pablo Sollenau",
		},
		description: {
			de: "Antworten zu Abschleppdienst, Gebrauchtwagen und Mietwagen in Sollenau und entlang der A2.",
			pl: "Odpowiedzi dotyczące lawety, autohandlu i wynajmu w Sollenau i przy A2.",
			en: "Answers about towing, used cars and rentals around Sollenau and the A2.",
		},
	},
	fahrzeuge: {
		title: {
			de: "Fahrzeuge | Gebrauchtwagen & Transporter Sollenau",
			pl: "Pojazdy używane i dostawcze – Sollenau",
			en: "Vehicles | Used cars and vans in Sollenau",
		},
		description: {
			de: "Aktuelle Gebrauchtwagen, Transporter und Anhänger bei Pablo e.U. Besichtigung nach Terminvereinbarung in Sollenau.",
			pl: "Aktualne auta używane, busy i przyczepy u Pablo e.U. Oglądanie po umówieniu wizyty w Sollenau.",
			en: "Current used cars, vans and trailers at Pablo e.U. Viewings by appointment in Sollenau.",
		},
	},
	impressum: {
		title: {
			de: "Impressum | Autohandel & Abschleppdienst Pablo",
			pl: "Impressum | Autohandel & Abschleppdienst Pablo",
			en: "Imprint | Autohandel & Abschleppdienst Pablo",
		},
		description: {
			de: "Rechtliche Angaben und Unternehmensdaten von Autohandel & Abschleppdienst Pablo e.U. in Sollenau.",
			pl: "Dane prawne i firmowe Autohandel & Abschleppdienst Pablo e.U. w Sollenau.",
			en: "Legal information for Autohandel & Abschleppdienst Pablo e.U. based in Sollenau.",
		},
	},
	datenschutz: {
		title: {
			de: "Datenschutz | Autohandel & Abschleppdienst Pablo",
			pl: "Ochrona danych | Autohandel & Abschleppdienst Pablo",
			en: "Privacy policy | Autohandel & Abschleppdienst Pablo",
		},
		description: {
			de: "Informationen zum Datenschutz, Cookies und eingesetzten Diensten auf pablo-auto.at.",
			pl: "Informacje o ochronie danych, cookies i usługach używanych na pablo-auto.at.",
			en: "Privacy information, cookies and services used on pablo-auto.at.",
		},
	},
};
