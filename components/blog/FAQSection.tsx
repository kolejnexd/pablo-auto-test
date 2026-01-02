type FAQItem = {
	q: string;
	a: string;
};

export default function FAQSection({ items }: { items: FAQItem[] }) {
	if (!items || items.length === 0) return null;

	return (
		<section
			className="my-10 rounded-xl bg-slate-50 p-6 md:p-8"
			itemScope
			itemType="https://schema.org/FAQPage"
		>
			<h2 className="mb-6 text-2xl font-bold text-slate-900">
				Häufig gestellte Fragen (FAQ)
			</h2>
			<div className="space-y-4">
				{items.map((item, index) => (
					<div
						key={index}
						className="rounded-lg bg-white p-5 shadow-sm"
						itemScope
						itemProp="mainEntity"
						itemType="https://schema.org/Question"
					>
						<h3
							className="text-lg font-semibold text-slate-900"
							itemProp="name"
						>
							{item.q}
						</h3>
						<div
							className="mt-2 text-slate-600 leading-relaxed"
							itemScope
							itemProp="acceptedAnswer"
							itemType="https://schema.org/Answer"
						>
							<div itemProp="text">{item.a}</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
