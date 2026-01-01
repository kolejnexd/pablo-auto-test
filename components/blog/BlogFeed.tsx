"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "contentlayer/generated";
import PostCard from "./PostCard";
import { CATEGORY_NAMES, CATEGORY_SLUG, ClusterKey } from "../../lib/blog/config";
import { Locale } from "../../lib/routes";

interface BlogFeedProps {
    posts: BlogPost[];
    featuredPost?: BlogPost;
    locale: Locale;
}

const LABELS = {
    de: {
        searchPlaceholder: "Was suchen Sie? (z.B. Panne, Autokauf...)",
        readArticle: "Artikel lesen",
        new: "NEU",
        noResults: "Keine Artikel gefunden.",
    },
    pl: {
        searchPlaceholder: "Czego szukasz? (np. awaria, skup aut...)",
        readArticle: "Czytaj artykuł",
        new: "NOWOŚĆ",
        noResults: "Nie znaleziono artykułów.",
    },
    en: {
        searchPlaceholder: "What are you looking for? (e.g. breakdown, buying car...)",
        readArticle: "Read Article",
        new: "NEW",
        noResults: "No articles found.",
    },
};

export default function BlogFeed({ posts, featuredPost, locale }: BlogFeedProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const t = LABELS[locale] || LABELS.de;
    const categories = Object.keys(CATEGORY_NAMES[locale]) as ClusterKey[];

    const filteredPosts = useMemo(() => {
        if (!searchTerm) {
            // If no search, exclude featured post from the grid list (passed as 'posts' prop usually excludes it, but let's be safe if passed raw)
            return posts.filter(p => !featuredPost || p.url !== featuredPost.url);
        }
        const lower = searchTerm.toLowerCase();
        return posts.filter((post) => {
            // Search in title, description, tags, and category slug
            return (
                post.title.toLowerCase().includes(lower) ||
                post.description.toLowerCase().includes(lower) ||
                post.tags?.some(tag => tag.toLowerCase().includes(lower)) ||
                post.categorySlug.toLowerCase().includes(lower)
            );
        });
    }, [searchTerm, posts, featuredPost]);

    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            {/* Hero Section */}
            <header className="mb-12 text-center relative">
                <div className="absolute top-0 right-0 hidden md:block">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {locale === "de" ? "🇦🇹 🇵🇱 Seit 2018" : locale === "pl" ? "🇦🇹 🇵🇱 Od 2018 roku" : "🇦🇹 🇵🇱 Since 2018"}
                    </span>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
                    {locale === "de" ? "Ihr Experten-Ratgeber rund um Mobilität" : locale === "pl" ? "Ekspercki poradnik mobilności Pablo e.U." : "Pablo e.U. Mobility Guide"}
                </h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    {locale === "de"
                        ? "Experten-Tipps zur Pannenhilfe auf der A2, Gebrauchtwagenmarkt in Niederösterreich und Autoankauf."
                        : locale === "pl"
                            ? "Ekspercka wiedza o pomocy drogowej 24/7 na A2, zakupie aut używanych i przepisach drogowych w Austrii."
                            : "Expert guides on 24/7 roadside assistance (A2), buying/selling used cars, and transport/logistics in Austria."
                    }
                </p>

                {/* Search Input */}
                <div className="mt-8 max-w-lg mx-auto relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="block w-full rounded-2xl border-0 py-4 pl-6 pr-14 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex py-3 pr-3">
                        <button className="inline-flex items-center rounded-xl bg-red-600 px-3 py-1 text-white hover:bg-red-700">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Blog Categories">
                    {categories.map((key) => {
                        const slug = CATEGORY_SLUG[locale][key];
                        // Construct path manually to ensure prefix 
                        const path = locale === "de" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
                        return (
                            <Link
                                key={key}
                                href={path}
                                className="rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-red-600 hover:text-red-600"
                            >
                                {CATEGORY_NAMES[locale][key]}
                            </Link>
                        );
                    })}
                </nav>
            </header>

            {/* Featured Post - Only show if NO search term */}
            {!searchTerm && featuredPost && (
                <section className="mb-16">
                    <h2 className="sr-only">Featured Article</h2>
                    <div className="group relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl lg:flex lg:aspect-[21/9]">
                        <div className="relative h-64 lg:h-auto lg:w-1/2">
                            {featuredPost.heroImage && (
                                <Image
                                    src={featuredPost.heroImage}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent lg:bg-gradient-to-r" />
                        </div>
                        <div className="relative flex flex-col justify-center p-8 lg:w-1/2 lg:p-12">
                            <div className="mb-4 flex items-center space-x-2 text-sm text-blue-200">
                                <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">{t.new}</span>
                                <time dateTime={featuredPost.date}>
                                    {new Date(featuredPost.date).toLocaleDateString(locale === 'de' ? 'de-AT' : locale === 'pl' ? 'pl-PL' : 'en-GB')}
                                </time>
                            </div>
                            <h3 className="text-2xl font-bold sm:text-3xl mb-4 group-hover:text-red-400 transition-colors">
                                <Link href={featuredPost.url}>
                                    {featuredPost.title}
                                </Link>
                            </h3>
                            <p className="mb-8 text-slate-300 line-clamp-3">
                                {featuredPost.description}
                            </p>
                            <div>
                                <Link
                                    href={featuredPost.url}
                                    className="inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                                >
                                    {t.readArticle}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Posts Grid */}
            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((p) => (
                        <PostCard key={p.url} post={p} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        {t.noResults}
                    </div>
                )}
            </section>
        </main>
    );
}
