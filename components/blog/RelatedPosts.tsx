import type { BlogPost } from "@velite";
import type { Locale } from "../../lib/routes";
import PostCard from "./PostCard";

const LABELS = {
	de: "Ähnliche Artikel",
	pl: "Podobne artykuły",
	en: "Related Articles",
};

export default function RelatedPosts({
	posts,
	locale = "de",
}: { posts: BlogPost[]; locale?: Locale }) {
	if (!posts || posts.length === 0) return null;

	return (
		<section className="mt-16 pt-16 border-t border-slate-100">
			<h3 className="text-2xl font-bold text-slate-900 mb-8">
				{LABELS[locale] || LABELS.de}
			</h3>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<PostCard key={post.url} post={post} />
				))}
			</div>
		</section>
	);
}
