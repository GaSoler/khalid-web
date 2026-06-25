import { Scissors } from "lucide-react";

export function Loader() {
	return (
		<div className="flex h-dvh w-full items-center justify-center bg-background">
			<Scissors className="size-8 animate-spin text-muted-foreground" />
		</div>
	);
}
