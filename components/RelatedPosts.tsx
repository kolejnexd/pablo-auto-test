import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from 'contentlayer/generated';

interface Props {
    posts: BlogPost[];
    title?: string;
}

export default function RelatedPosts({ posts, title = "Das könnte Sie auch interessieren" }: Props) {
    if (posts.length === 0) return null;

    return (
        <div className="mt-16 border-t border-gray-100 pt-12">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">{title}</h3>
            <div className="grid gap-6 md:grid-cols-3">
                {posts.map((post) => (
                    <Link key={post.slug} href={post.url} className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ring-1 ring-gray-100">
                        {post.heroImage && (
                            <div className="relative h-40 w-full overflow-hidden">
                                <Image
                                    src={post.heroImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        )}
                        <div className="p-4 flex flex-col flex-grow">
                            <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                                {post.title}
                            </h4>
                            <div className="mt-auto text-xs text-gray-400 font-medium pt-2">
                                {new Date(post.date).toLocaleDateString(post.locale === 'pl' ? 'pl-PL' : post.locale === 'en' ? 'en-US' : 'de-AT', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
