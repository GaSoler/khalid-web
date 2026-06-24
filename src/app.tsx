import { AuthProvider } from "./app/contexts/auth-provider";
import { ThemeProvider } from "./app/contexts/theme-provider";
import { Router } from "./router";

export function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</ThemeProvider>
	);
}
