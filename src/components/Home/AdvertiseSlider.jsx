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
    queryKey: ["advertise tickets"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/advertise-tickets`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (advertiseTickets.length === 0) return null;

  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-4 relative">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-10">
        Featured Advertisements
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, FreeMode]}
        spaceBetween={20}
        slidesPerView={1} // Mobile View
        loop={true}
        freeMode={true}
        navigation={{
          nextEl: ".custom-button-next",
          prevEl: ".custom-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          // Tablet View
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // Desktop View
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        className="mySwiper pb-12"
      >
        {advertiseTickets.map((ticket) => (
          <SwiperSlide key={ticket?._id} className="h-auto">
            <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col group">
              {/* Image Section */}
              <div className="relative overflow-hidden h-48 sm:h-56">
                <img
                  src={ticket.image}
                  alt={ticket.operator}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    {ticket.busType || "Premium"}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col grow justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-800 leading-tight group-hover:text-lime-600 transition-colors mb-3">
                    {ticket.operator}
                  </h3>

                  <div className="bg-gray-50 p-3 rounded-xl mb-4 border border-gray-100">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {ticket.perks?.slice(0, 3).map((perk, index) => (
                        <span
                          key={index}
                          className="bg-white text-gray-600 text-[11px] font-medium px-2.5 py-1 rounded-md border border-gray-200/60 shadow-2xs"
                        >
                          {perk}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-lime-700 bg-lime-100/70 px-2 py-1 rounded-md">
                        {ticket.from}
                      </span>
                      <div className="h-px grow border-t border-dashed border-gray-300"></div>
                      <span className="text-xs text-gray-400 font-medium">
                        to
                      </span>
                      <div className="h-px grow border-t border-dashed border-gray-300"></div>
                      <span className="text-xs font-bold text-lime-700 bg-lime-100/70 px-2 py-1 rounded-md">
                        {ticket.to}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200 mt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-gray-800 leading-tight group-hover:text-lime-600 transition-colors">
                      {ticket.price} TK
                    </span>
                    <span className="text-sm font-semibold text-gray-400 line-through">
                      {Number(ticket.price) + 100} TK
                    </span>
                  </div>

                  <Link
                    to={`/tickets/${ticket._id}`}
                    className="flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white px-4 sm:px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="custom-button-prev absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/90 hover:bg-lime-600 hover:text-white text-lime-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 border border-gray-100">
          <IoIosArrowBack size={18} />
        </div>

        <div className="custom-button-next absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/90 hover:bg-lime-600 hover:text-white text-lime-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 border border-gray-100">
          <IoIosArrowForward size={18} />
        </div>
      </Swiper>
    </div>
  );
};

export default AdvertiseSlider;
