import { ArrowLeft } from "lucide-react";
import { useListAppointments } from "@/app/hooks/use-customer";
import { BackHeader } from "@/view/components/back-header";
import { Button } from "@/view/components/ui/button";
import { NextAppointmentCard } from "../components/next-appointment-card";

const appointment = {
	id: "123",
	date: new Date("2024-04-21T09:00:00"),
};

export function CustomerAppointmentsPage() {
	const { appointments, isLoadingAppointments } = useListAppointments();

	const scheduled = appointments.filter((a) => a.status === "scheduled");
	const finished = appointments.filter((a) => a.status !== "scheduled");

	if (isLoadingAppointments) {
		return (
			<main className="space-y-6">
				<BackHeader to="/customer" text="Meus Agendamentos" />
				<p className="text-muted-foreground text-sm">Carregando...</p>
			</main>
		);
	}

	// return (
	// 	<main className="space-y-6">
	// 		<BackHeader to="/customer" text="Meus Agendamentos" />

	// 		<div className="space-y-3">
	// 			<h3 className="text-lg font-bold text-muted-foreground">Confirmados</h3>
	// 			<NextAppointmentCard appointment={appointment} />
	// 		</div>

	// 		<div className="space-y-3 ">
	// 			<h3 className="text-lg font-bold text-muted-foreground">Finalizados</h3>
	// 			<div className="space-y-3 ">
	// 				<NextAppointmentCard appointment={appointment} />
	// 				<NextAppointmentCard appointment={appointment} />
	// 				<NextAppointmentCard appointment={appointment} />
	// 				<NextAppointmentCard appointment={appointment} />
	// 				<NextAppointmentCard appointment={appointment} />
	// 				<NextAppointmentCard appointment={appointment} />
	// 			</div>
	// 		</div>
	// 	</main>
	// );

	return (
		<main className="space-y-6">
			<BackHeader to="/customer" text="Meus Agendamentos" />

			{scheduled.length > 0 && (
				<div className="space-y-3">
					<h3 className="text-lg font-bold text-muted-foreground">
						Confirmados
					</h3>
					{scheduled.map((appointment) => (
						<NextAppointmentCard
							key={appointment.id}
							appointment={appointment}
						/>
					))}
				</div>
			)}

			{finished.length > 0 && (
				<div className="space-y-3">
					<h3 className="text-lg font-bold text-muted-foreground">
						Finalizados
					</h3>
					{finished.map((appointment) => (
						<NextAppointmentCard
							key={appointment.id}
							appointment={appointment}
						/>
					))}
				</div>
			)}

			{appointments.length === 0 && (
				<p className="text-muted-foreground text-sm">
					Você ainda não tem agendamentos.
				</p>
			)}
		</main>
	);
}
