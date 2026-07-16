import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Appointment } from "@/app/entities/Appointment";
import imgUrl from "@/assets/barbershop-map.png";
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

interface AppointmentCardProps {
	appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
	const statusConfig = {
		scheduled: { label: "Agendado", variant: "default" as const },
		cancelled: { label: "Cancelado", variant: "secondary" as const },
		completed: { label: "Finalizado", variant: "outline" as const },
	};
	const status = statusConfig[appointment.status];

	const isBookingConfirmed = isFuture(appointment.startsAt);
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);

	const cancelBooking = async (appointmentId: string) => {
		await new Promise((resolve) => setTimeout(resolve, 3000));

		return true;
	};

	const handleCancelClick = async () => {
		setIsDeleteLoading(true);
		try {
			await cancelBooking(appointment.id);

			toast.success("Reserva cancelada com sucesso");
		} catch (error) {
			console.log(error);
		} finally {
			setIsDeleteLoading(false);
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Card className="py-0 min-w-full">
					<CardContent className="flex px-0 py-0">
						<div className="flex flex-3 flex-col gap-2 py-4 pl-4">
							<Badge className="w-fit" variant={status.variant}>
								{status.label}
							</Badge>
							<h2 className="font-bold">{appointment.serviceId}</h2>
							<p className="text-sm text-muted-foreground">
								com {appointment.barberId}
							</p>
							<div className="flex items-center gap-2">
								<Avatar className="w-6 h-6">
									<AvatarImage src={"https://github.com/GaSoler.png"} />
									<AvatarFallback>KB</AvatarFallback>
								</Avatar>

								<h3 className="text-sm">Khalid Baarbearia</h3>
							</div>
						</div>
						<div className="flex flex-1 flex-col items-center justify-center border-l p-6">
							<p className="text-sm capitalize">
								{format(appointment.startsAt, "MMMM", { locale: ptBR })}
							</p>
							<p className="text-2xl">{format(appointment.startsAt, "dd")}</p>
							<p className="text-sm">{format(appointment.startsAt, "HH:mm")}</p>
						</div>
					</CardContent>
				</Card>
			</SheetTrigger>
			<SheetContent side="left" className="px-0">
				<SheetHeader className="text-left pb-6 px-5 border-b">
					<SheetTitle>Informações da reserva</SheetTitle>
				</SheetHeader>

				<div className="px-5">
					<div className="relative h-45 w-full mt-6">
						<img
							src={imgUrl}
							className="absolute inset-0 h-full w-full object-cover"
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
					<Badge className="w-fit my-3">Confirmado</Badge>

					<Card>
						<CardContent className="flex flex-col gap-2 p-3">
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
									{format(appointment.startsAt, "dd 'de' MMMM", {
										locale: ptBR,
									})}
								</h4>
							</div>

							<div className="flex justify-between">
								<h3 className="text-gray-400 text-sm">Horário</h3>
								<h4 className="text-sm font-extralight">
									{format(appointment.startsAt, "HH:mm")}
								</h4>
							</div>

							<div className="flex justify-between">
								<h3 className="text-gray-400 text-sm">Barbearia</h3>
								<h4 className="text-sm font-extralight">Khalid Barbearia</h4>
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
									disabled={!isBookingConfirmed || isDeleteLoading}
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
			</SheetContent>
		</Sheet>
	);
}
