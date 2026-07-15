import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { imageUpload } from "../../../utils";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ErrorPage from "../../../pages/ErrorPage/ErrorPage";

const AddTicketForm = () => {
  const [preview, setPreview] = useState(null);
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const perksList = ["WiFi", "Breakfast", "Charging Port"];

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => {
      return await axiosSecure.post(`/tickets`, payload);
    },
    onSettled: (data, err) => {
      console.log(data);
      if (data) {
        data.data.message
          ? toast.error(data.data.message)
          : toast.success("Ticket Added Successfully");
        mutationReset();
      }
      if (err) {
        toast.error(err);
      }
    },
    retry: 3,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const {
      date,
      from,
      to,
      image,
      price,
      perks,
      quantity,
      operator,
      time,
      bus_type,
    } = data;

    try {
      //  image upload to imgbb
      const imageURL = await imageUpload(image);

      const ticketData = {
        operator,
        bus_type,
        from,
        to,
        price: Number(price),
        quantity: Number(quantity),
        date,
        time,
        vendor: { name: user?.displayName, email: user?.email },
        image: imageURL,
        perks,
        status: "pending",
      };

      await mutateAsync(ticketData);
      reset();
      setPreview(null);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  if (loading && isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="md:text-3xl text-2xl text-center md:text-start font-semibold md:font-bold mb-6">
        Add Ticket
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Operator Name*/}
        <div className="md:col-span-2">
          <label className="label">Operator Name</label>
          <input
            {...register("operator", { required: "Operator Name is required" })}
            className="input placeholder:opacity-60"
            placeholder="Write the Operator Name"
          />
          {errors.operator && (
            <p className="error">{errors.operator.message}</p>
          )}
        </div>

        {/* Bus Type */}
        <div>
          <label className="label">Bus Type</label>
          <select
            {...register("bus_type", {
              required: "Bus Type is Required",
            })}
            className="input "
          >
            <option disabled={true} value="">
              Select Bus Type
            </option>
            <option>AC</option>
            <option>Non AC</option>
            <option>Sleeper</option>
          </select>
          {errors.bus_type && (
            <p className="error">{errors.bus_type.message}</p>
          )}
        </div>

        {/* From */}
        <div>
          <label className="label">From (location)</label>
          <input
            {...register("from", { required: "Location is Required" })}
            className="input placeholder:opacity-60"
            placeholder="Starting location"
          />
          {errors.from && <p className="error">{errors.from.message}</p>}
        </div>

        {/* To */}
        <div>
          <label className="label">To (location)</label>
          <input
            {...register("to", { required: "Location is Required" })}
            className="input placeholder:opacity-60"
            placeholder="Destination"
          />
          {errors.to && <p className="error">{errors.to.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="label">Price (Per Unit)</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is Required",
              min: { value: 50, message: "Price must be 50 or above" },
            })}
            className="input placeholder:opacity-60"
            placeholder="Price"
          />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="label">Ticket Quantity</label>
          <input
            type="number"
            {...register("quantity", {
              required: "Quantity is Required",
              min: { value: 1, message: "Quantity cannot be 0" },
            })}
            className="input placeholder:opacity-60"
            placeholder="Quantity"
          />
          {errors.quantity && (
            <p className="error">{errors.quantity.message}</p>
          )}
        </div>

        {/* Departure Date */}
        <div>
          <label className="label">Departure Date</label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            {...register("date", {
              required: "Date is Required",
              validate: (value) =>
                new Date(value) >= new Date().setHours(0, 0, 0, 0) ||
                "Past date is not allowed",
            })}
            className="input "
          />
          {errors?.date && <p className="error">{errors.date.message}</p>}
        </div>

        {/* Departure Time */}
        <div>
          <label className="label">Departure Time</label>
          <input
            type="time"
            {...register("time", {
              required: "Time is required",
              validate: (value, formValues) => {
                const selectedDate = new Date(formValues.date);
                const today = new Date();

                // reset time for date comparison
                selectedDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);

                // If date is today, check time
                if (selectedDate.getTime() === today.getTime()) {
                  const now = new Date();
                  const [hour, minute] = value.split(":");

                  const selectedTime = new Date();
                  selectedTime.setHours(hour, minute, 0, 0);

                  if (selectedTime < now) {
                    return "Past time is not allowed for today";
                  }
                }

                return true;
              },
            })}
            className="input"
          />
          {errors?.time && <p className="error">{errors.time.message}</p>}
        </div>

        {/* Vendor Name */}
        <div>
          <label className="label">Vendor Name</label>
          <input
            value={user?.displayName}
            readOnly
            className="input bg-gray-100"
          />
        </div>

        {/* Vendor Email */}
        <div>
          <label className="label">Vendor Email</label>
          <input value={user?.email} readOnly className="input bg-gray-100" />
        </div>

        {/* Ticket Image */}
        <div className="row-span-2">
          <label className="label">Image</label>
          <Controller
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
            render={({ field }) => (
              <div className="relative w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    field.onChange(file);
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                  className="hidden"
                  id="ticketImage"
                />

                <label
                  htmlFor="ticketImage"
                  className="cursor-pointer flex flex-col items-center justify-center gap-1"
                >
                  {!preview ? (
                    <>
                      <div className="w-8 h-8 flex justify-center items-center">
                        <FaCamera size={24} />
                      </div>
                      <p className="text-sm font-medium">
                        Click to upload image
                      </p>
                      <p className="text-xs text-gray-500">
                        JPG, PNG up to 5MB
                      </p>
                    </>
                  ) : (
                    <div className="relative w-full">
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-32 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          field.onChange(null); // remove file from form
                          document.getElementById("ticketImage").value = "";
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-red-600 transition"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </label>
              </div>
            )}
          />
          {errors?.image && <p className="error">{errors.image.message}</p>}
        </div>

        {/* Perks */}
        <div className="lg:col-span-2">
          <label className="label mb-2 block">Perks</label>
          <div className="flex flex-wrap gap-4">
            {perksList.map((perk) => (
              <label key={perk} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={perk}
                  {...register("perks", {
                    validate: (value) =>
                      value?.length > 0 || "At least one perk is required",
                  })}
                  className="accent-lime-500"
                />
                {perk}
              </label>
            ))}
          </div>
          {errors?.perks && <p className="error">{errors.perks.message}</p>}
        </div>
      </div>

      {/* Submit Button*/}
      <div className="flex justify-end ">
        <button
          type="submit"
          className="mt-6 lg:w-1/3 w-1/2 bg-lime-500 hover:bg-lime-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Add Ticket
        </button>
      </div>
    </form>
  );
};

export default AddTicketForm;
