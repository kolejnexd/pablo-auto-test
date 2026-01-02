interface USPsProps {
	title: string;
	items: { title: string; description: string }[];
}

export default function USPs({ title, items }: USPsProps) {
	return (
		<section className="py-16 bg-white" aria-labelledby="eeat-heading">
			<div className="mx-auto max-w-6xl px-4">
				<h2
					id="eeat-heading"
					className="text-2xl font-bold text-brand-primary md:text-3xl mb-12 text-center"
				>
					{title}
				</h2>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{items.map((item, index) => (
						<div key={index} className="bg-bg-light rounded-xl p-6 text-center">
							<h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
							<p className="text-sm text-gray-700">{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
