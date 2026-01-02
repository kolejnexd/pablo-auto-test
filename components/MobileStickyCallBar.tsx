"use client";

import { Phone } from "lucide-react";
import React, { useEffect, useState } from "react";

const MobileStickyCallBar = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// Show after scrolling past the hero section (approx 600px)
			if (window.scrollY > 600) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			role="complementary"
			aria-label="Emergency Contact"
			className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
				isVisible ? "translate-y-0" : "translate-y-full"
			}`}
		>
			<a
				href="tel:+436641261735"
				className="flex items-center justify-center gap-3 bg-brand-primary px-4 py-4 text-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] active:bg-brand-secondary"
			>
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
					<Phone className="h-5 w-5 animate-pulse" />
				</div>
				<span className="text-lg font-bold">Notruf 24/7: +43 664 1261735</span>
			</a>
		</div>
	);
};

export default MobileStickyCallBar;
