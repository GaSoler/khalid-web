import type { TimeSlot } from "@/app/entities/User";
import { Loader } from "@/view/components/loader";
import { Button } from "@/view/components/ui/button";
import { Calendar } from "@/view/components/ui/calendar";
import { ScrollArea } from "@/view/components/ui/scroll-area";

interface DateStepProps {
	date: Date | undefined;
	selectedTime: string;
	timeSlots: TimeSlot[];
	isLoading: boolean;
	onDateChange: (date: Date | undefined) => void;
	onTimeSelect: (time: string) => void;
}

export function DateStep({
	date,
	selectedTime,
	timeSlots,
	isLoading,
	onDateChange,
	onTimeSelect,
}: DateStepProps) {
	const today = new Date();

	return (
		<div className="rounded-xl border border-border bg-card overflow-hidden md:h-full">
			<div className="flex flex-col md:flex-row md:h-full">
				<div className="flex-1 p-4 border-border md:border-r md:flex">
					{/* <Calendar
						mode="single"
						selected={date}
						onSelect={onDateChange}
						defaultMonth={date}
						disabled={[{ before: today }]}
						showOutsideDays={false}
						className="bg-transparent p-0 [--cell-size:--spacing(10)] w-full"
						formatters={{
							formatWeekdayName: (d) =>
								d.toLocaleString("pt-BR", { weekday: "short" }),
						}}
					/> */}
					<Calendar
						mode="single"
						selected={date}
						onSelect={onDateChange}
						defaultMonth={date}
						disabled={[{ before: today }]}
						showOutsideDays={false}
						className="bg-transparent p-0 [--cell-size:--spacing(8)] xs:[--cell-size:--spacing(10)] w-full"
						formatters={{
							formatWeekdayName: (d) =>
								d.toLocaleString("pt-BR", { weekday: "narrow" }),
						}}
					/>
				</div>
				{/* <div className="flex flex-col p-4 border-t border-border"> */}
				{/* <div className="flex flex-col p-4 border-t border-border shrink-0"> */}
				<div className="p-4 border-t md:border-t-0 md:border-l border-border md:w-48 md:flex md:flex-col md:min-h-0">
					<p className="mb-3 shrink-0 text-sm font-medium text-muted-foreground">
						Horários disponíveis
					</p>
					{isLoading ? (
						// <div className="text-sm text-muted-foreground">
						// 	Carregando horários...
						// </div>
						<Loader />
					) : (
						<>
							{/* Mobile — scroll horizontal */}
							<div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
								{timeSlots.map((slot) => (
									<Button
										type="button"
										key={slot.time}
										variant={selectedTime === slot.time ? "default" : "outline"}
										size="sm"
										disabled={!slot.isAvailable}
										onClick={() => onTimeSelect(slot.time)}
										className="shrink-0 shadow-none"
									>
										{slot.time}
									</Button>
								))}
							</div>

							{/* Desktop — scroll vertical */}
							<ScrollArea className="hidden md:flex flex-1">
								<div className="grid grid-cols-1 gap-2 pr-3">
									{timeSlots.map((slot) => (
										<Button
											type="button"
											key={slot.time}
											variant={
												selectedTime === slot.time ? "default" : "outline"
											}
											size="sm"
											disabled={!slot.isAvailable}
											onClick={() => onTimeSelect(slot.time)}
											className="shadow-none text-xs px-0"
										>
											{slot.time}
										</Button>
									))}
								</div>
							</ScrollArea>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
