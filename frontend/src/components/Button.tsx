import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "../types";

const Button = ({
  variant,
  className,
  children,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={twMerge(
        "flex items-center text-white py-2 px-3 font-bold rounded-md transition duration-50",
        variant === "primary" && "primary",
        variant === "secondary" && "secondary",
        variant === "tertiary" && "tertiary",
        variant === "quaternary" && "quaternary",
        variant === "delete" && "delete",
        variant === "cancel" && "cancel",
        variant === "disabled" && "disabled",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
