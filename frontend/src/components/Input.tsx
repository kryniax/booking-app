import React, { forwardRef, HTMLProps, Ref } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  labelClass?: string;
  error?: FieldError;
  children?: React.ReactNode;
}

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { label, labelClass, error, className, children, ...inputProps } =
    props;
  return (
    <label
      className={twMerge(
        `text-gray-700 text-sm font-bold flex-1 dark:text-zinc-100`,
        labelClass
      )}
    >
      <span>{label}</span>
      {children ? (
        children
      ) : (
        <input
          {...inputProps}
          ref={ref}
          className={twMerge(
            `border rounded w-full py-1 px-2 font-normal dark:bg-zinc-800 dark:border-zinc-700 disabled:bg-slate-200 dark:disabled:bg-zinc-600`,
            className
          )}
        />
      )}

      {error && (
        <span className="text-red-500 text-sm font-bold">{error.message}</span>
      )}
    </label>
  );
});

export default Input;
