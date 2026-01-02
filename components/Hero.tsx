import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { Button } from "./Button";

interface HeroProps {
	title: string;
	subtitle: string;
	primaryCta?: { label: string; href: string };
	secondaryCta?: { label: string; href: string };

	/**
	 * BACKWARD COMPAT:
	 * - Jeśli podasz backgroundImage -> renderuje Image jak dotąd
	 * - Jeśli podasz rightGraphic -> renderuje go zamiast obrazka
	 * - Możesz podać jedno z nich (rightGraphic ma priorytet)
	 */
	backgroundImage?: string;
	rightGraphic?: React.ReactNode;
}

export default function Hero({
	title,
	subtitle,
	primaryCta,
	secondaryCta,
	backgroundImage,
	rightGraphic,
}: HeroProps) {
	return (
		<section className="relative overflow-hidden bg-bg-light pt-8 md:pt-16 lg:pt-24 pb-12">
			<div className="mx-auto max-w-6xl px-4">
				<div className="grid gap-12 lg:grid-cols-2 lg:items-center">
					{/* Text Content */}
					<div className="order-2 lg:order-1 space-y-8">
						<h1 className="text-3xl font-bold leading-tight text-brand-primary md:text-4xl lg:text-5xl">
							{title}
						</h1>
						<p className="text-lg text-gray-700 md:text-xl">{subtitle}</p>

						<div className="flex flex-col gap-4 sm:flex-row">
							{primaryCta && (
								<Button
									href={primaryCta.href}
									variant="primary"
									className="py-4 px-6 text-lg"
									icon={Phone}
								>
									{primaryCta.label}
								</Button>
							)}
							{secondaryCta && (
								<Button
									href={secondaryCta.href}
									variant="primary-blue"
									className="py-4 px-6 text-lg"
									icon={MapPin}
								>
									{secondaryCta.label}
								</Button>
							)}
						</div>
					</div>

					{/* Media: Map OR Image */}
					<div className="order-1 lg:order-2">
						{rightGraphic ? (
							// gdy dajesz custom panel (ma własny radius/shadow)
							<div className="w-full">{rightGraphic}</div>
						) : (
							// tylko dla obrazka / placeholdera dawaj ramkę
							<div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
								{backgroundImage ? (
									<div className="relative aspect-video w-full">
										<Image
											src={backgroundImage}
											alt={title}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, 50vw"
											priority
										/>
									</div>
								) : (
									<div className="aspect-video w-full bg-white" aria-hidden />
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
