import React, { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type AnimateButtonProps = {
  isOpen: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  color?: string;
};

const AnimateButton = ({
  onClick,
  isOpen,
  className,
  color,
}: AnimateButtonProps & ComponentPropsWithoutRef<"button">) => {
  return (
    <React.Fragment>
      <button
        className={twMerge("size-10 relative lg:hidden block", className)}
        onClick={onClick}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open navigation menu</span>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={twMerge(
              "w-5 h-0.5 bg-zinc-300 transition duration-300",
              isOpen ? "rotate-45" : "-translate-y-1",
              color
            )}
          ></div>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={twMerge(
              "w-5 h-0.5 bg-zinc-300 transition duration-300",
              isOpen ? "-rotate-45" : "translate-y-1",
              color
            )}
          ></div>
        </div>
      </button>
    </React.Fragment>
  );
};

export default AnimateButton;
