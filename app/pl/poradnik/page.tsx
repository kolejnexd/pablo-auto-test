import type { Metadata } from "next";
import Script from "next/script";
import BlogFeed from "../../../components/blog/BlogFeed";
import { BLOG_META } from "../../../lib/blog/config";
import { getAllPosts } from "../../../lib/blog/posts";
import { generatePageAlternates } from "../../../lib/seo/metadataUtils";

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: BLOG_META.pl.title,
	description: BLOG_META.pl.description,
	alternates: generatePageAlternates("blog", "pl"),
};

export default function BlogIndexPL() {
	const posts = getAllPosts("pl");
	const featuredPost = posts.find((p) => p.featured) || posts[0];

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: BLOG_META.pl.title,
		description: BLOG_META.pl.description,
		url: "https://pablo-auto.at/pl/poradnik",
		inLanguage: "pl-PL",
		isPartOf: {
			"@type": "WebSite",
			url: "https://pablo-auto.at/",
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<BlogFeed posts={posts} featuredPost={featuredPost} locale="pl" />
		</>
	);
}
