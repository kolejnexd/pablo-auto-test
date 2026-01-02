"use client";

import { Button } from "@/components/Button";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html>
			<body>
				<div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
					<h2 className="mb-4 text-2xl font-bold">
						Kritischer Fehler / Critical Error
					</h2>
					<Button onClick={() => reset()} variant="primary">
						Try again
					</Button>
				</div>
			</body>
		</html>
	);
}
