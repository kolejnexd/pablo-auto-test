import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";

import Footer from "../components/Footer";
import Header from "../components/Header";

import {
	defaultLocale,
	detectLocaleFromPath,
	localeCookieName,
} from "../lib/i18n";

import { company } from "../lib/siteConfig";

export const metadata: Metadata = {
	metadataBase: new URL(company.website),
	title: {
		default: company.name,
		template: `%s | ${company.name}`,
	},
	description: company.name,
	// alternates: {
	//   canonical: './',
	//   languages: { ... }
	// }, -> REMOVED per-page architecture
	openGraph: {
		title: company.name,
		description: company.name,
		url: "/",
		siteName: company.name,
		locale: "de_AT",
		alternateLocale: ["pl_PL", "en_US"],
		type: "website",
		images: [
			{
				url: "/opengraph-image.png",
				width: 1200,
				height: 630,
				alt: company.name,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: company.name,
		description: company.name,
		images: ["/opengraph-image.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
			{ url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
	},
	manifest: "/site.webmanifest",
};

import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

// ... imports ...

export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	const headerList = await headers();
	const path = headerList.get("next-url") ?? "/";
	const localeCookie = (await cookies()).get(localeCookieName)?.value;
	const locale = detectLocaleFromPath(path, localeCookie) || defaultLocale;

	return (
		<html lang={locale} className={inter.variable}>
			<head>
				<meta
					name="apple-mobile-web-app-title"
					content="Autohandel und Abschleppdienst Pablo e.U."
				/>
			</head>
			<body className="antialiased font-sans">
				<Header initialLocale={locale} />
				<main className="min-h-screen">{children}</main>
				<Footer initialLocale={locale} />
				{process.env.NODE_ENV === "production" ? <SpeedInsights /> : null}
			</body>
		</html>
	);
}
