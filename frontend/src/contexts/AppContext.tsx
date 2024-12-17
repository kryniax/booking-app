import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "@tanstack/react-query";
import { useValidateToken } from "../api/UserApi";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const { isError } = useValidateToken();

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => setToast(toastMessage),
        isLoggedIn: !isError,
        stripePromise,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
