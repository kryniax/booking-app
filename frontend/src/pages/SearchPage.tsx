import React, { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useSearchHotel } from "../api/HotelApi";

const SearchPage = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };
  const { hotelData, isLoading } = useSearchHotel(searchParams);
  console.log(hotelData);
  console.log(isLoading);
  console.log(search);
  return <div>SearchPage</div>;
};

export default SearchPage;
