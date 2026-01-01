import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_META, getAllCategorySlugs, getCategoryAlternates } from "../../../../lib/blog/config";
import { getPostsByCategorySlug } from "../../../../lib/blog/posts";
import PostCard from "../../../../components/blog/PostCard";

export const dynamicParams = false;
export function generateStaticParams() {
    return getAllCategorySlugs("de").map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
    const alternates = getCategoryAlternates("de", params.category);
    return {
        title: `${params.category} | ${BLOG_META.de.title}`,
        description: BLOG_META.de.description,
        alternates,
    };
}

export default function BlogCategoryDE({ params }: { params: { category: string } }) {
    const posts = getPostsByCategorySlug("de", params.category);
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
                        url: `https://pablo-auto.at/pl/poradnik/kategoria/${params.category}`,
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
                                name: "Home",
                                item: "https://pablo-auto.at/",
                            },
                            {
                                "@type": "ListItem",
                                position: 2,
                                name: "Ratgeber",
                                item: "https://pablo-auto.at/ratgeber",
                            },
                            {
                                "@type": "ListItem",
                                position: 3,
                                name: params.category,
                                item: `https://pablo-auto.at/ratgeber/kategorie/${params.category}`,
                            },
                        ],
                    }),
                }}
            />
        </main>
    );
}
