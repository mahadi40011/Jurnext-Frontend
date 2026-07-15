import React from "react";
import { Link } from "react-router";
import {

  FaClock,
  FaCalendarAlt,
  FaChevronRight,
} from "react-icons/fa";

const AllTicketPageCard = ({ ticket }) => {
  const { _id, image, operator, perks, price, quantity, time, date, from, to } =
    ticket;

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
            className={`bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm ${
              quantity > 0 ? "bg-lime-500" : "bg-red-500"
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

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold text-lime-600 bg-lime-50 px-2 py-1 rounded">
            {from}
          </span>
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

        <div className="flex flex-wrap gap-1.5 mb-6">
          {perks?.slice(0, 3).map((perk, idx) => (
            <span
              key={idx}
              className="text-[9px] font-bold bg-gray-50 text-gray-400 border border-gray-100 px-2 py-0.5 rounded uppercase"
            >
              • {perk}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
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
