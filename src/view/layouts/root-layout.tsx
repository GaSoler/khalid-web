import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { Toaster } from "../components/ui/sonner";
import { TooltipProvider } from "../components/ui/tooltip";
import { CustomerNewAppointmentSheet } from "../pages/customer/appointments/new";
import { AppSidebar } from "./components/app-sidebar";

export function RootLayout() {
	const [sheetOpen, setSheetOpen] = useState(false);

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
					className="h-dvh"
				>
					<AppSidebar onNewAppointment={() => setSheetOpen(true)} />
					<SidebarInset className="flex flex-col overflow-y-auto">
						<Header />
						<div className="p-4">
							<Outlet />
						</div>
					</SidebarInset>
				</SidebarProvider>
			</TooltipProvider>

			<CustomerNewAppointmentSheet
				open={sheetOpen}
				onOpenChange={setSheetOpen}
			/>
			<Toaster />
		</>
	);
}
