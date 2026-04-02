import { ThemeProvider } from "./app/contexts/theme-provider";
import { Router } from "./router";

export function App() {
	return (
		<ThemeProvider>
			<Router />
		</ThemeProvider>
	);
}
