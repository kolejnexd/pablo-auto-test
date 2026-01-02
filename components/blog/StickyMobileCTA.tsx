"use client";

import { useEffect, useState } from "react";

export default function StickyMobileCTA({
	locale = "de",
}: { locale?: "de" | "pl" | "en" }) {
	const [isVisible, setIsVisible] = useState(false);

	const labels = {
		de: "24/7 Notruf: +43 664 1261735",
		pl: "Zadzwoń 24/7: +43 664 1261735",
		en: "Call 24/7: +43 664 1261735",
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!isVisible) return null;

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden safe-area-bottom">
			<a
				href="tel:+436641261735"
				className="flex items-center justify-center w-full gap-2 rounded-xl bg-red-600 px-4 py-3 text-base font-bold text-white shadow-sm hover:bg-red-700 active:bg-red-800"
			>
				<svg
					className="h-5 w-5 animate-pulse"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="2"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
					/>
				</svg>
				{labels[locale] || labels.de}
			</a>
		</div>
	);
}
