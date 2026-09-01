export type AppointmentStatus = "scheduled" | "cancelled" | "completed";

export interface Appointment {
	id: string;
	customer: {
		id: string;
		email: string;
		fullName: string | null;
		avatarUrl: string | null;
	};
	barber: {
		id: string;
		email: string;
		fullName: string | null;
		avatarUrl: string | null;
	};
	service: {
		id: string;
		name: string;
		description: string | null;
		durationMin: number;
		priceCents: number;
		active: boolean;
	};
	startsAt: Date;
	endsAt: Date;
	status: AppointmentStatus;
	notes: string | null;
	calendarEventId: string | null;
}
