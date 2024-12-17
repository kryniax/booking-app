import React from "react";
import { useGetMyBooking } from "../api/BookingApi";
import BookingCard from "../components/BookingCard";

const MyBookingPage = () => {
  const { bookings, isLoading } = useGetMyBooking();

  if (!bookings) {
    return <span>Bookings not found</span>;
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
