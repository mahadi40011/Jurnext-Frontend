import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Heading from "../Shared/Heading/Heading";

const LatestTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: advertiseTickets = [], isLoading } = useQuery({
    queryKey: "latest tickets",
    queryFn: async () => {
      const { data } = await axiosSecure(`/latest-tickets`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <Heading
            title="Latest Tickets"
            subtitle="Recently added premium travel deals"
          />
          <Link
            to="/all-ticket"
            className="text-lime-600 font-bold hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advertiseTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col group overflow-hidden"
            >
              {/* Image & Transport Badge */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={ticket.image}
                  alt={ticket.operator}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-700 uppercase tracking-widest">
                  {ticket.busType}
                </span>
                <span className="absolute bottom-4 right-4 bg-lime-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                  {ticket.quantity} Left
                </span>
              </div>

              <div className="p-6 flex flex-col grow">
                {/* Title & Price */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1 group-hover:text-lime-600 transition-colors">
                    {ticket.operator}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-gray-800 leading-tight group-hover:text-lime-600 transition-colors">
                      {ticket.price} TK
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">
                      /unit
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <Link
                    to={`/tickets/${ticket._id}`}
                    className="w-full inline-flex items-center justify-center bg-lime-600 hover:bg-lime-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg hover:shadow-lime-200"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTickets;
