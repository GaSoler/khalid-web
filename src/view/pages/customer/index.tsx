import { Calendar, Scissors } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import { EmptyAppointmentCard } from "./components/empty-appointment-card";
import { NextAppointmentCard } from "./components/next-appointment-card";

// const appointment = {
// 	id: "123",
// 	date: new Date("2024-04-21T09:00:00"),
// };

const appointment = null;

export function CustomerPage() {
	return (
		<main className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Bem vindo de volta, Gabriel!</h1>
				<span className="text-muted-foreground">
					Agende seu próximo horário ou veja seus agendamentos
				</span>
			</div>

			<section className="space-y-4">
				<h2 className="text-lg font-semibold">Ações rápidas</h2>
				<div className="flex items-stretch justify-center gap-2">
					<Link to={"/customer/appointments/new"} className="flex-1">
						<Card className="w-full h-full flex items-center justify-center hover:ring-brand transition-colors">
							<CardContent className="flex flex-col items-center text-center p-4 space-y-2">
								<div className="p-3 rounded-full bg-secondary">
									<Scissors className="text-brand" />
								</div>

								<span>Agendar horário</span>
							</CardContent>
						</Card>
					</Link>
					<Link to={"/customer/appointments"} className="flex-1">
						<Card className="w-full h-full flex items-center justify-center hover:ring-brand transition-colors">
							<CardContent className="flex flex-col items-center text-center p-4 space-y-2">
								<div className="p-3 rounded-full bg-secondary">
									<Calendar className="text-brand" />
								</div>

								<span>Meus agendamentos</span>
							</CardContent>
						</Card>
					</Link>
				</div>
			</section>

			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">Próximo agendamento</h2>
					<Button variant="link" className="text-brand p-0 h-auto">
						<Link to="/customer/appointments">Ver todos</Link>
					</Button>
				</div>
				{appointment ? (
					<NextAppointmentCard appointment={appointment} />
				) : (
					<EmptyAppointmentCard />
				)}
			</section>
		</main>
	);
}
