import type { MetadataRoute } from "next";
import { allBlogPosts } from "contentlayer/generated";
import type { Locale } from "../routes";
import { getRoute } from "../routes";
import { CATEGORY_SLUG } from "./config";

function isoDate(d: string | Date): string {
    const dd = typeof d === "string" ? new Date(d) : d;
    return dd.toISOString();
}

export function getAllBlogSitemapEntries(siteUrl: string): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];
    const locales: Locale[] = ["de", "pl", "en"];

    // Blog index + hubs
    for (const locale of locales) {
        entries.push({
            url: `${siteUrl}${getRoute("blog", locale)}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.7,
        });

        for (const categorySlug of Object.values(CATEGORY_SLUG[locale])) {
            entries.push({
                url: `${siteUrl}${getRoute("blog", locale)}/${categorySlug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.6,
            });
        }
    }

    // Posts
    for (const p of allBlogPosts.filter((x) => !x.draft)) {
        entries.push({
            url: `${siteUrl}${p.url}`,
            lastModified: isoDate(p.updated ?? p.date),
            changeFrequency: "weekly",
            priority: 0.6,
        });
    }

    return entries;
}
