import type { Locale } from "../../lib/routes";

const LABELS = {
	de: "Zusammenfassung",
	pl: "Najważniejsze informacje",
	en: "Key Takeaways",
};

export default function KeyTakeaways({
	items,
	locale = "de",
}: { items?: string[]; locale?: Locale }) {
	if (!items || items.length === 0) return null;

	return (
		<div className="my-8 rounded-2xl bg-slate-50 p-6 border border-slate-100/80">
			<h3 className="flex items-center text-lg font-bold text-slate-900 mb-4">
				<svg
					className="w-5 h-5 mr-2 text-red-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/>
				</svg>
				{LABELS[locale] || LABELS.de}
			</h3>
			<ul className="space-y-3">
				{items.map((item, idx) => (
					<li key={idx} className="flex items-start text-slate-700">
						<span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-600" />
						<span className="text-base leading-relaxed">{item}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
