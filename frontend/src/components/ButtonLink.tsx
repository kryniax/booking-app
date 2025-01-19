import { Link, LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "../types";

const ButtonLink = ({
  variant,
  className,
  children,
  ...rest
}: ButtonProps & LinkProps) => {
  return (
    <Link
      className={twMerge(
        "flex items-center text-white py-2 px-3 font-bold transition duration-50",
        variant === "primary" && "primary",
        variant === "secondary" && "secondary",
        variant === "tertiary" && "tertiary",
        variant === "quaternary" && "quaternary",
        variant === "delete" && "delete",
        variant === "cancel" && "cancel",
        variant === "disabled" && "disabled",
        variant === "text" && "text",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
