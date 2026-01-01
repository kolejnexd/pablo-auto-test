import { Vehicle } from '../types';
import { company } from '../siteConfig';
import { WithContext, Vehicle as SchemaVehicle, Car, Organization, QuantitativeValue, ItemList } from 'schema-dts';
import { getRoute, Locale } from '../routes';

// ... helper functions omitted for brevity in replacement if possible, but I must replace the whole block or be precise ...
// I will replace the import and the buildVehicleJsonLd and buildListingJsonLd functions entirely to be safe and clean.

// Helper to sanitise undefined/null
function clean<T extends object>(obj: T): T {
    const newObj = {} as T;
    Object.keys(obj).forEach((key) => {
        const k = key as keyof T;
        if (obj[k] !== undefined && obj[k] !== null && obj[k] !== '') {
            newObj[k] = obj[k];
        }
    });
    return newObj;
}

// Helper for dates
function formatDate(dateStr?: string | number): string | undefined {
    if (!dateStr) return undefined;
    // If only year is given
    if (typeof dateStr === 'number' || (typeof dateStr === 'string' && dateStr.length === 4)) {
        return `${dateStr}`;
    }
    // Try to keep YYYY-MM-DD
    return String(dateStr).split('T')[0];
}

// Helper to standardise Fuel
function mapFuel(fuel: string): string {
    const map: Record<string, string> = {
        'Diesel': 'Diesel',
        'Benzin': 'Gasoline',
        'Elektro': 'Electric',
        'Hybrid': 'Hybrid',
        'Gas': 'LPG'
    };
    // Return mapped or original if not found (Google accepts strict text too)
    return map[fuel] || fuel;
}

// Helper to standardise Transmission
function mapTransmission(trans: string): string | undefined {
    const t = trans.toLowerCase();
    if (t.includes('automatik') || t.includes('automatic')) return 'Automatic';
    if (t.includes('schalt') || t.includes('manual')) return 'Manual';
    return trans; // Fallback
}

export function buildVehicleJsonLd(vehicle: Vehicle, locale: string = 'de'): WithContext<Car> {
    const currentLocale = (locale as Locale) || 'de';
    // Get base path for vehicles in current locale, e.g. /autohandel-gebrauchtwagen (DE) or /skup-aut-handel (PL)
    const vehiclesPath = getRoute('vehicles', currentLocale);
    // Ensure path has leading slash (getRoute usually does, but to be sure)
    const vehiclesRoute = vehiclesPath.startsWith('/') ? vehiclesPath : `/${vehiclesPath}`;

    const vehicleUrl = `${company.website}${vehiclesRoute}/${vehicle.slug}`;

    // 1. Seller Organization
    const seller: Organization = {
        '@type': 'AutoDealer',
        name: company.name,
        address: {
            '@type': 'PostalAddress',
            streetAddress: company.address.split(',')[0],
            addressLocality: company.address.split(',')[1].trim().split(' ')[1],
            postalCode: company.address.split(',')[1].trim().split(' ')[0],
            addressCountry: 'AT'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: company.geo.lat,
            longitude: company.geo.lon
        },
        hasMap: company.mapUrl,
        telephone: company.phone,
        email: company.email,
        url: company.website,
        vatID: company.vat
    };

    // 2. Offer
    // Calculate validUntil (required by Google) -> Today + 60 days
    const validUntilDate = new Date();
    validUntilDate.setDate(validUntilDate.getDate() + 60);
    const priceValidUntil = validUntilDate.toISOString().split('T')[0];

    const priceSpec = {
        price: vehicle.price,
        priceCurrency: 'EUR'
    };


    // 3. Main Vehicle Object
    const schema: Car = {
        '@type': 'Car', // Most specific type, Google prefers Car over Vehicle if applicable
        name: vehicle.title,
        description: vehicle.description?.replace(/<[^>]+>/g, '').substring(0, 300), // Strip HTML, truncate to avoid errors
        image: vehicle.image ? [vehicle.image, ...(vehicle.gallery?.map(g => g.url) || [])] : undefined,
        url: vehicleUrl,
        brand: {
            '@type': 'Brand',
            name: vehicle.make
        },
        model: vehicle.model,
        vehicleIdentificationNumber: vehicle.vin,
        productionDate: formatDate(vehicle.year),
        vehicleModelDate: formatDate(vehicle.year),
        dateVehicleFirstRegistered: vehicle.firstRegistration ? formatDate(vehicle.firstRegistration) : undefined,
        mileageFromOdometer: {
            '@type': 'QuantitativeValue',
            value: vehicle.mileage,
            unitCode: 'KMT' // Kilometers
        } as QuantitativeValue,
        fuelType: mapFuel(vehicle.fuel),
        vehicleTransmission: mapTransmission(vehicle.transmission),
        color: vehicle.color,
        numberOfDoors: vehicle.doors,
        numberOfAirbags: vehicle.airbags, // Google accepts number or text
        vehicleSeatingCapacity: vehicle.seats,

        // Extended properties
        bodyType: vehicle.category,
        driveWheelConfiguration: vehicle.driveType, // e.g., "All-wheel Drive" or "4x4"

        // NEW: Engine Specification
        vehicleEngine: vehicle.cubicCapacity ? {
            '@type': 'EngineSpecification',
            engineDisplacement: {
                '@type': 'QuantitativeValue',
                value: vehicle.cubicCapacity,
                unitCode: 'CMQ' // Cubic Centimetre
            },
            fuelType: mapFuel(vehicle.fuel)
        } : undefined,

        // NEW: Weights
        weightTotal: vehicle.licensedWeight ? {
            '@type': 'QuantitativeValue',
            value: vehicle.licensedWeight,
            unitCode: 'KGM'
        } : undefined,
        weight: vehicle.netWeight ? {
            '@type': 'QuantitativeValue',
            value: vehicle.netWeight,
            unitCode: 'KGM'
        } : undefined,
        payload: vehicle.payload ? {
            '@type': 'QuantitativeValue',
            value: vehicle.payload,
            unitCode: 'KGM'
        } : undefined,


        // details removed as non-standard

        offers: {
            '@type': 'Offer',
            url: vehicleUrl,
            price: vehicle.price,
            priceCurrency: 'EUR',
            priceValidUntil: priceValidUntil,
            availability: vehicle.isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
            itemCondition: 'https://schema.org/UsedCondition', // Assuming used cars mostly
            seller: seller
        }
    };

    // CO2 Emissions (Optional but good)
    if (vehicle.co2) {
        (schema as any).emissionsCO2 = vehicle.co2; // Type intersection might be needed if schema-dts is strict
    }

    // Clean empty values
    return {
        '@context': 'https://schema.org',
        ...clean(schema)
    } as WithContext<Car>;
}

export function buildListingJsonLd(vehicles: Vehicle[], locale: string = 'de'): WithContext<ItemList> {
    const currentLocale = (locale as Locale) || 'de';
    const vehiclesPath = getRoute('vehicles', currentLocale);
    const vehiclesRoute = vehiclesPath.startsWith('/') ? vehiclesPath : `/${vehiclesPath}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: vehicles.map((v, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${company.website}${vehiclesRoute}/${v.slug}`,
            name: v.title // Google likes name in list item
        }))
    };
}
