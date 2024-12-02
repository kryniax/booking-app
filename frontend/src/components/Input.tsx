import { forwardRef, HTMLProps, Ref } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { label, error, ...inputProps } = props;
  return (
    <label className="text-gray-700 text-sm font-bold flex-1">
      <span className="capitalize">{label}</span>
      <input
        {...inputProps}
        ref={ref}
        className="border rounded w-full py-1 px-2 font-normal"
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </label>
  );
});

export default Input;
