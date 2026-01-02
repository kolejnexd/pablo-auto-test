"use client";

import * as runtime from "react/jsx-runtime";

const useMDXComponent = (code: string) => {
	const fn = new Function(code);
	return fn({ ...runtime }).default;
};

const mdxComponents = {
	// tu można dodać np. Button, CTA box itd.
};

export default function MDXRenderer({ code }: { code: string }) {
	const Component = useMDXComponent(code);
	return (
		<div className="prose prose-slate max-w-none">
			<Component components={mdxComponents} />
		</div>
	);
}
