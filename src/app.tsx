import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./app/contexts/auth-provider";
import { ThemeProvider } from "./app/contexts/theme-provider";
import { Router } from "./router";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60,
			retry: 1,
		},
	},
});

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<AuthProvider>
					<Router />
				</AuthProvider>
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} /> {/* 👈 */}
		</QueryClientProvider>
	);
}
