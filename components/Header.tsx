"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
	const { t, locale } = useCurrentLocale(initialLocale);
	const homeHref = getHomeHref(locale);

	const menuItems = useMemo(
		() => t.header.menu.filter((item) => item.href !== homeHref && item.href !== "/"),
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

	return (
		<header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
			<div className="relative flex items-center justify-between px-4 py-3 lg:grid lg:grid-cols-[auto,1fr,auto] lg:px-6 lg:py-4">
				{/* Mobile Menu Toggle */}
				<div className="lg:hidden">
					<button
						type="button"
						className="inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-gray-700"
						onClick={() => setOpen((prev) => !prev)}
						aria-label={open ? "Menü schließen" : "Menü öffnen"}
						aria-expanded={open}
						aria-controls="mobile-nav"
					>
						☰
					</button>
				</div>

				{/* Logo */}
				<Link
					href={locale === "de" ? "/" : `/${locale}`}
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center lg:static lg:translate-x-0 lg:translate-y-0 lg:justify-start"
				>
					<Image
						src="/assets/logo-pablo-autohandel-abschleppdienst-mobile.png"
						alt="Autohandel & Abschleppdienst Pablo e.U."
						width={280}
						height={80}
						className="h-14 w-auto max-w-[60vw] sm:h-16 lg:hidden"
					/>
					<Image
						src="/assets/logo-pablo-autohandel-abschleppdienst.png"
						alt="Autohandel & Abschleppdienst Pablo e.U."
						width={320}
						height={90}
						className="hidden h-14 w-auto lg:block"
						priority
					/>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-gray-700 lg:flex">
					{menuItems.map((item) => (
						<Link key={item.href} href={item.href} className="hover:text-brand-primary">
							{item.label}
						</Link>
					))}
				</nav>

				{/* Desktop Actions */}
				<div className="ml-auto hidden items-center gap-4 lg:flex">
					<LanguageSwitcher initialLocale={locale} />
					<Button href={phoneTel} variant="primary" className="text-sm">
						{t.header.callCta}
					</Button>
				</div>

				{/* Mobile Call CTA */}
				<div className="lg:hidden">
					<Button href={phoneTel} variant="primary" className="px-4 py-2 text-xs">
						{t.header.callShort}
					</Button>
				</div>
			</div>

			{open && (
				<div id="mobile-nav" className="border-t bg-white lg:hidden">
					<div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 text-sm">
						<nav className="flex flex-col gap-3">
							{menuItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="hover:text-brand-primary"
									onClick={() => setOpen(false)}
								>
									{item.label}
								</Link>
							))}
						</nav>

						<LanguageSwitcher initialLocale={locale} />

						<div className="grid grid-cols-2 gap-3 text-center">
							<Button href={phoneTel} variant="primary" className="text-sm">
								{t.header.callShort}
							</Button>

							{/* External link should be <a> */}
							<a
								href={waHref}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-[#25D366]/20 hover:bg-[#1ebe5d] hover:shadow-[#25D366]/40"
								onClick={() => setOpen(false)}
							>
								{t.common.whatsapp}
							</a>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
