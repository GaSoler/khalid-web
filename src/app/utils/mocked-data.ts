import { IconHelp, IconSearch, IconSettings } from "@tabler/icons-react";

export const dataSidebar = {
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: IconSettings,
		},
		{
			title: "Get Help",
			url: "#",
			icon: IconHelp,
		},
		{
			title: "Search",
			url: "#",
			icon: IconSearch,
		},
	],
};

export const services = [
	{
		id: "1",
		name: "Corte Masculino",
		description: "Corte tradicional ou moderno na tesoura ou máquina.",
		price: 35,
		duration: "30 min",
	},
	{
		id: "2",
		name: "Barba Completa",
		description: "Aparar, desenhar e finalizar com toalha quente.",
		price: 25,
		duration: "25 min",
	},
	{
		id: "3",
		name: "Corte + Barba",
		description: "Combo completo de corte e barba com acabamento premium.",
		price: 55,
		duration: "50 min",
	},
	{
		id: "4",
		name: "Corte Degradê (Fade)",
		description: "Degradê na máquina com acabamento detalhado.",
		price: 40,
		duration: "40 min",
	},
	{
		id: "5",
		name: "Corte Infantil",
		description: "Corte especial para crianças com cuidado e paciência.",
		price: 30,
		duration: "30 min",
	},
	{
		id: "6",
		name: "Sobrancelha",
		description: "Alinhamento e limpeza da sobrancelha.",
		price: 10,
		duration: "10 min",
	},
	{
		id: "7",
		name: "Pigmentação de Barba",
		description: "Preenchimento e destaque da barba com pigmento.",
		price: 45,
		duration: "30 min",
	},
	{
		id: "8",
		name: "Hidratação Capilar",
		description: "Tratamento para hidratar e fortalecer os fios.",
		price: 30,
		duration: "20 min",
	},
	{
		id: "9",
		name: "Platinado / Luzes",
		description: "Descoloração e estilo personalizado.",
		price: 120,
		duration: "120 min",
	},
	{
		id: "10",
		name: "Acabamento (pezinho)",
		description: "Ajuste rápido no contorno do corte.",
		price: 15,
		duration: "15 min",
	},
];

export const barbers = [
	{
		id: "1",
		name: "Nicolas Papenika",
		avatarUrl: "https://avatars.githubusercontent.com/u/101422583?v=4",
	},
	{
		id: "2",
		name: "Gabriel Soler",
		avatarUrl: "https://avatars.githubusercontent.com/u/101422583?v=4",
	},
];

export const timeSlots = [
	{ time: "09:00", available: false },
	{ time: "09:30", available: false },
	{ time: "10:00", available: true },
	{ time: "10:30", available: true },
	{ time: "11:00", available: true },
	{ time: "11:30", available: true },
	{ time: "12:00", available: false },
	{ time: "12:30", available: true },
	{ time: "13:00", available: true },
	{ time: "13:30", available: true },
	{ time: "14:00", available: true },
	{ time: "14:30", available: false },
	{ time: "15:00", available: false },
	{ time: "15:30", available: true },
	{ time: "16:00", available: true },
	{ time: "16:30", available: true },
	{ time: "17:00", available: true },
	{ time: "17:30", available: true },
];

export const services2 = [
	{
		id: "1",
		name: "Corte de cabelo & Barba",
		description: "Corte completo com acabamento de barba",
		priceInCents: 5500,
		durationInMinutes: 50,
		active: true,
	},
	{
		id: "2",
		name: "Sobrancelha",
		description: "Alinhamento e limpeza da sobrancelha",
		priceInCents: 1000,
		durationInMinutes: 10,
		active: false,
	},
];

export const users = [
	{
		id: "2d7b5ab2-4de2-4cc3-adf7-51c23e037dfe",
		email: "gabriel.edsoler@gmail.com",
		fullName: "Gabriel Soler",
		avatarUrl:
			"https://lh3.googleusercontent.com/a/ACg8ocKSy0nuWREonU-CZwo5aQVqL8c8-LLawqKJ3j-yQalY2L0dvg=s96-c",
		roles: ["customer"],
	},
	{
		id: "9225379b-05f7-4e67-a78c-06b9b006c1de",
		email: "gah.soler@gmail.com",
		fullName: "Gabriel Soler",
		avatarUrl:
			"https://lh3.googleusercontent.com/a/ACg8ocKWmsFmjXHFfYyLDt3RpwSNH6OfiqkDzgZ2uNNNC53bLK0P2A=s96-c",
		roles: ["barber", "admin"],
	},
	{
		id: "0845b344-bd8d-44d0-88ae-a08d5c646fb1",
		email: "gabisoler1234@gmail.com",
		fullName: "Gabriel Soler",
		avatarUrl:
			"https://lh3.googleusercontent.com/a/ACg8ocLbwnzFdjCS6xX9sHLeDVue5i1_LUw2VVCBeqPwZQd9HDzeP77N5w=s96-c",
		roles: ["barber"],
	},
];

export type Role = "customer" | "barber" | "admin";
