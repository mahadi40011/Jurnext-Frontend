import { useEffect, useState } from "react";
// import StripeCheckout from "react-stripe-checkout"; // npm install react-stripe-checkout
import dayjs from "dayjs";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BookedTicketCard = ({ ticket }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {_id, status, quantity, ticketID, ticketDetails } = ticket;
  const { operator, image, from, to, time, date, price } = ticketDetails;

  // Countdown timer
  useEffect(() => {
    if (status === "rejected" || status === "paid") return;

    const departure = dayjs(`${date} ${time}`);
    const interval = setInterval(() => {
      const now = dayjs();
      const diff = departure.diff(now);

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft("Departed");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date, time, status]);

  // Pay Now handler
  const handlePayment = async () => {
    const paymentInfo = {
      bookingId: _id,
      ticketID,
      image,
      operator,
      price,
      quantity,
      customer: {
        name: user?.displayName,
        email: user?.email,
      },
    };

    const { data } = await axiosSecure.post(
      `/create-checkout-session`,
      paymentInfo
    );
    window.location.href = data.url;
  };

  const totalPrice = price * quantity;
  const departurePassed = dayjs(`${date} ${time}`).isBefore(dayjs());

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border">
      <img src={image} alt={operator} className="w-full h-40 object-cover" />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{operator}</h3>
        <p className="text-sm text-gray-600">
          {from} → {to}
        </p>
        <p className="text-sm">
          Departure: {dayjs(`${date} ${time}`).format("DD MMM YYYY, HH:mm")}
        </p>
        <p className="text-sm">Quantity: {quantity}</p>
        <p className="text-sm font-medium">Total Price: ${totalPrice}</p>
        <p className="text-sm font-semibold">Status: {status}</p>
        {status !== "rejected" && status !== "paid" && !departurePassed && (
          <p className="text-sm ">
            Countdown: <span className="text-red-500">{timeLeft}</span>
          </p>
        )}

        {/* Pay Now Button */}
        {status === "accepted" && !departurePassed && (
          <div onClick={handlePayment}>
            <button className="mt-2 w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded-lg font-semibold transition">
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedTicketCard;
