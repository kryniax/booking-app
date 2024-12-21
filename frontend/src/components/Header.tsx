import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LogoutButton from "./LogoutButton";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const { t } = useTranslation();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-2xl md:text-3xl text-white font-bold tracking-tight">
          <Link to="/">Niceplace.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:text-white/80 transition duration-50"
                to="/my-bookings"
              >
                {t("Header.myBookings")}
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:text-white/80 transition duration-50"
                to="/my-hotels"
              >
                {t("Header.myHotels")}
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white flex items-center justify-center text-blue-600 capitalize px-3 font-bold hover:bg-gray-200 transition duration-50 rounded-md"
            >
              {t("BookingApp.signIn")}
            </Link>
          )}
        </span>
        <LanguageSwitch />
      </div>
    </div>
  );
};

export default Header;
