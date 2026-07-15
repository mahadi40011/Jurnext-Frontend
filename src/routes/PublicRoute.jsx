import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useRole();

  if (loading || isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (user && (role === "admin" || role === "vendor")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
