import { useMutation, useQuery } from "@tanstack/react-query";
import { BookingType, MyBookingType, PaymentIntentResponse } from "../types";
import { BookingFormData } from "../forms/booking-form/BookingForm";
import { useAppContext } from "../contexts/AppContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreatePaymentIntent = (
  hotelId: string,
  numberOfNights: number
) => {
  const createPaymentIntentRequest =
    async (): Promise<PaymentIntentResponse> => {
      const response = await fetch(
        `${API_BASE_URL}/api/booking/${hotelId}/bookings/payment-intent`,
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({ numberOfNights }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching payment intent");
      }

      return response.json();
    };

  const { data: paymentIntentData, isLoading } = useQuery({
    queryKey: ["createPaymentIntent"],
    queryFn: createPaymentIntentRequest,
    enabled: !!hotelId && numberOfNights > 0,
  });

  return { paymentIntentData, isLoading };
};

export const useCreateBooking = () => {
  const { showToast } = useAppContext();
  const createBookingRequest = async (formData: BookingFormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/booking/${formData.hotelId}/bookings`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error("Error booking hotel");
    }
  };

  const {
    mutateAsync: bookHotel,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: createBookingRequest,
    onSuccess: () => {
      showToast({ message: "Booking Saved", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving booking", type: "ERROR" });
    },
  });

  return { bookHotel, isPending, isSuccess };
};

export const useGetMyBooking = () => {
  const getMyBookingRequest = async (): Promise<MyBookingType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/booking/my-bookings`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error fetching bookings");
    }

    return response.json();
  };

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["getMyBookings"],
    queryFn: getMyBookingRequest,
  });

  return { bookings, isLoading };
};
