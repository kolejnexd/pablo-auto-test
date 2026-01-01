interface FAQProps {
    title: string;
    items: { question: string; answer: string }[];
}

export default function FAQ({ title, items }: FAQProps) {
    return (
        <section className="py-16 bg-gray-50" aria-labelledby="faq-heading">
            <div className="mx-auto max-w-4xl px-4">
                <h2 id="faq-heading" className="text-center text-3xl font-bold text-brand-primary mb-12">
                    {title}
                </h2>
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <details key={index} className="group rounded-xl bg-white shadow-sm [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900">
                                <h3 className="font-bold">{item.question}</h3>
                                <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-600">
                                <p>{item.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
