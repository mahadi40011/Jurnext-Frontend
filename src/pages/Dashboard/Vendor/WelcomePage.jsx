import React from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { Store, PlusCircle, Bus, ArrowRight, Sparkles } from "lucide-react";

const VendorWelcomePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 sm:p-6">
      {/* Vendor Hero Banner */}
      <div className="relative overflow-hidden bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-800">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-lime-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider">
            <Store className="w-4 h-4" /> Vendor Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Hello,{" "}
            <span className="text-lime-400">
              {user?.displayName || "Vendor Partner"}
            </span>
            !
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Ready to increase your booking volume today? Publish new routes or
            review your existing scheduled trips.
          </p>
        </div>
      </div>

      {/* Vendor Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-lime-500" /> Actions & Inventory
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link
            to="/dashboard/add-ticket"
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-lime-300 transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-lime-50 text-lime-600 rounded-2xl group-hover:bg-lime-500 group-hover:text-black transition-colors duration-300">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-lime-600 transition-colors">
                  Add New Ticket
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Publish new bus route seats
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-lime-500 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/dashboard/added-ticket"
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-lime-300 transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-lime-50 text-lime-600 rounded-2xl group-hover:bg-lime-500 group-hover:text-black transition-colors duration-300">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-lime-600 transition-colors">
                  My Added Tickets
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Manage schedules & active buses
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

export default VendorWelcomePage;
