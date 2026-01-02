import React from "react";
import {
	ContactPoint,
	FAQPage,
	type Graph,
	LocalBusiness,
	Offer,
	OfferCatalog,
	Thing,
	WebPage,
	WebSite,
	WithContext,
} from "schema-dts";

// Pivot: Using a custom type that extends LocalBusiness for multi-type support since schema-dts might be strict
// We will cast to WithContext<Graph> at the end.

const SeoJsonLd = () => {
	const baseUrl = "https://pablo-auto.at";

	const graph: Graph = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": `${baseUrl}/#website`,
				url: `${baseUrl}/`,
				name: "Pablo e.U. Autohandel & Abschleppdienst",
				inLanguage: ["de-AT", "pl-PL", "en-US"],
			},
			{
				"@type": "WebPage",
				"@id": `${baseUrl}/#webpage`,
				url: `${baseUrl}/`,
				name: "Pablo e.U. Sollenau & Wien | Abschleppdienst A2, Autohandel & Vermietung",
				isPartOf: { "@id": `${baseUrl}/#website` },
				about: { "@id": `${baseUrl}/#business` },
				inLanguage: "de-AT",
			},
			{
				// Multi-type definition hack for TypeScript
				"@type": [
					"LocalBusiness",
					"AutomotiveBusiness",
					"AutoDealer",
					"AutoRental",
				] as any,
				"@id": `${baseUrl}/#business`,
				name: "Pablo e.U. Autohandel & Abschleppdienst",
				url: `${baseUrl}/`,
				telephone: "+436641261735",
				image: `${baseUrl}/assets/seo/pablo-eu-abschleppdienst-a2-autohandel-sollenau-hero.webp`,
				description:
					"Ihr Partner für Mobilität an der A2: Abschleppdienst in 30 Min (Wien–Baden), zertifizierter Gebrauchtwagen-Handel, Mietwagen ohne Kreditkarte & Transport. Seit 2018.",
				priceRange: "€€",
				currenciesAccepted: "EUR",
				address: {
					"@type": "PostalAddress",
					streetAddress: "Industriestraße 1",
					addressLocality: "Sollenau",
					postalCode: "2601",
					addressCountry: "AT",
				},
				geo: {
					"@type": "GeoCoordinates",
					latitude: 47.91083,
					longitude: 16.256,
				},
				openingHoursSpecification: [
					{
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
				],
				founder: { "@type": "Person", name: "Paweł Bogusław Ferdynus" },
				foundingDate: "2018-09-01",
				vatID: "ATU77674349",
				identifier: [
					{ "@type": "PropertyValue", name: "FN", value: "591679 t" },
				],
				knowsLanguage: ["de-AT", "pl-PL", "en-US"],
				areaServed: [
					"Wien",
					"Sollenau",
					"Baden",
					"Wiener Neustadt",
					"A2 Südautobahn",
				],
				contactPoint: [
					{
						"@type": "ContactPoint",
						telephone: "+436641261735",
						contactType: "emergency",
						availableLanguage: ["de-AT", "pl-PL", "en-US"],
					},
				],
				hasOfferCatalog: {
					"@type": "OfferCatalog",
					name: "Leistungen",
					itemListElement: [
						{
							"@type": "Offer",
							itemOffered: {
								"@type": "Service",
								name: "Abschleppdienst",
								serviceType: "Abschleppdienst A2 & Wien (24/7)",
							},
						},
						{
							"@type": "Offer",
							itemOffered: {
								"@type": "Service",
								name: "Autohandel",
								serviceType: "Gebrauchtwagenverkauf & Autoankauf",
							},
						},
						{
							"@type": "Offer",
							itemOffered: {
								"@type": "Service",
								name: "Vermietung",
								serviceType: "Mietwagen & Transporter (auch ohne Kreditkarte)",
							},
						},
						{
							"@type": "Offer",
							itemOffered: {
								"@type": "Service",
								name: "Transport",
								serviceType: "Transport & Umzug (Wien / AT–PL)",
							},
						},
					],
				} as any,
			},
			{
				"@type": "FAQPage",
				"@id": `${baseUrl}/#faq`,
				isPartOf: { "@id": `${baseUrl}/#webpage` },
				mainEntity: [
					{
						"@type": "Question",
						name: "Kann ich mein Elektroauto (Tesla) bei Ihnen abschleppen lassen?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Ja. Pablo e.U. nutzt spezielles Equipment für Hochvolt-Fahrzeuge, um Batterieschäden zu vermeiden. Unser Team ist zertifiziert.",
						},
					},
					{
						"@type": "Question",
						name: "Bieten Sie Mietwagen ohne Kreditkarte an?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Ja, an unserem Standort in Sollenau akzeptieren wir für Transporter und PKW auch eine Bar-Kaution.",
						},
					},
					{
						"@type": "Question",
						name: "Wie schnell sind Sie bei einer Panne auf der A2?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Durch unseren Sitz in Sollenau sind wir im Bereich Baden–Wien meist in unter 30 Minuten bei Ihnen.",
						},
					},
					{
						"@type": "Question",
						name: "Kaufen Sie Autos mit polnischen Kennzeichen?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Ja, wir kaufen Fahrzeuge aller Länderkennzeichen und kümmern uns um den Export.",
						},
					},
				],
			},
		],
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
		/>
	);
};

export default SeoJsonLd;
