import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "react-i18next";
import AnimateButton from "./AnimateButton";
import Menu from "./Menu";
import Modal from "./Modal";
import Languages from "./Languages";
import { PiUserCircleThin } from "react-icons/pi";
import DarkMode from "./DarkMode";
import ButtonLink from "./ButtonLink";
import Button from "./Button";
import { useLogoutUser } from "../api/UserApi";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const { logoutUser } = useLogoutUser();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const logoutHandler = () => {
    logoutUser();
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
              <ButtonLink
                variant="tertiary"
                to="/profile"
                title={t("BookingApp.signIn")}
                className="p-0"
              >
                <PiUserCircleThin size={35} />
              </ButtonLink>
            ) : (
              <ButtonLink
                variant="tertiary"
                to="/login"
                title={t("BookingApp.signIn")}
                className="p-0"
              >
                <PiUserCircleThin size={35} />
              </ButtonLink>
            )}
          </div>
          {isLoggedIn ? (
            <div className="hidden lg:flex gap-1">
              <ButtonLink variant="tertiary" to="/my-bookings">
                {t("Header.myBookings")}
              </ButtonLink>
              <ButtonLink variant="tertiary" to="/my-hotels">
                {t("Header.myHotels")}
              </ButtonLink>
              <ButtonLink variant="tertiary" to="/profile">
                {t("Header.myProfile")}
              </ButtonLink>
              <Button variant="quaternary" onClick={logoutHandler}>
                {t("BookingApp.signOut")}
              </Button>
            </div>
          ) : (
            <div className="hidden lg:flex">
              <ButtonLink variant="quaternary" to="/login">
                {t("BookingApp.signIn")}
              </ButtonLink>
            </div>
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
