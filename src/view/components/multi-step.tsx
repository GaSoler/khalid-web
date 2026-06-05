interface MultiStepProps {
	size: number;
	currentStep?: number;
}

export function MultiStep({ size, currentStep = 0 }: MultiStepProps) {
	return (
		<div className="flex flex-col gap-2 px-6">
			<p className="text-xs text-muted-foreground">
				Passo {currentStep + 1} de {size}
			</p>
			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
			>
				{Array.from({ length: size }).map((_, i) => (
					<div
						key={i}
						className={`h-1 rounded-full ${
							i <= currentStep ? "bg-brand" : "bg-muted-foreground"
						}`}
					/>
				))}
			</div>
		</div>
	);
}
