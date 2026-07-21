import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ManageTicketDataRow from "../../../components/Shared/TableRows/ManageTicketDataRow";

const ManageTickets = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Requested Booking", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/tickets`);
      return data;
    },
  });

  if (isLoading & loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <div className="overflow-x-auto rounded-xl border border-gray-300">
        <table className="table-auto w-full bg-white">
          <thead>
            <tr className="bg-lime-500/80 text-white uppercase text-xs leading-normal">
              <th className="py-4 px-6 border-r border-gray-300 text-left whitespace-nowrap">
                Operator Name
              </th>
              <th className="py-4 px-6 border-r border-gray-300 text-left whitespace-nowrap">
                Bus Type
              </th>
              <th className="py-4 px-6 border-r border-gray-300 text-center">
                Route
              </th>
              <th className="py-4 px-6 border-r border-gray-300 text-center">
                Price
              </th>
              <th className="py-4 px-6 border-r border-gray-300 text-center">
                Quantity
              </th>
              <th className="py-4 px-6 border-r border-gray-300 text-center">
                Departure
              </th>
              <th className="py-4 px-6 border-r border-gray-300 text-left whitespace-nowrap">
                Vendor Email
              </th>
              <th className="py-4 px-6 border-r border-gray-300 text-center">
                Status
              </th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm font-light">
            {tickets.map((ticket) => (
              <ManageTicketDataRow
                key={ticket._id}
                refetch={refetch}
                ticket={ticket}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTickets;
