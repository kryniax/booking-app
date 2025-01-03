import { useState } from "react";
import { MyBookingType } from "../types";
import { useTranslation } from "react-i18next";
import { useDeleteBooking } from "../api/BookingApi";
import Modal from "./Modal";
import CancelBookingConfirmation from "./BookingCancelConfirmation";

type BookingCardProps = {
  booking: MyBookingType;
};

const BookingCard = ({ booking }: BookingCardProps) => {
  const { t } = useTranslation();
  const { deleteBooking, isPending, isSuccess } = useDeleteBooking();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cancelBookingHandler = () => {
    try {
      deleteBooking(booking._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full border border-slate-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-md p-5 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-5">
      <div className="w-full h-[250px]">
        <img
          src={booking.hotelId.imageUrls[0]}
          alt={booking.hotelId.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
        <header className="dark:text-zinc-100">
          <h2 className="text-xl font-bold">{booking.hotelId.name}</h2>
          <p className="text-sm font-normal">
            {booking.hotelId.city}, {booking.hotelId.country}
          </p>
        </header>
        <div className="flex flex-col dark:text-zinc-100">
          <span className="font-bold mr-2">{t("BookingCard.dates")}</span>
          <span>
            {new Date(booking.checkIn).toDateString()} -
            {new Date(booking.checkOut).toDateString()}
          </span>
        </div>
        <div className="flex flex-col">
          <p className="dark:text-zinc-100">
            <span className="font-bold">{t("BookingCard.guests")}</span>
            {booking.adultCount} {t("BookingCard.adults")}, {booking.childCount}{" "}
            {t("BookingCard.children")}
          </p>
        </div>
        <div className="mt-auto">
          {booking.cancelStatus && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              {t("BookingCard.cancelBooking")}
            </button>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("BookingCard.cancelBooking")}
      >
        <CancelBookingConfirmation
          onConfirm={cancelBookingHandler}
          onCancel={() => setIsModalOpen(false)}
          isPending={isPending}
          isSuccess={isSuccess}
        />
      </Modal>
    </div>
  );
};

export default BookingCard;
