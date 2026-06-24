import { useAuth } from "@/app/contexts/auth-provider";

export function createApiClient(token: string) {
	const baseUrl = import.meta.env.VITE_API_URL;

	return {
		get: (path: string) =>
			fetch(`${baseUrl}${path}`, {
				headers: { Authorization: `Bearer ${token}` },
			}).then((r) => r.json()),

		post: (path: string, body: unknown) =>
			fetch(`${baseUrl}${path}`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			}).then((r) => r.json()),

		// put, delete, etc...
	};
}

export function useApi() {
	const { token } = useAuth();
	if (!token) throw new Error("Sem token disponível");
	return createApiClient(token);
}
