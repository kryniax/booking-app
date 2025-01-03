import { useTranslation } from "react-i18next";
import { useCurrencyContext } from "../contexts/CurrencyContext";

const Currencies = () => {
  const { changeCurrency } = useCurrencyContext();
  const { t } = useTranslation();

  return (
    <ul className="w-full h-full flex flex-col items-start gap-5 p-4 dark:text-zinc-100">
      <li
        className="w-full p-2 flex items-center gap-5 cursor-pointer hover:bg-black/10 dark:hover:bg-black/30 transition duration-100 rounded-md"
        onClick={() => changeCurrency("PLN")}
      >
        <div className="flex items-center justify-center size-12 md:size-14 border-black dark:border-zinc-200 border-2 rounded-full">
          <span className="text-xl font-semibold">PLN</span>
        </div>
        <span className="text-md md:text-lg font-bold">
          {t("BookingApp.currencyPLN")}
        </span>
      </li>
      <li
        className="w-full p-2 flex items-center gap-5 cursor-pointer hover:bg-black/10 dark:hover:bg-black/30 transition duration-100 rounded-md"
        onClick={() => changeCurrency("USD")}
      >
        <div className="flex items-center justify-center size-12 md:size-14 border-black dark:border-zinc-200 border-2 rounded-full">
          <span className="text-2xl font-semibold">&#36;</span>
        </div>
        <span className="text-md md:text-lg font-bold">
          {t("BookingApp.currencyUSD")}
        </span>
      </li>
      <li
        className="w-full p-2 flex items-center gap-5 cursor-pointer hover:bg-black/10 dark:hover:bg-black/30 transition duration-100 rounded-md"
        onClick={() => changeCurrency("EUR")}
      >
        <div className="flex items-center justify-center size-12 md:size-14 border-black dark:border-zinc-200 border-2 rounded-full">
          <span className="text-2xl font-semibold">&#8364;</span>
        </div>
        <span className="text-md md:text-lg font-bold">
          {t("BookingApp.currencyEUR")}
        </span>
      </li>
      <li
        className="w-full p-2 flex items-center gap-5 cursor-pointer hover:bg-black/10 dark:hover:bg-black/30 transition duration-100 rounded-md"
        onClick={() => changeCurrency("GBP")}
      >
        <div className="flex items-center justify-center size-12 md:size-14 border-black dark:border-zinc-200 border-2 rounded-full">
          <span className="text-2xl font-semibold">&#163;</span>
        </div>
        <span className="text-md md:text-lg font-bold">
          {t("BookingApp.currencyGBP")}
        </span>
      </li>
    </ul>
  );
};

export default Currencies;
