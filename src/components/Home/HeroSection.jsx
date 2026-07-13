import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaMapMarkerAlt, FaRegCalendarAlt, FaSearch } from "react-icons/fa";
import bgImage from "../../assets/banner.png";

export default function HeroSection() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Searching buses for:", data);
    // navigate("/search", { state: data });
  };

  return (
    <section className="max-w-340 mx-auto -mt-5">
      <div
        className="relative h-150 flex items-center bg-cover bg-center bg-no-repeat px-4 sm:px-6 md:px-16 overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px]" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 w-full max-w-7xl mx-auto items-center gap-8">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 md:max-w-md w-full bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl border border-white/20"
          >
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900">
                JurNext <span className="text-emerald-600">Bus Ticket</span>
              </h1>

              <p className="text-sm text-gray-700 mt-2">
                Smarter Journeys, Effortless Booking.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* FROM */}
              <div>
                <div className="w-full bg-white rounded-2xl py-2.5 px-5 border border-gray-100 shadow-sm flex items-center gap-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition duration-200">
                  <FaMapMarkerAlt className="text-emerald-600 text-lg" />

                  <div className="flex-1">
                    <label
                      htmlFor="from"
                      className="text-[10px] uppercase font-bold text-gray-400"
                    >
                      From
                    </label>

                    <input
                      id="from"
                      type="text"
                      placeholder="Departure City"
                      {...register("from", {
                        required: "Departure city is required",
                      })}
                      className="w-full bg-transparent text-sm font-bold text-gray-800 outline-none mt-0.5 placeholder-gray-400"
                    />
                  </div>
                </div>

                {errors.from && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.from.message}
                  </p>
                )}
              </div>

              {/* TO */}
              <div>
                <div className="w-full bg-white rounded-2xl py-2.5 px-5 border border-gray-100 shadow-sm flex items-center gap-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition duration-200">
                  <FaMapMarkerAlt className="text-rose-500 text-lg" />

                  <div className="flex-1">
                    <label
                      htmlFor="to"
                      className="text-[10px] uppercase font-bold text-gray-400"
                    >
                      To
                    </label>

                    <input
                      id="to"
                      type="text"
                      placeholder="Destination City"
                      {...register("to", {
                        required: "Destination city is required",
                      })}
                      className="w-full bg-transparent text-sm font-bold text-gray-800 outline-none mt-0.5 placeholder-gray-400"
                    />
                  </div>
                </div>

                {errors.to && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.to.message}
                  </p>
                )}
              </div>

              {/* DATE */}
              <div>
                <div className="w-full bg-white rounded-2xl py-2.5 px-5 border border-gray-100 shadow-sm flex items-center gap-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition duration-200">
                  <FaRegCalendarAlt className="text-blue-500 text-lg" />

                  <div className="flex-1">
                    <label
                      htmlFor="date"
                      className="text-[10px] uppercase font-bold text-gray-400"
                    >
                      Journey Date
                    </label>

                    <input
                      id="date"
                      type="date"
                      min={today.toISOString().split("T")[0]}
                      {...register("date", {
                        required: "Journey date is required",
                      })}
                      className="w-full bg-transparent text-sm font-bold text-gray-800 outline-none mt-0.5 placeholder-gray-400"
                    />
                  </div>
                </div>

                {errors.date && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                type="submit"
                className="w-full py-4 bg-lime-600 hover:bg-lime-700 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-colors"
              >
                <FaSearch />
                Search Buses
              </motion.button>
            </form>
          </motion.div>

          <div className="hidden lg:block lg:col-span-7" />
        </div>
      </div>
    </section>
  );
}
