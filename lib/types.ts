export type VehicleCategory =
	| "PKW"
	| "Nutzfahrzeug"
	| "Transporter"
	| "Anhänger"
	| "Moped"
	| "Motorrad";

// 1. Interfejs dla danych, które przychodzą z WordPressa (ACF)
export interface WPVehicle {
	id: number;
	date: string;
	slug: string;
	title: {
		rendered: string;
	};
	content: {
		rendered: string;
	};
	acf: {
		// Basic Info
		fahrzeug_marke: string;
		fahrzeug_modell: string;
		fahrzeug_subtitle?: string;
		fahrzeug_typ_detail?: string;

		// Tech Specs
		fahrzeug_baujahr: string; // YYYY
		fahrzeug_erstzulassung?: string;
		erstzulassung?: string; // fallback
		fahrzeug_km?: number;
		kilometerstand?: number; // fallback
		fahrzeug_kraftstoff: string;
		kraftstoffart?: string; // fallback
		fahrzeug_getriebe: string;
		getriebe?: string; // fallback
		fahrzeug_leistung?: string;
		leistung_ps?: number; // fallback
		fahrzeug_vin?: string;
		fahrzeug_farbe?: string;
		fahrzeug_sitze?: number;
		fahrzeug_tueren?: number;

		// Classification
		fahrzeug_kategorie?: string;
		fahrzeug_baureihe?: string;
		fahrzeug_ausstattungslinie?: string;

		// Eco / Drive
		fahrzeug_antriebsart?: string;
		fahrzeug_energietraeger?: string;
		fahrzeug_energieverbrauch?: string;
		fahrzeug_co2_emissionen?: string;

		// Features
		fahrzeug_klimatisierung?: string;
		fahrzeug_einparkhilfe?: string;
		fahrzeug_airbags?: string;
		fahrzeug_ausstattung?: string; // Multiline string w/ HTML or newlines

		// Weights
		fahrzeug_anhaengelast_gebremst?: string;
		fahrzeug_anhaengelast_ungebremst?: string;
		fahrzeug_gewicht_netto?: string;

		// Codes
		fahrzeug_hsn?: string;
		fahrzeug_tsn?: string;

		// Status & Price
		fahrzeug_preis?: number;
		preis?: number; // fallback
		fahrzeug_preis_netto?: number;
		fahrzeug_preis_brutto?: number;
		fahrzeug_mwst_satz?: number;
		fahrzeug_mwst_text?: string;
		preis_status: string; // "Fixpreis", "Verhandelbar", etc.

		fahrzeug_verfuegbar: boolean;
		fahrzeug_standort: string;
		fahrzeug_pickerl?: string; // Ymd

		// Media & Desc
		fahrzeug_galerie?: Array<{
			ID: number;
			url: string;
			alt: string;
			sizes: {
				medium: string;
				large: string;
				thumbnail: string;
			};
		}>;
		fahrzeug_video?: string; // URL
		zustand_kurzbeschreibung?: string;
		fahrzeug_zustand_detail?: string;

		// NEW FIELDS from PHP Reference
		fahrzeug_construction_year?: string;
		fahrzeug_cubic_capacity?: string; // cm3
		fahrzeug_cylinders?: string;
		fahrzeug_fuel_tank_volume?: string; // L

		fahrzeug_envkv_energy_consumption?: string;
		fahrzeug_envkv_co2_emissions?: string;
		fahrzeug_envkv_co2_class?: string;
		fahrzeug_envkv_consumption_fuel_details?: string;

		fahrzeug_licensed_weight?: string; // DMC
		fahrzeug_payload?: string; // Ładowność
		fahrzeug_net_weight?: string; // Masa własna
		fahrzeug_trailer_braked?: string;
		fahrzeug_trailer_unbraked?: string;

		fahrzeug_climatisation?: string;
		fahrzeug_airbag?: string;
		fahrzeug_park_assists?: string;
		fahrzeug_mwst_hinweis?: boolean; // true/false
	};
	_embedded?: {
		"wp:featuredmedia"?: Array<{
			source_url: string;
			alt_text?: string;
		}>;
	};
}

// 2. Twój "czysty" interfejs używany w komponentach Next.js
export interface Vehicle {
	slug: string;
	title: string;
	subtitle?: string;
	category: VehicleCategory | string; // Allow string fallback

	// Specs
	make: string;
	model: string;
	year: number;
	firstRegistration?: string;
	mileage: number;
	fuel: string;
	transmission: string;
	power: string;
	vin?: string;
	color?: string;
	seats?: number;
	doors?: number;

	// Extended Specs
	series?: string; // Baureihe
	trimLine?: string; // Ausstattungslinie
	driveType?: string; // Antriebsart
	energySource?: string;
	consumption?: string;
	co2?: string;
	climateControl?: string;
	parkingSensors?: string;
	airbags?: string;
	towingCapBraked?: string;
	towingCapUnbraked?: string;
	weightNet?: string;
	hsn?: string;
	tsn?: string;

	equipmentList: string[]; // Parsed list

	// Price & Status
	price: number;
	priceNetto?: number;
	priceBrutto?: number;
	vatRate?: number;
	vatText?: string;
	priceStatus: string;
	isAvailable: boolean;
	location: string;
	pickerl?: string;

	// Content
	description: string;
	conditionDescription?: string;
	conditionDetail?: string;

	// Media
	image: string;
	gallery: Array<{
		url: string;
		thumb: string;
		alt: string;
	}>;
	videoUrl?: string;

	// New Fields
	constructionYear?: number;
	cubicCapacity?: number;
	cylinders?: number;
	fuelTankVolume?: number;

	envEnergy?: string;
	envCo2?: string;
	envCo2Class?: string;
	envFuelDetails?: string;

	licensedWeight?: number;
	payload?: number;
	netWeight?: number;

	climatisation?: string;
	parkAssists?: string;
	mwstHinweis?: boolean;
}

// 3. Lightweight listing interface
export interface VehicleListing {
	slug: string;
	title: string;
	image: string; // derived from acf.fahrzeug_galerie[0]

	price: number;
	priceNetto?: number; // displayed via badge
	priceGross: number; // primary display
	vatRate?: number;
	priceStatus: string;

	year: number;
	mileage: number;
	fuel: string;
	transmission: string;
	power: string; // kW/PS

	isAvailable: boolean; // badge
	category: string; // badge (PKW/Nutz...)

	make: string;
	model: string;
	subtitle?: string; // used for title construction
}

export interface VehicleListingResponse {
	vehicles: VehicleListing[];
	totalPages: number;
	total: number;
}
