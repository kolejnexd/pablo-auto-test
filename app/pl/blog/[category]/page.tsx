import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_META, getAllCategorySlugs, getCategoryAlternates } from "../../../../lib/blog/config";
import { getPostsByCategorySlug } from "../../../../lib/blog/posts";
import PostCard from "../../../../components/blog/PostCard";

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllCategorySlugs("pl").map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
    const alternates = getCategoryAlternates("pl", params.category);
    return {
        title: `${params.category} | ${BLOG_META.pl.title}`,
        description: BLOG_META.pl.description,
        alternates,
    };
}

export default function BlogCategoryPL({ params }: { params: { category: string } }) {
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
        </main>
    );
}
