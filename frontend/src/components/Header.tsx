import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LogoutButton from "./LogoutButton";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "react-i18next";
import AnimateButton from "./AnimateButton";
import Menu from "./Menu";
import Modal from "./Modal";
import Languages from "./Languages";
import { PiUserCircleThin } from "react-icons/pi";
import DarkMode from "./DarkMode";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-blue-800 dark:bg-zinc-800 py-6 px-1 md:px-0">
      <div className="container mx-auto flex items-center justify-between">
        <header className="text-2xl md:text-3xl text-white dark:text-zinc-300 font-bold tracking-tight flex gap-4">
          <Link to="/">Niceplace.com</Link>
          <div className="flex hover:bg-white/10 rounded-md">
            <DarkMode />
          </div>
        </header>
        <span className="flex items-center gap-1">
          <div className="hidden lg:flex hover:bg-white/10 rounded-md">
            <LanguageSwitch onClick={() => setIsModalOpen(true)} />
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={t("BookingApp.selectLanguage")}
            >
              <Languages />
            </Modal>
          </div>
          <div className="flex lg:hidden capitalize">
            {isLoggedIn ? (
              <Link
                to="/profile"
                title={t("BookingApp.signIn")}
                className="rounded-md hover:bg-white/10 transition duration-100"
              >
                <PiUserCircleThin color="white" size={35} />
              </Link>
            ) : (
              <Link
                to="/login"
                title={t("BookingApp.signIn")}
                className="rounded-md hover:bg-white/10 transition duration-100"
              >
                <PiUserCircleThin color="white" size={35} />
              </Link>
            )}
          </div>
          {isLoggedIn ? (
            <div className="hidden lg:flex gap-1">
              <Link
                className="flex items-center text-white dark:text-zinc-300 px-3 font-bold hover:bg-white/10 rounded-md transition duration-50"
                to="/my-bookings"
              >
                {t("Header.myBookings")}
              </Link>
              <Link
                className="flex items-center text-white dark:text-zinc-300 px-3 font-bold hover:bg-white/10 rounded-md transition duration-50"
                to="/my-hotels"
              >
                {t("Header.myHotels")}
              </Link>
              <Link
                className="flex items-center text-white dark:text-zinc-300 px-3 font-bold hover:bg-white/10 rounded-md transition duration-50"
                to="/profile"
              >
                {t("Header.myProfile")}
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white dark:bg-zinc-500 hidden lg:flex py-2 items-center justify-center text-blue-600 dark:text-white capitalize px-3 font-bold  hover:bg-gray-200 transition duration-50 rounded-md"
            >
              {t("BookingApp.signIn")}
            </Link>
          )}
          <AnimateButton
            onClick={isOpenHandler}
            isOpen={isOpen}
            className="rounded-md hover:bg-white/10 transition duration-100"
          />
        </span>

        <Menu onClick={isOpenHandler} isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Header;
