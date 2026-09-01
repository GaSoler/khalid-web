import { cn } from "@/app/utils/cn";

interface KbdProps extends React.ComponentProps<"kbd"> {
	/** "default" renders with muted background, "ghost" renders with transparent background */
	variant?: "default" | "ghost";
}

function Kbd({ className, variant = "default", ...props }: KbdProps) {
	return (
		<kbd
			data-slot="kbd"
			className={cn(
				"pointer-events-none inline-flex items-center justify-center text-xs font-medium select-none",
				"[&_svg:not([class*='size-'])]:size-3",
				variant === "default" &&
					"h-5 w-fit min-w-5 gap-1 rounded-sm px-1 font-sans bg-muted text-muted-foreground in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10",
				variant === "ghost" && "font-sans text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<kbd
			data-slot="kbd-group"
			className={cn("inline-flex items-center gap-1", className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup };
