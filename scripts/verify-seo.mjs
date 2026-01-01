const BASE_URL = 'http://localhost:3000';

const ROUTES = [
    // Homepages
    { path: '/', expectedStatus: 200, checks: ['<link rel="canonical" href="https://pablo-auto.at', 'hreflang="pl"', 'hreflang="en"'] },
    { path: '/pl', expectedStatus: 200, checks: ['<link rel="canonical" href="https://pablo-auto.at/pl', 'hreflang="de"'] },
    { path: '/en', expectedStatus: 200, checks: ['<link rel="canonical" href="https://pablo-auto.at/en', 'hreflang="de"'] },

    // Blog Indexes (New Semantic URLs)
    { path: '/ratgeber', expectedStatus: 200, checks: ['<title>', 'Ratgeber'] },
    { path: '/pl/poradnik', expectedStatus: 200, checks: ['<title>', 'Porady'] },
    { path: '/en/guides', expectedStatus: 200, checks: ['<title>', 'Blog'] },

    // Redirects (Legacy to New)
    { path: '/blog', expectedStatus: 308, expectedRedirect: '/ratgeber' }, // Next.js often uses 308 for redirects
    { path: '/pl/blog', expectedStatus: 308, expectedRedirect: '/pl/poradnik' },
    { path: '/en/blog', expectedStatus: 308, expectedRedirect: '/en/guides' },

    // Specific Redirects
    { path: '/autohandel', expectedStatus: 308, expectedRedirect: '/autohandel-gebrauchtwagen' },
];

async function checkRoute(route) {
    try {
        const res = await fetch(`${BASE_URL}${route.path}`, { redirect: 'manual' });

        // Check Status
        if (res.status !== route.expectedStatus) {
            console.error(`[FAIL] ${route.path}: Expected status ${route.expectedStatus}, got ${res.status}`);
            return false;
        }

        // Check Redirect Location
        if (route.expectedStatus >= 300 && route.expectedStatus < 400) {
            const location = res.headers.get('location');
            if (!location || !location.endsWith(route.expectedRedirect)) {
                console.error(`[FAIL] ${route.path}: Expected redirect to ${route.expectedRedirect}, got ${location}`);
                return false;
            }
            console.log(`[PASS] ${route.path} -> ${location}`);
            return true;
        }

        // Check Content (Metadata)
        const text = await res.text();
        let allChecksPassed = true;
        if (route.checks) {
            for (const check of route.checks) {
                const lowerText = text.toLowerCase();
                const lowerCheck = check.toLowerCase();
                if (!lowerText.includes(lowerCheck)) {
                    // Fallback: check original case if needed, but lowercase match is robust enough for tags
                    console.error(`[FAIL] ${route.path}: Missing expected content "${check}"`);
                    allChecksPassed = false;
                }
            }
        }

        if (allChecksPassed) {
            console.log(`[PASS] ${route.path}`);
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error(`[ERROR] ${route.path}: ${error.message}`);
        return false;
    }
}

async function run() {
    console.log('Starting SEO Verification...');
    // Wait a bit for server to be ready if needed, or assume it's running.
    // We'll retry connection a few times.

    let connected = false;
    for (let i = 0; i < 10; i++) {
        try {
            await fetch(BASE_URL);
            connected = true;
            break;
        } catch (e) {
            console.log('Waiting for server...');
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    if (!connected) {
        console.error("Could not connect to server at " + BASE_URL);
        process.exit(1);
    }

    let passed = 0;
    let failed = 0;

    for (const route of ROUTES) {
        const success = await checkRoute(route);
        if (success) passed++;
        else failed++;
    }

    console.log(`\nVerification Complete.`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);

    if (failed > 0) process.exit(1);
}

run();
