// import { CircleCheckIcon } from "lucide-react";
// import { useState } from "react";
// import { Button } from "@/view/components/ui/button";
// import { Calendar } from "@/view/components/ui/calendar";
// import {
// 	Card,
// 	CardContent,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "@/view/components/ui/card";
// import { ScrollArea } from "@/view/components/ui/scroll-area";

import { useState } from "react";
import { Button } from "@/view/components/ui/button";
import { Calendar } from "@/view/components/ui/calendar";

// export function DateStep() {
// 	const [date, setDate] = useState<Date | undefined>(new Date());
// 	const [selectedTime, setSelectedTime] = useState<string | null>("10:00");

// 	const timeSlots = Array.from({ length: 37 }, (_, i) => {
// 		const totalMinutes = i * 15;
// 		const hour = Math.floor(totalMinutes / 60) + 9;
// 		const minute = totalMinutes % 60;

// 		return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
// 	});

// 	const bookedDates = Array.from(
// 		{ length: 3 },
// 		(_, i) => new Date(2025, 5, 17 + i),
// 	);

// 	const today = new Date();

// 	return (
// 		<div>
// 			<Card className="gap-0 p-0">
// 				<CardContent className="relative p-0 md:pr-48">
// 					<div className="p-6">
// 						<Calendar
// 							mode="single"
// 							selected={date}
// 							onSelect={setDate}
// 							defaultMonth={date}
// 							// disabled={bookedDates}
// 							disabled={[
// 								{ before: today }, // Dates before today
// 							]}
// 							showOutsideDays={false}
// 							modifiers={{
// 								booked: bookedDates,
// 							}}
// 							modifiersClassNames={{
// 								booked: "[&>button]:line-through opacity-100",
// 							}}
// 							className="bg-transparent p-0 [--cell-size:--spacing(10)]"
// 							formatters={{
// 								formatWeekdayName: (date) => {
// 									return date.toLocaleString("pt-BR", { weekday: "short" });
// 								},
// 							}}
// 						/>
// 					</div>
// 					<div className="inset-y-0 right-0 flex w-full flex-col gap-4 border-t max-md:h-60 md:absolute md:w-48 md:border-t-0 md:border-l">
// 						<ScrollArea className="h-full">
// 							<div className="flex flex-col gap-2 p-6">
// 								{timeSlots.map((time) => (
// 									<Button
// 										key={time}
// 										variant={selectedTime === time ? "default" : "outline"}
// 										onClick={() => setSelectedTime(time)}
// 										className="w-full shadow-none"
// 									>
// 										{time}
// 									</Button>
// 								))}
// 							</div>
// 						</ScrollArea>
// 					</div>
// 				</CardContent>
// 			</Card>
// 		</div>
// 	);
// }

// import { useState } from "react";
// import { Button } from "@/view/components/ui/button";
// import { Calendar } from "@/view/components/ui/calendar";
// import { ScrollArea } from "@/view/components/ui/scroll-area";

// export function DateStep() {
// 	const [date, setDate] = useState<Date | undefined>(new Date());
// 	const [selectedTime, setSelectedTime] = useState<string | null>("10:00");

// 	const timeSlots = Array.from({ length: 37 }, (_, i) => {
// 		const totalMinutes = i * 15;
// 		const hour = Math.floor(totalMinutes / 60) + 9;
// 		const minute = totalMinutes % 60;
// 		return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
// 	});

// 	const today = new Date();
// 	const bookedDates = Array.from(
// 		{ length: 3 },
// 		(_, i) => new Date(2025, 5, 17 + i),
// 	);

// 	return (
// 		<div className="flex flex-col gap-4">
// 			{/* Calendário — full width sempre */}
// 			<div className="rounded-xl border border-border bg-card p-4">
// 				<Calendar
// 					mode="single"
// 					selected={date}
// 					onSelect={setDate}
// 					defaultMonth={date}
// 					disabled={[{ before: today }]}
// 					showOutsideDays={false}
// 					modifiers={{ booked: bookedDates }}
// 					modifiersClassNames={{
// 						booked: "[&>button]:line-through opacity-100",
// 					}}
// 					className="bg-transparent p-0 [--cell-size:--spacing(10)] w-full"
// 					formatters={{
// 						formatWeekdayName: (date) =>
// 							date.toLocaleString("pt-BR", { weekday: "short" }),
// 					}}
// 				/>
// 			</div>

// 			{/* Horários — grid horizontal no mobile, lista vertical no desktop */}
// 			<div className="rounded-xl border border-border bg-card">
// 				<p className="px-4 pt-4 text-sm font-medium text-muted-foreground">
// 					Horários disponíveis
// 				</p>

// 				{/* Mobile: scroll horizontal */}
// 				<div className="flex gap-2 overflow-x-auto px-4 py-3 md:hidden">
// 					{timeSlots.map((time) => (
// 						<Button
// 							key={time}
// 							variant={selectedTime === time ? "default" : "outline"}
// 							onClick={() => setSelectedTime(time)}
// 							className="shrink-0 shadow-none"
// 							size="sm"
// 						>
// 							{time}
// 						</Button>
// 					))}
// 				</div>

// 				{/* Desktop: grid vertical com scroll */}
// 				<ScrollArea className="hidden md:block h-64">
// 					<div className="flex flex-col gap-2 p-4">
// 						{timeSlots.map((time) => (
// 							<Button
// 								key={time}
// 								variant={selectedTime === time ? "default" : "outline"}
// 								onClick={() => setSelectedTime(time)}
// 								className="w-full shadow-none"
// 							>
// 								{time}
// 							</Button>
// 						))}
// 					</div>
// 				</ScrollArea>
// 			</div>
// 		</div>
// 	);
// }

export function DateStep() {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [selectedTime, setSelectedTime] = useState<string | null>("10:00");

	const timeSlots = Array.from({ length: 37 }, (_, i) => {
		const totalMinutes = i * 15;
		const hour = Math.floor(totalMinutes / 60) + 9;
		const minute = totalMinutes % 60;
		return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
	});

	const today = new Date();
	const bookedDates = Array.from(
		{ length: 3 },
		(_, i) => new Date(2025, 5, 17 + i),
	);

	return (
		<div className="rounded-xl border border-border bg-card">
			{/* Desktop: lado a lado | Mobile: empilhado */}
			<div className="flex flex-col md:flex-row">
				{/* Calendário */}
				<div className="flex-1 p-4 md:border-r border-border">
					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						defaultMonth={date}
						disabled={[{ before: today }]}
						showOutsideDays={false}
						modifiers={{ booked: bookedDates }}
						modifiersClassNames={{
							booked: "[&>button]:line-through opacity-100",
						}}
						className="bg-transparent p-0 [--cell-size:--spacing(10)] w-full"
						formatters={{
							formatWeekdayName: (d) =>
								d.toLocaleString("pt-BR", { weekday: "short" }),
						}}
					/>
				</div>

				{/* Horários */}
				<div className="p-4 md:w-56">
					<p className="mb-3 text-sm font-medium text-muted-foreground">
						Horário
					</p>

					{/* Mobile: scroll horizontal */}
					<div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
						{timeSlots.map((time) => (
							<Button
								key={time}
								variant={selectedTime === time ? "default" : "outline"}
								size="sm"
								onClick={() => setSelectedTime(time)}
								className="shrink-0 shadow-none"
							>
								{time}
							</Button>
						))}
					</div>

					{/* Desktop: grid 3 colunas, sem scroll */}
					<div className="hidden md:grid grid-cols-3 gap-1.5">
						{timeSlots.map((time) => (
							<Button
								key={time}
								variant={selectedTime === time ? "default" : "outline"}
								size="sm"
								onClick={() => setSelectedTime(time)}
								className="shadow-none text-xs px-0"
							>
								{time}
							</Button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
