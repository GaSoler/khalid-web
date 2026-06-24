import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { services2 } from "@/app/utils/mocked-data";
import { BackHeader } from "@/view/components/back-header";
import { MinutesInput } from "@/view/components/minutes-input";
import { MoneyInput } from "@/view/components/money-input";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/view/components/ui/sheet";
import { ServiceCard } from "../components/service-card";

export function AdminServicesPage() {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<
		"all" | "active" | "inactive"
	>("all");
	const [priceInCents, setPriceInCents] = useState(0);
	const [duration, setDuration] = useState(0);

	return (
		<main className="flex flex-col h-full overflow-hidden space-y-4">
			<BackHeader
				to="/admin"
				text="Serviços"
				description="Gerencie os serviços da barbearia"
			/>

			<div className="flex items-center justify-between gap-4 space-y-4">
				<Sheet>
					<SheetTrigger asChild>
						<Button className="w-full">
							<Plus />
							Novo serviço
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Criar serviço</SheetTitle>
							<SheetDescription>
								Crie um novo serviço e adicione as informações.
							</SheetDescription>
						</SheetHeader>
						<div className="grid flex-1 auto-rows-min gap-6 px-4">
							<div className="grid gap-3">
								<Label htmlFor="sheet-name">Nome</Label>
								<Input id="sheet-name" defaultValue="Nome do serviço" />
							</div>
							<div className="grid gap-3">
								<Label htmlFor="sheet-description">Descrição</Label>
								<Input
									id="sheet-description"
									defaultValue="Descrição do serviço"
								/>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="sheet-price">Preço</Label>
								<MoneyInput
									valueInCents={priceInCents}
									onChange={setPriceInCents}
								/>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="sheet-duration">Duração</Label>
								<MinutesInput value={duration} onChange={setDuration} />
							</div>
						</div>
						<SheetFooter>
							<Button type="submit">Salvar</Button>
							<SheetClose asChild>
								<Button variant="outline">Fechar</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{services2.map((service) => (
					<ServiceCard key={service.id} service={service} />
				))}
			</div>
		</main>
	);
}
