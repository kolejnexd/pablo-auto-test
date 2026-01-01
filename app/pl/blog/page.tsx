import type { Metadata } from "next";
import { BLOG_META } from "../../../lib/blog/config";
import { getAllPosts } from "../../../lib/blog/posts";
import BlogFeed from "../../../components/blog/BlogFeed";
import { generatePageAlternates } from "../../../lib/seo/metadataUtils";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: BLOG_META.pl.title,
    description: BLOG_META.pl.description,
    alternates: generatePageAlternates("blog", "pl"),
};

export default function BlogIndexPL() {
    const posts = getAllPosts("pl");
    const featuredPost = posts.find(p => p.featured) || posts[0];

    return <BlogFeed posts={posts} featuredPost={featuredPost} locale="pl" />;
}
