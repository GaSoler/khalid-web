import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapContainer, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import type { Service } from "@/app/entities/Service";
import type { User } from "@/app/entities/User";
import { BARBERSHOP, DisableInteraction } from "@/app/utils/barbershop-infos";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/view/components/ui/avatar";
import { Card, CardContent } from "@/view/components/ui/card";
import type { AppointmentForm } from "../use-appointment-wizard";

interface ConfirmStepProps {
	form: AppointmentForm;
	service: Service | undefined;
	barber: User | undefined;
}

export function ConfirmStep({ form, service, barber }: ConfirmStepProps) {
	return (
		<div>
			<Card>
				<CardContent>
					<div className="flex flex-col items-center gap-4">
						<div className="relative h-44 w-full">
							<div className="absolute inset-0 overflow-hidden z-0">
								<MapContainer
									center={[BARBERSHOP.lat, BARBERSHOP.lng]}
									zoom={15}
									zoomControl={false}
									className="w-full h-full"
									attributionControl={false}
								>
									<TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
									<DisableInteraction />
								</MapContainer>
							</div>

							<div className="absolute inset-0 z-10 bg-transparent hover:bg-black/10 transition-colors" />

							<Link
								to={BARBERSHOP.mapsUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="absolute bottom-2 left-2 right-2 z-20"
							>
								<Card>
									<CardContent className="p-3 flex gap-2 items-center">
										<Avatar>
											<AvatarImage src="https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=V10OLz0nH9NPxaIgeBKEqQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=25.262861&pitch=0&thumbfov=100" />
											<AvatarFallback>KB</AvatarFallback>
										</Avatar>

										<div className="min-w-0">
											<h2 className="font-bold">{BARBERSHOP.name}</h2>
											<h3 className="text-xs text-muted-foreground truncate">
												{BARBERSHOP.address}
											</h3>
										</div>
									</CardContent>
								</Card>
							</Link>
						</div>
						<div className="flex flex-col gap-2 p-3 w-full">
							<div className="flex justify-between">
								<h2 className="font-bold">{service?.name ?? "—"}</h2>
								<h3 className="font-bold text-sm">
									{service
										? Intl.NumberFormat("pt-BR", {
												style: "currency",
												currency: "BRL",
											}).format(service.priceCents / 100)
										: "—"}
								</h3>
							</div>

							<div className="flex justify-between capitalize">
								<h3 className="text-gray-400 text-sm">Dia</h3>
								<h4 className="text-sm font-extralight">
									{form.date
										? format(form.date, "dd 'de' MMMM", { locale: ptBR })
										: "—"}
								</h4>
							</div>

							<div className="flex justify-between">
								<h3 className="text-gray-400 text-sm">Horário</h3>
								<h4 className="text-sm font-extralight">{form.time || "—"}</h4>
							</div>

							<div className="flex justify-between">
								<h3 className="text-gray-400 text-sm">Barbeiro</h3>
								<h4 className="text-sm">{barber?.fullName ?? "—"}</h4>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
