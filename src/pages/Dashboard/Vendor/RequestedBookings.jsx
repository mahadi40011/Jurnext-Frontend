import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import RequestedBookingTableRow from "../../../components/Shared/TableRows/RequestedBookingTableRow";

const RequestedBookings = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: requestedBookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Requested Booking", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/requested-booking`);
      return result.data;
    },
  });

  if (isLoading & loading) return <LoadingSpinner />;
  console.log(requestedBookings);

  return (
    <div className="container mx-auto px-2 sm:px-6">
      <div className="-mx-4 sm:-mx-8 overflow-x-auto rounded-xl">
        <div className="inline-block w-full shadow rounded-lg ">
          <table className="w-full leading-normal">
            <thead className="">
              <tr>
                <th className="px-5 py-3 bg-green-200 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold">
                  Email
                </th>
                <th className="px-5 py-3 bg-green-200 border-b border-gray-300 text-gray-800 text-left text-sm uppercase font-semibold">
                  Operator Name
                </th>
                <th className="px-5 py-3 bg-green-200 border-b border-gray-300 text-gray-800 text-center text-sm uppercase font-semibold">
                  Quantity
                </th>
                <th className="px-5 py-3 bg-green-200 border-b border-gray-300 text-gray-800 text-center text-sm uppercase font-semibold">
                  Status
                </th>
                <th className="px-5 py-3 bg-green-200 border-b border-gray-300 text-gray-800 text-center text-sm uppercase font-semibold">
                  Total Price
                </th>
                <th className="px-5 py-3 bg-green-200 border-b border-gray-300 text-gray-800  text-sm uppercase font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {requestedBookings.map((bookingReqData) => (
                <RequestedBookingTableRow
                  key={bookingReqData._id}
                  refetch={refetch}
                  bookingReqData={bookingReqData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestedBookings;
