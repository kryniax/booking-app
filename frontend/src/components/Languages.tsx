import { GB, PL, DE } from "country-flag-icons/react/1x1";
import { useAppContext } from "../contexts/AppContext";
import { useTranslation } from "react-i18next";
import { useCurrencyContext } from "../contexts/CurrencyContext";

const Languages = () => {
  const { changeLanguage } = useAppContext();
  const { changeLanguageCurrency } = useCurrencyContext();
  const { t } = useTranslation();

  const languageHandler = (lang: string) => {
    changeLanguage(lang);
    changeLanguageCurrency(lang);
  };

  return (
    <ul className="w-full h-full flex flex-col items-start gap-5 p-4 dark:text-zinc-100">
      <li
        className="w-full p-2 flex items-center gap-5 cursor-pointer hover:bg-black/10 dark:hover:bg-black/30 transition duration-100 rounded-md"
        onClick={() => languageHandler("gb")}
      >
        <GB
          title="English"
          className="rounded-full size-12 md:size-14 border-black border-2"
        />
        <span className="text-md md:text-lg font-bold capitalize">
          {t("BookingApp.languageEN")}
        </span>
      </li>
      <li
        className="w-full p-2 flex items-center gap-5 cursor-pointer hover:bg-black/10 dark:hover:bg-black/30 transition duration-100 rounded-md"
        onClick={() => languageHandler("pl")}
      >
        <PL
          title="Polski"
          className="rounded-full size-12 md:size-14 border-black border-2"
        />
        <span className="text-md md:text-lg font-bold capitalize">
          {t("BookingApp.languagePL")}
        </span>
      </li>
      <li
        className="w-full p-2 flex items-center gap-5 cursor-pointer hover:bg-black/10 dark:hover:bg-black/30 transition duration-100 rounded-md"
        onClick={() => languageHandler("de")}
      >
        <DE
          title="Deutsch"
          className="rounded-full size-12 md:size-14 border-black border-2"
        />
        <span className="text-md md:text-lg font-bold capitalize">
          {t("BookingApp.languageDE")}
        </span>
      </li>
    </ul>
  );
};

export default Languages;
