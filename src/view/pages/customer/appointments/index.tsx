import {
	useGetNextAppointment,
	useListAppointments,
} from "@/app/hooks/use-customer";
import emptyAppointmentImg from "@/assets/empty-appointments.svg";
import { BackHeader } from "@/view/components/back-header";
import { Loader } from "@/view/components/loader";
import { AppointmentCard } from "../components/appointment-card";

export function CustomerAppointmentsPage() {
	const { appointments, isLoadingAppointments } = useListAppointments();
	const { nextAppointment, isLoadingNextAppointment } = useGetNextAppointment();

	const finished = appointments.filter((a) => a.status !== "scheduled");

	return (
		<main className="space-y-4 h-full">
			<BackHeader to="/customer" text="Meus Agendamentos" />

			{isLoadingAppointments && (
				<div className="flex items-center justify-center py-4 h-full">
					<Loader />
				</div>
			)}

			{!isLoadingAppointments && appointments.length === 0 && (
				<div className="flex h-[calc(100vh-120px)] flex-col items-center justify-center px-6 text-center">
					<img
						src={emptyAppointmentImg}
						alt=""
						className="mb-8 w-lg max-w-full opacity-90"
					/>

					<h2 className="text-lg font-semibold">
						Nenhum agendamento encontrado
					</h2>

					<p className="mt-2 max-w-sm text-sm text-muted-foreground">
						Quando você agendar um horário, ele aparecerá aqui.
					</p>
				</div>
			)}

			{!isLoadingNextAppointment && nextAppointment && (
				<div className="space-y-4">
					<h3>Próximo agendamento</h3>
					<AppointmentCard appointment={nextAppointment} />
				</div>
			)}

			<div className="space-y-4">
				<h3>Agendamentos finalizados</h3>
				{finished.map((a) => (
					<AppointmentCard key={a.id} appointment={a} />
				))}
			</div>
		</main>
	);
}
