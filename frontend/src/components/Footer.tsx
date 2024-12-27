import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSwitch from "./LanguageSwitch";
import { useModal } from "../contexts/ModalContext";
import Languages from "./Languages";

const Footer = () => {
  const { t } = useTranslation();
  const { openModal } = useModal();

  const openModalHandler = () => {
    openModal(<Languages />, "Select a language");
  };

  return (
    <footer className="bg-blue-800 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-2 md:gap-5">
        <span className="text-2xl md:text-3xl text-white font-bold tracking-tight">
          Niceplace.com
        </span>
        <div className="text-white font-bold tracking-tight flex flex-col items-start md:justify-center md:items-center md:flex-row md:gap-1">
          <div
            onClick={openModalHandler}
            className="flex items-center gap-1 p-1 pr-2 cursor-pointer hover:bg-white/10 transition duration-100 rounded-md"
          >
            <LanguageSwitch />
            <span className="font-bold text-white">
              {t("BookingApp.language")}
            </span>
          </div>
          <Link
            to="/"
            className="hover:bg-white/10 transition duration-100 rounded-md p-3"
          >
            {t("Footer.privacyPolicy")}
          </Link>
          <Link
            to="/"
            className="hover:bg-white/10 transition duration-100 rounded-md p-3"
          >
            {t("Footer.termsOfService")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
