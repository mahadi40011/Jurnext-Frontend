import React from "react";

const AddedTicketCard = ({ ticket }) => {
  const {
    _id,
    image,
    operator,
    busType,
    perks,
    price,
    quantity,
    time,
    date,
    status,
  } = ticket;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition">
      <img src={image} alt={operator} className="w-full h-40 object-cover" />

      <div className="p-4 flex flex-col gap-2">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{operator}</h3>
          <p className="text-sm text-gray-600">
            {ticket.from} → {ticket.to}
          </p>
          <p className="text-sm">Bus Type: {busType}</p>
          <p className="text-sm">
            Departure: {date} {","} {time}
          </p>
          <p className="text-sm">Quantity: {quantity}</p>
          <div className="lg:col-span-2 flex gap-2">
            <label className="text-sm ">Perks: </label>
            <div className="flex flex-wrap items-center gap-2">
              {perks.map((perk) => (
                <span
                  key={perk}
                  className="bg-green-200 px-2 rounded-lg text-xs"
                >
                  {perk}
                </span>
              ))}
            </div>
          </div>
          <p className={`text-sm font-medium `}>
            Status:{" "}
            <span
              className={`${status === "pending" ? "bg-yellow-200" : ""} ${
                status === "accepted" ? "bg-green-200" : ""
              } ${
                status === "rejected" ? "bg-red-200" : ""
              } px-3 py-0.5 rounded-full font-normal`}
            >
              {" "}
              {status}
            </span>
          </p>
          <p className="text-sm font-medium">Price: {price} TK</p>
        </div>

        {/*  Buttons */}
        <div className="flex items-center gap-2">
          <button
            className={`${
              status === "rejected" ? "cursor-not-allowed" : "hover:bg-lime-600"
            } mt-2 w-full bg-lime-500  text-white text-center py-2 rounded-lg font-semibold transition`}
          >
            Update
          </button>
          <button
            className={`${
              status === "rejected" ? "cursor-not-allowed" : "hover:bg-lime-600"
            } mt-2 w-full bg-lime-500  text-white text-center py-2 rounded-lg font-semibold transition`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddedTicketCard;
