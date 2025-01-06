import { useState } from "react";
import {
  useGetMyBooking,
  useCancelBooking,
  useDeleteBooking,
} from "../api/BookingApi";
import BookingCard from "../components/BookingCard";
import { useTranslation } from "react-i18next";
import HelmetSEO from "../components/HelmetSEO";
import Empty from "../components/Empty";
import PulseLoader from "react-spinners/PulseLoader";
import Modal from "../components/Modal";
import BookingOperationConfirmation from "../components/BookingOperationConfirmation";

const MyBookingPage = () => {
  const { bookings, isLoading, refetch } = useGetMyBooking();
  const { t } = useTranslation();
  const { deleteBooking, isPending, isSuccess } = useDeleteBooking();
  const {
    cancelBooking,
    isPending: isCancelPending,
    isSuccess: isCancelSuccess,
  } = useCancelBooking();

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleOpenCancelModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsCancelModalOpen(true);
  };

  const handleOpenDeleteModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsDeleteModalOpen(true);
  };

  const cancelBookingHandler = () => {
    if (selectedBookingId) {
      try {
        cancelBooking(selectedBookingId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteBookingHandler = () => {
    if (selectedBookingId) {
      try {
        deleteBooking(selectedBookingId);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
        <BookingCard
          key={booking._id}
          booking={booking}
          onOpenCancelModal={handleOpenCancelModal}
          onOpenDeleteModal={handleOpenDeleteModal}
        />
      ))}

      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title={t("BookingCard.cancelBooking")}
      >
        <BookingOperationConfirmation
          operation="cancel"
          onConfirm={cancelBookingHandler}
          onCancel={() => setIsCancelModalOpen(false)}
          isPending={isCancelPending}
          isSuccess={isCancelSuccess}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={t("BookingCard.deleteBooking")}
      >
        <BookingOperationConfirmation
          operation="delete"
          onConfirm={deleteBookingHandler}
          onCancel={() => setIsDeleteModalOpen(false)}
          isPending={isPending}
          isSuccess={isSuccess}
        />
      </Modal>
    </div>
  );
};

export default MyBookingPage;
