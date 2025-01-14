import { HotelType } from "../types";
import { useTranslation } from "react-i18next";

type BookingDetailSummaryProps = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailSummary = (props: BookingDetailSummaryProps) => {
  const { t, i18n } = useTranslation();
  const { checkIn, checkOut, adultCount, childCount, numberOfNights, hotel } =
    props;
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100 p-5 h-fit">
      <h2 className="text-xl font-bold">
        {t("BookingDetailSummary.yourBookingDetails")}
      </h2>
      <div className="border-b py-2 dark:border-zinc-200">
        {t("BookingDetailSummary.location")}
        <p className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</p>
      </div>
      <div className="flex justify-between">
        <div>
          <span className="capitalize">{t("BookingApp.checkIn")}</span>
          <p className="font-bold">
            {" "}
            {checkIn.toLocaleDateString(i18n.language, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <span className="capitalize">{t("BookingApp.checkOut")}</span>
          <p className="font-bold">
            {" "}
            {checkOut.toLocaleDateString(i18n.language, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="border-t border-b py-2 dark:border-zinc-200">
        <span>{t("BookingDetailSummary.totalStay")}</span>
        <p className="font-bold">
          {`${numberOfNights} ${t("BookingDetailSummary.night", {
            count: Number(numberOfNights),
          })}`}
        </p>
      </div>
      <div>
        <span className="capitalize">{t("BookingApp.guests")}</span>
        <div className="flex gap-8 py-2">
          <span className="font-bold capitalize">{`${t(
            "BookingApp.adults"
          )}: ${adultCount}`}</span>
          {childCount > 0 && (
            <span className="font-bold capitalize">{`${t(
              "BookingApp.children"
            )}: ${childCount}`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailSummary;
