import type { Appointment } from "@/app/entities/Appointment";
import type { CreateAppointmentDTO } from "@/app/entities/request/CreateAppointmentDTO";
import type { ApiResponse } from "@/app/entities/response/ApiResponse";
import type { PageResponse } from "@/app/entities/response/PageResponse";
import type { Service } from "@/app/entities/Service";
import type { TimeSlot, User } from "@/app/entities/User";
import { httpClient } from "../http-client";

export const customerServices = {
	listActiveServices: () =>
		httpClient
			.get<PageResponse<Service>>("/customer/services")
			.then((res) => res.data.data),

	listActiveBarbers: () =>
		httpClient
			.get<PageResponse<User>>("/customer/barbers")
			.then((res) => res.data.data),

	getBarberAvailableTimes: (barberId: string, date: string) =>
		httpClient
			.get<
				ApiResponse<{
					timeSlots: TimeSlot[];
					date: string;
					barberId: string;
				}>
			>(`/customer/barbers/${barberId}/available-times`, {
				params: { date },
			})
			.then((res) => res.data.data.timeSlots),

	listAppointments: () =>
		httpClient
			.get<ApiResponse<Appointment[]>>("/customer/appointments")
			.then((res) => {
				console.log("res.data", res.data);
				return res.data.data;
			}),

	getAppointment: (appointmentId: string) =>
		httpClient
			.get<{ data: Appointment }>(`/customer/appointments/${appointmentId}`)
			.then((res) => res.data.data),

	getNextAppointment: () =>
		httpClient
			.get<ApiResponse<Appointment | null>>("/customer/appointments/next")
			.then((res) => res.data.data),

	createAppointment: (body: CreateAppointmentDTO) =>
		httpClient
			.post<ApiResponse<Appointment>>("/customer/appointments", body)
			.then((res) => res.data.data),

	cancelAppointment: (appointmentId: string) =>
		httpClient
			.post<{ appointments: Appointment }>(
				`/customer/appointments/${appointmentId}`,
			)
			.then((res) => res.data),
};
