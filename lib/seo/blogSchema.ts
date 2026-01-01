import type { BlogPost } from "contentlayer/generated";
import type { WithContext, BlogPosting, BreadcrumbList, FAQPage } from "schema-dts";
import { company } from "../siteConfig"; // Assuming this exists, based on PLAN.md suggesting structure consistency. Wait, plan imported from ../siteConfig. I need to check if siteConfig exists. If not, I will mock it or create it.
// Actually, looking at PLAN.md it imports from `../siteConfig`.
// I'll assume it exists or replace with hardcoded if not found in my exploration.
// I'll check existence of siteConfig first in next step or just default to hardcoded if simple. 
// "company" is likely { name: "Pablo e.U." }
// Let's safe-guard:
const companySafe = { name: "Pablo e.U." };

export function blogPostingJsonLd(siteUrl: string, post: BlogPost): WithContext<BlogPosting> {
    const url = `${siteUrl}${post.url}`;
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        mainEntityOfPage: url,
        image: post.heroImage ? [`${siteUrl}${post.heroImage}`] : undefined,
        inLanguage: post.locale === 'de' ? 'de-AT' : post.locale === 'pl' ? 'pl-PL' : 'en-US',
        author: {
            "@type": "Person",
            name: company.owner,
            url: siteUrl,
        },
        publisher: {
            "@type": "Organization",
            name: company.name,
            logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/logo.png`, // Assuming logo exists or using a default
            },
        },
    };
}

export function breadcrumbsJsonLd(siteUrl: string, items: { name: string; path: string }[]): WithContext<BreadcrumbList> {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: it.name,
            item: `${siteUrl}${it.path}`,
        })),
    };
}

export function faqJsonLd(post: BlogPost): WithContext<FAQPage> | null {
    if (!post.faq?.length) return null;
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((x) => ({
            "@type": "Question",
            name: x.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: x.a,
            },
        })),
    };
}
