"use client";

import {
	Car,
	Clock,
	FileText,
	Mail,
	MapPin,
	Navigation,
	Phone,
	ShieldCheck,
	Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import type { Locale } from "../lib/i18n";
import { getRoute } from "../lib/routes";
import { company } from "../lib/siteConfig";
import { Button } from "./Button";
import LanguageSwitcher from "./LanguageSwitcher";

interface Props {
	initialLocale?: Locale;
}

export default function Footer({ initialLocale }: Props) {
	const { t, locale } = useCurrentLocale(initialLocale);

	const phoneTel = `tel:${company.phone.replace(/[^0-9+]/g, "")}`;
	const waHref = `https://wa.me/${company.phone.replace(/[^0-9]/g, "")}`;

	// Desktop Footer Component (Hidden on Mobile)
	const DesktopFooter = (
		<div className="hidden lg:block">
			{/* CTA Bar (Desktop) */}
			<div className="bg-brand-primary text-white">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
					<div className="text-center sm:text-left">
						<p className="text-lg font-bold">{t.footer.ctaBar.title}</p>
						<p className="text-sm text-white/80">{t.footer.ctaBar.subtitle}</p>
					</div>
					<div className="flex items-center gap-3">
						<Button
							href={phoneTel}
							variant="primary"
							className="!bg-brand-accent !shadow-brand-accent/30 text-sm"
							icon={Phone}
						>
							{t.footer.ctaBar.callBtn}
						</Button>
						<a
							href={waHref}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-brand-primary"
						>
							{t.footer.ctaBar.whatsappBtn}
						</a>
					</div>
				</div>
			</div>

			{/* Main Grid */}
			<div className="mx-auto grid max-w-6xl grid-cols-4 gap-8 px-6 py-10">
				{/* Column 1: NAP */}
				<div>
					<h3 className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
						{t.footer.contact}
					</h3>
					<address className="mt-4 space-y-2 text-sm not-italic text-gray-700">
						<p className="font-semibold">{company.name}</p>
						<p>{company.address}</p>
						<p>
							<a
								href={phoneTel}
								className="transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
							>
								{company.phone}
							</a>
						</p>
						<p>
							<a
								href={`mailto:${company.email}`}
								className="transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
							>
								{company.email}
							</a>
						</p>
					</address>
				</div>

				{/* Column 2: Services */}
				<div>
					<h3 className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
						{t.footer.services}
					</h3>
					<ul className="mt-4 space-y-3 text-sm text-gray-700">
						{t.footer.serviceLinks.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									prefetch={false}
									className="block py-1 transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Column 3: About */}
				<div>
					<h3 className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
						{t.footer.about}
					</h3>
					<ul className="mt-4 space-y-3 text-sm text-gray-700">
						{t.footer.aboutLinks.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									prefetch={false}
									className="block py-1 transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Column 4: Legal */}
				<div>
					<h3 className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
						{t.footer.legal}
					</h3>
					<ul className="mt-4 space-y-3 text-sm text-gray-700">
						{t.footer.legalLinks.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									prefetch={false}
									className="block py-1 transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
								>
									{item.label}
								</Link>
							</li>
						))}
						<li className="pt-2 text-xs text-gray-500">{t.footer.cashless}</li>
					</ul>
					<div className="mt-4 space-y-1 text-xs text-gray-500">
						<p>UID: {company.vat}</p>
						<p>FN: {company.registerNumber}</p>
					</div>
				</div>
			</div>

			{/* Bottom Bar Desktop */}
			<div className="border-t bg-white py-4">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
					<p className="text-xs text-gray-500">
						© {new Date().getFullYear()} {company.name}. {t.footer.copyright}
					</p>
					<div className="flex items-center gap-6">
						<LanguageSwitcher initialLocale={locale} />
						<a
							href="https://webwizytowka.pl"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-xs text-gray-400 transition-colors hover:text-gray-600"
						>
							<Image
								src="/assets/webwizytowka-logo.webp"
								alt="Webwizytowka"
								width={16}
								height={16}
								className="opacity-60 grayscale transition hover:grayscale-0 hover:opacity-100"
							/>
							<span>by webwizytowka</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);

	// Mobile Footer Component (Visible on Mobile)
	const MobileFooter = (
		<div className="bg-white pb-8 lg:hidden">
			{/* A. CTA Top Bar (Mobile) */}
			<div className="bg-gray-50 px-4 py-8 text-center">
				<h3 className="text-xl font-bold text-gray-900">
					{t.footer.ctaBar.title}
				</h3>
				<p className="mt-2 text-sm text-gray-600">
					{t.footer.ctaBar.subtitle}
				</p>
				<div className="mt-6 flex flex-col gap-3">
					<Button
						href={phoneTel}
						variant="primary"
						className="w-full justify-center py-4 text-base font-bold shadow-lg shadow-brand-primary/20"
						icon={Phone}
					>
						{t.footer.ctaBar.callBtn}
					</Button>
					<a
						href={waHref}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex w-full items-center justify-center rounded-xl border-2 border-[#25D366] px-4 py-3 text-base font-bold text-[#25D366] transition-colors active:bg-[#25D366]/10"
					>
						{t.footer.ctaBar.whatsappBtn}
					</a>
				</div>
			</div>

			{/* B. Main Footer Sections */}
			<div className="flex flex-col gap-2 bg-gray-100 px-4 py-6">
				{/* 1. Contact (NAP) */}
				<div className="rounded-2xl bg-white p-6 shadow-sm">
					<h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
						{t.footer.contact}
					</h4>
					<div className="mb-4">
						<p className="font-bold text-gray-900">{company.name}</p>
						<p className="text-sm text-gray-600">{company.address}</p>
					</div>
					<div className="mb-6 space-y-3">
						<a
							href={phoneTel}
							className="flex items-center gap-3 text-lg font-bold text-brand-primary"
						>
							<Phone className="h-5 w-5" />
							{company.phone}
						</a>
						<a
							href={`mailto:${company.email}`}
							className="flex items-center gap-3 text-sm text-gray-700"
						>
							<Mail className="h-4 w-4" />
							{company.email}
						</a>
					</div>

					{/* Status Indicators */}
					<div className="mb-6 space-y-2 text-xs font-medium">
						<div className="flex items-center gap-2 text-green-600">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
								<span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
							</span>
							{t.footer.status.towing}
						</div>
						<div className="flex items-center gap-2 text-gray-600">
							<Clock className="h-3 w-3" />
							{t.footer.status.sales}
						</div>
					</div>

					{/* Quick Actions */}
					<div className="grid grid-cols-1 gap-2 pt-4 border-t border-gray-100">
						<a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 active:bg-gray-100">
							{t.footer.quickActions.navigate}
							<Navigation className="h-4 w-4 text-gray-400" />
						</a>
						<Link href={getRoute("contact", locale)} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 active:bg-gray-100">
							{t.footer.quickActions.email}
							<Mail className="h-4 w-4 text-gray-400" />
						</Link>
						<Link href={getRoute("carSales", locale)} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 active:bg-gray-100">
							{t.footer.quickActions.cars}
							<Car className="h-4 w-4 text-gray-400" />
						</Link>
					</div>
				</div>

				{/* 2. Trust Strip */}
				<div className="rounded-2xl bg-white p-4 shadow-sm">
					<div className="grid grid-cols-1 gap-3">
						<div className="flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-50 text-yellow-500">
								<Star className="h-4 w-4 fill-current" />
							</div>
							<span className="text-sm font-medium text-gray-700">{t.footer.trust.rating}</span>
						</div>
						<div className="flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-500">
								<Clock className="h-4 w-4" />
							</div>
							<span className="text-sm font-medium text-gray-700">{t.footer.trust.time}</span>
						</div>
						<div className="flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-500">
								<ShieldCheck className="h-4 w-4" />
							</div>
							<span className="text-sm font-medium text-gray-700">{t.footer.trust.insured}</span>
						</div>
						<div className="flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-500">
								<FileText className="h-4 w-4" />
							</div>
							<span className="text-sm font-medium text-gray-700">{t.footer.trust.invoice}</span>
						</div>
					</div>
				</div>

				{/* 3. Services */}
				<div className="rounded-2xl bg-white p-6 shadow-sm">
					<h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
						{t.footer.services}
					</h4>
					<ul className="space-y-4">
						{t.footer.serviceLinks.map((item) => (
							<li key={item.href}>
								<Link href={item.href} className="text-base font-medium text-gray-900 active:text-brand-primary">
									{item.label}
								</Link>
							</li>
						))}
					</ul>
					<div className="mt-6 flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
						<MapPin className="h-4 w-4 shrink-0 text-blue-600" />
						<span className="font-medium">Sollenau – Wiener Neustadt – Baden – Wien (A2)</span>
					</div>
				</div>

				{/* 4. About & Legal */}
				<div className="rounded-2xl bg-white p-6 shadow-sm">
					<h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
						{t.footer.about} & {t.footer.legal}
					</h4>
					<div className="grid grid-cols-2 gap-x-4 gap-y-4">
						{t.footer.aboutLinks.map((item) => (
							<Link key={item.href} href={item.href} className="text-sm text-gray-600 active:text-brand-primary">
								{item.label}
							</Link>
						))}
						{t.footer.legalLinks.map((item) => (
							<Link key={item.href} href={item.href} className="text-sm text-gray-600 active:text-brand-primary">
								{item.label}
							</Link>
						))}
					</div>
					<div className="mt-6 border-t pt-4 text-xs text-gray-500">
						<p className="mb-1">{t.footer.cashless}</p>
						<p>UID: {company.vat}</p>
						<p>FN: {company.registerNumber}</p>
					</div>
				</div>
			</div>

			{/* C. Bottom Bar (Mobile) */}
			<div className="px-6 py-8 text-center">
				<p className="mb-4 text-xs text-gray-400">
					© {new Date().getFullYear()} {company.name}
				</p>

				<div className="mb-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
					<Link href={getRoute("imprint", locale)}>Imprint</Link>
					<Link href={getRoute("privacy", locale)}>Privacy</Link>
					<span>Cookies</span>
				</div>

				<div className="mb-8 flex justify-center gap-2">
					{(["de", "pl", "en"] as const).map((l) => (
						<Link
							key={l}
							href={`/${l === "de" ? "" : l}`}
							onClick={() => {
								document.cookie = `pablo_locale=${l}; path=/; max-age=31536000`;
							}}
							className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${locale === l
								? "bg-gray-900 text-white"
								: "bg-gray-100 text-gray-500"
								}`}
						>
							{l}
						</Link>
					))}
				</div>

				{/* Socials / Reviews Link */}
				<div className="flex justify-center gap-4">
					<a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 active:bg-gray-200">
						<span className="sr-only">Google</span>
						<svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" /></svg>
					</a>
					{/* Add more icons if needed */}
				</div>
			</div>
		</div>
	);

	return (
		<footer className="mt-16 border-t bg-bg-light/60">
			{DesktopFooter}
			{MobileFooter}
		</footer>
	);
}
