import { LogOut } from "lucide-react";
import { useAuth } from "@/app/contexts/auth-provider";
import type { User } from "@/app/entities/User";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/view/components/ui/avatar";
import { Button } from "@/view/components/ui/button";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/view/components/ui/sidebar";

export function NavUser({ user }: { user: User }) {
	const { signOut } = useAuth();
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				{/* <SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Avatar className="h-8 w-8 rounded-lg grayscale">
						<AvatarImage src={user.avatarUrl} alt={user.fullName} />
						<AvatarFallback className="rounded-lg">CN</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">{user.fullName}</span>
						<span className="truncate text-xs text-muted-foreground">
							{user.email}
						</span>
					</div>
					<LogOut className="ml-auto size-4" />
				</SidebarMenuButton> */}
				<div className="flex items-center gap-3 px-2 py-1.5">
					<Avatar className="h-8 w-8 rounded-lg">
						<AvatarImage src={user.avatarUrl} alt={user.fullName} />
						<AvatarFallback className="rounded-lg">
							{user.fullName.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight min-w-0">
						<span className="truncate font-medium">{user.fullName}</span>
						<span className="truncate text-xs text-muted-foreground">
							{user.email}
						</span>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
						onClick={signOut}
					>
						<LogOut className="size-4" />
					</Button>
				</div>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
