import { ArrowLeft, ArrowRight } from "lucide-react";
import { MultiStep } from "@/view/components/multi-step";
import { Button } from "@/view/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/view/components/ui/sheet";
import { buildSteps } from "./steps";
import { useAppointmentWizard } from "./use-appointment-wizard";

interface CustomerNewAppointmentSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CustomerNewAppointmentSheet({
	open,
	onOpenChange,
}: CustomerNewAppointmentSheetProps) {
	const wizard = useAppointmentWizard(() => onOpenChange(false));

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
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="flex flex-col p-0 gap-0 sm:max-w-md">
				<SheetHeader className="px-4 py-4 border-b border-border shrink-0">
					<SheetTitle>Agendar horário</SheetTitle>
				</SheetHeader>

				<div className="px-4 pt-4 pb-3 space-y-3 shrink-0">
					<div className="flex flex-col gap-1">
						<h3 className="font-semibold">{currentStepConfig.title}</h3>
						<span className="text-sm text-muted-foreground">
							{currentStepConfig.description}
						</span>
					</div>
					<MultiStep size={steps.length} currentStep={wizard.currentStep} />
				</div>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col flex-1 overflow-hidden"
				>
					<div className="flex-1 overflow-y-auto px-4 py-2">
						{currentStepConfig.component}
					</div>

					{/* Botões fixos no rodapé */}
					<div className="flex items-center gap-3 px-4 py-4 shrink-0 border-t border-border">
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
							{wizard.isLastStep ? "Finalizar" : "Próximo"}
							<ArrowRight className="ml-2" />
						</Button>
					</div>
				</form>
			</SheetContent>
		</Sheet>
	);
}
