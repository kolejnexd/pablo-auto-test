import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getRoute } from "../lib/routes";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	locale: Locale;
}

export function Pagination({
	currentPage,
	totalPages,
	locale,
}: PaginationProps) {
	if (totalPages <= 1) return null;

	const basePath = getRoute("vehicles", locale);

	const createPageLink = (page: number) => {
		return page === 1 ? basePath : `${basePath}?page=${page}`;
	};

	return (
		<div className="flex justify-center mt-12 gap-2">
			{/* PREV */}
			{currentPage > 1 && (
				<Link
					href={createPageLink(currentPage - 1)}
					className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
				>
					&larr;
				</Link>
			)}

			{/* Pages */}
			<div className="flex gap-2">
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<Link
						key={page}
						href={createPageLink(page)}
						className={`px-4 py-2 rounded-lg font-medium border ${
							currentPage === page
								? "bg-brand-primary text-white border-brand-primary"
								: "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
						}`}
					>
						{page}
					</Link>
				))}
			</div>

			{/* NEXT */}
			{currentPage < totalPages && (
				<Link
					href={createPageLink(currentPage + 1)}
					className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
				>
					&rarr;
				</Link>
			)}
		</div>
	);
}
