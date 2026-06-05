import { Scissors } from "lucide-react";
import { Link } from "react-router-dom";
import { dataSidebar } from "@/app/utils/mocked-data";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/view/components/ui/sidebar";
import { NavDocuments } from "./nav-documents";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:p-1.5!"
						>
							<Link to={"/"}>
								<Scissors className="size-5!" />
								<span className="text-base font-semibold">
									Khalid Barbearia
								</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={dataSidebar.navMain} />
				<NavDocuments items={dataSidebar.documents} />
				<NavSecondary items={dataSidebar.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={dataSidebar.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
