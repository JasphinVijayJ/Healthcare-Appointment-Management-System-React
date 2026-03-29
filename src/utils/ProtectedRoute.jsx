import { Navigate } from "react-router-dom";

// Role-Based Access Control (RBAC)
function ProtectedRoute({ children, allowedRoles }) {

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    const isLoggedIn = !!token;

    // Not logged in - redirect to login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // Check if user has required role
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect based on role
        if (userRole === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
        if (userRole === "DOCTOR") return <Navigate to="/doctor/dashboard" replace />;
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;