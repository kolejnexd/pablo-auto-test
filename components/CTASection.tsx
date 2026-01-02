import Link from "next/link";
import { Button } from "./Button";

interface Props {
	title: string;
	description: string;
	primary: { label: string; href: string };
	secondary?: { label: string; href: string };
}

export default function CTASection({
	title,
	description,
	primary,
	secondary,
}: Props) {
	return (
		<section className="py-16">
			<div className="mx-auto max-w-4xl position-relative overflow-hidden rounded-3xl bg-white px-8 py-12 shadow-xl ring-1 ring-slate-100 sm:px-12">
				{/* Subtle top accent */}
				<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-blue-500 to-brand-accent opacity-80" />

				<div className="relative z-10 text-center">
					<h2 className="text-3xl font-bold tracking-tight text-brand-primary md:text-4xl">
						{title}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
						{description}
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<Button
							href={primary.href}
							variant="primary"
							className="shadow-brand-accent/30"
						>
							{primary.label}
						</Button>
						{secondary ? (
							<Button href={secondary.href} variant="secondary">
								{secondary.label}
							</Button>
						) : null}
					</div>
				</div>
			</div>
		</section>
	);
}
