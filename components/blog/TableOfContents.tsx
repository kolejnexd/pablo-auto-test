"use client";

import { useEffect, useState } from "react";

interface TOCProps {
	headings: { slug: string; text: string; depth: number }[];
}

export default function TableOfContents({ headings }: TOCProps) {
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: "0px 0px -80% 0px" },
		);

		headings.forEach(({ slug }) => {
			const element = document.getElementById(slug);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, [headings]);

	if (headings.length === 0) return null;

	return (
		<nav className="mb-8 rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
			<h3 className="mb-4 text-lg font-bold text-slate-900">
				Inhaltsverzeichnis
			</h3>
			<ul className="space-y-2">
				{headings.map(({ slug, text, depth }) => (
					<li key={slug} style={{ paddingLeft: (depth - 2) * 16 }}>
						<a
							href={`#${slug}`}
							className={`block text-sm transition-colors hover:text-red-600 ${
								activeId === slug
									? "font-semibold text-red-600"
									: "text-slate-600"
							}`}
							onClick={(e) => {
								e.preventDefault();
								document
									.getElementById(slug)
									?.scrollIntoView({ behavior: "smooth" });
							}}
						>
							{text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
