import { useTranslation } from "react-i18next";

type ModalOperationConfirmationProps = {
  operation: "cancel" | "delete";
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
  isSuccess: boolean;
};

const ModalOperationConfirmation = ({
  operation,
  name,
  onConfirm,
  onCancel,
  isPending,
}: ModalOperationConfirmationProps) => {
  const { t } = useTranslation();

  return (
    <div className="p-6 flex flex-col gap-6 w-full">
      <p className="text-center text-zinc-800 dark:text-zinc-100 mb-5">
        {t("ModalOperationConfirmation.operation", {
          operation: operation,
          name: name,
        })}
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          disabled={isPending}
          className="px-6 py-2 bg-zinc-300 dark:bg-zinc-500 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-400 disabled:opacity-50"
        >
          {t("BookingApp.no")}
        </button>
        <button
          onClick={onConfirm}
          disabled={isPending}
          className="px-6 py-2 bg-red-500 dark:bg-red-700 text-white rounded-md hover:bg-red-400 dark:hover:bg-red-600 disabled:opacity-50"
        >
          {t("BookingApp.yes")}
        </button>
      </div>
    </div>
  );
};

export default ModalOperationConfirmation;
