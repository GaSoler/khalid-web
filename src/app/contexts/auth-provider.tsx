import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabaseClient } from "@/app/config/supabase-client";
import type { User } from "../entities/User";

// import { appUser } from "../utils/mocked-data";

interface AuthContextValue {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	signInWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const loadUser = async (_supabaseUser: SupabaseUser, accessToken: string) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			if (!response.ok) throw new Error("Falha ao buscar usuário");

			const data = await response.json();
			// const data = appUser.data;
			setUser({
				id: data.user.id,
				email: data.user.email,
				fullName: data.user.full_name,
				avatarUrl: data.user.avatarUrl,
				roles: data.user.roles,
			});
			setToken(accessToken);
		} catch {
			setUser(null);
			setToken(null);
		}
	};

	useEffect(() => {
		supabaseClient.auth.getSession().then(async ({ data }) => {
			const session = data.session;
			if (session) {
				await loadUser(session.user, session.access_token);
			}
			setIsLoading(false);
		});

		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
			if (session) {
				await loadUser(session.user, session.access_token);
			} else {
				setUser(null);
				setToken(null);
			}
			setIsLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	const signInWithGoogle = async () => {
		await supabaseClient.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: window.location.origin },
		});
	};

	const signOut = async () => {
		await supabaseClient.auth.signOut();
		setUser(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider
			value={{ user, token, isLoading, signInWithGoogle, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
	return ctx;
}
