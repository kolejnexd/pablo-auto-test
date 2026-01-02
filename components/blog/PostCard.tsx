import type { BlogPost } from "@velite";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY_NAMES, type ClusterKey } from "../../lib/blog/config";
import type { Locale } from "../../lib/routes";

const FLAGS: Record<string, string> = { de: "🇦🇹", pl: "🇵🇱", en: "🇬🇧" };

export default function PostCard({ post }: { post: BlogPost }) {
	const locale = post.locale as Locale;
	const cluster = post.cluster as ClusterKey;
	const categoryName = CATEGORY_NAMES[locale]?.[cluster] || cluster;

	const READ_MORE: Record<string, string> = {
		de: "Mehr lesen",
		pl: "Czytaj więcej",
		en: "Read more",
	};

	return (
		<article className="group flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-slate-100/50">
			{post.heroImage ? (
				<Link
					href={post.url}
					className="relative aspect-[16/9] block overflow-hidden"
				>
					<Image
						src={post.heroImage}
						alt={post.title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					<div className="absolute top-2 right-2 flex gap-1">
						<span className="inline-flex items-center rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm">
							{FLAGS[post.locale] || post.locale.toUpperCase()}
						</span>
					</div>
				</Link>
			) : null}

			<div className="flex flex-col flex-grow p-6">
				<div className="flex items-center space-x-2 text-xs font-medium text-slate-500 mb-2">
					<span className="text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
						{categoryName}
					</span>
				</div>
				<div className="flex items-center space-x-2 text-xs font-medium text-slate-400 mb-3">
					<time dateTime={post.date}>
						{new Date(post.date).toLocaleDateString(
							locale === "de" ? "de-AT" : locale === "pl" ? "pl-PL" : "en-GB",
						)}
					</time>
					<span>•</span>
					<span>{post.readingTime} min</span>
				</div>

				<h3 className="text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-red-600 transition-colors">
					<Link href={post.url}>{post.title}</Link>
				</h3>

				<p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">
					{post.description}
				</p>

				<div className="mt-auto pt-4 border-t border-slate-50">
					<Link
						href={post.url}
						className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
					>
						{READ_MORE[locale] || READ_MORE.de}
						<svg
							className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</article>
	);
}
