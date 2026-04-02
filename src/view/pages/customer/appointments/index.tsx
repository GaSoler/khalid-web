import { ArrowLeft } from "lucide-react";
import { Button } from "@/view/components/ui/button";
import { NextAppointmentCard } from "../components/next-appointment-card";

const appointment = {
	id: "123",
	date: new Date("2024-04-21T09:00:00"),
};

export function CustomerAppointmentsPage() {
	return (
		<main className="space-y-6">
			<div className="flex items-center gap-2">
				<Button variant={"ghost"}>
					<ArrowLeft />
				</Button>
				<h1 className="text-2xl font-bold">Meus Agendamentos</h1>
			</div>

			<div className="space-y-3">
				<h3 className="text-lg font-bold text-muted-foreground">Confirmados</h3>
				<NextAppointmentCard appointment={appointment} />
			</div>

			<div className="space-y-3 ">
				<h3 className="text-lg font-bold text-muted-foreground">Finalizados</h3>
				<div className="space-y-3 ">
					<NextAppointmentCard appointment={appointment} />
					<NextAppointmentCard appointment={appointment} />
					<NextAppointmentCard appointment={appointment} />
					<NextAppointmentCard appointment={appointment} />
				</div>
			</div>
		</main>
	);
}
