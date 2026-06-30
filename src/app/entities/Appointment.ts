export type AppointmentStatus = "scheduled" | "cancelled" | "completed";

export interface Appointment {
	id: string;
	customerId: string;
	barberId: string;
	serviceId: string;
	startsAt: string;
	endsAt: string;
	status: AppointmentStatus;
	notes: string | null;
	calendarEventId: string | null;
}
