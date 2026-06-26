import { CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/app/utils/cn";
import { Card, CardContent } from "@/view/components/ui/card";
import { ScrollArea } from "@/view/components/ui/scroll-area";

interface ServiceStepProps {
	services: {
		id: string;
		name: string;
		description: string;
		price: number;
		duration: string;
	}[];
}

export function ServiceStep({ services }: ServiceStepProps) {
	const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
		null,
	);

	return (
		<ScrollArea>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{services.map((service) => {
					const isSelected = service.id === selectedServiceId;

					return (
						<Card
							key={service.id}
							onClick={() => setSelectedServiceId(service.id)}
							className={cn(
								"p-4 relative cursor-pointer ring-0 border-2 transition-all hover:border-brand",
								isSelected && "border-brand",
							)}
						>
							<CardContent className="p-0">
								<div className="flex flex-col gap-2">
									<span className="text-base font-medium">{service.name}</span>
									<span className="text-sm text-muted-foreground">
										{service.description}
									</span>
									<span className="text-sm font-semibold">
										R$ {service.price},00
									</span>
									<div className="flex items-center gap-2 text-xs text-muted-foreground">
										<Clock className="h-3 w-3" />
										{service.duration}
									</div>
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
		</ScrollArea>
	);
}
