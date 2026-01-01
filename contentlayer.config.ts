import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const LOCALES = ["de", "pl", "en"] as const;
type Locale = (typeof LOCALES)[number];

const CLUSTERS = ["roadside", "buying", "selling", "logistics", "mobility"] as const;
type ClusterKey = (typeof CLUSTERS)[number];

const CATEGORY_SLUG: Record<Locale, Record<ClusterKey, string>> = {
    de: {
        roadside: "pannenhilfe",
        buying: "ratgeber-kauf",
        selling: "autoankauf",
        logistics: "logistik-recht",
        mobility: "mobilitaet",
    },
    pl: {
        roadside: "pomoc-drogowa",
        buying: "poradnik-kupujacy",
        selling: "sprzedaz-skup",
        logistics: "logistyka-przepisy",
        mobility: "wynajem-mobilnosc",
    },
    en: {
        roadside: "roadside-assistance",
        buying: "buying-guide",
        selling: "car-selling",
        logistics: "logistics-law",
        mobility: "mobility-rental",
    },
};

export const FAQItem = defineNestedType(() => ({
    name: "FAQItem",
    fields: {
        q: { type: "string", required: true },
        a: { type: "string", required: true },
    },
}));

export const BlogPost = defineDocumentType(() => ({
    name: "BlogPost",
    filePathPattern: `blog/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: { type: "string", required: true },
        description: { type: "string", required: true },
        date: { type: "date", required: true },
        updated: { type: "date", required: false },

        locale: { type: "enum", options: [...LOCALES], required: true },
        cluster: { type: "enum", options: [...CLUSTERS], required: true },

        slug: { type: "string", required: true },
        translationKey: { type: "string", required: false },

        heroImage: { type: "string", required: false },
        tags: { type: "list", of: { type: "string" }, required: false },
        takeaways: { type: "list", of: { type: "string" }, required: false },

        faq: {
            type: "list",
            required: false,
            of: FAQItem,
        },

        draft: { type: "boolean", required: false, default: false },
        featured: { type: "boolean", required: false, default: false },
        author: { type: "string", required: false, default: "Pablo e.U." },
    },

    computedFields: {
        categorySlug: {
            type: "string",
            resolve: (doc) => CATEGORY_SLUG[doc.locale as Locale][doc.cluster as ClusterKey],
        },
        url: {
            type: "string",
            resolve: (doc) => {
                const locale = doc.locale as Locale;
                // Semantic URL structure:
                // DE: /ratgeber/[slug]
                // PL: /pl/poradnik/[slug]
                // EN: /en/guides/[slug]

                if (locale === 'pl') {
                    return `/pl/poradnik/${doc.slug}`;
                }
                if (locale === 'en') {
                    return `/en/guides/${doc.slug}`;
                }
                // DE matches default /ratgeber
                return `/ratgeber/${doc.slug}`;
            },
        },
        readingTime: {
            type: "number",
            resolve: (doc) => Math.ceil(readingTime(doc.body.raw).minutes),
        },
        headings: {
            type: "json",
            resolve: (doc) => {
                const regX = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
                const headings = Array.from(doc.body.raw.matchAll(regX)).map(({ groups }) => {
                    const flag = groups?.flag;
                    const content = groups?.content;
                    return {
                        depth: flag ? flag.length : 1,
                        text: content,
                        slug: content ? content.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") : "",
                    };
                });
                return headings;
            },
        },
    },
}));

export default makeSource({
    contentDirPath: "content",
    documentTypes: [BlogPost],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
    },
});
