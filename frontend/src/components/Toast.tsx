import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = (props: ToastProps) => {
  const { message, type, onClose } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  return (
    <div
      className={twMerge(
        "fixed top-4 right-4 z-50 p-4 rounded-md text-white max-w-md",
        type === "SUCCESS" ? "bg-green-600" : "bg-red-600"
      )}
    >
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
