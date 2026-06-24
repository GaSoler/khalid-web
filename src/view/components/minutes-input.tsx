import { Input } from "./ui/input";

interface MinutesInputProps {
	value: number;
	onChange: (minutes: number) => void;
}

export function MinutesInput({ value, onChange }: MinutesInputProps) {
	return (
		<div className="relative">
			<Input
				className="pr-10"
				value={value}
				onChange={(e) => {
					const onlyDigits = e.target.value.replace(/\D/g, "");
					onChange(Number(onlyDigits));
				}}
				inputMode="numeric"
			/>
			<span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
				min
			</span>
		</div>
	);
}
