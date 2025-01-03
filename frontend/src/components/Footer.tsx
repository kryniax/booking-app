import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSwitch from "./LanguageSwitch";
import Languages from "./Languages";
import Modal from "./Modal";
import CurrencySwitch from "./CurrencySwitch";
import Currencies from "./Currencies";

const Footer = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalCurrencyOpen, setIsModalCurrencyOpen] =
    useState<boolean>(false);
  return (
    <footer className="bg-blue-800 dark:bg-zinc-800 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-2 md:gap-5">
        <span className="text-2xl md:text-3xl text-white dark:text-zinc-300 font-bold tracking-tight">
          Niceplace.com
        </span>
        <div className="text-white dark:text-zinc-300 font-bold tracking-tight flex flex-col items-start md:justify-center md:items-center md:flex-row md:gap-1">
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 p-1 pr-2 cursor-pointer hover:bg-white/10 transition duration-100 rounded-md"
          >
            <LanguageSwitch />
            <span className="font-bold">{t("BookingApp.language")}</span>
          </div>
          <div
            onClick={() => setIsModalCurrencyOpen(true)}
            className="flex items-center p-1 pr-2 cursor-pointer hover:bg-white/10 transition duration-100 rounded-md"
          >
            <span className="block md:hidden pl-2">{t("Footer.currency")}</span>
            <CurrencySwitch />
          </div>
          <Link
            to="/privacy"
            className="hover:bg-white/10 transition duration-100 rounded-md p-3"
          >
            {t("Footer.privacyPolicy")}
          </Link>
          <Link
            to="/terms-of-service"
            className="hover:bg-white/10 transition duration-100 rounded-md p-3"
          >
            {t("Footer.termsOfService")}
          </Link>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("BookingApp.selectLanguage")}
      >
        <Languages />
      </Modal>
      <Modal
        isOpen={isModalCurrencyOpen}
        onClose={() => setIsModalCurrencyOpen(false)}
        title={t("BookingApp.selectCurrency")}
      >
        <Currencies />
      </Modal>
    </footer>
  );
};

export default Footer;
