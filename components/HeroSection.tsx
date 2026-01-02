import Link from "next/link";
import { Button } from "./Button";

interface HeroProps {
	title: string;
	subtitle: string;
	primaryCta: { label: string; href: string; variant?: "accent" | "primary" };
	secondaryCta?: { label: string; href: string };
	badge?: string;
	supportingText?: string;
}

export default function HeroSection({
	title,
	subtitle,
	primaryCta,
	secondaryCta,
	badge,
	supportingText,
}: HeroProps) {
	return (
		<section className="bg-gradient-to-b from-white to-bg-light py-16">
			<div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
				<div className="space-y-6">
					{badge ? (
						<p className="inline-flex rounded-full bg-brand-primary/10 px-4 py-1 text-xs font-semibold uppercase text-brand-primary">
							{badge}
						</p>
					) : null}
					<h1 className="text-3xl font-bold leading-tight text-brand-primary sm:text-4xl">
						{title}
					</h1>
					<p className="text-lg text-gray-700">{subtitle}</p>
					<div className="flex flex-wrap gap-4">
						<Button
							href={primaryCta.href}
							variant={
								primaryCta.variant === "accent" ? "primary" : "primary-blue"
							}
						>
							{primaryCta.label}
						</Button>
						{secondaryCta ? (
							<Button href={secondaryCta.href} variant="secondary">
								{secondaryCta.label}
							</Button>
						) : null}
					</div>
				</div>
				<div className="rounded-2xl bg-white p-8 shadow-soft">
					<div
						className="aspect-video rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent opacity-90"
						aria-hidden
					/>
					{supportingText ? (
						<p className="mt-4 text-sm text-gray-600">{supportingText}</p>
					) : null}
				</div>
			</div>
		</section>
	);
}
