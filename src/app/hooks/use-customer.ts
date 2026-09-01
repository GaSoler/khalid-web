import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { useAuth } from "@/app/contexts/auth-provider";
import { customerServices } from "@/app/services/customer/index";
import type { CreateAppointmentDTO } from "../entities/request/CreateAppointmentDTO";

export function useListActiveServices() {
	const { user } = useAuth();

	const listActiveServices = useQuery({
		queryKey: ["customer-services"],
		queryFn: customerServices.listActiveServices,
		enabled: !!user,
	});

	return {
		services: listActiveServices.data ?? [],
		isLoadingServices: listActiveServices.isLoading,
		errorServices: listActiveServices.error,
	};
}

export function useListActiveBarbers() {
	const { user } = useAuth();

	const listActiveBarbers = useQuery({
		queryKey: ["customer-barbers"],
		queryFn: customerServices.listActiveBarbers,
		enabled: !!user,
	});

	return {
		barbers: listActiveBarbers.data ?? [],
		isLoadingBarbers: listActiveBarbers.isLoading,
		errorBarbers: listActiveBarbers.error,
	};
}

export function useGetBarberAvailableTimes(barberId: string, date?: Date) {
	const formattedDate = date?.toISOString().split("T")[0];

	return useQuery({
		queryKey: [
			"customer",
			"barbers",
			barberId,
			"available-times",
			formattedDate,
		],
		queryFn: () =>
			customerServices.getBarberAvailableTimes(barberId, formattedDate!),
		enabled: Boolean(barberId && formattedDate),
		staleTime: 0,
		gcTime: 0,
	});
}

export function useListAppointments() {
	const { user } = useAuth();

	const listAppointments = useQuery({
		queryKey: ["customer-appointments"],
		queryFn: customerServices.listAppointments,
		enabled: !!user,
	});

	return {
		appointments: listAppointments.data ?? [],
		isLoadingAppointments: listAppointments.isLoading,
		errorAppointments: listAppointments.error,
	};
}

export function useGetAppointment(appointmentId: string) {
	const getAppointment = useQuery({
		queryKey: ["customer-appointments", appointmentId],
		queryFn: () => customerServices.getAppointment(appointmentId),
		enabled: Boolean(appointmentId),
	});

	return {
		appointment: getAppointment.data ?? null,
		isLoadingAppointment: getAppointment.isLoading,
		errorAppointment: getAppointment.error,
	};
}

export function useGetNextAppointment() {
	const { user } = useAuth();

	const getNextAppointment = useQuery({
		queryKey: ["customer-next-appointment"],
		queryFn: customerServices.getNextAppointment,
		enabled: !!user,
	});

	return {
		nextAppointment: getNextAppointment.data ?? null,
		isLoadingNextAppointment: getNextAppointment.isLoading,
		errorNextAppointment: getNextAppointment.error,
	};
}

export function useCreateAppointment(onSuccess?: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (body: CreateAppointmentDTO) =>
			customerServices.createAppointment(body),

		onSuccess: (appointment) => {
			queryClient.invalidateQueries({
				queryKey: ["customer-appointments"],
			});
			queryClient.invalidateQueries({
				queryKey: ["customer-next-appointment"],
			});

			const date = format(new Date(appointment.startsAt), "dd 'de' MMMM", {
				locale: ptBR,
			});
			const time = format(new Date(appointment.startsAt), "HH:mm");

			toast.success("Agendamento confirmado!", {
				description: `Seu horário foi marcado para ${date} às ${time}.`,
				duration: 5000,
			});

			onSuccess?.();
		},
		// biome-ignore lint/suspicious/noExplicitAny: <lalala>
		onError: (error: any) => {
			const message =
				error?.response?.data?.message ?? "Tente novamente em instantes.";

			toast.error("Não foi possível realizar o agendamento.", {
				description: message,
				duration: 6000,
			});
		},
	});
}

export function useCancelAppointment(onSuccess?: () => void) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (appointmentId: string) =>
			customerServices.cancelAppointment(appointmentId),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["customer-appointments"],
			});
			queryClient.invalidateQueries({
				queryKey: ["customer-next-appointment"],
			});

			toast.success("Reserva cancelada com sucesso!", {
				description: "Seu horário foi cancelado.",
				duration: 5000,
			});

			onSuccess?.();
		},
		// biome-ignore lint/suspicious/noExplicitAny: <lalala>
		onError: (error: any) => {
			const message =
				error?.response?.data?.message ?? "Tente novamente em instantes.";

			toast.error("Não foi possível cancelar a reserva.", {
				description: message,
				duration: 6000,
			});
		},
	});
}
