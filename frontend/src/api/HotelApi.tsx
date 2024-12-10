import { useMutation, useQuery } from "@tanstack/react-query";
import { HotelFormData } from "../forms/manage-hotel-form/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { HotelType } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyHotel = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const createMyHotelRequest = async (
    hotelFormData: FormData
  ): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my/hotel`, {
      method: "POST",
      credentials: "include",
      body: hotelFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create hotel");
    }

    return response.json();
  };

  const { mutateAsync: createMyHotel, status } = useMutation({
    mutationFn: createMyHotelRequest,
    onSuccess: async () => {
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  return {
    createMyHotel,
    isError: status === "error",
    isSuccess: status === "success",
    isLoading: status === "pending",
  };
};

export const useGetMyHotels = () => {
  const getMyHotelsRequest = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my/hotel`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }

    return response.json();
  };

  const { data: myHotels, status } = useQuery({
    queryKey: ["fetchMyHotels"],
    queryFn: getMyHotelsRequest,
    retry: false,
  });

  return {
    myHotels,
    isLoading: status === "pending",
  };
};
