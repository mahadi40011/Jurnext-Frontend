import React from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import {
  ShieldCheck,
  Users,
  Ticket,
  ArrowRight,
  Activity,
  Zap,
} from "lucide-react";

const AdminWelcomePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 sm:p-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-800">
        {/* Decorative Background Blur Glows */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-lime-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> System Administrator
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Welcome back,{" "}
              <span className="text-lime-400">
                {user?.displayName || "Admin"}
              </span>
              !
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your platform overview is healthy. Manage users, monitor vendor
              ticket listings, and configure overall application controls from
              here.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-800/80 backdrop-blur-md p-4 rounded-2xl border border-gray-700/60 shadow-inner self-stretch md:self-auto justify-center">
            <div className="p-3 bg-lime-500/20 text-lime-400 rounded-xl">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">
                Platform Status
              </p>
              <p className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-400 inline-block"></span>{" "}
                All Systems Operational
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Zap className="w-5 h-5 text-lime-500" /> Quick Management Shortcuts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link
            to="/dashboard/manage-users"
            className="group relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-lime-300 transition-all duration-300 flex items-center justify-between overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-lime-50 text-lime-600 rounded-2xl group-hover:bg-lime-500 group-hover:text-black transition-colors duration-300">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-lime-600 transition-colors">
                  User Management
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Control roles and system accounts
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-lime-500 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/dashboard/manage-ticket"
            className="group relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-lime-300 transition-all duration-300 flex items-center justify-between overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-lime-50 text-lime-600 rounded-2xl group-hover:bg-lime-500 group-hover:text-black transition-colors duration-300">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-lime-600 transition-colors">
                  All Ticket Listings
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Inspect and audit added trips
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-lime-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcomePage;
