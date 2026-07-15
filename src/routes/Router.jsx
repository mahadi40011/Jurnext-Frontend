import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import AllTicket from "../pages/AllTicket/AllTicket";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddTicket from "../pages/Dashboard/Vendor/AddTicket";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Dashboard/Common/Profile";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import BookedTicket from "../pages/Dashboard/Customer/BookedTicket";
import MyAddedTickets from "../pages/Dashboard/Vendor/MyAddedTickets";
import RequestedBookings from "../pages/Dashboard/Vendor/RequestedBookings";
import ManageTickets from "../pages/Dashboard/Admin/ManageTickets";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import RevenueOverview from "../pages/Dashboard/Vendor/RevenueOverview";
import AdvertiseTickets from "../pages/Dashboard/Admin/AdvertiseTickets";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import TransactionHistory from "../pages/Dashboard/Customer/TransactionHistory";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import RoleBasedAccessRoute from "./RoleBasedAccessRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ),
      },
      {
        path: "all-ticket",
        element: (
          <PublicRoute>
            <AllTicket />
          </PublicRoute>
        ),
      },
      {
        path: "tickets/:id",
        element: (
          <PublicRoute>
            <TicketDetails />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "revenue-overview",
        element: (
          <PrivateRoute>
            <RoleBasedAccessRoute allowedRole={"vendor"}>
              <RevenueOverview />
            </RoleBasedAccessRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-ticket",
        element: (
          <PrivateRoute>
            <RoleBasedAccessRoute allowedRole={"vendor"}>
              <AddTicket />
            </RoleBasedAccessRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "booked-tickets",
        element: (
          <PrivateRoute>
            <RoleBasedAccessRoute allowedRole={"customer"}>
              <BookedTicket />
            </RoleBasedAccessRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "transaction-history",
        element: (
          <PrivateRoute>
            <RoleBasedAccessRoute allowedRole={"customer"}>
              <TransactionHistory />
            </RoleBasedAccessRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "added-ticket",
        element: (
          <PrivateRoute>
            <RoleBasedAccessRoute allowedRole={"vendor"}>
              <MyAddedTickets />
            </RoleBasedAccessRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "requested-bookings",
        element: (
          <PrivateRoute>
            <RoleBasedAccessRoute allowedRole={"vendor"}>
              <RequestedBookings />
            </RoleBasedAccessRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-ticket",
        element: (
          <PrivateRoute>
            <RoleBasedAccessRoute allowedRole={"admin"}>
              <ManageTickets />
            </RoleBasedAccessRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <RoleBasedAccessRoute allowedRole={"admin"}>
              <ManageUsers />
            </RoleBasedAccessRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "advertise-tickets",
        element: (
          <PrivateRoute>
            <RoleBasedAccessRoute allowedRole={"admin"}>
              <AdvertiseTickets />
            </RoleBasedAccessRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <RoleBasedAccessRoute allowedRole={"customer"}>
              <PaymentSuccess />
            </RoleBasedAccessRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
