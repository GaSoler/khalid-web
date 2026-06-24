// import { ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "./ui/button";

// interface BackHeaderProps {
// 	to: string;
// 	text: string;
// }

// export function BackHeader({ to, text }: BackHeaderProps) {
// 	return (
// 		<div className="flex items-center gap-2">
// 			<Button variant={"ghost"}>
// 				<Link to={to}>
// 					<ArrowLeft />
// 				</Link>
// 			</Button>
// 			<h1 className="text-2xl font-bold">{text}</h1>
// 		</div>
// 	);
// }

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface BackHeaderProps {
	to: string;
	text: string;
	description?: string;
}

export function BackHeader({ to, text, description }: BackHeaderProps) {
	return (
		<div className="flex items-center gap-2">
			<Button variant={"ghost"}>
				<Link to={to}>
					<ArrowLeft />
				</Link>
			</Button>

			<div>
				<h1 className="text-2xl font-bold">{text}</h1>
				{description && (
					<span className="text-sm text-muted-foreground">{description}</span>
				)}
			</div>
		</div>
	);
}
