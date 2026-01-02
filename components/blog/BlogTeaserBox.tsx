import type { BlogPost } from "@velite";
import Image from "next/image";
import Link from "next/link";
import { type Locale, getTranslations } from "../../lib/i18n";
import { getRoute } from "../../lib/routes";

interface Props {
	post: BlogPost;
	categoryLabel: string;
	locale: Locale;
}

export default function BlogTeaserBox({ post, categoryLabel, locale }: Props) {
	const t = getTranslations(locale);

	return (
		<div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md max-w-2xl mx-auto">
			<div className="flex flex-col gap-6 sm:flex-row sm:items-center">
				<div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24">
					{post.heroImage && (
						<Image
							src={post.heroImage}
							alt={post.title}
							fill
							className="object-cover"
							sizes="(max-width: 640px) 100vw, 96px"
						/>
					)}
				</div>

				<div className="flex-1">
					<div className="mb-2 flex items-center gap-2">
						<span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
							{categoryLabel}
						</span>
					</div>

					<h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
						<Link href={post.url} className="hover:text-brand-primary">
							{post.title}
						</Link>
					</h3>

					<p className="text-sm text-gray-600 line-clamp-2 mb-3">
						{post.description}
					</p>

					<Link
						href={post.url}
						className="text-sm font-semibold text-brand-primary hover:text-brand-accent inline-flex items-center gap-1"
					>
						{t.common.readMore} <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
