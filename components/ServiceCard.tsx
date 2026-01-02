import Image from "next/image";
import Link from "next/link";

interface Props {
	title: string;
	description: string;
	href?: string;
	features?: string[];
	linkLabel?: string;
	imageSrc?: string;
	imageAlt?: string;
}

export default function ServiceCard({
	title,
	description,
	features,
	href,
	linkLabel,
	imageSrc,
	imageAlt,
}: Props) {
	const cardContent = (
		<div className="group relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
			<div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

			{imageSrc && (
				<div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl shadow-sm">
					<Image
						src={imageSrc}
						alt={imageAlt || title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 33vw"
					/>
				</div>
			)}

			<h3 className="text-xl font-bold text-brand-primary mb-3">{title}</h3>
			<p className="text-base text-slate-600 leading-relaxed mb-6">
				{description}
			</p>

			{features && features.length > 0 && (
				<ul className="mb-6 space-y-2 flex-grow">
					{features.map((feature, idx) => (
						<li
							key={idx}
							className="flex items-start gap-2 text-sm text-slate-600"
						>
							<span className="mt-1 block h-1.5 w-1.5 rounded-full bg-brand-accent flex-shrink-0" />
							{feature}
						</li>
					))}
				</ul>
			)}

			{href ? (
				<span className="mt-auto inline-flex items-center text-sm font-semibold text-brand-primary transition-colors group-hover:text-brand-accent">
					{linkLabel || "Mehr erfahren"}
					<svg
						className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</span>
			) : null}
		</div>
	);

	if (href) {
		return (
			<Link href={href} prefetch={false} className="block h-full">
				{cardContent}
			</Link>
		);
	}
	return cardContent;
}
