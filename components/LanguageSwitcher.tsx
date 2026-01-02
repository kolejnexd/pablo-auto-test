"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	type Locale,
	detectLocaleFromPath,
	getLocaleHref,
	localeCookieName,
	locales,
	readLocaleCookie,
} from "../lib/i18n";

interface Props {
	initialLocale?: Locale;
}

const flags: Record<Locale, string> = {
	de: "🇩🇪",
	pl: "🇵🇱",
	en: "🇬🇧",
};

export default function LanguageSwitcher({ initialLocale }: Props) {
	const pathname = usePathname() || "/";
	const cookieLocale = readLocaleCookie(
		typeof document !== "undefined" ? document.cookie : undefined,
	);
	const preferredLocale = initialLocale ?? cookieLocale;
	const currentLocale = detectLocaleFromPath(pathname, preferredLocale);
	const maxAge = 60 * 60 * 24 * 180; // ~6 months

	return (
		<div className="flex items-center gap-2 text-sm">
			{locales.map((code) => (
				<Link
					key={code}
					href={
						pathname === "/" ||
							pathname === "/pl" ||
							pathname === "/en" ||
							pathname === "/pl/" ||
							pathname === "/en/"
							? code === "de"
								? "/"
								: `/${code}`
							: code === "de" &&
								(pathname.startsWith("/pl") || pathname.startsWith("/en"))
								? getLocaleHref(pathname, "de", preferredLocale) === "/"
									? "/"
									: getLocaleHref(pathname, "de", preferredLocale)
								: getLocaleHref(pathname, code, preferredLocale)
					}
					className={`flex items-center gap-1 rounded-full border px-3 py-1 transition hover:border-brand-primary hover:text-brand-primary ${currentLocale === code
							? "border-brand-primary text-brand-primary bg-brand-primary/5"
							: "border-gray-200 text-gray-700"
						}`}
					prefetch={false}
					onClick={() => {
						document.cookie = `${localeCookieName}=${code}; path=/; max-age=${maxAge}`;
						setTimeout(() => {
							window.location.href =
								code === "de" && (pathname === "/pl" || pathname === "/en")
									? "/"
									: getLocaleHref(pathname, code, preferredLocale);
						}, 100);
					}}
				>
					<span className="text-base leading-none">{flags[code]}</span>
					<span className="font-medium">{code.toUpperCase()}</span>
				</Link>
			))}
		</div>
	);
}
