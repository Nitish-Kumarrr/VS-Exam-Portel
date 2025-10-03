import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, allowedRoles = [], children }) {
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/about" replace />;
  }

  return children;
}
