import { Calendar, DollarSign, Scissors, Users } from "lucide-react";
import { StatsCard } from "./components/stats-card";

export function AdminPage() {
	return (
		<main className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Bem vindo de volta, Gabriel!</h1>
				<span className="text-muted-foreground">
					Painel administrativo para ter uma visão geral da barbearia
				</span>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
				<StatsCard
					title="Total de Barbeiros"
					value={4}
					icon={Scissors}
					trend={{ value: 1, positive: true }}
				/>
				<StatsCard
					title="Clientes Ativos"
					value={156}
					icon={Users}
					trend={{ value: 12, positive: true }}
				/>
				<StatsCard
					title="Agendamentos do Mês"
					value={248}
					icon={Calendar}
					trend={{ value: 15, positive: true }}
				/>
				<StatsCard
					title="Receita do Mês"
					value="R$ 13.950,00"
					icon={DollarSign}
					trend={{ value: 18, positive: true }}
				/>
			</div>
		</main>
	);
}
