import { Link } from "react-router-dom";
import type { NavItem } from "@/app/utils/nav-items";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/view/components/ui/sidebar";

export function NavMain({
	items,
	onNewAppointment,
}: {
	items: NavItem[];
	onNewAppointment: () => void;
}) {
	const { setOpenMobile } = useSidebar();

	const handleClick = (item: NavItem) => {
		setOpenMobile(false);
		if (item.action === "new-appointment") {
			setTimeout(() => onNewAppointment(), 300);
		}
	};

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Ações rápidas</SidebarGroupLabel>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							{item.action ? (
								<SidebarMenuButton
									tooltip={item.title}
									onClick={() => handleClick(item)}
								>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</SidebarMenuButton>
							) : (
								<Link to={item.url} onClick={() => handleClick(item)}>
									<SidebarMenuButton tooltip={item.title}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</SidebarMenuButton>
								</Link>
							)}
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
