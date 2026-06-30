import axios from "axios";
import { supabaseClient } from "@/app/config/supabase-client";

export const httpClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use(async (config) => {
	const { data } = await supabaseClient.auth.getSession();
	const token = data.session?.access_token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

httpClient.interceptors.response.use(
	(res) => res,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const { data } = await supabaseClient.auth.refreshSession();
			const token = data.session?.access_token;

			if (token) {
				originalRequest.headers.Authorization = `Bearer ${token}`;
				return httpClient(originalRequest);
			}

			await supabaseClient.auth.signOut();
			window.location.href = "/login";
		}

		return Promise.reject(error);
	},
);
