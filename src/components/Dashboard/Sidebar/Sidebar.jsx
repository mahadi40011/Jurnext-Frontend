import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/logo.png";
// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { HiX } from "react-icons/hi";

// User Menu
import MenuItem from "../../Shared/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import VendorMenu from "./Menu/VendorMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Sidebar = () => {
  const { logOut } = useAuth();
  const { role, isRoleLoading } = useRole();
  const [isActive, setActive] = useState(false); // Default active for desktop

  const handleToggle = () => {
    setActive(!isActive);
  };

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <>
      {/* 1. Mobile Header (Only visible on small screens) */}
      <div className="bg-gray-900 text-gray-100 flex justify-between items-center md:hidden px-4 py-3 shadow-lg">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 h-8" src={logo} alt="Logo" />
          <span className="font-black text-xl tracking-tighter">
            JUR<span className="text-lime-500">NEXT</span>
          </span>
        </Link>
        <button
          onClick={handleToggle}
          className="p-2 rounded-lg bg-gray-800 text-lime-500 hover:bg-gray-700 transition-colors"
        >
          {isActive || <AiOutlineBars size={24} />}
        </button>
      </div>

      {/* 2. Sidebar Container */}
      <div
        className={`z-20 fixed inset-y-0 left-0 flex flex-col justify-between bg-gray-100 h-screen border-r border-gray-100 transition-all duration-300 ease-in-out md:w-72 w-full transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 shadow-2xl md:shadow-none`}
      >
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          {/* Logo Section */}
          {/* Mobile screen logo on sidebar, when is open */}
          <div className="bg-gray-900 text-gray-100 flex justify-between items-center md:hidden px-4 py-3 shadow-lg">
            <Link to="/" className="flex items-center gap-2">
              <img className="w-8 h-8" src={logo} alt="Logo" />
              <span className="font-black text-xl tracking-tighter">
                JUR<span className="text-lime-500">NEXT</span>
              </span>
            </Link>
            <button
              onClick={handleToggle}
              className="p-2 rounded-lg bg-gray-800 text-lime-500 hover:bg-gray-700 transition-colors"
            >
              {isActive && <HiX size={24} />}
            </button>
          </div>

          {/* md screen logo on sidebar */}
          <div className="px-6 py-8 hidden md:block">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300"
                src={logo}
                alt="Logo"
              />
              <span className="font-black text-2xl tracking-tighter text-gray-800 uppercase">
                Jur<span className="text-lime-500">next</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4 mt-5 md:mt-0">
              Main Menu
            </p>
            
            {/* Role-Based Menus */}
            <nav className="space-y-1">
              {role === "admin" && <AdminMenu />}
              {role === "vendor" && <VendorMenu />}
              {role === "customer" && <CustomerMenu />}
            </nav>
          </div>

          {/* Footer Section */}
          <div className="p-4 border-t border-gray-50 bg-gray-50/50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">
              Account
            </p>
            <div className="space-y-1">
              <MenuItem
                icon={FcSettings}
                label="My Profile"
                address="/dashboard/profile"
              />
              <button
                onClick={logOut}
                className="flex w-full items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 font-bold text-sm group"
              >
                <GrLogout className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="mx-4">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Overlay for Mobile */}
      {isActive && (
        <div
          onClick={handleToggle}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden transition-opacity"
        />
      )}
    </>
  );
};

export default Sidebar;
