import { MyBookingType } from "../types";
import { useTranslation } from "react-i18next";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "./Button";

type BookingCardProps = {
  booking: MyBookingType;
  onOpenCancelModal: (bookingId: string) => void;
  onOpenDeleteModal: (bookingId: string) => void;
};

const BookingCard = ({
  booking,
  onOpenCancelModal,
  onOpenDeleteModal,
}: BookingCardProps) => {
  const { t } = useTranslation();

  const shouldShowDeleteButton =
    (booking.cancelStatus && !booking.isAfterCheckIn) || booking.isAfterCheckIn;

  return (
    <div className="w-full border border-slate-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-md p-5 grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] gap-5">
      <div className="w-full h-[250px]">
        <img
          src={booking.hotelId.imageUrls[0]}
          alt={booking.hotelId.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
        <header className="dark:text-zinc-100">
          <h2 className="text-xl font-bold">{booking.hotelId.name}</h2>
          <p className="text-sm font-normal">
            {booking.hotelId.city}, {booking.hotelId.country}
          </p>
        </header>
        <div className="flex flex-col dark:text-zinc-100">
          <span className="font-bold mr-2">{t("BookingCard.dates")}</span>
          <span>
            {new Date(booking.checkIn).toDateString()} -
            {new Date(booking.checkOut).toDateString()}
          </span>
        </div>
        <div className="flex flex-col">
          <p className="dark:text-zinc-100">
            <span className="font-bold">{t("BookingCard.guests")}</span>
            {booking.adultCount} {t("BookingCard.adults")}, {booking.childCount}{" "}
            {t("BookingCard.children")}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-between md:justify-start md:items-end md:flex-col">
        <div className="">
          {booking.isAfterCheckIn ? (
            <Button variant="disabled" className="font-normal">
              {t("BookingCard.cancelNotAvailable")}
            </Button>
          ) : booking.isOutdated ? (
            <Button variant="disabled" className="font-normal">
              {t("BookingCard.cancelNotAvailable")}
            </Button>
          ) : booking.cancelStatus ? (
            <Button variant="disabled" className="font-normal">
              {t("BookingCard.cancelledBooking")}
            </Button>
          ) : (
            <Button
              variant="delete"
              onClick={() => onOpenCancelModal(booking._id)}
              className="font-normal"
            >
              {t("BookingCard.cancelBooking")}
            </Button>
          )}
        </div>
        <div className="">
          {shouldShowDeleteButton && (
            <Button
              variant="delete"
              onClick={() => onOpenDeleteModal(booking._id)}
              className="font-normal text-white p-2"
            >
              <FaRegTrashAlt size={25} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
