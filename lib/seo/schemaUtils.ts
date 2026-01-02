import type { FAQPage, WithContext } from "schema-dts";
import type { FAQItem, Locale } from "../data/seo-snippets";

export function generateFaqSchema(
	items: FAQItem[],
	locale: Locale,
): WithContext<FAQPage> {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question[locale],
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer[locale],
			},
		})),
	};
}
