import type { Metadata } from "next";
import { BLOG_META } from "../../../lib/blog/config";
import { getAllPosts } from "../../../lib/blog/posts";
import BlogFeed from "../../../components/blog/BlogFeed";
import { generatePageAlternates } from "../../../lib/seo/metadataUtils";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: BLOG_META.en.title,
    description: BLOG_META.en.description,
    alternates: generatePageAlternates("blog", "en"),
};

export default function BlogIndexEN() {
    const posts = getAllPosts("en");
    const featuredPost = posts.find(p => p.featured) || posts[0];

    return <BlogFeed posts={posts} featuredPost={featuredPost} locale="en" />;
}
