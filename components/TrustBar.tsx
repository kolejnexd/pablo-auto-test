import { CheckCircle } from "lucide-react";

interface Props {
	items: string[];
}

export default function TrustBar({ items }: Props) {
	return (
		<div className="w-full bg-blue-50/50 border-y border-blue-100 py-3">
			<div className="mx-auto max-w-7xl px-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-blue-900/80">
				{items.map((item, i) => (
					<span key={i} className="flex items-center gap-1.5 whitespace-nowrap">
						<CheckCircle className="w-4 h-4 text-brand-accent" />
						{item}
					</span>
				))}
			</div>
		</div>
	);
}
