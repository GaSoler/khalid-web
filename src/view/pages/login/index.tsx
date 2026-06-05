// import { LoginForm } from "./login-form";

// export function LoginPage() {
// 	return (
// 		<main className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
// 			<div className="w-full max-w-sm md:max-w-4xl">
// 				<div>
// 					<LoginForm />
// 				</div>
// 			</div>
// 		</main>
// 	);
// }

import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/app/config/supabase-client";

export function LoginPage() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		supabaseClient.auth.getUser().then(({ data }) => {
			setUser(data.user);
		});

		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
			setUser(session?.user ?? null);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const handleGoogleLogin = async () => {
		const { error } = await supabaseClient.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: window.location.origin,
			},
		});

		if (error) {
			alert(error.message);
		}
	};

	const handleLogout = async () => {
		await supabaseClient.auth.signOut();

		setUser(null);
	};

	if (user) {
		return (
			<div>
				<h1>Welcome!</h1>

				<img
					src={user.user_metadata.avatar_url}
					alt={user.user_metadata.full_name}
					width={80}
					style={{
						borderRadius: "50%",
					}}
				/>

				<p>
					<strong>Nome:</strong> {user.user_metadata.full_name}
				</p>

				<p>
					<strong>Email:</strong> {user.email}
				</p>

				<p>
					<strong>Provider:</strong> {user.app_metadata.provider}
				</p>

				<p>
					<strong>ID:</strong> {user.id}
				</p>

				<button onClick={handleLogout}>Logout</button>
			</div>
		);
	}

	return (
		<div>
			<h1>Google Login</h1>

			<button onClick={handleGoogleLogin}>Entrar com Google</button>
		</div>
	);
}
