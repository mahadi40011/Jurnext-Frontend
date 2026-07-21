import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const RequestedBookingTableRow = ({refetch, bookingReqData }) => {
  const axiosSecure = useAxiosSecure();
  const {_id, customer, ticketPrice, operatorName, quantity, status } =
    bookingReqData;
  
  const handleStatusUpdate = async (newStatus) => {
    try {
      const { data } = await axiosSecure.patch(`/booking-status/${_id}`, {
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
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{customer?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{operatorName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-center text-sm">
        <p className="text-gray-900 ">{quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-center text-sm">
        <p className="text-gray-900 ">
          <span
            className={`${status === "pending" ? "bg-yellow-200/50" : ""} ${
              status === "accepted" ? "bg-green-200/50" : ""
            } ${
              status === "rejected" ? "bg-red-200/50" : ""
            } px-3 pb-0.5 rounded-full font-normal`}
          >
            {" "}
            {status}
          </span>
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-center text-sm">
        <p className="text-gray-900 ">${ticketPrice * quantity}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleStatusUpdate("accepted")}
            disabled={status === "accepted"}
            className="px-4 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs uppercase tracking-wider hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Accept
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

export default RequestedBookingTableRow;
