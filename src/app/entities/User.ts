export type Role = "customer" | "barber" | "admin";

export interface TimeSlot {
	time: string;
	isAvailable: boolean;
}

export interface User {
	id: string;
	email: string;
	fullName: string;
	avatarUrl: string;
	roles: Role[];
}
