import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/view/components/ui/card";

interface StatsCardProps {
	title: string;
	value: string | number;
	icon: LucideIcon;
	description?: string;
	trend?: {
		value: number;
		positive: boolean;
	};
}

export function StatsCard({
	title,
	value,
	icon: Icon,
	description,
	trend,
}: StatsCardProps) {
	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-sm font-medium text-muted-foreground">
							{title}
						</span>
						<span className="text-2xl font-bold">{value}</span>
						{description && (
							<span className="text-xs text-muted-foreground">
								{description}
							</span>
						)}
						{trend && (
							<span
								className={`text-xs font-medium ${trend.positive ? "text-green-500" : "text-red-500"}`}
							>
								{trend.positive ? "+" : "-"}
								{Math.abs(trend.value)}% em relação ao mês anterior
							</span>
						)}
					</div>
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
						<Icon className="h-6 w-6 text-brand" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
