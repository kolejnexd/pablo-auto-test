import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineCollection, defineConfig, s } from "velite";

const LOCALES = ["de", "pl", "en"] as const;
const CLUSTERS = [
	"roadside",
	"buying",
	"selling",
	"logistics",
	"mobility",
] as const;

type Locale = (typeof LOCALES)[number];
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

const faqItem = s.object({
	q: s.string(),
	a: s.string(),
});

const posts = defineCollection({
	name: "BlogPost",
	pattern: "blog/**/*.mdx",
	schema: s
		.object({
			title: s.string(),
			description: s.string(),
			date: s.isodate(), // map to string/date
			updated: s.isodate().optional(),
			locale: s.enum(LOCALES),
			cluster: s.enum(CLUSTERS),
			slug: s.string(),
			translationKey: s.string().optional(),
			heroImage: s.string().optional(),
			tags: s.array(s.string()).optional(),
			takeaways: s.array(s.string()).optional(),
			faq: s.array(faqItem).optional(),
			draft: s.boolean().default(false),
			featured: s.boolean().default(false),
			author: s.string().default("Pablo e.U."),
			// body is automatic in velite if markdown/mdx is enabled
			code: s.mdx(),
			raw: s.raw(),
		})
		.transform((data) => {
			const locale = data.locale as Locale;
			const cluster = data.cluster as ClusterKey;

			const categorySlug = CATEGORY_SLUG[locale][cluster];

			let url = "";
			if (locale === "pl") {
				url = `/pl/poradnik/${data.slug}`;
			} else if (locale === "en") {
				url = `/en/guides/${data.slug}`;
			} else {
				url = `/ratgeber/${data.slug}`;
			}

			const time = Math.ceil(readingTime(data.raw).minutes);

			const regX = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
			const headings = Array.from(data.raw.matchAll(regX)).map(({ groups }) => {
				const flag = groups?.flag;
				const content = groups?.content;
				return {
					depth: flag ? flag.length : 1,
					text: content,
					slug: content
						? content
								.toLowerCase()
								.replace(/\s+/g, "-")
								.replace(/[^\w-]/g, "")
						: "",
				};
			});

			return {
				...data,
				categorySlug,
				url,
				readingTime: time,
				headings,
			};
		}),
});

export default defineConfig({
	root: "content",
	output: {
		data: ".velite",
		assets: "public/static",
		base: "/static/",
		name: "[name]-[hash:6].[ext]",
		clean: true,
	},
	collections: { posts },
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
	},
});
