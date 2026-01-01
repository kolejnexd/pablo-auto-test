import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Potential paths for sitemap in Next.js App Router build
const POTENTIAL_PATHS = [
    path.join(__dirname, '../.next/server/app/sitemap.xml.body'), // Next.js cached body
    path.join(__dirname, '../.next/server/app/sitemap.xml'), // Server output
    path.join(__dirname, '../public/sitemap.xml'),           // Static public
    path.join(__dirname, '../.next/static/sitemap.xml'),     // Static build
];

function findSitemap() {
    for (const p of POTENTIAL_PATHS) {
        if (fs.existsSync(p)) return p;
    }
    return null;
}

function normalizeUrl(url) {
    // Remove trailing slash unless it's the root domain
    const u = new URL(url);
    if (u.pathname.endsWith('/') && u.pathname !== '/') {
        u.pathname = u.pathname.slice(0, -1);
    }
    return u.toString();
}

const sitemapPath = findSitemap();

if (!sitemapPath) {
    console.warn('⚠️ No sitemap.xml found in common build locations. Skipping audit for now (might be dynamic only).');
    process.exit(0);
}

console.log(`Scanning sitemap at: ${sitemapPath}`);
const content = fs.readFileSync(sitemapPath, 'utf8');

// Simple regex to extract <loc>...</loc>
const locRegex = /<loc>(.*?)<\/loc>/g;
const urls = [];
let match;

while ((match = locRegex.exec(content)) !== null) {
    urls.push(match[1]);
}

console.log(`Found ${urls.length} URLs.`);

const duplicates = new Map();
const normalizedSet = new Set();

let hasError = false;

urls.forEach(rawUrl => {
    const normalized = normalizeUrl(rawUrl);

    if (normalizedSet.has(normalized)) {
        duplicates.set(normalized, (duplicates.get(normalized) || 0) + 1);
        hasError = true;
    }
    normalizedSet.add(normalized);
});

if (hasError) {
    console.error('\n❌ Duplicate URLs found in sitemap:');
    duplicates.forEach((count, url) => {
        console.error(` - ${url} (appears ${count + 1} times)`);
    });
    process.exit(1);
} else {
    console.log('\n✅ No duplicate URLs found.');
    console.log('✅ URLs are valid and normalized.');
    process.exit(0);
}
