import { CheckCircle2 } from "lucide-react";
import type { User } from "@/app/entities/User";
import { cn } from "@/app/utils/cn";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/view/components/ui/avatar";
import { Card, CardContent } from "@/view/components/ui/card";

interface BarberStepProps {
	barbers: User[];
	selectedBarberId: string;
	onSelect: (barberId: string) => void;
}

export function BarberStep({
	barbers,
	selectedBarberId,
	onSelect,
}: BarberStepProps) {
	return (
		<div className="grid gap-4 grid-cols-1 md:grid-cols-2">
			{barbers.map((barber) => {
				const isSelected = barber.id === selectedBarberId;

				return (
					<Card
						key={barber.id}
						onClick={() => onSelect(barber.id)}
						className={cn(
							"p-4 relative cursor-pointer ring-0 border-2 transition-all hover:border-brand",
							isSelected && "border-brand",
						)}
					>
						<CardContent>
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarImage src={barber.avatarUrl} />
									<AvatarFallback>{barber.fullName[0]}</AvatarFallback>
								</Avatar>
								<span className="font-bold">{barber.fullName}</span>
							</div>
							<CheckCircle2
								className={cn(
									"absolute top-2 right-2 text-brand transition-opacity",
									isSelected ? "opacity-100" : "opacity-0",
								)}
							/>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
