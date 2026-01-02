interface Testimonial {
	quote: string;
	author: string;
}

interface TestimonialsSectionProps {
	title: string;
	items: Testimonial[];
}

export default function TestimonialsSection({
	title,
	items,
}: TestimonialsSectionProps) {
	return (
		<section className="bg-bg-light py-16">
			<div className="mx-auto max-w-6xl px-4">
				<h2 className="text-2xl font-semibold text-brand-primary">{title}</h2>
				<div className="mt-8 grid gap-6 md:grid-cols-2">
					{items.map((item) => (
						<figure
							key={item.author}
							className="rounded-2xl bg-white p-6 shadow-soft"
						>
							<blockquote className="text-gray-700">“{item.quote}”</blockquote>
							<figcaption className="mt-4 text-sm font-semibold text-brand-primary">
								{item.author}
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</section>
	);
}
