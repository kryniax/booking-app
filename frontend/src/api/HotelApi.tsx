import { useQuery } from "@tanstack/react-query";
import { HotelSearchResponse, SearchHotelParams } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchHotel = (searchParams: SearchHotelParams) => {
  const searchHotelsRequest = async (): Promise<HotelSearchResponse> => {
    const queryHotelParams = new URLSearchParams();
    queryHotelParams.append("destination", searchParams.destination || "");
    queryHotelParams.append("checkIn", searchParams.checkIn || "");
    queryHotelParams.append("checkOut", searchParams.checkOut || "");
    queryHotelParams.append("adultCount", searchParams.adultCount || "");
    queryHotelParams.append("childCount", searchParams.childCount || "");
    queryHotelParams.append("page", searchParams.page || "");

    queryHotelParams.append("maxPrice", searchParams.maxPrice || "");
    queryHotelParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility) =>
      queryHotelParams.append("facilities", facility)
    );

    searchParams.types?.forEach((type) =>
      queryHotelParams.append("types", type)
    );

    searchParams.stars?.forEach((star) =>
      queryHotelParams.append("stars", star)
    );

    const response = await fetch(
      `${API_BASE_URL}/api/hotel/search?${queryHotelParams}`
    );

    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }
    return response.json();
  };

  const {
    data: hotelData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchHotels", searchParams],
    queryFn: searchHotelsRequest,
  });

  return {
    hotelData,
    isLoading,
    isError,
  };
};
