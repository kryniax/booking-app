import React, { useContext, useState } from "react";
import { useFetchExchangesRates } from "../api/CurrencyApi";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import {
  languageCurrency,
  localeCurrency,
} from "../config/currency-options-config";

const CURRENCY_COOKIE_NAME = import.meta.env.VITE_CURRENCY_COOKIE_NAME;

type CurrencyContext = {
  currentCurrency: string;
  changeCurrency: (newCurrency: string) => void;
  changeLanguageCurrency: (language: string) => void;
  formatPrice: (price: number) => string;
};

const CurrencyContext = React.createContext<CurrencyContext | undefined>(
  undefined
);

export const CurrencyProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { isSuccess, exchangeRates, baseCurrency } = useFetchExchangesRates();
  const { i18n } = useTranslation();
  const getLanguageCurrency = () => languageCurrency[i18n.language];
  const [currency, setCurrency] = useState(() => {
    const stored = Cookies.get(CURRENCY_COOKIE_NAME);
    return stored || getLanguageCurrency();
  });

  const handleSetCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
    Cookies.set(CURRENCY_COOKIE_NAME, newCurrency, {
      expires: 365,
      path: "/",
      secure: false,
    });
  };

  const changeLanguageCurrency = (language: string) => {
    handleSetCurrency(languageCurrency[language]);
  };

  const formatPrice = (price: number) => {
    if (!isSuccess || !exchangeRates) {
      return `${price} ${baseCurrency}`;
    }

    const convertedPrice =
      currency === baseCurrency ? price : price * exchangeRates.rates[currency];

    const locale = localeCurrency[currency];

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(convertedPrice);
  };

  const value = {
    currentCurrency: currency,
    changeCurrency: handleSetCurrency,
    changeLanguageCurrency,
    formatPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  return context as CurrencyContext;
};
