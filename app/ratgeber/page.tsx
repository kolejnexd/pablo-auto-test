import { BLOG_META } from "@/lib/blog/config";
import { getAllPosts } from "@/lib/blog/posts";
import BlogFeed from "@/components/blog/BlogFeed";
import { constructMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata = constructMetadata({
    title: BLOG_META.de.title,
    description: BLOG_META.de.description,
    key: "blog",
    locale: "de",
});

export default function BlogIndexDE() {
    const posts = getAllPosts("de");
    const featuredPost = posts.find(p => p.featured) || posts[0];

    return <BlogFeed posts={posts} featuredPost={featuredPost} locale="de" />;
}
