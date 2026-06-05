import {
	IconCamera,
	IconChartBar,
	IconDashboard,
	IconDatabase,
	IconFileAi,
	IconFileDescription,
	IconFileWord,
	IconFolder,
	IconHelp,
	IconInnerShadowTop,
	IconListDetails,
	IconReport,
	IconSearch,
	IconSettings,
	IconUsers,
} from "@tabler/icons-react";

export const dataSidebar = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "#",
			icon: IconDashboard,
		},
		{
			title: "Lifecycle",
			url: "#",
			icon: IconListDetails,
		},
		{
			title: "Analytics",
			url: "#",
			icon: IconChartBar,
		},
		{
			title: "Projects",
			url: "#",
			icon: IconFolder,
		},
		{
			title: "Team",
			url: "#",
			icon: IconUsers,
		},
	],
	navClouds: [
		{
			title: "Capture",
			icon: IconCamera,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Proposal",
			icon: IconFileDescription,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Prompts",
			icon: IconFileAi,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
	],
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
	documents: [
		{
			name: "Data Library",
			url: "#",
			icon: IconDatabase,
		},
		{
			name: "Reports",
			url: "#",
			icon: IconReport,
		},
		{
			name: "Word Assistant",
			url: "#",
			icon: IconFileWord,
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
