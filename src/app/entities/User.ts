export type Role = "customer" | "barber" | "admin";

export interface User {
	id: string;
	email: string;
	fullName: string;
	avatarUrl: string;
	roles: Role[];
}
