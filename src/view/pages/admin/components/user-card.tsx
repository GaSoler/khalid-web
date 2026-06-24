import { MoreVertical, Trash, UserCog } from "lucide-react";
import { useState } from "react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/view/components/ui/avatar";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/view/components/ui/dropdown-menu";
import { Label } from "@/view/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/view/components/ui/sheet";
import { Switch } from "@/view/components/ui/switch";

const ALL_ROLES = ["customer", "barber", "admin"] as const;
type Role = (typeof ALL_ROLES)[number];

const roleLabels: Record<Role, string> = {
	customer: "Cliente",
	barber: "Barbeiro",
	admin: "Admin",
};

interface UserCardProps {
	user: {
		id: string;
		email: string;
		fullName: string;
		avatarUrl: string;
		roles: string[];
	};
}

export function UserCard({ user }: UserCardProps) {
	const [sheetOpen, setSheetOpen] = useState(false);
	const [roles, setRoles] = useState<Role[]>(user.roles as Role[]);

	const initials = user.fullName
		.split(" ")
		.map((n) => n[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	const toggleRole = (role: Role) => {
		setRoles((prev) =>
			prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
		);
	};

	return (
		<>
			<Card>
				<CardContent>
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-3 min-w-0">
							<Avatar>
								<AvatarImage src={user.avatarUrl} />
								<AvatarFallback>{initials}</AvatarFallback>
							</Avatar>
							<div className="flex flex-col min-w-0">
								<h3 className="font-semibold truncate">{user.fullName}</h3>
								<p className="text-sm text-muted-foreground truncate">
									{user.email}
								</p>
								<div className="flex gap-1 mt-1 flex-wrap">
									{user.roles.map((role) => (
										<Badge key={role} variant="secondary" className="text-xs">
											{roleLabels[role as Role] ?? role}
										</Badge>
									))}
								</div>
							</div>
						</div>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="shrink-0">
									<MoreVertical className="size-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onSelect={() => setSheetOpen(true)}>
									<UserCog className="size-4" />
									Alterar roles
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-destructive"
									onSelect={() => console.log("deletar", user.id)}
								>
									<Trash className="size-4" />
									Excluir
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardContent>
			</Card>

			<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Alterar roles</SheetTitle>
						<SheetDescription>
							Defina as permissões de {user.fullName}.
						</SheetDescription>
					</SheetHeader>

					<div className="flex items-center gap-3 px-4 py-4 border-b">
						<Avatar>
							<AvatarImage src={user.avatarUrl} />
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-semibold">{user.fullName}</p>
							<p className="text-sm text-muted-foreground">{user.email}</p>
						</div>
					</div>

					<div className="grid gap-4 px-4 mt-4">
						{ALL_ROLES.map((role) => (
							<div key={role} className="flex items-center justify-between">
								<Label htmlFor={`role-${role}`} className="cursor-pointer">
									{roleLabels[role]}
								</Label>
								<Switch
									id={`role-${role}`}
									checked={roles.includes(role)}
									onCheckedChange={() => toggleRole(role)}
								/>
							</div>
						))}
					</div>

					<SheetFooter className="mt-6 px-4">
						<Button
							className="flex-1"
							onClick={() => console.log("salvar", roles)}
						>
							Salvar
						</Button>
						<SheetClose asChild>
							<Button variant="outline" className="flex-1">
								Cancelar
							</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
}
