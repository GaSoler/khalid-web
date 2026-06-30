import type { Service } from "@/app/entities/Service";
import type { TimeSlot, User } from "@/app/entities/User";
import { BarberStep } from "../steps/barber-step";
import { ConfirmStep } from "../steps/confirm-step";
import { DateStep } from "../steps/date-step";
import { ServiceStep } from "../steps/service-step";
import type { AppointmentForm } from "../use-appointment-wizard";

interface StepConfig {
	title: string;
	description: string;
	component: React.ReactNode;
}

interface BuildStepsParams {
	form: AppointmentForm;
	services: Service[];
	barbers: User[];
	timeSlots: TimeSlot[];
	isLoadingTimes: boolean;
	selectedService: Service | undefined;
	selectedBarber: User | undefined;
	onSelectService: (id: string) => void;
	onSelectBarber: (id: string) => void;
	onDateChange: (date: Date | undefined) => void;
	onTimeSelect: (time: string) => void;
}

export function buildSteps({
	form,
	services,
	barbers,
	timeSlots,
	isLoadingTimes,
	selectedService,
	selectedBarber,
	onSelectService,
	onSelectBarber,
	onDateChange,
	onTimeSelect,
}: BuildStepsParams): StepConfig[] {
	return [
		{
			title: "Escolha um serviço",
			description: "Comece escolhendo qual serviço você quer agendar.",
			component: (
				<ServiceStep
					services={services}
					selectedServiceId={form.serviceId}
					onSelect={onSelectService}
				/>
			),
		},
		{
			title: "Escolha seu barbeiro",
			description: "Escolha com quem você quer se atender.",
			component: (
				<BarberStep
					barbers={barbers}
					selectedBarberId={form.barberId}
					onSelect={onSelectBarber}
				/>
			),
		},
		{
			title: "Escolha a data e o horário",
			description: "Selecione o melhor dia e horário para você.",
			component: (
				<DateStep
					date={form.date}
					selectedTime={form.time}
					timeSlots={timeSlots}
					isLoading={isLoadingTimes}
					onDateChange={onDateChange}
					onTimeSelect={onTimeSelect}
				/>
			),
		},
		{
			title: "Confirme seu agendamento",
			description: "Tudo certo? Confira as informações e confirme.",
			component: (
				<ConfirmStep
					form={form}
					service={selectedService}
					barber={selectedBarber}
				/>
			),
		},
	];
}
