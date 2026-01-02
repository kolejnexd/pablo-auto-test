import BlogFeed from "@/components/blog/BlogFeed";
import { BLOG_META } from "@/lib/blog/config";
import { getAllPosts } from "@/lib/blog/posts";
import { constructMetadata } from "@/lib/metadata";
import Script from "next/script";

export const dynamic = "force-static";

export const metadata = constructMetadata({
	title: BLOG_META.de.title,
	description: BLOG_META.de.description,
	key: "blog",
	locale: "de",
});

export default function BlogIndexDE() {
	const posts = getAllPosts("de");
	const featuredPost = posts.find((p) => p.featured) || posts[0];

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: BLOG_META.de.title,
		description: BLOG_META.de.description,
		url: "https://pablo-auto.at/ratgeber",
		inLanguage: "de-AT",
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
			<BlogFeed posts={posts} featuredPost={featuredPost} locale="de" />
		</>
	);
}
