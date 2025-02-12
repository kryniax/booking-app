import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { HotelType } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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
  const queryClient = useQueryClient();
  const getMyHotelsRequest = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my/hotel`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }

    return response.json();
  };

  const { data: myHotels, isLoading } = useQuery({
    queryKey: ["fetchMyHotels"],
    queryFn: getMyHotelsRequest,
    retry: false,
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["fetchMyHotels"] });
  };

  return {
    myHotels,
    isLoading,
    refetch,
  };
};

export const useGetMyHotelById = (hotelId: string) => {
  const getMyHotelByIdRequest = async (): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my/hotel/${hotelId}`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to get hotel by ID");
    }

    return response.json();
  };

  const { data: myHotelById, isLoading } = useQuery({
    queryKey: ["fetchMyHotelById", hotelId],
    queryFn: getMyHotelByIdRequest,
    retry: false,
    enabled: !!hotelId,
  });

  return {
    myHotelById,
    isLoading,
  };
};

export const useUpdateMyHotelById = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const updateMyHotelByIdRequest = async (
    hotelFormData: FormData
  ): Promise<HotelType> => {
    const response = await fetch(
      `${API_BASE_URL}/api/my/hotel/${hotelFormData.get("hotelId")}`,
      {
        method: "PUT",
        body: hotelFormData,
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update hotel by ID");
    }

    return response.json();
  };

  const { mutateAsync: updateMyHotel, isPending } = useMutation({
    mutationFn: updateMyHotelByIdRequest,
    onSuccess: async () => {
      showToast({ message: "Hotel Updated", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  return {
    updateMyHotel,
    isPending,
  };
};
