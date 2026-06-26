import { useState } from "react";
import { Button } from "@/view/components/ui/button";
import { Calendar } from "@/view/components/ui/calendar";
import { ScrollArea } from "@/view/components/ui/scroll-area";

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
		<div className="rounded-xl border border-border bg-card overflow-hidden md:h-full">
			<div className="flex flex-col md:flex-row md:h-full">
				<div className="flex-1 p-4 border-border md:border-r md:flex">
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
				<div className="flex flex-col p-4 border-t border-border">
					<p className="mb-3 shrink-0 text-sm font-medium text-muted-foreground">
						Horários disponíveis
					</p>

					{/* Mobile — scroll horizontal */}
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

					{/* Desktop — scroll vertical */}
					<ScrollArea className="hidden md:flex flex-1">
						<div className="grid grid-cols-1 gap-2 pr-3">
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
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}
