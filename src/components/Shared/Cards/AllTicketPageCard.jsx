import React from "react";
import { Link } from "react-router";
import { FaClock, FaCalendarAlt, FaChevronRight } from "react-icons/fa";

const AllTicketPageCard = ({ ticket }) => {
  const {
    _id,
    image,
    operator,
    busType,
    price,
    quantity,
    time,
    date,
    from,
    to,
  } = ticket;

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={operator}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`bg-lime-400/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm `}
          >
            {busType}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span
            className={`backdrop-blur-lg text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm ${
              quantity > 0
                ? "bg-white/90 text-gray-800"
                : "bg-red-500 text-white"
            }`}
          >
            {quantity > 0 ? `${quantity} Tickets Left` : "Sold Out"}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-lime-600 transition-colors line-clamp-1 uppercase tracking-tight">
          {operator}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-lime-600 bg-lime-50 px-2 py-1 rounded">
            {from}
          </span>
          <div className="h-px grow bg-dashed bg-gray-300 border-t border-dashed"></div>
          <span className="pb-1">to</span>
          <div className="h-px grow bg-dashed bg-gray-300 border-t border-dashed"></div>
          <span className="text-xs font-bold text-lime-600 bg-lime-50 px-2 py-1 rounded">
            {to}
          </span>
        </div>

        <div className="flex justify-between items-center px-2 mb-5 text-gray-500">
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <FaCalendarAlt className="text-lime-500" /> {date}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <FaClock className="text-lime-500" /> {time}
          </div>
        </div>

        <div className="mt-auto border-t pt-4 border-gray-200 flex items-center justify-between ">
          <span className="text-2xl font-black text-gray-800 mb-2 group-hover:text-lime-600 transition-colors line-clamp-1 uppercase tracking-tight">
            ${price}
          </span>

          <Link
            to={`/tickets/${_id}`}
            className="flex items-center gap-2 bg-lime-600 hover:bg-lime-800 text-white px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-lime-200 active:scale-95"
          >
            Details <FaChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllTicketPageCard;
