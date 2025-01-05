import { useGetMyBooking } from "../api/BookingApi";
import BookingCard from "../components/BookingCard";
import { useTranslation } from "react-i18next";
import HelmetSEO from "../components/HelmetSEO";
import Empty from "../components/Empty";
import PulseLoader from "react-spinners/PulseLoader";

const MyBookingPage = () => {
  const { bookings, isLoading, refetch } = useGetMyBooking();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-10">
        <PulseLoader color="#1e40af" size={25} />
      </div>
    );
  }

  if (bookings?.length === 0) {
    return (
      <Empty
        title={t("MyBookingPage.noBooking")}
        link={t("HomePage.title")}
        href="/"
        button={t("BookingApp.refresh")}
        onClick={refetch}
      />
    );
  }

  return (
    <div className="space-y-2">
      <HelmetSEO
        title="Manage Your Hotel Reservations | My Booking"
        description="View and manage all your hotel bookings in one place. Check booking details, make modifications, or cancel reservations easily."
        keywords="manage booking, hotel reservation management, view bookings, modify hotel booking"
        pathName="/my-bookings"
      />
      {bookings?.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
};

export default MyBookingPage;
