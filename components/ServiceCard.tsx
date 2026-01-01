import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  href?: string;
}

export default function ServiceCard({ title, description, href }: Props) {
  const cardContent = (
    <div className="group relative h-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <h3 className="text-xl font-bold text-brand-primary mb-3">{title}</h3>
      <p className="text-base text-slate-600 leading-relaxed mb-4">{description}</p>
      {href ? (
        <span className="inline-flex items-center text-sm font-semibold text-brand-primary transition-colors group-hover:text-brand-accent">
          Mehr erfahren
          <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} prefetch={false} className="block">
        {cardContent}
      </Link>
    );
  }
  return cardContent;
}
