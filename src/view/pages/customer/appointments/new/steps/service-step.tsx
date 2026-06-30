import { CheckCircle2, Clock } from "lucide-react";
import type { Service } from "@/app/entities/Service";
import { cn } from "@/app/utils/cn";
import { formatDuration } from "@/app/utils/format-duration";
import { formatPrice } from "@/app/utils/format-price";
import { Card, CardContent } from "@/view/components/ui/card";
import { ScrollArea } from "@/view/components/ui/scroll-area";

interface ServiceStepProps {
	services: Service[];
	selectedServiceId: string;
	onSelect: (serviceId: string) => void;
}

export function ServiceStep({
	services,
	selectedServiceId,
	onSelect,
}: ServiceStepProps) {
	return (
		<ScrollArea>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{services.map((service) => {
					const isSelected = service.id === selectedServiceId;

					return (
						<Card
							key={service.id}
							onClick={() => onSelect(service.id)}
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
										{formatPrice(service.priceCents)}
									</span>
									<div className="flex items-center gap-2 text-xs text-muted-foreground">
										<Clock className="h-3 w-3" />
										{formatDuration(service.durationMin)}
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
