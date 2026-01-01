import type { Metadata } from "next";
import { BLOG_META } from "../../lib/blog/config";
import { getAllPosts } from "../../lib/blog/posts";
import BlogFeed from "../../components/blog/BlogFeed";
import { generatePageAlternates } from "../../lib/seo/metadataUtils";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: BLOG_META.de.title,
    description: BLOG_META.de.description,
    alternates: generatePageAlternates("blog", "de"),
};

export default function BlogIndexDE() {
    const posts = getAllPosts("de");
    const featuredPost = posts.find(p => p.featured) || posts[0];

    return <BlogFeed posts={posts} featuredPost={featuredPost} locale="de" />;
}
