// import { Scissors } from "lucide-react";

// export function Loader() {
// 	return (
// 		<div className="flex h-dvh w-full items-center justify-center bg-background">
// 			<Scissors className="size-8 animate-spin text-muted-foreground" />
// 		</div>
// 	);
// }

import { Scissors } from "lucide-react";

interface LoaderProps {
	fullScreen?: boolean;
}

export function Loader({ fullScreen = false }: LoaderProps) {
	return (
		<div
			className={`flex items-center justify-center bg-background ${fullScreen ? "h-dvh w-full" : "flex-1 w-full py-12"}`}
		>
			<Scissors className="size-8 animate-spin text-muted-foreground" />
		</div>
	);
}
