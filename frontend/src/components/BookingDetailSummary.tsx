import React from "react";
import { HotelType } from "../types";

type BookingDetailSummaryProps = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailSummary = (props: BookingDetailSummaryProps) => {
  const { checkIn, checkOut, adultCount, childCount, numberOfNights, hotel } =
    props;
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:{" "}
        <p className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</p>
      </div>
      <div className="flex justify-between">
        <div>
          <span>Check-in</span>
          <p className="font-bold">{checkIn.toDateString()}</p>
        </div>
        <div>
          <span>Check-out</span>
          <p className="font-bold">{checkOut.toDateString()}</p>
        </div>
      </div>
      <div className="border-t border-b py-2">
        <span>Total stay: </span>
        <p className="font-bold">
          {numberOfNights} {numberOfNights > 1 ? "nights" : "night"}
        </p>
      </div>
      <div>
        <span>Guests</span>
        <div className="flex gap-8 py-2">
          <span className="font-bold">Adults: {adultCount}</span>
          {childCount > 0 && (
            <span className="font-bold">Children: {childCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailSummary;
