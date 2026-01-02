"use client";

import Image from "next/image";
import Link from "next/link";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import type { Locale } from "../lib/i18n";
import { company } from "../lib/siteConfig";

interface Props {
	initialLocale?: Locale;
}

export default function Footer({ initialLocale }: Props) {
	const { t } = useCurrentLocale(initialLocale);

	return (
		<footer className="mt-16 border-t bg-bg-light/60">
			<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5">
				<div>
					<h3 className="text-lg font-semibold text-brand-primary">
						{t.footer.contact}
					</h3>
					<p className="mt-2 text-sm text-gray-700">
						{company.name}
						<br />
						{company.address}
						<br />
						Telefon:{" "}
						<a href={`tel:${company.phone.replace(/[^0-9+]/g, "")}`}>
							{company.phone}
						</a>
						<br />
						E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
					</p>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-brand-primary">
						{t.footer.services}
					</h3>
					<ul className="mt-2 space-y-2 text-sm text-gray-700">
						{t.footer.serviceLinks.map((item) => (
							<li key={item.href}>
								<Link href={item.href} prefetch={false}>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-brand-primary">
						{t.footer.about}
					</h3>
					<ul className="mt-2 space-y-2 text-sm text-gray-700">
						{t.footer.aboutLinks.map((item) => (
							<li key={item.href}>
								<Link href={item.href} prefetch={false}>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-brand-primary">
						{t.footer.legal}
					</h3>
					<ul className="mt-2 space-y-2 text-sm text-gray-700">
						{t.footer.legalLinks.map((item) => (
							<li key={item.href}>
								<Link href={item.href} prefetch={false}>
									{item.label}
								</Link>
							</li>
						))}
						<li>{t.footer.cashless}</li>
					</ul>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-brand-primary">
						{t.footer.useful}
					</h3>
					<ul className="mt-2 space-y-2 text-sm text-gray-700">
						{t.footer.usefulLinks.map((item) => (
							<li key={item.href}>
								<Link href={item.href} prefetch={false}>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="border-t bg-white py-4 text-xs text-gray-500">
				<div className="relative mx-auto flex w-full flex-col items-center gap-2 px-4 sm:block">
					<p className="text-center">
						© {new Date().getFullYear()} {company.name}. {t.footer.copyright}
					</p>

					<p className="muted footer-credit flex items-center gap-1 sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2">
						<a
							href="https://webwizytowka.pl"
							target="_blank"
							rel="noopener noreferrer"
							className="footer-credit-link inline-flex items-center"
						>
							<span className="footer-credit-brand mr-1">
								<Image
									src="/assets/webwizytowka-logo.webp"
									alt="Webwizytowka – Website design & development"
									width={20}
									height={20}
									className="opacity-80 grayscale transition hover:grayscale-0 hover:opacity-100"
								/>
							</span>
						</a>
						<span>Website design &amp; development</span>
					</p>
				</div>
			</div>
		</footer>
	);
}
