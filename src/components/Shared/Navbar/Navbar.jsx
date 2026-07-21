import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import Container from "../Container";
import { Link, NavLink, useLocation } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";
import useAuth from "../../../hooks/useAuth";
import MenuItem from "../MenuItem";
import { LuCircleUser } from "react-icons/lu";
import { GrLogout } from "react-icons/gr";

const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Mobile Drawer Close Helper
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  // Route change hole automatically drawer close hobe
  useEffect(() => {
    closeDrawer();
  }, [location.pathname]);

  // Navbar Scroll effect listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/all-ticket", name: "All Tickets" },
    { path: "/dashboard", name: "Dashboard" },
  ];

  return (
    <div
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md py-2"
          : "bg-white py-4"
      }`}
    >
      <Container>
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              className="md:w-10 md:h-10 w-8 h-8 group-hover:rotate-12 transition-transform"
              src={logo}
              alt="Logo"
            />
            <span className="font-black text-2xl md:text-3xl tracking-tighter text-gray-800">
              JUR<span className="text-lime-500">NEXT</span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((navLink, index) => (
              <NavLink
                key={index}
                to={navLink.path}
                className={({ isActive }) =>
                  `text-sm font-bold uppercase tracking-widest transition-all hover:text-lime-500 ${
                    isActive
                      ? "text-lime-600 border-b-2 border-lime-500"
                      : "text-gray-500"
                  }`
                }
              >
                {navLink.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side: Auth / Profile */}
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse flex items-center justify-center">
                <span className="loading loading-spinner loading-sm text-lime-500"></span>
              </div>
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="p-1 border-2 border-transparent hover:border-lime-500 rounded-full transition-all"
                >
                  <img
                    className="rounded-full object-cover border border-gray-200"
                    referrerPolicy="no-referrer"
                    src={user.photoURL}
                    alt="profile"
                    height="38"
                    width="38"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-white rounded-2xl z-1 w-52 p-2 shadow-2xl border border-gray-100 mt-4"
                >
                  <div className="px-4 py-3 border-b border-gray-50 mb-2">
                    <p className="text-xs text-gray-400 font-bold uppercase">
                      Welcome
                    </p>
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {user?.displayName}
                    </p>
                  </div>
                  <MenuItem
                    label={"My Profile"}
                    address={"/dashboard/profile"}
                    icon={LuCircleUser}
                  />
                  <button
                    onClick={logOut}
                    className="flex w-full items-center px-4 py-3 mt-1 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold text-sm"
                  >
                    <GrLogout className="w-4 h-4" />
                    <span className="mx-3">Logout</span>
                  </button>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center bg-lime-600 hover:bg-lime-700 text-white px-8 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-lime-200 active:scale-95"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button & Drawer */}
            <div className="lg:hidden">
              <div className="drawer drawer-end">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  <label
                    htmlFor="my-drawer"
                    className="cursor-pointer text-gray-800"
                  >
                    <HiMenu size={30} />
                  </label>
                </div>
                <div className="drawer-side z-50">
                  <label htmlFor="my-drawer" className="drawer-overlay"></label>
                  <div className="menu p-6 w-80 min-h-full bg-white text-base-content">
                    <div className="flex justify-between items-center mb-10">
                      <span className="font-black text-2xl tracking-tighter">
                        JUR<span className="text-lime-500">NEXT</span>
                      </span>
                      <label htmlFor="my-drawer" className="cursor-pointer">
                        <HiX size={24} />
                      </label>
                    </div>

                    <div className="flex flex-col gap-4">
                      {navItems.map((item, idx) => (
                        <NavLink
                          key={idx}
                          to={item.path}
                          onClick={closeDrawer}
                          className={({ isActive }) =>
                            `text-lg font-bold p-2 border-b border-gray-50 transition-colors ${
                              isActive ? "text-lime-600" : "text-gray-700"
                            }`
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                      {!user && (
                        <Link
                          to="/login"
                          onClick={closeDrawer}
                          className="bg-lime-600 hover:bg-lime-800 text-white p-3 rounded-xl text-center font-bold mt-4 transition-all shadow-lg hover:shadow-lime-200 active:scale-95"
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
