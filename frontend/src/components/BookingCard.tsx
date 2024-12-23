import React from "react";
import { MyBookingType } from "../types";
import { useTranslation } from "react-i18next";

type BookingCardProps = {
  booking: MyBookingType;
};

const BookingCard = ({ booking }: BookingCardProps) => {
  const { t } = useTranslation();
  return (
    <div className="w-full border border-slate-300 rounded-md p-5 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-5">
      <div className="w-full h-[250px]">
        <img
          src={booking.hotelId.imageUrls[0]}
          alt={booking.hotelId.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
        <header>
          <h2 className="text-xl font-bold">{booking.hotelId.name}</h2>
          <p className="text-sm font-normal">
            {booking.hotelId.city}, {booking.hotelId.country}
          </p>
        </header>
        <div className="flex flex-col">
          <span className="font-bold mr-2">{t("BookingCard.dates")}</span>
          <span>
            {new Date(booking.checkIn).toDateString()} -
            {new Date(booking.checkOut).toDateString()}
          </span>
        </div>
        <div className="flex flex-col">
          <p>
            <span className="font-bold">{t("BookingCard.guests")}</span>
            {booking.adultCount} {t("BookingCard.adults")}, {booking.childCount}{" "}
            {t("BookingCard.children")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
