import { Clock, MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { formatDuration } from "@/app/utils/format-duration";
import { formatPrice } from "@/app/utils/format-price";
import { MinutesInput } from "@/view/components/minutes-input";
import { MoneyInput } from "@/view/components/money-input";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/view/components/ui/dropdown-menu";
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
} from "@/view/components/ui/sheet";
import { Switch } from "@/view/components/ui/switch";

interface ServiceCardProps {
	service: {
		id: string;
		name: string;
		description: string;
		priceInCents: number;
		durationInMinutes: number;
		active: boolean;
	};
}

export function ServiceCard({ service }: ServiceCardProps) {
	const [sheetOpen, setSheetOpen] = useState(false);
	const [priceInCents, setPriceInCents] = useState(service.priceInCents);
	const [duration, setDuration] = useState(service.durationInMinutes);
	const [active, setActive] = useState(service.active);

	return (
		<>
			<Card
				className={`hover:ring-brand transition-colors ${!service.active && "opacity-60"}`}
			>
				<CardContent>
					<div className="flex items-start justify-between gap-2">
						<div className="flex flex-col gap-1 min-w-0">
							<h3 className="font-semibold truncate">{service.name}</h3>
							<p className="text-sm text-muted-foreground line-clamp-2">
								{service.description}
							</p>
							<div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
								<span className="font-medium text-foreground">
									{formatPrice(service.priceInCents)}
								</span>
								<span className="flex items-center gap-1">
									<Clock className="size-4" />
									{formatDuration(service.durationInMinutes)}
								</span>
								<Badge variant={service.active ? "default" : "secondary"}>
									{service.active ? "Ativo" : "Inativo"}
								</Badge>
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
									<Pencil className="size-4" />
									Editar
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-destructive"
									onSelect={() => console.log("deletar")}
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
						<SheetTitle>Editar serviço</SheetTitle>
						<SheetDescription>
							Edite as informações do serviço selecionado.
						</SheetDescription>
					</SheetHeader>
					<div className="grid flex-1 auto-rows-min gap-6 px-4">
						<div className="grid gap-3">
							<Label htmlFor="sheet-name">Nome</Label>
							<Input id="sheet-name" defaultValue={service.name} />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="sheet-description">Descrição</Label>
							<Input
								id="sheet-description"
								defaultValue={service.description}
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
						<div className="grid gap-3">
							<Label htmlFor="sheet-duration">Ativo</Label>
							<Switch
								id="sheet-active"
								checked={active}
								onCheckedChange={setActive}
							/>
						</div>
					</div>
					<SheetFooter>
						<Button type="submit">Salvar alterações</Button>
						<SheetClose asChild>
							<Button variant="outline">Fechar</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
}
