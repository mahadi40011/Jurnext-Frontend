import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import dayjs from "dayjs";
import Button from "../../components/Shared/Buttons/Button";
import BookNowModal from "../../components/Shared/Modal/BookNowModal";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaBus,
  FaWifi,
  FaPlug,
  FaClock,
  FaUserTie,
  FaEnvelope,
  FaTicketAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaTimesCircle,
} from "react-icons/fa";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const { data: ticket = {}, isLoading } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const result = await axiosSecure(`/tickets/${id}`);
      return result.data;
    },
  });

  const {
    image,
    operator,
    price,
    from,
    to,
    date,
    time,
    busType,
    quantity,
    perks = [],
    vendor,
  } = ticket || {};

  // Countdown timer logic
  useEffect(() => {
    if (!date || !time) return;

    const departure = dayjs(`${date} ${time}`);
    const interval = setInterval(() => {
      const now = dayjs();
      const diff = departure.diff(now);

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft("Departed");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date, time]);

  if (isLoading) return <LoadingSpinner />;

  const closeModal = () => {
    setIsOpen(false);
  };

  // Helper function for rendering perk icons
  const renderPerkIcon = (perk) => {
    const lower = perk.toLowerCase();
    if (lower.includes("wifi")) return <FaWifi className="text-emerald-500" />;
    if (lower.includes("plug") || lower.includes("charging"))
      return <FaPlug className="text-amber-500" />;
    return <FaBus className="text-emerald-500" />;
  };

  const isDeparted = timeLeft === "Departed";
  const isSoldOut = quantity === 0;

  return (
    <Container>
      <div className="py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Image & Route Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            {/* Bus Image Banner */}
            <div className="relative w-full h-80 sm:h-105 rounded-3xl overflow-hidden shadow-xl group border border-gray-100">
              <img
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                src={image || "https://i.ibb.co/vC0P3LG8/ena-bus.jpg"}
                alt={`${operator} image`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

              {/* Bus Type Tag */}
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                {busType} Class
              </span>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {isSoldOut ? (
                  <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase">
                    Sold Out
                  </span>
                ) : isDeparted ? (
                  <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase">
                    Departed
                  </span>
                ) : (
                  <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase animate-pulse">
                    Available
                  </span>
                )}
              </div>

              {/* Destination Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
                  <span>{from}</span>
                  <FaArrowRight className="text-emerald-400 text-xl" />
                  <span>{to}</span>
                </h3>
                <p className="text-sm text-gray-200 mt-1 flex items-center gap-2">
                  <FaClock className="text-emerald-400" />
                  <span>
                    Departure: {date} at {time}
                  </span>
                </p>
              </div>
            </div>

            {/* Vendor Card */}
            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0">
                <img
                  src={vendor?.image || "https://i.ibb.co/vC0P3LG8/ena-bus.jpg"}
                  alt={vendor?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Ticket Vendor
                </p>
                <h4 className="text-base font-bold text-gray-800 truncate flex items-center gap-1.5">
                  <FaUserTie className="text-emerald-600" /> {vendor?.name}
                </h4>
                <p className="text-xs text-gray-600 truncate flex items-center gap-1.5 mt-0.5">
                  <FaEnvelope className="text-gray-400" /> {vendor?.email}
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Ticket Specs & Booking Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-gray-100 flex flex-col justify-between h-full"
          >
            <div>
              {/* Operator Header */}
              <div className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                    {operator}
                  </h1>
                  <p className="text-sm text-emerald-600 font-semibold mt-0.5">
                    Verified Express Transport
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 uppercase font-bold block">
                    Units Left
                  </span>
                  <span
                    className={`text-lg font-black ${quantity > 0 ? "text-emerald-600" : "text-rose-500"}`}
                  >
                    {quantity} Seats
                  </span>
                </div>
              </div>

              {/* Countdown Bar */}
              <div className="my-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                    <FaClock size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase font-bold block">
                      Starts In
                    </span>
                    <span className="text-base font-extrabold text-gray-800">
                      {isDeparted
                        ? "Journey Completed"
                        : timeLeft || "Calculating..."}
                    </span>
                  </div>
                </div>
                <FaTicketAlt className="text-gray-200 text-3xl hidden sm:block" />
              </div>

              {/* Perks List */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3">
                  Included Amenities
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {perks && perks.length > 0 ? (
                    perks.map((perk) => (
                      <div
                        key={perk}
                        className="flex items-center gap-2 bg-gray-100/80 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors border border-gray-200/60"
                      >
                        {renderPerkIcon(perk)}
                        <span>{perk}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">
                      Standard Amenities Included
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Price & Action Section */}
            <div className="pt-6 border-t border-gray-100 mt-4">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase block">
                    Total Price
                  </span>
                  {/* Price */}
                  <span className="text-3xl font-black text-gray-900 mt-0.5">
                    {price} TK
                  </span>
                </div>

                {/* Booking Trigger Button Section */}
                <div className="w-full sm:w-auto min-w-40 relative group">
                  <Button
                    disabled={isDeparted || isSoldOut}
                    onClick={() => setIsOpen(true)}
                    label={
                      isSoldOut
                        ? "Sold Out"
                        : isDeparted
                          ? "Departed"
                          : "Book Now"
                    }
                    icon={
                      isSoldOut
                        ? FaTimesCircle
                        : isDeparted
                          ? FaClock
                          : FaTicketAlt
                    }
                  />

                  {/* Tooltip on Disabled Hover (Optional - UX enhancement) */}
                  {(isDeparted || isSoldOut) && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center justify-center bg-gray-900 text-white text-[11px] font-medium px-3 py-1 rounded-lg shadow-xl whitespace-nowrap z-20 pointer-events-none transition-all">
                      {isSoldOut
                        ? "No seats available to book"
                        : "Bus has already left"}
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookNowModal
        ticketID={id}
        vendor={vendor}
        availableQuantity={quantity}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </Container>
  );
};

export default TicketDetails;
