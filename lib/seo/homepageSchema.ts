export const getHomepageSchema = () => {
	return {
		"@context": "https://schema.org",
		"@type": [
			"AutomotiveBusiness",
			"AutoDealer",
			"AutoTowingService",
			"AutoRental",
		],
		"@id": "https://pablo-auto.at/#organization",
		name: "Pablo e.U. Autohandel & Abschleppdienst",
		alternateName: ["Pablo e.U. Vermietung & Transport", "Pablo Auto Sollenau"],
		url: "https://pablo-auto.at/",
		logo: "https://pablo-auto.at/assets/logo-pablo-autohandel-abschleppdienst.png",
		image: "https://pablo-auto.at/abschleppdienst-24h-sollenau-a2-einsatz.webp",
		telephone: "+436641261735",
		email: "office@pablo-auto.at",
		address: {
			"@type": "PostalAddress",
			streetAddress: "Industriestraße 1",
			addressLocality: "Sollenau",
			postalCode: "2601",
			addressCountry: "AT",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: "47.91083",
			longitude: "16.25600",
		},
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
				opens: "08:00",
				closes: "18:00",
			},
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: ["Saturday"],
				opens: "09:00",
				closes: "14:00",
			},
		],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "emergency",
			telephone: "+436641261735",
			availableLanguage: ["German", "Polish", "English"],
			hoursAvailable: {
				"@type": "OpeningHoursSpecification",
				dayOfWeek: [
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
					"Sunday",
				],
				opens: "00:00",
				closes: "23:59",
			},
		},
		vatID: "ATU77674349",
		taxID: "FN 591679 t",
		priceRange: "$$",
		knowsLanguage: ["de-AT", "pl-PL", "en-US"],
		areaServed: [
			{ "@type": "City", name: "Wien" },
			{ "@type": "City", name: "Sollenau" },
			{ "@type": "City", name: "Wiener Neustadt" },
			{ "@type": "City", name: "Baden" },
			{ "@type": "Place", name: "A2 Südautobahn" },
		],
		founder: {
			"@type": "Person",
			name: "Paweł Bogusław Ferdynus",
		},
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Dienstleistungen & Services",
			itemListElement: [
				{
					"@type": "OfferCatalog",
					name: "Abschleppdienst & Pannenhilfe",
					itemListElement: [
						{
							"@type": "Service",
							name: "Abschleppdienst Wien & A2 (24/7)",
							description:
								"Soforthilfe in 30 Minuten. Transport von PKW, Elektroautos (Tesla) und Motorrädern.",
							serviceType: "Towing Service",
							providerMobility: "dynamic",
						},
						{
							"@type": "Service",
							name: "Pomoc Drogowa (Polski Serwis)",
							description:
								"Holowanie i pomoc drogowa dla Polaków w Austrii. Obsługa autostrad A2/S1.",
						},
					],
				},
				{
					"@type": "OfferCatalog",
					name: "Autohandel (Gebrauchtwagen)",
					itemListElement: [
						{
							"@type": "Offer",
							name: "Gebrauchtwagen Verkauf & Ankauf",
							description:
								"Zertifizierte Fahrzeuge mit Gewährleistung, carLOG-Historie und Finanzierung.",
							itemOffered: { "@type": "Car", name: "Gebrauchtwagenbestand" },
						},
						{
							"@type": "Service",
							name: "Export Service & Autoankauf",
							description:
								"Skup aut za gotówkę i pomoc w eksporcie (Zollkennzeichen).",
						},
					],
				},
				{
					"@type": "OfferCatalog",
					name: "Vermietung (Mietwagen & Immobilien)",
					itemListElement: [
						{
							"@type": "RentalVehicleUsage",
							name: "Transporter & Mietwagen Verleih",
							description:
								"Mietwagen ohne Kreditkarte, Unfallersatzwagen, 9-Sitzer Busse.",
							priceSpecification: {
								"@type": "UnitPriceSpecification",
								priceCurrency: "EUR",
								referenceQuantity: {
									"@type": "QuantitativeValue",
									value: "1",
									unitCode: "DAY",
								},
							},
						},
						{
							"@type": "RealEstateListing",
							name: "Immobilienverwaltung & Vermietung",
							description:
								"Zarządzanie najmem dla właścicieli i mieszkania bez prowizji.",
						},
					],
				},
				{
					"@type": "OfferCatalog",
					name: "Transport & Logistik",
					itemListElement: [
						{
							"@type": "Service",
							name: "Umzugsservice Wien & NÖ",
							description:
								"Privatumzüge ohne Stockwerkzuschlag, Montage und Verpackung.",
							serviceType: "Moving Service",
						},
						{
							"@type": "Service",
							name: "Transport Polska-Austria",
							description:
								"Regularna linia transportowa, przewóz mebli i paczek.",
						},
					],
				},
			],
		},
	};
};
