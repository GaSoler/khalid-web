import { format } from "date-fns";
import { useState } from "react";
import {
	useCreateAppointment,
	useGetBarberAvailableTimes,
	useListActiveBarbers,
	useListActiveServices,
} from "@/app/hooks/use-customer";

export type AppointmentForm = {
	serviceId: string;
	barberId: string;
	date: Date | undefined;
	time: string;
};

const TOTAL_STEPS = 4;

export function useAppointmentWizard(onSuccess?: () => void) {
	const [currentStep, setCurrentStep] = useState(0);
	const [form, setForm] = useState<AppointmentForm>({
		serviceId: "",
		barberId: "",
		date: new Date(),
		time: "",
	});

	// — Dados —
	const { services, isLoadingServices } = useListActiveServices();
	const { barbers, isLoadingBarbers } = useListActiveBarbers();
	const availableTimes = useGetBarberAvailableTimes(form.barberId, form.date);
	const createAppointment = useCreateAppointment(onSuccess);

	// — Derivados —
	const selectedService = services.find((s) => s.id === form.serviceId);
	const selectedBarber = barbers.find((b) => b.id === form.barberId);
	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === TOTAL_STEPS - 1;

	// — Validação por step —
	const canAdvance = (): boolean => {
		switch (currentStep) {
			case 0:
				return !!form.serviceId;
			case 1:
				return !!form.barberId;
			case 2:
				return !!form.date && !!form.time;
			case 3:
				return true;
			default:
				return false;
		}
	};

	// — Ações do form —
	const setService = (serviceId: string) =>
		setForm((prev) => ({ ...prev, serviceId }));

	const setBarber = (barberId: string) =>
		setForm((prev) => ({ ...prev, barberId }));

	const setDate = (date: Date | undefined) =>
		setForm((prev) => ({ ...prev, date, time: "" })); // reseta o horário ao trocar data

	const setTime = (time: string) => setForm((prev) => ({ ...prev, time }));

	// — Navegação —
	const goNext = () =>
		setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));

	const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

	const submit = () => {
		if (!form.date) return;
		createAppointment.mutate({
			serviceId: form.serviceId,
			barberId: form.barberId,
			date: format(form.date, "yyyy-MM-dd"),
			time: form.time,
		});
	};

	return {
		currentStep,
		form,
		isFirstStep,
		isLastStep,
		canAdvance: canAdvance(),
		isSubmitting: createAppointment.isPending,
		services,
		barbers,
		availableTimes: availableTimes.data ?? [],
		isLoadingTimes: availableTimes.isLoading,
		isLoadingServices,
		isLoadingBarbers,
		selectedService,
		selectedBarber,
		setService,
		setBarber,
		setDate,
		setTime,
		goNext,
		goBack,
		submit,
	};
}
