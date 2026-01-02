import { type RouteKey, getRoute, routes } from "./routes";
import { company } from "./siteConfig";

export type Locale = "de" | "pl" | "en";

export const defaultLocale: Locale = "de";

export const locales: Locale[] = ["de", "pl", "en"];

export const localeCookieName = "pablo_locale";

export function normalizeLocale(code?: string | null): Locale | null {
	if (!code) return null;
	return locales.includes(code as Locale) ? (code as Locale) : null;
}

export function readLocaleCookie(rawCookie?: string | null): Locale | null {
	if (!rawCookie) return null;
	const match = rawCookie
		.split(";")
		.map((entry) => entry.trim())
		.find((entry) => entry.startsWith(`${localeCookieName}=`));
	if (!match) return null;
	const value = match.split("=")[1];
	return normalizeLocale(value);
}

export function detectLocaleFromPath(
	pathname: string,
	preferredLocale?: string | null,
): Locale {
	if (pathname.startsWith("/pl")) return "pl";
	if (pathname.startsWith("/en")) return "en";

	const stored = normalizeLocale(preferredLocale);
	if (stored) return stored;

	return defaultLocale;
}

function normalizePath(pathname: string): string {
	const normalized = pathname.replace(/^\/(pl|en)/, "");
	return normalized ? normalized : "/";
}

function withLocalePrefix(path: string, locale: Locale): string {
	const cleaned = path.startsWith("/") ? path : `/${path}`;
	if (locale === "de")
		return cleaned === "/pl" || cleaned === "/en" ? "/" : cleaned;
	return cleaned === "/" ? `/${locale}` : `/${locale}${cleaned}`;
}

export function getHomeHref(locale: Locale): string {
	return getRoute("home", locale);
}

export function getLocaleHref(
	pathname: string,
	targetLocale: Locale,
	preferredLocale?: string | null,
): string {
	const currentLocale = detectLocaleFromPath(pathname, preferredLocale);
	if (targetLocale === currentLocale) return pathname || "/";

	// Extract path suffix (path without the locale prefix)
	let pathSuffix = pathname;
	if (currentLocale !== "de" && pathname.startsWith(`/${currentLocale}`)) {
		pathSuffix = pathname.substring(currentLocale.length + 1);
	} else if (currentLocale === "de") {
		pathSuffix = pathname;
	}

	// Ensure we have a leading slash
	if (!pathSuffix.startsWith("/")) pathSuffix = `/${pathSuffix}`;

	const currentRoutes = routes[currentLocale];

	// 1. Exact Match Lookups
	for (const [key, value] of Object.entries(currentRoutes)) {
		if (value === pathSuffix) {
			return getRoute(key as RouteKey, targetLocale);
		}
	}

	// 2. Prefix Match (for dynamic paths like /pl/pojazdy/slug)
	// We prioritize longer prefixes to be safe?
	// But our routes are simple, so order in object might suffice or just check length.
	// Generally static pages don't have sub-pages except vehicles.

	for (const [key, value] of Object.entries(currentRoutes)) {
		if (value !== "/" && pathSuffix.startsWith(`${value}/`)) {
			// Found a parent route match
			const baseTarget = getRoute(key as RouteKey, targetLocale);
			const dynamicPart = pathSuffix.substring(value.length);
			return `${baseTarget}${dynamicPart}`;
		}
	}

	// 3. Fallback: naive replacement
	return withLocalePrefix(pathSuffix, targetLocale);
}

type ServiceCardContent = {
	title: string;
	description: string;
	href?: string;
};

type FaqItem = {
	question: string;
	answer: string;
};

type Testimonial = {
	quote: string;
	author: string;
};

export type Translations = {
	common: {
		badge: string;
		supporting: string;
		whatsapp: string;
		callNow: string;
		whatsappAction: string;
		detailsCta: string;
		readMore: string;
	};
	header: {
		brand: string;
		menu: { href: string; label: string }[];
		callCta: string;
		callShort: string;
	};
	footer: {
		contact: string;
		services: string;
		about: string;
		legal: string;
		cashless: string;
		copyright: string;
		serviceLinks: { href: string; label: string }[];
		aboutLinks: { href: string; label: string }[];
		legalLinks: { href: string; label: string }[];
		useful: string;
		usefulLinks: { href: string; label: string }[];
		ctaBar: {
			title: string;
			subtitle: string;
			callBtn: string;
			whatsappBtn: string;
		};
		trust: {
			rating: string;
			time: string;
			insured: string;
			invoice: string;
		};
		status: {
			towing: string;
			sales: string;
		};
		quickActions: {
			navigate: string;
			email: string;
			cars: string;
		};
		social: {
			reviews: string;
		};
	};
	home: {
		hero: {
			title: string;
			subtitle: string;
			badges: string;
			primaryCta: string;
			secondaryCta: string;
		};
		trustBar: {
			items: string[];
		};
		serviceCards: {
			towing: {
				title: string;
				description: string;
				features: string[];
				linkLabel: string;
			};
			sales: {
				title: string;
				description: string;
				features: string[];
				linkLabel: string;
			};
			rental: {
				title: string;
				description: string;
				features: string[];
				linkLabel: string;
			};
			transport: {
				title: string;
				description: string;
				features: string[];
				linkLabel: string;
			};
		};
		kpi: {
			items: { value: string; label: string }[];
		};
		protection: {
			title: string;
			intro: string;
			items: { title: string; description: string }[];
		};
		trade: {
			title: string;
			intro: string;
			items: { title: string; description: string }[];
		};
		whyUs: {
			title: string;
			items: { title: string; description: string }[];
		};
		faq: {
			title: string;
			items: FaqItem[];
		};
		blog: {
			title: string;
			subtitle: string;
			cta: string;
		};
	};
	towing: {
		title: string;
		intro: string;
		heroPrimary: string;
		heroSecondary: string;
		stepsTitle: string;
		steps: ServiceCardContent[];
		servicesTitle: string;
		services: ServiceCardContent[];
		whyUs: {
			title: string;
			items: { title: string; description: string }[];
		};
		faq: {
			title: string;
			items: FaqItem[];
		};
		note: string;
		ctaTitle: string;
		ctaDescription: string;
		primary: string;
		secondary: string;
	};
	autohandel: {
		title: string;
		intro: string;
		buyTitle: string;
		buyDescription: string;
		sellTitle: string;
		sellDescription: string;
		inventoryTitle: string;
		benefitsTitle: string;
		benefits: ServiceCardContent[];
		ctaTitle: string;
		ctaDescription: string;
		primary: string;
		secondary: string;
		marketPanel: {
			statusTitle: string;
			itemBuy: string;
			valueActive: string;
			itemSell: string;
			valueAvailable: string;
			itemDamaged: string;
			valueAccepted: string;
			itemMileage: string;
			valueOk: string;
			step1: string;
			step2: string;
			step3: string;
		};
	};
	rental: {
		title: string;
		intro: string;
		fleetTitle: string;
		fleet: ServiceCardContent[];
		note: string;
		ctaTitle: string;
		ctaDescription: string;
		primary: string;
		secondary: string;
	};
	transport: {
		title: string;
		intro: string;
		servicesTitle: string;
		services: ServiceCardContent[];
		ctaTitle: string;
		ctaDescription: string;
		primary: string;
		secondary: string;
	};
	about: {
		title: string;
		intro: string;
		storyTitle: string;
		story: string;
		secondTitle: string;
		second: string;
		valuesTitle: string;
		values: string[];
		whyTitle: string;
		why: string;
		ctaTitle: string;
		ctaDescription: string;
		primary: string;
		secondary: string;
	};
	contact: {
		title: string;
		intro: string;
		contactTitle: string;
		description: string;
		labels: {
			hotline: string;
			inquiries: string;
			whatsapp: string;
			address: string;
		};
		formTitle: string;
		formDescription: string;
	};
	faq: {
		title: string;
		intro: string;
		items: FaqItem[];
		blogTitle: string;
		blog: { title: string; description: string }[];
	};
	vehicles: {
		title: string;
		intro: string;
	};
	vehicleDetail: {
		breadcrumb: string;
		price: string;
		priceNet: string;
		priceGross: string;
		vat: string;
		offerNumber: string; // New
		category: string;
		make: string;
		model: string;
		year: string;
		firstRegistration: string;
		mileage: string;
		fuel: string;
		transmission: string;
		power: string;
		color: string;
		seats: string;
		doors: string;
		series: string;
		trimLine: string;
		driveType: string;
		energySource: string;
		consumption: string;
		co2: string;
		climateControl: string;
		parkingSensors: string;
		airbags: string;
		towingCapBraked: string;
		towingCapUnbraked: string;
		towingBraked: string; // New
		towingUnbraked: string; // New
		weightNet: string;
		weightTotal: string; // New
		payload: string; // New
		hsn: string;
		tsn: string;
		vin: string;
		vinHidden: string; // New
		equipment: string;
		// New Specs (ensure all match dictionaries)
		constructionYear: string;
		cubicCapacity: string;
		cylinders: string;
		fuelTank: string;
		envEnergy: string;
		envCo2: string;
		envCo2Class: string;
		pickerl: string;
		climatisation: string;
		parkAssists: string;
		condition: string;
		conditionDetail: string;
		available: string;
		sold: string;
		reserved: string;
		onRequest: string;
		negotiable: string;
		techSpecs: string;
		sectionEngine: string; // New
		sectionComfort: string; // New
		sectionWeights: string; // New
		gallery: string;
		video: string;
		description: string;
		location: string;
		interested: string;
		contact: string;
		unknown: string;
		view: string;
		combine: string;
	};
	notFound: {
		title: string;
		description: string;
		primary: string;
		secondary: string;
	};
	testimonials: {
		title: string;
		items: Testimonial[];
	};
	form: {
		name: string;
		phone: string;
		email: string;
		message: string;
		required: string;
		success: string;
		submit: string;
	};
};

const translations: Record<Locale, Translations> = {
	de: {
		common: {
			badge: "24/7 Service • Zweisprachig DE/PL",
			supporting:
				"Schnelle Hilfe auf der A2, im Bezirk Wiener Neustadt-Land und direkt in Sollenau. Fahrzeuge, Abschleppdienst und Mietwagen aus einer Hand.",
			whatsapp: "WhatsApp",
			callNow: "24/7 Notruf wählen",
			whatsappAction: "WhatsApp Standort senden",
			detailsCta: "Details ansehen →",
			readMore: "Mehr erfahren",
		},
		header: {
			brand: "Pablo e.U. Mobilität",
			menu: [
				{ href: getRoute("home", "de"), label: "Startseite" },
				{ href: getRoute("towing", "de"), label: "Abschleppdienst" },
				{ href: getRoute("carSales", "de"), label: "Autohandel" },
				{ href: getRoute("rental", "de"), label: "Vermietung" },
				{ href: getRoute("transport", "de"), label: "Transport" },
				{ href: getRoute("about", "de"), label: "Über uns" },
				{ href: getRoute("blog", "de"), label: "Ratgeber" },
				{ href: getRoute("contact", "de"), label: "Kontakt" },
			],
			callCta: "24/7 Notruf wählen",
			callShort: "24/7 Notruf",
		},
		footer: {
			contact: "Kontakt",
			services: "Leistungen",
			about: "Über Pablo",
			legal: "Rechtliches",
			cashless: "Bar- und Kartenzahlung möglich",
			copyright: "Alle Rechte vorbehalten.",
			serviceLinks: [
				{
					href: getRoute("towing", "de"),
					label: "Abschleppdienst & Pannenhilfe",
				},
				{
					href: getRoute("carSales", "de"),
					label: "Gebrauchtwagenhandel & Ankauf",
				},
				{ href: getRoute("rental", "de"), label: "Vermietung & Ersatzwagen" },
			],
			aboutLinks: [
				{ href: getRoute("about", "de"), label: "Über uns" },
				{ href: getRoute("vehicles", "de"), label: "Fahrzeuge" },
				{ href: getRoute("faq", "de"), label: "FAQ & Ratgeber" },
			],
			legalLinks: [
				{ href: getRoute("imprint", "de"), label: "Impressum" },
				{ href: getRoute("privacy", "de"), label: "Datenschutz" },
			],
			useful: "Ratgeber-Themen",
			usefulLinks: [
				{ href: "/blog/pannenhilfe", label: "Pannenhilfe & Sicherheit" },
				{ href: "/blog/auto-verkaufen", label: "Auto verkaufen Tipps" },
				{ href: "/blog/unfall-verkehrsrecht", label: "Unfall & Recht" },
				{ href: "/blog/elektromobilitaet", label: "E-Mobilität" },
			],
			ctaBar: {
				title: "Brauchen Sie 24/7 Hilfe?",
				subtitle: "Wir sind rund um die Uhr für Sie erreichbar – auch an Feiertagen.",
				callBtn: "Jetzt anrufen",
				whatsappBtn: "WhatsApp",
			},
			trust: {
				rating: "4.9/5 Google",
				time: "Anfahrt ~30 Min (A2)",
				insured: "Versicherter Transport",
				invoice: "Rechnung / Quittung",
			},
			status: {
				towing: "Pannenhilfe: 24/7",
				sales: "Autohandel: Termin nach Vereinbarung",
			},
			quickActions: {
				navigate: "Navigation starten",
				email: "Anfrage senden",
				cars: "Fahrzeuge ansehen",
			},
			social: {
				reviews: "Bewertungen",
			},
		},
		home: {
			hero: {
				title:
					"Pablo e.U. – Ihr Mobilitäts-Partner in Sollenau & Wien: Autohandel, Abschleppdienst & Transport",
				subtitle:
					"Als zertifizierter Einzelunternehmer (e.U.) mit Basis in Sollenau direkt an der Südautobahn A2, garantieren wir eine Reaktionszeit von 30 Minuten bis ins Zentrum von Wien. Unser Spezialfahrzeug transportiert auch Elektroautos (Tesla) sicher. Alles aus einer Hand: Abschleppdienst, Autohandel und Mietwagen.",
				badges: "🇦🇹 🇵🇱 🇬🇧 Wir sprechen Deutsch, Polnisch & Englisch",
				primaryCta: "Notruf: +43 664 1261735",
				secondaryCta: "Leistungen ansehen",
			},
			trustBar: {
				items: [
					"Zertifiziertes e.U.",
					"Standort Sollenau (A2)",
					"Vollkasko-versichert",
					"DE | PL | EN",
					"Seit 2018",
				],
			},
			serviceCards: {
				towing: {
					title: "Abschleppdienst & Pannenhilfe",
					description:
						"Schnelle Hilfe bei Unfall oder Panne. Wir sind in 30 Min. vor Ort (Bezirk Baden, Wr. Neustadt, A2).",
					features: [
						"24/7 Notruf-Bereitschaft",
						"Transport von Unfallwagen",
						"PKW & Transporter bis 3,5t",
					],
					linkLabel: "Abschleppdienst rufen",
				},
				sales: {
					title: "Gebrauchtwagenhandel",
					description:
						"Geprüfte Fahrzeuge zu fairen Preisen. Ankauf & Verkauf mit transparenter Abwicklung.",
					features: [
						"Gültiges §57a Pickerl",
						"Gewährleistung",
						"Finanzierung möglich",
					],
					linkLabel: "Fahrzeuge ansehen",
				},
				rental: {
					title: "Mietwagen & Ersatzwagen",
					description:
						"Bleiben Sie mobil, auch wenn Ihr Auto in der Werkstatt steht. Mietwagen ohne Kreditkarte.",
					features: [
						"PKW & Transporter",
						"Tages- & Langzeitmiete",
						"Keine Kreditkarte nötig",
					],
					linkLabel: "Mietwagen buchen",
				},
				transport: {
					title: "Transport & Logistik",
					description:
						"Zuverlässige Transporte (AT-PL) und Umzüge. Wir bringen Ihre Fracht sicher ans Ziel.",
					features: [
						"Österreich ↔ Polen",
						"Möbel- & Umzugsservice",
						"Versicherter Transport",
					],
					linkLabel: "Transport anfragen",
				},
			},
			kpi: {
				items: [
					{ value: "30 Min", label: "Ankunftszeit A2/Wien" },
					{ value: "Fixpreis", label: "Faire Konditionen" },
					{ value: "Seit 2018", label: "Erfahrung & Vertrauen" },
				],
			},
			protection: {
				title: "Ihr Pannendienst für den Bezirk Wiener Neustadt-Land & A2",
				intro:
					"Pannen passieren unerwartet. Wir decken die S1 Wiener Außenring Schnellstraße und den Bezirk Baden ab. Von der Abfahrt Leobersdorf oder Wöllersdorf sind wir in Minuten vor Ort.",
				items: [
					{
						title: "Abschleppdienst",
						description:
							"Sicherer Transport für PKW, Transporter und Unfallwagen.",
					},
					{
						title: "Pannenhilfe vor Ort",
						description:
							"Starthilfe, Reifenwechsel oder Treibstoffmangel (Hilfe vor Ort).",
					},
					{
						title: "Fahrzeugbergung",
						description:
							"Professionelle Bergung nach Unfällen (auch aus Gräben).",
					},
					{
						title: "Europaweiter Rückholdienst",
						description: "Wir bringen Sie und Ihr Fahrzeug nach Hause.",
					},
				],
			},
			trade: {
				title: "Seriöser Autohandel & Autoankauf in Niederösterreich",
				intro:
					"Jedes Fahrzeug wird mit gültigem §57a Pickerl und transparenter carLOG-Historie verkauft. Wir bieten Gewährleistung und faire Fixpreise. Ankauf auch von Unfallwagen.",
				items: [
					{
						title: "Verkauf",
						description:
							"Geprüfte Gebrauchtwagen (PKW, Nutzfahrzeuge), Transporter & Anhänger. Besichtigung in Sollenau (Industriestraße 1) jederzeit möglich (nach Terminvereinbarung).",
					},
					{
						title: "Autoankauf (Sofort Bargeld)",
						description:
							"Wir kaufen PKW aller Marken – auch ohne Pickerl, mit Motorschaden oder Unfallwagen. Schnelle Abwicklung und Barzahlung.",
					},
				],
			},
			whyUs: {
				title: "Warum Pablo e.U. Ihr bester Partner in Sollenau ist",
				items: [
					{
						title: "Erreichbarkeit",
						description:
							"Echter 24h Notdienst – bei uns geht immer jemand ans Telefon, auch an Feiertagen.",
					},
					{
						title: "Mehrsprachig (DE/PL/EN)",
						description:
							"Keine Missverständnisse bei Pannen. Ideal für internationale Transporteure auf der A2.",
					},
					{
						title: "Alles aus einer Hand",
						description:
							"Abschleppen, Ersatzwagen (Mietwagen) und Ankauf/Verkauf.",
					},
				],
			},
			faq: {
				title: "Häufig gestellte Fragen (FAQ)",
				items: [
					{
						question: "Wie schnell kommt Ihr Abschleppdienst zur Unfallstelle?",
						answer:
							"Wir priorisieren Notfälle in Sollenau und entlang der A2. Rufen Sie uns direkt unter +43 664 1261735 an, um Wartezeit und Standort zu bestätigen.",
					},
					{
						question:
							"Kaufen Sie auch Fahrzeuge mit Unfallschäden oder Motorschaden an?",
						answer:
							"Ja, wir bewerten Unfallfahrzeuge, Fahrzeuge mit höherer Laufleistung oder ohne gültiges Pickerl und bieten faire Konditionen.",
					},
					{
						question:
							"Kann ich den Abschleppdienst direkt vor Ort mit Karte bezahlen?",
						answer:
							"Ja, wir akzeptieren Barzahlung sowie gängige Debit- und Kreditkarten, direkt nach dem Einsatz.",
					},
				],
			},
			blog: {
				title: "Aktuelles aus unserem Ratgeber",
				subtitle:
					"Tipps, Tricks und Neuigkeiten rund um Auto, Panne und Verkehrssicherheit.",
				cta: "Alle Artikel lesen",
			},
		},
		towing: {
			title:
				"Abschleppdienst 24/7 Sollenau & Wiener Neustadt: Ihr Notruf-Partner",
			intro:
				"Schnelle Hilfe auf der A2 Südautobahn und im gesamten Bezirk Wiener Neustadt-Land. Wir sind in der Regel innerhalb von Minuten direkt bei Ihnen vor Ort.",
			heroPrimary: "24/7 Notruf: +43 664 1261735",
			heroSecondary: "Standort via WhatsApp senden",
			stepsTitle: "So funktioniert unser 24h-Notruf-Prozess",
			steps: [
				{
					title: "1. Anruf",
					description: "Wählen Sie sofort +43 664 1261735.",
				},
				{
					title: "2. Standort",
					description:
						"Teilen Sie uns Ihren Standort via WhatsApp mit, damit wir Sie auf der A2 oder in den umliegenden Gemeinden sofort finden.",
				},
				{
					title: "3. Sicherung & Bergung",
					description:
						"Wir sichern die Unfallstelle und transportieren Ihr Fahrzeug sicher ab.",
				},
			],
			servicesTitle: "Unsere 24/7 Einsatzbereiche: Mehr als nur Abschleppen",
			services: [
				{
					title: "Pannendienst & Soforthilfe",
					description:
						"Starthilfe, Reifenwechsel oder provisorische Maßnahmen direkt am Einsatzort – oft ist keine Abschleppung nötig.",
				},
				{
					title: "Fahrzeugabschleppung & Bergung",
					description:
						"Sicherer Abtransport für PKW, Transporter und Unfallwagen zu Ihrer Wunschwerkstatt oder unserem Standort in Sollenau.",
				},
				{
					title: "Ersatzwagen & Mobilität",
					description:
						"Damit Sie mobil bleiben: Wir stellen bei Verfügbarkeit direkt einen Ersatzwagen zur Verfügung.",
				},
			],
			whyUs: {
				title: "Warum Pablo e.U. die beste Wahl in Niederösterreich ist",
				items: [
					{
						title: "24/7 Verfügbarkeit",
						description:
							"Wir sind 365 Tage im Jahr erreichbar – auch an Wochenenden und Feiertagen.",
					},
					{
						title: "Zweisprachige Betreuung (DE/PL)",
						description:
							"Wir bieten vollständige Beratung in Deutsch und Polnisch, ideal für lokale Kunden und die internationale Community.",
					},
					{
						title: "Flexible Zahlung",
						description:
							"Bezahlen Sie unkompliziert in bar oder per Karte direkt vor Ort nach dem Einsatz.",
					},
					{
						title: "Lokale Expertise",
						description:
							"Unser Standort in Sollenau ermöglicht schnellste Reaktionszeiten in Wr. Neustadt, Baden und Neunkirchen.",
					},
				],
			},
			faq: {
				title: "Häufig gestellte Fragen (FAQ)",
				items: [
					{
						question: "Wie schnell ist der Abschleppdienst Pablo vor Ort?",
						answer:
							"Wir priorisieren Notrufe auf der A2 und im Raum Wiener Neustadt. Durch unseren strategischen Standort in Sollenau sind wir bestrebt, innerhalb kürzester Zeit bei Ihnen zu sein.",
					},
					{
						question:
							"Was kostet ein Abschleppdienst in der Nacht oder am Feiertag?",
						answer:
							"Die Kosten hängen von der Einsatzzeit und der Distanz ab. Wir setzen auf faire und nachvollziehbare Konditionen. Rufen Sie uns für eine sofortige Preisindikation direkt an.",
					},
					{
						question: "Kann ich direkt vor Ort mit Kreditkarte bezahlen?",
						answer:
							"Ja, zur Vereinfachung akzeptieren wir Barzahlung sowie gängige Debit- und Kreditkarten direkt am Einsatzort.",
					},
				],
			},
			note: "Die Kosten richten sich nach Einsatzzeit und Distanz. Rufen Sie für eine sofortige Preisindikation an. Bar- und Kartenzahlung möglich.",
			ctaTitle: "24/7 Notruf – wir sind sofort für Sie da",
			ctaDescription:
				"Bei akuten Pannen oder Unfällen: +43 664 1261735. Mehrsprachige Betreuung (DE/PL/EN), schnelle Anfahrt im Raum Sollenau, Wiener Neustadt und entlang der A2.",
			primary: "Jetzt Notruf wählen",
			secondary: "WhatsApp Standort senden",
		},
		autohandel: {
			title:
				"Zertifizierte Gebrauchtwagen in Sollenau: Geprüfte Qualität günstiger als in Wien",
			intro:
				"Sie suchen einen zuverlässigen Gebrauchtwagen oder möchten Ihr altes Fahrzeug verkaufen? Wir kaufen PKW und Nutzfahrzeuge in jedem Zustand an – auch Unfallwagen, Fahrzeuge mit höherer Laufleistung oder ohne gültiges Pickerl.",
			buyTitle: "Ankauf – unkompliziert und transparent",
			buyDescription:
				"Wir bewerten Ihr Fahrzeug individuell und bieten faire Konditionen. Ankauf von Gebrauchtwagen, Fahrzeugen mit hoher Laufleistung sowie Unfall- und beschädigten Fahrzeugen. Auszahlung in Bar oder per Karte möglich.",
			sellTitle: "Verkauf – Vielfalt am Standort Sollenau",
			sellDescription:
				"Wir bieten geprüfte Gebrauchtfahrzeuge: PKW, Transporter, Anhänger sowie Mopeds und Motorräder. Inserate finden Sie auf willhaben.at und mobile.de, Besichtigung nach Terminvereinbarung in der Industriestraße 1.",
			inventoryTitle: "Auszug aus unserem Bestand",
			benefitsTitle: "Ihre Vorteile",
			benefits: [
				{
					title: "Schnelle Bewertung",
					description:
						"Direkte Einschätzung und Angebot für Ihr Fahrzeug – auch bei Unfallschäden.",
				},
				{
					title: "Faire Abwicklung",
					description:
						"Transparente Konditionen, Auszahlung in Bar oder per Karte vor Ort.",
				},
				{
					title: "Abholung möglich",
					description:
						"Nach Absprache holen wir Ihr Fahrzeug ab – flexibel im Bezirk Wiener Neustadt-Land.",
				},
				{
					title: "Mehrsprachige Beratung",
					description:
						"Beratung auf Deutsch, Polnisch oder Englisch, je nach Wunsch.",
				},
			],
			ctaTitle:
				"Vereinbaren Sie einen Termin oder fordern Sie ein Ankaufangebot an",
			ctaDescription:
				"Wir beraten Sie gerne auf Deutsch oder Polnisch. Schreiben Sie uns oder rufen Sie an, um Ihr Fahrzeug zu verkaufen oder einen Besichtigungstermin zu vereinbaren.",
			primary: "Anfrage senden",
			secondary: "Aktuelle Fahrzeuge ansehen",
			marketPanel: {
				statusTitle: "Aktueller Marktstatus",
				itemBuy: "Autoankauf",
				valueActive: "AKTIV",
				itemSell: "Verkauf",
				valueAvailable: "Fahrzeuge verfügbar",
				itemDamaged: "Unfallwagen",
				valueAccepted: "wir kaufen an",
				itemMileage: "Hohe Laufleistung",
				valueOk: "KEIN PROBLEM",
				step1: "1. Bewertung",
				step2: "2. Vertrag",
				step3: "3. Bezahlung/Abholung",
			},
		},
		rental: {
			title:
				"Mietwagen Pablo e.U.: Mietwagen & Immobilien-Management in Baden & Wien",
			intro:
				"Ihr Fahrzeug steht in der Werkstatt oder Sie benötigen kurzfristig einen Transporter? Wir sorgen für nahtlose Mobilität – oft kombiniert mit Abschleppdienst und Bereitstellung eines Ersatzwagens.",
			fleetTitle: "Unsere Mietflotte",
			fleet: [
				{
					title: "PKW",
					description:
						"Verschiedene Klassen für den täglichen Bedarf – flexibel je nach Verfügbarkeit.",
				},
				{
					title: "Leichte Nutzfahrzeuge",
					description:
						"Transporter und Kastenwagen ideal für Umzüge, Handwerk oder kurzfristige Projekte.",
				},
				{
					title: "Anhänger",
					description:
						"Verschiedene Modelle für Transportaufgaben, nach Absprache verfügbar.",
				},
			],
			note: "Kurzzeitmiete (Tage/Wochen) und längere Mietzeiträume nach Absprache. Ideal als Ersatzwagen nach Panne oder Unfall.",
			ctaTitle: "Sichern Sie Ihre Mobilität",
			ctaDescription:
				"Kontaktieren Sie uns für eine Verfügbarkeitsanfrage und ein individuelles Mietangebot für PKW, Transporter oder Ersatzwagen.",
			primary: "Verfügbarkeit anfragen",
			secondary: "24/7 Notruf",
		},
		transport: {
			title:
				"Transport & Umzugsservice: Zuverlässig in Österreich & Europa (Polen-Linie)",
			intro:
				"Professionelle Umzüge, Maschinentransporte und regelmäßige Linienverkehre zwischen Österreich und Polen. Wir bieten Pauschalpreise ohne versteckte Kosten.",
			servicesTitle: "Unsere Transport-Lösungen",
			services: [
				{
					title: "Umzug Wien & NÖ",
					description:
						"Stressfreie Privatumzüge zum Fixpreis – keine Etagenzuschläge.",
				},
				{
					title: "Polen-Linie",
					description:
						"Regelmäßiger Transport von Möbeln, Paketen und Paletten (AT ↔ PL).",
				},
				{
					title: "Maschinentransport",
					description: "Spezialtransport für Baumaschinen und Landtechnik.",
				},
				{
					title: "Logistik & Lager",
					description:
						"Palettenversand B2B und Self-Storage Möglichkeiten in Sollenau.",
				},
			],
			ctaTitle: "Planen Sie Ihren Transport",
			ctaDescription:
				"Holen Sie sich jetzt Ihr unverbindliches Angebot für Umzug oder Transport.",
			primary: "Angebot anfordern",
			secondary: "WhatsApp Anfrage",
		},
		about: {
			title: "Über uns – Autohandel & Abschleppdienst Pablo e.U.",
			intro:
				"Seit 2018 verbindet Inhaber Paweł Bogusław Ferdynus Gebrauchtwagenhandel mit Abschleppdienst, Pannenhilfe und Mietwagen. Als Einzelunternehmen setzen wir auf persönliche Zuverlässigkeit, zweisprachige Betreuung und lokale Expertise in Sollenau und Umgebung.",
			storyTitle: "Die Geschichte von Pablo e.U.",
			story:
				"Gestartet als regionaler Autohandel mit Fokus auf faire Gebrauchtwagen, wurde der Abschleppdienst schnell zum zweiten Standbein. Heute bieten wir eine einzigartige Kombination aus Handel, Notdienst und Mietwagen – alles aus einer Hand.",
			secondTitle: "Mehr als nur ein Autohändler",
			second:
				"Wir organisieren Abschleppungen, stellen Ersatzwagen bereit und beraten beim Kauf oder Verkauf von Fahrzeugen. Ob PKW, Transporter, Anhänger oder Zweiräder – wir sorgen dafür, dass Sie mobil bleiben.",
			valuesTitle: "Unsere Werte",
			values: [
				"Verfügbarkeit 24/7 – wir sind dann da, wenn andere schlafen.",
				"Sprache ohne Barrieren – vollständige Betreuung auf Deutsch und Polnisch.",
				"Flexible Zahlungswege – Bar oder Karte direkt nach dem Einsatz.",
				"Regionale Verankerung – Standort Sollenau, Einsätze im Bezirk Wiener Neustadt-Land.",
			],
			whyTitle: "Warum wir?",
			why: "Persönlicher Ansprechpartner, schnelle Reaktionszeiten, transparente Konditionen und ehrlicher Service – das macht uns aus.",
			ctaTitle: "Lernen Sie uns kennen",
			ctaDescription:
				"Wir freuen uns auf Ihre Anfrage – ob Notruf, Fahrzeugkauf oder Mietwagen.",
			primary: "Kontakt aufnehmen",
			secondary: "Fahrzeuge ansehen",
		},
		contact: {
			title: "Kontakt & Anfahrt – Autohandel & Abschleppdienst Pablo Sollenau",
			intro:
				"Unser Standort in Sollenau ist optimal angebunden. Über die B17 erreichen Sie uns direkt, von der A2 nutzen Sie die Abfahrt Wiener Neustadt Nord oder Wöllersdorf. Wir sind nahe dem Bahnhof, ideal für Abholung oder Kauf eines Fahrzeugs.",
			contactTitle: "Kontaktieren Sie uns",
			description:
				"Egal ob Notruf, Beratung zum Fahrzeugkauf oder Ankauf – wir sind für Sie da. Betreuung auf Deutsch und Polnisch möglich.",
			labels: {
				hotline: "24/7 Notruf (DE & PL)",
				inquiries: "Anfragen (Kauf/Verkauf)",
				whatsapp: "WhatsApp",
				address: "Adresse",
			},
			formTitle: "Nachricht an uns senden",
			formDescription:
				"Haben Sie Fragen zu einem Gebrauchtwagen, zum Ankauf oder benötigen Sie einen Abschleppdienst? Schreiben Sie uns!",
		},
		faq: {
			title: "FAQ & Ratgeber",
			intro:
				"Antworten auf die häufigsten Fragen zu Abschleppdienst, Autohandel und Mietwagen.",
			items: [
				{
					question: "Wie schnell kommt Ihr Abschleppdienst zur Unfallstelle?",
					answer:
						"Wir priorisieren Einsätze in Sollenau, Wiener Neustadt und entlang der A2. Rufen Sie uns unter +43 664 1261735 an, um Details und Ankunftszeit abzustimmen.",
				},
				{
					question:
						"Kaufen Sie auch Fahrzeuge mit Unfallschäden oder Motorschaden an?",
					answer:
						"Ja, wir kaufen Fahrzeuge mit hoher Laufleistung, Unfallwagen oder Modelle ohne gültiges Pickerl. Transparente Bewertung und Auszahlung in Bar oder Karte.",
				},
				{
					question: "Kann ich den Abschleppdienst mit Karte bezahlen?",
					answer:
						"Ja, wir akzeptieren Barzahlung sowie gängige Debit- und Kreditkarten direkt nach dem Einsatz.",
				},
				{
					question: "Bieten Sie Ersatzwagen an?",
					answer:
						"Ja, wir stellen Ersatzwagen bereit, sofern verfügbar, häufig in Kombination mit unserem Abschleppdienst.",
				},
			],
			blogTitle: "Blog / Ratgeber (Placeholder)",
			blog: [
				{
					title: "So sichern Sie den Unfallort richtig",
					description:
						"Checkliste für die ersten Minuten nach einer Panne auf der A2 und im Bezirk Wiener Neustadt-Land.",
				},
				{
					title: "Ankauf beschädigter Fahrzeuge",
					description:
						"Wann lohnt sich der Verkauf eines Unfallwagens? Tipps zur fairen Bewertung.",
				},
			],
		},
		vehicles: {
			title: "Fahrzeuge – Gebrauchtwagen, Transporter & Anhänger",
			intro:
				"Entdecken Sie unsere aktuellen Fahrzeuge. Alle Inserate sind nach Terminvereinbarung in Sollenau besichtigbar.",
		},
		vehicleDetail: {
			breadcrumb: "Gebrauchtwagen",
			price: "Preis",
			priceNet: "Preis (Netto)",
			priceGross: "Preis (Brutto)",
			vat: "MwSt.",
			offerNumber: "Angebots-Nr.",
			category: "Kategorie",
			make: "Marke",
			model: "Modell",
			year: "Baujahr",
			firstRegistration: "Erstzulassung",
			mileage: "Kilometerstand",
			fuel: "Kraftstoff",
			transmission: "Getriebe",
			power: "Leistung",
			color: "Farbe",
			seats: "Sitzplätze",
			doors: "Türen",
			series: "Baureihe",
			trimLine: "Ausstattungslinie",
			driveType: "Antriebsart",
			energySource: "Energieträger",
			consumption: "Verbrauch",
			co2: "CO₂-Emissionen",
			climateControl: "Klimatisierung",
			parkingSensors: "Einparkhilfe",
			airbags: "Airbags",
			towingCapBraked: "Anhängelast (gebremst)",
			towingCapUnbraked: "Anhängelast (ungebremst)",
			towingBraked: "Anhängelast (gebremst)", // mapped
			towingUnbraked: "Anhängelast (ungebremst)", // mapped
			weightNet: "Eigengewicht",
			weightTotal: "Zul. Gesamtgewicht",
			payload: "Nutzlast",
			hsn: "HSN",
			tsn: "TSN",
			vin: "Fahrgestellnummer (VIN)",
			vinHidden: "(AUF ANFRAGE)", // DE
			equipment: "Ausstattung",
			// New Specs
			constructionYear: "Baujahr",
			cubicCapacity: "Hubraum",
			cylinders: "Zylinder",
			fuelTank: "Tankinhalt",
			envEnergy: "Energieverbrauch",
			envCo2: "CO2-Emissionen",
			envCo2Class: "CO2-Klasse",
			pickerl: "Pickerl",
			climatisation: "Klimatisierung",
			parkAssists: "Einparkhilfe",

			condition: "Zustand",
			conditionDetail: "Zustandsbericht",
			available: "Verfügbar",
			sold: "Verkauft",
			reserved: "Reserviert",
			onRequest: "Auf Anfrage",
			negotiable: "Verhandelbar",
			techSpecs: "Technische Daten",
			sectionEngine: "Motor & Umwelt",
			sectionComfort: "Ausstattung & Komfort",
			sectionWeights: "Gewicht & Last",
			gallery: "Galerie",
			video: "Video-Präsentation",
			description: "Fahrzeugbeschreibung",
			location: "Standort",
			interested: "Interessiert?",
			contact: "Kontakt aufnehmen",
			unknown: "k.A.",
			view: "Besichtigung vereinbaren",
			combine: "Pannendienst kombinieren",
		},
		notFound: {
			title:
				"Oje! (Ups!) Diese Seite existiert nicht mehr oder Ihr Traumwagen wurde bereits verkauft.",
			description:
				"Es sieht ganz danach aus, als wären Sie auf Abwege geraten. Kein Grund zur Sorge – eine Laweta ist nicht notwendig, um von hier wegzukommen! Vielleicht wurde der gesuchte Gebrauchtwagen bereits verkauft oder die Adresse war falsch.",
			primary: "Zur Startseite",
			secondary: "Aktuelle Fahrzeuge ansehen",
		},
		testimonials: {
			title: "Stimmen unserer Kund:innen",
			items: [
				{
					quote:
						"Schnelle Hilfe auf der A2 nach einer Panne – innerhalb von Minuten vor Ort und gleich einen Ersatzwagen organisiert.",
					author: "Kundin aus Wiener Neustadt",
				},
				{
					quote:
						"Professioneller Ankauf unseres Transporters, faire Bewertung und sofortige Auszahlung vor Ort.",
					author: "Lokaler Handwerksbetrieb",
				},
			],
		},
		form: {
			name: "Ihr Name (Pflichtfeld)",
			phone: "Telefonnummer (Rückruf)",
			email: "E-Mail-Adresse",
			message: "Ihre Nachricht / Details zur Anfrage",
			required: "Bitte füllen Sie alle Pflichtfelder aus.",
			success:
				"Vielen Dank! Ihre Nachricht wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen. WICHTIG: Bei akuten Pannen oder Unfällen wählen Sie bitte direkt unsere Notrufnummer: +43 664 1261735.",
			submit: "Nachricht senden",
		},
	},
	pl: {
		common: {
			badge: "24/7 Serwis • Deutsch / Polski",
			supporting:
				"Szybka pomoc na autostradzie A2, w powiecie Wiener Neustadt-Land i w Sollenau. Pojazdy, laweta i wynajem w jednym miejscu.",
			whatsapp: "WhatsApp",
			callNow: "Zadzwoń 24/7",
			whatsappAction: "Wyślij lokalizację WhatsApp",
			detailsCta: "Zobacz szczegóły →",
			readMore: "Dowiedz się więcej",
		},
		header: {
			brand: "Pablo e.U. Mobilność",
			menu: [
				{ href: getRoute("home", "pl"), label: "Start" },
				{ href: getRoute("towing", "pl"), label: "Pomoc Drogowa" },
				{ href: getRoute("carSales", "pl"), label: "Autohandel" },
				{ href: getRoute("rental", "pl"), label: "Wynajem" },
				{ href: getRoute("transport", "pl"), label: "Transport" },
				{ href: getRoute("about", "pl"), label: "O nas" },
				{ href: getRoute("blog", "pl"), label: "Poradnik" },
				{ href: getRoute("contact", "pl"), label: "Kontakt" },
			],
			callCta: "Zadzwoń 24/7",
			callShort: "Telefon 24/7",
		},
		footer: {
			contact: "Kontakt",
			services: "Usługi",
			about: "O firmie",
			legal: "Informacje prawne",
			cashless: "Płatność gotówką lub kartą",
			copyright: "Wszelkie prawa zastrzeżone.",
			serviceLinks: [
				{ href: getRoute("towing", "pl"), label: "Laweta i pomoc drogowa" },
				{ href: getRoute("carSales", "pl"), label: "Skup i handel autami" },
				{ href: getRoute("rental", "pl"), label: "Wynajem i auta zastępcze" },
			],
			aboutLinks: [
				{ href: getRoute("about", "pl"), label: "O nas" },
				{ href: getRoute("vehicles", "pl"), label: "Pojazdy" },
				{ href: getRoute("faq", "pl"), label: "FAQ i porady" },
			],
			legalLinks: [
				{ href: getRoute("imprint", "pl"), label: "Impressum / dane firmy" },
				{ href: getRoute("privacy", "pl"), label: "Polityka prywatności" },
			],
			useful: "Tematy Poradnika",
			usefulLinks: [
				{ href: "/pl/blog/pomoc-drogowa", label: "Pomoc Drogowa Porady" },
				{ href: "/pl/blog/sprzedaz-skup", label: "Sprzedaż Auta" },
				{ href: "/pl/blog/logistyka-przepisy", label: "Wypadek i Prawo" },
				{ href: "/pl/blog/wynajem-mobilnosc", label: "Elektromobilność" },
			],
			ctaBar: {
				title: "Potrzebujesz pomocy 24/7?",
				subtitle: "Jesteśmy dostępni przez całą dobę – również w święta.",
				callBtn: "Zadzwoń teraz",
				whatsappBtn: "WhatsApp",
			},
			trust: {
				rating: "4.9/5 Google",
				time: "Dojazd ~30 min (A2)",
				insured: "Ubezpieczony transport",
				invoice: "Faktura / Paragon",
			},
			status: {
				towing: "Pomoc drogowa: 24/7",
				sales: "Autohandel: Termin do uzgodnienia",
			},
			quickActions: {
				navigate: "Nawiguj do nas",
				email: "Wyślij zapytanie",
				cars: "Zobacz auta",
			},
			social: {
				reviews: "Opinie",
			},
		},
		home: {
			hero: {
				title:
					"Pablo e.U. – Twój Partner Mobilności w Sollenau i Wiedniu: Autohandel, Laweta i Transport",
				subtitle:
					"Jako certyfikowana austriacka firma (e.U.) z bazą w Sollenau przy autostradzie A2, gwarantujemy dojazd do Wiednia w 30 minut. Bezpiecznie holujemy auta elektryczne (Tesla). Wszystko z jednej ręki: laweta, autohandel i wynajem.",
				badges: "🇦🇹 🇵🇱 🇬🇧 Mówimy po niemiecku, polsku i angielsku",
				primaryCta: "Tel. alarmowy: +43 664 1261735",
				secondaryCta: "Zobacz usługi",
			},
			trustBar: {
				items: [
					"Certyfikowana firma",
					"Siedziba Sollenau (A2)",
					"Ubezpieczenie AC/OC",
					"DE | PL | EN",
					"Od 2018 roku",
				],
			},
			serviceCards: {
				towing: {
					title: "Pomoc Drogowa i Holowanie",
					description:
						"Szybka pomoc przy wypadku lub awarii. Jesteśmy na miejscu w 30 min (Baden, Wr. Neustadt, A2).",
					features: [
						"Infolinia 24/7",
						"Holowanie powypadkowe",
						"Auta i busy do 3.5t",
					],
					linkLabel: "Zadzwoń po lawetę",
				},
				sales: {
					title: "Handel Samochodami",
					description:
						"Sprawdzone pojazdy w uczciwych cenach. Skup i sprzedaż z przejrzystą procedurą.",
					features: [
						"Ważny przegląd §57a",
						"Rękojmia",
						"Możliwość finansowania",
					],
					linkLabel: "Zobacz ofertę aut",
				},
				rental: {
					title: "Wynajem i Auta Zastępcze",
					description:
						"Bądź mobilny, nawet gdy Twoje auto jest w warsztacie. Wynajem bez karty kredytowej.",
					features: [
						"Auta osobowe i dostawcze",
						"Wynajem krótko- i długoterminowy",
						"Bez karty kredytowej",
					],
					linkLabel: "Sprawdź dostępność",
				},
				transport: {
					title: "Transport i Logistyka",
					description:
						"Niezawodne transporty (AT-PL) i przeprowadzki. Bezpiecznie dostarczamy Twój ładunek.",
					features: [
						"Austria ↔ Polska",
						"Przeprowadzki i meble",
						"Ubezpieczony transport",
					],
					linkLabel: "Poproś o wycenę",
				},
			},
			kpi: {
				items: [
					{ value: "30 Min", label: "Dojazd do Wiednia" },
					{ value: "Stała cena", label: "Stałe, jasne ceny" },
					{ value: "Od 2018", label: "Doświadczenie i zaufanie" },
				],
			},
			protection: {
				title: "Twoja pomoc drogowa w powiecie Wiener Neustadt-Land i na A2",
				intro:
					"Obsługujemy trasę S1 Wiener Außenring Schnellstraße oraz Bezirk Baden. Szybki dojazd do zjazdów Leobersdorf i Wöllersdorf.",
				items: [
					{
						title: "Laweta",
						description:
							"Bezpieczny transport aut osobowych, busów i powypadkowych.",
					},
					{
						title: "Pomoc na miejscu",
						description:
							"Starthilfe (odpalanie), wymiana koła lub dowóz paliwa.",
					},
					{
						title: "Wyciąganie z rowu",
						description:
							"Profesjonalne wyciąganie aut po wypadkach (także z rowów).",
					},
					{
						title: "Holowanie do PL/AT",
						description:
							"Odwieziemy Ciebie i Twoje auto do domu (usługa repatriacji).",
					},
				],
			},
			trade: {
				title: "Pewny autohandel i skup aut w Dolnej Austrii",
				intro:
					"Każde auto sprzedajemy z ważnym przeglądem (§57a Pickerl) i historią carLOG. Oferujemy rękojmię (Gewährleistung). Skup aut za gotówkę.",
				items: [
					{
						title: "Sprzedaż",
						description:
							"Sprawdzone auta osobowe, busy i przyczepy. Oględziny w Sollenau (Industriestraße 1) możliwe o każdej porze (po umówieniu).",
					},
					{
						title: "Skup aut (Gotówka)",
						description:
							"Kupujemy auta wszystkich marek – także bez przeglądu, z uszkodzonym silnikiem lub po wypadku. Szybka gotówka.",
					},
				],
			},
			whyUs: {
				title: "Dlaczego Pablo e.U. to najlepszy partner w Sollenau",
				items: [
					{
						title: "Dostępność",
						description:
							"Prawdziwe 24h – zawsze odbieramy telefon, nawet w święta.",
					},
					{
						title: "Wielojęzyczność (PL/DE/EN)",
						description:
							"Brak nieporozumień przy awarii. Idealne dla transportu międzynarodowego na A2.",
					},
					{
						title: "Wszystko w jednym",
						description:
							"Holowanie, auto zastępcze (wynajem) oraz skup/sprzedaż aut.",
					},
				],
			},
			faq: {
				title: "Najczęściej zadawane pytania (FAQ)",
				items: [
					{
						question: "Jak szybko dojedzie laweta?",
						answer:
							"Priorytetowo obsługujemy A2 Südautobahn i Sollenau. Zadzwoń pod +43 664 1261735, aby potwierdzić czas – dojazd do centrum Wiednia zazwyczaj w 30 minut.",
					},
					{
						question: "Czy skupujecie auta po wypadku?",
						answer:
							"Tak, kupujemy samochody z wysokim przebiegiem, powypadkowe lub bez ważnego przeglądu – uczciwa wycena.",
					},
					{
						question: "Czy zapłacę kartą?",
						answer:
							"Tak. Przyjmujemy gotówkę, karty debetowe i kredytowe – płacisz wygodnie na miejscu zaraz po usłudze.",
					},
				],
			},
			blog: {
				title: "Poradnik motoryzacyjny",
				subtitle:
					"Porady, wskazówki i aktualności dotyczące motoryzacji i pomocy drogowej.",
				cta: "Zobacz wszystkie artykuły",
			},
		},
		towing: {
			title:
				"Pomoc drogowa 24/7 Sollenau i Wiener Neustadt: Twój partner alarmowy",
			intro:
				"Szybka pomoc na autostradzie A2 i w całym powiecie Wiener Neustadt-Land. Z reguły jesteśmy na miejscu w ciągu kilku minut.",
			heroPrimary: "Alarm 24/7: +43 664 1261735",
			heroSecondary: "Wyślij lokalizację przez WhatsApp",
			stepsTitle: "Tak działa nasz proces alarmowy 24h",
			steps: [
				{
					title: "1. Telefon",
					description: "Zadzwoń natychmiast pod +43 664 1261735.",
				},
				{
					title: "2. Lokalizacja",
					description:
						"Wyślij nam swoją lokalizację przez WhatsApp, abyśmy mogli szybko Cię znaleźć na A2 lub w okolicznych gminach.",
				},
				{
					title: "3. Zabezpieczenie",
					description:
						"Zabezpieczamy miejsce zdarzenia i bezpiecznie transportujemy Twój pojazd.",
				},
			],
			servicesTitle: "Nasze obszary działań 24/7: więcej niż tylko holowanie",
			services: [
				{
					title: "Pomoc drogowa na miejscu",
					description:
						"Starthilfe (uruchomienie), wymiana koła lub zabezpieczenie miejsca zdarzenia. Oszczędność czasu i kosztów.",
				},
				{
					title: "Holowanie i odzysk pojazdu",
					description:
						"Bezpieczny transport samochodów osobowych, dostawczych i powypadkowych do warsztatu lub na nasz plac w Sollenau.",
				},
				{
					title: "Auto zastępcze",
					description:
						"Abyś mimo awarii pozostał mobilny, w zależności od dostępności zapewniamy bezpośrednio auto zastępcze.",
				},
			],
			whyUs: {
				title: "Dlaczego Pablo e.U. to najlepszy wybór w Dolnej Austrii",
				items: [
					{
						title: "Dostępność 24/7",
						description:
							"Jesteśmy dostępni 365 dni w roku – także w weekendy i święta.",
					},
					{
						title: "Obsługa dwujęzyczna (DE/PL)",
						description:
							"Pełna obsługa po niemiecku i polsku – idealna dla lokalnych klientów oraz społeczności na A2.",
					},
					{
						title: "Elastyczna płatność",
						description:
							"Wygodnie zapłacisz gotówką lub kartą bezpośrednio na miejscu po interwencji.",
					},
					{
						title: "Lokalna wiedza",
						description:
							"Nasza baza w Sollenau umożliwia najszybszy dojazd do Wiener Neustadt, Baden i Neunkirchen.",
					},
				],
			},
			faq: {
				title: "Najczęściej zadawane pytania (FAQ)",
				items: [
					{
						question: "Jak szybko Pablo dojeżdża na miejsce?",
						answer:
							"Priorytetowo traktujemy zgłoszenia na A2 i w rejonie Wiener Neustadt. Dążymy do tego, aby być na miejscu w możliwie najkrótszym czasie.",
					},
					{
						question: "Ile kosztuje holowanie w nocy lub w święto?",
						answer:
							"Koszt zależy od pory interwencji i odległości. Stawiamy na uczciwe i przejrzyste warunki. Zadzwoń, aby uzyskać wycenę.",
					},
					{
						question: "Czy mogę zapłacić na miejscu kartą kredytową?",
						answer:
							"Tak, dla ułatwienia akceptujemy płatność gotówką oraz popularne karty debetowe i kredytowe bezpośrednio na miejscu.",
					},
				],
			},
			note: "Cena zależy od pory dnia i odległości. Skontaktuj się, aby uzyskać szybką wycenę.",
			ctaTitle: "Zadzwoń teraz (Mówimy po polsku)",
			ctaDescription:
				"Lokalizacja: Industriestraße 1, 2601 Sollenau. Obsługa polskojęzyczna, holowanie, pomoc drogowa i auto zastępcze.",
			primary: "Zadzwoń teraz",
			secondary: "Napisz na WhatsApp",
		},
		transport: {
			title: "Transport i Przeprowadzki: Polska-Austria i Europa",
			intro:
				"Profesjonalne przeprowadzki, transport maszyn i regularne linie pomiędzy Austrią a Polską. Stałe ceny bez ukrytych kosztów.",
			servicesTitle: "Nasze usługi transportowe",
			services: [
				{
					title: "Przeprowadzki Wiedeń",
					description:
						"Kompleksowe przeprowadzki w stałej cenie - bez dopłat za piętra.",
				},
				{
					title: "Linia Polska-Austria",
					description:
						"Regularny przewóz mebli, paczek i palet na trasie PL-AT.",
				},
				{
					title: "Transport Maszyn",
					description:
						"Specjalistyczny transport maszyn budowlanych i rolniczych.",
				},
				{
					title: "Magazynowanie",
					description: "Wysyłka paletowa B2B i magazynowanie w Sollenau.",
				},
			],
			ctaTitle: "Zaplanuj transport",
			ctaDescription:
				"Uzyskaj darmową wycenę przeprowadzki lub transportu już teraz.",
			primary: "Poproś o wycenę",
			secondary: "Zapytaj na WhatsApp",
		},
		autohandel: {
			title: "Skup i sprzedaż aut – region Wiener Neustadt",
			intro:
				"Szukasz sprawdzonego auta używanego lub chcesz sprzedać samochód? Kupujemy pojazdy w każdym stanie – także powypadkowe, z dużym przebiegiem lub bez ważnego przeglądu.",
			buyTitle: "Skup – szybko i jasno",
			buyDescription:
				"Indywidualna wycena i uczciwe warunki. Skup aut używanych, pojazdów z dużym przebiegiem oraz po kolizji. Wypłata gotówką lub kartą.",
			sellTitle: "Sprzedaż – sprawdzone pojazdy w Sollenau",
			sellDescription:
				"Oferujemy sprawdzone używane: auta osobowe, dostawcze, przyczepy oraz jednoślady. Ogłoszenia na willhaben.at i mobile.de, oglądanie po umówieniu wizyty w Industriestraße 1.",
			inventoryTitle: "Wybrane ogłoszenia",
			benefitsTitle: "Twoje korzyści",
			benefits: [
				{
					title: "Szybka wycena",
					description: "Natychmiastowa ocena auta, także po kolizji.",
				},
				{
					title: "Uczciwe warunki",
					description:
						"Transparentne zasady, wypłata gotówką lub kartą na miejscu.",
				},
				{
					title: "Odbiór pojazdu",
					description:
						"Po ustaleniach odbierzemy samochód w regionie Wiener Neustadt-Land.",
				},
				{
					title: "Obsługa PL/DE",
					description: "Doradzimy po polsku lub niemiecku.",
				},
			],
			ctaTitle: "Umów wizytę lub poproś o ofertę skupu",
			ctaDescription:
				"Chętnie doradzimy po polsku lub niemiecku. Napisz lub zadzwoń, by sprzedać auto lub ustalić termin oględzin.",
			primary: "Wyślij zapytanie",
			secondary: "Zobacz ofertę",
			marketPanel: {
				statusTitle: "Status Rynku",
				itemBuy: "Skup aut",
				valueActive: "AKTYWNY",
				itemSell: "Sprzedaż",
				valueAvailable: "dostępne pojazdy",
				itemDamaged: "Auta powypadkowe",
				valueAccepted: "przyjmujemy",
				itemMileage: "Duży przebieg",
				valueOk: "OK",
				step1: "1. Wycena",
				step2: "2. Umowa",
				step3: "3. Płatność / Odbiór",
			},
		},
		rental: {
			title: "Wynajem i auta zastępcze w Sollenau",
			intro:
				"Samochód w warsztacie lub potrzebujesz busa? Zapewniamy ciągłość mobilności – często łączymy z holowaniem i autem zastępczym.",
			fleetTitle: "Nasza flota",
			fleet: [
				{
					title: "Samochody osobowe",
					description: "Różne klasy na co dzień – zależnie od dostępności.",
				},
				{
					title: "Lekkie pojazdy dostawcze",
					description:
						"Busy i samochody dostawcze na przeprowadzki, projekty, usługi.",
				},
				{
					title: "Przyczepy",
					description: "Różne modele do zadań transportowych, po uzgodnieniu.",
				},
			],
			note: "Najem krótkoterminowy (dni/tygodnie) i dłuższy po uzgodnieniu. Idealnie jako auto zastępcze po awarii lub wypadku.",
			ctaTitle: "Zadbaj o mobilność",
			ctaDescription:
				"Skontaktuj się, aby sprawdzić dostępność i otrzymać ofertę wynajmu auta, busa lub pojazdu zastępczego.",
			primary: "Zapytaj o dostępność",
			secondary: "24/7 Notruf",
		},
		about: {
			title: "O nas – Autohandel & Abschleppdienst Pablo e.U.",
			intro:
				"Od 2018 roku właściciel Paweł Bogusław Ferdynus łączy handel autami używanymi z holowaniem, pomocą drogową i wynajmem. Jako jednoosobowa firma stawiamy na osobistą odpowiedzialność, obsługę PL/DE i lokalne doświadczenie w Sollenau.",
			storyTitle: "Historia Pablo e.U.",
			story:
				"Zaczynaliśmy jako regionalny autohandel z naciskiem na uczciwe samochody używane. Szybko dołączyliśmy lawetę i pomoc drogową. Dziś oferujemy unikalne połączenie handlu, usług ratunkowych i wynajmu – wszystko w jednym miejscu.",
			secondTitle: "Więcej niż autohandel",
			second:
				"Organizujemy holowanie, zapewniamy auta zastępcze i doradzamy przy kupnie lub sprzedaży. Samochody osobowe, busy, przyczepy czy jednoślady – zadbamy, byś pozostał mobilny.",
			valuesTitle: "Nasze wartości",
			values: [
				"Dostępność 24/7 – jesteśmy, gdy inni śpią.",
				"Bez barier językowych – pełna obsługa po polsku i niemiecku.",
				"Elastyczne płatności – gotówka lub karta tuż po usłudze.",
				"Zakotwiczenie lokalne – Sollenau, powiat Wiener Neustadt-Land.",
			],
			whyTitle: "Dlaczego my?",
			why: "Osobisty kontakt, szybka reakcja, przejrzyste warunki i uczciwa obsługa – to nas wyróżnia.",
			ctaTitle: "Poznaj nas",
			ctaDescription:
				"Czekamy na Twoje pytania – w sprawie lawety, zakupu auta czy wynajmu.",
			primary: "Skontaktuj się",
			secondary: "Zobacz pojazdy",
		},
		contact: {
			title: "Kontakt i dojazd – Autohandel & Abschleppdienst Pablo Sollenau",
			intro:
				"Nasza siedziba w Sollenau jest dobrze skomunikowana. Z B17 wjedziesz bezpośrednio, z A2 skorzystaj ze zjazdu Wiener Neustadt Nord lub Wöllersdorf. Blisko stacji kolejowej – wygodnie na odbiór auta.",
			contactTitle: "Skontaktuj się z nami",
			description:
				"Niezależnie od zgłoszenia awarii, zakupu czy sprzedaży auta – jesteśmy do dyspozycji. Obsługa po polsku i niemiecku.",
			labels: {
				hotline: "24/7 Notruf (PL/DE)",
				inquiries: "Zapytania (kupno/sprzedaż)",
				whatsapp: "WhatsApp",
				address: "Adres",
			},
			formTitle: "Wyślij wiadomość",
			formDescription:
				"Masz pytania o auto, skup lub potrzebujesz lawety? Napisz do nas!",
		},
		faq: {
			title: "FAQ i porady",
			intro:
				"Odpowiedzi na najczęstsze pytania dotyczące lawety, autohandlu i wynajmu.",
			items: [
				{
					question: "Jak szybko dojedzie laweta?",
					answer:
						"Priorytetowo obsługujemy Sollenau, Wiener Neustadt i A2. Zadzwoń pod +43 664 1261735, by ustalić czas.",
				},
				{
					question: "Czy kupujecie auta po wypadku?",
					answer:
						"Tak, pojazdy z dużym przebiegiem, powypadkowe lub bez przeglądu – uczciwa wycena, płatność gotówką lub kartą.",
				},
				{
					question: "Czy zapłacę kartą?",
					answer: "Tak, przyjmujemy gotówkę i karty zaraz po usłudze.",
				},
				{
					question: "Czy macie auto zastępcze?",
					answer:
						"Jeśli dostępne, udostępniamy auto zastępcze, często wraz z holowaniem.",
				},
			],
			blogTitle: "Blog / Ratgeber (Placeholder)",
			blog: [
				{
					title: "Jak zabezpieczyć miejsce zdarzenia",
					description:
						"Lista kontrolna na pierwsze minuty po awarii na A2 i w regionie Wiener Neustadt-Land.",
				},
				{
					title: "Skup aut po szkodzie",
					description:
						"Kiedy sprzedać auto po kolizji? Wskazówki do uczciwej wyceny.",
				},
			],
		},
		vehicles: {
			title: "Pojazdy – samochody, busy i przyczepy",
			intro:
				"Sprawdź dostępne pojazdy. Wszystkie oględziny po umówieniu wizyty w Sollenau.",
		},
		vehicleDetail: {
			breadcrumb: "Samochody osobowe",
			price: "Cena",
			priceNet: "Cena (Netto)",
			priceGross: "Cena (Brutto)",
			vat: "VAT",
			offerNumber: "Nr. oferty",
			category: "Kategoria",
			make: "Marka",
			model: "Model",
			year: "Rok produkcji",
			firstRegistration: "Pierwsza rejestracja",
			mileage: "Przebieg",
			fuel: "Paliwo",
			transmission: "Skrzynia biegów",
			power: "Moc",
			color: "Kolor",
			seats: "Miejsca",
			doors: "Drzwi",
			series: "Seria",
			trimLine: "Wersja wyposażenia",
			driveType: "Napęd",
			energySource: "Źródło energii",
			consumption: "Zużycie paliwa",
			co2: "Emisja CO₂",
			climateControl: "Klimatyzacja",
			parkingSensors: "Czujniki parkowania",
			airbags: "Poduszki powietrzne",
			towingCapBraked: "Uciąg na haku (z hamulcem)",
			towingCapUnbraked: "Uciąg na haku (bez hamulca)",
			towingBraked: "Uciąg na haku (z hamulcem)",
			towingUnbraked: "Uciąg na haku (bez hamulca)",
			weightNet: "Masa własna",
			weightTotal: "DMC",
			payload: "Ładowność",
			hsn: "HSN",
			tsn: "TSN",
			vin: "VIN (na zapytanie)",
			vinHidden: "(NA ZAPYTANIE)", // PL
			equipment: "Wyposażenie",
			// New Specs
			constructionYear: "Rok produkcji",
			cubicCapacity: "Pojemność skokowa",
			cylinders: "Cylindry",
			fuelTank: "Zbiornik paliwa",
			envEnergy: "Zużycie energii",
			envCo2: "Emisja CO2",
			envCo2Class: "Klasa CO2",
			pickerl: "Przegląd (Pickerl)",
			climatisation: "Klimatyzacja",
			parkAssists: "Czujniki parkowania",

			condition: "Stan",
			conditionDetail: "Szczegóły stanu",
			available: "Dostępny",
			sold: "Sprzedany",
			reserved: "Zarezerwowany",
			onRequest: "Na zapytanie",
			negotiable: "Do negocjacji",
			techSpecs: "Dane techniczne",
			sectionEngine: "Silnik i Ekologia",
			sectionComfort: "Komfort i Wyposażenie",
			sectionWeights: "Wagi i Obciążenia",
			gallery: "Galeria",
			video: "Wideo prezentacja",
			description: "Opis pojazdu",
			location: "Lokalizacja",
			interested: "Zainteresowany?",
			contact: "Skontaktuj się",
			unknown: "b.d.",
			view: "Umów oględziny",
			combine: "Połącz z pomocą drogową",
		},
		notFound: {
			title: "Ups! Strona nie istnieje albo pojazd został sprzedany.",
			description:
				"Wygląda na to, że trafiłeś w ślepy zaułek. Spokojnie – laweta nie jest potrzebna, by stąd wrócić! Może szukany samochód został już sprzedany albo adres był nieprawidłowy.",
			primary: "Powrót na start",
			secondary: "Zobacz pojazdy",
		},
		testimonials: {
			title: "Opinie klientów",
			items: [
				{
					quote:
						"Błyskawiczna pomoc na A2 – byli na miejscu w kilka minut i załatwili auto zastępcze.",
					author: "Klient z Wiener Neustadt",
				},
				{
					quote:
						"Profesjonalny skup naszego busa, uczciwa wycena i wypłata od ręki.",
					author: "Lokalna firma usługowa",
				},
			],
		},
		form: {
			name: "Imię i nazwisko (wymagane)",
			phone: "Telefon (oddzwonimy)",
			email: "Adres e-mail",
			message: "Wiadomość / szczegóły zapytania",
			required: "Uzupełnij wymagane pola.",
			success:
				"Dziękujemy! Wiadomość została wysłana. Wkrótce się odezwiemy. WAŻNE: w nagłych przypadkach dzwoń bezpośrednio: +43 664 1261735.",
			submit: "Wyślij wiadomość",
		},
	},
	en: {
		common: {
			badge: "24/7 Service • German / Polish",
			supporting:
				"Fast assistance on the A2 South Autobahn, in the Wiener Neustadt district and in Sollenau. Vehicles, towing and rentals from one partner.",
			whatsapp: "WhatsApp",
			callNow: "Call 24/7 hotline",
			whatsappAction: "Share location via WhatsApp",
			detailsCta: "View details →",
			readMore: "Learn more",
		},
		header: {
			brand: "Pablo e.U. Mobility",
			menu: [
				{ href: getRoute("home", "en"), label: "Home" },
				{ href: getRoute("towing", "en"), label: "Towing Service" },
				{ href: getRoute("carSales", "en"), label: "Car Sales" },
				{ href: getRoute("rental", "en"), label: "Rental" },
				{ href: getRoute("transport", "en"), label: "Transport" },
				{ href: getRoute("about", "en"), label: "About Us" },
				{ href: getRoute("blog", "en"), label: "Guides" },
				{ href: getRoute("contact", "en"), label: "Contact" },
			],
			callCta: "Call 24/7",
			callShort: "24/7 Call",
		},
		footer: {
			contact: "Contact",
			services: "Services",
			about: "About Pablo",
			legal: "Legal",
			cashless: "Cash and card payments accepted",
			copyright: "All rights reserved.",
			serviceLinks: [
				{ href: getRoute("towing", "en"), label: "Towing & Breakdown Service" },
				{ href: getRoute("carSales", "en"), label: "Used Cars & Purchase" },
				{ href: getRoute("rental", "en"), label: "Rental & Replacement Cars" },
			],
			aboutLinks: [
				{ href: getRoute("about", "en"), label: "About Us" },
				{ href: getRoute("vehicles", "en"), label: "Vehicles" },
				{ href: getRoute("faq", "en"), label: "FAQ & Guide" },
			],
			legalLinks: [
				{ href: getRoute("imprint", "en"), label: "Imprint" },
				{ href: getRoute("privacy", "en"), label: "Privacy Policy" },
			],
			useful: "Guide Topics",
			usefulLinks: [
				{ href: "/en/blog/roadside-assistance", label: "Breakdown Help" },
				{ href: "/en/blog/car-selling", label: "Sell Car Tips" },
				{ href: "/en/blog/logistics-law", label: "Accident & Law" },
				{ href: "/en/blog/mobility-rental", label: "E-Mobility" },
			],
			ctaBar: {
				title: "Need 24/7 Help?",
				subtitle: "We are available around the clock – even on holidays.",
				callBtn: "Call Now",
				whatsappBtn: "WhatsApp",
			},
			trust: {
				rating: "4.9/5 Google",
				time: "Arrival ~30 min (A2)",
				insured: "Insured Transport",
				invoice: "Invoice / Receipt",
			},
			status: {
				towing: "Roadside: 24/7",
				sales: "Sales: By Appointment",
			},
			quickActions: {
				navigate: "Navigate to Us",
				email: "Send Inquiry",
				cars: "View Cars",
			},
			social: {
				reviews: "Reviews",
			},
		},
		home: {
			hero: {
				title:
					"Pablo e.U. – Your Mobility Partner in Sollenau & Vienna: Car Sales, Towing & Transport",
				subtitle:
					"As a certified sole proprietorship (e.U.) based in Sollenau right on the A2 South Autobahn, we guarantee a 30-minute response time to Vienna. We safely transport electric cars (Tesla) and provide rental cars without credit card.",
				badges: "🇦🇹 🇵🇱 🇬🇧 We speak German, Polish & English",
				primaryCta: "Emergency: +43 664 1261735",
				secondaryCta: "View Services",
			},
			trustBar: {
				items: [
					"Certified Company",
					"Location Sollenau (A2)",
					"Fully Insured",
					"DE | PL | EN",
					"Since 2018",
				],
			},
			serviceCards: {
				towing: {
					title: "Towing Service & Assistance",
					description:
						"Fast help in case of accident or breakdown. We are on site in 30 min (Baden, Wr. Neustadt, A2).",
					features: [
						"24/7 Emergency Hotline",
						"Accident Towing",
						"Cars & Vans up to 3.5t",
					],
					linkLabel: "Call for Help",
				},
				sales: {
					title: "Used Car Sales",
					description:
						"Checked vehicles at fair prices. Buying & selling with transparent processing.",
					features: [
						"Valid §57a inspection",
						"Warranty",
						"Financing available",
					],
					linkLabel: "View Vehicles",
				},
				rental: {
					title: "Rental & Replacement Cars",
					description:
						"Stay mobile even if your car is in the workshop. Car rental without credit card.",
					features: [
						"Cars & Vans",
						"Short & Long Term",
						"No Credit Card needed",
					],
					linkLabel: "Book a Car",
				},
				transport: {
					title: "Transport & Logistics",
					description:
						"Reliable transport (AT-PL) and moving services. We deliver your cargo safely.",
					features: [
						"Austria ↔ Poland",
						"Moving & Furniture",
						"Insured Transport",
					],
					linkLabel: "Request Transport",
				},
			},
			kpi: {
				items: [
					{ value: "30 Min", label: "Arrival A2/Vienna" },
					{ value: "Fixed Price", label: "Fair Conditions" },
					{ value: "Since 2018", label: "Experience & Trust" },
				],
			},
			protection: {
				title: "Your Breakdown Service for Wiener Neustadt-Land & A2",
				intro:
					"We cover the S1 Wiener Außenring Expressway and Baden District. Fast arrival at Leobersdorf and Wöllersdorf exits guaranteed.",
				items: [
					{
						title: "Towing Service",
						description:
							"Safe transport for cars, vans, and accident vehicles.",
					},
					{
						title: "On-site Assistance",
						description:
							"Jump start, tire change or fuel delivery (help on location).",
					},
					{
						title: "Vehicle Recovery",
						description:
							"Professional recovery after accidents (also from ditches).",
					},
					{
						title: "European Repatriation",
						description: "We bring you and your vehicle home.",
					},
				],
			},
			trade: {
				title: "Reputable Car Trading & Purchase in Lower Austria",
				intro:
					"Looking for a reliable used car or want to sell your old vehicle fast? At Pablo e.U., we trade fairly and transparently.",
				items: [
					{
						title: "Sales",
						description:
							"Checked used cars (cars, commercial vehicles). Viewing in Sollenau (Industriestraße 1) anytime (by appointment).",
					},
					{
						title: "Car Purchase (Cash)",
						description:
							"We buy cars of all brands – even without inspection, with engine damage or accident vehicles. Fast processing and cash payment.",
					},
				],
			},
			whyUs: {
				title: "Why Pablo e.U. is your best partner in Sollenau",
				items: [
					{
						title: "Availability",
						description:
							"Real 24h emergency service – we always answer the phone, even on holidays.",
					},
					{
						title: "Bilingual (DE/PL)",
						description:
							"No misunderstandings during breakdowns. Ideal for international transporters on the A2.",
					},
					{
						title: "All from one source",
						description: "Towing, replacement car (rental) and purchase/sales.",
					},
				],
			},
			faq: {
				title: "Frequently Asked Questions (FAQ)",
				items: [
					{
						question: "How fast does your towing service arrive?",
						answer:
							"We prioritize emergencies in Sollenau and along the A2. Call us directly at +43 664 1261735 to confirm waiting time and location.",
					},
					{
						question: "Do you buy cars with accident damage or engine failure?",
						answer:
							"Yes, we value accident vehicles, high-mileage vehicles, or those without valid inspection, offering fair terms.",
					},
					{
						question: "Can I pay the towing service by card on site?",
						answer:
							"Yes, we accept cash as well as common debit and credit cards directly after the operation.",
					},
				],
			},
			blog: {
				title: "Latest Mobility Guides",
				subtitle:
					"Tips, tricks, and news about cars, breakdowns, and road safety.",
				cta: "Read all articles",
			},
		},
		towing: {
			title:
				"24/7 Towing Service Sollenau & Wiener Neustadt: Your Emergency Partner",
			intro:
				"Fast help on the A2 motorway and throughout the Wiener Neustadt-Land district. In most cases, we are on site within minutes.",
			heroPrimary: "24/7 Emergency Call: +43 664 1261735",
			heroSecondary: "Send location via WhatsApp",
			stepsTitle: "How our 24h emergency process works",
			steps: [
				{ title: "1. Call", description: "Dial +43 664 1261735 immediately." },
				{
					title: "2. Location",
					description:
						"Share your location via WhatsApp so we can find you quickly on the A2 or in nearby municipalities (Baden, Neunkirchen).",
				},
				{
					title: "3. Securing & Recovery",
					description: "We secure the scene and transport your vehicle safely.",
				},
			],
			servicesTitle: "Our 24/7 service areas: more than just towing",
			services: [
				{
					title: "Roadside assistance",
					description:
						"Jump start (battery), tire change or temporary measures on site. We save you time and money.",
				},
				{
					title: "Vehicle towing & recovery",
					description:
						"Safe transport for cars, vans and accident vehicles to your destination of choice or our site.",
				},
				{
					title: "Replacement car",
					description:
						"We provide a replacement car (subject to availability) so you stay mobile.",
				},
			],
			whyUs: {
				title: "Why Pablo e.U. is the best choice in Lower Austria (EEAT)",
				items: [
					{
						title: "24/7 availability",
						description:
							"We are reachable 365 days a year — including weekends and public holidays.",
					},
					{
						title: "Bilingual support (DE/PL)",
						description:
							"Full support in German and Polish, ideal for local customers and international drivers.",
					},
					{
						title: "Flexible payment",
						description:
							"Pay easily in cash or by card directly on site after the service.",
					},
					{
						title: "Local expertise",
						description:
							"Our location in Sollenau enables the fastest response times in Wiener Neustadt, Baden and Neunkirchen.",
					},
				],
			},
			faq: {
				title: "Frequently Asked Questions (FAQ)",
				items: [
					{
						question: "How fast can Pablo arrive on site?",
						answer:
							"We prioritize emergency calls on the A2 and in the Wiener Neustadt area. We aim to reach you within the shortest possible time.",
					},
					{
						question:
							"How much does towing cost at night or on public holidays?",
						answer:
							"Costs depend on the time and distance. We focus on fair and transparent conditions. Call us for an immediate price indication.",
					},
					{
						question: "Can I pay by credit card on site?",
						answer:
							"Yes. For convenience, we accept cash as well as common debit and credit cards directly on site.",
					},
				],
			},
			note: "Costs depend on operation time and distance. Call for an immediate price indication. Cash and card payment possible.",
			ctaTitle: "24/7 Emergency Call – We are there for you immediately",
			ctaDescription:
				"For acute breakdowns or accidents: +43 664 1261735. Bilingual support (DE/PL), fast arrival in Sollenau, Wiener Neustadt area and along the A2.",
			primary: "Call Emergency Now",
			secondary: "Send WhatsApp Location",
		},
		autohandel: {
			title:
				"Certified Used Cars in Sollenau: Checked Quality Cheaper than in Vienna",
			intro:
				"Looking for a reliable used car or want to sell your old vehicle? We buy cars and commercial vehicles in any condition – including accident cars, high mileage vehicles or those without valid inspection.",
			buyTitle: "Purchase – Simple and Transparent",
			buyDescription:
				"We value your vehicle individually and offer fair terms. Purchase of used cars, high mileage vehicles as well as accident and damaged vehicles. Payout in cash or by card possible.",
			sellTitle: "Sales – Variety at Sollenau Location",
			sellDescription:
				"We offer checked used vehicles: cars, transporters, trailers as well as mopeds and motorcycles. Listings on willhaben.at and mobile.de, viewing by appointment at Industriestraße 1.",
			inventoryTitle: "Extract from our Inventory",
			benefitsTitle: "Your Benefits",
			benefits: [
				{
					title: "Fast Valuation",
					description:
						"Direct assessment and offer for your vehicle – even with accident damage.",
				},
				{
					title: "Fair Processing",
					description: "Transparent terms, payout in cash or by card on site.",
				},
				{
					title: "Pick-up Possible",
					description:
						"We pick up your vehicle by arrangement – flexible in Wiener Neustadt-Land district.",
				},
				{
					title: "Bilingual Advice",
					description: "Advice in German or Polish, as desired.",
				},
			],
			ctaTitle: "Make an appointment or request a purchase offer",
			ctaDescription:
				"We are happy to advise you in German or Polish. Write to us or call to sell your vehicle or arrange a viewing appointment.",
			primary: "Send Inquiry",
			secondary: "View Inventory",
			marketPanel: {
				statusTitle: "Market Status",
				itemBuy: "Car Buying",
				valueActive: "ACTIVE",
				itemSell: "Car Selling",
				valueAvailable: "vehicles available",
				itemDamaged: "Damaged Cars",
				valueAccepted: "accepted",
				itemMileage: "High Mileage",
				valueOk: "OK",
				step1: "1. Valuation",
				step2: "2. Contract",
				step3: "3. Payment / Pickup",
			},
		},
		rental: {
			title:
				"Rental Pablo e.U.: Car Rental & Real Estate Management in Baden & Vienna",
			intro:
				"Car in the workshop or need a transporter on short notice? We ensure seamless mobility – often combined with towing service and provision of a replacement car.",
			fleetTitle: "Our Rental Fleet",
			fleet: [
				{
					title: "Cars",
					description:
						"Various classes for daily needs – flexible depending on availability.",
				},
				{
					title: "Light Commercial Vehicles",
					description:
						"Transporters and vans ideal for moves, trades or short-term projects.",
				},
				{
					title: "Trailers",
					description:
						"Various models for transport tasks, available by arrangement.",
				},
			],
			note: "Short-term rental (days/weeks) and longer rental periods by arrangement. Ideal as replacement car after breakdown or accident.",
			ctaTitle: "Secure your mobility",
			ctaDescription:
				"Contact us for an availability inquiry and an individual rental offer for cars, transporters or replacement vehicles.",
			primary: "Request Availability",
			secondary: "24/7 Emergency Call",
		},
		transport: {
			title:
				"Transport & Moving Service: Reliable in Austria & Europe (Poland Line)",
			intro:
				"Professional moves, machine transport and regular line traffic between Austria and Poland. We offer flat rates with no hidden costs.",
			servicesTitle: "Our Transport Solutions",
			services: [
				{
					title: "Moving Vienna & Lower Austria",
					description:
						"Stress-free private moves at a fixed price – no floor surcharges.",
				},
				{
					title: "Poland Line",
					description:
						"Regular transport of furniture, packages and pallets (AT ↔ PL).",
				},
				{
					title: "Machine Transport",
					description:
						"Special transport for construction machinery and agricultural technology.",
				},
				{
					title: "Logistics & Storage",
					description:
						"Pallet shipping B2B and self-storage possibilities in Sollenau.",
				},
			],
			ctaTitle: "Plan your Transport",
			ctaDescription: "Get your non-binding offer for moving or transport now.",
			primary: "Request Offer",
			secondary: "WhatsApp Inquiry",
		},
		about: {
			title: "About us – Autohandel & Abschleppdienst Pablo e.U.",
			intro:
				"Since 2018 owner Paweł Bogusław Ferdynus has combined used car trading with towing, roadside assistance and rentals. As a sole proprietorship we focus on personal responsibility, German/Polish support and local expertise in Sollenau.",
			storyTitle: "The story of Pablo e.U.",
			story:
				"Starting as a regional car dealer with fair used cars, towing quickly became the second pillar. Today we offer a unique mix of sales, emergency service and rentals from one source.",
			secondTitle: "More than a car dealer",
			second:
				"We organise towing, provide replacement cars and advise on buying or selling. Whether cars, vans, trailers or two-wheelers – we keep you mobile.",
			valuesTitle: "Our values",
			values: [
				"24/7 availability – we are there when others sleep.",
				"No language barriers – full support in German and Polish.",
				"Flexible payments – cash or card right after the service.",
				"Local roots – based in Sollenau, serving the Wiener Neustadt district.",
			],
			whyTitle: "Why us?",
			why: "Personal contact, fast response times, transparent conditions and honest service define us.",
			ctaTitle: "Get to know us",
			ctaDescription:
				"We look forward to your inquiry – whether emergency call, car purchase or rental.",
			primary: "Contact us",
			secondary: "See vehicles",
		},
		contact: {
			title:
				"Contact & directions – Autohandel & Abschleppdienst Pablo Sollenau",
			intro:
				"Our Sollenau location is well connected. Take the B17 directly or exit the A2 at Wiener Neustadt Nord or Wöllersdorf. Close to the train station for convenient pick-up or purchase.",
			contactTitle: "Get in touch",
			description:
				"Emergency call, purchase advice or selling your car – we are here for you. Support in German and Polish.",
			labels: {
				hotline: "24/7 hotline (DE/PL)",
				inquiries: "Inquiries (buy/sell)",
				whatsapp: "WhatsApp",
				address: "Address",
			},
			formTitle: "Send us a message",
			formDescription:
				"Questions about a vehicle, selling or need towing? Send us a note!",
		},
		faq: {
			title: "FAQ & advice",
			intro: "Answers to common questions about towing, car sales and rentals.",
			items: [
				{
					question: "How fast can you arrive?",
					answer:
						"We prioritise Sollenau, Wiener Neustadt and the A2. Call +43 664 1261735 to align arrival time.",
				},
				{
					question: "Do you buy accident cars?",
					answer:
						"Yes – high mileage, accident or without inspection. Fair valuation, cash or card payment.",
				},
				{
					question: "Can I pay by card?",
					answer: "Yes, cash and major cards after the service.",
				},
				{
					question: "Do you provide replacement cars?",
					answer:
						"If available we arrange replacements, often together with towing.",
				},
			],
			blogTitle: "Blog / advice (placeholder)",
			blog: [
				{
					title: "How to secure an accident scene",
					description:
						"Checklist for the first minutes after a breakdown on the A2 and nearby.",
				},
				{
					title: "Selling damaged vehicles",
					description:
						"When to sell an accident car? Tips for a fair valuation.",
				},
			],
		},
		vehicles: {
			title: "Vehicles – used cars, vans & trailers",
			intro: "Browse current listings. Viewings by appointment in Sollenau.",
		},
		vehicleDetail: {
			breadcrumb: "Cars",
			price: "Price",
			priceNet: "Price (Net)",
			priceGross: "Price (Gross)",
			vat: "VAT",
			offerNumber: "Offer No.",
			category: "Category",
			make: "Make",
			model: "Model",
			year: "Year",
			firstRegistration: "First Registration",
			mileage: "Mileage",
			fuel: "Fuel",
			transmission: "Transmission",
			power: "Power",
			color: "Color",
			seats: "Seats",
			doors: "Doors",
			series: "Series",
			trimLine: "Trim Level",
			driveType: "Drive Type",
			energySource: "Energy Source",
			consumption: "Consumption",
			co2: "CO₂ Emissions",
			climateControl: "Climatisation",
			parkingSensors: "Parking Sensors",
			airbags: "Airbags",
			towingCapBraked: "Towing (Braked)",
			towingCapUnbraked: "Towing (Unbraked)",
			towingBraked: "Towing (Braked)",
			towingUnbraked: "Towing (Unbraked)",
			weightNet: "Net Weight",
			weightTotal: "GVW",
			payload: "Payload",
			hsn: "HSN",
			tsn: "TSN",
			vin: "VIN",
			vinHidden: "(ON REQUEST)", // EN
			equipment: "Equipment",
			// New Specs
			constructionYear: "Construction Year",
			cubicCapacity: "Cubic Capacity",
			cylinders: "Cylinders",
			fuelTank: "Fuel Tank",
			envEnergy: "Energy Consumption",
			envCo2: "CO2 Emissions",
			envCo2Class: "CO2 Class",
			pickerl: "Inspection",
			climatisation: "Climatisation",
			parkAssists: "Park Assists",

			condition: "Condition",
			conditionDetail: "Condition Details",
			available: "Available",
			sold: "Sold",
			reserved: "Reserved",
			onRequest: "On Request",
			negotiable: "Negotiable",
			techSpecs: "Technical Specs",
			sectionEngine: "Engine & Environment",
			sectionComfort: "Comfort & Features",
			sectionWeights: "Weights & Loads",
			gallery: "Gallery",
			video: "Video Presentation",
			description: "Vehicle Description",
			location: "Location",
			interested: "Interested?",
			contact: "Contact Us",
			unknown: "n/a",
			view: "Schedule Viewing",
			combine: "Combine with Towing",
		},
		notFound: {
			title: "Oops! This page does not exist or the vehicle was sold.",
			description:
				"Looks like you hit a dead end. No tow truck needed to get back! The vehicle may already be sold or the address was incorrect.",
			primary: "Back to home",
			secondary: "See available vehicles",
		},
		testimonials: {
			title: "What customers say",
			items: [
				{
					quote:
						"Rapid help on the A2 – on site within minutes and organised a replacement car.",
					author: "Client from Wiener Neustadt",
				},
				{
					quote:
						"Professional purchase of our van, fair valuation and instant payment.",
					author: "Local service company",
				},
			],
		},
		form: {
			name: "Your name (required)",
			phone: "Phone number (callback)",
			email: "Email address",
			message: "Message / details",
			required: "Please complete all required fields.",
			success:
				"Thank you! Your message has been sent. We will reply shortly. IMPORTANT: in emergencies call our hotline directly: +43 664 1261735.",
			submit: "Send message",
		},
	},
};

export function getTranslations(locale: Locale): Translations {
	return translations[locale] ?? translations[defaultLocale];
}

export function getJsonLdOrganization() {
	return {
		"@context": "https://schema.org",
		"@type": ["AutoTowingService", "AutoDealer"],
		name: company.name,
		url: company.website,
		telephone: company.phone,
		email: company.email,
		image: [
			"https://pablo-auto.at/abschleppdienst-24h-sollenau-a2-einsatz.webp",
			"https://pablo-auto.at/opengraph-image.png",
		],
		address: {
			"@type": "PostalAddress",
			streetAddress: "Industriestraße 1",
			addressLocality: "Sollenau",
			postalCode: "2601",
			addressCountry: "AT",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: company.geo.lat,
			longitude: company.geo.lon,
		},
		hasMap: company.mapUrl,
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: [
					"https://schema.org/Monday",
					"https://schema.org/Tuesday",
					"https://schema.org/Wednesday",
					"https://schema.org/Thursday",
					"https://schema.org/Friday",
				],
				opens: "08:00",
				closes: "18:00",
			},
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: "https://schema.org/Saturday",
				opens: "09:00",
				closes: "14:00",
			},
		],
		priceRange: "€€",
		paymentAccepted: "Cash, Credit Card, Debit Card",
		areaServed: [
			{
				"@type": "City",
				name: "Sollenau",
			},
			{
				"@type": "City",
				name: "Wiener Neustadt",
			},
			{
				"@type": "City",
				name: "Baden bei Wien",
			},
			{
				"@type": "Place",
				name: "A2 Südautobahn",
			},
		],
		availableLanguage: [
			{
				"@type": "Language",
				name: "German",
				alternateName: "de",
			},
			{
				"@type": "Language",
				name: "Polish",
				alternateName: "pl",
			},
			{
				"@type": "Language",
				name: "English",
				alternateName: "en",
			},
		],
	};
}
