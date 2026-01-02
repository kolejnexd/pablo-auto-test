import { constructMetadata } from "@/lib/metadata";
import {
	ArrowRight,
	Calendar,
	Car,
	Clock,
	Key,
	MapPin,
	Phone,
	ShieldCheck,
	Truck,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "../components/Button";
import FaqAccordion from "../components/FaqAccordion";
import HeroVideo from "../components/HeroVideo";
import MobileStickyCallBar from "../components/MobileStickyCallBar";
import ServiceCard from "../components/ServiceCard";
import TrustBar from "../components/TrustBar";
import PostCard from "../components/blog/PostCard";
import SeoJsonLd from "../components/seo/SeoJsonLd";
import { getAllPosts } from "../lib/blog/posts";
import { FAQ_SNIPPETS } from "../lib/data/seo-snippets";
import { getTranslations } from "../lib/i18n";
import { getRoute } from "../lib/routes";
import { getServerLocale } from "../lib/serverLocale";
import { company } from "../lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getServerLocale();

	const title =
		"Pablo e.U. Sollenau & Wien | Abschleppdienst A2, Autohandel & Vermietung"; // Fixed DE title as master
	const description =
		"Ihr Partner für Mobilität an der A2: Abschleppdienst in 30 Min (Wien–Baden), zertifizierter Gebrauchtwagen-Handel, Mietwagen ohne Kreditkarte & Transport. Seit 2018.";

	return constructMetadata({
		title,
		description,
		locale: locale,
		canonicalUrl: "https://pablo-auto.at/",
		alternateUrls: {
			"de-AT": "https://pablo-auto.at/",
			"pl-PL": "https://pablo-auto.at/pl/",
			en: "https://pablo-auto.at/en/",
			"x-default": "https://pablo-auto.at/",
		},
		image:
			"/assets/seo/pablo-eu-abschleppdienst-a2-autohandel-sollenau-hero.webp",
	});
}

export default async function HomePage() {
	const locale = await getServerLocale();
	const t = getTranslations(locale);

	const kpiIcons = [Clock, ShieldCheck, Calendar];

	return (

		<div className="flex flex-col">
			{/* SECTION 1: HERO & TRUSTBAR */}
			<section className="relative overflow-hidden bg-white pt-10 pb-8 md:pt-16 md:pb-12 bg-gradient-to-b from-blue-50/20 to-white">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
						{/* Text & CTA Grid */}
						<div className="flex flex-col space-y-8">
							<h1 className="text-4xl font-extrabold tracking-tight text-brand-primary md:text-5xl lg:text-6xl lg:leading-[1.1]">
								{t.home.hero.title}
							</h1>
							<p className="max-w-prose text-lg text-slate-600 leading-relaxed md:text-xl">
								{t.home.hero.subtitle}
							</p>

							{/* 4 CTA Tiles Grid */}
							<div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2">
								<Link
									href={getRoute("towing", locale)}
									className="group flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-accent hover:shadow-md"
								>
									<Truck className="mb-2 h-8 w-8 text-brand-primary group-hover:text-brand-accent" />
									<span className="font-bold text-slate-800 text-center text-sm sm:text-base">
										{t.home.serviceCards.towing.title}
									</span>
								</Link>
								<Link
									href={getRoute("carSales", locale)}
									className="group flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-accent hover:shadow-md"
								>
									<Car className="mb-2 h-8 w-8 text-brand-primary group-hover:text-brand-accent" />
									<span className="font-bold text-slate-800 text-center text-sm sm:text-base">
										{t.home.serviceCards.sales.title}
									</span>
								</Link>
								<Link
									href={getRoute("rental", locale)}
									className="group flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-accent hover:shadow-md"
								>
									<Key className="mb-2 h-8 w-8 text-brand-primary group-hover:text-brand-accent" />
									<span className="font-bold text-slate-800 text-center text-sm sm:text-base">
										{t.home.serviceCards.rental.title}
									</span>
								</Link>
								<Link
									href={getRoute("transport", locale)}
									className="group flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-accent hover:shadow-md"
								>
									<MapPin className="mb-2 h-8 w-8 text-brand-primary group-hover:text-brand-accent" />
									<span className="font-bold text-slate-800 text-center text-sm sm:text-base">
										{t.home.serviceCards.transport.title}
									</span>
								</Link>
							</div>

							<div className="flex flex-col sm:flex-row gap-4 pt-2">
								<Button
									href={`tel:${company.phone.replace(/[^0-9+]/g, "")}`}
									variant="primary"
									icon={Phone}
									className="w-full sm:w-auto justify-center"
								>
									{t.home.hero.primaryCta.split(": ")[0] || "Notruf"}
								</Button>
							</div>
						</div>

						{/* Video Column */}
						<div className="relative mx-auto w-full max-w-[600px] lg:ml-auto lg:mr-0">
							<div className="aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-100">
								<HeroVideo />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Trust Bar */}
			<TrustBar items={t.home.trustBar.items} />

			{/* SECTION 2: SERVICES (Detailed) */}
			<section className="bg-slate-50 py-16 md:py-24">
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
						<ServiceCard
							title={t.home.serviceCards.towing.title}
							description={t.home.serviceCards.towing.description}
							features={t.home.serviceCards.towing.features}
							linkLabel={t.home.serviceCards.towing.linkLabel}
							href={getRoute("towing", locale)}
							imageSrc="/assets/seo/elektroauto-abschleppen-tesla-wien-a2.webp"
							imageAlt="Elektroauto abschleppen – Tesla auf Spezial-Plateau in Wien"
						/>
						<ServiceCard
							title={t.home.serviceCards.sales.title}
							description={t.home.serviceCards.sales.description}
							features={t.home.serviceCards.sales.features}
							linkLabel={t.home.serviceCards.sales.linkLabel}
							href={getRoute("carSales", locale)}
							imageSrc="/assets/seo/gebrauchtwagen-haendler-sollenau-garantie-carlog.webp"
							imageAlt="Gebrauchtwagen mit carLOG-Siegel – Pablo e.U. Sollenau"
						/>
						<ServiceCard
							title={t.home.serviceCards.rental.title}
							description={t.home.serviceCards.rental.description}
							features={t.home.serviceCards.rental.features}
							linkLabel={t.home.serviceCards.rental.linkLabel}
							href={getRoute("rental", locale)}
							imageSrc="/assets/seo/transporter-mieten-ohne-kreditkarte-wien.webp"
							imageAlt="Transporter mieten ohne Kreditkarte – Standort Sollenau"
						/>
						<ServiceCard
							title={t.home.serviceCards.transport.title}
							description={t.home.serviceCards.transport.description}
							features={t.home.serviceCards.transport.features}
							linkLabel={t.home.serviceCards.transport.linkLabel}
							href={getRoute("transport", locale)}
							imageSrc="/assets/seo/transport-wien-polska-logistik-sollenau.webp"
							imageAlt="Möbeltransport Wien–Polen – Pablo e.U. Logistik"
						/>
					</div>
				</div>
			</section>

			{/* SECTION 3: PROOF / KPI */}
			<section className="bg-white py-12 border-b border-slate-100">
				<div className="mx-auto max-w-5xl px-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
						{t.home.kpi.items.map((item, idx) => {
							const Icon = kpiIcons[idx] || ShieldCheck;
							return (
								<div
									key={idx}
									className="flex flex-col items-center text-center pt-6 md:pt-0 px-4"
								>
									<Icon className="h-10 w-10 text-brand-accent mb-3" />
									<span className="text-3xl font-bold text-brand-primary block mb-1">
										{item.value}
									</span>
									<span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
										{item.label}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* SECTION 4: ABOUT US (Compact) */}
			<section className="py-16 md:py-20 bg-white">
				<div className="mx-auto max-w-4xl px-4 text-center">
					<h2 className="text-3xl font-bold text-brand-primary mb-6">
						{t.home.trade.title}
					</h2>
					{/* Reusing trade title or similar if available, otherwise consider adding specific About title in i18n if requested strictly */}
					<p className="text-lg text-slate-600 mb-8 leading-relaxed">
						{t.about.intro}
					</p>
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 text-sm font-semibold text-slate-700">
						<Calendar className="w-4 h-4 text-brand-accent" />
						{locale === "pl"
							? "Założono w 2018"
							: locale === "en"
								? "Founded in 2018"
								: "Gegründet 2018"}
					</div>
					<div className="mt-10">
						<Link
							href={getRoute("about", locale)}
							className="text-brand-primary font-semibold hover:underline inline-flex items-center"
						>
							{t.common.readMore} <ArrowRight className="ml-1 w-4 h-4" />
						</Link>
					</div>
				</div>
			</section>

			{/* SECTION 5: FAQ */}
			<section className="bg-slate-50 py-16">
				<div className="mx-auto max-w-3xl px-4">
					<h2 className="mb-10 text-center text-3xl font-bold text-brand-primary">
						{t.home.faq.title}
					</h2>
					<FaqAccordion
						items={FAQ_SNIPPETS.slice(0, 4).map((item) => ({
							question: item.question[locale],
							answer: item.answer[locale],
						}))}
					/>
				</div>
			</section>

			{/* JSON-LD Schemas */}
			<SeoJsonLd />

			{/* Mobile Sticky Bar */}
			<MobileStickyCallBar />
		</div>
	);
}
