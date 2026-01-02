import { cookies, headers } from "next/headers";
import { LOCATION_PAGES } from "./data/location-pages";
import {
	type Locale,
	defaultLocale,
	detectLocaleFromPath,
	localeCookieName,
} from "./i18n";

function resolveLocale(pathname: string, cookieLocale?: string | null): Locale {
	const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
	const firstSegment = normalizedPath.split("/").filter(Boolean)[0];
	const matchedLocation = LOCATION_PAGES.find(
		(page) => page.slug === firstSegment,
	);

	if (matchedLocation) {
		return matchedLocation.language;
	}

	return detectLocaleFromPath(normalizedPath, cookieLocale);
}

export async function getServerLocale(): Promise<Locale> {
	const headerList = await headers();
	const path =
		headerList.get("x-invoke-path") ??
		headerList.get("next-url") ??
		headerList.get("x-next-url") ??
		"/";
	const cookieLocale = (await cookies()).get(localeCookieName)?.value;
	return resolveLocale(path, cookieLocale) ?? defaultLocale;
}

export { resolveLocale as resolveLocaleFromPath };
