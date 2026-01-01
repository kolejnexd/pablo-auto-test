"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

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
