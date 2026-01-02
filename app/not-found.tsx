import Link from "next/link";
import { Button } from "../components/Button";
import PostCard from "../components/blog/PostCard";
import { getAllPosts } from "../lib/blog/posts";
import { getTranslations } from "../lib/i18n";
import { getRoute } from "../lib/routes";
import { getServerLocale } from "../lib/serverLocale";

export default async function NotFound() {
	const locale = await getServerLocale();
	const t = getTranslations(locale);

	// Get 3 recent posts
	const posts = getAllPosts(locale).slice(0, 3);

	return (
		<div className="flex min-h-[80vh] flex-col bg-bg-light">
			<div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
				<h1 className="text-4xl font-bold text-brand-primary md:text-6xl">
					{t.notFound.title}
				</h1>
				<p className="mt-4 max-w-2xl text-lg text-gray-700 md:text-xl">
					{t.notFound.description}
				</p>

				<div className="mt-8 flex flex-wrap justify-center gap-4">
					<Button href={getRoute("home", locale)} variant="primary">
						{t.notFound.primary}
					</Button>
					<Button href={getRoute("vehicles", locale)} variant="secondary">
						{t.notFound.secondary}
					</Button>
				</div>
			</div>

			{posts.length > 0 && (
				<div className="w-full bg-white py-12 md:py-16">
					<div className="mx-auto max-w-6xl px-4">
						<h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
							{locale === "de"
								? "Neueste Ratgeber-Artikel"
								: locale === "pl"
									? "Najnowsze poradniki"
									: "Latest Guides"}
						</h2>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{posts.map((post) => (
								<PostCard key={post.slug} post={post} />
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
