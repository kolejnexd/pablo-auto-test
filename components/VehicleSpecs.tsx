import React from 'react';
import { Vehicle } from '@/lib/types';
import { Translations, Locale } from '@/lib/i18n';

interface VehicleSpecsProps {
    vehicle: Vehicle;
    t: Translations;
    locale: Locale;
    className?: string;
}

export default function VehicleSpecs({ vehicle, t, locale, className = '' }: VehicleSpecsProps) {
    const numberLocale = locale === 'de' ? 'de-AT' : 'pl-PL';
    const numberFormatter = new Intl.NumberFormat(numberLocale);

    const formatNumber = (val?: number | string) => {
        if (val === undefined || val === null || val === '') return '';
        const num = Number(val);
        return isNaN(num) ? String(val) : numberFormatter.format(num);
    };

    return (
        <div className={`bg-gray-50 p-6 rounded-2xl border border-gray-200 ${className}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 border-gray-200">
                {t.vehicleDetail.techSpecs}
            </h3>

            <div className="space-y-0 text-sm">
                <SpecRow label={t.vehicleDetail.make} value={vehicle.make} />
                <SpecRow label={t.vehicleDetail.model} value={vehicle.model} />
                <SpecRow label={t.vehicleDetail.year} value={vehicle.year} />
                <SpecRow label={t.vehicleDetail.firstRegistration} value={vehicle.firstRegistration} />
                <SpecRow label={t.vehicleDetail.mileage} value={`${formatNumber(vehicle.mileage)} km`} />
                <SpecRow label={t.vehicleDetail.fuel} value={vehicle.fuel} />
                <SpecRow label={t.vehicleDetail.transmission} value={vehicle.transmission} />

                <div className="my-4 border-t border-gray-200 pt-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">{t.vehicleDetail.sectionEngine}</p>
                    <SpecRow label={t.vehicleDetail.cubicCapacity} value={vehicle.cubicCapacity ? `${formatNumber(vehicle.cubicCapacity)} cm³` : undefined} />
                    <SpecRow label={t.vehicleDetail.cylinders} value={vehicle.cylinders} />
                    <SpecRow label={t.vehicleDetail.power} value={vehicle.power} />
                    <SpecRow label={t.vehicleDetail.fuelTank} value={vehicle.fuelTankVolume ? `${formatNumber(vehicle.fuelTankVolume)} l` : undefined} />
                    <SpecRow label={t.vehicleDetail.envEnergy} value={vehicle.envEnergy} />
                    <SpecRow label={t.vehicleDetail.envCo2} value={vehicle.envCo2} />
                    <SpecRow label={t.vehicleDetail.envCo2Class} value={vehicle.envCo2Class} />
                </div>

                <div className="my-4 border-t border-gray-200 pt-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">{t.vehicleDetail.sectionComfort}</p>
                    <SpecRow label={t.vehicleDetail.climateControl} value={vehicle.climateControl || vehicle.climatisation} />
                    <SpecRow label={t.vehicleDetail.parkingSensors} value={vehicle.parkingSensors || vehicle.parkAssists} />
                    <SpecRow label={t.vehicleDetail.airbags} value={vehicle.airbags} />
                </div>

                <div className="my-4 border-t border-gray-200 pt-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">{t.vehicleDetail.sectionWeights}</p>
                    <SpecRow label={t.vehicleDetail.weightTotal} value={vehicle.licensedWeight ? `${formatNumber(vehicle.licensedWeight)} kg` : undefined} />
                    <SpecRow label={t.vehicleDetail.weightNet} value={vehicle.netWeight ? `${formatNumber(vehicle.netWeight)} kg` : undefined} />
                    <SpecRow label={t.vehicleDetail.payload} value={vehicle.payload ? `${formatNumber(vehicle.payload)} kg` : undefined} />
                    <SpecRow label={t.vehicleDetail.towingCapBraked} value={vehicle.towingCapBraked} />
                    <SpecRow label={t.vehicleDetail.towingCapUnbraked} value={vehicle.towingCapUnbraked} />
                </div>

                {/* VIN Section Obfuscated */}
                {vehicle.vin && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                        <span className="block text-xs text-gray-500 uppercase mb-1">{t.vehicleDetail.vin}</span>
                        <div className="relative group cursor-pointer">
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-10 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-800 bg-white/80 px-2 py-1 rounded shadow-sm border border-gray-100">
                                    {t.vehicleDetail.vinHidden}
                                </span>
                            </div>
                            <span className="font-mono text-gray-400 blur-sm select-none">
                                {vehicle.vin}
                            </span>
                            <a
                                href={`https://wa.me/436641261735?text=${encodeURIComponent(`Hallo, ich interessiere mich für die Fahrgestellnummer des Fahrzeugs: ${vehicle.title}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90"
                            >
                                <div className="flex items-center gap-1 text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded-full border border-green-200 shadow-sm">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                    WhatsApp
                                </div>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function SpecRow({ label, value }: { label: string, value?: string | number }) {
    if (value === undefined || value === null || value === '' || value === 0 || value === '0') return null;

    return (
        <div className="flex justify-between py-2 border-b border-gray-200 last:border-0">
            <span className="text-gray-500 text-sm">{label}</span>
            <span className="font-semibold text-gray-900 text-right ml-4 text-sm">{value}</span>
        </div>
    );
}
