import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { Toaster } from "../components/ui/sonner";
import { TooltipProvider } from "../components/ui/tooltip";
import { AppSidebar } from "./components/app-sidebar";

export function RootLayout() {
	return (
		<>
			<TooltipProvider>
				<SidebarProvider
					style={
						{
							"--sidebar-width": "calc(var(--spacing) * 72)",
							"--header-height": "calc(var(--spacing) * 12)",
						} as React.CSSProperties
					}
				>
					<AppSidebar />
					<SidebarInset>
						<Header />
						<div className="flex flex-1 flex-col gap-4 p-4">
							<Outlet />
						</div>
					</SidebarInset>
				</SidebarProvider>
			</TooltipProvider>
			<Toaster />
		</>
	);
}
