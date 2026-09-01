import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { MapContainer, TileLayer } from "react-leaflet";
import type { Appointment } from "@/app/entities/Appointment";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/view/components/ui/alert-dialog";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/view/components/ui/avatar";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/view/components/ui/sheet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
	useCancelAppointment,
	useGetAppointment,
} from "@/app/hooks/use-customer";
import { BARBERSHOP, DisableInteraction } from "@/app/utils/barbershop-infos";
import { formatPrice } from "@/app/utils/format-price";
import { Loader } from "@/view/components/loader";

interface AppointmentCardProps {
	appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
	const [sheetOpen, setSheetOpen] = useState(false);

	const { appointment: appointmentDetails, isLoadingAppointment } =
		useGetAppointment(sheetOpen ? appointment.id : "");

	const statusConfig = {
		scheduled: { label: "Agendado", variant: "default" as const },
		cancelled: { label: "Cancelado", variant: "secondary" as const },
		completed: { label: "Finalizado", variant: "outline" as const },
	};
	const status = statusConfig[appointment.status];

	const isBookingConfirmed = isFuture(appointment.startsAt);
	const { mutateAsync: cancelAppointment, isPending: isDeleteLoading } =
		useCancelAppointment();

	const handleCancelClick = async () => {
		await cancelAppointment(appointment.id);
	};

	const details = appointmentDetails ?? appointment;

	return (
		<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
			<SheetTrigger asChild>
				<Card className="py-0 min-w-full">
					<CardContent className="flex px-0 py-0">
						<div className="flex flex-3 flex-col gap-2 py-4 pl-4">
							<Badge className="w-fit" variant={status.variant}>
								{status.label}
							</Badge>
							<h2 className="font-bold">{appointment.service.name}</h2>
							<p className="text-sm text-muted-foreground">
								com {appointment.barber.fullName}
							</p>
							<div className="flex items-center gap-2">
								<Avatar className="w-6 h-6">
									<AvatarImage src="https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=V10OLz0nH9NPxaIgeBKEqQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=25.262861&pitch=0&thumbfov=100" />
									<AvatarFallback>KB</AvatarFallback>
								</Avatar>

								<h3 className="text-sm">{BARBERSHOP.name}</h3>
							</div>
						</div>
						<div className="flex flex-1 flex-col items-center justify-center border-l p-6">
							<p className="text-sm capitalize">
								{format(new Date(appointment.startsAt), "MMMM", {
									locale: ptBR,
								})}
							</p>
							<p className="text-2xl">
								{format(new Date(appointment.startsAt), "dd")}
							</p>
							<p className="text-sm">
								{format(new Date(appointment.startsAt), "HH:mm")}
							</p>
						</div>
					</CardContent>
				</Card>
			</SheetTrigger>
			<SheetContent side="right" className="px-0">
				<SheetHeader className="text-left px-5 border-b">
					<SheetTitle>Detalhes do Agendamento</SheetTitle>
				</SheetHeader>

				{isLoadingAppointment ? (
					<div className="flex-1 flex items-center justify-center">
						<Loader />
					</div>
				) : (
					<div className="px-5">
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

						<Badge
							className="w-fit my-3"
							variant={statusConfig[details.status].variant}
						>
							{statusConfig[details.status].label}
						</Badge>

						<Card>
							<CardContent className="flex flex-col gap-2 p-3">
								<div className="flex justify-between">
									<h2 className="font-bold">{details.service.name}</h2>
									<h3 className="font-bold text-sm">
										{formatPrice(details.service.priceCents)}
									</h3>
								</div>

								<div className="flex justify-between capitalize">
									<h3 className="text-gray-400 text-sm">Dia</h3>
									<h4 className="text-sm font-extralight">
										{format(new Date(details.startsAt), "dd 'de' MMMM", {
											locale: ptBR,
										})}
									</h4>
								</div>

								<div className="flex justify-between">
									<h3 className="text-gray-400 text-sm">Horário</h3>
									<h4 className="text-sm font-extralight">
										{format(new Date(details.startsAt), "HH:mm")}
									</h4>
								</div>

								<div className="flex justify-between">
									<h3 className="text-gray-400 text-sm">Barbearia</h3>
									<h4 className="text-sm font-extralight">{BARBERSHOP.name}</h4>
								</div>
							</CardContent>
						</Card>

						<SheetFooter className="flex flex-row gap-3 mt-6">
							<SheetClose asChild>
								<Button className="flex-1" variant="secondary">
									Voltar
								</Button>
							</SheetClose>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										className="flex-1"
										variant="destructive"
										disabled={
											!isBookingConfirmed ||
											isDeleteLoading ||
											details.status === "cancelled"
										}
									>
										{isDeleteLoading && (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										)}
										Cancelar reserva
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent className="w-[90%]">
									<AlertDialogHeader>
										<AlertDialogTitle>
											Deseja cancelar a reserva?
										</AlertDialogTitle>
										<AlertDialogDescription>
											Uma vez cancelada, não será possível reverter essa ação
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter className="flex-row gap-3">
										<AlertDialogCancel className="flex-1 mt-0">
											Voltar
										</AlertDialogCancel>
										<AlertDialogAction
											className="flex-1"
											onClick={handleCancelClick}
											disabled={isDeleteLoading}
										>
											{isDeleteLoading && (
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											)}
											Confirmar
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</SheetFooter>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
