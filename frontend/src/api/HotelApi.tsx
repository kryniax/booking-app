import { useMutation } from "@tanstack/react-query";
import { HotelFormData } from "../forms/manage-hotel-form/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyHotel = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const createMyHotelRequest = async (hotelFormData: FormData) => {
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
