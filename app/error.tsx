"use client";

import { Button } from "@/components/Button";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
			<h2 className="mb-4 text-2xl font-bold text-gray-900">
				Etwas ist schiefgelaufen / Coś poszło nie tak
			</h2>
			<p className="mb-8 text-gray-600">
				Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später
				erneut.
			</p>
			<Button onClick={() => reset()} variant="primary">
				Erneut versuchen / Spróbuj ponownie
			</Button>
		</div>
	);
}
