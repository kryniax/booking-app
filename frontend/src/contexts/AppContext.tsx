import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useValidateToken } from "../api/UserApi";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useTranslation } from "react-i18next";

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const { isError } = useValidateToken();
  const { i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => setToast(toastMessage),
        isLoggedIn: !isError,
        stripePromise,
        currentLanguage: i18n.language,
        changeLanguage,
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
