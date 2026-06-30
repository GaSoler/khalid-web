// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { useState } from "react";
// import {
// 	useCreateAppointment,
// 	useGetBarberAvailableTimes,
// 	useListActiveBarbers,
// 	useListActiveServices,
// } from "@/app/hooks/use-customer";
// import { BackHeader } from "@/view/components/back-header";
// import { MultiStep } from "@/view/components/multi-step";
// import { Button } from "@/view/components/ui/button";
// import { BarberStep } from "./steps/barber-step";
// import { ConfirmStep } from "./steps/confirm-step";
// import { DateStep } from "./steps/date-step";
// import { ServiceStep } from "./steps/service-step";
// import { format } from "date-fns";

// export type AppointmentForm = {
// 	serviceId: string;
// 	barberId: string;
// 	date: Date | undefined;
// 	time: string;
// };

// export function CustomerNewAppointmentPage() {
// 	const [currentStep, setCurrentStep] = useState(0);
// 	const [form, setForm] = useState<AppointmentForm>({
// 		serviceId: "",
// 		barberId: "",
// 		date: new Date(),
// 		time: "",
// 	});

// 	const { services, isLoadingServices, errorServices } =
// 		useListActiveServices();

// 	const { barbers, isLoadingBarbers, errorBarbers } = useListActiveBarbers();

// 	const availableTimes = useGetBarberAvailableTimes(form.barberId, form.date);

// 	const createAppointment = useCreateAppointment();

// 	const selectedService = services.find((s) => s.id === form.serviceId);
// 	const selectedBarber = barbers.find((b) => b.id === form.barberId);

// 	const steps = [
// 		{
// 			title: "Escolha um serviço",
// 			description: "Comece escolhendo qual serviço você quer agendar.",
// 			component: (
// 				<ServiceStep
// 					services={services}
// 					selectedServiceId={form.serviceId}
// 					onSelect={(serviceId) =>
// 						setForm((prev) => ({
// 							...prev,
// 							serviceId,
// 						}))
// 					}
// 				/>
// 			),
// 		},
// 		{
// 			title: "Escolha seu barbeiro",
// 			description: "Escolha com quem você quer se atender.",
// 			component: (
// 				<BarberStep
// 					barbers={barbers}
// 					selectedBarberId={form.barberId}
// 					onSelect={(barberId) =>
// 						setForm((prev) => ({
// 							...prev,
// 							barberId,
// 						}))
// 					}
// 				/>
// 			),
// 		},
// 		{
// 			title: "Escolha a data e o horário",
// 			description: "Selecione o melhor dia e horário para você.",
// 			component: (
// 				<DateStep
// 					date={form.date}
// 					selectedTime={form.time}
// 					timeSlots={availableTimes.data ?? []}
// 					isLoading={availableTimes.isLoading}
// 					onDateChange={(date) =>
// 						setForm((prev) => ({
// 							...prev,
// 							date,
// 							time: "",
// 						}))
// 					}
// 					onTimeSelect={(time) =>
// 						setForm((prev) => ({
// 							...prev,
// 							time,
// 						}))
// 					}
// 				/>
// 			),
// 		},
// 		{
// 			title: "Confirme seu agendamento",
// 			description: "Tudo certo? Confira as informações e confirme.",
// 			component: (
// 				<ConfirmStep
// 					form={form}
// 					service={selectedService}
// 					barber={selectedBarber}
// 				/>
// 			),
// 		},
// 	];

// 	const isLastStep = currentStep === steps.length - 1;
// 	const isFirstStep = currentStep === 0;

// 	const canGoNext = () => {
// 		switch (currentStep) {
// 			case 0:
// 				return !!form.serviceId;

// 			default:
// 				return true;
// 		}
// 	};

// 	const goNext = () =>
// 		setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
// 	const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

// 	const handleSubmit = (e: React.FormEvent) => {
// 		e.preventDefault();
// 		if (!canGoNext()) return;

// 		if (isLastStep) {
// 			createAppointment.mutate({
// 				serviceId: form.serviceId,
// 				barberId: form.barberId,
// 				date: format(form.date!, "yyyy-MM-dd"),
// 				time: form.time,
// 			});
// 			return;
// 		}

// 		goNext();
// 	};

// 	return (
// 		<main className="flex flex-col h-full overflow-hidden">
// 			<BackHeader to="/customer" text="Agendar Horário" />

// 			<div className="px-4 pt-4 pb-2 space-y-3 shrink-0">
// 				<div className="flex flex-col items-center text-center">
// 					<h2 className="text-xl font-semibold leading-normal">
// 						{steps[currentStep].title}
// 					</h2>
// 					<span className="text-sm text-muted-foreground">
// 						{steps[currentStep].description}
// 					</span>
// 				</div>
// 				<MultiStep size={steps.length} currentStep={currentStep} />
// 			</div>
// 			<form
// 				onSubmit={handleSubmit}
// 				className="flex flex-col flex-1 overflow-hidden px-4"
// 			>
// 				<div className="flex-1 overflow-hidden">
// 					<div className="h-full flex flex-col p-4">
// 						<div className="w-full max-w-4xl mx-auto flex flex-col flex-1 min-h-0">
// 							{steps[currentStep].component}
// 						</div>
// 					</div>
// 				</div>
// 				<div className="flex items-center gap-3 py-4 shrink-0 border-t border-border">
// 					{!isFirstStep && (
// 						<Button
// 							type="button"
// 							variant="secondary"
// 							size="lg"
// 							className="flex-1"
// 							onClick={goBack}
// 						>
// 							<ArrowLeft />
// 							Voltar
// 						</Button>
// 					)}
// 					<Button
// 						type="submit"
// 						size="lg"
// 						className="flex-1"
// 						variant="brand"
// 						disabled={!canGoNext()}
// 					>
// 						{isLastStep ? "Finalizar agendamento" : "Próximo passo"}
// 						<ArrowRight className="ml-2" />
// 					</Button>
// 				</div>
// 			</form>
// 		</main>
// 	);
// }

import { ArrowLeft, ArrowRight } from "lucide-react";
import { BackHeader } from "@/view/components/back-header";
import { MultiStep } from "@/view/components/multi-step";
import { Button } from "@/view/components/ui/button";
import { buildSteps } from "../new/steps/index";
import { useAppointmentWizard } from "./use-appointment-wizard";

export function CustomerNewAppointmentPage() {
	const wizard = useAppointmentWizard();

	const steps = buildSteps({
		form: wizard.form,
		services: wizard.services,
		barbers: wizard.barbers,
		timeSlots: wizard.availableTimes,
		isLoadingTimes: wizard.isLoadingTimes,
		selectedService: wizard.selectedService,
		selectedBarber: wizard.selectedBarber,
		onSelectService: wizard.setService,
		onSelectBarber: wizard.setBarber,
		onDateChange: wizard.setDate,
		onTimeSelect: wizard.setTime,
	});

	const currentStepConfig = steps[wizard.currentStep];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!wizard.canAdvance) return;
		if (wizard.isLastStep) {
			wizard.submit();
			return;
		}
		wizard.goNext();
	};

	return (
		<main className="flex flex-col h-full overflow-hidden">
			<BackHeader to="/customer" text="Agendar Horário" />

			{/* Header do step */}
			<div className="px-4 pt-4 pb-2 space-y-3 shrink-0">
				<div className="flex flex-col items-center text-center">
					<h2 className="text-xl font-semibold">{currentStepConfig.title}</h2>
					<span className="text-sm text-muted-foreground">
						{currentStepConfig.description}
					</span>
				</div>
				<MultiStep size={steps.length} currentStep={wizard.currentStep} />
			</div>

			{/* Conteúdo + botões */}
			<form
				onSubmit={handleSubmit}
				className="flex flex-col flex-1 overflow-hidden px-4"
			>
				<div className="flex-1 overflow-hidden">
					<div className="h-full flex flex-col p-4">
						<div className="w-full max-w-4xl mx-auto flex flex-col flex-1 min-h-0">
							{currentStepConfig.component}
						</div>
					</div>
				</div>

				<div className="flex items-center gap-3 py-4 shrink-0 border-t border-border">
					{!wizard.isFirstStep && (
						<Button
							type="button"
							variant="secondary"
							size="lg"
							className="flex-1"
							onClick={wizard.goBack}
						>
							<ArrowLeft />
							Voltar
						</Button>
					)}
					<Button
						type="submit"
						size="lg"
						className="flex-1"
						variant="brand"
						disabled={!wizard.canAdvance || wizard.isSubmitting}
					>
						{wizard.isLastStep ? "Finalizar agendamento" : "Próximo passo"}
						<ArrowRight className="ml-2" />
					</Button>
				</div>
			</form>
		</main>
	);
}
