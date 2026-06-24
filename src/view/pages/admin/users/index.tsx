import { Search } from "lucide-react";
import { useState } from "react";
import { users } from "@/app/utils/mocked-data";
import { BackHeader } from "@/view/components/back-header";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Input } from "@/view/components/ui/input";
import { UserCard } from "../components/user-card";

export function AdminUsersPage() {
	const [search, setSearch] = useState("");
	const [roleFilter, setRoleFilter] = useState<
		"all" | "customer" | "barber" | "admin"
	>("all");

	return (
		<main className="flex flex-col h-full overflow-hidden space-y-4">
			<BackHeader
				to="/admin"
				text="Usuários"
				description="Gerencie os usuários da barbearia"
			/>

			<div className="flex items-center justify-between gap-4 space-y-4">
				<Card className="bg-card border-border mb-6 flex-1">
					<CardContent className="p-4">
						<div className="flex flex-col md:flex-row gap-4">
							<div className="relative flex-1">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Buscar por nome ou e-mail..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className="pl-10 bg-secondary border-border"
								/>
							</div>
							<div className="flex gap-2">
								<Button
									variant={roleFilter === "all" ? "default" : "outline"}
									onClick={() => setRoleFilter("all")}
									size="sm"
								>
									Todos
								</Button>
								<Button
									variant={roleFilter === "customer" ? "default" : "outline"}
									onClick={() => setRoleFilter("customer")}
									size="sm"
								>
									Clientes
								</Button>
								<Button
									variant={roleFilter === "barber" ? "default" : "outline"}
									onClick={() => setRoleFilter("barber")}
									size="sm"
								>
									Cabeleireiros
								</Button>
								<Button
									variant={roleFilter === "admin" ? "default" : "outline"}
									onClick={() => setRoleFilter("admin")}
									size="sm"
								>
									Administradores
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{users.map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
		</main>
	);
}
