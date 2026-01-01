import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import MDXRenderer from "../../../../components/mdx/MDXRenderer";
import JsonLd from "../../../../components/JsonLd";
import { getPost, getRelatedPosts, getTranslations } from "../../../../lib/blog/posts";
import { blogPostingJsonLd, breadcrumbsJsonLd, faqJsonLd } from "../../../../lib/seo/blogSchema";
import AuthorBox from "../../../../components/blog/AuthorBox";
import TableOfContents from "../../../../components/blog/TableOfContents";
import BlogCTA from "../../../../components/blog/BlogCTA";
import FAQSection from "../../../../components/blog/FAQSection";
import StickyMobileCTA from "../../../../components/blog/StickyMobileCTA";
import KeyTakeaways from "../../../../components/blog/KeyTakeaways";
import RelatedPosts from "../../../../components/blog/RelatedPosts";
import { ClusterKey } from "../../../../lib/blog/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pablo-auto.at";

export const dynamicParams = false;

export function generateStaticParams() {
    const { getAllPosts } = require("../../../../lib/blog/posts");
    const posts = getAllPosts("en");
    // Only slug needed now
    return posts.map((p: any) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const { getPostBySlug } = require("../../../../lib/blog/posts");
    const post = getPostBySlug("en", params.slug);
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
            images: post.heroImage ? [{ url: `${SITE_URL}${post.heroImage}` }] : undefined,
        },
    };
}

export default function BlogPostEN({ params }: { params: { slug: string } }) {
    const { getPostBySlug } = require("../../../../lib/blog/posts");
    const post = getPostBySlug("en", params.slug);
    if (!post) return notFound();

    const relatedPosts = getRelatedPosts(post);

    const postJsonLd = blogPostingJsonLd(SITE_URL, post);
    const crumbs = breadcrumbsJsonLd(SITE_URL, [
        { name: "Home", path: "/en" },
        { name: "Blog", path: "/en/blog" },
        { name: post.categorySlug, path: `/en/blog/${post.categorySlug}` },
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
                <p className="text-lg text-slate-600">
                    {post.description}
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-slate-500">
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US")}</time>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                </div>
            </header>

            {post.heroImage ? (
                <div className="mb-10 relative overflow-hidden rounded-2xl shadow-lg aspect-[16/9]">
                    <Image src={post.heroImage} alt={post.title} fill className="object-cover" priority />
                </div>
            ) : null}

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
                <article className="prose prose-slate prose-lg max-w-none">
                    <KeyTakeaways items={post.takeaways} locale="en" />

                    <TableOfContents headings={(post as any).headings || []} />

                    <MDXRenderer code={post.body.code} />

                    <BlogCTA category={post.cluster as ClusterKey} locale="en" />

                    <FAQSection items={post.faq || []} />

                    <AuthorBox locale="en" />
                </article>

                <aside className="hidden lg:block space-y-8">
                    <div className="sticky top-24">
                        <div className="rounded-xl bg-slate-50 p-6 border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-2">Have questions?</h4>
                            <p className="text-sm text-slate-600 mb-4">Our team is happy to help.</p>
                            <a href="tel:+436641234567" className="block w-full rounded-lg bg-red-600 px-4 py-2 text-center text-sm font-bold text-white hover:bg-red-700">
                                WhatsApp / Call
                            </a>
                        </div>
                    </div>
                </aside>
            </div>

            <RelatedPosts posts={relatedPosts} locale="en" />

            <JsonLd data={postJsonLd as any} />
            <JsonLd data={crumbs as any} />
            {faq ? <JsonLd data={faq as any} /> : null}
            <StickyMobileCTA locale="en" />
        </main>
    );
}
