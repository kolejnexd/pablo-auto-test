import { expect, test } from "@playwright/test";

test.describe("SEO Checks", () => {
	const pages = [
		"/",
		"/pl",
		"/en",
		"/kontakt",
		"/pl/kontakt",
		"/en/contact",
		"/ratgeber",
		"/pl/poradnik",
		"/en/guides",
	];

	for (const path of pages) {
		test(`Page ${path} should have correct SEO tags`, async ({ page }) => {
			const response = await page.goto(path);
			expect(response?.status()).toBe(200);

			const canonical = await page
				.locator('link[rel="canonical"]')
				.getAttribute("href");
			expect(canonical).toBeTruthy();
			expect(canonical).toContain("pablo-auto.at");

			const xDefault = await page
				.locator('link[rel="alternate"][hreflang="x-default"]')
				.getAttribute("href");
			expect(xDefault).toBeTruthy();

			const de = await page
				.locator('link[rel="alternate"][hreflang="de-AT"]')
				.getAttribute("href");
			expect(de).toBeTruthy(); // Should exist

			const jsonLd = await page
				.locator('script[type="application/ld+json"]')
				.count();
			expect(jsonLd).toBeGreaterThan(0);

			const firstJson = await page
				.locator('script[type="application/ld+json"]')
				.first()
				.textContent();
			expect(() => JSON.parse(firstJson || "{}")).not.toThrow();
		});
	}
});
