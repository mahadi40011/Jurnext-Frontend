import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const RoleBasedAccessRoute = ({ children, allowedRole }) => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (role === allowedRole) {
    return children;
  }

  return <ErrorPage />;
};

export default RoleBasedAccessRoute;
