import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import imgUrl from "@/assets/barbershop-map.png";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/view/components/ui/avatar";
import { Card, CardContent } from "@/view/components/ui/card";

export function ConfirmStep() {
	return (
		<div>
			<Card>
				<CardContent>
					<div className="flex sm:flex-col items-center gap-4">
						<div className="relative h-45 w-full">
							<img
								src={imgUrl}
								className="absolute inset-0 h-full w-full object-cover rounded-xl"
								alt="Localização da barbearia no mapa"
							/>
							<div className="px-5">
								<div className="w-full absolute bottom-4 left-0 px-5">
									<Card>
										<CardContent className="p-3 flex gap-2">
											<Avatar>
												<AvatarImage src={"https://github.com/GaSoler.png"} />
												<AvatarFallback>KB</AvatarFallback>
											</Avatar>

											<div>
												<h2 className="font-bold">Khalid Baarbearia</h2>
												<h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
													Rua das Flores, 123 - São Paulo/SP
												</h3>
											</div>
										</CardContent>
									</Card>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2 p-3 w-full">
							<div className="flex justify-between">
								<h2 className="font-bold">Corte de cabelo & Barba</h2>
								<h3 className="font-bold text-sm">
									{Intl.NumberFormat("pt-BR", {
										style: "currency",
										currency: "BRL",
									}).format(Number(60))}
								</h3>
							</div>

							<div className="flex justify-between capitalize">
								<h3 className="text-gray-400 text-sm">Dia</h3>
								<h4 className="text-sm font-extralight">
									{format(new Date("2024-04-21T09:00:00"), "dd 'de' MMMM", {
										locale: ptBR,
									})}
								</h4>
							</div>

							<div className="flex justify-between">
								<h3 className="text-gray-400 text-sm">Horário</h3>
								<h4 className="text-sm font-extralight">
									{format(new Date("2024-04-21T09:00:00"), "HH:mm")}
								</h4>
							</div>

							<div className="flex justify-between">
								<h3 className="text-gray-400 text-sm">Barbeiro</h3>
								<h4 className="text-sm font-extralight">Nicolas Papenika</h4>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
