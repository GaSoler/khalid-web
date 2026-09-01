import { Calendar, DollarSign, Scissors, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/app/contexts/auth-provider";
import { Loader } from "@/view/components/loader";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";

export function BarberPage() {
	const { user } = useAuth();

	return (
		<main className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">
					Bem vindo de volta, {user?.fullName}!
				</h1>
				<span className="text-muted-foreground">
					Aqui está o resumo do seu dia
				</span>
			</div>

			<section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
				<Card>
					<CardContent>
						<div className="flex items-center justify-between">
							<div className="flex flex-col gap-1">
								<span className="text-sm font-medium text-muted-foreground">
									Agendamentos
								</span>
								<span className="text-2xl font-bold">4</span>
							</div>
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
								<Calendar className="h-6 w-6 text-brand" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<div className="flex items-center justify-between">
							<div className="flex flex-col gap-1">
								<span className="text-sm font-medium text-muted-foreground">
									Agendamentos do mes
								</span>
								<span className="text-2xl font-bold">35</span>
							</div>
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
								<DollarSign className="h-6 w-6 text-brand" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<div className="flex items-center justify-between">
							<div className="flex flex-col gap-1">
								<span className="text-sm font-medium text-muted-foreground">
									Proximo cliente
								</span>
								<span className="text-2xl font-bold">16:30</span>
								<span className="text-xs text-muted-foreground">
									Rafael Mendes
								</span>
							</div>
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
								<Users className="h-6 w-6 text-brand" />
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			<section className="space-y-4">
				<h2 className="text-lg font-semibold">Ações rápidas</h2>
				<div className="flex items-stretch justify-center gap-2">
					<Card className="flex-1 w-full h-full flex items-center justify-center hover:ring-brand transition-colors">
						<CardContent className="flex flex-col items-center text-center p-4 space-y-2">
							<div className="p-3 rounded-full bg-secondary">
								<Scissors className="text-brand" />
							</div>

							<span>Agendar horário</span>
						</CardContent>
					</Card>
					<Link to={"/barber/appointments"} className="flex-1">
						<Card className="w-full h-full flex items-center justify-center hover:ring-brand transition-colors">
							<CardContent className="flex flex-col items-center text-center p-4 space-y-2">
								<div className="p-3 rounded-full bg-secondary">
									<Calendar className="text-brand" />
								</div>

								<span>Minha Agenda</span>
							</CardContent>
						</Card>
					</Link>
				</div>
			</section>

			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">Próximo agendamento</h2>
					<Button variant="link" className="text-brand p-0 h-auto">
						<Link to="/barber/appointments">Ver todos</Link>
					</Button>
				</div>
				<Card>
					<CardContent>
						<Loader />
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
