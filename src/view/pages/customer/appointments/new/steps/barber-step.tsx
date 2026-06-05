import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/app/utils/cn";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/view/components/ui/avatar";
import { Card, CardContent } from "@/view/components/ui/card";

interface BarberStepProps {
	barbers: {
		id: string;
		name: string;
		avatarUrl: string;
	}[];
}

export function BarberStep({ barbers }: BarberStepProps) {
	const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);

	return (
		<div className="grid gap-4 grid-cols-1 md:grid-cols-2">
			{barbers.map((barber) => {
				const isSelected = barber.id === selectedBarberId;

				return (
					<Card
						key={barber.id}
						onClick={() => setSelectedBarberId(barber.id)}
						className={cn(
							"p-4 relative cursor-pointer ring-0 border-2 transition-all hover:border-brand",
							isSelected && "border-brand",
						)}
					>
						<CardContent>
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarImage src={barber.avatarUrl} />
									<AvatarFallback>{barber.name[0]}</AvatarFallback>
								</Avatar>
								<span className="font-bold">{barber.name}</span>
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
