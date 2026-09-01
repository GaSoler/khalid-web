import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "@/app/contexts/auth-provider";
import { ProtectedRoute } from "@/app/services/protected-route";
import { Loader } from "@/view/components/loader";
import { AdminPage } from "@/view/pages/admin";
import { AdminServicesPage } from "@/view/pages/admin/services";
import { AdminUsersPage } from "@/view/pages/admin/users";
import { BarberPage } from "@/view/pages/barber";
import { BarberAppointmentsPage } from "@/view/pages/barber/appointments";
import { BarberAvailabilityPage } from "@/view/pages/barber/availability";
import { CustomerAppointmentsPage } from "@/view/pages/customer/appointments";
import { RootLayout } from "../view/layouts/root-layout";
import { CustomerPage } from "../view/pages/customer";
import { LoginPage } from "../view/pages/login";

export function AppRoutes() {
	const { user, isLoading } = useAuth();

	if (isLoading) return <Loader />;

	const homeRedirect = !user
		? "/login"
		: user.roles.includes("admin")
			? "/admin"
			: user.roles.includes("barber")
				? "/barber"
				: "/customer";

	return (
		<Routes>
			<Route
				path="/login"
				element={user ? <Navigate to={homeRedirect} replace /> : <LoginPage />}
			/>

			<Route element={<RootLayout />}>
				<Route path="/" element={<Navigate to={homeRedirect} replace />} />

				{/* Customer */}
				<Route
					path="/customer"
					element={
						<ProtectedRoute roles={["customer"]}>
							<CustomerPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/customer/appointments"
					element={
						<ProtectedRoute roles={["customer"]}>
							<CustomerAppointmentsPage />
						</ProtectedRoute>
					}
				/>

				{/* Barber */}
				<Route
					path="/barber"
					element={
						<ProtectedRoute roles={["barber"]}>
							<BarberPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/barber/availability"
					element={
						<ProtectedRoute roles={["barber"]}>
							<BarberAvailabilityPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/barber/appointments"
					element={
						<ProtectedRoute roles={["barber"]}>
							<BarberAppointmentsPage />
						</ProtectedRoute>
					}
				/>

				{/* Admin */}
				<Route
					path="/admin"
					element={
						<ProtectedRoute roles={["admin"]}>
							<AdminPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/services"
					element={
						<ProtectedRoute roles={["admin"]}>
							<AdminServicesPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/users"
					element={
						<ProtectedRoute roles={["admin"]}>
							<AdminUsersPage />
						</ProtectedRoute>
					}
				/>

				<Route path="*" element={<Navigate to={homeRedirect} replace />} />
			</Route>
		</Routes>
	);
}
