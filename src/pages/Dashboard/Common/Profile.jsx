import React from "react";
import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/cover.jpg";
import useRole from "../../../hooks/useRole";
import { PulseLoader } from "react-spinners";
import {
  User,
  Mail,
  Calendar,
  Clock,
  ShieldCheck,
  Edit3,
  KeyRound,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { role, isRoleLoading } = useRole();

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Banner Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl">
        {/* Background Cover with Overlay */}
        <div className="h-44 sm:h-52 w-full relative">
          <img
            alt="cover photo"
            src={coverImg}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        {/* User Quick Info Bar */}
        <div className="px-6 sm:px-8 pb-6 relative z-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                alt="profile"
                src={
                  user?.photoURL || "https://i.ibb.co/yn0dyhgj/Screenshot-3.png"
                }
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-gray-900 shadow-2xl bg-gray-800"
              />
              <span className="absolute -bottom-2 -right-2 p-1.5 bg-lime-500 rounded-lg text-black shadow-lg">
                <Sparkles className="w-4 h-4 fill-black" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  {user?.displayName}
                </h1>
              </div>
              <p className="text-gray-400 text-sm font-medium flex items-center justify-center sm:justify-start gap-1">
                <Mail className="w-3.5 h-3.5 text-lime-400" />
                {user?.email}
              </p>
            </div>
          </div>

          {/* Role Pill */}
          <div className="bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-700/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-lime-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
              {isRoleLoading ? (
                <PulseLoader size={5} color="#84cc16" />
              ) : (
                role || "Customer"
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Bento Grid Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Column: Essential Details (2 Spans) */}
        <div className="md:col-span-2 space-y-5">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400">
              Account Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100/80">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-lime-100 text-lime-700 rounded-lg">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Full Name
                  </span>
                </div>
                <p className="font-bold text-gray-800 text-base pl-9">
                  {user?.displayName || "Nuru"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100/80">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-lime-100 text-lime-700 rounded-lg">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Email Address
                  </span>
                </div>
                <p className="font-bold text-gray-800 text-base pl-9 truncate">
                  {user?.email || "nuru@gmail.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Member Since
                </p>
                <p className="text-base font-black text-gray-800">
                  {formatDate(
                    user?.metadata?.creationTime || "2026-04-21T08:55:59.835Z",
                  )}
                </p>
              </div>
              <div className="p-3 bg-lime-50 text-lime-600 rounded-2xl">
                <Calendar className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Last Active
                </p>
                <p className="text-base font-black text-gray-800">
                  {formatDate(
                    user?.metadata?.lastSignInTime ||
                      "2026-04-21T08:55:59.835Z",
                  )}
                </p>
              </div>
              <div className="p-3 bg-lime-50 text-lime-600 rounded-2xl">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Action Hub */}
        <div className="bg-linear-to-br from-gray-900 to-gray-950 p-6 rounded-3xl text-white border border-gray-800 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="w-10 h-10 bg-lime-500/10 text-lime-400 rounded-xl flex items-center justify-center border border-lime-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">Account Settings</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Manage your personal information and update account security
              preferences anytime.
            </p>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-lime-500 hover:bg-lime-400 text-black font-extrabold rounded-xl transition-all duration-200 cursor-pointer shadow-md">
              <span className="flex items-center gap-2 text-sm">
                <Edit3 className="w-4 h-4" /> Edit Profile
              </span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all duration-200 cursor-pointer border border-gray-700">
              <span className="flex items-center gap-2 text-sm">
                <KeyRound className="w-4 h-4 text-lime-400" /> Change Password
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
