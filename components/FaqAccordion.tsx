"use client";

import { useState } from "react";

interface Item {
	question: string;
	answer: string;
}

export default function FaqAccordion({
	items,
}: { items: { question: string; answer: string }[] }) {
	const [active, setActive] = useState<string | null>(
		items[0]?.question ?? null,
	);
	return (
		<div className="divide-y divide-gray-200 rounded-2xl bg-white shadow-soft">
			{items.map((item) => (
				<button
					key={item.question}
					className="w-full text-left"
					onClick={() =>
						setActive((prev) => (prev === item.question ? null : item.question))
					}
					aria-expanded={active === item.question}
				>
					<div className="flex items-center justify-between px-6 py-4">
						<span className="text-base font-semibold text-brand-primary">
							{item.question}
						</span>
						<span className="text-xl text-brand-primary">
							{active === item.question ? "−" : "+"}
						</span>
					</div>
					{active === item.question ? (
						<div className="px-6 pb-4 text-sm text-gray-700 leading-relaxed">
							{item.answer}
						</div>
					) : null}
				</button>
			))}
		</div>
	);
}
