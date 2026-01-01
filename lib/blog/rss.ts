import type { BlogPost } from "contentlayer/generated";

function escapeXml(s: string) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function buildRssXml(siteUrl: string, title: string, description: string, posts: BlogPost[]) {
    const items = posts
        .slice(0, 50)
        .map((p) => {
            const link = `${siteUrl}${p.url}`;
            return `
        <item>
          <title>${escapeXml(p.title)}</title>
          <link>${link}</link>
          <guid isPermaLink="true">${link}</guid>
          <pubDate>${new Date(p.date).toUTCString()}</pubDate>
          <description>${escapeXml(p.description)}</description>
        </item>
      `.trim();
        })
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(description)}</description>
    ${items}
  </channel>
</rss>`;
}
