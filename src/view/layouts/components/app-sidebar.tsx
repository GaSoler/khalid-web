import { Scissors } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/app/contexts/auth-provider";
import { dataSidebar } from "@/app/utils/mocked-data";
import { getNavItemsByRole } from "@/app/utils/nav-items";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/view/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	onNewAppointment: () => void;
}

export function AppSidebar({ onNewAppointment, ...props }: AppSidebarProps) {
	const { user } = useAuth();
	const items = user ? getNavItemsByRole(user.roles) : [];

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
				<NavMain items={items} onNewAppointment={onNewAppointment} />
				<NavSecondary items={dataSidebar.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
		</Sidebar>
	);
}
