import {
	Calendar,
	House,
	List,
	type LucideIcon,
	Scissors,
	Users,
} from "lucide-react";
import type { Role } from "../entities/User";

interface NavItem {
	title: string;
	url: string;
	icon: LucideIcon;
	roles: Role[];
}

export const navItems: NavItem[] = [
	{
		title: "Início",
		url: "/customer",
		icon: House,
		roles: ["customer"],
	},
	{
		title: "Agendar",
		url: "/customer/appointments/new",
		icon: Scissors,
		roles: ["customer"],
	},
	{
		title: "Meus agendamentos",
		url: "/customer/appointments",
		icon: Calendar,
		roles: ["customer"],
	},
	{
		title: "Início",
		url: "/barber",
		icon: House,
		roles: ["barber"],
	},
	{
		title: "Agenda",
		url: "/barber/appointments",
		icon: Calendar,
		roles: ["barber"],
	},
	{
		title: "Início",
		url: "/admin",
		icon: House,
		roles: ["admin"],
	},
	{
		title: "Serviços",
		url: "/admin/services",
		icon: List,
		roles: ["admin"],
	},
	{
		title: "Usuários",
		url: "/admin/users",
		icon: Users,
		roles: ["admin"],
	},
	{
		title: "Dashboard",
		url: "/admin",
		icon: House,
		roles: ["admin"],
	},
];

export function getNavItemsByRole(roles: Role[]) {
	return navItems.filter((item) => item.roles.some((r) => roles.includes(r)));
}
