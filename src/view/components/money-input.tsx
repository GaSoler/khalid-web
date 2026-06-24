import { useState } from "react";
import { Input } from "@/view/components/ui/input";

interface MoneyInputProps {
	valueInCents: number;
	onChange: (cents: number) => void;
}

export function MoneyInput({ valueInCents, onChange }: MoneyInputProps) {
	const [displayValue, setDisplayValue] = useState(
		(valueInCents / 100).toFixed(2).replace(".", ","),
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Remove tudo que não for dígito
		const onlyDigits = e.target.value.replace(/\D/g, "");
		const cents = Number(onlyDigits);

		// Formata pra exibição: 5050 → "50,50"
		const formatted = (cents / 100).toFixed(2).replace(".", ",");
		setDisplayValue(formatted);
		onChange(cents);
	};

	return (
		<div className="relative">
			<span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
				R$
			</span>
			<Input
				className="pl-8"
				value={displayValue}
				onChange={handleChange}
				inputMode="numeric" // teclado numérico no mobile
			/>
		</div>
	);
}
