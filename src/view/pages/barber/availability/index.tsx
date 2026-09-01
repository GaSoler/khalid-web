import { Check, Clock3, Plus, X } from "lucide-react";
import { useState } from "react";
import { BackHeader } from "@/view/components/back-header";

type TimeBlock = { id: number; start: string; end: string };

type DayAvailability = { name: string; enabled: boolean; blocks: TimeBlock[] };

export function BarberAvailabilityPage() {
	const [days, setDays] = useState<DayAvailability[]>([
		{
			name: "Segunda",
			enabled: true,
			blocks: [
				{ id: 1, start: "09:00", end: "12:00" },
				{ id: 2, start: "13:00", end: "18:00" },
			],
		},
		{
			name: "Terça",
			enabled: true,
			blocks: [
				{ id: 3, start: "09:00", end: "12:00" },
				{ id: 4, start: "13:00", end: "18:00" },
			],
		},
		{
			name: "Quarta",
			enabled: true,
			blocks: [{ id: 5, start: "09:00", end: "18:00" }],
		},
		{
			name: "Quinta",
			enabled: true,
			blocks: [
				{ id: 6, start: "09:00", end: "12:00" },
				{ id: 7, start: "13:00", end: "18:00" },
			],
		},
		{
			name: "Sexta",
			enabled: true,
			blocks: [{ id: 8, start: "09:00", end: "18:00" }],
		},
		{
			name: "Sábado",
			enabled: false,
			blocks: [{ id: 9, start: "09:00", end: "13:00" }],
		},
		{
			name: "Domingo",
			enabled: false,
			blocks: [{ id: 10, start: "09:00", end: "13:00" }],
		},
	]);

	const [saved, setSaved] = useState(false);
	const updateDay = (
		name: string,
		update: (day: DayAvailability) => DayAvailability,
	) =>
		setDays((current) =>
			current.map((day) => (day.name === name ? update(day) : day)),
		);
	const addBlock = (name: string) =>
		updateDay(name, (day) => ({
			...day,
			blocks: [...day.blocks, { id: Date.now(), start: "09:00", end: "18:00" }],
		}));
	const removeBlock = (name: string, id: number) =>
		updateDay(name, (day) => ({
			...day,
			blocks: day.blocks.filter((block) => block.id !== id),
		}));
	const updateBlock = (
		name: string,
		id: number,
		key: "start" | "end",
		value: string,
	) =>
		updateDay(name, (day) => ({
			...day,
			blocks: day.blocks.map((block) =>
				block.id === id ? { ...block, [key]: value } : block,
			),
		}));

	return (
		<main className="space-y-6">
			<BackHeader
				to="/barber"
				text="Minha Disponibilidade"
				description="Defina quando os clientes podem agendar com você."
			/>

			<div className="border border-border bg-card p-4 rounded-2xl">
				<div className="flex items-start gap-3">
					<div className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
						<Clock3 size={17} />
					</div>
					<div>
						<p className="text-sm font-medium">Intervalos entre horários</p>
						<p className="mt-1 text-xs leading-5 text-muted-foreground">
							Adicione mais de um período no mesmo dia para configurar seu
							intervalo de almoço ou folgas.
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				{days.map((day) => (
					<div
						key={day.name}
						className={`rounded-2xl border bg-card p-4 ${day.enabled ? "border-border" : "border-border/60 opacity-75"}`}
					>
						<div className="flex items-center gap-3">
							<button
								aria-label={`Ativar ${day.name}`}
								onClick={() =>
									updateDay(day.name, (current) => ({
										...current,
										enabled: !current.enabled,
									}))
								}
								className={`grid size-6 place-items-center rounded-md border ${day.enabled ? "border bg-brand text-primary" : "border-border"}`}
							>
								{day.enabled && <Check size={15} />}
							</button>
							<span className="font-medium">{day.name}</span>
							{day.enabled && (
								<span className="ml-auto text-xs text-muted-foreground">
									{day.blocks.length}{" "}
									{day.blocks.length === 1 ? "período" : "períodos"}
								</span>
							)}
						</div>
						{day.enabled ? (
							<div className="mt-4 space-y-4">
								{day.blocks.map((block, index) => (
									<div key={block.id} className="flex items-center gap-2">
										<div className="flex min-w-0 flex-1 items-center gap-2">
											<input
												aria-label={`Início ${day.name} ${index + 1}`}
												type="time"
												value={block.start}
												onChange={(event) =>
													updateBlock(
														day.name,
														block.id,
														"start",
														event.target.value,
													)
												}
												className="min-w-0 flex-1 rounded-lg border border-border bg-muted px-2 py-2 text-sm"
											/>
											<span className="text-xs text-muted-foreground">até</span>
											<input
												aria-label={`Fim ${day.name} ${index + 1}`}
												type="time"
												value={block.end}
												onChange={(event) =>
													updateBlock(
														day.name,
														block.id,
														"end",
														event.target.value,
													)
												}
												className="min-w-0 flex-1 rounded-lg border border-border bg-muted px-2 py-2 text-sm"
											/>
										</div>
										{day.blocks.length > 1 && (
											<button
												aria-label={`Remover período ${index + 1} de ${day.name}`}
												onClick={() => removeBlock(day.name, block.id)}
												className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-destructive"
											>
												<X size={16} />
											</button>
										)}
									</div>
								))}
								<button
									onClick={() => addBlock(day.name)}
									className="flex items-center gap-2 text-sm font-medium text-brand"
								>
									<Plus size={16} />
									Adicionar intervalo
								</button>
							</div>
						) : (
							<p className="mt-3 pl-9 text-sm text-muted-foreground">Folga</p>
						)}
					</div>
				))}
			</div>

			<button
				onClick={() => {
					setSaved(true);
					setTimeout(() => setSaved(false), 2200);
				}}
				className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
			>
				{saved && <Check size={16} />}
				{saved ? "Disponibilidade salva" : "Salvar disponibilidade"}
			</button>
		</main>
	);
}
