import PostCard from "@/components/blog/PostCard";
import {
	BLOG_META,
	getAllCategorySlugs,
	getCategoryAlternates,
} from "@/lib/blog/config";
import { getPostsByCategorySlug } from "@/lib/blog/posts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
	return getAllCategorySlugs("pl").map((category) => ({ category }));
}

export async function generateMetadata(props: {
	params: Promise<{ category: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const alternates = getCategoryAlternates("pl", params.category);
	return {
		title: `${params.category} | ${BLOG_META.pl.title}`,
		description: BLOG_META.pl.description,
		alternates,
	};
}

export default async function BlogCategoryPL(props: {
	params: Promise<{ category: string }>;
}) {
	const params = await props.params;
	const posts = getPostsByCategorySlug("pl", params.category);
	if (!posts.length) return notFound();

	return (
		<main className="mx-auto max-w-6xl px-4 py-10">
			<h1 className="text-3xl font-bold">Blog: {params.category}</h1>

			<section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((p) => (
					<PostCard key={p.url} post={p} />
				))}
			</section>

			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "CollectionPage",
						name: `${params.category} | ${BLOG_META.pl.title}`,
						description: BLOG_META.pl.description,
						url: `https://pablo-auto.at/pl/blog/${params.category}`,
						isPartOf: {
							"@type": "WebSite",
							name: "Pablo e.U.",
							url: "https://pablo-auto.at",
						},
					}),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Start",
								item: "https://pablo-auto.at/pl",
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "Blog",
								item: "https://pablo-auto.at/pl/blog",
							},
							{
								"@type": "ListItem",
								position: 3,
								name: params.category,
								item: `https://pablo-auto.at/pl/blog/${params.category}`,
							},
						],
					}),
				}}
			/>
		</main>
	);
}
