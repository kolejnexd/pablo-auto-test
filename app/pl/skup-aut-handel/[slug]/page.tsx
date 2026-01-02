import VehicleGallery from "@/components/VehicleGallery";
import VehicleSpecs from "@/components/VehicleSpecs";
import { getTranslations } from "@/lib/i18n";
import { getRoute } from "@/lib/routes";
import { generateVehicleAlternates } from "@/lib/seo/metadataUtils";
import { buildVehicleJsonLd } from "@/lib/seo/vehicleJsonLd";
import { getServerLocale } from "@/lib/serverLocale";
import { getVehicleBySlug } from "@/lib/wpClient";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ slug: string }>;
}

// 1. Dynamic SEO & Metadata
export async function generateMetadata(props: Props) {
	const params = await props.params;
	const vehicle = await getVehicleBySlug(params.slug);
	const locale = await getServerLocale();

	if (!vehicle) {
		return { title: "Pojazd nie znaleziony" };
	}

	return {
		title: vehicle.title,
		description: vehicle.description?.replace(/<[^>]+>/g, "").substring(0, 160),
		alternates: generateVehicleAlternates(vehicle.slug, locale),
		openGraph: {
			title: vehicle.title,
			description: vehicle.description
				?.replace(/<[^>]+>/g, "")
				.substring(0, 160),
			images: vehicle.image ? [{ url: vehicle.image }] : [],
			type: "website",
		},
	};
}

// 2. Main Page Component
export default async function VehicleDetailPage(props: Props) {
	const params = await props.params;
	const locale = await getServerLocale();
	const t = getTranslations(locale);
	const vehicle = await getVehicleBySlug(params.slug);

	if (!vehicle) {
		notFound();
	}

	// Generate robust JSON-LD
	const jsonLd = buildVehicleJsonLd(vehicle, locale);

	// Helpers
	const numberLocale = locale === "de" ? "de-AT" : "pl-PL";
	const currencyFormatter = new Intl.NumberFormat(numberLocale, {
		style: "currency",
		currency: "EUR",
		maximumFractionDigits: 0,
	});
	const numberFormatter = new Intl.NumberFormat(numberLocale);

	const formatPrice = (val?: number) =>
		val ? currencyFormatter.format(val) : "";
	const formatNumber = (val?: number | string) => {
		if (val === undefined || val === null || val === "") return "";
		const num = Number(val);
		return Number.isNaN(num) ? String(val) : numberFormatter.format(num);
	};

	const contactHref = getRoute("contact", locale);
	const towingHref = getRoute("towing", locale);

	const isSold = !vehicle.isAvailable;

	return (
		<div className="space-y-10 pb-16 font-sans">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			{/* HEADER */}
			<section className="bg-gradient-to-b from-white to-gray-50 py-8 border-b border-gray-200">
				<div className="mx-auto max-w-7xl px-4">
					<Link
						href={getRoute("vehicles", locale)}
						className="text-sm font-medium text-brand-primary mb-6 inline-flex items-center"
					>
						<svg
							className="w-4 h-4 mr-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						{t.vehicleDetail.breadcrumb}
					</Link>

					<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
						<div className="flex-1">
							<div className="flex flex-wrap items-center gap-2 mb-3">
								{isSold ? (
									<span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
										{t.vehicleDetail.sold}
									</span>
								) : (
									<span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
										{t.vehicleDetail.available}
									</span>
								)}
								<span className="bg-blue-50 text-brand-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
									{/* Fallback to simple category name if translated not found, or use raw */}
									{vehicle.category}
								</span>
								{vehicle.hsn && vehicle.tsn && (
									<span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
										HSN: {vehicle.hsn} / TSN: {vehicle.tsn}
									</span>
								)}
							</div>

							<h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
								{vehicle.title}
							</h1>
							{vehicle.subtitle && (
								<p className="mt-2 text-xl text-gray-500 font-light">
									{vehicle.subtitle}
								</p>
							)}

							<div className="mt-4 flex items-center text-gray-500 text-sm">
								<svg
									className="w-4 h-4 mr-1.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								{vehicle.location}
							</div>
						</div>

						<div className="lg:text-right bg-white p-5 rounded-2xl shadow-sm border border-gray-100 lg:bg-transparent lg:p-0 lg:shadow-none lg:border-none min-w-[280px]">
							{vehicle.priceStatus === "Auf Anfrage" || vehicle.price === 0 ? (
								<span className="text-3xl font-bold text-gray-900">
									{t.vehicleDetail.onRequest}
								</span>
							) : (
								<>
									<span className="text-4xl font-extrabold text-[#d32f2f] block">
										{formatPrice(vehicle.price)}
									</span>
									{(vehicle.priceNetto ?? 0) > 0 &&
										vehicle.price !== vehicle.priceNetto && (
											<span className="text-sm text-gray-500 block mt-1">
												{t.vehicleDetail.priceNet}:{" "}
												{formatPrice(vehicle.priceNetto!)}
											</span>
										)}
								</>
							)}

							<div className="text-sm text-gray-600 mt-2 space-y-0.5">
								{vehicle.priceStatus === "Verhandelbar" && (
									<span className="block font-medium text-brand-accent">
										{t.vehicleDetail.negotiable}
									</span>
								)}
								{vehicle.vatRate && vehicle.vatRate > 0 ? (
									<span className="block">
										{t.vehicleDetail.vat}: {formatNumber(vehicle.vatRate)}%
									</span>
								) : (
									vehicle.vatText &&
									vehicle.vatText !== "0" && (
										<span className="block">{vehicle.vatText}</span>
									)
								)}
								{isSold && (
									<span className="block text-red-600 font-medium mt-1">
										({t.vehicleDetail.sold})
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CONTENT GRID */}
			<section className="mx-auto max-w-7xl px-4">
				<div className="grid gap-12 lg:grid-cols-[1fr_360px]">
					{/* LEFT COLUMN */}
					<div className="space-y-12 min-w-0">
						{/* Gallery Component */}
						<div className="space-y-4">
							{/* Prepare images array for the gallery component */}
							{(() => {
								const uniqueUrls = new Set<string>();
								const allImages = [];

								// Add main image if exists
								if (vehicle.image && !vehicle.image.includes("placeholder")) {
									uniqueUrls.add(vehicle.image);
									allImages.push({
										url: vehicle.image,
										thumb: vehicle.image,
										alt: "Main Image",
									});
								}

								// Add gallery images if they are not duplicates
								if (vehicle.gallery) {
									vehicle.gallery.forEach((img) => {
										if (!uniqueUrls.has(img.url)) {
											uniqueUrls.add(img.url);
											allImages.push(img);
										}
									});
								}

								return (
									<VehicleGallery images={allImages} title={vehicle.title} />
								);
							})()}
						</div>

						{/* MOBILE ONLY: Technical Specs immediately after gallery */}
						<VehicleSpecs
							vehicle={vehicle}
							t={t}
							locale={locale}
							className="lg:hidden"
						/>

						{/* Video */}
						{vehicle.videoUrl && (
							<div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
								<h3 className="text-lg font-bold mb-3 text-gray-900">
									{t.vehicleDetail.video}
								</h3>
								<a
									href={vehicle.videoUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center px-5 py-2.5 bg-[#d32f2f] text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-sm"
								>
									<svg
										className="w-5 h-5 mr-2"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M10 0a10 10 0 100 20 10 10 0 000-20zm-2 14.5v-9l6 4.5-6 4.5z" />
									</svg>
									{t.vehicleDetail.video}
								</a>
							</div>
						)}

						{/* Description */}
						<div className="space-y-4">
							<h3 className="text-2xl font-bold text-gray-900 border-b pb-2">
								{t.vehicleDetail.description}
							</h3>
							<div
								className="prose max-w-none text-gray-700 leading-relaxed"
								dangerouslySetInnerHTML={{ __html: vehicle.description }}
							/>
						</div>

						{/* Condition Report */}
						{(vehicle.conditionDescription || vehicle.conditionDetail) && (
							<div className="bg-[#fff3e0] p-6 rounded-2xl border border-orange-100 shadow-sm text-sm">
								<h4 className="text-orange-900 font-bold text-lg mb-3 flex items-center">
									<svg
										className="w-5 h-5 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									{t.vehicleDetail.conditionDetail}
								</h4>
								{vehicle.conditionDescription && (
									<p className="text-orange-900 mb-3 whitespace-pre-line">
										{vehicle.conditionDescription}
									</p>
								)}
								{vehicle.conditionDetail && (
									<p className="text-orange-900 whitespace-pre-line border-t border-orange-200 pt-3">
										{vehicle.conditionDetail}
									</p>
								)}
							</div>
						)}

						{/* Equipment List */}
						{vehicle.equipmentList && vehicle.equipmentList.length > 0 && (
							<div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
								<h3 className="text-xl font-bold mb-6 text-gray-900">
									{t.vehicleDetail.equipment}
								</h3>
								<ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-gray-700">
									{vehicle.equipmentList.map((item, i) => (
										<li key={i} className="pl-2">
											{item}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					{/* RIGHT COLUMN (Sidebar) */}
					<aside className="space-y-6">
						{/* Specs Table */}
						<div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
							<h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 border-gray-200">
								{t.vehicleDetail.techSpecs}
							</h3>

							<div className="space-y-0 text-sm">
								<SpecRow label={t.vehicleDetail.make} value={vehicle.make} />
								<SpecRow label={t.vehicleDetail.model} value={vehicle.model} />
								<SpecRow label={t.vehicleDetail.year} value={vehicle.year} />
								<SpecRow
									label={t.vehicleDetail.firstRegistration}
									value={vehicle.firstRegistration}
								/>
								<SpecRow
									label={t.vehicleDetail.mileage}
									value={`${formatNumber(vehicle.mileage)} km`}
								/>
								<SpecRow label={t.vehicleDetail.fuel} value={vehicle.fuel} />
								<SpecRow
									label={t.vehicleDetail.transmission}
									value={vehicle.transmission}
								/>
								<div className="my-4 border-t border-gray-200 pt-2">
									<p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
										{t.vehicleDetail.sectionEngine}
									</p>
									<SpecRow
										label={t.vehicleDetail.cubicCapacity}
										value={
											vehicle.cubicCapacity
												? `${formatNumber(vehicle.cubicCapacity)} cm³`
												: undefined
										}
									/>
									<SpecRow
										label={t.vehicleDetail.cylinders}
										value={vehicle.cylinders}
									/>
									<SpecRow
										label={t.vehicleDetail.power}
										value={vehicle.power}
									/>
									<SpecRow
										label={t.vehicleDetail.fuelTank}
										value={
											vehicle.fuelTankVolume
												? `${formatNumber(vehicle.fuelTankVolume)} l`
												: undefined
										}
									/>
									<SpecRow
										label={t.vehicleDetail.envEnergy}
										value={vehicle.envEnergy}
									/>
									<SpecRow
										label={t.vehicleDetail.envCo2}
										value={vehicle.envCo2}
									/>
									<SpecRow
										label={t.vehicleDetail.envCo2Class}
										value={vehicle.envCo2Class}
									/>
								</div>

								<div className="my-4 border-t border-gray-200 pt-2">
									<p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
										{t.vehicleDetail.sectionComfort}
									</p>
									<SpecRow
										label={t.vehicleDetail.climateControl}
										value={vehicle.climateControl || vehicle.climatisation}
									/>
									<SpecRow
										label={t.vehicleDetail.parkingSensors}
										value={vehicle.parkingSensors || vehicle.parkAssists}
									/>
									<SpecRow
										label={t.vehicleDetail.airbags}
										value={vehicle.airbags}
									/>
								</div>

								<div className="my-4 border-t border-gray-200 pt-2">
									<p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
										{t.vehicleDetail.sectionWeights}
									</p>
									<SpecRow
										label={t.vehicleDetail.weightTotal}
										value={
											vehicle.licensedWeight
												? `${formatNumber(vehicle.licensedWeight)} kg`
												: undefined
										}
									/>
									<SpecRow
										label={t.vehicleDetail.weightNet}
										value={
											vehicle.netWeight
												? `${formatNumber(vehicle.netWeight)} kg`
												: undefined
										}
									/>
									<SpecRow
										label={t.vehicleDetail.payload}
										value={
											vehicle.payload
												? `${formatNumber(vehicle.payload)} kg`
												: undefined
										}
									/>
									<SpecRow
										label={t.vehicleDetail.towingCapBraked}
										value={vehicle.towingCapBraked}
									/>
									<SpecRow
										label={t.vehicleDetail.towingCapUnbraked}
										value={vehicle.towingCapUnbraked}
									/>
								</div>

								{/* VIN Section Obfuscated */}
								{vehicle.vin && (
									<div className="mt-4 pt-3 border-t border-gray-200">
										<span className="block text-xs text-gray-500 uppercase mb-1">
											{t.vehicleDetail.vin}
										</span>
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
													<svg
														className="w-4 h-4"
														fill="currentColor"
														viewBox="0 0 24 24"
													>
														<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
													</svg>
													WhatsApp
												</div>
											</a>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* CTA Box */}
						<div className="rounded-2xl bg-brand-primary p-6 text-white shadow-lg">
							<h3 className="text-xl font-bold mb-3">
								{t.vehicleDetail.interested}
							</h3>
							<p className="mb-6 opacity-90 leading-snug">
								{locale === "pl"
									? "Zadzwoń do nas lub odwiedź nas osobiście w Sollenau (Industriestraße 1)."
									: "Rufen Sie uns an oder besuchen Sie uns persönlich in Sollenau (Industriestraße 1)."}
							</p>
							<div className="space-y-3">
								<Link
									href={contactHref}
									className="block w-full rounded-xl bg-white text-brand-primary py-3.5 text-center font-extrabold transition hover:bg-gray-100 uppercase tracking-wide text-sm"
								>
									{t.vehicleDetail.view}
								</Link>
								<Link
									href={towingHref}
									className="block w-full rounded-xl border-2 border-white/20 py-3.5 text-center text-white font-bold transition hover:bg-white/10 uppercase tracking-wide text-sm"
								>
									{t.vehicleDetail.combine}
								</Link>
							</div>
						</div>
					</aside>
				</div>
			</section>
		</div>
	);
}

function SpecRow({ label, value }: { label: string; value?: string | number }) {
	if (
		value === undefined ||
		value === null ||
		value === "" ||
		value === 0 ||
		value === "0"
	)
		return null;

	return (
		<div className="flex justify-between py-2 border-b border-gray-200 last:border-0">
			<span className="text-gray-500 text-sm">{label}</span>
			<span className="font-semibold text-gray-900 text-right ml-4 text-sm">
				{value}
			</span>
		</div>
	);
}
