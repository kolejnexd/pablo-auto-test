"use client";

import { Globe, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import { type Locale, getHomeHref } from "../lib/i18n";
import { company } from "../lib/siteConfig";
import { Button } from "./Button";
import LanguageSwitcher from "./LanguageSwitcher";

interface Props {
	initialLocale?: Locale;
}

export default function Header({ initialLocale }: Props) {
	const [open, setOpen] = useState(false);
	const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
	const { t, locale } = useCurrentLocale(initialLocale);
	const scrollDirection = useScrollDirection();
	const homeHref = getHomeHref(locale);

	const menuItems = useMemo(
		() =>
			t.header.menu.filter(
				(item) => item.href !== homeHref && item.href !== "/",
			),
		[t.header.menu, homeHref],
	);

	// Close on ESC (better UX/A11y)
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open]);

	const phoneTel = `tel:${company.phone.replace(/[^0-9+]/g, "")}`;
	const waHref = `https://wa.me/${company.phone.replace(/[^0-9]/g, "")}`;

	// Desktop Header
	const DesktopHeader = (
		<div className="mx-auto hidden max-w-7xl flex-col px-6 lg:flex">
			{/* Top Row: Logo & Actions */}
			<div className="grid grid-cols-3 items-center py-2">
				{/* Desktop Left: Language Switcher */}
				<div className="justify-self-start">
					<LanguageSwitcher initialLocale={locale} />
				</div>

				{/* Logo (Centered) */}
				<Link
					href={locale === "de" ? "/" : `/${locale}`}
					className="justify-self-center"
				>
					<Image
						src="/assets/logo-pablo-autohandel-abschleppdienst.png"
						alt="Autohandel & Abschleppdienst Pablo e.U."
						width={320}
						height={90}
						className="h-14 w-auto"
						priority
					/>
				</Link>

				{/* Desktop Right: Call Button */}
				<div className="flex justify-self-end">
					<Button
						href={phoneTel}
						variant="primary"
						className="text-sm shadow-md"
						icon={Phone}
					>
						{company.phone}
					</Button>
				</div>
			</div>

			{/* Bottom Row: Navigation */}
			<div className="border-t border-gray-100 py-2">
				<nav className="flex items-center justify-center gap-8 text-sm font-medium text-gray-600">
					{menuItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="text-base transition-colors hover:text-brand-primary"
						>
							{item.label}
						</Link>
					))}
					<Link
						href={
							locale === "en"
								? "/en/contact"
								: locale === "pl"
									? "/pl/kontakt"
									: "/kontakt"
						}
						className="text-base transition-colors hover:text-brand-primary"
					>
						{t.footer.contact}
					</Link>
				</nav>
			</div>
		</div>
	);

	// Mobile Header (Sticky)
	const MobileHeader = (
		<div className="lg:hidden">
			{/* Main Sticky Bar */}
			<div className="relative z-50 flex h-[60px] items-center justify-between bg-white px-4 shadow-sm">
				{/* Left: Hamburger */}
				<button
					type="button"
					className="flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"
					onClick={() => setOpen(true)}
					aria-label="Menu"
				>
					<span className="text-2xl leading-none">☰</span>
				</button>

				{/* Center: Logo */}
				<Link
					href={locale === "de" ? "/" : `/${locale}`}
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
				>
					<div className="flex items-center gap-2">
						<Image
							src="/assets/logo-pablo-autohandel-abschleppdienst-mobile.png"
							alt="Pablo e.U."
							width={210}
							height={60}
							className="h-12 w-auto"
						/>
					</div>
				</Link>

				{/* Right: Globe (Language) */}
				<div className="relative">
					<button
						type="button"
						className="flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"
						onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
						aria-label="Language"
					>
						<Globe className="h-5 w-5" />
					</button>

					{/* Language Dropdown */}
					{isLangMenuOpen && (
						<div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-100 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2">
							<div className="flex flex-col gap-1">
								{(["de", "pl", "en"] as const).map((l) => (
									<button
										key={l}
										onClick={() => {
											document.cookie = `pablo_locale=${l}; path=/; max-age=31536000`;
											window.location.reload();
										}}
										className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${locale === l
											? "bg-brand-primary text-white"
											: "text-gray-700 hover:bg-gray-50"
											}`}
									>
										<span className="text-base">
											{l === "de" && "🇦🇹"}
											{l === "pl" && "🇵🇱"}
											{l === "en" && "🇬🇧"}
										</span>
										<span>
											{l === "de" && "Deutsch"}
											{l === "pl" && "Polski"}
											{l === "en" && "English"}
										</span>
									</button>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);

	// Mobile Bottom Sticky Bar (Auto-hide)
	const MobileBottomBar = (
		<div
			className={`fixed bottom-0 left-0 right-0 z-[45] transform bg-white p-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-300 lg:hidden ${scrollDirection === "down" ? "translate-y-full" : "translate-y-0"
				}`}
		>
			<Button
				href={phoneTel}
				variant="primary"
				className="w-full justify-center py-2.5 text-sm font-bold shadow-md"
				icon={Phone}
			>
				{t.header.callCta}
			</Button>
		</div>
	);

	// Mobile Full-screen Drawer (Redesigned)
	const MobileDrawer = (
		<div
			className={`fixed inset-0 z-[60] bg-white transition-opacity duration-300 lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}
		>
			{/* Drawer Content Container with Slide Effect */}
			<div className={`absolute inset-0 bg-white transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
				<div className="flex h-full flex-col">
					{/* Drawer Header */}
					<div className="flex h-[60px] items-center justify-between border-b border-gray-100 px-6">
						<div className="flex items-center gap-3">
							<Image
								src="/assets/logo-pablo-autohandel-abschleppdienst-mobile.png"
								alt="Pablo e.U."
								width={255}
								height={72}
								className="h-14 w-auto"
							/>
							<span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 uppercase tracking-widest">
								24/7 Active
							</span>
						</div>
						<button
							type="button"
							className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100"
							onClick={() => setOpen(false)}
						>
							✕
						</button>
					</div>

					{/* Main Navigation */}
					<div className="flex-1 overflow-y-auto px-6 py-8">
						<nav className="flex flex-col gap-6">
							{menuItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="text-2xl font-bold tracking-tight text-gray-900 transition-colors active:text-brand-primary"
									onClick={() => setOpen(false)}
								>
									{item.label}
								</Link>
							))}
						</nav>
					</div>

					{/* Drawer Footer */}
					<div className="border-t border-gray-100 bg-gray-50/50 p-6 pb-8">
						<div className="mb-6 flex flex-col gap-3">
							<div className="flex items-center gap-3 text-sm text-gray-500">
								<div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
								<span>{t.footer.status.towing}</span>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-3">
							<Button
								href={phoneTel}
								variant="primary"
								className="w-full justify-center py-4 text-base shadow-lg shadow-brand-primary/20"
								icon={Phone}
							>
								{t.header.callCta}
							</Button>
							<a
								href={waHref}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-base font-bold text-gray-700 shadow-sm transition-colors active:bg-gray-50"
							>
								{t.common.whatsapp}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<header className="sticky top-0 z-40 bg-white shadow-soft lg:sticky lg:bg-white/90 lg:backdrop-blur">
			{DesktopHeader}
			{MobileHeader}
			{MobileBottomBar}
			{MobileDrawer}
		</header>
	);
}
