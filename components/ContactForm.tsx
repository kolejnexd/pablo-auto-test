"use client";

import { type FormEvent, useState } from "react";
import { useCurrentLocale } from "../hooks/useCurrentLocale";
import type { Locale } from "../lib/i18n";
import { company } from "../lib/siteConfig";
import { Button } from "./Button";

interface Props {
	initialLocale?: Locale;
}

export default function ContactForm({ initialLocale }: Props) {
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");
	const { t } = useCurrentLocale(initialLocale);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);

		// Basic validation
		if (
			!formData.get("name") ||
			!formData.get("phone") ||
			!formData.get("message")
		) {
			setError(t.form.required);
			return;
		}

		setError("");

		try {
			const response = await fetch(
				"https://formsubmit.co/ajax/office@pablo-auto.at",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify({
						name: formData.get("name"),
						phone: formData.get("phone"),
						email: formData.get("email") || "Brak emaila",
						message: formData.get("message"),
						_subject: `Nowa wiadomość od ${formData.get("name")}`,
						_template: "table",
					}),
				},
			);

			if (response.ok) {
				setSubmitted(true);
				form.reset();
			} else {
				setError(
					"Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub zadzwoń.",
				);
			}
		} catch (err) {
			console.error(err);
			setError("Błąd połączenia. Zadzwoń do nas bezpośrednio.");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid gap-4 sm:grid-cols-2">
				<label className="flex flex-col gap-2 text-sm text-gray-700">
					{t.form.name}
					<input
						name="name"
						className="rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-primary focus:outline-none"
						placeholder={t.form.name}
					/>
				</label>
				<label className="flex flex-col gap-2 text-sm text-gray-700">
					{t.form.phone}
					<input
						name="phone"
						className="rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-primary focus:outline-none"
						placeholder={t.form.phone}
					/>
				</label>
				<label className="flex flex-col gap-2 text-sm text-gray-700">
					{t.form.email}
					<input
						name="email"
						type="email"
						className="rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-primary focus:outline-none"
						placeholder={t.form.email}
					/>
				</label>
				<div />
			</div>
			<label className="flex flex-col gap-2 text-sm text-gray-700">
				{t.form.message}
				<textarea
					name="message"
					rows={4}
					className="rounded-lg border border-gray-200 px-3 py-2 focus:border-brand-primary focus:outline-none"
					placeholder={t.form.message}
				/>
			</label>
			{error && <p className="text-sm text-brand-accent">{error}</p>}
			{submitted ? (
				<p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
					{t.form.success} {t.common.callNow}:{" "}
					<a href={`tel:${company.phone.replace(/[^0-9+]/g, "")}`}>
						{company.phone}
					</a>
				</p>
			) : null}
			<Button type="submit" variant="primary" className="w-full">
				{t.form.submit}
			</Button>
		</form>
	);
}
