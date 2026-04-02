import { Route, Routes } from "react-router-dom";
import { CustomerAppointmentsPage } from "@/view/pages/customer/appointments";
import { RootLayout } from "../view/layouts/root-layout";
import { CustomerPage } from "../view/pages/customer";
import { LoginPage } from "../view/pages/login";
import App from "../view/pages/teste/App";

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />

			<Route element={<RootLayout />}>
				<Route path="/" element={<App />} />
				<Route path="/customer" element={<CustomerPage />} />
				<Route
					path="/customer/appointments"
					element={<CustomerAppointmentsPage />}
				/>
			</Route>
		</Routes>
	);
}
