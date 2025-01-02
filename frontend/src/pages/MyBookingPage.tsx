import { useGetMyBooking } from "../api/BookingApi";
import BookingCard from "../components/BookingCard";
import { useTranslation } from "react-i18next";
import { TfiFaceSad } from "react-icons/tfi";
import { Link } from "react-router-dom";

const MyBookingPage = () => {
  const { bookings } = useGetMyBooking();
  const { t } = useTranslation();

  if (bookings?.length === 0) {
    return (
      <div className="flex flex-col flex-1 gap-5 items-center justify-center py-10">
        <TfiFaceSad size={90} className="text-black/80" />
        <span className="font-bold text-2xl text-black/80">
          {t("MyHotelsPage.noHotels")}
        </span>
        <Link
          to="/"
          className="flex items-center text-white bg-blue-500 py-2 px-3 font-bold hover:bg-blue-400 rounded-md transition duration-50"
        >
          {t("Header.mainPage")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {bookings?.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
};

export default MyBookingPage;
