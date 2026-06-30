export interface CreateServiceDTO {
	name: string;
	description: string;
	priceInCents: number;
	durationInMinutes: number;
	active?: boolean;
}
