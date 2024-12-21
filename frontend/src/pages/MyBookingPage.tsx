import React from "react";
import { useGetMyBooking } from "../api/BookingApi";
import BookingCard from "../components/BookingCard";
import { useTranslation } from "react-i18next";

const MyBookingPage = () => {
  const { bookings, isLoading } = useGetMyBooking();
  const { t } = useTranslation();

  if (!bookings) {
    return <span>{t("MyBookingPage.noBooking")}</span>;
  }
  console.log(bookings);
  return (
    <div className="space-y-2">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
};

export default MyBookingPage;
