// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ role, allowedRoles = [], children }) {
//   if (!role) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
//     return <Navigate to="/about" replace />;
//   }

//   return children;
// }
// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, allowedRoles, children }) => {
  // get role from localStorage (in case page reload happens)
  const storedRole = localStorage.getItem("role");
  const activeRole = role || storedRole;

  if (!activeRole || !allowedRoles.includes(activeRole)) {
    // Not logged in or not authorized → redirect
    return <Navigate to="/login" replace />;
  }

  // Authorized → render children
  return children;
};

export default ProtectedRoute;
