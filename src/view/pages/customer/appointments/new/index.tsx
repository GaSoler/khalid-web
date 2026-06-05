import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { barbers, services } from "@/app/utils/mocked-data";
import { BackHeader } from "@/view/components/back-header";
import { MultiStep } from "@/view/components/multi-step";
import { Button } from "@/view/components/ui/button";
import { BarberStep } from "./steps/barber-step";
import { ConfirmStep } from "./steps/confirm-step";
import { DateStep } from "./steps/date-step";
import { ServiceStep } from "./steps/service-step";

const steps = [
	{
		title: "Escolha um serviço",
		description: "Comece escolhendo qual serviço você quer agendar.",
		render: () => <ServiceStep services={services} />,
	},
	{
		title: "Escolha seu barbeiro",
		description: "Escolha com quem você quer se atender.",
		render: () => <BarberStep barbers={barbers} />,
	},
	{
		title: "Escolha a data e o horário",
		description: "Selecione o melhor dia e horário para você.",
		render: () => <DateStep />,
	},
	{
		title: "Confirme seu agendamento",
		description: "Tudo certo? Confira as informações e confirme.",
		render: () => <ConfirmStep />,
	},
];

export function CustomerNewAppointmentPage() {
	const [currentStep, setCurrentStep] = useState(0);
	const StepComponent = steps[currentStep].render;

	const isLastStep = currentStep === steps.length - 1;
	const isFirstStep = currentStep === 0;

	const goNext = () =>
		setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
	const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isLastStep) {
			console.log("Submeter formulário final aqui!");
		} else {
			goNext();
		}
	};

	return (
		<main className="space-y-6 h-full overflow-y-auto">
			<BackHeader to="/customer" text="Agendar Horário" />

			<div className="max-w-4xl max-h-full mx-auto px-4 space-y-6">
				<div className="flex flex-col items-center">
					<h2 className="text-xl font-semibold leading-normal">
						{steps[currentStep].title}
					</h2>
					<span className="text-sm text-muted-foreground">
						{steps[currentStep].description}
					</span>
				</div>
				<MultiStep size={steps.length} currentStep={currentStep} />
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-6 p-6">
						<StepComponent />
						<div className="flex items-center justify-between gap-6">
							{!isFirstStep && (
								<Button
									type="button"
									variant={"secondary"}
									size={"lg"}
									className="flex-1"
									onClick={goBack}
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
							>
								{isLastStep ? "Finalizar agendamento" : "Próximo passo"}{" "}
								<ArrowRight className="ml-2" />
							</Button>
						</div>
					</div>
				</form>
			</div>
		</main>
	);
}
