import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
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
	});
}

export function useCreateAppointment() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (body: CreateAppointmentDTO) =>
			customerServices.createAppointment(body),

		onSuccess: (appointment) => {
			queryClient.invalidateQueries({
				queryKey: ["customer", "appointments", "customer-next-appointment"],
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

			navigate("/customer");
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

export function useGetNextAppointment() {
	const { user } = useAuth();

	const getNextAppointment = useQuery({
		queryKey: ["customer-next-appointment"],
		queryFn: customerServices.getNextAppointment,
		enabled: !!user,
	});

	return {
		appointment: getNextAppointment.data ?? null,
		isLoadingAppointment: getNextAppointment.isLoading,
		errorAppointment: getNextAppointment.error,
	};
}
