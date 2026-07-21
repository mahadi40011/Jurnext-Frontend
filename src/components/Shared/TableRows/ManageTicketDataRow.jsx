import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageTicketDataRow = ({ ticket, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    operator,
    busType,
    from,
    to,
    price,
    quantity,
    date,
    time,
    vendor,
    status,
  } = ticket || {};

  const handleStatusUpdate = async (newStatus) => {
    try {
      const { data } = await axiosSecure.patch(`/tickets/${_id}`, {
        status: newStatus,
      });

      if (data.modifiedCount > 0) {
        refetch();
        toast.success(`Status updated to ${newStatus}`);
      }
    } catch (err) {
      toast.error(err);
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
      <td className="py-4 px-6 text-left border-r border-gray-200 whitespace-nowrap font-semibold text-blue-600">
        {from} &rarr; {to}
      </td>
      <td className="py-4 px-6 text-center border-r border-gray-200 font-bold whitespace-nowrap">
        {price} TK
      </td>
      <td className="py-4 px-6 text-center border-r border-gray-200">
        {quantity}
      </td>
      <td className="py-4 px-6 text-center border-r border-gray-200 whitespace-nowrap">
        {date} {time}
      </td>
      <td className="py-4 px-6 text-left border-r border-gray-200  whitespace-nowrap">
        {vendor?.email}
      </td>
      <td className="py-4 px-6 text-center border-r border-gray-200">
        <p className="text-gray-900 ">
          <span
            className={`${status === "pending" ? "bg-yellow-200/40" : ""} ${
              status === "approved" ? "bg-green-200/40" : ""
            } ${
              status === "rejected" ? "bg-red-200/40" : ""
            } px-3 pb-0.5 text-xs rounded-full font-normal`}
          >
            {" "}
            {status}
          </span>
        </p>
      </td>
      <td className="py-4 px-6 text-left text-xs">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleStatusUpdate("approved")}
            disabled={status === "approved"}
            className="px-4 py-1.5 rounded-lg bg-lime-200 text-lime-600 font-bold text-xs uppercase tracking-wider hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Approve
          </button>

          <button
            onClick={() => handleStatusUpdate("rejected")}
            disabled={status === "rejected"}
            className="px-4 py-1.5 rounded-lg bg-rose-100 text-rose-700 font-bold text-xs uppercase tracking-wider hover:bg-rose-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ManageTicketDataRow;
