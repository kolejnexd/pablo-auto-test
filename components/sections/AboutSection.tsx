import { ABOUT_US_CONTENT } from "../../lib/data/about-content";
import type { Locale } from "../../lib/i18n";

// Simple Icons since we might not have lucide-react installed, or to keep it lightweight.
// If lucide-react is available, these can be replaced.
const ClockIcon = () => (
	<svg
		className="w-8 h-8 text-brand-accent"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
);

const ShieldCheckIcon = () => (
	<svg
		className="w-8 h-8 text-brand-accent"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
);

interface Props {
	locale: Locale;
}

export default function AboutSection({ locale }: Props) {
	const content = ABOUT_US_CONTENT;

	return (
		<section className="bg-white py-16 md:py-24 overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* HEADER */}
				<div className="text-center max-w-3xl mx-auto mb-16">
					<h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4 tracking-tight">
						{content.header.headline[locale]}
					</h2>
					<p className="text-xl text-gray-500 font-medium">
						{content.header.subheadline[locale]}
					</p>
				</div>

				{/* INTRO with Decorative Element */}
				<div className="relative bg-gray-50 rounded-3xl p-8 md:p-12 mb-16 border border-gray-100 shadow-sm">
					<div className="prose prose-lg text-gray-700 mx-auto max-w-4xl text-center leading-relaxed">
						<p>{content.intro[locale]}</p>
					</div>
				</div>

				{/* BENEFITS GRID */}
				<div className="mb-16">
					<h3 className="text-2xl font-bold text-center text-gray-900 mb-10">
						{content.benefitsTitle[locale]}
					</h3>
					<div className="grid md:grid-cols-2 gap-8 lg:gap-12">
						{content.benefits.map((benefit, idx) => (
							<div
								key={idx}
								className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
							>
								<div className="shrink-0 flex items-center justify-center w-16 h-16 bg-red-50 rounded-full">
									{benefit.icon === "Clock" ? (
										<ClockIcon />
									) : (
										<ShieldCheckIcon />
									)}
								</div>
								<div className="space-y-3">
									<h4 className="text-xl font-bold text-gray-900">
										{benefit.title[locale]}
									</h4>
									<p className="text-gray-600 leading-relaxed">
										{benefit.text[locale]}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* FOOTER & SIGNATURE */}
				<div className="text-center border-t border-gray-200 pt-12">
					<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6 italic">
						"{content.footer.text[locale]}"
					</p>
					<div className="inline-block">
						<span className="block text-brand-primary font-bold text-lg">
							{content.footer.signature}
						</span>
						<span className="text-sm text-gray-400 uppercase tracking-widest font-semibold">
							Founder & CEO
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
