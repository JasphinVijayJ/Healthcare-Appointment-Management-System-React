import { Navigate } from "react-router-dom";

// Role-Based Access Control (RBAC)
export function ProtectedRoute({ children, allowedRoles }) {

    const userRole = localStorage.getItem("role");
    const isLoggedIn = !!localStorage.getItem("email") && !!userRole;

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


// Blocks DOCTOR and ADMIN from accessing patient/guest pages.
// Redirects them to their own dashboard instead.
// Guest (not logged in) and PATIENT pass through freely.
export function PatientRoute({ children }) {
  const role = localStorage.getItem('role');

  if (role === 'DOCTOR') return <Navigate to='/doctor/dashboard' replace />;
  if (role === 'ADMIN') return <Navigate to='/admin/dashboard' replace />;

  return children;
}


// Prevents logged-in users from accessing login/register pages
export function PublicRoute({ children }) {

  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  if (email && role) {
    if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />
    if (role === 'DOCTOR') return <Navigate to="/doctor/dashboard" replace />
    return <Navigate to="/" replace />
  }

  return children
}