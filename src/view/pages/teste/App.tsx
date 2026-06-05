import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/app/config/supabase-client";

function App() {
	const [user, setUser] = useState<User | null>(null);
	const [debugData, setDebugData] = useState<any>(null);

	useEffect(() => {
		supabaseClient.auth.getUser().then(({ data }) => {
			setUser(data.user);
		});

		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const handleLogin = async () => {
		await supabaseClient.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: window.location.origin,
			},
		});
	};

	const handleLogout = async () => {
		await supabaseClient.auth.signOut();

		setDebugData(null);
	};

	const handleDebug = async () => {
		const sessionResponse = await supabaseClient.auth.getSession();

		const userResponse = await supabaseClient.auth.getUser();

		setDebugData({
			session: sessionResponse,
			user: userResponse,
		});
	};

	if (!user) {
		return (
			<div
				style={{
					height: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					gap: "1rem",
					fontFamily: "sans-serif",
				}}
			>
				<h1>Khalid Barbearia</h1>

				<button
					onClick={handleLogin}
					style={{
						padding: "12px 20px",
						cursor: "pointer",
					}}
				>
					Entrar com Google
				</button>
			</div>
		);
	}

	return (
		<div
			style={{
				padding: "2rem",
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
				fontFamily: "sans-serif",
			}}
		>
			<h1>Usuário logado</h1>

			<img
				src={user.user_metadata.avatar_url}
				alt=""
				width={80}
				height={80}
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
				<strong>ID:</strong> {user.id}
			</p>

			<p>
				<strong>Provider:</strong> {user.app_metadata.provider}
			</p>

			<div
				style={{
					display: "flex",
					gap: "1rem",
				}}
			>
				<button
					onClick={handleLogout}
					style={{
						padding: "12px 20px",
						cursor: "pointer",
					}}
				>
					Logout
				</button>

				<button
					onClick={handleDebug}
					style={{
						padding: "12px 20px",
						cursor: "pointer",
					}}
				>
					Debug Supabase
				</button>
			</div>

			{debugData && (
				<div>
					<h2>Debug Data</h2>

					<pre
						style={{
							background: "#111",
							color: "#0f0",
							padding: "1rem",
							borderRadius: "8px",
							overflow: "auto",
							fontSize: "12px",
							maxHeight: "600px",
						}}
					>
						{JSON.stringify(debugData, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
}

export default App;
