import barberImg from "@/assets/get-appointment.svg";
import { Card, CardContent } from "@/view/components/ui/card";

export function EmptyAppointmentCard() {
	return (
		<Card className="py-0 min-w-full opacity-70 border border-dashed border-accent-border ring-0">
			<CardContent className="flex items-center justify-center px-0 py-0">
				<div className="flex flex-col items-center gap-2 py-4 justify-center">
					<img src={barberImg} alt="Barber" />
					<h2 className="font-bold text-muted-foreground text-lg">
						Nenhum horário marcado
					</h2>

					<p className="text-base text-muted-foreground">
						Agende seu próximo corte
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
