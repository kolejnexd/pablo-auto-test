import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import AuthorBox from "../../../components/blog/AuthorBox";
import BlogCTA from "../../../components/blog/BlogCTA";
import FAQSection from "../../../components/blog/FAQSection";
import KeyTakeaways from "../../../components/blog/KeyTakeaways";
import RelatedPosts from "../../../components/blog/RelatedPosts";
import StickyMobileCTA from "../../../components/blog/StickyMobileCTA";
import TableOfContents from "../../../components/blog/TableOfContents";
import MDXRenderer from "../../../components/mdx/MDXRenderer";
import type { ClusterKey } from "../../../lib/blog/config";
import {
	getPost,
	getRelatedPosts,
	getTranslations,
} from "../../../lib/blog/posts";
import {
	blogPostingJsonLd,
	breadcrumbsJsonLd,
	faqJsonLd,
} from "../../../lib/seo/blogSchema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pablo-auto.at";

export const dynamicParams = false;

export function generateStaticParams() {
	const { getAllPosts } = require("../../../lib/blog/posts");
	const posts = getAllPosts("de");
	// Only slug needed now
	return posts.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const { getPostBySlug } = require("../../../lib/blog/posts");
	const post = getPostBySlug("de", params.slug);
	if (!post) return {};

	const translations = getTranslations(post);
	const languages: Record<string, string> = {};
	if (translations.de) languages.de = `${SITE_URL}${translations.de.url}`;
	if (translations.pl) languages.pl = `${SITE_URL}${translations.pl.url}`;
	if (translations.en) languages.en = `${SITE_URL}${translations.en.url}`;
	languages["x-default"] = `${SITE_URL}${post.url}`;

	return {
		title: post.title,
		description: post.description,
		alternates: {
			canonical: `${SITE_URL}${post.url}`,
			languages,
		},
		openGraph: {
			type: "article",
			title: post.title,
			description: post.description,
			url: `${SITE_URL}${post.url}`,
			images: post.heroImage
				? [{ url: `${SITE_URL}${post.heroImage}` }]
				: undefined,
		},
	};
}

export default async function BlogPostDE(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const { getPostBySlug } = require("../../../lib/blog/posts");
	const post = getPostBySlug("de", params.slug);
	if (!post) return notFound();

	const relatedPosts = getRelatedPosts(post);

	const postJsonLd = blogPostingJsonLd(SITE_URL, post);
	const crumbs = breadcrumbsJsonLd(SITE_URL, [
		{ name: "Home", path: "/" },
		{ name: "Blog", path: "/blog" },
		{ name: post.categorySlug, path: `/blog/${post.categorySlug}` },
		{ name: post.title, path: post.url },
	]);
	const faq = faqJsonLd(post);

	return (
		<main className="mx-auto max-w-4xl px-4 py-10">
			<header className="mb-8 text-center max-w-3xl mx-auto">
				<p className="text-sm font-medium text-red-600 mb-2 uppercase tracking-wide">
					{post.categorySlug}
				</p>
				<h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-slate-900 mb-4">
					{post.title}
				</h1>
				<p className="text-lg text-slate-600">{post.description}</p>
				<div className="mt-4 flex items-center justify-center space-x-2 text-sm text-slate-500">
					<time dateTime={post.date}>
						{new Date(post.date).toLocaleDateString("de-AT")}
					</time>
					<span>•</span>
					<span>{post.readingTime} min Lesezeit</span>
				</div>
			</header>

			{post.heroImage ? (
				<div className="mb-10 relative overflow-hidden rounded-2xl shadow-lg aspect-[16/9]">
					<Image
						src={post.heroImage}
						alt={post.title}
						fill
						className="object-cover"
						priority
					/>
				</div>
			) : null}

			<div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
				<article className="prose prose-slate prose-lg max-w-none">
					<KeyTakeaways items={post.takeaways} locale="de" />

					<TableOfContents headings={(post as any).headings || []} />

					<MDXRenderer code={post.code} />

					<BlogCTA category={post.cluster as ClusterKey} locale="de" />

					<FAQSection items={post.faq || []} />

					<AuthorBox locale="de" />
				</article>

				<aside className="hidden lg:block space-y-8">
					<div className="sticky top-24">
						{/* Space for dynamic sidebar widgets or ads if needed later */}
						<div className="rounded-xl bg-slate-50 p-6 border border-slate-100">
							<h4 className="font-bold text-slate-900 mb-2">
								Haben Sie Fragen?
							</h4>
							<p className="text-sm text-slate-600 mb-4">
								Unser Team hilft Ihnen gerne weiter.
							</p>
							<a
								href="tel:+436641234567"
								className="block w-full rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-bold text-white hover:bg-green-700"
							>
								WhatsApp / Anruf
							</a>
						</div>
					</div>
				</aside>
			</div>

			<RelatedPosts posts={relatedPosts} locale="de" />

			<JsonLd data={postJsonLd as any} />
			<JsonLd data={crumbs as any} />
			{faq ? <JsonLd data={faq as any} /> : null}
			<StickyMobileCTA locale="de" />
		</main>
	);
}
