import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AdvertiseSlider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: advertiseTickets = [], isLoading } = useQuery({
    queryKey: "advertise tickets",
    queryFn: async () => {
      const { data } = await axiosSecure(`/advertise-tickets`);
      return data;
    },
  });

  if (advertiseTickets.length === 0) return null;
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className=" py-16 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Featured Advertisements
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, FreeMode]}
        spaceBetween={20}
        slidesPerView={3}
        freeMode={true}
        navigation={{
          nextEl: ".custom-button-next",
          prevEl: ".custom-button-prev",
        }}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {advertiseTickets.map((ticket) => (
          <SwiperSlide key={ticket?._id}>
            <div className="bg-white rounded-3xl shadow-sm transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col group">
              <div className="relative overflow-hidden h-56">
                <img
                  src={ticket.image}
                  alt={ticket.operator}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    {ticket.busType || "Premium"}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col grow">
                <div className=" mb-4">
                  <h3 className="text-xl font-extrabold text-gray-800 leading-tight group-hover:text-lime-600 transition-colors">
                    {ticket.operator}
                  </h3>
                </div>

                <div className=" bg-gray-100 p-3 rounded-lg mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {ticket.perks?.slice(0, 3).map((perk, index) => (
                      <span
                        key={index}
                        className="bg-gray-50 text-gray-500 text-[11px] font-medium px-2.5 py-1 rounded-md border border-gray-100"
                      >
                        {perk}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-lime-600 bg-lime-50 px-2 py-1 rounded">
                      {ticket.from}
                    </span>
                    <div className="h-px grow bg-dashed bg-gray-300 border-t border-dashed"></div>
                    <span className="pb-1">to</span>
                    <div className="h-px grow bg-dashed bg-gray-300 border-t border-dashed"></div>
                    <span className="text-xs font-bold text-lime-600 bg-lime-50 px-2 py-1 rounded">
                      {ticket.to}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                  <div className="flex items-baseline gap-2">
                    {/* Discounted / Original Price (Main) */}
                    <span className="text-3xl font-black text-gray-800 leading-tight group-hover:text-lime-600 transition-colors">
                      {ticket.price} TK
                    </span>

                    {/* Previous Price (100 TK Higher with Line-Through) */}
                    <span className="text-lg font-semibold text-gray-400 line-through ">
                      {Number(ticket.price) + 100} TK
                    </span>
                  </div>
                  <Link
                    to={`/tickets/${ticket._id}`}
                    className="flex items-center gap-2 bg-lime-600 hover:bg-lime-800 text-white px-6 py-2 rounded-2xl font-bold text-sm transition-all shadow-lg hover:shadow-lime-200 active:scale-95"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="custom-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-lime-200/50 hover:bg-lime-500 hover:text-white text-lime-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all duration-300">
          <IoIosArrowBack />
        </div>

        <div className="custom-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-lime-200/50 hover:bg-lime-500 hover:text-white text-lime-600 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all duration-300">
          <IoIosArrowForward />
        </div>
      </Swiper>
    </div>
  );
};

export default AdvertiseSlider;
