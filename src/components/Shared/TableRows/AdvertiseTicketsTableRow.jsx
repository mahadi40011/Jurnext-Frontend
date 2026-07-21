import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AdvertiseTicketsTableRow = ({ ticket, refetch }) => {
  const [advertise, setAdvertise] = useState(ticket?.advertise);
  const axiosSecure = useAxiosSecure();
  const { _id, operator, busType, from, to, price, date, time } = ticket || {};
  
  const handleAdvertise = async () => {
    try {
      const { data } = await axiosSecure.patch(`/advertise-ticket/${_id}`, {
        advertise: !advertise
      });

      if (data.modifiedCount > 0) {
        refetch();
        setAdvertise(!advertise)
        toast.success(`${!advertise? "Advertised Successful": "Remove Advertise Successful"}`);
      } else {
        toast.info("Advertised Unsuccessful");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-emerald-50 transition-colors">
      <td className="py-4 px-6 text-left border-r border-gray-200 font-medium whitespace-nowrap">
        {operator}
      </td>
      <td className="py-4 px-6 text-center border-r border-gray-200">
        {busType}
      </td>
      <td className="py-4 px-6 text-center border-r border-gray-200 whitespace-nowrap font-semibold text-blue-600">
        {from} &rarr; {to}
      </td>
      <td className="py-4 px-6 text-center border-r border-gray-200 font-bold">
        {price} TK
      </td>
      <td className="py-4 px-6 text-center border-r border-gray-200 whitespace-nowrap">
        {date}, {time}
      </td>
      <td className="py-4 px-6 text-left flex justify-center items-center text-xs">
        <button
          onClick={handleAdvertise}
          className="px-4 py-1.5 rounded-lg bg-lime-200 text-lime-700 font-bold text-xs uppercase tracking-wider hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {advertise ? "Remove" : "Advertise"}
        </button>
      </td>
    </tr>
  );
};

export default AdvertiseTicketsTableRow;
