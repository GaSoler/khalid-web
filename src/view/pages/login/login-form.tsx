import { IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
} from "@/view/components/ui/field";
import barberImg from "./barbershop-team.svg";

export function LoginForm() {
	return (
		<div className="flex flex-col gap-6">
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<form className="flex p-6 md:p-8">
						<FieldGroup className="items-center justify-center">
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
								<p className="text-balance text-muted-foreground">
									Acesse sua conta da Khalid Barbearia
								</p>
							</div>
							<Field>
								<Button variant={"brand"} size={"lg"}>
									<svg
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="128"
										height="128"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
									</svg>
									Entrar com Google
								</Button>
							</Field>
						</FieldGroup>
					</form>
					<div>
						<img src={barberImg} alt="" className="" />
					</div>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				Ao continuar, você concorda com nossos <a href="#">Termos de Uso</a> e{" "}
				<a href="#">Política de Privacidade</a>.
			</FieldDescription>
		</div>
	);
}
