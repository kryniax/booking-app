import { forwardRef, HTMLProps, Ref } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  labelClass?: string;
  error?: FieldError;
}

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { label, labelClass, error, ...inputProps } = props;
  return (
    <label
      className={twMerge(`text-gray-700 text-sm font-bold flex-1`, labelClass)}
    >
      <span className="capitalize">{label}</span>
      <input
        {...inputProps}
        ref={ref}
        className="border rounded w-full py-1 px-2 font-normal"
      />
      {error && (
        <span className="text-red-500 text-sm font-bold">{error.message}</span>
      )}
    </label>
  );
});

export default Input;
