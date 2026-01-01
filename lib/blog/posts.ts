import { allBlogPosts } from "contentlayer/generated";
import type { BlogPost } from "contentlayer/generated";
import type { Locale } from "../routes";
import { getClusterFromCategorySlug } from "./config";

export function getAllPosts(locale: Locale): BlogPost[] {
    return allBlogPosts
        .filter((p) => !p.draft && p.locale === locale)
        .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostsByCategorySlug(locale: Locale, categorySlug: string): BlogPost[] {
    const cluster = getClusterFromCategorySlug(locale, categorySlug);
    if (!cluster) return [];
    return getAllPosts(locale).filter((p) => p.cluster === cluster);
}

export function getPost(locale: Locale, categorySlug: string, slug: string): BlogPost | null {
    const post = getAllPosts(locale).find((p) => p.slug === slug);
    if (!post) return null;
    if (post.categorySlug !== categorySlug) return null;
    return post;
}

export function getTranslations(post: BlogPost): Partial<Record<Locale, BlogPost>> {
    if (!post.translationKey) return { [post.locale as Locale]: post };
    const matches = allBlogPosts.filter((p) => p.translationKey === post.translationKey && !p.draft);
    const map: Partial<Record<Locale, BlogPost>> = {};
    for (const p of matches) map[p.locale as Locale] = p;
    return map;
}

export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
    return getAllPosts(currentPost.locale as Locale)
        .filter((post) =>
            post.slug !== currentPost.slug &&
            (post.cluster === currentPost.cluster || post.tags?.some(tag => currentPost.tags?.includes(tag)))
        )
        .slice(0, limit);
}
