import type {
	Vehicle,
	VehicleListing,
	VehicleListingResponse,
	WPVehicle,
} from "./types";

const WP_API_URL =
	process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://panel.pablo-auto.at";

function mapWpToVehicle(wpItem: WPVehicle): Vehicle {
	const acf = wpItem.acf;

	// Wyciąganie roku z daty ACF (format Ymd lub YYYY)
	let year = 2024;
	if (acf.fahrzeug_baujahr) {
		year = Number.parseInt(acf.fahrzeug_baujahr);
	} else if (acf.erstzulassung) {
		year = Number.parseInt(String(acf.erstzulassung).substring(0, 4));
	}

	const imageUrl =
		wpItem._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
		"/assets/placeholder-car.webp";

	// Mapowanie galerii
	const gallery =
		(Array.isArray(acf.fahrzeug_galerie) ? acf.fahrzeug_galerie : [])?.map(
			(img) => ({
				url: img.url,
				thumb: img.sizes.medium,
				alt: img.alt,
			}),
		) || [];

	// Obliczanie cen
	const priceNet = Number(acf.fahrzeug_preis_netto) || 0;
	const vatRate = Number(acf.fahrzeug_mwst_satz) || 0;
	let priceGross =
		Number(acf.fahrzeug_preis_brutto) ||
		Number(acf.fahrzeug_preis) ||
		Number(acf.preis) ||
		0;

	// Logika z PHP: jeśli brutto puste, ale jest netto i VAT > 0 -> wylicz brutto
	if ((!priceGross || priceGross === 0) && priceNet > 0 && vatRate > 0) {
		priceGross = priceNet * (1 + vatRate / 100);
	}
	// Jeśli wciąż 0, wrzuć netto jako główne (lub odwrotnie sprawdzić)
	// W interface frontendowym używamy 'price' jako głównej ceny do wyświetlania.
	const finalPrice = priceGross > 0 ? priceGross : priceNet;

	// Parsowanie wyposażenia (lista tekstowa, czasem z HTML <br>)
	let equipmentList: string[] = [];
	if (acf.fahrzeug_ausstattung) {
		const raw = String(acf.fahrzeug_ausstattung)
			.replace(/<br\s*\/?>/gi, "\n") // zamień <br> na newline
			.replace(/<[^>]+>/g, ""); // usuń resztę tagów HTML (strip tags)
		equipmentList = raw
			.split(/\r\n|\n|\r/)
			.map((s) => s.trim())
			.filter((s) => s.length > 0);
	}

	return {
		slug: wpItem.slug,
		title: wpItem.title.rendered,
		subtitle: acf.fahrzeug_subtitle,
		category: acf.fahrzeug_kategorie || "PKW", // Placeholder, jeśli nie ma logiki taksonomii

		make: acf.fahrzeug_marke || "",
		model: acf.fahrzeug_modell || "",
		year: year,
		firstRegistration: acf.fahrzeug_erstzulassung,
		mileage: Number(acf.fahrzeug_km || acf.kilometerstand || 0),
		fuel: acf.fahrzeug_kraftstoff || acf.kraftstoffart || "Nicht angegeben",
		transmission: acf.fahrzeug_getriebe || acf.getriebe || "Nicht angegeben",
		power:
			acf.fahrzeug_leistung || (acf.leistung_ps ? `${acf.leistung_ps} PS` : ""),
		vin: acf.fahrzeug_vin,
		color: acf.fahrzeug_farbe,
		seats: Number(acf.fahrzeug_sitze) || undefined,
		doors: Number(acf.fahrzeug_tueren) || undefined,

		// Extended
		series: acf.fahrzeug_baureihe,
		trimLine: acf.fahrzeug_ausstattungslinie,
		driveType: acf.fahrzeug_antriebsart,
		energySource: acf.fahrzeug_energietraeger,
		consumption: acf.fahrzeug_energieverbrauch,
		// co2 mapped below to envCo2
		climateControl: acf.fahrzeug_klimatisierung,
		parkingSensors: acf.fahrzeug_einparkhilfe,
		airbags: acf.fahrzeug_airbags,
		// towing and weight mapped below to new fields
		hsn: acf.fahrzeug_hsn,
		tsn: acf.fahrzeug_tsn,

		equipmentList,

		price: finalPrice,
		priceNetto: priceNet,
		priceBrutto: priceGross,
		vatRate: vatRate,
		vatText: acf.fahrzeug_mwst_text,
		priceStatus: acf.preis_status || "Fixpreis",
		mwstHinweis: acf.fahrzeug_mwst_hinweis,

		isAvailable: acf.fahrzeug_verfuegbar !== false, // Default true
		location: acf.fahrzeug_standort || "Sollenau",
		pickerl: acf.fahrzeug_pickerl,

		description: wpItem.content.rendered, // Pełny opis HTML
		conditionDescription: acf.zustand_kurzbeschreibung,
		conditionDetail: acf.fahrzeug_zustand_detail,

		image: imageUrl,
		gallery: gallery,
		videoUrl: acf.fahrzeug_video,

		// New Mapped Fields
		constructionYear: Number(acf.fahrzeug_construction_year) || undefined,
		cubicCapacity: Number(acf.fahrzeug_cubic_capacity) || undefined,
		cylinders: Number(acf.fahrzeug_cylinders) || undefined,
		fuelTankVolume: Number(acf.fahrzeug_fuel_tank_volume) || undefined,

		envEnergy: acf.fahrzeug_envkv_energy_consumption,
		envCo2: acf.fahrzeug_envkv_co2_emissions || acf.fahrzeug_co2_emissionen, // fallback to old field if needed
		envCo2Class: acf.fahrzeug_envkv_co2_class,
		envFuelDetails: acf.fahrzeug_envkv_consumption_fuel_details,

		licensedWeight: Number(acf.fahrzeug_licensed_weight) || undefined,
		payload: Number(acf.fahrzeug_payload) || undefined,
		netWeight: Number(acf.fahrzeug_net_weight) || undefined,
		towingCapBraked:
			acf.fahrzeug_trailer_braked || acf.fahrzeug_anhaengelast_gebremst,
		towingCapUnbraked:
			acf.fahrzeug_trailer_unbraked || acf.fahrzeug_anhaengelast_ungebremst,

		climatisation: acf.fahrzeug_climatisation || acf.fahrzeug_klimatisierung,
		// airbags mapped above
		parkAssists: acf.fahrzeug_park_assists || acf.fahrzeug_einparkhilfe,
	};
}

export async function getAllVehicles(): Promise<Vehicle[]> {
	// Dodajemy parametry:
	// _embed -> aby pobrać zdjęcie wyróżniające
	// acf_format=standard -> aby dostać czytelne pola ACF
	// per_page=100 -> pobieramy do 100 aut na raz
	// Use ?rest_route= parameter to bypass potential server rewrite issues
	const endpoint = `${WP_API_URL}/index.php?rest_route=/wp/v2/fahrzeuge&_embed&acf_format=standard&per_page=100&status=publish`;

	try {
		const res = await fetch(endpoint, {
			next: { revalidate: 60 }, // ISR: Odświeżaj dane co 60 sekund
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
		}

		const data: WPVehicle[] = await res.json();

		// Mapujemy surowe dane z WP na Twój format aplikacji
		return data.map(mapWpToVehicle);
	} catch (error) {
		console.error("Error fetching vehicles from WP:", error);
		return []; // Zwracamy pustą tablicę w razie błędu, żeby strona się nie wywaliła
	}
}

export async function getLatestVehicles(count = 3): Promise<Vehicle[]> {
	const endpoint = `${WP_API_URL}/index.php?rest_route=/wp/v2/fahrzeuge&_embed&acf_format=standard&per_page=${count}&status=publish&orderby=date&order=desc`;

	try {
		const res = await fetch(endpoint, {
			next: { revalidate: 60 },
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch latest vehicles: ${res.statusText}`);
		}

		const data: WPVehicle[] = await res.json();
		return data.map(mapWpToVehicle);
	} catch (error) {
		console.error("Error fetching latest vehicles from WP:", error);
		return [];
	}
}

/**
 * Pobiera jeden pojazd po slugu (do strony szczegółów)
 */
export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
	const endpoint = `${WP_API_URL}/index.php?rest_route=/wp/v2/fahrzeuge&_embed&acf_format=standard&slug=${slug}`;

	try {
		const res = await fetch(endpoint, { next: { revalidate: 60 } });

		if (!res.ok) {
			throw new Error(`Failed to fetch vehicle ${slug}: ${res.statusText}`);
		}

		const data: WPVehicle[] = await res.json();

		if (!data || data.length === 0) return null;

		return mapWpToVehicle(data[0]);
	} catch (error) {
		console.error(`Error fetching vehicle ${slug}:`, error);
		return null;
	}
}

export async function getSitemapVehicles(): Promise<
	{ slug: string; modified: string }[]
> {
	const endpoint = `${WP_API_URL}/index.php?rest_route=/wp/v2/fahrzeuge&per_page=100&status=publish&_fields=slug,modified`;

	try {
		const res = await fetch(endpoint, { next: { revalidate: 3600 } });
		if (!res.ok) throw new Error(res.statusText);
		const data = await res.json();
		return data as { slug: string; modified: string }[];
	} catch (error) {
		console.error("Error fetching sitemap vehicles:", error);
		return [];
	}
}

/**
 * Zoptymalizowane mapowanie dla listingu (bez ciężkich pól)
 */
function mapWpToVehicleListing(wpItem: WPVehicle): VehicleListing {
	const acf = wpItem.acf;

	// Year logic
	let year = 2024;
	if (acf.fahrzeug_baujahr) year = Number.parseInt(acf.fahrzeug_baujahr);
	else if (acf.erstzulassung)
		year = Number.parseInt(String(acf.erstzulassung).substring(0, 4));

	// Image - First item from gallery or placeholder (No _embed)
	// Logic: Try to get from acf.fahrzeug_galerie first as it is more reliable in this filtered context
	let imageUrl = "/assets/placeholder-car.webp";
	if (Array.isArray(acf.fahrzeug_galerie) && acf.fahrzeug_galerie.length > 0) {
		// Prefer "medium"
		const firstImg = acf.fahrzeug_galerie[0];
		imageUrl = firstImg.sizes?.medium || firstImg.url;
	}

	// Price logic
	const priceNet = Number(acf.fahrzeug_preis_netto) || 0;
	const vatRate = Number(acf.fahrzeug_mwst_satz) || 0;
	let priceGross =
		Number(acf.fahrzeug_preis_brutto) ||
		Number(acf.fahrzeug_preis) ||
		Number(acf.preis) ||
		0;

	if ((!priceGross || priceGross === 0) && priceNet > 0 && vatRate > 0) {
		priceGross = priceNet * (1 + vatRate / 100);
	}
	const finalPrice = priceGross > 0 ? priceGross : priceNet;

	// Power logic
	const power =
		acf.fahrzeug_leistung ||
		(acf.leistung_ps ? `${acf.leistung_ps} PS` : "k.A.");

	return {
		slug: wpItem.slug,
		title: wpItem.title.rendered,
		subtitle: acf.fahrzeug_subtitle,
		image: imageUrl,

		price: finalPrice,
		priceGross: priceGross,
		priceNetto: priceNet,
		vatRate: vatRate,
		priceStatus: acf.preis_status || "Fixpreis",

		year: year,
		mileage: Number(acf.fahrzeug_km || acf.kilometerstand || 0),
		fuel: acf.fahrzeug_kraftstoff || acf.kraftstoffart || "k.A.",
		transmission: acf.fahrzeug_getriebe || acf.getriebe || "k.A.",
		power: power,

		isAvailable: acf.fahrzeug_verfuegbar !== false,
		category: acf.fahrzeug_kategorie || "PKW",

		make: acf.fahrzeug_marke || "",
		model: acf.fahrzeug_modell || "",
	};
}

export async function getVehicleListings(
	page = 1,
	perPage = 24,
): Promise<VehicleListingResponse> {
	// Use _fields to limit payload size significantly. NO _embed.
	const fields = "id,slug,title,acf,modified,status";
	const endpoint = `${WP_API_URL}/index.php?rest_route=/wp/v2/fahrzeuge&acf_format=standard&per_page=${perPage}&page=${page}&status=publish&orderby=date&order=desc&_fields=${fields}`;

	try {
		const res = await fetch(endpoint, {
			next: { revalidate: 60 },
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch listing: ${res.statusText}`);
		}

		const totalPages = Number(res.headers.get("X-WP-TotalPages") || "1");
		const total = Number(res.headers.get("X-WP-Total") || "0");
		const data: WPVehicle[] = await res.json();

		return {
			vehicles: data.map(mapWpToVehicleListing),
			totalPages,
			total,
		};
	} catch (error) {
		console.error("Error fetching vehicle listings:", error);
		return { vehicles: [], totalPages: 0, total: 0 };
	}
}
