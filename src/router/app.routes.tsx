import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "@/app/contexts/auth-provider";
import type { Role } from "@/app/entities/User";
import { ProtectedRoute } from "@/app/services/protected-route";
import { Loader } from "@/view/components/loader";
import { AdminPage } from "@/view/pages/admin";
import { AdminServicesPage } from "@/view/pages/admin/services";
import { AdminUsersPage } from "@/view/pages/admin/users";
import { CustomerAppointmentsPage } from "@/view/pages/customer/appointments";
import { CustomerNewAppointmentPage } from "@/view/pages/customer/appointments/new";
import { RootLayout } from "../view/layouts/root-layout";
import { CustomerPage } from "../view/pages/customer";
import { LoginPage } from "../view/pages/login";
import App from "../view/pages/teste/App";

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
				<Route
					path="/customer/appointments/new"
					element={
						<ProtectedRoute roles={["customer"]}>
							<CustomerNewAppointmentPage />
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
