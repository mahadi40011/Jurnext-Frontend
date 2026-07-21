import React from "react";
import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import AdminWelcomePage from "./Admin/WelcomePage";
import VendorWelcomePage from "./Vendor/WelcomePage";

const Dashboard = () => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (role === "admin") {
    return <AdminWelcomePage />;
  }

  if (role === "vendor") {
    return <VendorWelcomePage />;
  }

  if (role === "customer") {
    return;
  }
};

export default Dashboard;
