import { useTranslation } from "react-i18next";
import Button from "./Button";

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
        <Button
          variant="cancel"
          onClick={onCancel}
          disabled={isPending}
          className="px-6 font-normal"
        >
          {t("BookingApp.no")}
        </Button>
        <Button
          variant="delete"
          onClick={onConfirm}
          disabled={isPending}
          className="px-6 font-normal !rounded-md"
        >
          {t("BookingApp.yes")}
        </Button>
      </div>
    </div>
  );
};

export default ModalOperationConfirmation;
