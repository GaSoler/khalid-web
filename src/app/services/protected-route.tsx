import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/contexts/auth-provider";
import type { Role } from "../entities/User";

interface ProtectedRouteProps {
	children: React.ReactNode;
	roles?: Role[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
	const { user, isLoading } = useAuth();

	if (isLoading) return null; // ou um spinner

	if (!user) return <Navigate to="/login" replace />;
	if (roles && !roles.some((r) => user.roles.includes(r))) {
		const fallback = user.roles.includes("admin")
			? "/admin"
			: user.roles.includes("barber")
				? "/barber"
				: "/customer";
		return <Navigate to={fallback} replace />;
	}

	return <>{children}</>;
}
