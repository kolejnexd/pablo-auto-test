import { NextResponse } from "next/server";
import { BLOG_META } from "../../../lib/blog/config";
import { getAllPosts } from "../../../lib/blog/posts";
import { buildRssXml } from "../../../lib/blog/rss";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pablo-auto.at";

export const dynamic = "force-static";

export async function GET() {
	const posts = getAllPosts("de");
	const xml = buildRssXml(
		SITE_URL,
		BLOG_META.de.title,
		BLOG_META.de.description,
		posts,
	);
	return new NextResponse(xml, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
}
