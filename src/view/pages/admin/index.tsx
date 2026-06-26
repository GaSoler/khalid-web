import {
	Calendar,
	DollarSign,
	Scissors,
	TrendingUp,
	Users,
} from "lucide-react";
import {
	Bar,
	BarChart,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/view/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/view/components/ui/chart";
import { StatsCard } from "./components/stats-card";

const revenueData = [
	{ month: "Jan", revenue: 12500 },
	{ month: "Fev", revenue: 15200 },
	{ month: "Mar", revenue: 18400 },
	{ month: "Abr", revenue: 16800 },
	{ month: "Mai", revenue: 21000 },
	{ month: "Jun", revenue: 19500 },
];

const bookingsData = [
	{ day: "Seg", bookings: 12 },
	{ day: "Ter", bookings: 15 },
	{ day: "Qua", bookings: 14 },
	{ day: "Qui", bookings: 18 },
	{ day: "Sex", bookings: 22 },
	{ day: "Sáb", bookings: 28 },
	{ day: "Dom", bookings: 0 },
];

const chartConfig = {
	revenue: {
		label: "Receita",
		color: "var(--primary)",
	},
	bookings: {
		label: "Agendamentos",
		color: "var(--primary)",
	},
};

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

			<div className="grid gap-6 lg:grid-cols-2 mb-8">
				<Card className="bg-card border-border">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5 text-primary" />
							Receita Mensal
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[300px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={revenueData}>
									<XAxis
										dataKey="month"
										stroke="var(--muted-foreground)"
										fontSize={12}
										tickLine={false}
										axisLine={false}
									/>
									<YAxis
										stroke="var(--muted-foreground)"
										fontSize={12}
										tickLine={false}
										axisLine={false}
										tickFormatter={(value) =>
											`R$ ${(value / 1000).toFixed(0)}k`
										}
									/>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Line
										type="monotone"
										dataKey="revenue"
										stroke="var(--primary)"
										strokeWidth={2}
										dot={{ fill: "var(--primary)" }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</ChartContainer>
					</CardContent>
				</Card>

				<Card className="bg-card border-border">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Calendar className="h-5 w-5 text-primary" />
							Agendamentos por Dia
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[300px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={bookingsData}>
									<XAxis
										dataKey="day"
										stroke="var(--muted-foreground)"
										fontSize={12}
										tickLine={false}
										axisLine={false}
									/>
									<YAxis
										stroke="var(--muted-foreground)"
										fontSize={12}
										tickLine={false}
										axisLine={false}
									/>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Bar
										dataKey="bookings"
										fill="var(--primary)"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
