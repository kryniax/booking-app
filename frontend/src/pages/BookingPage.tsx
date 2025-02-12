import { useEffect, useState } from "react";
import { useGetCurrentUser } from "../api/UserApi";
import BookingForm from "../forms/booking-form/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { useGetHotelById } from "../api/HotelApi";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { useCreatePaymentIntent } from "../api/BookingApi";
import { useAppContext } from "../contexts/AppContext";
import { useTranslation } from "react-i18next";
import HelmetSEO from "../components/HelmetSEO";

const BookingPage = () => {
  const search = useSearchContext();
  const { stripePromise } = useAppContext();
  const { t } = useTranslation();

  const { hotelId } = useParams();
  if (!hotelId) {
    return <span>{t("BookingPage.noHotel")}</span>;
  }

  const { hotelDataById } = useGetHotelById(hotelId);
  if (!hotelDataById) {
    return <span>{t("BookingPage.noHotel")}</span>;
  }

  const { currentUser } = useGetCurrentUser();

  const [numberOfNights, setNumberofNights] = useState<number>(0);
  const { paymentIntentData } = useCreatePaymentIntent(hotelId, numberOfNights);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberofNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  if (!currentUser) {
    return <span>{t("BookingPage.noUser")}</span>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-2">
      <HelmetSEO
        title="Secure Hotel Booking - Easy Reservation Process"
        description="Book your hotel stay with our secure and easy-to-use booking system. Get instant confirmation and the best rate guarantee."
        keywords="hotel reservation, book hotel online, secure booking, hotel deals, instant confirmation"
        pathName={`/detail/${hotelDataById._id}/booking`}
      />
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotelDataById}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default BookingPage;
