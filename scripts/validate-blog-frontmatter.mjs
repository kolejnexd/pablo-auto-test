import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.join(__dirname, '../content/blog');

const REQUIRED_FIELDS = ['title', 'description', 'date', 'locale', 'cluster', 'slug'];
const VALID_LOCALES = ['de', 'pl', 'en'];
const VALID_CLUSTERS = ['roadside', 'buying', 'selling', 'logistics', 'mobility'];

function validateFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const errors = [];

    REQUIRED_FIELDS.forEach(field => {
        if (!data[field]) {
            errors.push(`Missing required field: ${field}`);
        }
    });

    if (data.locale && !VALID_LOCALES.includes(data.locale)) {
        errors.push(`Invalid locale: ${data.locale}`);
    }

    if (data.cluster && !VALID_CLUSTERS.includes(data.cluster)) {
        errors.push(`Invalid cluster: ${data.cluster}`);
    }

    if (data.faq) {
        if (!Array.isArray(data.faq)) {
            errors.push('FAQ must be an array');
        } else {
            data.faq.forEach((item, index) => {
                if (!item.q || !item.a) {
                    errors.push(`FAQ item ${index} missing q or a`);
                }
            });
        }
    }

    if (data.heroImage) {
        const publicDir = path.join(__dirname, '../public');
        const imagePath = path.join(publicDir, data.heroImage);
        if (!fs.existsSync(imagePath)) {
            errors.push(`Image not found: ${data.heroImage}`);
        }
    }

    return errors;
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    let hasError = false;

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (traverseDir(filePath)) hasError = true;
        } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
            const errors = validateFile(filePath);
            if (errors.length > 0) {
                console.error(`\nErrors in ${filePath}:`);
                errors.forEach(err => console.error(` - ${err}`));
                hasError = true;
            }
        }
    });

    return hasError;
}

console.log('Validating MDX frontmatter...');
if (traverseDir(CONTENT_DIR)) {
    console.error('\nValidation FAILED.');
    process.exit(1);
} else {
    console.log('\nValidation PASSED.');
    process.exit(0);
}
