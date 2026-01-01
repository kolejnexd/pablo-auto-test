import { FAQItem, Locale } from '../data/seo-snippets';
import { WithContext, FAQPage } from 'schema-dts';

export function generateFaqSchema(items: FAQItem[], locale: Locale): WithContext<FAQPage> {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question[locale],
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer[locale]
            }
        }))
    };
}
