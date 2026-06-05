import { CircleCheckIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/view/components/ui/button";
import { Calendar } from "@/view/components/ui/calendar";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/view/components/ui/card";
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

	const bookedDates = Array.from(
		{ length: 3 },
		(_, i) => new Date(2025, 5, 17 + i),
	);

	const today = new Date();

	return (
		<div>
			<Card className="gap-0 p-0">
				<CardContent className="relative p-0 md:pr-48">
					<div className="p-6">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							defaultMonth={date}
							// disabled={bookedDates}
							disabled={[
								{ before: today }, // Dates before today
							]}
							showOutsideDays={false}
							modifiers={{
								booked: bookedDates,
							}}
							modifiersClassNames={{
								booked: "[&>button]:line-through opacity-100",
							}}
							className="bg-transparent p-0 [--cell-size:--spacing(10)]"
							formatters={{
								formatWeekdayName: (date) => {
									return date.toLocaleString("pt-BR", { weekday: "short" });
								},
							}}
						/>
					</div>
					<div className="inset-y-0 right-0 flex w-full flex-col gap-4 border-t max-md:h-60 md:absolute md:w-48 md:border-t-0 md:border-l">
						<ScrollArea className="h-full">
							<div className="flex flex-col gap-2 p-6">
								{timeSlots.map((time) => (
									<Button
										key={time}
										variant={selectedTime === time ? "default" : "outline"}
										onClick={() => setSelectedTime(time)}
										className="w-full shadow-none"
									>
										{time}
									</Button>
								))}
							</div>
						</ScrollArea>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
