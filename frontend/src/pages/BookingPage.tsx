import React, { useEffect, useState } from "react";
import { useGetCurrentUser } from "../api/UserApi";
import BookingForm from "../forms/booking-form/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useGetMyHotelById } from "../api/MyHotelApi";
import { useGetHotelById } from "../api/HotelApi";
import BookingDetailSummary from "../components/BookingDetailSummary";

const BookingPage = () => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  if (!hotelId) {
    return <span>There is no hotel</span>;
  }

  const { hotelDataById } = useGetHotelById(hotelId);
  if (!hotelDataById) {
    return <span>There is no hotel</span>;
  }

  const { currentUser } = useGetCurrentUser();

  const [numberOfNights, setNumberofNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberofNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  if (!currentUser) {
    return <span>There is no current user</span>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-2">
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotelDataById}
      />
      <BookingForm currentUser={currentUser} />
    </div>
  );
};

export default BookingPage;
