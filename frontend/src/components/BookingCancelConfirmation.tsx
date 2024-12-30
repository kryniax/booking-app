import { useTranslation } from "react-i18next";

type CancelBookingConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
  isSuccess: boolean;
};

const CancelBookingConfirmation = ({
  onConfirm,
  onCancel,
  isPending,
  isSuccess,
}: CancelBookingConfirmationProps) => {
  const { t } = useTranslation();

  return (
    <div className="p-6 flex flex-col gap-6 w-full">
      <p className="text-center text-gray-600">
        {t("BookingCancelConfirmation.title")}
      </p>
      {isSuccess ? (
        <p>Rezerwacja została anulowana</p>
      ) : (
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            disabled={isPending}
            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            {t("BookingApp.no")}
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
          >
            {isPending
              ? t("BookingCancelConfirmation.cancelling")
              : t("BookingApp.yes")}
          </button>
        </div>
      )}
    </div>
  );
};

export default CancelBookingConfirmation;
